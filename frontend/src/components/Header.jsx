import React from 'react';
import { AlertTriangle, Globe, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Header = ({ onOpenEmergency }) => {
  const { lang, setLang, t, highContrast, setHighContrast } = useLanguage();

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors border-b ${
      highContrast 
        ? 'bg-black text-white border-yellow-400' 
        : 'bg-white/95 backdrop-blur-md text-slate-900 border-slate-200'
    }`}>
      {/* Red Emergency Warning Bar */}
      <div className="bg-red-600 text-white px-3 py-1.5 text-xs flex items-center justify-between font-medium">
        <div className="flex items-center gap-1.5 truncate">
          <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0 animate-bounce" />
          <span className="truncate">{t('emergency_banner_desc')}</span>
        </div>
        <button
          onClick={onOpenEmergency}
          className="ml-2 bg-white text-red-700 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 hover:bg-yellow-100 transition-colors shadow-sm"
        >
          {t('emergency_action_btn')}
        </button>
      </div>

      {/* Main Header bar */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏥</span>
            <h1 className="font-bold text-lg md:text-xl tracking-tight text-blue-900">
              {t('app_title')}
            </h1>
            <span className="hidden sm:inline-block text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200">
              PGIMER
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block truncate max-w-sm md:max-w-md">
            {t('tagline')}
          </p>
        </div>

        {/* Controls: Accessibility High Contrast & Language Selector */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setHighContrast(!highContrast)}
            aria-label="Toggle High Contrast"
            title="High Contrast Mode"
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              highContrast 
                ? 'bg-yellow-400 text-black border-yellow-500 font-bold' 
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'hi' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('pa')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'pa' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ਪੰਜਾਬੀ
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
