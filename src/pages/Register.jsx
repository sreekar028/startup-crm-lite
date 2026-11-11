import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Lock, User, Eye, EyeOff, UserPlus, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Register page styled with the new Obsidian Lumina theme.
 */
export default function Register() {
  const { register, isLoading } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await register(formData.name.trim(), formData.email.trim(), formData.password);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed.';
      setErrors({ server: message });
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
          Create your sales workspace and manage pipeline with AI
        </p>
      </div>

      {/* Card */}
      <div className="glass-panel w-full max-w-md p-8 sm:p-9 rounded-3xl relative z-10">
        <h2 className="text-lg font-black tracking-tight mb-6">Create your account</h2>

        {/* Server error */}
        {errors.server && (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-semibold text-red-500 dark:text-red-400">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                placeholder="Alex Morgan"
                className={`w-full rounded-2xl border px-4 py-3 pl-10 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                  errors.name
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'border-white/[0.08] bg-white/[0.03] text-white placeholder:text-zinc-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
            </div>
            {errors.name && <p className="text-[11px] text-red-400 font-semibold">{errors.name}</p>}
          </div>

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
                autoComplete="email"
                placeholder="alex@company.com"
                className={`w-full rounded-2xl border px-4 py-3 pl-10 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                  errors.email
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'border-white/[0.08] bg-white/[0.03] text-white placeholder:text-zinc-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 font-semibold">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Password <span className="font-normal text-zinc-500">(min 6 characters)</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="••••••••"
                className={`w-full rounded-2xl border px-4 py-3 pl-10 pr-10 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                  errors.password
                    ? 'border-red-500'
                    : isDarkMode
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
            {errors.password && <p className="text-[11px] text-red-400 font-semibold">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="••••••••"
                className={`w-full rounded-2xl border px-4 py-3 pl-10 pr-10 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                  errors.confirmPassword
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'border-white/[0.08] bg-white/[0.03] text-white placeholder:text-zinc-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
            </div>
            {errors.confirmPassword && <p className="text-[11px] text-red-400 font-semibold">{errors.confirmPassword}</p>}
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
                <UserPlus size={16} />
                <span>Create Free Workspace</span>
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-xs text-zinc-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary hover:underline transition-colors">
            Sign in
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
