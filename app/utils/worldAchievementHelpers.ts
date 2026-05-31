import { worldMagicMap } from '../data/worldMap';
import { buildWorldMapProgress, type WorldMapCitySource } from './worldMapHelpers';

export type WorldAchievementId =
  | 'world_city_explorer'
  | 'world_china_explorer'
  | 'world_japan_explorer'
  | 'world_usa_explorer'
  | 'world_explorer';

const COUNTRY_ACHIEVEMENT_IDS: Record<string, WorldAchievementId> = {
  china: 'world_china_explorer',
  japan: 'world_japan_explorer',
  usa: 'world_usa_explorer',
};

export function getWorldAchievementIds({
  cityMapCompletedNodeIds,
  cityMaps,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: WorldMapCitySource[];
}): WorldAchievementId[] {
  const countries = buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });
  const achievementIds: WorldAchievementId[] = [];
  const hasCompletedCity = countries.some((country) => country.cities.some((city) => city.completed));

  if (hasCompletedCity) {
    achievementIds.push('world_city_explorer');
  }

  countries.forEach((country) => {
    const achievementId = COUNTRY_ACHIEVEMENT_IDS[country.countryId];
    if (achievementId && country.completed) {
      achievementIds.push(achievementId);
    }
  });

  if (countries.length > 0 && countries.every((country) => country.completed)) {
    achievementIds.push('world_explorer');
  }

  return achievementIds;
}
