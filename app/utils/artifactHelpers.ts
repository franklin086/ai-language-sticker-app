import { MUSEUM_ARTIFACT_MUSEUMS, museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';

export type RecognitionResult = {
  object_en: string;
  object_zh: string;
  specific_en?: string;
  specific_zh?: string;
  brand?: string;
  subtype?: string;
  confidence?: string;
};

export type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';

export type MuseumExhibit = {
  emoji: string;
  id: string;
  keywords: string[];
  object_en: string;
  object_zh: string;
};

export type MagicMuseum = {
  emoji: string;
  exhibits: MuseumExhibit[];
  id: string;
  title: string;
};

export function normalizeMuseumArtifactText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const GENERIC_OBJECT_CANDIDATES = new Set([
  'animal',
  'painting',
  'object',
  'thing',
  'vehicle',
  'person',
  'toy',
  'item',
  'artwork',
  '动物',
  '画',
  '物体',
  '东西',
  '车辆',
  '人物',
  '玩具',
  '物品',
  '艺术品',
]);

export function getMuseumArtifactMuseumMeta(museumTitle: string) {
  return (
    MUSEUM_ARTIFACT_MUSEUMS.find((museum) => museum.title === museumTitle) ?? {
      emoji: '🏛️',
      id: normalizeMuseumArtifactText(museumTitle).replace(/\s+/g, '-'),
      title: museumTitle,
    }
  );
}

export function getMuseumArtifactId(artifact: MuseumArtifact) {
  return `${getMuseumArtifactMuseumMeta(artifact.museum).id}-${normalizeMuseumArtifactText(artifact.objectEn).replace(/\s+/g, '-')}`;
}

const MUSEUM_ARTIFACT_SYNONYMS: Record<string, string[]> = {
  Actor: ['actress', 'performer', '表演者'],
  Child: ['kid', 'boy', 'girl', '儿童'],
  Man: ['male', '男性'],
  Person: ['human', 'people', '人'],
  Woman: ['female', '女性'],
};

function getMuseumArtifactAliases(artifact: MuseumArtifact) {
  return Array.from(
    new Set([
      ...(artifact.aliases ?? []),
      ...(MUSEUM_ARTIFACT_SYNONYMS[artifact.objectEn] ?? []),
      ...(MUSEUM_ARTIFACT_SYNONYMS[artifact.objectZh] ?? []),
    ]),
  );
}

export function getMuseumArtifactKeywords(artifact: MuseumArtifact) {
  const aliases = getMuseumArtifactAliases(artifact);
  const translatedNames = Object.values(artifact.nameTranslations ?? {});

  return Array.from(
    new Set([
      artifact.objectEn,
      artifact.objectZh,
      ...aliases,
      ...translatedNames,
      normalizeMuseumArtifactText(artifact.objectEn),
      normalizeMuseumArtifactText(artifact.objectZh),
      ...aliases.map((alias) => normalizeMuseumArtifactText(alias)),
      ...translatedNames.map((name) => normalizeMuseumArtifactText(name)),
    ].filter(Boolean)),
  );
}

export function buildMuseumArtifactExhibit(artifact: MuseumArtifact): MuseumExhibit {
  return {
    emoji: artifact.emoji,
    id: getMuseumArtifactId(artifact),
    keywords: getMuseumArtifactKeywords(artifact),
    object_en: artifact.objectEn,
    object_zh: artifact.objectZh,
  };
}

export function buildMuseumArtifactMuseums(): MagicMuseum[] {
  return MUSEUM_ARTIFACT_MUSEUMS.map((museum) => ({
    emoji: museum.emoji,
    exhibits: museumArtifacts
      .filter((artifact) => artifact.museum === museum.title)
      .map((artifact) => buildMuseumArtifactExhibit(artifact)),
    id: museum.id,
    title: museum.title,
  }));
}

function mergeMuseumExhibits(existingExhibits: MuseumExhibit[], nextExhibits: MuseumExhibit[]) {
  const existingIds = new Set(existingExhibits.map((exhibit) => exhibit.id));
  return [...existingExhibits, ...nextExhibits.filter((exhibit) => !existingIds.has(exhibit.id))];
}

export function mergeMagicMuseumsWithArtifacts(baseMuseums: MagicMuseum[]) {
  const artifactMuseums = buildMuseumArtifactMuseums();
  const mergedMuseums = baseMuseums.map((museum) => {
    const artifactMuseum = artifactMuseums.find((item) => item.id === museum.id);
    if (!artifactMuseum) {
      return museum;
    }

    return {
      ...museum,
      exhibits: mergeMuseumExhibits(museum.exhibits, artifactMuseum.exhibits),
    };
  });
  const baseMuseumIds = new Set(baseMuseums.map((museum) => museum.id));
  return [...mergedMuseums, ...artifactMuseums.filter((museum) => !baseMuseumIds.has(museum.id))];
}

export type RecognitionMatchField =
  | 'specific_en'
  | 'specific_zh'
  | 'brand'
  | 'subtype'
  | 'object_en'
  | 'object_zh'
  | 'aliases'
  | 'nameTranslations';

export type RecognitionMatchCandidate = {
  field: RecognitionMatchField;
  normalizedValue: string;
  value: string;
};

export type MuseumArtifactMatchDetails = {
  artifact: MuseumArtifact;
  artifactId: string;
  candidate: string;
  field: RecognitionMatchField;
  matchedBy: 'object_en' | 'object_zh' | 'aliases' | 'nameTranslations';
  normalizedCandidate: string;
};

function makeRecognitionCandidate(field: RecognitionMatchField, value?: string) {
  const rawValue = value?.trim() ?? '';
  const normalizedValue = normalizeMuseumArtifactText(rawValue);

  if (!rawValue || !normalizedValue) {
    return null;
  }

  return {
    field,
    normalizedValue,
    value: rawValue,
  } satisfies RecognitionMatchCandidate;
}

export function getMuseumArtifactRecognitionCandidates(item: RecognitionResult) {
  return [
    makeRecognitionCandidate('specific_en', item.specific_en),
    makeRecognitionCandidate('specific_zh', item.specific_zh),
    makeRecognitionCandidate('brand', item.brand),
    makeRecognitionCandidate('subtype', item.subtype),
    makeRecognitionCandidate('object_en', item.object_en),
    makeRecognitionCandidate('object_zh', item.object_zh),
  ].filter((candidate): candidate is RecognitionMatchCandidate => Boolean(candidate));
}

function getMuseumArtifactSearchEntries(artifact: MuseumArtifact) {
  const aliases = getMuseumArtifactAliases(artifact);
  const translatedNames = Object.values(artifact.nameTranslations ?? {});

  return [
    { matchedBy: 'object_en' as const, value: artifact.objectEn },
    { matchedBy: 'object_zh' as const, value: artifact.objectZh },
    ...aliases.map((value) => ({ matchedBy: 'aliases' as const, value })),
    ...translatedNames.map((value) => ({ matchedBy: 'nameTranslations' as const, value })),
  ]
    .map((entry) => ({
      ...entry,
      normalizedValue: normalizeMuseumArtifactText(entry.value),
    }))
    .filter((entry) => entry.normalizedValue.length > 0);
}

function isBlockedGenericObjectCandidate(candidate: RecognitionMatchCandidate) {
  return (
    (candidate.field === 'object_en' || candidate.field === 'object_zh') &&
    GENERIC_OBJECT_CANDIDATES.has(candidate.normalizedValue)
  );
}

function candidateMatchesArtifactEntry(candidate: RecognitionMatchCandidate, entry: { normalizedValue: string }) {
  if (isBlockedGenericObjectCandidate(candidate)) {
    return false;
  }

  if (candidate.normalizedValue === entry.normalizedValue) {
    return true;
  }

  return (
    candidate.normalizedValue.includes(entry.normalizedValue) ||
    entry.normalizedValue.includes(candidate.normalizedValue)
  );
}

export function findMuseumArtifactMatchDetails(item: RecognitionResult): MuseumArtifactMatchDetails | null {
  const candidates = getMuseumArtifactRecognitionCandidates(item);
  const sortedArtifacts = [...museumArtifacts].sort(
    (a, b) => getMuseumArtifactKeywords(b).join(' ').length - getMuseumArtifactKeywords(a).join(' ').length,
  );

  for (const candidate of candidates) {
    for (const artifact of sortedArtifacts) {
      const matchedEntry = getMuseumArtifactSearchEntries(artifact).find((entry) => candidateMatchesArtifactEntry(candidate, entry));

      if (matchedEntry) {
        return {
          artifact,
          artifactId: getMuseumArtifactId(artifact),
          candidate: candidate.value,
          field: candidate.field,
          matchedBy: matchedEntry.matchedBy,
          normalizedCandidate: candidate.normalizedValue,
        };
      }
    }
  }

  return null;
}

export function findMuseumArtifact(item: RecognitionResult) {
  return findMuseumArtifactMatchDetails(item)?.artifact;
}

export function getMuseumArtifactCategory(artifact: MuseumArtifact): StickerCategoryKey {
  if (artifact.rarity === '传奇') {
    return 'legendary';
  }

  if (artifact.rarity === '史诗') {
    return 'epic';
  }

  if (artifact.rarity === '稀有') {
    return 'rare';
  }

  return 'common';
}

