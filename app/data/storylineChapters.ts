export type StorylineChapter = {
  description: string;
  id: string;
  storyText: string;
  title: string;
  unlockCondition: string;
};

export const storylineChapters: StorylineChapter[] = [
  {
    description: '世界记忆之书重新打开，第一片记忆正在发光。',
    id: 'chapter-1',
    storyText: '你发现的第一件藏品，让世界记忆之书找回了失落的第一页。书页轻轻发光，好像在说：继续探索吧。',
    title: 'Chapter 1 失落的第一页',
    unlockCondition: '发现 1 个藏品',
  },
  {
    description: '动物朋友们开始想起自己的名字和故事。',
    id: 'chapter-2',
    storyText: '越来越多的记忆碎片回来了。动物朋友们重新听见森林、草原和海洋的声音，它们的故事正在醒来。',
    title: 'Chapter 2 动物朋友的记忆',
    unlockCondition: '发现 10 个藏品',
  },
  {
    description: '城市里的博物馆灯光开始回应你的探索。',
    id: 'chapter-3',
    storyText: '当第一座城市被点亮，街道、车站和博物馆一起响起温柔的回声。城市记得你来过。',
    title: 'Chapter 3 城市的回声',
    unlockCondition: '完成 1 个城市',
  },
  {
    description: '国家地图被点亮，文明的收藏重新连成线索。',
    id: 'chapter-4',
    storyText: '你完成了一个国家的探索。文化、科技、自然和生活的记忆被串联起来，像一条闪亮的魔法丝带。',
    title: 'Chapter 4 文明收藏家',
    unlockCondition: '完成 1 个国家',
  },
  {
    description: '世界记忆之书恢复光芒，遗忘风暴终于散去。',
    id: 'chapter-5',
    storyText: '当全部国家被点亮，世界记忆之书重新合上又打开。每一页都写着你的发现，世界终于记起了自己。',
    title: 'Chapter 5 世界记忆复苏',
    unlockCondition: '完成全部国家',
  },
];
