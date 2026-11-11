import React, { useEffect, useMemo, useState } from 'react';
import { Lock, Save, UserCircle2, ShieldCheck, Palette, Sun, Moon, Check, Type, Sliders, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { user, updateProfile, isLoading } = useAuth();
  const {
    isDarkMode,
    setIsDarkMode,
    colorTheme,
    setColorTheme,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    themes,
    fonts,
    fontSizes,
  } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.name) {
      setFormData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const initials = useMemo(() => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setIsSaving(true);

    try {
      const payload = { name: formData.name.trim() };
      if (formData.newPassword) {
        payload.oldPassword = formData.oldPassword;
        payload.newPassword = formData.newPassword;
      }

      await updateProfile(payload);
      setFormData((prev) => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Unable to update your profile right now.';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetAppearance = () => {
    setIsDarkMode(true);
    setColorTheme('indigo');
    setFontFamily('Plus Jakarta Sans');
    setFontSize('md');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-primary-light text-xl font-black text-white shadow-xl shadow-primary/30">
              {initials}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">System Settings</p>
              <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Profile & Customization</h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Personalize your workspace palette, active fonts, typography scale, and account security.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 backdrop-blur-md">
            <ShieldCheck size={18} className="text-primary" />
            <span>{user?.email || 'Account verified'}</span>
          </div>
        </div>
      </div>

      {/* ── Appearance, Theme & Typography Section ── */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl">
        <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
              <Palette size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Theme & Typography Center</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Switch color themes, geometric font families, and global typography scales.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAppearance}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>

        <div className="pt-6 space-y-6">
          {/* 1. Light vs Dark Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Appearance Mode
            </label>
            <div className="grid grid-cols-2 max-w-md gap-3">
              <button
                type="button"
                onClick={() => setIsDarkMode(false)}
                className={`flex items-center justify-center gap-3 rounded-2xl border p-3.5 font-bold text-sm transition ${
                  !isDarkMode
                    ? 'border-primary bg-primary/10 text-primary shadow-sm ring-2 ring-primary/40'
                    : 'border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                <Sun size={18} className={!isDarkMode ? 'text-primary' : 'text-amber-500'} />
                <span>Light Mode</span>
                {!isDarkMode && <Check size={16} className="ml-auto" />}
              </button>

              <button
                type="button"
                onClick={() => setIsDarkMode(true)}
                className={`flex items-center justify-center gap-3 rounded-2xl border p-3.5 font-bold text-sm transition ${
                  isDarkMode
                    ? 'border-primary bg-primary/15 text-primary shadow-sm ring-2 ring-primary/40'
                    : 'border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                <Moon size={18} className={isDarkMode ? 'text-primary' : 'text-indigo-400'} />
                <span>Dark Mode</span>
                {isDarkMode && <Check size={16} className="ml-auto" />}
              </button>
            </div>
          </div>

          {/* 2. Color Theme Palette */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Accent Color Palette
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {themes.map((t) => {
                const isSelected = colorTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setColorTheme(t.id)}
                    className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/40'
                        : 'border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span
                        className="w-6 h-6 rounded-full shadow-md flex items-center justify-center"
                        style={{ backgroundColor: t.primary }}
                      >
                        {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{t.name}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">{t.tag}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Font Family Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Type size={16} className="text-primary" />
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Font Family Selection
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {fonts.map((f) => {
                const isSelected = fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontFamily(f.id)}
                    style={{ fontFamily: f.family }}
                    className={`flex items-start justify-between p-4 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/40'
                        : 'border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">{f.name}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1" style={{ fontFamily: 'var(--font-sans)' }}>
                        {f.description}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-primary text-white shrink-0 ml-2 mt-0.5 shadow">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Font Sizing Scale */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders size={16} className="text-primary" />
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Typography Scale & Base Sizing
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {fontSizes.map((s) => {
                const isSelected = fontSize === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFontSize(s.id)}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition text-center ${
                      isSelected
                        ? 'border-primary bg-primary/15 ring-2 ring-primary/40 font-bold text-primary shadow-sm'
                        : 'border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/[0.04] text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    <span className="text-xs font-bold">{s.label}</span>
                    <span className="text-[10px] text-zinc-400 mt-0.5">{s.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Typography Live Preview */}
            <div className="mt-4 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Live Font & Sizing Typography Preview
              </p>
              <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                Startup CRM Lite: Modern Analytics & Lead Pipeline
              </h3>
              <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                Experience high conversion velocities, smart forecasting, and intuitive lead tracking powered by AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── User Information and Security Forms ── */}
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-6 sm:p-7 rounded-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
              <UserCircle2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Personal details</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Keep your account profile up to date.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Your name"
                required
              />
            </label>

            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Email address
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                autoComplete="email"
                className="mt-2 w-full cursor-not-allowed rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/[0.01] px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400"
              />
            </label>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7 rounded-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Password & Security</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Leave blank if keeping current password.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Current password
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                autoComplete="current-password"
                className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Current password"
              />
            </label>

            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              New password
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="New password"
              />
            </label>

            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Confirm new password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Confirm new password"
              />
            </label>
          </div>

          {error && <p className="mt-4 text-sm font-medium text-danger">{error}</p>}

          <button
            type="submit"
            disabled={isSaving || isLoading}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-dark px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save credentials'}
          </button>
        </div>
      </form>
    </div>
  );
}
