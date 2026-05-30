import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { COMPANION_STORAGE_KEY } from '../utils/storageKeys';

export type CompanionState = {
  level: number;
  mood: string;
  title: string;
  unlockedMessages: string[];
  xp: number;
};

export const COMPANION_XP_PER_LEVEL = 100;

const DEFAULT_COMPANION_MESSAGE = '我们一起探索世界吧！';

const DEFAULT_COMPANION_STATE: CompanionState = {
  level: 1,
  mood: '好奇',
  title: '小小助手',
  unlockedMessages: [DEFAULT_COMPANION_MESSAGE],
  xp: 0,
};

function getCompanionTitle(level: number) {
  if (level >= 10) {
    return '传奇魔法伙伴';
  }

  if (level >= 5) {
    return '博物馆守护者';
  }

  if (level >= 3) {
    return '探索伙伴';
  }

  if (level >= 2) {
    return '魔法朋友';
  }

  return '小小助手';
}

function readStoredCompanionState(): CompanionState {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return DEFAULT_COMPANION_STATE;
  }

  try {
    const rawValue = window.localStorage.getItem(COMPANION_STORAGE_KEY);
    if (!rawValue) {
      return DEFAULT_COMPANION_STATE;
    }

    const parsed = JSON.parse(rawValue) as Partial<CompanionState>;
    const level = typeof parsed.level === 'number' ? Math.max(1, parsed.level) : DEFAULT_COMPANION_STATE.level;
    return {
      level,
      mood: typeof parsed.mood === 'string' && parsed.mood.trim() ? parsed.mood : DEFAULT_COMPANION_STATE.mood,
      title: getCompanionTitle(level),
      unlockedMessages: Array.isArray(parsed.unlockedMessages)
        ? parsed.unlockedMessages.filter((message) => typeof message === 'string' && message.trim())
        : DEFAULT_COMPANION_STATE.unlockedMessages,
      xp:
        typeof parsed.xp === 'number'
          ? Math.max(0, Math.min(COMPANION_XP_PER_LEVEL - 1, parsed.xp))
          : DEFAULT_COMPANION_STATE.xp,
    };
  } catch {
    return DEFAULT_COMPANION_STATE;
  }
}

function saveStoredCompanionState(state: CompanionState) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(COMPANION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Companion growth is local encouragement. Recognition should continue if storage is blocked.
  }
}

export function useCompanion() {
  const [companionState, setCompanionState] = useState<CompanionState>(DEFAULT_COMPANION_STATE);
  const [companionMessage, setCompanionMessage] = useState(DEFAULT_COMPANION_MESSAGE);
  const [latestCompanionTitle, setLatestCompanionTitle] = useState('');

  useEffect(() => {
    const storedCompanion = readStoredCompanionState();
    setCompanionState(storedCompanion);
    setCompanionMessage(storedCompanion.unlockedMessages[storedCompanion.unlockedMessages.length - 1] ?? DEFAULT_COMPANION_MESSAGE);
  }, []);

  const addCompanionXp = useCallback((earnedXp: number, message: string, mood: string) => {
    setCompanionMessage(message);
    setCompanionState((currentState) => {
      let nextXp = currentState.xp + earnedXp;
      let nextLevel = currentState.level;

      while (nextXp >= COMPANION_XP_PER_LEVEL) {
        nextXp -= COMPANION_XP_PER_LEVEL;
        nextLevel += 1;
      }

      const nextTitle = getCompanionTitle(nextLevel);
      const nextState = {
        level: nextLevel,
        mood,
        title: nextTitle,
        unlockedMessages: Array.from(new Set([...currentState.unlockedMessages, message])),
        xp: nextXp,
      };
      saveStoredCompanionState(nextState);

      if (nextLevel > currentState.level) {
        setLatestCompanionTitle(nextTitle);
      }

      return nextState;
    });
  }, []);

  return {
    addCompanionXp,
    companionMessage,
    companionState,
    companionXpPerLevel: COMPANION_XP_PER_LEVEL,
    latestCompanionTitle,
  };
}
