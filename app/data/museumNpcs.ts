export type MuseumNpc = {
  emoji: string;
  greeting: string;
  museum: string;
  name: string;
  personality: string;
  progressMessages: {
    completed: string;
    empty: string;
    started: string;
  };
  title: string;
};

export const museumNpcs: MuseumNpc[] = [
  {
    emoji: '🦁',
    greeting: '欢迎来到动物博物馆，今天我们一起认识新的动物朋友吧！',
    museum: '动物博物馆',
    name: '露露馆长',
    personality: '温柔、好奇、喜欢讲动物故事',
    progressMessages: {
      completed: '太棒了！动物博物馆已经被你点亮了。',
      empty: '这里还很安静，去发现第一位动物朋友吧。',
      started: '你已经找到一些动物朋友了，继续探索吧！',
    },
    title: '动物朋友守护者',
  },
  {
    emoji: '🚗',
    greeting: '欢迎来到交通博物馆，准备好启动探索引擎了吗？',
    museum: '交通博物馆',
    name: '麦克馆长',
    personality: '热情、勇敢、喜欢研究各种交通工具',
    progressMessages: {
      completed: '交通路线全都点亮啦，你是真正的小小交通专家！',
      empty: '车站还没有发车，先去发现一种交通工具吧。',
      started: '你的交通收藏正在加速前进！',
    },
    title: '交通路线指挥官',
  },
  {
    emoji: '🤖',
    greeting: '欢迎来到科技博物馆，这里藏着许多会发光的发明！',
    museum: '科技博物馆',
    name: '奇奇馆长',
    personality: '聪明、认真、喜欢发明新东西',
    progressMessages: {
      completed: '科技博物馆能量满格，所有发明都被你发现啦！',
      empty: '实验室还在等待第一道灵感火花。',
      started: '你的科技雷达已经启动，继续发现新发明吧！',
    },
    title: '小小发明导航员',
  },
  {
    emoji: '🏠',
    greeting: '欢迎来到生活发现馆，普通物品也有神奇故事。',
    museum: '生活发现馆',
    name: '圆圆馆长',
    personality: '亲切、细心、喜欢观察身边的小东西',
    progressMessages: {
      completed: '生活发现馆被你整理得亮晶晶的！',
      empty: '这里等着你发现身边的第一个小秘密。',
      started: '你已经开始发现生活里的魔法啦。',
    },
    title: '生活魔法观察员',
  },
  {
    emoji: '🎭',
    greeting: '欢迎来到人物职业馆，每个人都有自己的闪光角色。',
    museum: '人物职业馆',
    name: '星星馆长',
    personality: '开朗、会鼓励人、喜欢听职业故事',
    progressMessages: {
      completed: '人物职业馆已经闪闪发光，每个角色都被你认识啦！',
      empty: '这里还没有登场人物，去认识第一位角色吧。',
      started: '你已经认识了一些有趣的人物和职业。',
    },
    title: '角色故事收藏家',
  },
  {
    emoji: '🌳',
    greeting: '欢迎来到自然博物馆，大自然正在悄悄讲故事。',
    museum: '自然博物馆',
    name: '森森馆长',
    personality: '安静、耐心、喜欢植物和天空',
    progressMessages: {
      completed: '自然博物馆完全点亮，森林、星空和海洋都在为你鼓掌！',
      empty: '自然展厅还很安静，去发现第一份自然礼物吧。',
      started: '你已经听见大自然的悄悄话了。',
    },
    title: '自然秘密守护者',
  },
  {
    emoji: '🏺',
    greeting: '欢迎来到世界文化馆，一起看看文明留下的宝物吧。',
    museum: '世界文化馆',
    name: '陶陶馆长',
    personality: '优雅、博学、喜欢讲历史和艺术',
    progressMessages: {
      completed: '世界文化馆被你完整点亮，文明故事全都打开啦！',
      empty: '这里还等着第一件文化宝物被发现。',
      started: '你已经打开了一扇通往文明故事的小门。',
    },
    title: '文明故事讲述者',
  },
  {
    emoji: '✨',
    greeting: '欢迎来到魔法图鉴馆，特别发现都会在这里闪光。',
    museum: '魔法图鉴馆',
    name: '闪闪馆长',
    personality: '神秘、活泼、喜欢收集特别发现',
    progressMessages: {
      completed: '魔法图鉴馆被你点亮成星星海啦！',
      empty: '这里正在等待一个特别的魔法发现。',
      started: '你的特别发现正在点亮魔法图鉴馆。',
    },
    title: '特别发现守门人',
  },
];
