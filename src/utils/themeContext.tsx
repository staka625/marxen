import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Store } from '@tauri-apps/plugin-store';
import { DEFAULT_THEME, themeMap } from './themeMap';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeState | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const loadInitialTheme = async () => {
      try {
        const store = await Store.load('marxen_settings.json');
        const savedTheme = await store.get<string>('theme');
        if (savedTheme) {
          setThemeState(savedTheme);
        } else {
          setThemeState(DEFAULT_THEME);
        }
      } catch {
        setThemeState(DEFAULT_THEME);
      }
    };

    loadInitialTheme();
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      themeMap[theme]?.();
    }
  }, [theme]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeState => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
