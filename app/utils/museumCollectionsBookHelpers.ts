import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import {
  findMuseumArtifact,
  getMuseumArtifactId,
  getMuseumArtifactMuseumMeta,
} from './artifactHelpers';

export type CollectionBookFilterKey = 'all' | 'animal' | 'nature' | 'technology' | 'civilization' | 'art' | 'world_culture';
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

export const COLLECTION_BOOK_FILTERS: CollectionBookFilter[] = [
  { key: 'all', label: '全部' },
  { key: 'animal', label: '动物' },
  { key: 'nature', label: '自然' },
  { key: 'technology', label: '科技' },
  { key: 'civilization', label: '文明' },
  { key: 'art', label: '艺术' },
  { key: 'world_culture', label: '世界文化' },
];

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

function includesAny(value: string, keywords: string[]) {
  const text = value.toLowerCase();
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function getArtifactSearchText(artifact: MuseumArtifact) {
  return [
    artifact.objectZh,
    artifact.objectEn,
    artifact.museum,
    artifact.story,
    ...(artifact.aliases ?? []),
  ].join(' ');
}

export function getCollectionBookRarity(artifact: MuseumArtifact): CollectionBookRarity {
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

function artifactMatchesFilter(artifact: MuseumArtifact, filterKey: CollectionBookFilterKey) {
  if (filterKey === 'all') {
    return true;
  }

  const museumId = getMuseumArtifactMuseumMeta(artifact.museum).id;
  const searchText = getArtifactSearchText(artifact);

  if (filterKey === 'animal') {
    return museumId === 'animal' || museumId === 'sydney-australian-animals' || includesAny(searchText, ['动物', 'animal']);
  }

  if (filterKey === 'nature') {
    return includesAny(searchText, ['自然', '海洋', '森林', '河流', '瀑布', '大海', '珊瑚', 'nature', 'ocean', 'forest']);
  }

  if (filterKey === 'technology') {
    return (
      museumId === 'technology' ||
      museumId === 'london-science' ||
      includesAny(searchText, ['科技', '火箭', '机器人', '电脑', '无人机', '芯片', 'technology', 'rocket', 'robot'])
    );
  }

  if (filterKey === 'civilization') {
    return includesAny(searchText, ['文明', '金字塔', '大英', '印度文明', '玛雅', '罗塞塔', '法老', 'civilization', 'pyramid']);
  }

  if (filterKey === 'art') {
    return includesAny(searchText, ['艺术', '卢浮宫', '巴黎艺术', '油画', '雕像', '蒙娜丽莎', 'art', 'painting', 'statue']);
  }

  return includesAny(searchText, ['世界文化', '职业', '生活', '人物', '香料', 'culture', 'profession', 'life', 'spice']);
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
  museumCollectedIds,
  sortKey,
}: {
  collection: CollectionLike[];
  filterKey: CollectionBookFilterKey;
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
    filters: COLLECTION_BOOK_FILTERS,
    sortOptions: COLLECTION_BOOK_SORTS,
    totalCount,
  };
}
