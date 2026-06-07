import { knowledgeCollections, type KnowledgeCollection } from '../data/knowledgeCollections';
import type { MuseumArtifact } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';
import { findMuseumArtifact, getMuseumArtifactId } from './artifactHelpers';
import { getArtifactsByKnowledgeCategory } from './knowledgeCategoryHelpers';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type KnowledgeCollectionProgress = {
  collection: KnowledgeCollection;
  completedPercent: number;
  discoveredCount: number;
  id: string;
  title: string;
  totalCount: number;
};

export type KnowledgeCollectionsState = {
  completedCollectionCount: number;
  startedCollectionCount: number;
  totalCollectionCount: number;
  collections: KnowledgeCollectionProgress[];
};

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

function getKnowledgeCollectionTitle(collection: KnowledgeCollection, language: SupportedLanguage) {
  return collection.titleTranslations[language] || collection.titleTranslations.en || collection.titleTranslations.zh;
}

export function getKnowledgeCollectionArtifacts(collection: KnowledgeCollection) {
  return getArtifactsByKnowledgeCategory(collection.category);
}

export function getKnowledgeCollectionPercent(discoveredCount: number, totalCount: number) {
  return totalCount > 0 ? Math.round((discoveredCount / totalCount) * 100) : 0;
}

export function getKnowledgeCollectionProgress({
  collection,
  discoveredArtifactIds,
  language,
}: {
  collection: KnowledgeCollection;
  discoveredArtifactIds: Set<string>;
  language: SupportedLanguage;
}): KnowledgeCollectionProgress {
  const artifacts = getKnowledgeCollectionArtifacts(collection);
  const discoveredCount = artifacts.filter((artifact: MuseumArtifact) =>
    discoveredArtifactIds.has(getMuseumArtifactId(artifact))
  ).length;
  const totalCount = artifacts.length;

  return {
    collection,
    completedPercent: getKnowledgeCollectionPercent(discoveredCount, totalCount),
    discoveredCount,
    id: collection.id,
    title: getKnowledgeCollectionTitle(collection, language),
    totalCount,
  };
}

export function buildKnowledgeCollectionsState({
  collection,
  language,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}): KnowledgeCollectionsState {
  const discoveredArtifactIds = getDiscoveredArtifactIds(collection, museumCollectedIds);
  const collections = knowledgeCollections
    .map((knowledgeCollection) =>
      getKnowledgeCollectionProgress({
        collection: knowledgeCollection,
        discoveredArtifactIds,
        language,
      })
    )
    .sort((first, second) => second.completedPercent - first.completedPercent || first.title.localeCompare(second.title));

  return {
    collections,
    completedCollectionCount: collections.filter((item) => item.totalCount > 0 && item.discoveredCount === item.totalCount).length,
    startedCollectionCount: collections.filter((item) => item.discoveredCount > 0).length,
    totalCollectionCount: collections.length,
  };
}
