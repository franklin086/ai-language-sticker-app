import { buildWorldMemoryFragmentState } from '../utils/worldMemoryFragmentHelpers';

export function useWorldMemoryFragments({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
}: Parameters<typeof buildWorldMemoryFragmentState>[0]) {
  return buildWorldMemoryFragmentState({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
  });
}
