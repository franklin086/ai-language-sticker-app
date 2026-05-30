import { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { DAILY_QUEST_STORAGE_KEY } from '../utils/storageKeys';

export type DailyQuestId = 'animal_discovery' | 'traffic_discovery' | 'three_unique_artifacts';

export type DailyQuestState = {
  date: string;
  discoveredArtifactIds: string[];
  rewardedQuestIds: DailyQuestId[];
};

type DailyQuestDefinition = {
  id: DailyQuestId;
  title: string;
  rewardLabel: string;
  target: number;
  type: 'animal' | 'traffic' | 'unique';
};

export type DailyQuestProgress = DailyQuestDefinition & {
  completed: boolean;
  progress: number;
  rewarded: boolean;
};

type CollectionItem = {
  confidence: string;
  discoveredAt: string;
  emoji: string;
  object_en: string;
  object_zh: string;
};

type DailyQuestRewardHandlers = {
  addCompanionXp: (earnedXp: number, message: string, mood: string) => void;
  addXpAmount: (earnedXp: number) => void;
  openMagicChest: (nextCount: number) => void;
};

const DAILY_QUESTS: DailyQuestDefinition[] = [
  { id: 'animal_discovery', rewardLabel: '奖励 20XP', target: 1, title: '发现 1 个动物', type: 'animal' },
  { id: 'traffic_discovery', rewardLabel: '奖励 20XP', target: 1, title: '发现 1 个交通工具', type: 'traffic' },
  { id: 'three_unique_artifacts', rewardLabel: '奖励宝箱', target: 3, title: '发现 3 个不同藏品', type: 'unique' },
];

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getCollectionItemsForDate(collection: CollectionItem[], dateKey: string) {
  return collection.filter((item) => getDateKey(new Date(item.discoveredAt)) === dateKey);
}

function getEmptyDailyQuestState(): DailyQuestState {
  return { date: getDateKey(new Date()), discoveredArtifactIds: [], rewardedQuestIds: [] };
}

function readStoredDailyQuestState(): DailyQuestState {
  const today = getDateKey(new Date());
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return { date: today, discoveredArtifactIds: [], rewardedQuestIds: [] };
  }

  try {
    const rawValue = window.localStorage.getItem(DAILY_QUEST_STORAGE_KEY);
    if (!rawValue) {
      return { date: today, discoveredArtifactIds: [], rewardedQuestIds: [] };
    }

    const parsed = JSON.parse(rawValue) as {
      date?: string;
      discoveredArtifactIds?: string[];
      rewardedQuestIds?: string[];
    };
    if (parsed.date !== today || !Array.isArray(parsed.rewardedQuestIds)) {
      return { date: today, discoveredArtifactIds: [], rewardedQuestIds: [] };
    }

    const validQuestIds = new Set(DAILY_QUESTS.map((quest) => quest.id));
    return {
      date: today,
      discoveredArtifactIds: Array.isArray(parsed.discoveredArtifactIds)
        ? Array.from(new Set(parsed.discoveredArtifactIds.filter((id) => typeof id === 'string' && id.trim())))
        : [],
      rewardedQuestIds: parsed.rewardedQuestIds.filter((id): id is DailyQuestId =>
        validQuestIds.has(id as DailyQuestId),
      ),
    };
  } catch {
    return { date: today, discoveredArtifactIds: [], rewardedQuestIds: [] };
  }
}

function saveStoredDailyQuestState(state: DailyQuestState) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(DAILY_QUEST_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Daily quests are local encouragement. Recognition should continue if storage is blocked.
  }
}

