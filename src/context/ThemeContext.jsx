import React, { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const THEMES = [
  {
    id: 'indigo',
    name: 'Electric Indigo',
    primary: '#6366F1',
    dark: '#4F46E5',
    light: '#818CF8',
    preview: '#6366F1',
    tag: 'Neo-SaaS Cyber (Default)',
  },
  {
    id: 'emerald',
    name: 'Neon Emerald',
    primary: '#10B981',
    dark: '#059669',
    light: '#34D399',
    preview: '#10B981',
    tag: 'Growth & Fintech',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#06B6D4',
    dark: '#0891B2',
    light: '#22D3EE',
    preview: '#06B6D4',
    tag: 'High-Tech Glass',
  },
  {
    id: 'rose',
    name: 'Sunset Rose',
    primary: '#F43F5E',
    dark: '#E11D48',
    light: '#FB7185',
    preview: '#F43F5E',
    tag: 'Bold & Dynamic',
  },
  {
    id: 'amber',
    name: 'Luminous Amber',
    primary: '#F59E0B',
    dark: '#D97706',
    light: '#FBBF24',
    preview: '#F59E0B',
    tag: 'Warm & High-Energy',
  },
  {
    id: 'cobalt',
    name: 'Royal Cobalt',
    primary: '#2563EB',
    dark: '#1D4ED8',
    light: '#38BDF8',
    preview: '#2563EB',
    tag: 'Classic Corporate',
  },
];

export const FONTS = [
  {
    id: 'Plus Jakarta Sans',
    name: 'Plus Jakarta Sans',
    family: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    description: 'Crisp, contemporary geometric tech aesthetic (Default)',
  },
  {
    id: 'Outfit',
    name: 'Outfit',
    family: "'Outfit', system-ui, sans-serif",
    description: 'Futuristic geometric curves and sleek headings',
  },
  {
    id: 'Syne',
    name: 'Syne',
    family: "'Syne', system-ui, sans-serif",
    description: 'High-end avant-garde design & striking titles',
  },
  {
    id: 'Space Grotesk',
    name: 'Space Grotesk',
    family: "'Space Grotesk', system-ui, sans-serif",
    description: 'Cyberpunk inspired proportioned tech typography',
  },
  {
    id: 'Poppins',
    name: 'Poppins',
    family: "'Poppins', system-ui, sans-serif",
    description: 'Friendly, geometric and smooth rounded styling',
  },
  {
    id: 'JetBrains Mono',
    name: 'JetBrains Mono',
    family: "'JetBrains Mono', monospace",
    description: 'Developer monospace with high distinction',
  },
];

export const FONT_SIZES = [
  {
    id: 'sm',
    label: 'Compact',
    size: '14px',
    desc: 'Dense View (87.5%)',
  },
  {
    id: 'md',
    label: 'Modern',
    size: '16px',
    desc: 'Default Scale (100%)',
  },
  {
    id: 'lg',
    label: 'Comfort',
    size: '17.5px',
    desc: 'Enhanced Readability (110%)',
  },
  {
    id: 'xl',
    label: 'Spacious',
    size: '19px',
    desc: 'Large / Accessible (120%)',
  },
];

// Create Theme Context
const ThemeContext = createContext(null);

/**
 * ThemeProvider component managing light/dark mode, theme colors, font families, and font size scales.
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', true);
  // Default to the new 'indigo' theme palette
  const [colorTheme, setColorTheme] = useLocalStorage('startup-crm-color-theme', 'indigo');
  // Default to the new 'Plus Jakarta Sans' font
  const [fontFamily, setFontFamily] = useLocalStorage('startup-crm-font', 'Plus Jakarta Sans');
  // Default font size scale
  const [fontSize, setFontSize] = useLocalStorage('startup-crm-font-size', 'md');

  // Synchronize CSS variables and classes on document root
  useEffect(() => {
    const root = document.documentElement;

    // 1. Dark/Light mode
    root.classList.toggle('dark', isDarkMode);
    root.style.colorScheme = isDarkMode ? 'dark' : 'light';

    // 2. Active theme colors (handle legacy 'blue' by falling back to indigo)
    const normalizedThemeId = colorTheme === 'blue' ? 'indigo' : colorTheme;
    const activeTheme = THEMES.find((t) => t.id === normalizedThemeId) || THEMES[0];
    root.style.setProperty('--brand-primary', activeTheme.primary);
    root.style.setProperty('--brand-primary-dark', activeTheme.dark);
    root.style.setProperty('--brand-primary-light', activeTheme.light);
    root.style.setProperty('--brand-primary-glow', `${activeTheme.primary}40`);
    root.setAttribute('data-theme', activeTheme.id);

    // 3. Active font family
    const activeFont = FONTS.find((f) => f.id === fontFamily) || FONTS[0];
    root.style.setProperty('--app-font-family', activeFont.family);
    document.body.style.fontFamily = activeFont.family;
    root.setAttribute('data-font', activeFont.id);

    // 4. Active font size (scales all rem units proportionally)
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
