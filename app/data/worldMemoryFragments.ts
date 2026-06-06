export type WorldMemoryFragmentSourceType =
  | 'animal'
  | 'ocean'
  | 'technology'
  | 'civilization'
  | 'city'
  | 'world_core';

export type WorldMemoryFragment = {
  description: string;
  emoji: string;
  id: string;
  sourceType: WorldMemoryFragmentSourceType;
  targetCount: number;
  theme: string;
  title: string;
};

export const worldMemoryFragments: WorldMemoryFragment[] = [
  {
    description: '来自动物朋友、自然生命和澳洲动物的记忆光点。',
    emoji: '🐾',
    id: 'animal-memory-fragment',
    sourceType: 'animal',
    targetCount: 10,
    theme: '生命绿光',
    title: '动物记忆碎片',
  },
  {
    description: '来自海洋、珊瑚、海龟、海豚、鲸鱼和船只的蓝色记忆。',
    emoji: '🌊',
    id: 'ocean-memory-fragment',
    sourceType: 'ocean',
    targetCount: 6,
    theme: '海浪蓝光',
    title: '海洋记忆碎片',
  },
  {
    description: '来自科技、太空、机器人、电脑和发明的星光记忆。',
    emoji: '🚀',
    id: 'technology-memory-fragment',
    sourceType: 'technology',
    targetCount: 8,
    theme: '星空银光',
    title: '科技记忆碎片',
  },
  {
    description: '来自文明、艺术、历史建筑和世界文化宝物的金色记忆。',
    emoji: '🏛',
    id: 'civilization-memory-fragment',
    sourceType: 'civilization',
    targetCount: 10,
    theme: '文明金光',
    title: '文明记忆碎片',
  },
  {
    description: '来自已点亮城市和城市地图完成度的探索记忆。',
    emoji: '🏙',
    id: 'city-memory-fragment',
    sourceType: 'city',
    targetCount: 1,
    theme: '城市灯光',
    title: '城市记忆碎片',
  },
  {
    description: '由全部藏品发现进度和国家完成进度共同组成的世界核心。',
    emoji: '🌍',
    id: 'world-memory-core',
    sourceType: 'world_core',
    targetCount: 100,
    theme: '世界虹光',
    title: '世界记忆核心',
  },
];
