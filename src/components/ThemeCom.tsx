'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ThemeComProps {
  children: React.ReactNode;
}

export default function ThemeCom({ children }: ThemeComProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={theme}>
      <div className='bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200 min-h-screen'>
        {children}
      </div>
    </div>
  );
}
