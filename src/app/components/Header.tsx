'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { Button, Navbar, TextInput } from 'flowbite-react';

import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', searchTerm);

    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const collapseElement = document.querySelector(
      '[data-testid="flowbite-navbar-collapse"]'
    );
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && collapseElement) {
          setIsDropdownOpen(
            collapseElement.classList.contains('hidden') === false
          );
        }
      });
    });

    if (collapseElement) {
      observer.observe(collapseElement, { attributes: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Navbar className='border-b-2'>
      <Link
        href='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400 rounded-lg text-white'>
          DevNexus
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: theme === 'light' ? undefined : dark,
              elements: {
                userButtonAvatarBox: 'w-10 h-10',
              },
            }}
            userProfileUrl='/dashboard?tab=profile'
          />
        </SignedIn>
        <SignedOut>
          <Link href='/sign-in'>
            <Button
              className='bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400 rounded-lg text-white'
              outline
            >
              Sign In
            </Button>
          </Link>
        </SignedOut>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href='/'>
          <Navbar.Link
            active={path === '/'}
            as={'div'}
            className={`${
              isDropdownOpen && path === '/'
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : ''
            }`}
          >
            Home
          </Navbar.Link>
        </Link>
        <Link href='/about'>
          <Navbar.Link
            active={path === '/about'}
            as={'div'}
            className={`${
              isDropdownOpen && path === '/about'
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : ''
            }`}
          >
            About
          </Navbar.Link>
        </Link>
        <Link href='/projects'>
          <Navbar.Link
            active={path === '/projects'}
            as={'div'}
            className={`${
              isDropdownOpen && path === '/projects'
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : ''
            }`}
          >
            Projects
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
