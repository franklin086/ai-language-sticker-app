import { useState } from 'react';
import {
  buildMuseumExplorerData,
  type MuseumExplorerCollectionItem,
  type MuseumExplorerMuseum,
  type MuseumExplorerSelection,
} from '../utils/museumExplorerHelpers';

export function useMuseumExplorer({
  collection,
  museumCollectedIds,
  museums,
}: {
  collection: MuseumExplorerCollectionItem[];
  museumCollectedIds: string[];
  museums: MuseumExplorerMuseum[];
}) {
  const [selectedMuseumExplorer, setSelectedMuseumExplorer] = useState<MuseumExplorerSelection | null>(null);
  const museumExplorerData = selectedMuseumExplorer
    ? buildMuseumExplorerData({
        collection,
        museumCollectedIds,
        museums,
        selection: selectedMuseumExplorer,
      })
    : null;

  return {
    closeMuseumExplorer: () => setSelectedMuseumExplorer(null),
    museumExplorerData,
    openMuseumExplorer: setSelectedMuseumExplorer,
  };
}
