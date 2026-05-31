import { museumNpcs, type MuseumNpc } from '../data/museumNpcs';

const FALLBACK_NPC: MuseumNpc = {
  emoji: '📚',
  greeting: '欢迎来到这座魔法博物馆，一起继续探索吧！',
  museum: '魔法图鉴馆',
  name: '图图馆长',
  personality: '耐心、友好、喜欢整理新发现',
  progressMessages: {
    completed: '这座博物馆已经被你点亮啦！',
    empty: '这里还等待第一件藏品被发现。',
    started: '你已经开始点亮这座博物馆了。',
  },
  title: '魔法收藏引导员',
};

function normalizeMuseumName(value: string) {
  return value.trim().toLowerCase();
}

export function getMuseumNpc(museumName: string) {
  const normalizedMuseumName = normalizeMuseumName(museumName);
  return museumNpcs.find((npc) => normalizeMuseumName(npc.museum) === normalizedMuseumName) ?? FALLBACK_NPC;
}

export function getMuseumNpcProgressMessage({
  collectedCount,
  museumName,
  totalCount,
}: {
  collectedCount: number;
  museumName: string;
  totalCount: number;
}) {
  const npc = getMuseumNpc(museumName);

  if (totalCount > 0 && collectedCount >= totalCount) {
    return npc.progressMessages.completed;
  }

  if (collectedCount > 0) {
    return npc.progressMessages.started;
  }

  return npc.progressMessages.empty;
}
