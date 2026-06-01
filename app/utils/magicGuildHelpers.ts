import { buildMuseumMasterRank } from './museumMasterRankHelpers';
import { buildPassportData } from './passportHelpers';
import { buildStorylineProgress } from './storylineHelpers';
import { buildWorldExpeditionState } from './worldExpeditionHelpers';
import { buildWorldMapProgress } from './worldMapHelpers';
import { worldMagicMap } from '../data/worldMap';

type CollectionLike = {
  object_en: string;
  object_zh: string;
};

type CityMapLike = {
  emoji: string;
  id: string;
  museums: { id: string }[];
  name: string;
};

type MuseumLike = {
  exhibits: { id: string }[];
  id: string;
};

export type MagicGuildData = {
  completedCityCount: number;
  completedCountryCount: number;
  currentExpeditionTitle: string;
  currentRankLevel: number;
  currentRankTitle: string;
  currentStoryChapter: string;
  nextGoal: string;
  passportStampCount: number;
  restoredMemoryCount: number;
  totalMemoryCount: number;
  totalPassportStampCount: number;
};

export function buildMagicGuildData({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  totalArtifactCount,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: CollectionLike[];
  museumCollectedIds: string[];
  museums: MuseumLike[];
  totalArtifactCount: number;
}): MagicGuildData {
  const rank = buildMuseumMasterRank({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
    totalArtifactCount,
  });
  const expedition = buildWorldExpeditionState({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
  }).activeExpedition;
  const storyline = buildStorylineProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    restoredMemoryCount: museumCollectedIds.length,
    totalMemoryCount: totalArtifactCount,
  });
  const passport = buildPassportData({
    cityMapCompletedNodeIds,
    cityMaps,
  });
  const worldProgress = buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });
  const passportStamps = [...passport.cityStamps, ...passport.countryStamps, passport.worldStamp];
  const remainingExpedition = Math.max(0, expedition.target - expedition.currentValue);
  const nextGoal =
    remainingExpedition > 0
      ? `完成${expedition.title}，还差 ${remainingExpedition} 步`
      : `继续推进${storyline.currentChapter.title}`;

  return {
    completedCityCount: worldProgress.reduce((sum, country) => sum + country.completedCityCount, 0),
    completedCountryCount: worldProgress.filter((country) => country.completed).length,
    currentExpeditionTitle: expedition.title,
    currentRankLevel: rank.currentRank.id,
    currentRankTitle: rank.currentRank.title,
    currentStoryChapter: storyline.currentChapter.title,
    nextGoal,
    passportStampCount: passportStamps.filter((stamp) => stamp.status === 'unlocked').length,
    restoredMemoryCount: museumCollectedIds.length,
    totalMemoryCount: totalArtifactCount,
    totalPassportStampCount: passportStamps.length,
  };
}
