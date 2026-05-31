export type MuseumExplorerCollectionItem = {
  confidence: string;
  discoveredAt: string;
  emoji: string;
  object_en: string;
  object_zh: string;
  specific_en?: string;
  specific_zh?: string;
};

export type MuseumExplorerExhibit = {
  emoji: string;
  id: string;
  keywords: string[];
  object_en: string;
  object_zh: string;
};

export type MuseumExplorerMuseum = {
  emoji: string;
  exhibits: MuseumExplorerExhibit[];
  id: string;
  title: string;
};

export type MuseumExplorerSelection = {
  cityName: string;
  countryName: string;
  museumId: string;
  museumName: string;
};

export type MuseumExplorerArtifact = {
  discovered: boolean;
  exhibit: MuseumExplorerExhibit;
  item: MuseumExplorerCollectionItem | null;
};

export type MuseumExplorerData = {
  artifacts: MuseumExplorerArtifact[];
  cityName: string;
  collectedCount: number;
  completed: boolean;
  countryName: string;
  museum: MuseumExplorerMuseum;
  museumName: string;
  percent: number;
  totalCount: number;
};

function getPercent(collectedCount: number, totalCount: number) {
  if (totalCount <= 0) {
    return 0;
  }

  return Math.round((collectedCount / totalCount) * 100);
}

function findDiscoveredItem(exhibit: MuseumExplorerExhibit, collection: MuseumExplorerCollectionItem[]) {
  return (
    collection.find((item) => {
      const text = `${item.object_en} ${item.object_zh}`.toLowerCase();
      return exhibit.keywords.some((keyword) => text.includes(keyword.toLowerCase()));
    }) ?? null
  );
}

export function buildMuseumExplorerData({
  collection,
  museumCollectedIds,
  museums,
  selection,
}: {
  collection: MuseumExplorerCollectionItem[];
  museumCollectedIds: string[];
  museums: MuseumExplorerMuseum[];
  selection: MuseumExplorerSelection;
}): MuseumExplorerData | null {
  const museum = museums.find((item) => item.id === selection.museumId);

  if (!museum) {
    return null;
  }

  const artifacts = museum.exhibits.map((exhibit) => {
    const item = findDiscoveredItem(exhibit, collection);
    return {
      discovered: museumCollectedIds.includes(exhibit.id) || Boolean(item),
      exhibit,
      item,
    };
  });
  const collectedCount = artifacts.filter((artifact) => artifact.discovered).length;
  const totalCount = museum.exhibits.length;

  return {
    artifacts,
    cityName: selection.cityName,
    collectedCount,
    completed: totalCount > 0 && collectedCount === totalCount,
    countryName: selection.countryName,
    museum,
    museumName: selection.museumName,
    percent: getPercent(collectedCount, totalCount),
    totalCount,
  };
}
