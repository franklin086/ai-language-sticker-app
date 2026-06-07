import { KnowledgeCategory, knowledgeCategoryOrder } from '../data/knowledgeCategories';
import { knowledgeQuizData } from '../data/knowledgeQuizData';
import type { MuseumArtifact } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';
import { findMuseumArtifact, getMuseumArtifactId } from './artifactHelpers';
import { getArtifactFactKey } from './artifactFactHelpers';
import {
  getArtifactsByKnowledgeCategory,
  getKnowledgeCategory,
  getKnowledgeCategoryEmoji,
  getKnowledgeCategoryLabel,
} from './knowledgeCategoryHelpers';
import { getKnowledgeCollectionPercent } from './knowledgeCollectionHelpers';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type AcademyProgress = {
  category: KnowledgeCategory;
  collectionPercent: number;
  discoveredArtifactCount: number;
  emoji: string;
  id: string;
  percent: number;
  quizTotalCount: number;
  quizUnlockedCount: number;
  title: string;
  totalArtifactCount: number;
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

function getAcademyTitle(category: KnowledgeCategory, language: SupportedLanguage) {
  const label = getKnowledgeCategoryLabel(category, language);

  if (language === 'en') {
    return `${label} Academy`;
  }

  if (language === 'es') {
    return `Academia de ${label}`;
  }

  if (language === 'pt') {
    return `Academia de ${label}`;
  }

  if (language === 'ja') {
    return `${label}アカデミー`;
  }

  return `${label}学院`;
}

function getAcademyId(category: KnowledgeCategory) {
  return `${category}_ACADEMY`;
}

function getQuizArtifactCategory(artifactKey: string) {
  const artifact = getArtifactsByQuizKey(artifactKey);

  return artifact ? getKnowledgeCategory(artifact) : null;
}

function getArtifactsByQuizKey(artifactKey: string) {
  return getArtifactsByKnowledgeCategory(KnowledgeCategory.WORLD_CULTURE)
    .concat(
      getArtifactsByKnowledgeCategory(KnowledgeCategory.ANIMALS),
      getArtifactsByKnowledgeCategory(KnowledgeCategory.TECHNOLOGY),
      getArtifactsByKnowledgeCategory(KnowledgeCategory.CIVILIZATION),
      getArtifactsByKnowledgeCategory(KnowledgeCategory.ART),
      getArtifactsByKnowledgeCategory(KnowledgeCategory.ARCHITECTURE),
      getArtifactsByKnowledgeCategory(KnowledgeCategory.OCEAN)
    )
    .find((artifact) => getArtifactFactKey(artifact) === artifactKey) ?? null;
}

export function getAcademyDiscoveredArtifacts({
  category,
  collection,
  museumCollectedIds,
}: {
  category: KnowledgeCategory;
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const discoveredArtifactIds = getDiscoveredArtifactIds(collection, museumCollectedIds);

  return getArtifactsByKnowledgeCategory(category).filter((artifact: MuseumArtifact) =>
    discoveredArtifactIds.has(getMuseumArtifactId(artifact))
  );
}

export function getAcademyQuizProgress({
  category,
  collection,
  museumCollectedIds,
}: {
  category: KnowledgeCategory;
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const discoveredArtifactIds = getDiscoveredArtifactIds(collection, museumCollectedIds);
  const categoryQuestions = knowledgeQuizData.filter((question) => getQuizArtifactCategory(question.artifactKey) === category);
  const unlockedQuestions = categoryQuestions.filter((question) => {
    const artifact = getArtifactsByQuizKey(question.artifactKey);

    return artifact ? discoveredArtifactIds.has(getMuseumArtifactId(artifact)) : false;
  });

  return {
    totalCount: categoryQuestions.length,
    unlockedCount: unlockedQuestions.length,
  };
}

export function getAcademyPercent(discoveredCount: number, totalCount: number) {
  return getKnowledgeCollectionPercent(discoveredCount, totalCount);
}

export function getAcademyProgress({
  collection,
  language,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}) {
  return knowledgeCategoryOrder
    .map((category) => {
      const totalArtifacts = getArtifactsByKnowledgeCategory(category);
      const discoveredArtifacts = getAcademyDiscoveredArtifacts({
        category,
        collection,
        museumCollectedIds,
      });
      const quizProgress = getAcademyQuizProgress({
        category,
        collection,
        museumCollectedIds,
      });
      const percent = getAcademyPercent(discoveredArtifacts.length, totalArtifacts.length);

      return {
        category,
        collectionPercent: percent,
        discoveredArtifactCount: discoveredArtifacts.length,
        emoji: getKnowledgeCategoryEmoji(category),
        id: getAcademyId(category),
        percent,
        quizTotalCount: quizProgress.totalCount,
        quizUnlockedCount: quizProgress.unlockedCount,
        title: getAcademyTitle(category, language),
        totalArtifactCount: totalArtifacts.length,
      };
    })
    .sort((first, second) => second.percent - first.percent || first.title.localeCompare(second.title));
}
