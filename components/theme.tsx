// components/ThemeToggle.tsx
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-72 h-12 bg-gray-200 dark:bg-gray-700 rounded-full p-2 transition-all duration-300"
    >
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 w-3/5 h-8 bg-white dark:bg-black rounded-full shadow-md transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-[100px]' : 'translate-x-0'
        }`}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-black dark:text-white font-bold">
        Toggle Theme
      </div>
    </button>
  );
};

export default ThemeToggle;
