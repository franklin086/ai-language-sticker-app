import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import { worldMemoryFragments, type WorldMemoryFragment, type WorldMemoryFragmentSourceType } from '../data/worldMemoryFragments';
import { worldMagicMap } from '../data/worldMap';
import { findMuseumArtifact, getMuseumArtifactId, getMuseumArtifactMuseumMeta } from './artifactHelpers';
import { buildWorldMapProgress } from './worldMapHelpers';

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

export type WorldMemoryFragmentProgress = WorldMemoryFragment & {
  currentValue: number;
  percent: number;
  status: 'not_started' | 'restoring' | 'restored';
};

export type WorldMemoryFragmentState = {
  closestFragment: WorldMemoryFragmentProgress;
  fragments: WorldMemoryFragmentProgress[];
  totalPercent: number;
};

function getPercent(currentValue: number, targetCount: number) {
  if (targetCount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((currentValue / targetCount) * 100));
}

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

function getDiscoveredArtifacts({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const discoveredById = new Map<string, MuseumArtifact>();

  collection.forEach((item) => {
    const artifact = findMuseumArtifact(item);

    if (artifact) {
      discoveredById.set(getMuseumArtifactId(artifact), artifact);
    }
  });

  museumArtifacts.forEach((artifact) => {
    const artifactId = getMuseumArtifactId(artifact);

    if (museumCollectedIds.includes(artifactId)) {
      discoveredById.set(artifactId, artifact);
    }
  });

  return [...discoveredById.values()];
}

function isAnimalFragmentArtifact(artifact: MuseumArtifact) {
  const museumMeta = getMuseumArtifactMuseumMeta(artifact.museum);
  return (
    museumMeta.id === 'animal' ||
    museumMeta.id === 'sydney-australian-animals' ||
    includesAny(getArtifactSearchText(artifact), ['动物', '澳洲动物', 'animal', 'koala', 'kangaroo', 'platypus'])
  );
}

function isOceanFragmentArtifact(artifact: MuseumArtifact) {
  return includesAny(getArtifactSearchText(artifact), [
    '海',
    '海洋',
    '海龟',
    '海豚',
    '鲸',
    '珊瑚',
    '大堡礁',
    '船',
    '帆船',
    '轮船',
    '潜水艇',
    '冲浪',
    'ocean',
    'sea',
    'turtle',
    'dolphin',
    'whale',
    'coral',
    'reef',
    'ship',
    'boat',
    'surf',
  ]);
}

function isTechnologyFragmentArtifact(artifact: MuseumArtifact) {
  const museumMeta = getMuseumArtifactMuseumMeta(artifact.museum);
  return (
    museumMeta.id === 'technology' ||
    museumMeta.id === 'london-science' ||
    includesAny(getArtifactSearchText(artifact), [
      '科技',
      '太空',
      '火箭',
      'AI芯片',
      '机器人',
      '电脑',
      '无人机',
      '卫星',
      '望远镜',
      '蒸汽机',
      'technology',
      'space',
      'rocket',
      'chip',
      'robot',
      'computer',
      'drone',
      'satellite',
      'telescope',
      'engine',
    ])
  );
}

function isCivilizationFragmentArtifact(artifact: MuseumArtifact) {
  const museumMeta = getMuseumArtifactMuseumMeta(artifact.museum);
  return (
    [
      'culture',
      'paris-louvre-magic',
      'paris-art',
      'london-british-civilization',
      'cairo-pyramid-civilization',
      'new-delhi-indian-civilization',
    ].includes(museumMeta.id) ||
    includesAny(getArtifactSearchText(artifact), [
      '文明',
      '文化',
      '艺术',
      '卢浮宫',
      '大英',
      '金字塔',
      '印度文明',
      '玛雅',
      '罗塞塔',
      '法老',
      '泰姬陵',
      'civilization',
      'culture',
      'art',
      'pyramid',
      'pharaoh',
      'taj mahal',
      'rosetta',
    ])
  );
}

function artifactMatchesSourceType(artifact: MuseumArtifact, sourceType: WorldMemoryFragmentSourceType) {
  if (sourceType === 'animal') {
    return isAnimalFragmentArtifact(artifact);
  }

  if (sourceType === 'ocean') {
    return isOceanFragmentArtifact(artifact);
  }

  if (sourceType === 'technology') {
    return isTechnologyFragmentArtifact(artifact);
  }

  if (sourceType === 'civilization') {
    return isCivilizationFragmentArtifact(artifact);
  }

  return false;
}

function getWorldProgress({
  cityMapCompletedNodeIds,
  cityMaps,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
}) {
  return buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });
}

