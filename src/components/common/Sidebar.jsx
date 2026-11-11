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
 * Modern Sidebar component with dark green (dark mode) and light green (light mode).
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
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 
          w-64 md:w-20 lg:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${
            isDarkMode ? 'bg-[#051912]/95 text-emerald-50 border-r border-emerald-900/40' : 'bg-[#F7FEFA]/95 text-emerald-950 border-r border-emerald-200'
          } backdrop-blur-xl`}
      >
        {/* Brand header */}
        <div
          className={`flex items-center justify-between px-5 py-4 md:px-0 md:justify-center lg:justify-between lg:px-5 border-b ${
            isDarkMode ? 'border-emerald-900/40' : 'border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-3 md:flex-col md:gap-1.5 lg:flex-row lg:gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30 min-w-[38px] min-h-[38px] flex items-center justify-center">
              <Rocket size={20} className="text-white" />
            </div>
            <div className="md:hidden lg:block text-left md:text-center lg:text-left">
              <p className="text-sm font-extrabold tracking-tight">
                Startup CRM
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">EMERALD EDITION</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`md:hidden flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl p-2 transition ${
              isDarkMode ? 'text-emerald-300 hover:text-white hover:bg-emerald-900/40' : 'text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100'
            }`}
            aria-label="Close sidebar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section label */}
        <div className="px-5 pt-6 pb-2 md:hidden lg:block">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-400/60' : 'text-emerald-800/60'}`}>
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
                    ? 'sidebar-active text-white font-bold'
                    : isDarkMode
                    ? 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/30'
                    : 'text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/70'
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
                          ? 'bg-emerald-900/30 text-emerald-300 group-hover:text-white group-hover:bg-emerald-800/50'
                          : 'bg-emerald-100/80 text-emerald-800 group-hover:text-emerald-950 group-hover:bg-emerald-200'
                      }`}
                    >
                      <Icon size={17} />
                    </div>
                    <div className="flex-1 min-w-0 md:w-full md:text-center lg:text-left">
                      <p
                        className={`truncate text-sm font-bold tracking-tight ${
                          isActive
                            ? isDarkMode ? 'text-white' : 'text-emerald-950'
                            : isDarkMode ? 'text-emerald-200 group-hover:text-white' : 'text-emerald-800 group-hover:text-emerald-950'
                        }`}
                      >
                        {item.name}
                      </p>
                      <p className={`truncate text-[10px] md:hidden lg:block ${isDarkMode ? 'text-emerald-400/60' : 'text-emerald-700/70'}`}>
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
              ? 'bg-gradient-to-b from-emerald-900/40 to-emerald-950/20 border-emerald-800/40'
              : 'bg-gradient-to-b from-emerald-100/80 to-emerald-50 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 text-primary shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">AI Sales Copilot</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-300/70 mt-0.5">Automated lead scoring</p>
            </div>
          </div>
        </div>

        {/* Build version */}
        <div className="px-5 pb-4 text-center md:hidden lg:block">
          <p className="text-[10px] font-semibold text-emerald-600/70 dark:text-emerald-400/50 tracking-wider">v2.0 • EMERALD MOSS</p>
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);
