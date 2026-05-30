import { useState } from 'react';
import {
  buildArtifactDetailData,
  groupArtifactsByMuseum,
  type CollectionItem,
  type MagicMuseum,
  type MuseumExhibit,
  type RecognitionResult,
  type StickerCategoryKey,
} from '../utils/collectionGalleryHelpers';
import type { MuseumSectionArtifact } from '../components/MuseumSection';

export function useCollectionGallery({
  collection,
  formatDiscoveredAt,
  getArtifactFact,
  getRarityCardStyle,
  getStickerCategory,
  getStickerCategoryLabel,
  lockedMessage,
  museums,
}: {
  collection: CollectionItem[];
  formatDiscoveredAt: (discoveredAt: string) => string;
  getArtifactFact: (item: RecognitionResult) => string;
  getRarityCardStyle: (item: CollectionItem) => MuseumSectionArtifact['rarityCardStyle'];
  getStickerCategory: (item: RecognitionResult) => StickerCategoryKey;
  getStickerCategoryLabel: (categoryKey: StickerCategoryKey) => string;
  lockedMessage: string;
  museums: MagicMuseum[];
}) {
  const firstExhibit = museums[0]?.exhibits[0] ?? null;
  const [selectedExhibitId, setSelectedExhibitId] = useState(firstExhibit?.id ?? '');
  const [detailArtifact, setDetailArtifact] = useState<{
    exhibit: MuseumExhibit;
    item: CollectionItem;
    museum: MagicMuseum;
  } | null>(null);
  const [lockedHint, setLockedHint] = useState('');

  const selectedMuseum =
    museums.find((museum) => museum.exhibits.some((exhibit) => exhibit.id === selectedExhibitId)) ?? museums[0];
  const selectedExhibit =
    selectedMuseum?.exhibits.find((exhibit) => exhibit.id === selectedExhibitId) ?? selectedMuseum?.exhibits[0];
  const selectedDetails = selectedExhibit
    ? buildArtifactDetailData({
        collection,
        exhibit: selectedExhibit,
        formatDiscoveredAt,
        getArtifactFact,
        getStickerCategory,
        getStickerCategoryLabel,
      })
    : null;

  const museumSections = groupArtifactsByMuseum({
    collection,
    getRarityCardStyle,
    museums,
    onArtifactPress: ({ discoveredItem, exhibit, museum }) => {
      setSelectedExhibitId(exhibit.id);
      if (!discoveredItem) {
        setLockedHint(lockedMessage);
        return;
      }

      setLockedHint('');
      setDetailArtifact({ exhibit, item: discoveredItem, museum });
    },
    selectedExhibitId: selectedExhibit?.id ?? selectedExhibitId,
  });

  return {
    closeDetailArtifact: () => setDetailArtifact(null),
    detailArtifact,
    lockedHint,
    museumSections,
    selectedDetails,
    selectedExhibit,
    selectedMuseum,
  };
}
