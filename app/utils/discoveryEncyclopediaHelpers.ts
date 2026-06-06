import { collectionSets } from '../data/collectionSets';
import { magicMuseumLeagues } from '../data/magicMuseumLeagues';
import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import { worldMagicMap } from '../data/worldMap';
import {
  findMuseumArtifact,
  getMuseumArtifactId,
  getMuseumArtifactKeywords,
  getMuseumArtifactMuseumMeta,
  normalizeMuseumArtifactText,
} from './artifactHelpers';
import { getCollectionBookRarity, type CollectionBookRarity } from './museumCollectionsBookHelpers';

export type EncyclopediaFilterKey = 'all' | 'unlocked' | 'locked';
export type EncyclopediaSortKey = 'latest' | 'az' | 'rarity';

export type EncyclopediaArtifactEntry = {
  artifact: MuseumArtifact;
  cityName: string;
  countryName: string;
  discovered: boolean;
  discoveredAt: string;
  fact: string;
  id: string;
  relatedLeagues: string[];
  relatedSets: string[];
  rarity: CollectionBookRarity;
};

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export const ENCYCLOPEDIA_FILTERS: { key: EncyclopediaFilterKey; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'unlocked', label: '已发现' },
  { key: 'locked', label: '未发现' },
];

export const ENCYCLOPEDIA_SORTS: { key: EncyclopediaSortKey; label: string }[] = [
  { key: 'latest', label: '最新发现' },
  { key: 'az', label: 'A-Z' },
  { key: 'rarity', label: '稀有度' },
];

const rarityRank: Record<CollectionBookRarity, number> = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
};

function getArtifactSearchText(artifact: MuseumArtifact) {
  return [
    artifact.objectZh,
    artifact.objectEn,
    artifact.museum,
    artifact.story,
    ...(artifact.aliases ?? []),
  ].join(' ');
}

function artifactMatchesRequiredName(artifact: MuseumArtifact, requiredName: string) {
  const normalizedRequiredName = normalizeMuseumArtifactText(requiredName);
  const keywords = getMuseumArtifactKeywords(artifact).map((keyword) => normalizeMuseumArtifactText(keyword));

  return keywords.some(
    (keyword) =>
      keyword === normalizedRequiredName ||
      keyword.includes(normalizedRequiredName) ||
      normalizedRequiredName.includes(keyword),
  );
}

function getDiscoveredArtifactMap(collection: CollectionLike[], museumCollectedIds: string[]) {
  const discoveredAtById = new Map<string, string>();

  museumCollectedIds.forEach((artifactId) => {
    discoveredAtById.set(artifactId, '');
  });

  collection.forEach((item) => {
    const artifact = findMuseumArtifact(item);

    if (!artifact) {
      return;
    }

    const artifactId = getMuseumArtifactId(artifact);
    const currentDate = discoveredAtById.get(artifactId) ?? '';
    const nextDate = item.discoveredAt ?? '';

    if (!currentDate || (nextDate && nextDate > currentDate)) {
      discoveredAtById.set(artifactId, nextDate);
    }
  });

  return discoveredAtById;
}

function getWorldLocation(artifact: MuseumArtifact) {
  const museumId = getMuseumArtifactMuseumMeta(artifact.museum).id;

  for (const country of worldMagicMap) {
    for (const city of country.cities) {
      const matchedMuseum = city.museums?.find((museum) => museum.linkedMuseumId === museumId || museum.id === museumId);

      if (matchedMuseum) {
        return {
          cityName: city.name,
          countryName: country.name,
        };
      }
    }
  }

  return {
    cityName: '',
    countryName: '',
  };
}

function getRelatedLeagues(artifact: MuseumArtifact) {
  const museumId = getMuseumArtifactMuseumMeta(artifact.museum).id;
  const searchText = getArtifactSearchText(artifact).toLowerCase();

  return magicMuseumLeagues
    .filter((league) => {
      if (league.museumIds.includes(museumId)) {
        return true;
      }

      return league.title
        .split('')
        .filter((char) => char.trim())
        .some((char) => searchText.includes(char.toLowerCase()));
    })
    .map((league) => `${league.emoji} ${league.title}`);
}

function getRelatedSets(artifact: MuseumArtifact) {
  return collectionSets
    .filter((set) => set.requiredArtifacts.some((requiredName) => artifactMatchesRequiredName(artifact, requiredName)))
    .map((set) => `${set.emoji} ${set.title}`);
}

function getArtifactFact(artifact: MuseumArtifact) {
  if (artifact.story) {
    return `${artifact.objectZh} 来自「${artifact.museum}」，这条记忆能帮助你认识 ${artifact.objectEn} 背后的故事。`;
  }

  return `继续探索 ${artifact.objectZh}，你会发现更多有趣的小知识。`;
}

function sortEntries(entries: EncyclopediaArtifactEntry[], sortKey: EncyclopediaSortKey) {
  return [...entries].sort((first, second) => {
    if (sortKey === 'latest') {
      return second.discoveredAt.localeCompare(first.discoveredAt) || first.artifact.objectZh.localeCompare(second.artifact.objectZh);
    }

    if (sortKey === 'az') {
      return first.artifact.objectEn.localeCompare(second.artifact.objectEn);
    }

    return rarityRank[second.rarity] - rarityRank[first.rarity] || first.artifact.objectZh.localeCompare(second.artifact.objectZh);
  });
}

function filterEntries(entries: EncyclopediaArtifactEntry[], filterKey: EncyclopediaFilterKey) {
  if (filterKey === 'unlocked') {
    return entries.filter((entry) => entry.discovered);
  }

  if (filterKey === 'locked') {
    return entries.filter((entry) => !entry.discovered);
  }

  return entries;
}

export function buildDiscoveryEncyclopediaState({
  collection,
  filterKey,
  museumCollectedIds,
  selectedArtifactId,
  sortKey,
}: {
  collection: CollectionLike[];
  filterKey: EncyclopediaFilterKey;
  museumCollectedIds: string[];
  selectedArtifactId: string | null;
  sortKey: EncyclopediaSortKey;
}) {
  const discoveredAtById = getDiscoveredArtifactMap(collection, museumCollectedIds);
  const entries = museumArtifacts.map((artifact) => {
    const id = getMuseumArtifactId(artifact);
    const location = getWorldLocation(artifact);

    return {
      artifact,
      cityName: location.cityName,
      countryName: location.countryName,
      discovered: discoveredAtById.has(id),
      discoveredAt: discoveredAtById.get(id) ?? '',
      fact: getArtifactFact(artifact),
      id,
      relatedLeagues: getRelatedLeagues(artifact),
      relatedSets: getRelatedSets(artifact),
      rarity: getCollectionBookRarity(artifact),
    };
  });
  const totalCount = entries.length;
  const unlockedCount = entries.filter((entry) => entry.discovered).length;
  const completionPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  const visibleEntries = sortEntries(filterEntries(entries, filterKey), sortKey);
  const selectedEntry = entries.find((entry) => entry.id === selectedArtifactId) ?? null;

  return {
    completionPercent,
    entries: visibleEntries,
    filters: ENCYCLOPEDIA_FILTERS,
    selectedEntry,
    sortOptions: ENCYCLOPEDIA_SORTS,
    totalCount,
    unlockedCount,
  };
}
