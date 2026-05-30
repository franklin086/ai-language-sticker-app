import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { ACHIEVEMENTS_STORAGE_KEY } from '../utils/storageKeys';

type AchievementLike<TId extends string> = {
  encouragement?: string;
  emoji: string;
  id: TId;
  title: string;
};

function readStoredAchievements<TId extends string>(validIds: Set<TId>, legacyIds: Set<TId>): TId[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is TId => validIds.has(id as TId) || legacyIds.has(id as TId));
  } catch {
    return [];
  }
}

function saveStoredAchievements<TId extends string>(achievementIds: TId[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievementIds));
  } catch {
    // Achievements are local encouragement. Recognition should continue if storage is blocked.
  }
}

export function useAchievements<TId extends string, TAchievement extends AchievementLike<TId>>({
  achievements,
  legacyAchievementIds,
}: {
  achievements: TAchievement[];
  legacyAchievementIds: TId[];
}) {
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<TId[]>(() => {
    const validIds = new Set(achievements.map((achievement) => achievement.id));
    return readStoredAchievements(validIds, new Set(legacyAchievementIds));
  });
  const [latestAchievement, setLatestAchievement] = useState<TAchievement | null>(null);
  const achievementValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (!latestAchievement) {
      achievementValue.current.setValue(0);
      return;
    }

    achievementValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(achievementValue.current, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.back(1.9)),
        useNativeDriver: true,
      }),
      Animated.timing(achievementValue.current, {
        toValue: 0.94,
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [latestAchievement]);

  const unlockAchievementIds = useCallback(
    (candidateIds: TId[]) => {
      setUnlockedAchievementIds((currentIds) => {
        const newIds = candidateIds.filter((id) => !currentIds.includes(id));
        if (newIds.length === 0) {
          return currentIds;
        }

        const nextIds = [...currentIds, ...newIds];
        saveStoredAchievements(nextIds);
        setLatestAchievement(achievements.find((achievement) => achievement.id === newIds[0]) ?? achievements[0] ?? null);
        return nextIds;
      });
    },
    [achievements],
  );

  const achievementOpacity = achievementValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const achievementScale = achievementValue.current.interpolate({
    inputRange: [0, 0.58, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const achievementTranslateY = achievementValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });
  const achievementGlowScale = achievementValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.65, 1.42, 1.16],
  });

  return {
    achievementGlowScale,
    achievementOpacity,
    achievementScale,
    achievementTranslateY,
    latestAchievement,
    unlockAchievementIds,
    unlockedAchievementIds,
  };
}
