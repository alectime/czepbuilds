import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    // Check for system preference
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Update document class and localStorage when theme changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    
    // Update CSS variables based on theme
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-color', '#080806');
      document.documentElement.style.setProperty('--text-color', '#f7f7f2');
      document.documentElement.style.setProperty('--text-muted', 'rgba(255, 255, 255, 0.7)');
      document.documentElement.style.setProperty('--border-color', '#333333');
    } else {
      document.documentElement.style.setProperty('--bg-color', '#f7f7f2');
      document.documentElement.style.setProperty('--text-color', '#080806');
      document.documentElement.style.setProperty('--text-muted', '#333333');
      document.documentElement.style.setProperty('--border-color', '#e0e0e0');
    }
  }, [theme]);

  // Listen for system changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
} 