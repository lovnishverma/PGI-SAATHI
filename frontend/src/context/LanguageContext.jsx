import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('pgi_saathi_lang') || 'hi'; // Default Hindi for user accessibility
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('pgi_saathi_contrast') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('pgi_saathi_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('pgi_saathi_contrast', highContrast);
  }, [highContrast]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, highContrast, setHighContrast }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
