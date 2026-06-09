import type { AudioCoverageStats } from './audioCoverageHelpers';
import { buildKnowledgeMastery } from './knowledgeMasteryHelpers';
import { buildLearningStatistics } from './learningStatisticsHelpers';
import { buildLearningTimeline } from './learningTimelineHelpers';
import type { SupportedLanguage } from '../i18n/translations';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type LearningMotivationAction = 'discoverArtifact' | 'completeBook' | 'joinChallenge';

export type LearningMotivationGoal = {
  action: LearningMotivationAction;
  completed: number;
  percent: number;
  remaining: number;
  target: number;
};

export type LearningMotivationState = {
  currentGoal: LearningMotivationGoal;
  learningStreakDays: number;
  nextAction: LearningMotivationAction;
  weeklyProgressPercent: number;
  weeklyProgressSteps: number;
  weeklyProgressTotal: number;
};

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getItemPercent(
  statistics: ReturnType<typeof buildLearningStatistics>,
  id: ReturnType<typeof buildLearningStatistics>['items'][number]['id']
) {
  return statistics.items.find((item) => item.id === id)?.percent ?? 0;
}

function getItemCounts(
  statistics: ReturnType<typeof buildLearningStatistics>,
  id: ReturnType<typeof buildLearningStatistics>['items'][number]['id']
) {
  const item = statistics.items.find((entry) => entry.id === id);

  return {
    completed: item?.completed ?? 0,
    total: item?.total ?? 0,
  };
}

function buildGoal({
  action,
  completed,
  target,
}: {
  action: LearningMotivationAction;
  completed: number;
  target: number;
}): LearningMotivationGoal {
  const safeTarget = Math.max(target, 1);
  const safeCompleted = Math.min(completed, safeTarget);

  return {
    action,
    completed: safeCompleted,
    percent: clampPercent(Math.round((safeCompleted / safeTarget) * 100)),
    remaining: Math.max(safeTarget - safeCompleted, 0),
    target: safeTarget,
  };
}

function getNextAction({
  collectionCompletionPercent,
  discoveryPercent,
  challengeCompletionPercent,
}: {
  challengeCompletionPercent: number;
  collectionCompletionPercent: number;
  discoveryPercent: number;
}): LearningMotivationAction {
  if (discoveryPercent < 20) {
    return 'discoverArtifact';
  }

  if (collectionCompletionPercent < 50) {
    return 'completeBook';
  }

  if (challengeCompletionPercent < 70) {
    return 'joinChallenge';
  }

  return 'discoverArtifact';
}

export function buildLearningMotivation({
  audioStats,
  collection,
  language,
  museumCollectedIds,
}: {
  audioStats: AudioCoverageStats;
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}): LearningMotivationState {
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
  const discoveryPercent = getItemPercent(statistics, 'discoveryRate');
  const knowledgePercent = getItemPercent(statistics, 'knowledgeCompletionRate');
  const collectionCompletionPercent = getItemPercent(statistics, 'collectionCompletionRate');
  const challengeCompletionPercent = getItemPercent(statistics, 'challengeCompletionRate');
  const discoveryCounts = getItemCounts(statistics, 'discoveryRate');
  const collectionCounts = getItemCounts(statistics, 'collectionCompletionRate');
  const challengeCounts = getItemCounts(statistics, 'challengeCompletionRate');
  const nextAction = getNextAction({
    challengeCompletionPercent,
    collectionCompletionPercent,
    discoveryPercent,
  });
  const weeklyProgressPercent = clampPercent(
    Math.round((discoveryPercent + knowledgePercent + collectionCompletionPercent + challengeCompletionPercent) / 4)
  );
  const activeTimelineEvents = timeline.events.filter((event) => event.isActive).length;
  const weeklyProgressSteps = [
    discoveryCounts.completed > 0,
    knowledgePercent > 0,
    collectionCounts.completed > 0,
    challengeCounts.completed > 0,
  ].filter(Boolean).length;

  return {
    currentGoal:
      nextAction === 'discoverArtifact'
        ? buildGoal({
            action: nextAction,
            completed: discoveryCounts.completed,
            target: Math.min(discoveryCounts.total || 1, Math.max(discoveryCounts.completed + 1, 5)),
          })
        : nextAction === 'completeBook'
          ? buildGoal({
              action: nextAction,
              completed: collectionCounts.completed,
              target: Math.min(collectionCounts.total || 1, Math.max(collectionCounts.completed + 1, 1)),
            })
          : buildGoal({
              action: nextAction,
              completed: challengeCounts.completed,
              target: Math.min(challengeCounts.total || 1, Math.max(challengeCounts.completed + 1, 3)),
            }),
    learningStreakDays:
      discoveryCounts.completed === 0
        ? 0
        : Math.min(7, Math.max(1, activeTimelineEvents + Math.floor(mastery.masteryPercent / 25))),
    nextAction,
    weeklyProgressPercent,
    weeklyProgressSteps,
    weeklyProgressTotal: 4,
  };
}
