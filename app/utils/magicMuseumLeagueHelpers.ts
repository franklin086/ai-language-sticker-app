import { magicMuseumLeagues, type MagicMuseumLeague } from '../data/magicMuseumLeagues';
import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import { findMuseumArtifact, getMuseumArtifactId, getMuseumArtifactMuseumMeta } from './artifactHelpers';

type CollectionLike = {
  object_en: string;
  object_zh: string;
};

export type MagicMuseumLeagueProgress = MagicMuseumLeague & {
  collectedCount: number;
  percent: number;
  status: 'not_built' | 'growing' | 'complete';
  totalCount: number;
};

export type MagicMuseumLeagueState = {
  closestLeague: MagicMuseumLeagueProgress;
  leagues: MagicMuseumLeagueProgress[];
  totalPercent: number;
};

function getPercent(collectedCount: number, totalCount: number) {
  if (totalCount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((collectedCount / totalCount) * 100));
}

function includesAny(value: string, keywords: string[]) {
  const text = value.toLowerCase();
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function getArtifactSearchText(artifact: MuseumArtifact) {
  return [
    artifact.objectZh,
    artifact.objectEn,
    artifact.museum,
    artifact.story,
    ...(artifact.aliases ?? []),
  ].join(' ');
}

function artifactMatchesLeague(artifact: MuseumArtifact, league: MagicMuseumLeague) {
  const museumMeta = getMuseumArtifactMuseumMeta(artifact.museum);

  if (league.museumIds.includes(museumMeta.id)) {
    return true;
  }

  const searchText = getArtifactSearchText(artifact);

  if (league.id === 'animal-league') {
    return includesAny(searchText, ['动物', '澳洲动物', 'animal', 'koala', 'kangaroo', 'platypus']);
  }

  if (league.id === 'nature-league') {
    return includesAny(searchText, ['自然', '海洋', '森林', '瀑布', '河流', '大海', '珊瑚', 'nature', 'ocean', 'forest', 'coral']);
  }

  if (league.id === 'technology-league') {
    return includesAny(searchText, ['科技', '火箭', '机器人', '电脑', '无人机', '芯片', '蒸汽机', 'technology', 'rocket', 'robot', 'computer', 'drone']);
  }

  if (league.id === 'civilization-league') {
    return includesAny(searchText, ['文明', '金字塔', '印度文明', '玛雅', '大英', '罗塞塔', '法老', 'civilization', 'pyramid', 'pharaoh', 'rosetta']);
  }

  if (league.id === 'art-league') {
    return includesAny(searchText, ['艺术', '卢浮宫', '巴黎', '油画', '雕像', '蒙娜丽莎', 'art', 'painting', 'statue', 'louvre']);
  }

  return includesAny(searchText, ['世界文化', '职业', '生活', '香料', '人物', 'culture', 'profession', 'life', 'spice']);
}

function getDiscoveredArtifactIds({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const discoveredIds = new Set(museumCollectedIds);

  collection.forEach((item) => {
    const artifact = findMuseumArtifact(item);

    if (artifact) {
      discoveredIds.add(getMuseumArtifactId(artifact));
    }
  });

  return discoveredIds;
}

function buildLeagueProgress({
  discoveredArtifactIds,
  league,
}: {
  discoveredArtifactIds: Set<string>;
  league: MagicMuseumLeague;
}): MagicMuseumLeagueProgress {
  const leagueArtifacts = museumArtifacts.filter((artifact) => artifactMatchesLeague(artifact, league));
  const totalCount = leagueArtifacts.length;
  const collectedCount = leagueArtifacts.filter((artifact) => discoveredArtifactIds.has(getMuseumArtifactId(artifact))).length;
  const status: MagicMuseumLeagueProgress['status'] =
    totalCount > 0 && collectedCount >= totalCount ? 'complete' : collectedCount > 0 ? 'growing' : 'not_built';

  return {
    ...league,
    collectedCount,
    percent: getPercent(collectedCount, totalCount),
    status,
    totalCount,
  };
}

export function buildMagicMuseumLeagueState({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}): MagicMuseumLeagueState {
  const discoveredArtifactIds = getDiscoveredArtifactIds({ collection, museumCollectedIds });
  const leagues = magicMuseumLeagues.map((league) => buildLeagueProgress({ discoveredArtifactIds, league }));
  const growingLeagues = leagues.filter((league) => league.status !== 'complete' && league.collectedCount > 0);
  const closestLeague =
    growingLeagues.sort((a, b) => b.percent - a.percent)[0] ??
    leagues.find((league) => league.status !== 'complete') ??
    leagues[leagues.length - 1];
  const totalPercent = leagues.length ? Math.round(leagues.reduce((sum, league) => sum + league.percent, 0) / leagues.length) : 0;

  return {
    closestLeague,
    leagues,
    totalPercent,
  };
}
