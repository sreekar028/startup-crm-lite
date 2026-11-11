import React, { memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Plus, Bell, Sun, Moon, LogOut, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AppearanceModal from './AppearanceModal';

const PAGE_TITLES = {
  '/': 'Dashboard Overview',
  '/leads': 'Leads Management',
  '/analytics': 'Analytics & Intelligence',
  '/profile': 'Profile & Customization',
};

/**
 * Top navigation bar with frosted emerald styling and quick-action toolbars.
 */
const TopBar = memo(({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [appearanceOpen, setAppearanceOpen] = useState(false);

  const title = PAGE_TITLES[location.pathname] || 'Startup CRM Lite';

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
      <header className={`sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 lg:px-6 backdrop-blur-xl ${
        isDarkMode
          ? 'border-emerald-900/40 bg-[#061c14]/90 text-emerald-50'
          : 'border-emerald-200/80 bg-[#F0FDF4]/90 text-emerald-950'
      }`}>
        {/* Left: Menu hamburger + Page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleMenuToggle}
            className={`md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl p-2.5 transition-colors ${
              isDarkMode ? 'text-emerald-300 hover:bg-emerald-900/30 hover:text-white' : 'text-emerald-700 hover:bg-emerald-100 hover:text-emerald-950'
            }`}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black tracking-tight sm:text-base">
              {title}
            </h2>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* New Lead CTA */}
          <button
            onClick={() => navigate('/leads', { state: { openModal: true } })}
            className="flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:brightness-110 active:scale-95"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">New Lead</span>
          </button>

          {/* Theme & Appearance Customizer Popover Toggle */}
          <button
            onClick={() => setAppearanceOpen(true)}
            className={`flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl p-2.5 transition-all ${
              isDarkMode
                ? 'text-emerald-300 hover:bg-emerald-900/30 hover:text-white border border-emerald-900/50'
                : 'text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 border border-emerald-200'
            }`}
            aria-label="Theme, font, and size customizer"
            title="Appearance Settings (Theme, Font, Size)"
          >
            <Palette size={18} />
          </button>

          {/* Quick Light / Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className={`flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl p-2.5 transition-all ${
              isDarkMode
                ? 'text-emerald-300 hover:bg-emerald-900/30 hover:text-white border border-emerald-900/50'
                : 'text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 border border-emerald-200'
            }`}
            aria-label="Toggle theme mode"
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-emerald-700" />}
          </button>

          {/* User profile avatar */}
          <button
            type="button"
            onClick={() => navigate('/profile')}
            title={user?.name || 'User'}
            className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-xs font-black text-white shadow-md shadow-emerald-500/25 transition hover:scale-105"
          >
            {initials}
          </button>

          {/* Notification bell */}
          <button
            className={`relative flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl p-2.5 transition-all ${
              isDarkMode
                ? 'text-emerald-300 hover:bg-emerald-900/30 hover:text-white border border-emerald-900/50'
                : 'text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 border border-emerald-200'
            }`}
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger animate-ping" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger" />
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className={`flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl p-2.5 transition-all ${
              isDarkMode
                ? 'text-emerald-300 hover:bg-red-950/40 hover:text-red-400 border border-emerald-900/50'
                : 'text-emerald-700 hover:bg-red-50 hover:text-red-600 border border-emerald-200'
            }`}
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
