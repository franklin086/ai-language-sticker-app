import { worldMagicMap } from '../data/worldMap';
import { buildWorldMapProgress, type WorldMapCitySource } from './worldMapHelpers';

export type PassportStampData = {
  description: string;
  emoji: string;
  id: string;
  lockedDescription: string;
  name: string;
  status: 'locked' | 'unlocked';
};

export type PassportData = {
  cityStamps: PassportStampData[];
  countryStamps: PassportStampData[];
  worldStamp: PassportStampData;
};

function buildStamp({
  description,
  emoji,
  id,
  lockedDescription,
  name,
  unlocked,
}: {
  description: string;
  emoji: string;
  id: string;
  lockedDescription: string;
  name: string;
  unlocked: boolean;
}): PassportStampData {
  return {
    description,
    emoji,
    id,
    lockedDescription,
    name,
    status: unlocked ? 'unlocked' : 'locked',
  };
}

export function buildPassportData({
  cityMapCompletedNodeIds,
  cityMaps,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: WorldMapCitySource[];
}): PassportData {
  const countries = buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });
  const cityStamps = countries.flatMap((country) =>
    country.cities.map((city) =>
      buildStamp({
        description: `${city.cityName}魔法探索已完成`,
        emoji: city.emoji,
        id: `city-${city.cityId}`,
        lockedDescription: `完成${city.cityName}全部博物馆后解锁`,
        name: `${city.cityName}城市印章`,
        unlocked: city.completed,
      }),
    ),
  );
  const countryStamps = countries.map((country) =>
    buildStamp({
      description: `${country.countryName}全部城市已点亮`,
      emoji: country.emoji,
      id: `country-${country.countryId}`,
      lockedDescription: `点亮${country.countryName}全部城市后解锁`,
      name: `${country.countryName}探索印章`,
      unlocked: country.completed,
    }),
  );
  const worldCompleted = countries.length > 0 && countries.every((country) => country.completed);
  const worldStamp = buildStamp({
    description: '全部国家探索完成',
    emoji: '🌍',
    id: 'world-master',
    lockedDescription: '完成全部国家后解锁',
    name: '世界探索大师印章',
    unlocked: worldCompleted,
  });

  return {
    cityStamps,
    countryStamps,
    worldStamp,
  };
}
