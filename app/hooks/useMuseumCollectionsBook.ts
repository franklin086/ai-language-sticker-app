import { useMemo, useState } from 'react';
import {
  buildMuseumCollectionsBookState,
  type CollectionBookFilterKey,
  type CollectionBookSortKey,
} from '../utils/museumCollectionsBookHelpers';

export function useMuseumCollectionsBook({
  collection,
  museumCollectedIds,
}: {
  collection: Parameters<typeof buildMuseumCollectionsBookState>[0]['collection'];
  museumCollectedIds: string[];
}) {
  const [filterKey, setFilterKey] = useState<CollectionBookFilterKey>('all');
  const [sortKey, setSortKey] = useState<CollectionBookSortKey>('latest');
  const bookState = useMemo(
    () =>
      buildMuseumCollectionsBookState({
        collection,
        filterKey,
        museumCollectedIds,
        sortKey,
      }),
    [collection, filterKey, museumCollectedIds, sortKey],
  );

  return {
    ...bookState,
    filterKey,
    setFilterKey,
    setSortKey,
    sortKey,
  };
}
