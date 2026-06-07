import { useState } from 'react';
import { audioLanguages, type AudioLanguageCode } from '../data/audioLanguages';

export function useAudioLanguage(defaultLanguage: AudioLanguageCode = 'en') {
  const [audioLanguage, setAudioLanguage] = useState<AudioLanguageCode>(defaultLanguage);

  return {
    audioLanguage,
    audioLanguages,
    setAudioLanguage,
  };
}
