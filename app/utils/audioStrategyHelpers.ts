import { audioManifest } from '../data/audioManifest';
import type { AudioLanguageCode } from '../data/audioLanguages';
import { AudioSourceType } from '../data/audioSourceTypes';

export type AudioStrategyArtifact = {
  aliases?: string[];
  humanAudio?: boolean | Partial<Record<AudioLanguageCode, string>>;
  objectEn?: string;
  objectZh?: string;
  object_en?: string;
  object_zh?: string;
};

const audioKeyAliases: Record<string, string> = {
  panda: 'panda',
  '大熊猫': 'panda',
  熊猫: 'panda',
  cat: 'cat',
  猫: 'cat',
  dog: 'dog',
  狗: 'dog',
  car: 'car',
  汽车: 'car',
  cup: 'cup',
  杯子: 'cup',
  book: 'book',
  书: 'book',
  phone: 'phone',
  'mobile phone': 'phone',
  smartphone: 'phone',
  手机: 'phone',
  智能手机: 'phone',
  computer: 'computer',
  laptop: 'computer',
  电脑: 'computer',
  笔记本电脑: 'computer',
  rocket: 'rocket',
  火箭: 'rocket',
  camera: 'camera',
  相机: 'camera',
};

function normalizeAudioText(value: string) {
  return value.trim().toLowerCase();
}

function getAudioCandidates(artifact: AudioStrategyArtifact) {
  return [
    artifact.objectEn,
    artifact.object_en,
    artifact.objectZh,
    artifact.object_zh,
    ...(artifact.aliases ?? []),
  ].filter((value): value is string => Boolean(value?.trim()));
}

function hasArtifactName(artifact: AudioStrategyArtifact) {
  return Boolean(
    artifact.objectEn?.trim() ||
      artifact.object_en?.trim() ||
      artifact.objectZh?.trim() ||
      artifact.object_zh?.trim()
  );
}

function hasHumanAudio(artifact: AudioStrategyArtifact, language: AudioLanguageCode) {
  if (artifact.humanAudio === true) {
    return true;
  }

  if (!artifact.humanAudio || typeof artifact.humanAudio !== 'object') {
    return false;
  }

  return Boolean(artifact.humanAudio[language]);
}

export function getAudioKeyForArtifact(artifact: AudioStrategyArtifact) {
  for (const candidate of getAudioCandidates(artifact)) {
    const normalizedCandidate = normalizeAudioText(candidate);
    const directMatch = audioKeyAliases[normalizedCandidate] ?? audioKeyAliases[candidate];

    if (directMatch) {
      return directMatch;
    }
  }

  return null;
}

export function hasLocalAudioManifest(artifact: AudioStrategyArtifact, language: AudioLanguageCode) {
  const audioKey = getAudioKeyForArtifact(artifact);

  if (!audioKey) {
    return false;
  }

  return Boolean(audioManifest[audioKey]?.[language]?.startsWith('/audio/'));
}

export function getBestAudioSource(artifact: AudioStrategyArtifact, language: AudioLanguageCode) {
  if (hasLocalAudioManifest(artifact, language)) {
    return AudioSourceType.LOCAL_AUDIO;
  }

  if (hasHumanAudio(artifact, language)) {
    return AudioSourceType.HUMAN_AUDIO;
  }

  if (hasArtifactName(artifact)) {
    return AudioSourceType.TTS_AUDIO;
  }

  return AudioSourceType.NONE;
}

export function describeAudioSource(source: AudioSourceType) {
  switch (source) {
    case AudioSourceType.LOCAL_AUDIO:
      return '本地发音';
    case AudioSourceType.TTS_AUDIO:
      return 'AI发音';
    case AudioSourceType.HUMAN_AUDIO:
      return '真人发音';
    case AudioSourceType.NONE:
    default:
      return '暂无发音';
  }
}
