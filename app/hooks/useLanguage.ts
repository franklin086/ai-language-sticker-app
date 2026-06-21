import { useCallback, useEffect, useState } from 'react';
import {
  getStoredLanguage,
  LANGUAGE_CHANGE_EVENT,
  saveStoredLanguage,
  translate,
} from '../i18n/languageHelpers';
import type { SupportedLanguage, TranslationKey } from '../i18n/translations';

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => getStoredLanguage());

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.addEventListener !== 'function' ||
      typeof window.removeEventListener !== 'function'
    ) {
      return undefined;
    }

    const handleLanguageChange = () => {
      setCurrentLanguage(getStoredLanguage());
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    };
  }, []);

  const setLanguage = useCallback((language: SupportedLanguage) => {
    saveStoredLanguage(language);
    setCurrentLanguage(language);

    if (
      typeof window !== 'undefined' &&
      typeof window.dispatchEvent === 'function' &&
      typeof Event === 'function'
    ) {
      window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
    }
  }, []);

  const t = useCallback((key: TranslationKey) => translate(currentLanguage, key), [currentLanguage]);

  return {
    currentLanguage,
    setLanguage,
    t,
  };
}
