import { MUSEUM_ARTIFACT_MUSEUMS, museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';

export type RecognitionResult = {
  object_en: string;
  object_zh: string;
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
  return value.trim().toLowerCase();
}

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

  return [
    artifact.objectEn,
    artifact.objectZh,
    ...aliases,
    normalizeMuseumArtifactText(artifact.objectEn),
    normalizeMuseumArtifactText(artifact.objectZh),
    ...aliases.map((alias) => normalizeMuseumArtifactText(alias)),
  ];
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

export function findMuseumArtifact(item: RecognitionResult) {
  const objectEn = normalizeMuseumArtifactText(item.object_en);
  const objectZh = normalizeMuseumArtifactText(item.object_zh);
  const exactMatch = museumArtifacts.find(
    (artifact) =>
      normalizeMuseumArtifactText(artifact.objectEn) === objectEn ||
      normalizeMuseumArtifactText(artifact.objectZh) === objectZh,
  );

  if (exactMatch) {
    return exactMatch;
  }

  const text = normalizeMuseumArtifactText(`${item.object_en} ${item.object_zh}`);
  return [...museumArtifacts].sort((a, b) => b.objectEn.length - a.objectEn.length).find((artifact) =>
    getMuseumArtifactKeywords(artifact).some((keyword) => text.includes(normalizeMuseumArtifactText(keyword))),
  );
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

