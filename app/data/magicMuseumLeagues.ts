export type MagicMuseumLeague = {
  description: string;
  emoji: string;
  id: string;
  museumIds: string[];
  targetCount: number;
  theme: string;
  title: string;
};

export const magicMuseumLeagues: MagicMuseumLeague[] = [
  {
    description: '连接动物朋友、澳洲动物和自然中的生命线索。',
    emoji: '🐾',
    id: 'animal-league',
    museumIds: ['animal', 'sydney-australian-animals'],
    targetCount: 10,
    theme: '生命徽章',
    title: '动物联盟',
  },
  {
    description: '守护自然博物馆、海洋自然馆和未来森林生态馆。',
    emoji: '🌿',
    id: 'nature-league',
    museumIds: ['nature', 'sydney-ocean-nature', 'forest-ecology'],
    targetCount: 10,
    theme: '自然绿光',
    title: '自然联盟',
  },
  {
    description: '汇集科技馆、伦敦科技馆和未来科技馆的发明能量。',
    emoji: '🚀',
    id: 'technology-league',
    museumIds: ['technology', 'london-science', 'future-technology'],
    targetCount: 8,
    theme: '星空科技',
    title: '科技联盟',
  },
  {
    description: '收藏金字塔、印度、玛雅和大英文明留下的古老记忆。',
    emoji: '🏛',
    id: 'civilization-league',
    museumIds: [
      'cairo-pyramid-civilization',
      'new-delhi-indian-civilization',
      'mexico-city-maya-civilization',
      'london-british-civilization',
    ],
    targetCount: 10,
    theme: '文明金章',
    title: '文明联盟',
  },
  {
    description: '点亮卢浮宫魔法馆、巴黎艺术馆和更多艺术主题馆。',
    emoji: '🎨',
    id: 'art-league',
    museumIds: ['paris-louvre-magic', 'paris-art', 'rome-renaissance-art', 'madrid-spanish-art'],
    targetCount: 8,
    theme: '艺术虹光',
    title: '艺术联盟',
  },
  {
    description: '连接世界文化馆、职业馆、生活发现馆和跨文化主题馆。',
    emoji: '🌍',
    id: 'world-culture-league',
    museumIds: ['culture', 'profession', 'life', 'new-delhi-spice-life', 'cross-cultural'],
    targetCount: 10,
    theme: '世界文化光环',
    title: '世界文化联盟',
  },
];
