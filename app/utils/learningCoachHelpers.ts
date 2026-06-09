import type { AudioCoverageStats } from './audioCoverageHelpers';
import { buildJourney } from './journeyHelpers';
import { buildKnowledgeMastery } from './knowledgeMasteryHelpers';
import { buildKnowledgeCollectionsState } from './knowledgeCollectionHelpers';
import { getDiscoveredQuizQuestions } from './knowledgeQuizHelpers';
import { buildLearningMotivation } from './learningMotivationHelpers';
import { buildLearningProfileStats } from './learningProfileHelpers';
import { buildLearningStatistics } from './learningStatisticsHelpers';
import { buildLearningTimeline } from './learningTimelineHelpers';
import type { SupportedLanguage } from '../i18n/translations';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type LearningCoachSignal =
  | 'discovery'
  | 'knowledge'
  | 'collection'
  | 'challenge'
  | 'mastery'
  | 'journey';

export type LearningCoachState = {
  recommendedChallengeCount: number;
  recommendedDiscoverySignal: LearningCoachSignal;
  recommendedKnowledgeBook: string;
  strength: LearningCoachSignal;
  weakness: LearningCoachSignal;
};

function getStatisticItem(
  statistics: ReturnType<typeof buildLearningStatistics>,
  id: ReturnType<typeof buildLearningStatistics>['items'][number]['id']
) {
  return statistics.items.find((item) => item.id === id);
}

function getSignalScores({
  journeyPercent,
  masteryPercent,
  statistics,
}: {
  journeyPercent: number;
  masteryPercent: number;
  statistics: ReturnType<typeof buildLearningStatistics>;
}) {
  return [
    {
      score: getStatisticItem(statistics, 'discoveryRate')?.percent ?? 0,
      signal: 'discovery' as const,
    },
    {
      score: getStatisticItem(statistics, 'knowledgeCompletionRate')?.percent ?? 0,
      signal: 'knowledge' as const,
    },
    {
      score: getStatisticItem(statistics, 'collectionCompletionRate')?.percent ?? 0,
      signal: 'collection' as const,
    },
    {
      score: getStatisticItem(statistics, 'challengeCompletionRate')?.percent ?? 0,
      signal: 'challenge' as const,
    },
    {
      score: masteryPercent,
      signal: 'mastery' as const,
    },
    {
      score: journeyPercent,
      signal: 'journey' as const,
    },
  ];
}

export function buildLearningCoach({
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
}): LearningCoachState {
  buildLearningProfileStats({
    audioCoverageLevel,
    audioStats,
    collection,
    language,
    museumCollectedIds,
  });
  const statistics = buildLearningStatistics({
    audioStats,
    collection,
    language,
    museumCollectedIds,
  });
  const mastery = buildKnowledgeMastery({
    collection,
    language,
    museumCollectedIds,
  });
  buildLearningTimeline({
    collection,
    language,
    museumCollectedIds,
  });
  const motivation = buildLearningMotivation({
    audioStats,
    collection,
    language,
    museumCollectedIds,
  });
  const journey = buildJourney({
    audioCoverageLevel,
    audioStats,
    collection,
    language,
    museumCollectedIds,
  });
  const knowledgeCollections = buildKnowledgeCollectionsState({
    collection,
    language,
    museumCollectedIds,
  });
  const recommendedBook =
    knowledgeCollections.collections.find((item) => item.discoveredCount > 0 && item.discoveredCount < item.totalCount) ??
    knowledgeCollections.collections.find((item) => item.discoveredCount < item.totalCount) ??
    knowledgeCollections.collections[0];
  const signalScores = getSignalScores({
    journeyPercent: journey.journeyPercent,
    masteryPercent: mastery.masteryPercent,
    statistics,
  });
  const sortedSignals = [...signalScores].sort((first, second) => second.score - first.score);
  const weakSignals = [...signalScores].sort((first, second) => first.score - second.score);
  const unlockedChallenges = getDiscoveredQuizQuestions({
    collection,
    museumCollectedIds,
  });

  return {
    recommendedChallengeCount: unlockedChallenges.length,
    recommendedDiscoverySignal: motivation.nextAction === 'discoverArtifact' ? 'discovery' : weakSignals[0]?.signal ?? 'discovery',
    recommendedKnowledgeBook: recommendedBook?.title ?? '',
    strength: sortedSignals[0]?.signal ?? 'discovery',
    weakness: weakSignals[0]?.signal ?? 'discovery',
  };
}
