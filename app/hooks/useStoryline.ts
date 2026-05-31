import { buildStorylineProgress } from '../utils/storylineHelpers';

export function useStoryline({
  cityMapCompletedNodeIds,
  cityMaps,
  restoredMemoryCount,
  totalMemoryCount,
}: Parameters<typeof buildStorylineProgress>[0]) {
  return buildStorylineProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    restoredMemoryCount,
    totalMemoryCount,
  });
}
