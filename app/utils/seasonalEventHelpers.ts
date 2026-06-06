import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import { seasonalEvents, type SeasonalEvent, type SeasonalEventTargetType } from '../data/seasonalEvents';
import { findMuseumArtifact, getMuseumArtifactId, getMuseumArtifactMuseumMeta } from './artifactHelpers';

type CollectionLike = {
  object_en: string;
  object_zh: string;
};

export type SeasonalEventProgress = SeasonalEvent & {
  currentValue: number;
  percent: number;
  status: 'not_started' | 'in_progress' | 'completed';
};

export type SeasonalEventState = {
  activeEvent: SeasonalEventProgress;
  events: SeasonalEventProgress[];
};

function getPercent(currentValue: number, targetCount: number) {
  if (targetCount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((currentValue / targetCount) * 100));
}

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 5) {
    return 'spring';
  }

  if (month >= 6 && month <= 8) {
    return 'summer';
  }

  if (month >= 9 && month <= 11) {
    return 'autumn';
  }

  return 'winter';
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

function isNatureAnimalArtifact(artifact: MuseumArtifact) {
  const museumMeta = getMuseumArtifactMuseumMeta(artifact.museum);
  return museumMeta.id === 'animal' || museumMeta.id === 'nature' || includesAny(artifact.museum, ['动物', '自然']);
}

function isOceanArtifact(artifact: MuseumArtifact) {
  return includesAny(getArtifactSearchText(artifact), [
    '海',
    '海洋',
    '大海',
    '鲸',
    '海豚',
    '海龟',
    '珊瑚',
    '大堡礁',
    '冲浪',
    'ocean',
    'sea',
    'whale',
    'dolphin',
    'turtle',
    'coral',
    'reef',
    'surf',
  ]);
}

function isCivilizationArtifact(artifact: MuseumArtifact) {
  return includesAny(getArtifactSearchText(artifact), [
    '文化',
    '文明',
    '艺术',
    '卢浮宫',
    '巴黎',
    '大英',
    '金字塔',
    '印度',
    '罗塞塔',
    '法老',
    '木乃伊',
    '皇冠',
    '泰姬陵',
    'civilization',
    'culture',
    'art',
    'museum',
    'pyramid',
    'pharaoh',
    'crown',
  ]);
}

function isTechnologySpaceArtifact(artifact: MuseumArtifact) {
  const museumMeta = getMuseumArtifactMuseumMeta(artifact.museum);
  return (
    museumMeta.id === 'technology' ||
    includesAny(getArtifactSearchText(artifact), [
      '科技',
      '太空',
      '星空',
      '火箭',
      '卫星',
      '望远镜',
      '机器人',
      '无人机',
      '芯片',
      '电脑',
      'technology',
      'space',
      'rocket',
      'satellite',
      'telescope',
      'robot',
      'drone',
      'chip',
      'computer',
    ])
  );
}

function artifactMatchesTarget(artifact: MuseumArtifact, targetType: SeasonalEventTargetType) {
  if (targetType === 'nature_animal') {
    return isNatureAnimalArtifact(artifact);
  }

  if (targetType === 'ocean') {
    return isOceanArtifact(artifact);
  }

  if (targetType === 'civilization') {
    return isCivilizationArtifact(artifact);
  }

  return isTechnologySpaceArtifact(artifact);
}

function getDiscoveredSeasonalArtifacts({
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

function getSeasonalEventCurrentValue({
  artifacts,
  targetType,
}: {
  artifacts: MuseumArtifact[];
  targetType: SeasonalEventTargetType;
}) {
  return artifacts.filter((artifact) => artifactMatchesTarget(artifact, targetType)).length;
}

export function buildSeasonalEventState({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}): SeasonalEventState {
  const artifacts = getDiscoveredSeasonalArtifacts({ collection, museumCollectedIds });
  const events = seasonalEvents.map((event) => {
    const currentValue = getSeasonalEventCurrentValue({
      artifacts,
      targetType: event.targetType,
    });
    const status: SeasonalEventProgress['status'] =
      currentValue >= event.targetCount ? 'completed' : currentValue > 0 ? 'in_progress' : 'not_started';

    return {
      ...event,
      currentValue,
      percent: getPercent(currentValue, event.targetCount),
      status,
    };
  });
  const currentSeason = getCurrentSeason();

  return {
    activeEvent: events.find((event) => event.season === currentSeason) ?? events[0],
    events,
  };
}
