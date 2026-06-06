import { collectionSets, type CollectionSet } from '../data/collectionSets';
import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import { findMuseumArtifact, getMuseumArtifactId, getMuseumArtifactKeywords, normalizeMuseumArtifactText } from './artifactHelpers';

type CollectionLike = {
  object_en: string;
  object_zh: string;
};

export type CollectionSetArtifactProgress = {
  artifact: MuseumArtifact | null;
  discovered: boolean;
  label: string;
  requiredName: string;
};

export type CollectionSetProgress = CollectionSet & {
  acquiredCount: number;
  artifacts: CollectionSetArtifactProgress[];
  missingCount: number;
  percent: number;
  status: 'not_started' | 'collecting' | 'completed';
  totalCount: number;
};

export type CollectionSetState = {
  closestSet: CollectionSetProgress;
  completionPercent: number;
  sets: CollectionSetProgress[];
};

function getPercent(currentValue: number, targetValue: number) {
  if (targetValue <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((currentValue / targetValue) * 100));
}

function getDiscoveredArtifactIds(collection: CollectionLike[], museumCollectedIds: string[]) {
  const discoveredIds = new Set(museumCollectedIds);

  collection.forEach((item) => {
    const artifact = findMuseumArtifact(item);

    if (artifact) {
      discoveredIds.add(getMuseumArtifactId(artifact));
    }
  });

  return discoveredIds;
}

function artifactMatchesRequiredName(artifact: MuseumArtifact, requiredName: string) {
  const normalizedRequiredName = normalizeMuseumArtifactText(requiredName);
  const keywords = getMuseumArtifactKeywords(artifact).map((keyword) => normalizeMuseumArtifactText(keyword));

  return keywords.some(
    (keyword) =>
      keyword === normalizedRequiredName ||
      keyword.includes(normalizedRequiredName) ||
      normalizedRequiredName.includes(keyword),
  );
}

function findRequiredArtifact(requiredName: string) {
  return museumArtifacts.find((artifact) => artifactMatchesRequiredName(artifact, requiredName)) ?? null;
}

function buildCollectionSetProgress({
  discoveredArtifactIds,
  set,
}: {
  discoveredArtifactIds: Set<string>;
  set: CollectionSet;
}): CollectionSetProgress {
  const artifacts = set.requiredArtifacts.map((requiredName) => {
    const artifact = findRequiredArtifact(requiredName);
    const discovered = artifact ? discoveredArtifactIds.has(getMuseumArtifactId(artifact)) : false;

    return {
      artifact,
      discovered,
      label: artifact?.objectZh ?? requiredName,
      requiredName,
    };
  });
  const acquiredCount = artifacts.filter((artifact) => artifact.discovered).length;
  const totalCount = artifacts.length;
  const status: CollectionSetProgress['status'] =
    acquiredCount >= totalCount ? 'completed' : acquiredCount > 0 ? 'collecting' : 'not_started';

  return {
    ...set,
    acquiredCount,
    artifacts,
    missingCount: Math.max(0, totalCount - acquiredCount),
    percent: getPercent(acquiredCount, totalCount),
    status,
    totalCount,
  };
}

export function buildCollectionSetState({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}): CollectionSetState {
  const discoveredArtifactIds = getDiscoveredArtifactIds(collection, museumCollectedIds);
  const sets = collectionSets.map((set) => buildCollectionSetProgress({ discoveredArtifactIds, set }));
  const collectingSets = sets.filter((set) => set.status !== 'completed' && set.acquiredCount > 0);
  const closestSet =
    collectingSets.sort((first, second) => second.percent - first.percent)[0] ??
    sets.find((set) => set.status !== 'completed') ??
    sets[sets.length - 1];
  const completionPercent = sets.length ? Math.round(sets.reduce((sum, set) => sum + set.percent, 0) / sets.length) : 0;

  return {
    closestSet,
    completionPercent,
    sets,
  };
}
