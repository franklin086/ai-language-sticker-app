import { buildMagicMuseumLeagueState } from '../utils/magicMuseumLeagueHelpers';

export function useMagicMuseumLeague({
  collection,
  museumCollectedIds,
}: Parameters<typeof buildMagicMuseumLeagueState>[0]) {
  return buildMagicMuseumLeagueState({
    collection,
    museumCollectedIds,
  });
}
