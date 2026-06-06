import { nationalNpcs, type NationalNpc } from '../data/nationalNpcs';

const defaultNationalNpc: NationalNpc = {
  countryId: 'default',
  emoji: '🌍',
  greeting: '欢迎来到新的国家魔法地图。',
  name: '世界向导',
  personality: '温暖、耐心、喜欢陪你探索世界',
  progressMessages: {
    completed: '这个国家已经被你点亮了，继续探索更大的世界吧。',
    empty: '继续探索这个国家的秘密吧。',
    started: '你已经开始探索这个国家的秘密了，继续前进吧。',
  },
  title: '世界探索引导者',
};

function normalizeCountryId(countryId: string) {
  if (countryId === 'united-kingdom') {
    return 'uk';
  }

  return countryId;
}

export function getNationalNpc(countryId: string) {
  const normalizedCountryId = normalizeCountryId(countryId);
  return nationalNpcs.find((npc) => npc.countryId === normalizedCountryId) ?? defaultNationalNpc;
}

export function getNationalNpcProgressMessage({
  countryId,
  percent,
}: {
  countryId: string;
  percent: number;
}) {
  const npc = getNationalNpc(countryId);

  if (percent >= 100) {
    return npc.progressMessages.completed;
  }

  if (percent > 0) {
    return npc.progressMessages.started;
  }

  return npc.progressMessages.empty;
}
