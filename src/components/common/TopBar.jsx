import React, { memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Plus, Bell, Sun, Moon, LogOut, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AppearanceModal from './AppearanceModal';

const PAGE_TITLES = {
  '/': 'Dashboard Overview',
  '/leads': 'Leads Management',
  '/analytics': 'Analytics Overview',
  '/profile': 'Profile & Settings',
};

/**
 * Top navigation bar — shows page title + global action buttons, theme customization, and profile.
 */
const TopBar = memo(({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [appearanceOpen, setAppearanceOpen] = useState(false);

  const title = PAGE_TITLES[location.pathname] || 'Startup CRM Lite';

  // User initials for avatar
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const handleMenuToggle = () => {
    if (onMenuToggle) onMenuToggle();
  };

  return (
    <>
      <header className={`sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 lg:px-6 ${isDarkMode ? 'border-slate-800 bg-slate-900/95 text-slate-100' : 'border-slate-200 bg-white/95 text-slate-900'}`}>
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMenuToggle}
            className={`md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2.5 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <h2 className={`text-sm font-bold tracking-tight sm:text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Add Lead CTA */}
          <button
            onClick={() => navigate('/leads', { state: { openModal: true } })}
            className="flex min-h-[44px] shrink-0 items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white shadow transition-all hover:bg-primary-dark active:scale-95 sm:px-3.5 sm:py-2"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Lead</span>
          </button>

          {/* Theme & Typography Customizer Button */}
          <button
            onClick={() => setAppearanceOpen(true)}
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2.5 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
            aria-label="Customize theme, font, and font size"
            title="Appearance Settings (Theme, Font, Size)"
          >
            <Palette size={18} />
          </button>

          {/* Quick Light / Dark Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2.5 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
            aria-label="Toggle theme mode"
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User avatar with initials */}
          <button
            type="button"
            onClick={() => navigate('/profile')}
            title={user?.name || 'User'}
            className="flex h-[44px] w-[44px] shrink-0 select-none items-center justify-center rounded-lg bg-primary text-xs font-extrabold text-white shadow transition hover:opacity-90 sm:h-9 sm:w-9"
          >
            {initials}
          </button>

          {/* Notifications */}
          <button
            className={`relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2.5 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-danger" />
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2.5 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-red-950/30 hover:text-red-400' : 'text-slate-500 hover:bg-red-50 hover:text-red-500'}`}
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Appearance & Typography customization modal */}
      <AppearanceModal isOpen={appearanceOpen} onClose={() => setAppearanceOpen(false)} />
    </>
  );
});

TopBar.displayName = 'TopBar';
export default TopBar;