function getDailyQuestProgress({
  collection,
  dailyQuestState,
  getArtifactIds,
  itemMatchesMuseum,
}: {
  collection: CollectionItem[];
  dailyQuestState: DailyQuestState;
  getArtifactIds: (item: CollectionItem) => string[];
  itemMatchesMuseum: (item: CollectionItem, museumId: string) => boolean;
}): DailyQuestProgress[] {
  const todaysItems = getCollectionItemsForDate(collection, dailyQuestState.date);
  const uniqueArtifactCount =
    dailyQuestState.discoveredArtifactIds.length ||
    new Set(todaysItems.flatMap((item) => getArtifactIds(item))).size;

  return DAILY_QUESTS.map((quest) => {
    let progress = 0;

    if (quest.type === 'animal') {
      progress = todaysItems.filter((item) => itemMatchesMuseum(item, 'animal')).length;
    } else if (quest.type === 'traffic') {
      progress = todaysItems.filter((item) => itemMatchesMuseum(item, 'traffic')).length;
    } else {
      progress = uniqueArtifactCount;
    }

    return {
      ...quest,
      completed: progress >= quest.target,
      progress: Math.min(progress, quest.target),
      rewarded: dailyQuestState.rewardedQuestIds.includes(quest.id),
    };
  });
}

export function useDailyQuest({
  collection,
  getArtifactIds,
  itemMatchesMuseum,
}: {
  collection: CollectionItem[];
  getArtifactIds: (item: CollectionItem) => string[];
  itemMatchesMuseum: (item: CollectionItem, museumId: string) => boolean;
}) {
  const [dailyQuestState, setDailyQuestState] = useState<DailyQuestState>(() => readStoredDailyQuestState());
  const [latestDailyQuestReward, setLatestDailyQuestReward] = useState('');

  const dailyQuestProgress = useMemo(
    () =>
      getDailyQuestProgress({
        collection,
        dailyQuestState,
        getArtifactIds,
        itemMatchesMuseum,
      }),
    [collection, dailyQuestState, getArtifactIds, itemMatchesMuseum],
  );

  const clearLatestDailyQuestReward = useCallback(() => {
    setLatestDailyQuestReward('');
  }, []);

  const updateDailyQuestRewards = useCallback(
    (nextCollection: CollectionItem[], rewardHandlers: DailyQuestRewardHandlers) => {
      setDailyQuestState((currentState) => {
        const today = getDateKey(new Date());
        const todaysArtifactIds = Array.from(
          new Set(getCollectionItemsForDate(nextCollection, today).flatMap((item) => getArtifactIds(item))),
        );
        const activeState =
          currentState.date === today
            ? {
                ...currentState,
                discoveredArtifactIds: Array.from(new Set([...currentState.discoveredArtifactIds, ...todaysArtifactIds])),
              }
            : { date: today, discoveredArtifactIds: todaysArtifactIds, rewardedQuestIds: [] };
        const questProgress = getDailyQuestProgress({
          collection: nextCollection,
          dailyQuestState: activeState,
          getArtifactIds,
          itemMatchesMuseum,
        });
        const newlyCompletedQuests = questProgress.filter((quest) => quest.completed && !quest.rewarded);

        if (newlyCompletedQuests.length === 0) {
          saveStoredDailyQuestState(activeState);
          return activeState;
        }

        newlyCompletedQuests.forEach((quest) => {
          if (quest.id === 'three_unique_artifacts') {
            rewardHandlers.openMagicChest(nextCollection.length + quest.target);
          } else {
            rewardHandlers.addXpAmount(20);
          }
          rewardHandlers.addCompanionXp(20, '今天的探索任务完成啦！', '开心');
        });

        const nextState = {
          date: today,
          discoveredArtifactIds: activeState.discoveredArtifactIds,
          rewardedQuestIds: Array.from(
            new Set([...activeState.rewardedQuestIds, ...newlyCompletedQuests.map((quest) => quest.id)]),
          ),
        };
        saveStoredDailyQuestState(nextState);
        setLatestDailyQuestReward(newlyCompletedQuests[0].rewardLabel);
        return nextState;
      });
    },
    [getArtifactIds, itemMatchesMuseum],
  );

  return {
    clearLatestDailyQuestReward,
    dailyQuestProgress,
    dailyQuestState,
    latestDailyQuestReward,
    resetDailyQuestState: () => setDailyQuestState(getEmptyDailyQuestState()),
    updateDailyQuestRewards,
  };
}
