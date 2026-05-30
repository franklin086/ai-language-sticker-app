import { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { LIMITED_EVENT_STORAGE_KEY } from '../utils/storageKeys';

type CollectionItem = {
  confidence: string;
  discoveredAt: string;
  emoji: string;
  object_en: string;
  object_zh: string;
};

type LimitedEventState = {
  badgeIds: string[];
  completedEventIds: string[];
};

export type LimitedEventProgress = {
  badgeId: string;
  badgeTitle: string;
  completed: boolean;
  eventId: string;
  progress: number;
  target: number;
};

type LimitedEventRewardHandlers = {
  addCompanionXp: (earnedXp: number, message: string, mood: string) => void;
  addXpAmount: (earnedXp: number) => void;
  openMagicChest: (nextCount: number) => void;
};

const ANIMAL_EXPLORATION_EVENT = {
  badgeId: 'limited-badge-animal-explorer',
  badgeTitle: '🐾 动物探索家',
  eventId: 'animal-exploration-week',
  target: 3,
  xpReward: 50,
};

const EMPTY_LIMITED_EVENT_STATE: LimitedEventState = {
  badgeIds: [],
  completedEventIds: [],
};

function readStoredLimitedEventState(): LimitedEventState {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return EMPTY_LIMITED_EVENT_STATE;
  }

  try {
    const rawValue = window.localStorage.getItem(LIMITED_EVENT_STORAGE_KEY);
    if (!rawValue) {
      return EMPTY_LIMITED_EVENT_STATE;
    }

    const parsed = JSON.parse(rawValue) as { badgeIds?: string[]; completedEventIds?: string[] };
    return {
      badgeIds: Array.isArray(parsed.badgeIds)
        ? Array.from(new Set(parsed.badgeIds.filter((id) => typeof id === 'string' && id.trim())))
        : [],
      completedEventIds: Array.isArray(parsed.completedEventIds)
        ? Array.from(new Set(parsed.completedEventIds.filter((id) => typeof id === 'string' && id.trim())))
        : [],
    };
  } catch {
    return EMPTY_LIMITED_EVENT_STATE;
  }
}

function saveStoredLimitedEventState(state: LimitedEventState) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(LIMITED_EVENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Limited events are local rewards. Recognition should continue if storage is blocked.
  }
}

function getLimitedEventProgress({
  collection,
  getArtifactIds,
  itemMatchesMuseum,
  limitedEventState,
}: {
  collection: CollectionItem[];
  getArtifactIds: (item: CollectionItem) => string[];
  itemMatchesMuseum: (item: CollectionItem, museumId: string) => boolean;
  limitedEventState: LimitedEventState;
}): LimitedEventProgress {
  const animalArtifactIds = new Set(
    collection.filter((item) => itemMatchesMuseum(item, 'animal')).flatMap((item) => getArtifactIds(item)),
  );
  const progress = Math.min(animalArtifactIds.size, ANIMAL_EXPLORATION_EVENT.target);

  return {
    badgeId: ANIMAL_EXPLORATION_EVENT.badgeId,
    badgeTitle: ANIMAL_EXPLORATION_EVENT.badgeTitle,
    completed:
      progress >= ANIMAL_EXPLORATION_EVENT.target ||
      limitedEventState.completedEventIds.includes(ANIMAL_EXPLORATION_EVENT.eventId),
    eventId: ANIMAL_EXPLORATION_EVENT.eventId,
    progress,
    target: ANIMAL_EXPLORATION_EVENT.target,
  };
}

export function useLimitedEvent({
  collection,
  getArtifactIds,
  itemMatchesMuseum,
}: {
  collection: CollectionItem[];
  getArtifactIds: (item: CollectionItem) => string[];
  itemMatchesMuseum: (item: CollectionItem, museumId: string) => boolean;
}) {
  const [limitedEventState, setLimitedEventState] = useState<LimitedEventState>(() => readStoredLimitedEventState());
  const [latestLimitedEventReward, setLatestLimitedEventReward] = useState('');

  const limitedEventProgress = useMemo(
    () =>
      getLimitedEventProgress({
        collection,
        getArtifactIds,
        itemMatchesMuseum,
        limitedEventState,
      }),
    [collection, getArtifactIds, itemMatchesMuseum, limitedEventState],
  );

  const updateLimitedEventRewards = useCallback(
    ({
      addCompanionXp,
      addXpAmount,
      collection: nextCollection,
      openMagicChest,
    }: {
      collection: CollectionItem[];
    } & LimitedEventRewardHandlers) => {
      setLimitedEventState((currentState) => {
        const progress = getLimitedEventProgress({
          collection: nextCollection,
          getArtifactIds,
          itemMatchesMuseum,
          limitedEventState: currentState,
        });
        if (!progress.completed || currentState.completedEventIds.includes(progress.eventId)) {
          return currentState;
        }

        addXpAmount(ANIMAL_EXPLORATION_EVENT.xpReward);
        addCompanionXp(30, '我们获得了限定徽章！', '骄傲');
        openMagicChest(nextCollection.length + ANIMAL_EXPLORATION_EVENT.target);
        setLatestLimitedEventReward(ANIMAL_EXPLORATION_EVENT.badgeTitle);

        const nextState = {
          badgeIds: Array.from(new Set([...currentState.badgeIds, progress.badgeId])),
          completedEventIds: Array.from(new Set([...currentState.completedEventIds, progress.eventId])),
        };
        saveStoredLimitedEventState(nextState);
        return nextState;
      });
    },
    [getArtifactIds, itemMatchesMuseum],
  );

  return {
    latestLimitedEventReward,
    limitedEventProgress,
    updateLimitedEventRewards,
  };
}
