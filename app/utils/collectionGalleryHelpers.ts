import type { MuseumSectionArtifact } from '../components/MuseumSection';

export type RecognitionResult = {
  object_en: string;
  object_zh: string;
  confidence: string;
};

export type CollectionItem = RecognitionResult & {
  discoveredAt: string;
  emoji: string;
};

export type MuseumExhibit = {
  emoji: string;
  id: string;
  keywords: string[];
  object_en: string;
  object_zh: string;
};

export type MagicMuseum = {
  emoji: string;
  exhibits: MuseumExhibit[];
  id: string;
  title: string;
};

export type GalleryArtifactDetails = {
  discoveredAt: string;
  emoji: string;
  rarityLabel: string;
  story: string;
};

export type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';

export type CollectionDetailArtifact = {
  exhibit: MuseumExhibit;
  item: CollectionItem;
  museum: MagicMuseum;
};

export function findCollectionRecord(exhibit: MuseumExhibit, collection: CollectionItem[]) {
  return collection.find((item) => exhibit.keywords.some((keyword) => item.object_en.toLowerCase().includes(keyword)));
}

export function isArtifactCollected(exhibit: MuseumExhibit, collection: CollectionItem[]) {
  return Boolean(findCollectionRecord(exhibit, collection));
}

export function getCollectionMuseumProgress(museum: MagicMuseum, collection: CollectionItem[]) {
  const collectedExhibitIds = museum.exhibits
    .filter((exhibit) => isArtifactCollected(exhibit, collection))
    .map((exhibit) => exhibit.id);
  const collectedCount = museum.exhibits.filter((exhibit) => collectedExhibitIds.includes(exhibit.id)).length;
  const museumPercent = Math.round((collectedCount / museum.exhibits.length) * 100);

  return {
    collectedCount,
    collectedExhibitIds,
    museumPercent,
  };
}

export function buildArtifactDetailData({
  collection,
  exhibit,
  formatDiscoveredAt,
  getArtifactFact,
  getStickerCategory,
  getStickerCategoryLabel,
}: {
  collection: CollectionItem[];
  exhibit: MuseumExhibit;
  formatDiscoveredAt: (discoveredAt: string) => string;
  getArtifactFact: (item: RecognitionResult) => string;
  getStickerCategory: (item: RecognitionResult) => StickerCategoryKey;
  getStickerCategoryLabel: (categoryKey: StickerCategoryKey) => string;
}): GalleryArtifactDetails {
  const discoveredItem = findCollectionRecord(exhibit, collection);
  const itemForDetails = discoveredItem ?? {
    confidence: 'high',
    object_en: exhibit.object_en,
    object_zh: exhibit.object_zh,
  };

  return {
    discoveredAt: discoveredItem ? formatDiscoveredAt(discoveredItem.discoveredAt) : '尚未发现',
    emoji: discoveredItem?.emoji ?? exhibit.emoji,
    rarityLabel: getStickerCategoryLabel(getStickerCategory(itemForDetails)),
    story: getArtifactFact(itemForDetails),
  };
}

export function groupArtifactsByMuseum({
  collection,
  getRarityCardStyle,
  museums,
  onArtifactPress,
  selectedExhibitId,
}: {
  collection: CollectionItem[];
  getRarityCardStyle: (item: CollectionItem) => MuseumSectionArtifact['rarityCardStyle'];
  museums: MagicMuseum[];
  onArtifactPress: (params: {
    discoveredItem: CollectionItem | undefined;
    exhibit: MuseumExhibit;
    museum: MagicMuseum;
  }) => void;
  selectedExhibitId: string;
}) {
  return museums.map((museum) => {
    const progress = getCollectionMuseumProgress(museum, collection);
    const artifacts = museum.exhibits.map((exhibit) => {
      const discoveredItem = findCollectionRecord(exhibit, collection);

      return {
        discovered: Boolean(discoveredItem),
        emoji: exhibit.emoji,
        id: exhibit.id,
        isSelected: exhibit.id === selectedExhibitId,
        objectEn: exhibit.object_en,
        objectZh: exhibit.object_zh,
        onPress: () => onArtifactPress({ discoveredItem, exhibit, museum }),
        rarityCardStyle: discoveredItem ? getRarityCardStyle(discoveredItem) : undefined,
      };
    });

    return {
      artifacts,
      collectedCount: progress.collectedCount,
      museum,
      museumPercent: progress.museumPercent,
    };
  });
}
