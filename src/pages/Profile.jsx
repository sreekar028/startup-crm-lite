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
      const message = err.response?.data?.message || 'Unable to update your profile right now.';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetAppearance = () => {
    setIsDarkMode(true);
    setColorTheme('blue');
    setFontFamily('Inter');
    setFontSize('md');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-black text-white shadow-lg shadow-primary/20">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Settings</p>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Profile & Appearance</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Customize your interface themes, fonts, font sizes, and manage account credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300">
            <ShieldCheck size={16} className="text-primary" />
            <span>{user?.email || 'Account secured'}</span>
          </div>
        </div>
      </div>

      {/* ── Appearance, Theme & Typography Section ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <Palette size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Interface & Typography</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Choose color themes, font families, and global typography scales.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAppearance}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>

        <div className="pt-6 space-y-6">
          {/* 1. Light vs Dark Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Theme Mode
            </label>
            <div className="grid grid-cols-2 max-w-md gap-3">
              <button
                type="button"
                onClick={() => setIsDarkMode(false)}
                className={`flex items-center justify-center gap-3 rounded-xl border p-3 font-semibold text-sm transition ${
                  !isDarkMode
                    ? 'border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Sun size={18} className={!isDarkMode ? 'text-primary' : 'text-amber-500'} />
                <span>Light Mode</span>
                {!isDarkMode && <Check size={16} className="ml-auto" />}
              </button>

              <button
                type="button"
                onClick={() => setIsDarkMode(true)}
                className={`flex items-center justify-center gap-3 rounded-xl border p-3 font-semibold text-sm transition ${
                  isDarkMode
                    ? 'border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Moon size={18} className={isDarkMode ? 'text-primary' : 'text-blue-400'} />
                <span>Dark Mode</span>
                {isDarkMode && <Check size={16} className="ml-auto" />}
              </button>
            </div>
          </div>

          {/* 2. Color Theme Palette */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
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
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/40'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span
                        className="w-6 h-6 rounded-full shadow-sm flex items-center justify-center"
                        style={{ backgroundColor: t.primary }}
                      >
                        {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{t.name}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">{t.tag}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Font Family Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Type size={16} className="text-primary" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Font Family
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
                    className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/40'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{f.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1" style={{ fontFamily: 'var(--font-sans)' }}>
                        {f.description}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-primary text-white shrink-0 ml-2 mt-0.5">
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Typography Scale / Font Size
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
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition text-center ${
                      isSelected
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/40 font-bold text-primary'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold">{s.label}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{s.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Typography Live Preview */}
            <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Live Font & Sizing Preview
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Startup CRM Lite: Modern Analytics & Lead Pipeline
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Experience high conversion velocities, smart forecasting, and intuitive lead tracking powered by AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── User Information and Security Forms ── */}
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <UserCircle2 size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Personal information</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Keep your contact details up to date.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Your name"
                required
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email address
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                autoComplete="email"
                className="mt-2 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Password update</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Leave these blank if you do not want to change your password.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Current password
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                autoComplete="current-password"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Current password"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              New password
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="New password"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Confirm new password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Confirm new password"
              />
            </label>
          </div>

          {error && <p className="mt-4 text-sm font-medium text-danger">{error}</p>}

          <button
            type="submit"
            disabled={isSaving || isLoading}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save credentials'}
          </button>
        </div>
      </form>
    </div>
  );
}
