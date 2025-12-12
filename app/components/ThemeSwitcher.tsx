'use client';

import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'; // Tambahkan ikon monitor

export default function ThemeSwitcher() {
  // State untuk melacak tema: 'light', 'dark', atau 'system'
  const [theme, setTheme] = useState('system');

  // Efek ini berjalan sekali untuk mengatur tema awal dan listener
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Menentukan tema yang akan diterapkan
    const applyTheme = (newTheme) => {
      const root = document.documentElement;
      const isDark = 
        newTheme === 'dark' || (newTheme === 'system' && mediaQuery.matches);
      
      root.classList.toggle('dark', isDark);
    };

    // Handler saat tema sistem berubah
    const handleSystemThemeChange = (e) => {
      // Hanya update jika tema saat ini adalah 'system'
      if (localStorage.getItem('theme') === null || localStorage.getItem('theme') === 'system') {
        applyTheme('system');
      }
    };
    
    // Terapkan tema awal saat komponen dimuat
    const initialTheme = storedTheme || 'system';
    setTheme(initialTheme);
    applyTheme(initialTheme);
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup listener saat komponen unmount
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Fungsi untuk mengganti tema secara manual
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    const root = document.documentElement;

    if (newTheme === 'system') {
      localStorage.removeItem('theme'); // Hapus pilihan manual
      const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemIsDark);
    } else {
      localStorage.setItem('theme', newTheme); // Simpan pilihan manual
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <div className="flex items-center space-x-2 rounded-full bg-secondary p-1">
      <button
        onClick={() => changeTheme('light')}
        className={`rounded-full p-2 transition-colors ${theme === 'light' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
        aria-label="Light mode"
      >
        <FiSun />
      </button>
      <button
        onClick={() => changeTheme('dark')}
        className={`rounded-full p-2 transition-colors ${theme === 'dark' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
        aria-label="Dark mode"
      >
        <FiMoon />
      </button>
      <button
        onClick={() => changeTheme('system')}
        className={`rounded-full p-2 transition-colors ${theme === 'system' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
        aria-label="System theme"
      >
        <FiMonitor />
      </button>
    </div>
  );
}