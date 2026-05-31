import { worldMagicMap } from '../data/worldMap';
import { buildPassportData } from './passportHelpers';
import { buildWorldMapProgress } from './worldMapHelpers';

export type MuseumMasterRankId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type MuseumMasterRankDefinition = {
  description: string;
  id: MuseumMasterRankId;
  title: string;
};

export type MuseumMasterRankStatus = MuseumMasterRankDefinition & {
  status: 'achieved' | 'current' | 'locked';
};

export type MuseumMasterRankResult = {
  achievedPassportStampCount: number;
  completedCityCount: number;
  completedCountryCount: number;
  completedMuseumCount: number;
  currentRank: MuseumMasterRankDefinition;
  missingRequirements: string[];
  nextRank: MuseumMasterRankDefinition | null;
  ranks: MuseumMasterRankStatus[];
  totalPassportStampCount: number;
};

type CollectionLike = {
  object_en: string;
  object_zh: string;
};

type CityMapLike = {
  emoji: string;
  id: string;
  museums: { id: string }[];
  name: string;
};

type MuseumLike = {
  exhibits: { id: string }[];
  id: string;
};

const MUSEUM_MASTER_RANKS: MuseumMasterRankDefinition[] = [
  { description: '你迈出了成为馆长的第一步。', id: 1, title: '见习馆长' },
  { description: '你已经能整理一个小小展柜啦。', id: 2, title: '初级馆长' },
  { description: '你已经开始整理自己的魔法展览啦！', id: 3, title: '小小策展人' },
  { description: '你能点亮城市里的魔法足迹了。', id: 4, title: '城市探索馆长' },
  { description: '你的探索已经扩展到整个国家。', id: 5, title: '国家探索馆长' },
  { description: '你的魔法地图正在照亮世界。', id: 6, title: '世界探索馆长' },
  { description: '你完成了传说级的魔法收藏旅程。', id: 7, title: '传奇魔法馆长' },
];

function getCompletedMuseumCount(museums: MuseumLike[], museumCollectedIds: string[]) {
  const collectedIds = new Set(museumCollectedIds);
  return museums.filter(
    (museum) => museum.exhibits.length > 0 && museum.exhibits.every((exhibit) => collectedIds.has(exhibit.id)),
  ).length;
}

function getStats({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  totalArtifactCount,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: CollectionLike[];
  museumCollectedIds: string[];
  museums: MuseumLike[];
  totalArtifactCount: number;
}) {
  const worldProgress = buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });
  const passport = buildPassportData({
    cityMapCompletedNodeIds,
    cityMaps,
  });
  const completedCountryCount = worldProgress.filter((country) => country.completed).length;
  const completedCityCount = worldProgress.reduce((sum, country) => sum + country.completedCityCount, 0);
  const allCountriesCompleted = worldProgress.length > 0 && worldProgress.every((country) => country.completed);
  const passportStamps = [...passport.cityStamps, ...passport.countryStamps, passport.worldStamp];

  return {
    allArtifactsCollected: collection.length >= totalArtifactCount,
    allCountriesCompleted,
    achievedPassportStampCount: passportStamps.filter((stamp) => stamp.status === 'unlocked').length,
    collectionCount: collection.length,
    completedCityCount,
    completedCountryCount,
    completedMuseumCount: getCompletedMuseumCount(museums, museumCollectedIds),
    totalArtifactCount,
    totalCountryCount: worldProgress.length,
    totalPassportStampCount: passportStamps.length,
  };
}

function isRankAchieved(rankId: MuseumMasterRankId, stats: ReturnType<typeof getStats>) {
  if (rankId === 1) {
    return stats.collectionCount >= 1;
  }

  if (rankId === 2) {
    return stats.collectionCount >= 5;
  }

  if (rankId === 3) {
    return stats.collectionCount >= 10 && stats.completedMuseumCount >= 1;
  }

  if (rankId === 4) {
    return stats.completedCityCount >= 1;
  }

  if (rankId === 5) {
    return stats.completedCountryCount >= 1;
  }

  if (rankId === 6) {
    return stats.allCountriesCompleted;
  }

  return stats.allArtifactsCollected && stats.allCountriesCompleted;
}

function getMissingRequirements(rankId: MuseumMasterRankId, stats: ReturnType<typeof getStats>) {
  const missing: string[] = [];

  if (rankId === 1 && stats.collectionCount < 1) {
    missing.push('还差 1 个藏品');
  }

  if (rankId === 2 && stats.collectionCount < 5) {
    missing.push(`还差 ${5 - stats.collectionCount} 个藏品`);
  }

  if (rankId === 3) {
    if (stats.collectionCount < 10) {
      missing.push(`还差 ${10 - stats.collectionCount} 个藏品`);
    }
    if (stats.completedMuseumCount < 1) {
      missing.push('还差 1 个博物馆');
    }
  }

  if (rankId === 4 && stats.completedCityCount < 1) {
    missing.push('还差 1 个城市');
  }

  if (rankId === 5 && stats.completedCountryCount < 1) {
    missing.push('还差 1 个国家');
  }

  if (rankId === 6 && !stats.allCountriesCompleted) {
    missing.push(`还差 ${stats.totalCountryCount - stats.completedCountryCount} 个国家`);
  }

  if (rankId === 7) {
    if (!stats.allArtifactsCollected) {
      missing.push(`还差 ${Math.max(0, stats.totalArtifactCount - stats.collectionCount)} 个藏品`);
    }
    if (!stats.allCountriesCompleted) {
      missing.push(`还差 ${stats.totalCountryCount - stats.completedCountryCount} 个国家`);
    }
  }

  return missing;
}

export function buildMuseumMasterRank({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  totalArtifactCount,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: CollectionLike[];
  museumCollectedIds: string[];
  museums: MuseumLike[];
  totalArtifactCount: number;
}): MuseumMasterRankResult {
  const stats = getStats({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
    totalArtifactCount,
  });
  const achievedRanks = MUSEUM_MASTER_RANKS.filter((rank) => isRankAchieved(rank.id, stats));
  const currentRank = achievedRanks[achievedRanks.length - 1] ?? MUSEUM_MASTER_RANKS[0];
  const nextRank = MUSEUM_MASTER_RANKS.find((rank) => rank.id > currentRank.id) ?? null;

  return {
    achievedPassportStampCount: stats.achievedPassportStampCount,
    completedCityCount: stats.completedCityCount,
    completedCountryCount: stats.completedCountryCount,
    completedMuseumCount: stats.completedMuseumCount,
    currentRank,
    missingRequirements: nextRank ? getMissingRequirements(nextRank.id, stats) : [],
    nextRank,
    ranks: MUSEUM_MASTER_RANKS.map((rank) => ({
      ...rank,
      status: rank.id < currentRank.id ? 'achieved' : rank.id === currentRank.id ? 'current' : 'locked',
    })),
    totalPassportStampCount: stats.totalPassportStampCount,
  };
}
