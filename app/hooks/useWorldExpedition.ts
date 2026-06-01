import { buildWorldExpeditionState } from '../utils/worldExpeditionHelpers';

export function useWorldExpedition({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
}: Parameters<typeof buildWorldExpeditionState>[0]) {
  return buildWorldExpeditionState({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
  });
}
