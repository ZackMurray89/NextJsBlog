'use client';

import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  const { theme } = useTheme();

  return (
    <div className='flex items-center justify-center p-3'>
      <SignUp
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
