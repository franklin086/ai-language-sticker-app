import { SUPPORTED_LANGUAGES, translations, type SupportedLanguage, type TranslationKey } from './translations';
import { LANGUAGE_STORAGE_KEY } from '../utils/storageKeys';

export const LANGUAGE_CHANGE_EVENT = 'ai-magic-camera-language-change';

function hasLocalStorage() {
  return typeof globalThis !== 'undefined' && typeof globalThis.localStorage !== 'undefined';
}

export function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);
}

export function getStoredLanguage(): SupportedLanguage {
  if (!hasLocalStorage()) {
    return 'zh';
  }

  const storedLanguage = globalThis.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return isSupportedLanguage(storedLanguage) ? storedLanguage : 'zh';
}

export function saveStoredLanguage(language: SupportedLanguage) {
  if (!hasLocalStorage()) {
    return;
  }

  globalThis.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

export function translate(language: SupportedLanguage, key: TranslationKey) {
  return translations[language][key] ?? translations.zh[key] ?? key;
}
