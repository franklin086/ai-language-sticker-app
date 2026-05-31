import { buildPassportData } from '../utils/passportHelpers';
import type { WorldMapCitySource } from '../utils/worldMapHelpers';

export function usePassport({
  cityMapCompletedNodeIds,
  cityMaps,
  museumCollectedIds,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: WorldMapCitySource[];
  museumCollectedIds: string[];
}) {
  void museumCollectedIds;

  return buildPassportData({
    cityMapCompletedNodeIds,
    cityMaps,
  });
}
