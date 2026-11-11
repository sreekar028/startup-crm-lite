import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Lock, Eye, EyeOff, LogIn, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Login page styled with Dark Green in dark mode and Light Green in light mode.
 */
export default function Login() {
  const { login, isLoading } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password.');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden transition-colors ${
      isDarkMode ? 'bg-[#061c14] text-emerald-50' : 'bg-[#F0FDF4] text-emerald-950'
    }`}>
      {/* Background ambient light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="mb-4 flex w-full max-w-md justify-end relative z-10">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all ${
            isDarkMode
              ? 'border-emerald-850/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40 hover:text-white'
              : 'border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-100'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-emerald-700" />}
        </button>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-xl shadow-emerald-500/30 mb-4 animate-float">
          <Rocket size={30} className="text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-950 to-emerald-700 dark:from-emerald-50 dark:to-emerald-300 bg-clip-text text-transparent">
          Startup CRM Lite
        </h1>
        <p className="text-sm mt-1 text-emerald-700/80 dark:text-emerald-300/80 font-medium">
          Sign in to your sales intelligence command center
        </p>
      </div>

      {/* Card */}
      <div className="glass-panel w-full max-w-md p-8 sm:p-9 rounded-3xl relative z-10">
        <h2 className="text-lg font-black tracking-tight mb-6">Welcome back</h2>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-semibold text-red-500 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-emerald-800 dark:text-emerald-300/80 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500/80" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="username"
                placeholder="you@company.com"
                className={`w-full rounded-2xl border px-4 py-3 pl-10 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                  isDarkMode
                    ? 'border-emerald-900/60 bg-emerald-950/40 text-white placeholder:text-emerald-700/60'
                    : 'border-emerald-200 bg-white text-emerald-950 placeholder:text-emerald-400'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-emerald-800 dark:text-emerald-300/80 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500/80" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className={`w-full rounded-2xl border px-4 py-3 pl-10 pr-10 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                  isDarkMode
                    ? 'border-emerald-900/60 bg-emerald-950/40 text-white placeholder:text-emerald-700/60'
                    : 'border-emerald-200 bg-white text-emerald-950 placeholder:text-emerald-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500/70 hover:text-emerald-300 transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed min-h-[46px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-xs text-emerald-700/70 dark:text-emerald-400/70 font-medium">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-bold text-primary hover:underline transition-colors">
            Create account free
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[11px] text-emerald-700/60 dark:text-emerald-500/50 font-medium relative z-10">
        © 2026 Startup CRM Lite • Intelligent Sales Platform
      </p>
    </div>
  );
}
