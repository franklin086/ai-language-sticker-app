export type CollectionSet = {
  description: string;
  emoji: string;
  id: string;
  requiredArtifacts: string[];
  rewardPreview: string;
  theme: string;
  title: string;
};

export const collectionSets: CollectionSet[] = [
  {
    description: '收集航天与未来科技藏品，点亮通往星空的路线。',
    emoji: '🚀',
    id: 'china-space-set',
    requiredArtifacts: ['长征五号火箭模型', '宇航员', '火箭', '机器人', '空间站模型'],
    rewardPreview: '航天探索纪念章',
    theme: '星空航线',
    title: '中国航天套装',
  },
  {
    description: '寻找世界各地特别珍贵的动物朋友。',
    emoji: '🐼',
    id: 'rare-animal-set',
    requiredArtifacts: ['熊猫', '袋鼠', '考拉', '鸭嘴兽', '海龟', '鲸鱼'],
    rewardPreview: '珍稀动物守护印章',
    theme: '生命奇迹',
    title: '珍稀动物套装',
  },
  {
    description: '把艺术、古文字和古文明记忆连接成世界文明线索。',
    emoji: '🏛',
    id: 'world-civilization-set',
    requiredArtifacts: ['蒙娜丽莎', '罗塞塔石碑', '图坦卡蒙面具', '泰姬陵模型', '玛雅文明馆相关藏品'],
    rewardPreview: '文明记忆书页',
    theme: '文明长廊',
    title: '世界文明套装',
  },
  {
    description: '收集城市旅行标志，完成一次跨城市魔法旅行。',
    emoji: '🏙',
    id: 'city-travel-set',
    requiredArtifacts: ['埃菲尔铁塔模型', '红色电话亭', '双层巴士', '巴黎地铁票', '大本钟模型'],
    rewardPreview: '城市旅行贴纸',
    theme: '城市灯光',
    title: '城市旅行套装',
  },
  {
    description: '收集海浪、海洋动物和水上旅行的蓝色记忆。',
    emoji: '🌊',
    id: 'ocean-exploration-set',
    requiredArtifacts: ['大堡礁珊瑚', '海龟', '冲浪板', '海豚', '鲸鱼', '船'],
    rewardPreview: '海洋探索碎片',
    theme: '海浪蓝光',
    title: '海洋探索套装',
  },
  {
    description: '把身边常见物品组成一套生活里的小魔法。',
    emoji: '🏠',
    id: 'daily-life-magic-set',
    requiredArtifacts: ['杯子', '手机', '电脑', '相机', '书', '鞋子'],
    rewardPreview: '生活魔法收藏章',
    theme: '日常闪光',
    title: '生活魔法套装',
  },
];
