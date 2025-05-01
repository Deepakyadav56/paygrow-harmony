
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define theme types and colors
export type ThemeMode = 'light' | 'dark';
export type ThemeName = 'default' | 'ocean' | 'forest' | 'sunset' | 'royal';

export interface Theme {
  name: ThemeName;
  label: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    card: string;
    border: string;
  };
}

// Define themes
export const themes: Record<ThemeName, Theme> = {
  default: {
    name: 'default',
    label: 'TimePay Teal',
    colors: {
      primary: '#14b8a6',
      secondary: '#2dd4bf',
      accent: '#0d9488',
      background: '#ffffff',
      foreground: '#1A1F36',
      muted: '#F5F7FA',
      card: '#ffffff',
      border: '#E4E9F2',
    },
  },
  ocean: {
    name: 'ocean',
    label: 'Ocean Blue',
    colors: {
      primary: '#0ea5e9',
      secondary: '#38bdf8',
      accent: '#0369a1',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f0f9ff',
      card: '#ffffff',
      border: '#e0f2fe',
    },
  },
  forest: {
    name: 'forest',
    label: 'Forest Green',
    colors: {
      primary: '#22c55e',
      secondary: '#4ade80',
      accent: '#16a34a',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f0fdf4',
      card: '#ffffff',
      border: '#dcfce7',
    },
  },
  sunset: {
    name: 'sunset',
    label: 'Sunset Orange',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#ea580c',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#fff7ed',
      card: '#ffffff',
      border: '#ffedd5',
    },
  },
  royal: {
    name: 'royal',
    label: 'Royal Purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#7c3aed',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f5f3ff',
      card: '#ffffff',
      border: '#ede9fe',
    },
  },
};

// Create dark mode versions of each theme
export const createDarkTheme = (theme: Theme): Theme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      background: '#0f172a',
      foreground: '#f8fafc',
      muted: '#1e293b',
      card: '#1e293b',
      border: '#334155',
    },
  };
};

interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  themeName: ThemeName;
  setMode: (mode: ThemeMode) => void;
  setThemeName: (name: ThemeName) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get stored preferences or use default values
  const [mode, setMode] = useState<ThemeMode>(() => {
    const storedMode = localStorage.getItem('themeMode');
    return (storedMode as ThemeMode) || 'light';
  });
  
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const storedTheme = localStorage.getItem('themeName');
    return (storedTheme as ThemeName) || 'default';
  });

  // Get the current theme object
  const theme = mode === 'light' ? themes[themeName] : createDarkTheme(themes[themeName]);
  
  // Toggle between light and dark modes
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  // Update localStorage when preferences change
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('themeName', themeName);
  }, [themeName]);

  // Apply theme CSS variables to the document root
  useEffect(() => {
    const root = document.documentElement;
    
    // Set theme color variables
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--foreground', theme.colors.foreground);
    root.style.setProperty('--muted', theme.colors.muted);
    root.style.setProperty('--card', theme.colors.card);
    root.style.setProperty('--border', theme.colors.border);
    
    // Set HSL variables for shadcn components
    const setHSLFromHex = (varName: string, hexColor: string) => {
      const r = parseInt(hexColor.slice(1, 3), 16) / 255;
      const g = parseInt(hexColor.slice(3, 5), 16) / 255;
      const b = parseInt(hexColor.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      
      let h = 0;
      let s = 0;
      let l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        
        h /= 6;
      }
      
      const hDegrees = Math.round(h * 360);
      const sPercent = Math.round(s * 100);
      const lPercent = Math.round(l * 100);
      
      root.style.setProperty(`--${varName}`, `${hDegrees} ${sPercent}% ${lPercent}%`);
    };
    
    // Convert hex colors to HSL for shadcn UI compatibility
    setHSLFromHex('primary', theme.colors.primary);
    setHSLFromHex('secondary', theme.colors.secondary);
    setHSLFromHex('accent', theme.colors.accent);
    
    // Set dark mode class
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mode]);
  
  return (
    <ThemeContext.Provider value={{ 
      mode, 
      theme, 
      themeName,
      setMode, 
      setThemeName, 
      toggleMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
