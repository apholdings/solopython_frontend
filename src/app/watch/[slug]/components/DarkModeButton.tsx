'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DarkModeButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [effectClick, setEffectClick] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <button
          className="group items-center justify-center -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-white"
          onClick={() => {
            setTheme('light');
          }}
        >
          <SunIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
        </button>
      );
      // eslint-disable-next-line
    } else {
      return (
        <button
          className="group items-center justify-center -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-white"
          onClick={() => {
            setTheme('dark');
          }}
        >
          <MoonIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      );
    }
  };

  return renderThemeChanger();
}
