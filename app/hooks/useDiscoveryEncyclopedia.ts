import { useMemo, useState } from 'react';
import {
  buildDiscoveryEncyclopediaState,
  type EncyclopediaFilterKey,
  type EncyclopediaSortKey,
} from '../utils/discoveryEncyclopediaHelpers';

export function useDiscoveryEncyclopedia({
  collection,
  museumCollectedIds,
}: {
  collection: Parameters<typeof buildDiscoveryEncyclopediaState>[0]['collection'];
  museumCollectedIds: string[];
}) {
  const [filterKey, setFilterKey] = useState<EncyclopediaFilterKey>('all');
  const [sortKey, setSortKey] = useState<EncyclopediaSortKey>('latest');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const encyclopediaState = useMemo(
    () =>
      buildDiscoveryEncyclopediaState({
        collection,
        filterKey,
        museumCollectedIds,
        selectedArtifactId,
        sortKey,
      }),
    [collection, filterKey, museumCollectedIds, selectedArtifactId, sortKey],
  );

  return {
    ...encyclopediaState,
    filterKey,
    selectArtifact: setSelectedArtifactId,
    selectedArtifactId,
    setFilterKey,
    setSortKey,
    sortKey,
  };
}
