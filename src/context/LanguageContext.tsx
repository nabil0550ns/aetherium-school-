import React, { createContext, useContext, useState, useEffect } from 'react';
import { locales, type Language, type LocaleData } from '../locales';

interface LanguageContextType {
  language: Language;
  dir: 'rtl' | 'ltr';
  isRtl: boolean;
  t: LocaleData;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';
  const isRtl = dir === 'rtl';
  const t = locales[language];

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    if (dir === 'rtl') {
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, dir, isRtl, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
