import { worldMagicMap } from '../data/worldMap';

export type NationalCitySource = {
  emoji: string;
  id: string;
  museums: {
    emoji: string;
    id: string;
    linkedMuseumId: string;
    name: string;
  }[];
  name: string;
};

export type NationalMuseumSource = {
  emoji: string;
  exhibits: { id: string }[];
  id: string;
  title: string;
};

export type NationalMuseumProgress = {
  completed: boolean;
  collectedCount: number;
  emoji: string;
  id: string;
  linkedMuseumId: string;
  name: string;
  percent: number;
  status: '待探索' | '探索中' | '已完成';
  totalCount: number;
};

export type NationalCityProgress = {
  cityId: string;
  cityName: string;
  completed: boolean;
  completedMuseumCount: number;
  emoji: string;
  museums: NationalMuseumProgress[];
  percent: number;
  status: '待探索' | '探索中' | '已点亮';
  totalMuseumCount: number;
};

export type NationalMapProgress = {
  cities: NationalCityProgress[];
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

function getMuseumProgress({
  cityMuseum,
  museumCollectedIds,
  museums,
}: {
  cityMuseum: NationalCitySource['museums'][number];
  museumCollectedIds: string[];
  museums: NationalMuseumSource[];
}): NationalMuseumProgress {
  const museum = museums.find((item) => item.id === cityMuseum.linkedMuseumId);
  const totalCount = museum?.exhibits.length ?? 0;
  const collectedCount = museum?.exhibits.filter((exhibit) => museumCollectedIds.includes(exhibit.id)).length ?? 0;
  const percent = getPercent(collectedCount, totalCount);
  const completed = totalCount > 0 && collectedCount === totalCount;
  const status: NationalMuseumProgress['status'] = completed ? '已完成' : collectedCount > 0 ? '探索中' : '待探索';

  return {
    completed,
    collectedCount,
    emoji: cityMuseum.emoji || museum?.emoji || '🏛️',
    id: cityMuseum.id,
    linkedMuseumId: cityMuseum.linkedMuseumId,
    name: cityMuseum.name || museum?.title || cityMuseum.id,
    percent,
    status,
    totalCount,
  };
}

export function buildNationalMapProgress({
  cityMapCompletedNodeIds,
  cityMaps,
  countryId,
  museumCollectedIds,
  museums,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: NationalCitySource[];
  countryId: string;
  museumCollectedIds: string[];
  museums: NationalMuseumSource[];
}): NationalMapProgress | null {
  const country = worldMagicMap.find((item) => item.id === countryId);

  if (!country) {
    return null;
  }

  const completedNodeIds = new Set(cityMapCompletedNodeIds);
  const cities = country.cities.map((worldCity) => {
    const cityMap = cityMaps.find((city) => city.id === worldCity.cityId);
    const cityMuseums = cityMap?.museums ?? worldCity.museums ?? [];
    const museumProgress = cityMuseums.map((cityMuseum) =>
      getMuseumProgress({
        cityMuseum,
        museumCollectedIds,
        museums,
      }),
    );
    const completedMuseumCount = cityMuseums.filter((cityMuseum) => completedNodeIds.has(cityMuseum.id)).length;
    const totalMuseumCount = cityMuseums.length;
    const percent = getPercent(completedMuseumCount, totalMuseumCount);
    const completed = totalMuseumCount > 0 && completedMuseumCount === totalMuseumCount;
    const status: NationalCityProgress['status'] = completed ? '已点亮' : completedMuseumCount > 0 ? '探索中' : '待探索';

    return {
      cityId: worldCity.cityId,
      cityName: worldCity.name || cityMap?.name || worldCity.cityId,
      completed,
      completedMuseumCount,
      emoji: worldCity.emoji || cityMap?.emoji || '🏙️',
      museums: museumProgress,
      percent,
      status,
      totalMuseumCount,
    };
  });
  const completedCityCount = cities.filter((city) => city.completed).length;
  const completedMuseumCount = cities.reduce((sum, city) => sum + city.completedMuseumCount, 0);
  const totalMuseumCount = cities.reduce((sum, city) => sum + city.totalMuseumCount, 0);

  return {
    cities,
    completedCityCount,
    completedMuseumCount,
    countryId: country.id,
    countryName: country.name,
    emoji: country.emoji,
    percent: getPercent(completedMuseumCount, totalMuseumCount),
    totalCityCount: cities.length,
    totalMuseumCount,
  };
}