function getCityProgressValue({
  cityMapCompletedNodeIds,
  cityMaps,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
}) {
  const worldProgress = getWorldProgress({ cityMapCompletedNodeIds, cityMaps });
  const completedCityCount = worldProgress.reduce((sum, country) => sum + country.completedCityCount, 0);
  const totalCityCount = worldProgress.reduce((sum, country) => sum + country.totalCityCount, 0);

  return {
    currentValue: completedCityCount,
    targetCount: Math.max(1, totalCityCount),
  };
}

function getWorldCoreProgressValue({
  cityMapCompletedNodeIds,
  cityMaps,
  discoveredArtifactCount,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  discoveredArtifactCount: number;
}) {
  const worldProgress = getWorldProgress({ cityMapCompletedNodeIds, cityMaps });
  const completedCountryCount = worldProgress.filter((country) => country.completed).length;
  const totalCountryCount = Math.max(1, worldProgress.length);
  const artifactPercent = getPercent(discoveredArtifactCount, museumArtifacts.length);
  const countryPercent = getPercent(completedCountryCount, totalCountryCount);

  return Math.round((artifactPercent + countryPercent) / 2);
}

function getFragmentValue({
  cityMapCompletedNodeIds,
  cityMaps,
  discoveredArtifacts,
  fragment,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  discoveredArtifacts: MuseumArtifact[];
  fragment: WorldMemoryFragment;
}) {
  if (fragment.sourceType === 'city') {
    return getCityProgressValue({ cityMapCompletedNodeIds, cityMaps });
  }

  if (fragment.sourceType === 'world_core') {
    return {
      currentValue: getWorldCoreProgressValue({
        cityMapCompletedNodeIds,
        cityMaps,
        discoveredArtifactCount: discoveredArtifacts.length,
      }),
      targetCount: fragment.targetCount,
    };
  }

  return {
    currentValue: discoveredArtifacts.filter((artifact) => artifactMatchesSourceType(artifact, fragment.sourceType)).length,
    targetCount: fragment.targetCount,
  };
}

export function buildWorldMemoryFragmentState({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: CollectionLike[];
  museumCollectedIds: string[];
}): WorldMemoryFragmentState {
  const discoveredArtifacts = getDiscoveredArtifacts({ collection, museumCollectedIds });
  const fragments = worldMemoryFragments.map((fragment) => {
    const value = getFragmentValue({
      cityMapCompletedNodeIds,
      cityMaps,
      discoveredArtifacts,
      fragment,
    });
    const status: WorldMemoryFragmentProgress['status'] =
      value.currentValue >= value.targetCount ? 'restored' : value.currentValue > 0 ? 'restoring' : 'not_started';

    return {
      ...fragment,
      currentValue: value.currentValue,
      percent: getPercent(value.currentValue, value.targetCount),
      status,
      targetCount: value.targetCount,
    };
  });
  const restoringFragments = fragments.filter((fragment) => fragment.status !== 'restored' && fragment.currentValue > 0);
  const closestFragment =
    restoringFragments.sort((a, b) => b.percent - a.percent)[0] ??
    fragments.find((fragment) => fragment.status !== 'restored') ??
    fragments[fragments.length - 1];
  const totalPercent = fragments.length
    ? Math.round(fragments.reduce((sum, fragment) => sum + fragment.percent, 0) / fragments.length)
    : 0;

  return {
    closestFragment,
    fragments,
    totalPercent,
  };
}
