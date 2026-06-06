export type NationalNpc = {
  countryId: string;
  emoji: string;
  greeting: string;
  name: string;
  personality: string;
  progressMessages: {
    completed: string;
    empty: string;
    started: string;
  };
  title: string;
};

export const nationalNpcs: NationalNpc[] = [
  {
    countryId: 'china',
    emoji: '🐉',
    greeting: '欢迎来到中国魔法地图，这里有古老文明、城市故事和丰富自然记忆。',
    name: '龙龙馆长',
    personality: '沉稳、热情、喜欢讲城市与历史故事',
    progressMessages: {
      completed: '太棒了！中国探索已经完成，东方记忆被你点亮了。',
      empty: '中国地图还没有被点亮，先从一个城市开始探索吧。',
      started: '你已经打开中国探索之门，继续寻找更多城市记忆吧。',
    },
    title: '东方记忆守护者',
  },
  {
    countryId: 'japan',
    emoji: '🌸',
    greeting: '欢迎来到日本魔法地图，这里藏着樱花、科技与传统的秘密。',
    name: '小樱馆长',
    personality: '温柔、细心、喜欢发现传统与未来的连接',
    progressMessages: {
      completed: '太棒了！日本探索已经完成，樱花记忆被你点亮了。',
      empty: '日本地图还没有被点亮，先从东京开始探索吧。',
      started: '你已经听见日本城市的回声，继续收集新的记忆吧。',
    },
    title: '樱花文明引导者',
  },
  {
    countryId: 'usa',
    emoji: '🗽',
    greeting: '欢迎来到美国魔法地图，这里有城市天际线、科技和创造力故事。',
    name: '诺亚馆长',
    personality: '开朗、勇敢、喜欢讲发明和城市冒险',
    progressMessages: {
      completed: '太棒了！美国探索已经完成，自由与创造的光被你点亮了。',
      empty: '美国地图还没有被点亮，先从纽约开始探索吧。',
      started: '你已经开始美国城市冒险，继续寻找更多世界记忆吧。',
    },
    title: '城市冒险导师',
  },
  {
    countryId: 'france',
    emoji: '🎨',
    greeting: '欢迎来到法国魔法地图，这里藏着许多艺术与想象力的秘密。',
    name: '艾米馆长',
    personality: '优雅、好奇、喜欢讲艺术故事',
    progressMessages: {
      completed: '太棒了！法国探索已经完成，艺术之光被你点亮了。',
      empty: '法国地图还没有被点亮，先从巴黎开始探索吧。',
      started: '你已经打开法国艺术之门，继续寻找更多文明记忆吧。',
    },
    title: '艺术与创造力导师',
  },
  {
    countryId: 'uk',
    emoji: '👑',
    greeting: '欢迎来到英国魔法地图，这里有文明宝物、科学发现和城市故事。',
    name: '奥利弗馆长',
    personality: '礼貌、博学、喜欢讲文明与科学故事',
    progressMessages: {
      completed: '太棒了！英国探索已经完成，文明与科学之光被你点亮了。',
      empty: '英国地图还没有被点亮，先从伦敦开始探索吧。',
      started: '你已经打开英国文明宝箱，继续寻找更多历史线索吧。',
    },
    title: '文明宝库讲述者',
  },
  {
    countryId: 'italy',
    emoji: '🏛️',
    greeting: '欢迎来到意大利魔法地图，这里有古罗马和艺术复兴的记忆。',
    name: '莉娅馆长',
    personality: '浪漫、专注、喜欢讲建筑和艺术故事',
    progressMessages: {
      completed: '太棒了！意大利探索已经完成，古城与艺术记忆被你点亮了。',
      empty: '意大利地图还没有被点亮，先从罗马开始探索吧。',
      started: '你已经走进意大利文明长廊，继续寻找艺术碎片吧。',
    },
    title: '古城艺术引导者',
  },
  {
    countryId: 'spain',
    emoji: '⛵',
    greeting: '欢迎来到西班牙魔法地图，这里有艺术、阳光和航海探索故事。',
    name: '索菲亚馆长',
    personality: '明亮、热情、喜欢讲旅行和艺术故事',
    progressMessages: {
      completed: '太棒了！西班牙探索已经完成，阳光航线被你点亮了。',
      empty: '西班牙地图还没有被点亮，先从马德里开始探索吧。',
      started: '你已经踏上西班牙探索航线，继续发现更多文化记忆吧。',
    },
    title: '阳光航线导师',
  },
  {
    countryId: 'brazil',
    emoji: '🌴',
    greeting: '欢迎来到巴西魔法地图，这里有热带自然、音乐和运动的活力。',
    name: '卢卡馆长',
    personality: '活泼、热情、喜欢讲自然和节日故事',
    progressMessages: {
      completed: '太棒了！巴西探索已经完成，热带活力被你点亮了。',
      empty: '巴西地图还没有被点亮，先从里约热内卢开始探索吧。',
      started: '你已经听见巴西热带节奏，继续寻找更多自然记忆吧。',
    },
    title: '热带活力守护者',
  },
  {
    countryId: 'mexico',
    emoji: '🌵',
    greeting: '欢迎来到墨西哥魔法地图，这里有古老文明和多彩生活记忆。',
    name: '玛雅馆长',
    personality: '神秘、友好、喜欢讲古文明故事',
    progressMessages: {
      completed: '太棒了！墨西哥探索已经完成，古老文明记忆被你点亮了。',
      empty: '墨西哥地图还没有被点亮，先从墨西哥城开始探索吧。',
      started: '你已经打开墨西哥文明之门，继续寻找生活与历史碎片吧。',
    },
    title: '古文明线索守护者',
  },
  {
    countryId: 'egypt',
    emoji: '🔺',
    greeting: '欢迎来到埃及魔法地图，这里有金字塔、尼罗河和法老故事。',
    name: '娜芙馆长',
    personality: '神秘、聪明、喜欢讲古埃及故事',
    progressMessages: {
      completed: '太棒了！埃及探索已经完成，金字塔记忆被你点亮了。',
      empty: '埃及地图还没有被点亮，先从开罗开始探索吧。',
      started: '你已经发现埃及古老线索，继续寻找尼罗河的秘密吧。',
    },
    title: '金字塔记忆导师',
  },
  {
    countryId: 'india',
    emoji: '🕌',
    greeting: '欢迎来到印度魔法地图，这里有文明建筑、香料生活和电影色彩。',
    name: '阿雅馆长',
    personality: '温暖、灵动、喜欢讲香料和文明故事',
    progressMessages: {
      completed: '太棒了！印度探索已经完成，文明与香料记忆被你点亮了。',
      empty: '印度地图还没有被点亮，先从新德里开始探索吧。',
      started: '你已经打开印度文明画卷，继续寻找更多生活记忆吧。',
    },
    title: '香料文明引导者',
  },
  {
    countryId: 'australia',
    emoji: '🦘',
    greeting: '欢迎来到澳大利亚魔法地图，这里有海洋、动物和阳光海岸。',
    name: '米娅馆长',
    personality: '开朗、勇敢、喜欢讲动物和海洋故事',
    progressMessages: {
      completed: '太棒了！澳大利亚探索已经完成，海洋与动物记忆被你点亮了。',
      empty: '澳大利亚地图还没有被点亮，先从悉尼开始探索吧。',
      started: '你已经遇见澳洲自然伙伴，继续寻找更多海洋秘密吧。',
    },
    title: '海洋动物守护者',
  },
];
