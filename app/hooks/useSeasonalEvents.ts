import { buildSeasonalEventState } from '../utils/seasonalEventHelpers';

export function useSeasonalEvents({
  collection,
  museumCollectedIds,
}: Parameters<typeof buildSeasonalEventState>[0]) {
  return buildSeasonalEventState({
    collection,
    museumCollectedIds,
  });
}
