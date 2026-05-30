import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { CITY_UNLOCK_REWARDS_STORAGE_KEY } from '../utils/storageKeys';
import type { WorldMapCitySource } from '../utils/worldMapHelpers';

export type CityUnlockReward = {
  badgeTitle: string;
  cityId: string;
  cityName: string;
};

type CityUnlockRewardHandlers = {
  addCompanionXp: (earnedXp: number, message: string, mood: string) => void;
  addXpAmount: (earnedXp: number) => void;
  openMagicChest: (nextCount: number) => void;
};

const CITY_UNLOCK_XP_REWARD = 100;
const CITY_UNLOCK_COMPANION_XP_REWARD = 30;

function readStoredCityUnlockRewardIds() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(CITY_UNLOCK_REWARDS_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return Array.from(new Set(parsed.filter((id) => typeof id === 'string' && id.trim())));
  } catch {
    return [];
  }
}

function saveStoredCityUnlockRewardIds(cityIds: string[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CITY_UNLOCK_REWARDS_STORAGE_KEY, JSON.stringify(cityIds));
  } catch {
    // City unlock rewards are local encouragement. The app should continue if storage is blocked.
  }
}

function getCompletedCityIds(cityMaps: WorldMapCitySource[], cityMapCompletedNodeIds: string[]) {
  const completedNodeIds = new Set(cityMapCompletedNodeIds);

  return cityMaps
    .filter((city) => city.museums.length > 0 && city.museums.every((museum) => completedNodeIds.has(museum.id)))
    .map((city) => city.id);
}

function getCityName(cityMaps: WorldMapCitySource[], cityId: string) {
  return cityMaps.find((city) => city.id === cityId)?.name ?? cityId;
}

export function useCityUnlockRewards({
  addCompanionXp,
  addXpAmount,
  cityMapCompletedNodeIds,
  cityMaps,
  openMagicChest,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: WorldMapCitySource[];
} & CityUnlockRewardHandlers) {
  const [claimedCityRewardIds, setClaimedCityRewardIds] = useState<string[]>(() => readStoredCityUnlockRewardIds());
  const [latestCityUnlockReward, setLatestCityUnlockReward] = useState<CityUnlockReward | null>(null);

  useEffect(() => {
    const completedCityIds = getCompletedCityIds(cityMaps, cityMapCompletedNodeIds);
    const nextRewardCityId = completedCityIds.find((cityId) => !claimedCityRewardIds.includes(cityId));

    if (!nextRewardCityId) {
      return;
    }

    const cityName = getCityName(cityMaps, nextRewardCityId);
    const nextClaimedCityRewardIds = [...claimedCityRewardIds, nextRewardCityId];

    addXpAmount(CITY_UNLOCK_XP_REWARD);
    openMagicChest(cityMapCompletedNodeIds.length + nextClaimedCityRewardIds.length);
    addCompanionXp(CITY_UNLOCK_COMPANION_XP_REWARD, `我们点亮了${cityName}城市徽章！`, '骄傲');

    setClaimedCityRewardIds(nextClaimedCityRewardIds);
    saveStoredCityUnlockRewardIds(nextClaimedCityRewardIds);
    setLatestCityUnlockReward({
      badgeTitle: `${cityName}城市徽章`,
      cityId: nextRewardCityId,
      cityName,
    });
  }, [addCompanionXp, addXpAmount, cityMapCompletedNodeIds, cityMaps, claimedCityRewardIds, openMagicChest]);

  const clearLatestCityUnlockReward = useCallback(() => {
    setLatestCityUnlockReward(null);
  }, []);

  return {
    claimedCityRewardIds,
    clearLatestCityUnlockReward,
    latestCityUnlockReward,
  };
}
