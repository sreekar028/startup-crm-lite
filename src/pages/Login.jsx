import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Lock, Eye, EyeOff, LogIn, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Login page styled to match the new Obsidian Lumina aesthetic.
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
      isDarkMode ? 'bg-[#09090d] text-zinc-100' : 'bg-[#f8fafc] text-zinc-900'
    }`}>
      {/* Background ambient light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-4 flex w-full max-w-md justify-end relative z-10">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all ${
            isDarkMode
              ? 'border-white/[0.08] bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white'
              : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
        </button>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-primary to-primary-light shadow-xl shadow-primary/30 mb-4 animate-float">
          <Rocket size={30} className="text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
          Startup CRM Lite
        </h1>
        <p className="text-sm mt-1 text-zinc-500 dark:text-zinc-400 font-medium">
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
            <label htmlFor="email" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
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
                    ? 'border-white/[0.08] bg-white/[0.03] text-white placeholder:text-zinc-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
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
                    ? 'border-white/[0.08] bg-white/[0.03] text-white placeholder:text-zinc-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition"
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
            className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-dark hover:brightness-110 rounded-2xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed min-h-[46px]"
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
        <p className="mt-6 text-center text-xs text-zinc-500 font-medium">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-bold text-primary hover:underline transition-colors">
            Create account free
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[11px] text-zinc-600 dark:text-zinc-500 font-medium relative z-10">
        © 2026 Startup CRM Lite • Intelligent Sales Platform
      </p>
    </div>
  );
}
