import type { AudioCoverageStats } from './audioCoverageHelpers';
import { findMuseumArtifact, getMuseumArtifactId } from './artifactHelpers';
import { getAcademyProgress } from './explorerAcademyHelpers';
import { buildKnowledgeCollectionsState } from './knowledgeCollectionHelpers';
import { getQuizProgress } from './knowledgeQuizHelpers';
import type { SupportedLanguage } from '../i18n/translations';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type LearningProfileStats = {
  academyLevel: number;
  academyProgressPercent: number;
  audioCoverageLevel: string;
  audioCoveragePercent: number;
  completedChallengeCount: number;
  completedKnowledgeCollectionCount: number;
  totalDiscoveredArtifacts: number;
  totalKnowledgePointCount: number;
};

function getTotalDiscoveredArtifacts(collection: CollectionLike[], museumCollectedIds: string[]) {
  const discoveredIds = new Set(museumCollectedIds);

  collection.forEach((item) => {
    const artifact = findMuseumArtifact(item);

    if (artifact) {
      discoveredIds.add(getMuseumArtifactId(artifact));
    }
  });

  return discoveredIds.size;
}

function getAcademyLevel(academyProgressPercent: number) {
  if (academyProgressPercent >= 90) {
    return 5;
  }

  if (academyProgressPercent >= 70) {
    return 4;
  }

  if (academyProgressPercent >= 45) {
    return 3;
  }

  if (academyProgressPercent >= 20) {
    return 2;
  }

  return 1;
}

export function buildLearningProfileStats({
  audioCoverageLevel,
  audioStats,
  collection,
  language,
  museumCollectedIds,
}: {
  audioCoverageLevel: string;
  audioStats: AudioCoverageStats;
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}): LearningProfileStats {
  const knowledgeCollections = buildKnowledgeCollectionsState({
    collection,
    language,
    museumCollectedIds,
  });
  const quizProgress = getQuizProgress({
    answerState: {},
    collection,
    museumCollectedIds,
  });
  const academies = getAcademyProgress({
    collection,
    language,
    museumCollectedIds,
  });
  const academyProgressPercent =
    academies.length > 0
      ? Math.round(academies.reduce((sum, academy) => sum + academy.percent, 0) / academies.length)
      : 0;

  return {
    academyLevel: getAcademyLevel(academyProgressPercent),
    academyProgressPercent,
    audioCoverageLevel,
    audioCoveragePercent: audioStats.coveragePercent,
    completedChallengeCount: quizProgress.unlockedQuestionCount,
    completedKnowledgeCollectionCount: knowledgeCollections.completedCollectionCount,
    totalDiscoveredArtifacts: getTotalDiscoveredArtifacts(collection, museumCollectedIds),
    totalKnowledgePointCount: quizProgress.unlockedQuestionCount,
  };
}
