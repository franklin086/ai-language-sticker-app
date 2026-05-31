import { storylineChapters, type StorylineChapter } from '../data/storylineChapters';
import { worldMagicMap } from '../data/worldMap';
import { buildWorldMapProgress } from './worldMapHelpers';

type CityMapLike = {
  emoji: string;
  id: string;
  museums: { id: string }[];
  name: string;
};

export type StorylineChapterProgress = StorylineChapter & {
  lockedReason: string;
  unlocked: boolean;
};

export type StorylineProgress = {
  chapters: StorylineChapterProgress[];
  completedCityCount: number;
  completedCountryCount: number;
  currentChapter: StorylineChapterProgress;
  restoredMemoryCount: number;
  totalMemoryCount: number;
};

function getLockedReason(chapterId: string, stats: {
  completedCityCount: number;
  completedCountryCount: number;
  discoveredCount: number;
  totalCountryCount: number;
}) {
  if (chapterId === 'chapter-1') {
    return `还差 ${Math.max(0, 1 - stats.discoveredCount)} 个藏品`;
  }

  if (chapterId === 'chapter-2') {
    return `还差 ${Math.max(0, 10 - stats.discoveredCount)} 个藏品`;
  }

  if (chapterId === 'chapter-3') {
    return `还差 ${Math.max(0, 1 - stats.completedCityCount)} 个城市`;
  }

  if (chapterId === 'chapter-4') {
    return `还差 ${Math.max(0, 1 - stats.completedCountryCount)} 个国家`;
  }

  return `还差 ${Math.max(0, stats.totalCountryCount - stats.completedCountryCount)} 个国家`;
}

function isChapterUnlocked(chapterId: string, stats: {
  allCountriesCompleted: boolean;
  completedCityCount: number;
  completedCountryCount: number;
  discoveredCount: number;
}) {
  if (chapterId === 'chapter-1') {
    return stats.discoveredCount >= 1;
  }

  if (chapterId === 'chapter-2') {
    return stats.discoveredCount >= 10;
  }

  if (chapterId === 'chapter-3') {
    return stats.completedCityCount >= 1;
  }

  if (chapterId === 'chapter-4') {
    return stats.completedCountryCount >= 1;
  }

  return stats.allCountriesCompleted;
}

export function buildStorylineProgress({
  cityMapCompletedNodeIds,
  cityMaps,
  restoredMemoryCount,
  totalMemoryCount,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  restoredMemoryCount: number;
  totalMemoryCount: number;
}): StorylineProgress {
  const worldProgress = buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });
  const completedCityCount = worldProgress.reduce((sum, country) => sum + country.completedCityCount, 0);
  const completedCountryCount = worldProgress.filter((country) => country.completed).length;
  const stats = {
    allCountriesCompleted: worldProgress.length > 0 && worldProgress.every((country) => country.completed),
    completedCityCount,
    completedCountryCount,
    discoveredCount: restoredMemoryCount,
    totalCountryCount: worldProgress.length,
  };
  const chapters = storylineChapters.map((chapter) => {
    const unlocked = isChapterUnlocked(chapter.id, stats);
    return {
      ...chapter,
      lockedReason: unlocked ? '' : getLockedReason(chapter.id, stats),
      unlocked,
    };
  });
  const unlockedChapters = chapters.filter((chapter) => chapter.unlocked);

  return {
    chapters,
    completedCityCount,
    completedCountryCount,
    currentChapter: unlockedChapters[unlockedChapters.length - 1] ?? chapters[0],
    restoredMemoryCount,
    totalMemoryCount,
  };
}
