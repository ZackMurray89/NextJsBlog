'use client';

import { SignIn } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <div className='flex items-center justify-center p-3'>
      <SignIn
        appearance={{
          baseTheme: theme === 'light' ? undefined : dark,
          variables: {
            colorBackground: `${theme === 'dark' ? '#374151' : ''}`,
          },
        }}
      />
    </div>
  );
}
