import type { SupportedLanguage } from '../i18n/translations';
import { getAcademyProgress } from './explorerAcademyHelpers';
import { buildKnowledgeCollectionsState } from './knowledgeCollectionHelpers';
import { getQuizProgress } from './knowledgeQuizHelpers';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type KnowledgeMasteryLevel = 'BEGINNER' | 'LEARNING' | 'PROFICIENT' | 'EXPERT' | 'MASTER';

export type KnowledgeMasteryState = {
  academyProgressPercent: number;
  challengeCompletionPercent: number;
  collectionCompletionPercent: number;
  icon: string;
  knowledgeUnlockPercent: number;
  level: KnowledgeMasteryLevel;
  masteryPercent: number;
  nextLevel: KnowledgeMasteryLevel | null;
  percentToNextLevel: number;
};

function getPercent(completed: number, total: number) {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
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

function getMasteryLevel(masteryPercent: number): KnowledgeMasteryLevel {
  if (masteryPercent >= 81) {
    return 'MASTER';
  }

  if (masteryPercent >= 61) {
    return 'EXPERT';
  }

  if (masteryPercent >= 41) {
    return 'PROFICIENT';
  }

  if (masteryPercent >= 21) {
    return 'LEARNING';
  }

  return 'BEGINNER';
}

function getNextLevel(level: KnowledgeMasteryLevel): KnowledgeMasteryLevel | null {
  switch (level) {
    case 'BEGINNER':
      return 'LEARNING';
    case 'LEARNING':
      return 'PROFICIENT';
    case 'PROFICIENT':
      return 'EXPERT';
    case 'EXPERT':
      return 'MASTER';
    case 'MASTER':
    default:
      return null;
  }
}

function getNextLevelThreshold(level: KnowledgeMasteryLevel) {
  switch (level) {
    case 'BEGINNER':
      return 21;
    case 'LEARNING':
      return 41;
    case 'PROFICIENT':
      return 61;
    case 'EXPERT':
      return 81;
    case 'MASTER':
    default:
      return 100;
  }
}

function getMasteryIcon(level: KnowledgeMasteryLevel) {
  switch (level) {
    case 'MASTER':
      return '👑';
    case 'EXPERT':
      return '🌟';
    case 'PROFICIENT':
      return '🏆';
    case 'LEARNING':
      return '📚';
    case 'BEGINNER':
    default:
      return '🌱';
  }
}

export function buildKnowledgeMastery({
  collection,
  language,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}): KnowledgeMasteryState {
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
  const knowledgeUnlockPercent = getPercent(quizProgress.unlockedQuestionCount, quizProgress.totalQuestionCount);
  const collectionCompletionPercent = getPercent(
    knowledgeCollections.completedCollectionCount,
    knowledgeCollections.totalCollectionCount
  );
  const challengeCompletionPercent = getPercent(quizProgress.unlockedQuestionCount, quizProgress.totalQuestionCount);
  const academyProgressPercent = getAverageAcademyProgress({
    collection,
    language,
    museumCollectedIds,
  });
  const masteryPercent = Math.round(
    (knowledgeUnlockPercent + collectionCompletionPercent + challengeCompletionPercent + academyProgressPercent) / 4
  );
  const level = getMasteryLevel(masteryPercent);
  const nextLevel = getNextLevel(level);
  const nextLevelThreshold = getNextLevelThreshold(level);

  return {
    academyProgressPercent,
    challengeCompletionPercent,
    collectionCompletionPercent,
    icon: getMasteryIcon(level),
    knowledgeUnlockPercent,
    level,
    masteryPercent,
    nextLevel,
    percentToNextLevel: nextLevel ? Math.max(nextLevelThreshold - masteryPercent, 0) : 0,
  };
}
