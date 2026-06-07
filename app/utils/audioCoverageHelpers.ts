import type { AudioLanguageCode } from '../data/audioLanguages';
import { AudioSourceType } from '../data/audioSourceTypes';
import { museumArtifacts } from '../data/museumArtifacts';
import { getBestAudioSource } from './audioStrategyHelpers';

export type AudioCoverageStats = {
  totalArtifacts: number;
  localAudioCount: number;
  ttsAudioCount: number;
  humanAudioCount: number;
  noneAudioCount: number;
  coveragePercent: number;
};

export function buildAudioCoverageStats(language: AudioLanguageCode = 'en'): AudioCoverageStats {
  const stats: AudioCoverageStats = {
    totalArtifacts: museumArtifacts.length,
    localAudioCount: 0,
    ttsAudioCount: 0,
    humanAudioCount: 0,
    noneAudioCount: 0,
    coveragePercent: 0,
  };

  for (const artifact of museumArtifacts) {
    const source = getBestAudioSource(artifact, language);

    switch (source) {
      case AudioSourceType.LOCAL_AUDIO:
        stats.localAudioCount += 1;
        break;
      case AudioSourceType.TTS_AUDIO:
        stats.ttsAudioCount += 1;
        break;
      case AudioSourceType.HUMAN_AUDIO:
        stats.humanAudioCount += 1;
        break;
      case AudioSourceType.NONE:
      default:
        stats.noneAudioCount += 1;
        break;
    }
  }

  const coveredCount = stats.localAudioCount + stats.ttsAudioCount + stats.humanAudioCount;
  stats.coveragePercent =
    stats.totalArtifacts > 0 ? Math.round((coveredCount / stats.totalArtifacts) * 100) : 0;

  return stats;
}

export function getCoverageLevel(coveragePercent: number) {
  if (coveragePercent >= 95) {
    return '优秀';
  }

  if (coveragePercent >= 80) {
    return '良好';
  }

  if (coveragePercent >= 60) {
    return '发展中';
  }

  return '待建设';
}
