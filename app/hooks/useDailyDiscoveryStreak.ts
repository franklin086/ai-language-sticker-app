import { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import {
  applyDailyDiscoverySuccess,
  DAILY_DISCOVERY_STREAK_MILESTONES,
  getEmptyDailyDiscoveryStreakState,
  getLocalDateKey,
  getNextDailyDiscoveryMilestone,
  normalizeDailyDiscoveryStreakState,
  type DailyDiscoveryStreakMilestone,
  type DailyDiscoveryStreakState,
} from '../utils/dailyDiscoveryStreakHelpers';
import { DAILY_DISCOVERY_STREAK_STORAGE_KEY } from '../utils/storageKeys';

function readStoredDailyDiscoveryStreakState() {
  const today = getLocalDateKey();

  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return getEmptyDailyDiscoveryStreakState(today);
  }

  try {
    const rawValue = window.localStorage.getItem(DAILY_DISCOVERY_STREAK_STORAGE_KEY);

    if (!rawValue) {
      return getEmptyDailyDiscoveryStreakState(today);
    }

    return normalizeDailyDiscoveryStreakState(JSON.parse(rawValue) as Partial<DailyDiscoveryStreakState>, today);
  } catch {
    return getEmptyDailyDiscoveryStreakState(today);
  }
}

function saveStoredDailyDiscoveryStreakState(state: DailyDiscoveryStreakState) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(DAILY_DISCOVERY_STREAK_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Streak is an encouragement layer. Recognition should keep working if storage is blocked.
  }
}

export function useDailyDiscoveryStreak() {
  const [dailyDiscoveryStreakState, setDailyDiscoveryStreakState] = useState<DailyDiscoveryStreakState>(() =>
    readStoredDailyDiscoveryStreakState(),
  );
  const [latestDailyDiscoveryMilestone, setLatestDailyDiscoveryMilestone] =
    useState<DailyDiscoveryStreakMilestone | null>(null);
  const nextMilestone = useMemo(
    () => getNextDailyDiscoveryMilestone(dailyDiscoveryStreakState.streakDays),
    [dailyDiscoveryStreakState.streakDays],
  );

  const updateDailyDiscoveryStreak = useCallback(() => {
    setDailyDiscoveryStreakState((currentState) => {
      const result = applyDailyDiscoverySuccess(currentState);
      saveStoredDailyDiscoveryStreakState(result.state);

      if (result.reachedMilestone) {
        setLatestDailyDiscoveryMilestone(result.reachedMilestone);
      }

      return result.state;
    });
  }, []);

  const clearLatestDailyDiscoveryMilestone = useCallback(() => {
    setLatestDailyDiscoveryMilestone(null);
  }, []);

  return {
    clearLatestDailyDiscoveryMilestone,
    dailyDiscoveryMilestones: DAILY_DISCOVERY_STREAK_MILESTONES,
    dailyDiscoveryStreakState,
    latestDailyDiscoveryMilestone,
    nextMilestone,
    updateDailyDiscoveryStreak,
  };
}
