import { KnowledgeCategory, knowledgeCategoryOrder } from '../data/knowledgeCategories';
import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';
import {
  findMuseumArtifact,
  getMuseumArtifactId,
  getMuseumArtifactMuseumMeta,
} from './artifactHelpers';
import { getKnowledgeCategory, getKnowledgeCategoryLabel } from './knowledgeCategoryHelpers';

export type CollectionBookFilterKey = 'all' | KnowledgeCategory;
export type CollectionBookSortKey = 'latest' | 'rarity' | 'discovered_first' | 'locked_first';
export type CollectionBookRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type CollectionBookFilter = {
  key: CollectionBookFilterKey;
  label: string;
};

export type CollectionBookSort = {
  key: CollectionBookSortKey;
  label: string;
};

export type CollectionBookArtifact = {
  artifact: MuseumArtifact;
  discovered: boolean;
  discoveredAt: string;
  id: string;
  museumId: string;
  rarity: CollectionBookRarity;
};

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export const COLLECTION_BOOK_SORTS: CollectionBookSort[] = [
  { key: 'latest', label: '最新发现' },
  { key: 'rarity', label: '稀有度' },
  { key: 'discovered_first', label: '已发现优先' },
  { key: 'locked_first', label: '未发现优先' },
];

const rarityRank: Record<CollectionBookRarity, number> = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
};

function normalizeRarity(value: string) {
  return value.trim().toLowerCase();
}

export function getCollectionBookRarity(artifact: MuseumArtifact): CollectionBookRarity {
  const rarity = normalizeRarity(artifact.rarity);

  if (rarity.includes('传奇') || rarity.includes('legendary') || rarity.includes('浼犲')) {
    return 'legendary';
  }

  if (rarity.includes('史诗') || rarity.includes('epic') || rarity.includes('鍙茶瘲')) {
    return 'epic';
  }

  if (rarity.includes('稀有') || rarity.includes('rare') || rarity.includes('绋')) {
    return 'rare';
  }

  return 'common';
}

export function getCollectionBookRarityLabel(rarity: CollectionBookRarity) {
  if (rarity === 'legendary') {
    return '🌈 传奇';
  }

  if (rarity === 'epic') {
    return '🟣 史诗';
  }

  if (rarity === 'rare') {
    return '🔵 稀有';
  }

  return '⚪ 普通';
}

function getAllFilterLabel(language: SupportedLanguage) {
  if (language === 'en') {
    return 'All';
  }

  if (language === 'es') {
    return 'Todo';
  }

  if (language === 'pt') {
    return 'Tudo';
  }

  if (language === 'ja') {
    return 'すべて';
  }

  return '全部';
}

function buildCollectionBookFilters(language: SupportedLanguage): CollectionBookFilter[] {
  return [
    { key: 'all', label: getAllFilterLabel(language) },
    ...knowledgeCategoryOrder.map((category) => ({
      key: category,
      label: getKnowledgeCategoryLabel(category, language),
    })),
  ];
}

function artifactMatchesFilter(artifact: MuseumArtifact, filterKey: CollectionBookFilterKey) {
  if (filterKey === 'all') {
    return true;
  }

  return getKnowledgeCategory(artifact) === filterKey;
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

function sortCollectionBookArtifacts(items: CollectionBookArtifact[], sortKey: CollectionBookSortKey) {
  return [...items].sort((first, second) => {
    if (sortKey === 'latest') {
      return second.discoveredAt.localeCompare(first.discoveredAt) || first.artifact.objectZh.localeCompare(second.artifact.objectZh);
    }

    if (sortKey === 'rarity') {
      return rarityRank[second.rarity] - rarityRank[first.rarity] || first.artifact.objectZh.localeCompare(second.artifact.objectZh);
    }

    if (sortKey === 'discovered_first') {
      return Number(second.discovered) - Number(first.discovered) || first.artifact.objectZh.localeCompare(second.artifact.objectZh);
    }

    return Number(first.discovered) - Number(second.discovered) || first.artifact.objectZh.localeCompare(second.artifact.objectZh);
  });
}

export function buildMuseumCollectionsBookState({
  collection,
  filterKey,
  language,
  museumCollectedIds,
  sortKey,
}: {
  collection: CollectionLike[];
  filterKey: CollectionBookFilterKey;
  language: SupportedLanguage;
  museumCollectedIds: string[];
  sortKey: CollectionBookSortKey;
}) {
  const discoveredAtById = getDiscoveredArtifactMap(collection, museumCollectedIds);
  const allArtifacts = museumArtifacts.map((artifact) => {
    const id = getMuseumArtifactId(artifact);

    return {
      artifact,
      discovered: discoveredAtById.has(id),
      discoveredAt: discoveredAtById.get(id) ?? '',
      id,
      museumId: getMuseumArtifactMuseumMeta(artifact.museum).id,
      rarity: getCollectionBookRarity(artifact),
    };
  });
  const filteredArtifacts = allArtifacts.filter((item) => artifactMatchesFilter(item.artifact, filterKey));
  const discoveredCount = allArtifacts.filter((item) => item.discovered).length;
  const totalCount = allArtifacts.length;
  const completionPercent = totalCount > 0 ? Math.round((discoveredCount / totalCount) * 100) : 0;

  return {
    artifacts: sortCollectionBookArtifacts(filteredArtifacts, sortKey),
    completionPercent,
    discoveredCount,
    filters: buildCollectionBookFilters(language),
    sortOptions: COLLECTION_BOOK_SORTS,
    totalCount,
  };
}
