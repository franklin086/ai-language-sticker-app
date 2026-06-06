export type DailyDiscoveryStreakState = {
  bestStreakDays: number;
  lastExploredDate: string;
  milestoneShownIds: string[];
  streakDays: number;
  todayExplored: boolean;
};

export type DailyDiscoveryStreakMilestone = {
  days: number;
  id: string;
  title: string;
};

export const DAILY_DISCOVERY_STREAK_MILESTONES: DailyDiscoveryStreakMilestone[] = [
  { days: 1, id: 'day-1', title: '初次回归' },
  { days: 3, id: 'day-3', title: '连续探索者' },
  { days: 7, id: 'day-7', title: '一周小馆长' },
  { days: 30, id: 'day-30', title: '传奇探索习惯' },
];

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDateTime(dateKey: string) {
  return new Date(`${dateKey}T00:00:00`).getTime();
}

export function getDateDiffDays(fromDateKey: string, toDateKey: string) {
  if (!fromDateKey || !toDateKey) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.round((getDateTime(toDateKey) - getDateTime(fromDateKey)) / 86400000);
}

export function getEmptyDailyDiscoveryStreakState(today = getLocalDateKey()): DailyDiscoveryStreakState {
  return {
    bestStreakDays: 0,
    lastExploredDate: '',
    milestoneShownIds: [],
    streakDays: 0,
    todayExplored: false,
  };
}

export function normalizeDailyDiscoveryStreakState(
  value: Partial<DailyDiscoveryStreakState> | null | undefined,
  today = getLocalDateKey(),
): DailyDiscoveryStreakState {
  if (!value) {
    return getEmptyDailyDiscoveryStreakState(today);
  }

  return {
    bestStreakDays: Number.isFinite(value.bestStreakDays) ? Math.max(0, Number(value.bestStreakDays)) : 0,
    lastExploredDate: typeof value.lastExploredDate === 'string' ? value.lastExploredDate : '',
    milestoneShownIds: Array.isArray(value.milestoneShownIds)
      ? Array.from(new Set(value.milestoneShownIds.filter((id) => typeof id === 'string')))
      : [],
    streakDays: Number.isFinite(value.streakDays) ? Math.max(0, Number(value.streakDays)) : 0,
    todayExplored: value.lastExploredDate === today ? Boolean(value.todayExplored) : false,
  };
}

export function applyDailyDiscoverySuccess(
  currentState: DailyDiscoveryStreakState,
  today = getLocalDateKey(),
): {
  reachedMilestone: DailyDiscoveryStreakMilestone | null;
  state: DailyDiscoveryStreakState;
} {
  if (currentState.lastExploredDate === today && currentState.todayExplored) {
    return { reachedMilestone: null, state: currentState };
  }

  const dayDiff = getDateDiffDays(currentState.lastExploredDate, today);
  const nextStreakDays = dayDiff === 1 ? currentState.streakDays + 1 : 1;
  const reachedMilestone =
    DAILY_DISCOVERY_STREAK_MILESTONES.find(
      (milestone) =>
        nextStreakDays >= milestone.days &&
        currentState.streakDays < milestone.days &&
        !currentState.milestoneShownIds.includes(milestone.id),
    ) ?? null;
  const milestoneShownIds = reachedMilestone
    ? Array.from(new Set([...currentState.milestoneShownIds, reachedMilestone.id]))
    : currentState.milestoneShownIds;

  return {
    reachedMilestone,
    state: {
      bestStreakDays: Math.max(currentState.bestStreakDays, nextStreakDays),
      lastExploredDate: today,
      milestoneShownIds,
      streakDays: nextStreakDays,
      todayExplored: true,
    },
  };
}

export function getNextDailyDiscoveryMilestone(streakDays: number) {
  return (
    DAILY_DISCOVERY_STREAK_MILESTONES.find((milestone) => milestone.days > streakDays) ??
    DAILY_DISCOVERY_STREAK_MILESTONES[DAILY_DISCOVERY_STREAK_MILESTONES.length - 1]
  );
}
