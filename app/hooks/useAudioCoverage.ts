import { useMemo } from 'react';
import type { AudioLanguageCode } from '../data/audioLanguages';
import { buildAudioCoverageStats, getCoverageLevel } from '../utils/audioCoverageHelpers';

export function useAudioCoverage(language: AudioLanguageCode = 'en') {
  const stats = useMemo(() => buildAudioCoverageStats(language), [language]);
  const coverageLevel = useMemo(() => getCoverageLevel(stats.coveragePercent), [stats.coveragePercent]);

  return {
    coverageLevel,
    stats,
  };
}
