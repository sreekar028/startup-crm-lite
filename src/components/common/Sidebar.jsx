import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, LineChart, Rocket, X, Sparkles, ChevronRight, UserCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  {
    name: 'Dashboard',
    subtitle: 'Overview & KPIs',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Leads',
    subtitle: 'Manage & Track Leads',
    path: '/leads',
    icon: Users,
  },
  {
    name: 'Analytics',
    subtitle: 'Insights & Performance',
    path: '/analytics',
    icon: LineChart,
  },
  {
    name: 'Profile',
    subtitle: 'Account & Appearance',
    path: '/profile',
    icon: UserCircle2,
  },
];

/**
 * Modern Sidebar component with frosted glass panel and adaptive responsiveness:
 * - Mobile: Drawer that slides in.
 * - Tablet: Compact icon rail.
 * - Desktop: Full branded navigation panel.
 */
function Sidebar({ isOpen, onClose }) {
  const { isDarkMode } = useTheme();

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 
          w-64 md:w-20 lg:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${
            isDarkMode ? 'bg-[#0d0d14]/95 text-zinc-100 border-r border-white/[0.07]' : 'bg-white/95 text-zinc-900 border-r border-zinc-200'
          } backdrop-blur-xl`}
      >
        {/* Brand header */}
        <div
          className={`flex items-center justify-between px-5 py-4 md:px-0 md:justify-center lg:justify-between lg:px-5 border-b ${
            isDarkMode ? 'border-white/[0.07]' : 'border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-3 md:flex-col md:gap-1.5 lg:flex-row lg:gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-primary to-primary-light shadow-lg shadow-primary/30 min-w-[38px] min-h-[38px] flex items-center justify-center">
              <Rocket size={20} className="text-white" />
            </div>
            <div className="md:hidden lg:block text-left md:text-center lg:text-left">
              <p className="text-sm font-extrabold tracking-tight">
                Startup CRM
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] font-bold tracking-widest text-primary uppercase">NEXT-GEN CRM</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`md:hidden flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl p-2 transition ${
              isDarkMode ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            aria-label="Close sidebar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section label */}
        <div className="px-5 pt-6 pb-2 md:hidden lg:block">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Workspace
          </p>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 md:px-2 lg:px-3 py-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={handleClose}
              className={({ isActive }) =>
                `flex flex-row md:flex-col lg:flex-row items-center gap-3 md:gap-1 lg:gap-3 px-3 md:px-1 lg:px-3 py-3 rounded-2xl transition-all group min-h-[46px] ${
                  isActive
                    ? 'sidebar-active text-white'
                    : isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`
              }
            >
              {({ isActive }) => {
                const Icon = item.icon;
                return (
                  <>
                    <div
                      className={`p-2 rounded-xl transition-all shrink-0 ${
                        isActive
                          ? 'bg-primary text-white shadow-md shadow-primary/30'
                          : isDarkMode
                          ? 'bg-white/[0.04] text-zinc-400 group-hover:text-white group-hover:bg-white/[0.08]'
                          : 'bg-zinc-100 text-zinc-600 group-hover:text-zinc-900 group-hover:bg-zinc-200'
                      }`}
                    >
                      <Icon size={17} />
                    </div>
                    <div className="flex-1 min-w-0 md:w-full md:text-center lg:text-left">
                      <p
                        className={`truncate text-sm font-bold tracking-tight ${
                          isActive
                            ? isDarkMode ? 'text-white' : 'text-zinc-900'
                            : isDarkMode ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-900'
                        }`}
                      >
                        {item.name}
                      </p>
                      <p className={`truncate text-[10px] md:hidden lg:block ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {item.subtitle}
                      </p>
                    </div>
                    {isActive && (
                      <ChevronRight size={14} className="text-primary shrink-0 md:hidden lg:block ml-auto" />
                    )}
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>

        {/* Feature Banner Card */}
        <div
          className={`m-3.5 rounded-2xl p-4 md:hidden lg:block border relative overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-b from-white/[0.05] to-white/[0.02] border-white/[0.08]'
              : 'bg-gradient-to-b from-primary/5 to-primary/[0.02] border-primary/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 text-primary shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">AI Sales Copilot</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Automated lead scoring</p>
            </div>
          </div>
        </div>

        {/* Build version */}
        <div className="px-5 pb-4 text-center md:hidden lg:block">
          <p className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-500 tracking-wider">v2.0 • NEO-OBSIDIAN</p>
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);
