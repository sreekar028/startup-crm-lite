import React from 'react';
import { X, Check, Sun, Moon, Sparkles, Type, Sliders, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AppearanceModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  const handleReset = () => {
    setIsDarkMode(true);
    setColorTheme('blue');
    setFontFamily('Inter');
    setFontSize('md');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Theme & Appearance</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalize your workspace palette, typography, and font sizing.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* 1. Appearance Mode (Light / Dark) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Interface Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
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

          {/* 2. Color Themes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Accent Theme Palette
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {themes.map((t) => {
                const isSelected = colorTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setColorTheme(t.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/40'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow-sm flex items-center justify-center"
                      style={{ backgroundColor: t.primary }}
                    >
                      {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{t.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{t.tag}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Font Family */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Type size={15} className="text-primary" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Font Family
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {fonts.map((f) => {
                const isSelected = fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontFamily(f.id)}
                    style={{ fontFamily: f.family }}
                    className={`flex items-start justify-between p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/40'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold tracking-tight">{f.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1" style={{ fontFamily: 'var(--font-sans)' }}>
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

          {/* 4. Font Sizing */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Sliders size={15} className="text-primary" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Font Sizing Scale
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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

            {/* Live font size preview */}
            <div className="mt-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Preview Text Sample:
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                "The quick brown fox jumps over the lazy dog. 0123456789"
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
          >
            <RotateCcw size={14} />
            <span>Reset to defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow hover:bg-primary-dark transition active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
