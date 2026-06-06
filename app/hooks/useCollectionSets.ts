import { buildCollectionSetState } from '../utils/collectionSetHelpers';

export function useCollectionSets({
  collection,
  museumCollectedIds,
}: Parameters<typeof buildCollectionSetState>[0]) {
  return buildCollectionSetState({
    collection,
    museumCollectedIds,
  });
}
