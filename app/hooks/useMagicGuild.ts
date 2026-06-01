import { buildMagicGuildData } from '../utils/magicGuildHelpers';

export function useMagicGuild(input: Parameters<typeof buildMagicGuildData>[0]) {
  return buildMagicGuildData(input);
}
