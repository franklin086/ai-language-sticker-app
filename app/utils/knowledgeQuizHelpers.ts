import { knowledgeQuizData, type KnowledgeQuizQuestion } from '../data/knowledgeQuizData';
import { museumArtifacts } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';
import { findMuseumArtifact, getMuseumArtifactId } from './artifactHelpers';
import { getArtifactFactKey } from './artifactFactHelpers';
import { canUseArtifactForLearningChallenge } from './discoveryRuleHelpers';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type QuizAnswerState = Record<string, boolean>;

export type KnowledgeQuizProgress = {
  completedQuestionCount: number;
  correctRate: number;
  totalQuestionCount: number;
  unlockedQuestionCount: number;
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

function getArtifactByQuizKey(artifactKey: string) {
  return museumArtifacts.find((artifact) => getArtifactFactKey(artifact) === artifactKey) ?? null;
}

function getLocalizedValue(value: Record<SupportedLanguage, string>, language: SupportedLanguage) {
  return value[language] || value.en || value.zh;
}

function getLocalizedOptions(value: Record<SupportedLanguage, string[]>, language: SupportedLanguage) {
  return value[language] || value.en || value.zh;
}

export function getAvailableQuizQuestions() {
  return knowledgeQuizData;
}

export function getDiscoveredQuizQuestions({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const discoveredArtifactIds = getDiscoveredArtifactIds(collection, museumCollectedIds);

  return knowledgeQuizData.filter((question) => {
    const artifact = getArtifactByQuizKey(question.artifactKey);

    if (!artifact) {
      return false;
    }

    return canUseArtifactForLearningChallenge(discoveredArtifactIds.has(getMuseumArtifactId(artifact)));
  });
}

export function getQuizProgress({
  answerState,
  collection,
  museumCollectedIds,
}: {
  answerState: QuizAnswerState;
  collection: CollectionLike[];
  museumCollectedIds: string[];
}): KnowledgeQuizProgress {
  const unlockedQuestions = getDiscoveredQuizQuestions({ collection, museumCollectedIds });
  const completedQuestionCount = Object.keys(answerState).filter((artifactKey) =>
    unlockedQuestions.some((question) => question.artifactKey === artifactKey)
  ).length;
  const correctQuestionCount = Object.entries(answerState).filter(([, correct]) => correct).length;

  return {
    completedQuestionCount,
    correctRate: completedQuestionCount > 0 ? Math.round((correctQuestionCount / completedQuestionCount) * 100) : 0,
    totalQuestionCount: getAvailableQuizQuestions().length,
    unlockedQuestionCount: unlockedQuestions.length,
  };
}

export function getQuizQuestionText(question: KnowledgeQuizQuestion, language: SupportedLanguage) {
  return getLocalizedValue(question.question, language);
}

export function getQuizQuestionOptions(question: KnowledgeQuizQuestion, language: SupportedLanguage) {
  return getLocalizedOptions(question.options, language);
}

export function getQuizCorrectAnswer(question: KnowledgeQuizQuestion, language: SupportedLanguage) {
  return getLocalizedValue(question.correctAnswer, language);
}
