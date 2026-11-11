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
    setColorTheme('indigo');
    setFontFamily('Plus Jakarta Sans');
    setFontSize('md');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.09] bg-[#0e0e16]/95 dark:bg-[#0e0e16]/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl text-zinc-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-primary-light text-white shadow-lg shadow-primary/25">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Theme & Appearance</h2>
              <p className="text-xs text-zinc-400">
                Personalize your workspace aesthetic, color palette, typography, and font sizing.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-white/[0.06] hover:text-white transition"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* 1. Interface Mode (Light / Dark) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Interface Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsDarkMode(false)}
                className={`flex items-center justify-center gap-3 rounded-2xl border p-3 font-semibold text-sm transition ${
                  !isDarkMode
                    ? 'border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary'
                    : 'border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Sun size={18} className={!isDarkMode ? 'text-primary' : 'text-amber-400'} />
                <span>Light Mode</span>
                {!isDarkMode && <Check size={16} className="ml-auto" />}
              </button>

              <button
                type="button"
                onClick={() => setIsDarkMode(true)}
                className={`flex items-center justify-center gap-3 rounded-2xl border p-3 font-semibold text-sm transition ${
                  isDarkMode
                    ? 'border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary'
                    : 'border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Moon size={18} className={isDarkMode ? 'text-primary' : 'text-indigo-400'} />
                <span>Dark Mode</span>
                {isDarkMode && <Check size={16} className="ml-auto" />}
              </button>
            </div>
          </div>

          {/* 2. Color Themes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Accent Color Palette
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {themes.map((t) => {
                const isSelected = colorTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setColorTheme(t.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/40'
                        : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow-md flex items-center justify-center"
                      style={{ backgroundColor: t.primary }}
                    >
                      {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{t.name}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{t.tag}</p>
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
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
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
                    className={`flex items-start justify-between p-3.5 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/40'
                        : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white tracking-tight">{f.name}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1" style={{ fontFamily: 'var(--font-sans)' }}>
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
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Typography Scale & Font Sizing
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
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition text-center ${
                      isSelected
                        ? 'border-primary bg-primary/15 ring-2 ring-primary/40 font-bold text-primary'
                        : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300'
                    }`}
                  >
                    <span className="text-xs font-bold">{s.label}</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5">{s.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Live font size preview */}
            <div className="mt-3.5 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <p className="text-xs font-medium text-zinc-400 mb-1">
                Live Typography Preview:
              </p>
              <p className="text-sm font-semibold text-zinc-100">
                "The quick brown fox jumps over the lazy dog. 0123456789"
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition"
          >
            <RotateCcw size={14} />
            <span>Reset to defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold shadow-lg shadow-primary/25 hover:brightness-110 transition active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
