export type SeasonalEventTargetType = 'nature_animal' | 'ocean' | 'civilization' | 'technology_space';

export type SeasonalEvent = {
  description: string;
  emoji: string;
  id: string;
  rewardPreview: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  targetCount: number;
  targetType: SeasonalEventTargetType;
  themeColorLabel: string;
  title: string;
};

export const seasonalEvents: SeasonalEvent[] = [
  {
    description: '发现 5 个自然 / 动物类藏品，让春天的生命记忆重新发芽。',
    emoji: '🌸',
    id: 'spring-nature-exploration',
    rewardPreview: '春日探索徽章',
    season: 'spring',
    targetCount: 5,
    targetType: 'nature_animal',
    themeColorLabel: '春日粉绿',
    title: '春季探索季',
  },
  {
    description: '发现 3 个海洋相关藏品，收集来自海浪深处的世界记忆。',
    emoji: '🌊',
    id: 'summer-ocean-season',
    rewardPreview: '海洋记忆碎片',
    season: 'summer',
    targetCount: 3,
    targetType: 'ocean',
    themeColorLabel: '夏日海蓝',
    title: '夏季海洋季',
  },
  {
    description: '发现 5 个世界文化 / 文明类藏品，整理古老故事的金色书页。',
    emoji: '🍂',
    id: 'autumn-civilization-season',
    rewardPreview: '文明收藏印章',
    season: 'autumn',
    targetCount: 5,
    targetType: 'civilization',
    themeColorLabel: '秋日金橙',
    title: '秋季文明季',
  },
  {
    description: '发现 3 个科技 / 太空类藏品，点亮冬夜里的星空线索。',
    emoji: '❄️',
    id: 'winter-starry-season',
    rewardPreview: '星空探索徽章',
    season: 'winter',
    targetCount: 3,
    targetType: 'technology_space',
    themeColorLabel: '冬夜星蓝',
    title: '冬季星空季',
  },
];
