import { getMuseumNpc } from './museumNpcHelpers';
import {
  findMuseumArtifact,
  getMuseumArtifactCategory,
  type MagicMuseum,
  type StickerCategoryKey,
} from './artifactHelpers';
import { buildWorldExpeditionState } from './worldExpeditionHelpers';

export type DiscoveryCelebrationItem = {
  confidence?: string;
  discoveredAt?: string;
  emoji: string;
  object_en: string;
  object_zh: string;
  specific_en?: string;
  specific_zh?: string;
};

export type DiscoveryCelebrationData = {
  curatorBlessing: string;
  emoji: string;
  expeditionHint: string;
  museumTitle: string;
  objectEn: string;
  objectZh: string;
  rarityCategory: StickerCategoryKey;
  rarityLabel: string;
};

type CityMapLike = {
  emoji: string;
  id: string;
  museums: { id: string }[];
  name: string;
};

function getRarityLabel(category: StickerCategoryKey) {
  if (category === 'legendary') {
    return '传奇';
  }

  if (category === 'epic') {
    return '史诗';
  }

  if (category === 'rare') {
    return '稀有';
  }

  return '普通';
}

function getMuseumInfo(item: DiscoveryCelebrationItem) {
  const artifact = findMuseumArtifact(item);

  if (!artifact) {
    return {
      museumTitle: '魔法图鉴馆',
      rarityCategory: 'common' as StickerCategoryKey,
    };
  }

  return {
    museumTitle: artifact.museum,
    rarityCategory: getMuseumArtifactCategory(artifact),
  };
}

function getExpeditionHint({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: DiscoveryCelebrationItem[];
  museumCollectedIds: string[];
  museums: MagicMuseum[];
}) {
  const expedition = buildWorldExpeditionState({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
  }).activeExpedition;

  return `${expedition.title}：${Math.min(expedition.currentValue, expedition.target)} / ${expedition.target}`;
}

export function buildDiscoveryCelebration({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  item,
  museumCollectedIds,
  museums,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMapLike[];
  collection: DiscoveryCelebrationItem[];
  item: DiscoveryCelebrationItem;
  museumCollectedIds: string[];
  museums: MagicMuseum[];
}): DiscoveryCelebrationData {
  const museumInfo = getMuseumInfo(item);
  const npc = getMuseumNpc(museumInfo.museumTitle);
  const objectZh = item.specific_zh?.trim() || item.object_zh;
  const objectEn = item.specific_en?.trim() || item.object_en;

  return {
    curatorBlessing: `${npc.name}：你又发现了一件新的魔法藏品！`,
    emoji: item.emoji,
    expeditionHint: getExpeditionHint({
      cityMapCompletedNodeIds,
      cityMaps,
      collection,
      museumCollectedIds,
      museums,
    }),
    museumTitle: museumInfo.museumTitle,
    objectEn,
    objectZh,
    rarityCategory: museumInfo.rarityCategory,
    rarityLabel: getRarityLabel(museumInfo.rarityCategory),
  };
}
