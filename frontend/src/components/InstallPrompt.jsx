import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { t, highContrast } = useLanguage();

  useEffect(() => {
    // Check if dismissed previously in this session
    const isDismissed = sessionStorage.getItem('pgi_install_dismissed');
    if (isDismissed) return;

    const handler = (e) => {
      // Prevent automatic browser mini-infobar on mobile
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If app is already installed
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pgi_install_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <aside 
      aria-label={t('install_pwa_title')}
      className={`mx-4 mt-3 mb-1 p-3.5 rounded-2xl border shadow-md flex items-center justify-between gap-3 transition-colors ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-linear-to-r from-blue-700 to-indigo-800 text-white border-blue-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl shrink-0 ${highContrast ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white'}`}>
          <Smartphone className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h4 className="font-bold text-xs tracking-tight">
            {t('install_pwa_title')}
          </h4>
          <p className="text-[11px] opacity-90 line-clamp-1">
            {t('install_pwa_desc')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleInstallClick}
          aria-label={t('install_pwa_btn')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 min-h-[40px] focus-visible:outline-2 focus-visible:outline-white ${
            highContrast
              ? 'bg-yellow-400 text-black hover:bg-yellow-300'
              : 'bg-white text-blue-900 hover:bg-blue-50'
          }`}
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('install_pwa_btn')}</span>
        </button>

        <button
          onClick={handleDismiss}
          aria-label={t('close_btn')}
          className="p-1.5 rounded-lg hover:bg-white/20 opacity-80 hover:opacity-100 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};
