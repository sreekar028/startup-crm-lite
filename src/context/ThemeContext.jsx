import React, { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const THEMES = [
  {
    id: 'blue',
    name: 'Ocean Blue',
    primary: '#2563EB',
    dark: '#1D4ED8',
    light: '#3B82F6',
    preview: '#2563EB',
    tag: 'Classic SaaS',
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    primary: '#059669',
    dark: '#047857',
    light: '#10B981',
    preview: '#059669',
    tag: 'Growth & Fintech',
  },
  {
    id: 'purple',
    name: 'Royal Violet',
    primary: '#7C3AED',
    dark: '#6D28D9',
    light: '#8B5CF6',
    preview: '#7C3AED',
    tag: 'Creative & Tech',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    primary: '#D97706',
    dark: '#B45309',
    light: '#F59E0B',
    preview: '#D97706',
    tag: 'Warm & Vibrant',
  },
  {
    id: 'rose',
    name: 'Rose Crimson',
    primary: '#E11D48',
    dark: '#BE123C',
    light: '#F43F5E',
    preview: '#E11D48',
    tag: 'Bold & Premium',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#0891B2',
    dark: '#0E7490',
    light: '#06B6D4',
    preview: '#0891B2',
    tag: 'Futuristic Neon',
  },
];

export const FONTS = [
  {
    id: 'Inter',
    name: 'Inter',
    family: "'Inter', system-ui, -apple-system, sans-serif",
    description: 'Clean, neutral and ultra-readable default',
  },
  {
    id: 'Plus Jakarta Sans',
    name: 'Plus Jakarta Sans',
    family: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    description: 'Crisp, contemporary geometric tech aesthetic',
  },
  {
    id: 'Outfit',
    name: 'Outfit',
    family: "'Outfit', system-ui, -apple-system, sans-serif",
    description: 'Modern geometric curves and distinct headings',
  },
  {
    id: 'Poppins',
    name: 'Poppins',
    family: "'Poppins', system-ui, -apple-system, sans-serif",
    description: 'Friendly, geometric and open styling',
  },
  {
    id: 'Roboto',
    name: 'Roboto',
    family: "'Roboto', system-ui, -apple-system, sans-serif",
    description: 'Balanced mechanical skeleton with smooth curves',
  },
  {
    id: 'JetBrains Mono',
    name: 'JetBrains Mono',
    family: "'JetBrains Mono', monospace",
    description: 'Developer monospace with high character distinction',
  },
];

export const FONT_SIZES = [
  {
    id: 'sm',
    label: 'Small',
    size: '14px',
    desc: 'Dense (87.5%)',
  },
  {
    id: 'md',
    label: 'Medium',
    size: '16px',
    desc: 'Default (100%)',
  },
  {
    id: 'lg',
    label: 'Large',
    size: '18px',
    desc: 'Spacious (112.5%)',
  },
  {
    id: 'xl',
    label: 'Extra Large',
    size: '20px',
    desc: 'Accessible (125%)',
  },
];

// Create Theme Context
const ThemeContext = createContext(null);

/**
 * ThemeProvider component managing light/dark mode, theme colors, font families, and font size scales.
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', true);
  const [colorTheme, setColorTheme] = useLocalStorage('startup-crm-color-theme', 'blue');
  const [fontFamily, setFontFamily] = useLocalStorage('startup-crm-font', 'Inter');
  const [fontSize, setFontSize] = useLocalStorage('startup-crm-font-size', 'md');

  // Synchronize CSS variables and classes on document root
  useEffect(() => {
    const root = document.documentElement;

    // 1. Dark/Light mode
    root.classList.toggle('dark', isDarkMode);
    root.style.colorScheme = isDarkMode ? 'dark' : 'light';

    // 2. Active theme colors
    const activeTheme = THEMES.find((t) => t.id === colorTheme) || THEMES[0];
    root.style.setProperty('--brand-primary', activeTheme.primary);
    root.style.setProperty('--brand-primary-dark', activeTheme.dark);
    root.style.setProperty('--brand-primary-light', activeTheme.light);
    root.setAttribute('data-theme', activeTheme.id);

    // 3. Active font family
    const activeFont = FONTS.find((f) => f.id === fontFamily) || FONTS[0];
    root.style.setProperty('--app-font-family', activeFont.family);
    document.body.style.fontFamily = activeFont.family;
    root.setAttribute('data-font', activeFont.id);

    // 4. Active font size (scales all rem units)
    const activeSize = FONT_SIZES.find((s) => s.id === fontSize) || FONT_SIZES[1];
    root.style.setProperty('--app-font-size', activeSize.size);
    root.style.fontSize = activeSize.size;
    root.setAttribute('data-size', activeSize.id);
  }, [isDarkMode, colorTheme, fontFamily, fontSize]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, [setIsDarkMode]);

  const contextValue = useMemo(() => ({
    isDarkMode,
    toggleTheme,
    setIsDarkMode,
    colorTheme,
    setColorTheme,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    themes: THEMES,
    fonts: FONTS,
    fontSizes: FONT_SIZES,
  }), [isDarkMode, toggleTheme, setIsDarkMode, colorTheme, setColorTheme, fontFamily, setFontFamily, fontSize, setFontSize]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom React hook to consume ThemeContext.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }
  return context;
}
