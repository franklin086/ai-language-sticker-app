import type { WorldMapCountry } from '../data/worldMap';

export type WorldMapMuseumNode = {
  id: string;
};

export type WorldMapCitySource = {
  emoji: string;
  id: string;
  museums: WorldMapMuseumNode[];
  name: string;
};

export type WorldMapCityProgress = {
  cityId: string;
  cityName: string;
  completed: boolean;
  completedMuseumCount: number;
  emoji: string;
  percent: number;
  totalMuseumCount: number;
};

export type WorldMapCountryProgress = {
  cities: WorldMapCityProgress[];
  completed: boolean;
  completedCityCount: number;
  completedMuseumCount: number;
  countryId: string;
  countryName: string;
  emoji: string;
  percent: number;
  totalCityCount: number;
  totalMuseumCount: number;
};

function getPercent(completedCount: number, totalCount: number) {
  if (totalCount <= 0) {
    return 0;
  }

  return Math.round((completedCount / totalCount) * 100);
}

export function buildWorldMapProgress({
  cityMapCompletedNodeIds,
  cityMaps,
  worldMap,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: WorldMapCitySource[];
  worldMap: WorldMapCountry[];
}): WorldMapCountryProgress[] {
  const completedNodeIds = new Set(cityMapCompletedNodeIds);

  return worldMap.map((country) => {
    const cities = country.cities.map((worldCity) => {
      const cityMap = cityMaps.find((city) => city.id === worldCity.cityId);
      const totalMuseumCount = cityMap?.museums.length ?? 0;
      const completedMuseumCount = cityMap?.museums.filter((museum) => completedNodeIds.has(museum.id)).length ?? 0;
      const percent = getPercent(completedMuseumCount, totalMuseumCount);

      return {
        cityId: worldCity.cityId,
        cityName: worldCity.name || cityMap?.name || worldCity.cityId,
        completed: totalMuseumCount > 0 && completedMuseumCount === totalMuseumCount,
        completedMuseumCount,
        emoji: worldCity.emoji || cityMap?.emoji || '🏙️',
        percent,
        totalMuseumCount,
      };
    });

    const completedMuseumCount = cities.reduce((sum, city) => sum + city.completedMuseumCount, 0);
    const totalMuseumCount = cities.reduce((sum, city) => sum + city.totalMuseumCount, 0);
    const completedCityCount = cities.filter((city) => city.completed).length;
    const percent = getPercent(completedMuseumCount, totalMuseumCount);

    return {
      cities,
      completed: cities.length > 0 && completedCityCount === cities.length,
      completedCityCount,
      completedMuseumCount,
      countryId: country.id,
      countryName: country.name,
      emoji: country.emoji,
      percent,
      totalCityCount: cities.length,
      totalMuseumCount,
    };
  });
}
