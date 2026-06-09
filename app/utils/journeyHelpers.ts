import type { AudioCoverageStats } from './audioCoverageHelpers';
import { buildKnowledgeMastery } from './knowledgeMasteryHelpers';
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

export type JourneyMilestoneId =
  | 'firstDiscovery'
  | 'knowledgeUnlocked'
  | 'bookCompleted'
  | 'challengeUnlocked'
  | 'masteryGrowth';

export type JourneyStage = {
  emoji: string;
  id: string;
  isCurrent: boolean;
  isUnlocked: boolean;
  threshold: number;
};

export type JourneyMilestone = {
  id: JourneyMilestoneId;
  isCompleted: boolean;
  progress: number;
};

export type JourneyBadge = {
  emoji: string;
  id: JourneyMilestoneId;
  isUnlocked: boolean;
};

export type JourneyState = {
  badges: JourneyBadge[];
  currentStageId: string;
  journeyPercent: number;
  milestones: JourneyMilestone[];
  nextMilestone: JourneyMilestone | null;
  stages: JourneyStage[];
};

const stageDefinitions = [
  { emoji: '🌱', id: 'spark', threshold: 0 },
  { emoji: '🔎', id: 'explorer', threshold: 20 },
  { emoji: '🎒', id: 'collector', threshold: 40 },
  { emoji: '📚', id: 'scholar', threshold: 60 },
  { emoji: '👑', id: 'master', threshold: 80 },
];

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getCurrentStageId(journeyPercent: number) {
  return [...stageDefinitions].reverse().find((stage) => journeyPercent >= stage.threshold)?.id ?? 'spark';
}

function getStatisticItem(
  statistics: ReturnType<typeof buildLearningStatistics>,
  id: ReturnType<typeof buildLearningStatistics>['items'][number]['id']
) {
  return statistics.items.find((item) => item.id === id);
}

export function buildJourney({
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
}): JourneyState {
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
  const motivation = buildLearningMotivation({
    audioStats,
    collection,
    language,
    museumCollectedIds,
  });
  const discovery = getStatisticItem(statistics, 'discoveryRate');
  const knowledge = getStatisticItem(statistics, 'knowledgeCompletionRate');
  const challenge = getStatisticItem(statistics, 'challengeCompletionRate');
  const completedTimelineEvents = timeline.events.filter((event) => event.isActive).length;
  const journeyPercent = clampPercent(
    Math.round(
      (mastery.masteryPercent +
        (discovery?.percent ?? 0) +
        motivation.weeklyProgressPercent +
        completedTimelineEvents * 10) /
        4
    )
  );
  const currentStageId = getCurrentStageId(journeyPercent);
  const milestones: JourneyMilestone[] = [
    {
      id: 'firstDiscovery',
      isCompleted: profile.totalDiscoveredArtifacts > 0,
      progress: profile.totalDiscoveredArtifacts > 0 ? 100 : 0,
    },
    {
      id: 'knowledgeUnlocked',
      isCompleted: profile.totalKnowledgePointCount > 0,
      progress: knowledge?.percent ?? 0,
    },
    {
      id: 'bookCompleted',
      isCompleted: profile.completedKnowledgeCollectionCount > 0,
      progress: profile.completedKnowledgeCollectionCount > 0 ? 100 : 0,
    },
    {
      id: 'challengeUnlocked',
      isCompleted: (challenge?.completed ?? 0) > 0,
      progress: challenge?.percent ?? 0,
    },
    {
      id: 'masteryGrowth',
      isCompleted: mastery.masteryPercent >= 20,
      progress: mastery.masteryPercent,
    },
  ];

  return {
    badges: milestones.map((milestone) => ({
      emoji:
        milestone.id === 'firstDiscovery'
          ? '🔎'
          : milestone.id === 'knowledgeUnlocked'
            ? '📚'
            : milestone.id === 'bookCompleted'
              ? '🏅'
              : milestone.id === 'challengeUnlocked'
                ? '🧠'
                : '🌟',
      id: milestone.id,
      isUnlocked: milestone.isCompleted,
    })),
    currentStageId,
    journeyPercent,
    milestones,
    nextMilestone: milestones.find((milestone) => !milestone.isCompleted) ?? null,
    stages: stageDefinitions.map((stage) => ({
      ...stage,
      isCurrent: stage.id === currentStageId,
      isUnlocked: journeyPercent >= stage.threshold,
    })),
  };
}
