import { buildMuseumMasterRank } from '../utils/museumMasterRankHelpers';

export function useMuseumMasterRank({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  totalArtifactCount,
}: Parameters<typeof buildMuseumMasterRank>[0]) {
  return buildMuseumMasterRank({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
    totalArtifactCount,
  });
}
