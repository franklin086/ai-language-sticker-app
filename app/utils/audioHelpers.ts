import type { AudioLanguageCode } from '../data/audioLanguages';
import { audioManifest } from '../data/audioManifest';
import { AudioSourceType } from '../data/audioSourceTypes';
import {
  getAudioKeyForArtifact,
  getBestAudioSource,
  hasLocalAudioManifest,
} from './audioStrategyHelpers';

export type AudioArtifact = {
  aliases?: string[];
  humanAudio?: boolean | Partial<Record<AudioLanguageCode, string>>;
  objectEn?: string;
  objectZh?: string;
  object_en?: string;
  object_zh?: string;
};

export function getArtifactAudioName(artifact: AudioArtifact, language: AudioLanguageCode) {
  if (language === 'zh') {
    return artifact.objectZh || artifact.object_zh || artifact.objectEn || artifact.object_en || '';
  }

  return artifact.objectEn || artifact.object_en || artifact.objectZh || artifact.object_zh || '';
}

export { getAudioKeyForArtifact, hasLocalAudioManifest };

export function canUseBrowserAudio() {
  return typeof window !== 'undefined' && typeof window.Audio === 'function';
}

export function getLocalAudioPath(artifact: AudioArtifact, language: AudioLanguageCode) {
  const audioKey = getAudioKeyForArtifact(artifact);

  if (!audioKey) {
    return null;
  }

  return audioManifest[audioKey]?.[language] ?? null;
}

export function playArtifactAudio(artifact: AudioArtifact, language: AudioLanguageCode) {
  const artifactName = getArtifactAudioName(artifact, language);
  const source = getBestAudioSource(artifact, language);
  const audioKey = getAudioKeyForArtifact(artifact);
  const localAudioPath = getLocalAudioPath(artifact, language);

  switch (source) {
    case AudioSourceType.LOCAL_AUDIO:
      if ((language === 'zh' || language === 'en') && localAudioPath && canUseBrowserAudio()) {
        const audio = new window.Audio(localAudioPath);

        audio.play().catch((error: unknown) => {
          console.warn('Local audio playback failed', error);
          console.log('Fallback local audio placeholder', artifactName, language, localAudioPath);
        });
        return;
      }

      console.log('Use local audio', audioKey, language, localAudioPath);
      return;
    case AudioSourceType.HUMAN_AUDIO:
      console.log('Use future human audio', artifactName, language);
      return;
    case AudioSourceType.TTS_AUDIO:
      console.log('Use future TTS', artifactName, language);
      return;
    case AudioSourceType.NONE:
    default:
      console.log('No audio available', artifactName, language);
  }
}
