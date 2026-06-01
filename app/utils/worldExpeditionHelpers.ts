import { worldExpeditions, type WorldExpedition, type WorldExpeditionType } from '../data/worldExpeditions';
import { worldMagicMap } from '../data/worldMap';
import { findMuseumArtifact, getMuseumArtifactMuseumMeta } from './artifactHelpers';
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

type MuseumLike = {
  exhibits: { id: string }[];
  id: string;
};

export type WorldExpeditionProgress = WorldExpedition & {
  currentValue: number;
  percent: number;
  status: 'in_progress' | 'completed';
};

export type WorldExpeditionState = {
  activeExpedition: WorldExpeditionProgress;
  expeditions: WorldExpeditionProgress[];
};

function getPercent(currentValue: number, target: number) {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((currentValue / target) * 100));
}

function getAnimalArtifactCount(collection: CollectionLike[]) {
  return collection.filter((item) => {
    const artifact = findMuseumArtifact({
      object_en: item.object_en,
      object_zh: item.object_zh,
    });

    return artifact ? getMuseumArtifactMuseumMeta(artifact.museum).id === 'animal' : false;
  }).length;
}

function getCompletedMuseumCount(museums: MuseumLike[], museumCollectedIds: string[]) {
  const collectedIds = new Set(museumCollectedIds);
  return museums.filter(
    (museum) => museum.exhibits.length > 0 && museum.exhibits.every((exhibit) => collectedIds.has(exhibit.id)),
  ).length;
}

function getExpeditionCurrentValue({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  type,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: CollectionLike[];
  museumCollectedIds: string[];
  museums: MuseumLike[];
  type: WorldExpeditionType;
}) {
  const worldProgress = buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });

  if (type === 'animal_artifacts') {
    return getAnimalArtifactCount(collection);
  }

  if (type === 'completed_museums') {
    return getCompletedMuseumCount(museums, museumCollectedIds);
  }

  if (type === 'completed_cities') {
    return worldProgress.reduce((sum, country) => sum + country.completedCityCount, 0);
  }

  if (type === 'completed_countries') {
    return worldProgress.filter((country) => country.completed).length;
  }

  return collection.length;
}

export function buildWorldExpeditionState({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: CollectionLike[];
  museumCollectedIds: string[];
  museums: MuseumLike[];
}): WorldExpeditionState {
  const expeditions = worldExpeditions.map((expedition) => {
    const currentValue = getExpeditionCurrentValue({
      cityMapCompletedNodeIds,
      cityMaps,
      collection,
      museumCollectedIds,
      museums,
      type: expedition.type,
    });
    const status: WorldExpeditionProgress['status'] = currentValue >= expedition.target ? 'completed' : 'in_progress';

    return {
      ...expedition,
      currentValue,
      percent: getPercent(currentValue, expedition.target),
      status,
    };
  });

  return {
    activeExpedition: expeditions.find((expedition) => expedition.status === 'in_progress') ?? expeditions[expeditions.length - 1],
    expeditions,
  };
}
