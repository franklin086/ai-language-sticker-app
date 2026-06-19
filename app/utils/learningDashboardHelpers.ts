import type { SupportedLanguage } from '../i18n/translations';
import type { AudioCoverageStats } from './audioCoverageHelpers';
import { buildJourney } from './journeyHelpers';
import { buildKnowledgeMastery } from './knowledgeMasteryHelpers';
import { buildLearningMotivation } from './learningMotivationHelpers';
import { buildLearningProfileStats } from './learningProfileHelpers';
import { buildLearningStatistics } from './learningStatisticsHelpers';
import { buildLearningTimeline, type LearningTimelineEvent } from './learningTimelineHelpers';

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

export type LearningDashboardSnapshot = {
  academyLevel: number;
  currentLevel: string;
  knowledgeMasteryPercent: number;
  nextGoal: string;
  weeklyProgressPercent: number;
};

export type LearningRecommendedNextAction = {
  detail: string;
  emoji: string;
  id: 'discoverArtifact' | 'completeKnowledgeBook' | 'joinChallenge' | 'improveAcademy' | 'completed';
  title: string;
};

export type LearningRecentActivity = {
  detail: string;
  emoji: string;
  id: string;
  title: string;
  type: LearningTimelineEvent['type'];
};

export type LearningDashboardState = {
  recentActivity: LearningRecentActivity[];
  recommendedNextAction: LearningRecommendedNextAction;
  snapshot: LearningDashboardSnapshot;
  summary: LearningDashboardSummary;
  timelineEventCount: number;
};

function getStatisticItem(
  statistics: ReturnType<typeof buildLearningStatistics>,
  id: ReturnType<typeof buildLearningStatistics>['items'][number]['id']
) {
  return statistics.items.find((item) => item.id === id);
}

function getRecommendedNextAction({
  academyProgressPercent,
  challengeCompletionPercent,
  collectionCompletionPercent,
  discoveryPercent,
}: {
  academyProgressPercent: number;
  challengeCompletionPercent: number;
  collectionCompletionPercent: number;
  discoveryPercent: number;
}): LearningRecommendedNextAction {
  if (discoveryPercent < 100) {
    return {
      detail: '拍一张新照片，继续扩展你的学习素材。',
      emoji: '🔎',
      id: 'discoverArtifact',
      title: '继续发现新藏品',
    };
  }

  if (collectionCompletionPercent < 100) {
    return {
      detail: '选择一个还没完成的知识册，把发现整理成主题学习。',
      emoji: '📚',
      id: 'completeKnowledgeBook',
      title: '完成未完成知识册',
    };
  }

  if (challengeCompletionPercent < 100) {
    return {
      detail: '用已经解锁的题目巩固刚学到的知识。',
      emoji: '🧠',
      id: 'joinChallenge',
      title: '参与已解锁挑战',
    };
  }

  if (academyProgressPercent < 100) {
    return {
      detail: '看看哪个学院最接近升级，决定下一步探索方向。',
      emoji: '🎓',
      id: 'improveAcademy',
      title: '查看学院进度',
    };
  }

  return {
    detail: '当前学习总览已经非常完整，可以继续自由探索真实世界。',
    emoji: '✨',
    id: 'completed',
    title: '继续自由探索',
  };
}

function getRecentActivity(timelineEvents: LearningTimelineEvent[]): LearningRecentActivity[] {
  const preferredTypes: LearningTimelineEvent['type'][] = [
    'artifactDiscovered',
    'knowledgeCollectionCompleted',
    'challengeUnlocked',
  ];

  return preferredTypes.map((type) => {
    const event = timelineEvents.find((item) => item.type === type);

    return {
      detail: event?.isActive && event.detail ? event.detail : '继续探索后出现',
      emoji: event?.emoji ?? '✨',
      id: event?.id ?? type,
      title:
        type === 'artifactDiscovered'
          ? '最近发现藏品'
          : type === 'knowledgeCollectionCompleted'
            ? '最近完成知识册'
            : '最近解锁挑战',
      type,
    };
  });
}

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
  const discovery = getStatisticItem(statistics, 'discoveryRate');
  const collectionCompletion = getStatisticItem(statistics, 'collectionCompletionRate');
  const challengeCompletion = getStatisticItem(statistics, 'challengeCompletionRate');
  const recommendedNextAction = getRecommendedNextAction({
    academyProgressPercent: profile.academyProgressPercent,
    challengeCompletionPercent: challengeCompletion?.percent ?? 0,
    collectionCompletionPercent: collectionCompletion?.percent ?? 0,
    discoveryPercent: discovery?.percent ?? 0,
  });

  return {
    recentActivity: getRecentActivity(timeline.events),
    recommendedNextAction,
    snapshot: {
      academyLevel: profile.academyLevel,
      currentLevel: mastery.level,
      knowledgeMasteryPercent: mastery.masteryPercent,
      nextGoal: recommendedNextAction.title,
      weeklyProgressPercent: motivation.weeklyProgressPercent || journey.journeyPercent,
    },
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
