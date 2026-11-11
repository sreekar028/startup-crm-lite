import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LineChart, UserCircle2 } from 'lucide-react';
import Sidebar from './components/common/Sidebar';
import TopBar from './components/common/TopBar';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './context/ThemeContext';

// Auth pages don't get the sidebar/topbar shell
const AUTH_ROUTES = ['/login', '/register'];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const { isDarkMode } = useTheme();

  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {isAuthPage ? (
        /* ── Auth-only layout: no sidebar, no topbar ── */
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#061c14] text-emerald-50' : 'bg-[#F0FDF4] text-emerald-950'}`}>
          <AppRoutes />
        </div>
      ) : (
        /* ── Main App layout with Dark Green in dark mode and Light Green in light mode ── */
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#061c14] text-emerald-50' : 'bg-[#F0FDF4] text-emerald-950'}`}>
          {/* Sidebar (drawer on mobile, side navigation on tablet+) */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main content column */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen">
            {/* Top bar */}
            <TopBar onMenuToggle={() => setSidebarOpen(true)} />

            {/* Page content */}
            <main className="flex-1 overflow-x-hidden pb-16 md:pb-0">
              <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
                <AppRoutes />
              </div>
            </main>

            {/* Footer */}
            <footer className={`border-t px-6 py-4 text-center mb-16 md:mb-0 ${
              isDarkMode ? 'border-emerald-900/40 text-emerald-400/80' : 'border-emerald-200/90 text-emerald-800/80'
            }`}>
              <p className="text-[11px] tracking-wide font-medium">
                © 2026 Startup CRM Lite • AI-Powered Sales Platform
              </p>
            </footer>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-40 md:hidden flex h-16 items-center justify-around border-t backdrop-blur-xl ${
              isDarkMode ? 'border-emerald-900/50 bg-[#051912]/95 text-emerald-300' : 'border-emerald-200 bg-[#F0FDF4]/95 text-emerald-900'
            }`}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex h-full w-full flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-primary' : isDarkMode ? 'text-emerald-400 hover:text-white' : 'text-emerald-700 hover:text-emerald-950'
                }`
              }
              aria-label="Navigate to Dashboard"
            >
              <LayoutDashboard size={20} />
              <span className="mt-1 text-[10px] font-bold">Dashboard</span>
            </NavLink>
            <NavLink
              to="/leads"
              className={({ isActive }) =>
                `flex h-full w-full flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-primary' : isDarkMode ? 'text-emerald-400 hover:text-white' : 'text-emerald-700 hover:text-emerald-950'
                }`
              }
              aria-label="Navigate to Leads Management"
            >
              <Users size={20} />
              <span className="mt-1 text-[10px] font-bold">Leads</span>
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex h-full w-full flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-primary' : isDarkMode ? 'text-emerald-400 hover:text-white' : 'text-emerald-700 hover:text-emerald-950'
                }`
              }
              aria-label="Navigate to Analytics Overview"
            >
              <LineChart size={20} />
              <span className="mt-1 text-[10px] font-bold">Analytics</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex h-full w-full flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-primary' : isDarkMode ? 'text-emerald-400 hover:text-white' : 'text-emerald-700 hover:text-emerald-950'
                }`
              }
              aria-label="Navigate to Profile"
            >
              <UserCircle2 size={20} />
              <span className="mt-1 text-[10px] font-bold">Profile</span>
            </NavLink>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: isDarkMode ? '#08251c' : '#FFFFFF',
            color: isDarkMode ? '#ECFDF5' : '#064E3B',
            border: isDarkMode ? '1px solid rgba(52, 211, 153, 0.25)' : '1px solid #A7F3D0',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 20px 40px -8px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(16px)',
          },
          success: { style: { borderLeft: '4px solid #10B981' } },
          error: { style: { borderLeft: '4px solid #EF4444' } },
        }}
      />
    </>
  );
}
