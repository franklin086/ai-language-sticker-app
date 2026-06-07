export const AUDIO_LANGUAGE_CODES = ['zh', 'en', 'es', 'pt', 'ja'] as const;

export type AudioLanguageCode = (typeof AUDIO_LANGUAGE_CODES)[number];

export type AudioLanguage = {
  code: AudioLanguageCode;
  label: string;
};

export const audioLanguages: AudioLanguage[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
];
