export type WorldExpeditionType =
  | 'animal_artifacts'
  | 'completed_museums'
  | 'completed_cities'
  | 'completed_countries'
  | 'restored_memories';

export type WorldExpedition = {
  description: string;
  id: string;
  rewardText: string;
  target: number;
  title: string;
  type: WorldExpeditionType;
};

export const worldExpeditions: WorldExpedition[] = [
  {
    description: '发现 3 个动物藏品，让动物朋友们重新想起自己的名字。',
    id: 'animal-friends-expedition',
    rewardText: '🏅 探索徽章',
    target: 3,
    title: '动物朋友远征',
    type: 'animal_artifacts',
  },
  {
    description: '完成 1 个博物馆，学习如何整理一座小小展厅。',
    id: 'museum-apprentice',
    rewardText: '📜 世界记忆碎片',
    target: 1,
    title: '博物馆学徒',
    type: 'completed_museums',
  },
  {
    description: '完成 1 个城市，让城市地图亮起第一束魔法光。',
    id: 'city-explorer',
    rewardText: '🏙️ 城市探索徽章',
    target: 1,
    title: '城市探索家',
    type: 'completed_cities',
  },
  {
    description: '完成 1 个国家，把城市线索连成国家记忆。',
    id: 'country-collector',
    rewardText: '🗺️ 国家收藏印章',
    target: 1,
    title: '国家收藏家',
    type: 'completed_countries',
  },
  {
    description: '恢复 50 个世界记忆，让世界记忆之书重新发光。',
    id: 'world-memory-guardian',
    rewardText: '✨ 传奇馆长声望',
    target: 50,
    title: '世界记忆守护者',
    type: 'restored_memories',
  },
];
