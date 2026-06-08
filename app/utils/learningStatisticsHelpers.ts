import { museumArtifacts } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';
import type { AudioCoverageStats } from './audioCoverageHelpers';
import { findMuseumArtifact, getMuseumArtifactId } from './artifactHelpers';
import { getAcademyProgress } from './explorerAcademyHelpers';
import { buildKnowledgeCollectionsState } from './knowledgeCollectionHelpers';
import { getQuizProgress } from './knowledgeQuizHelpers';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type LearningStatisticsId =
  | 'discoveryRate'
  | 'knowledgeCompletionRate'
  | 'collectionCompletionRate'
  | 'challengeCompletionRate'
  | 'audioCoverageRate';

export type LearningStatisticsItem = {
  completed: number;
  id: LearningStatisticsId;
  percent: number;
  total: number;
};

export type LearningStatisticsState = {
  academyProgressPercent: number;
  items: LearningStatisticsItem[];
};

function getPercent(completed: number, total: number) {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

function getDiscoveredArtifactCount(collection: CollectionLike[], museumCollectedIds: string[]) {
  const discoveredIds = new Set(museumCollectedIds);

  collection.forEach((item) => {
    const artifact = findMuseumArtifact(item);

    if (artifact) {
      discoveredIds.add(getMuseumArtifactId(artifact));
    }
  });

  return discoveredIds.size;
}

function getAverageAcademyProgress({
  collection,
  language,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}) {
  const academies = getAcademyProgress({
    collection,
    language,
    museumCollectedIds,
  });

  return academies.length > 0
    ? Math.round(academies.reduce((sum, academy) => sum + academy.percent, 0) / academies.length)
    : 0;
}

export function buildLearningStatistics({
  audioStats,
  collection,
  language,
  museumCollectedIds,
}: {
  audioStats: AudioCoverageStats;
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}): LearningStatisticsState {
  const discoveredArtifacts = getDiscoveredArtifactCount(collection, museumCollectedIds);
  const totalArtifacts = museumArtifacts.length;
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
  const audioCoveredArtifacts =
    audioStats.localAudioCount + audioStats.ttsAudioCount + audioStats.humanAudioCount;

  return {
    academyProgressPercent: getAverageAcademyProgress({
      collection,
      language,
      museumCollectedIds,
    }),
    items: [
      {
        completed: discoveredArtifacts,
        id: 'discoveryRate',
        percent: getPercent(discoveredArtifacts, totalArtifacts),
        total: totalArtifacts,
      },
      {
        completed: quizProgress.unlockedQuestionCount,
        id: 'knowledgeCompletionRate',
        percent: getPercent(quizProgress.unlockedQuestionCount, quizProgress.totalQuestionCount),
        total: quizProgress.totalQuestionCount,
      },
      {
        completed: knowledgeCollections.completedCollectionCount,
        id: 'collectionCompletionRate',
        percent: getPercent(
          knowledgeCollections.completedCollectionCount,
          knowledgeCollections.totalCollectionCount
        ),
        total: knowledgeCollections.totalCollectionCount,
      },
      {
        completed: quizProgress.unlockedQuestionCount,
        id: 'challengeCompletionRate',
        percent: getPercent(quizProgress.unlockedQuestionCount, quizProgress.totalQuestionCount),
        total: quizProgress.totalQuestionCount,
      },
      {
        completed: audioCoveredArtifacts,
        id: 'audioCoverageRate',
        percent: audioStats.coveragePercent,
        total: audioStats.totalArtifacts,
      },
    ],
  };
}
