import type { AudioCoverageStats } from './audioCoverageHelpers';
import { buildKnowledgeMastery } from './knowledgeMasteryHelpers';
import { buildLearningProfileStats } from './learningProfileHelpers';
import { buildLearningStatistics } from './learningStatisticsHelpers';
import { buildLearningTimeline } from './learningTimelineHelpers';
import type { SupportedLanguage } from '../i18n/translations';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type LearningDashboardSummary = {
  academyLevel: number;
  audioCoveragePercent: number;
  challengeCompletionPercent: number;
  completedKnowledgeBooks: number;
  knowledgeMasteryLevel: string;
  knowledgeMasteryPercent: number;
  totalDiscoveredArtifacts: number;
  totalKnowledgePoints: number;
};

export type LearningDashboardState = {
  summary: LearningDashboardSummary;
  timelineEventCount: number;
};

export function buildLearningDashboard({
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
}): LearningDashboardState {
  const profile = buildLearningProfileStats({
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
  const timeline = buildLearningTimeline({
    collection,
    language,
    museumCollectedIds,
  });
  const challengeCompletion = statistics.items.find((item) => item.id === 'challengeCompletionRate');

  return {
    summary: {
      academyLevel: profile.academyLevel,
      audioCoveragePercent: profile.audioCoveragePercent,
      challengeCompletionPercent: challengeCompletion?.percent ?? 0,
      completedKnowledgeBooks: profile.completedKnowledgeCollectionCount,
      knowledgeMasteryLevel: mastery.level,
      knowledgeMasteryPercent: mastery.masteryPercent,
      totalDiscoveredArtifacts: profile.totalDiscoveredArtifacts,
      totalKnowledgePoints: profile.totalKnowledgePointCount,
    },
    timelineEventCount: timeline.events.filter((event) => event.isActive).length,
  };
}
