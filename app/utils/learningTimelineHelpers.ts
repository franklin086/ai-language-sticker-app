import type { MuseumArtifact } from '../data/museumArtifacts';
import { museumArtifacts } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';
import { findMuseumArtifact, getMuseumArtifactId } from './artifactHelpers';
import { getAcademyProgress } from './explorerAcademyHelpers';
import { buildKnowledgeCollectionsState } from './knowledgeCollectionHelpers';
import { getDiscoveredQuizQuestions } from './knowledgeQuizHelpers';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

export type LearningTimelineEventType =
  | 'artifactDiscovered'
  | 'knowledgeCollectionCompleted'
  | 'challengeUnlocked'
  | 'academyLevel';

export type LearningTimelineEvent = {
  detail: string;
  emoji: string;
  id: string;
  isActive: boolean;
  title: string;
  type: LearningTimelineEventType;
};

export type LearningTimelineState = {
  events: LearningTimelineEvent[];
};

function getArtifactTitle(artifact: MuseumArtifact, language: SupportedLanguage) {
  return artifact.nameTranslations?.[language] || artifact.objectEn || artifact.objectZh;
}

function getDiscoveredArtifacts(collection: CollectionLike[], museumCollectedIds: string[]) {
  const artifactsById = new Map<string, { artifact: MuseumArtifact; discoveredAt?: string }>();

  museumCollectedIds.forEach((artifactId) => {
    const artifact = museumArtifacts.find((item) => getMuseumArtifactId(item) === artifactId);

    if (artifact) {
      artifactsById.set(artifactId, { artifact });
    }
  });

  collection.forEach((item) => {
    const artifact = findMuseumArtifact(item);

    if (artifact) {
      const artifactId = getMuseumArtifactId(artifact);
      artifactsById.set(artifactId, {
        artifact,
        discoveredAt: item.discoveredAt,
      });
    }
  });

  return Array.from(artifactsById.values()).sort((first, second) => {
    const firstTime = first.discoveredAt ? new Date(first.discoveredAt).getTime() : 0;
    const secondTime = second.discoveredAt ? new Date(second.discoveredAt).getTime() : 0;

    return secondTime - firstTime;
  });
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

export function buildLearningTimeline({
  collection,
  language,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  language: SupportedLanguage;
  museumCollectedIds: string[];
}): LearningTimelineState {
  const discoveredArtifacts = getDiscoveredArtifacts(collection, museumCollectedIds);
  const latestArtifact = discoveredArtifacts[0]?.artifact ?? null;
  const knowledgeCollections = buildKnowledgeCollectionsState({
    collection,
    language,
    museumCollectedIds,
  });
  const completedCollections = knowledgeCollections.collections.filter(
    (item) => item.totalCount > 0 && item.discoveredCount === item.totalCount
  );
  const unlockedChallenges = getDiscoveredQuizQuestions({
    collection,
    museumCollectedIds,
  });
  const academyProgressPercent = getAverageAcademyProgress({
    collection,
    language,
    museumCollectedIds,
  });
  const academyLevel = getAcademyLevel(academyProgressPercent);

  return {
    events: [
      {
        detail: latestArtifact ? getArtifactTitle(latestArtifact, language) : '',
        emoji: latestArtifact?.emoji ?? '🔎',
        id: 'latest-artifact',
        isActive: Boolean(latestArtifact),
        title: 'artifactDiscovered',
        type: 'artifactDiscovered',
      },
      {
        detail: completedCollections[0]?.title ?? '',
        emoji: '📚',
        id: 'completed-collection',
        isActive: completedCollections.length > 0,
        title: 'knowledgeCollectionCompleted',
        type: 'knowledgeCollectionCompleted',
      },
      {
        detail: String(unlockedChallenges.length),
        emoji: '🧠',
        id: 'unlocked-challenges',
        isActive: unlockedChallenges.length > 0,
        title: 'challengeUnlocked',
        type: 'challengeUnlocked',
      },
      {
        detail: `LV ${academyLevel} · ${academyProgressPercent}%`,
        emoji: '🏫',
        id: 'academy-level',
        isActive: academyProgressPercent > 0,
        title: 'academyLevel',
        type: 'academyLevel',
      },
    ],
  };
}
