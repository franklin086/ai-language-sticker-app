import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type RecognitionResult = {
  object_en: string;
  object_zh: string;
  confidence: string;
};

type CollectionItem = RecognitionResult & {
  discoveredAt: string;
  emoji: string;
};

type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';

type StickerCategory = {
  key: StickerCategoryKey;
  label: string;
  total: number;
};

type XpState = {
  currentXp: number;
  level: number;
};

type AchievementId =
  | 'first_scan'
  | 'five_items'
  | 'ten_items'
  | 'three_day_streak'
  | 'legendary_discovery'
  | 'one_official_museum'
  | 'three_official_museums'
  | 'one_custom_museum'
  | 'pilot_apprentice'
  | 'traffic_expert'
  | 'animal_friend'
  | 'twenty_items';

type AchievementDefinition = {
  encouragement?: string;
  emoji: string;
  id: AchievementId;
  title: string;
};

type MuseumExhibit = {
  emoji: string;
  id: string;
  keywords: string[];
  object_en: string;
  object_zh: string;
};

type MagicMuseum = {
  emoji: string;
  exhibits: MuseumExhibit[];
  id: string;
  title: string;
};

type CityMuseumNode = {
  emoji: string;
  id: string;
  linkedMuseumId: string;
  name: string;
};

type CityMap = {
  emoji: string;
  id: string;
  museums: CityMuseumNode[];
  name: string;
};

type MuseumBadge = {
  emoji: string;
  id: string;
  museumId: string | null;
  title: string;
};

type CustomMuseumItem = CollectionItem & {
  addedAt: string;
  id: string;
};

type CustomMuseum = {
  emoji: string;
  id: string;
  items: CustomMuseumItem[];
  name: string;
};

type MovingCustomItem = {
  itemId: string;
  museumId: string;
} | null;

type CuratorProfile = {
  avatar: string;
  name: string;
  title: string;
};

type ShareCardData = {
  encouragement: string;
  emoji: string;
  museumTitle: string;
  objectEn: string;
  objectZh: string;
  rarityLabel: string;
  title: string;
  curatorTitle: string;
};

const API_URL = 'http://localhost:8000/api/recognize';
const STREAK_STORAGE_KEY = 'ai-magic-camera-streak';
const XP_STORAGE_KEY = 'ai-magic-camera-xp';
const ACHIEVEMENTS_STORAGE_KEY = 'ai-magic-camera-achievements';
const MUSEUM_STORAGE_KEY = 'ai-magic-camera-museum';
const MUSEUM_BADGES_STORAGE_KEY = 'ai-magic-camera-museum-badges';
const CUSTOM_MUSEUMS_STORAGE_KEY = 'ai-magic-camera-custom-museums';
const CURATOR_STORAGE_KEY = 'ai-magic-camera-curator';
const CITY_MAP_STORAGE_KEY = 'ai-magic-camera-city-map';
const COLLECTION_STORAGE_KEY = 'ai-magic-camera-collection';
const ARTIFACT_STORY_STORAGE_KEY = 'ai-magic-camera-artifact-stories';
const STICKER_TOTAL = 120;
const XP_PER_LEVEL = 100;

const XP_REWARDS: Record<StickerCategoryKey, number> = {
  common: 10,
  rare: 20,
  epic: 35,
  legendary: 50,
};

const STICKER_CATEGORIES: StickerCategory[] = [
  { key: 'common', label: '普通 Common', total: 50 },
  { key: 'rare', label: '稀有 Rare', total: 30 },
  { key: 'epic', label: '史诗 Epic', total: 20 },
  { key: 'legendary', label: '传奇 Legendary', total: 20 },
];

const COPY = {
  badge: '✨ Magic Word Camera',
  title: 'AI 魔法识字相机',
  subtitle: '拍一下，AI马上告诉你它叫什么 ✨',
  placeholderTitle: '给我看看这是什么 👀',
  placeholderText: 'AI会猜出它的名字！',
  loading: '✨ AI正在施展魔法...',
  loadingHint: '🪄 正在猜它叫什么...',
  ready: '放一张图片进魔法窗，马上变出学习贴纸卡。',
  found: '✨ AI发现了！',
  celebrate: '🎉 太棒啦！',
  error: '我没有看清楚',
  errorTitle: '🤔 我没有看清楚',
  errorHint: '再给我看看吧 ✨',
  errorEncourage: '🪄 换一张清楚的照片试试',
  collectionTitle: '✨ 我的魔法图鉴',
  collectionCount: '已发现',
  collectionWords: '个魔法词语',
  collectionNew: '🎉 新发现已加入魔法图鉴！',
  collectionKnown: '✨ 你已经认识它啦！',
  unlockNew: '🎉 NEW!',
  unlockSticker: '✨ 新魔法贴纸解锁！',
  streakTitle: '🔥 连续探索',
  streakDays: '天',
  chestTitle: '🎁 魔法宝箱',
  chestNeedOne: '再发现 1 个新物体即可开启！',
  chestOpened: '✨ 宝箱开启！',
  chestReward: '🎉 获得神秘奖励！',
  levelUp: '✨ LEVEL UP!',
  confidence: 'Confidence',
  camera: '📷 拍照识别',
  album: '🖼️ 从相册选择',
};

const CHEST_REWARDS = [
  '🌟 星星徽章',
  '👑 新称号',
  '🪄 魔法能量',
  '✨ 幸运水晶',
  '🦉 小猫头鹰祝福',
];

const ACHIEVEMENTS: AchievementDefinition[] = [
  { emoji: '🌟', id: 'first_scan', title: '初次探索者' },
  { emoji: '🔎', id: 'five_items', title: '小小发现家' },
  { emoji: '🪄', id: 'ten_items', title: '魔法探索家' },
  { emoji: '🔥', id: 'three_day_streak', title: '探险达人' },
  { emoji: '✈️', id: 'pilot_apprentice', title: '飞行员学徒' },
  { emoji: '🚗', id: 'traffic_expert', title: '交通专家' },
  { emoji: '🐾', id: 'animal_friend', title: '动物朋友' },
  { emoji: '🏅', id: 'twenty_items', title: '魔法收藏家' },
];

const ACTIVE_ACHIEVEMENTS: AchievementDefinition[] = [
  { emoji: '🏅', encouragement: '第一道魔法亮起来了，继续探索吧！', id: 'first_scan', title: '初次探索者' },
  { emoji: '🔍', encouragement: '你已经会发现身边的小秘密了！', id: 'five_items', title: '小小发现家' },
  { emoji: '🏛', encouragement: '你的魔法收藏馆越来越像样了！', id: 'ten_items', title: '魔法收藏家' },
  { emoji: '🔥', encouragement: '连续回来探索，是很厉害的魔法习惯！', id: 'three_day_streak', title: '连续探索者' },
  { emoji: '🌈', encouragement: '哇，这是特别珍贵的传奇发现！', id: 'legendary_discovery', title: '传奇发现者' },
  { emoji: '🎉', encouragement: '你完成了第一座官方博物馆！', id: 'one_official_museum', title: '博物馆新人' },
  { emoji: '👑', encouragement: '三座博物馆完成，你已经很像真正的馆长了！', id: 'three_official_museums', title: '博物馆达人' },
  { emoji: '✨', encouragement: '你开始创建自己的魔法博物馆了！', id: 'one_custom_museum', title: '小小馆长' },
];

const MAGIC_MUSEUMS: MagicMuseum[] = [
  {
    emoji: '🏠',
    id: 'life',
    title: '生活发现馆',
    exhibits: [
      { emoji: '🥤', id: 'life-cup', keywords: ['cup', 'mug', '杯', '杯子'], object_en: 'cup', object_zh: '杯子' },
      { emoji: '🪑', id: 'life-chair', keywords: ['chair', 'seat', '椅', '椅子'], object_en: 'chair', object_zh: '椅子' },
      { emoji: '📖', id: 'life-book', keywords: ['book', '书'], object_en: 'book', object_zh: '书' },
      { emoji: '👟', id: 'life-shoe', keywords: ['shoe', 'shoes', '鞋'], object_en: 'shoe', object_zh: '鞋子' },
      { emoji: '🧸', id: 'life-toy', keywords: ['toy', '玩具'], object_en: 'toy', object_zh: '玩具' },
      { emoji: '🛏️', id: 'life-bed', keywords: ['bed', '床'], object_en: 'bed', object_zh: '床' },
      { emoji: '👜', id: 'life-bag', keywords: ['bag', 'backpack', '包', '书包'], object_en: 'bag', object_zh: '包' },
      { emoji: '⏰', id: 'life-clock', keywords: ['clock', 'watch', '钟', '表'], object_en: 'clock', object_zh: '钟表' },
      { emoji: '💡', id: 'life-lamp', keywords: ['lamp', 'light', '灯'], object_en: 'lamp', object_zh: '灯' },
      { emoji: '🔑', id: 'life-key', keywords: ['key', '钥匙'], object_en: 'key', object_zh: '钥匙' },
    ],
  },
  {
    emoji: '🚗',
    id: 'traffic',
    title: '交通博物馆',
    exhibits: [
      { emoji: '🚗', id: 'traffic-car', keywords: ['car', 'vehicle', '汽车', '小汽车'], object_en: 'car', object_zh: '汽车' },
      { emoji: '🚌', id: 'traffic-bus', keywords: ['bus', '公交', '公交车'], object_en: 'bus', object_zh: '公交车' },
      { emoji: '🚆', id: 'traffic-train', keywords: ['train', '火车'], object_en: 'train', object_zh: '火车' },
      { emoji: '✈️', id: 'traffic-airplane', keywords: ['airplane', 'plane', 'jet', '飞机', '战斗机'], object_en: 'airplane', object_zh: '飞机' },
      { emoji: '🚁', id: 'traffic-helicopter', keywords: ['helicopter', '直升机'], object_en: 'helicopter', object_zh: '直升机' },
      { emoji: '🚢', id: 'traffic-ship', keywords: ['ship', 'boat', '轮船', '船'], object_en: 'ship', object_zh: '轮船' },
      { emoji: '🚲', id: 'traffic-bicycle', keywords: ['bicycle', 'bike', '自行车'], object_en: 'bicycle', object_zh: '自行车' },
      { emoji: '🏍️', id: 'traffic-motorcycle', keywords: ['motorcycle', 'motorbike', '摩托车'], object_en: 'motorcycle', object_zh: '摩托车' },
      { emoji: '🚕', id: 'traffic-taxi', keywords: ['taxi', '出租车'], object_en: 'taxi', object_zh: '出租车' },
      { emoji: '🚚', id: 'traffic-truck', keywords: ['truck', '货车', '卡车'], object_en: 'truck', object_zh: '货车' },
    ],
  },
  {
    emoji: '🦁',
    id: 'animal',
    title: '动物博物馆',
    exhibits: [
      { emoji: '🐱', id: 'animal-cat', keywords: ['cat', '猫'], object_en: 'cat', object_zh: '猫' },
      { emoji: '🐶', id: 'animal-dog', keywords: ['dog', 'puppy', '狗', '小狗'], object_en: 'dog', object_zh: '狗' },
      { emoji: '🐦', id: 'animal-bird', keywords: ['bird', '鸟'], object_en: 'bird', object_zh: '鸟' },
      { emoji: '🐠', id: 'animal-fish', keywords: ['fish', '鱼'], object_en: 'fish', object_zh: '鱼' },
      { emoji: '🐰', id: 'animal-rabbit', keywords: ['rabbit', 'bunny', '兔', '兔子'], object_en: 'rabbit', object_zh: '兔子' },
      { emoji: '🐼', id: 'animal-panda', keywords: ['panda', '熊猫'], object_en: 'panda', object_zh: '熊猫' },
      { emoji: '🦁', id: 'animal-lion', keywords: ['lion', '狮子'], object_en: 'lion', object_zh: '狮子' },
      { emoji: '🐘', id: 'animal-elephant', keywords: ['elephant', '大象'], object_en: 'elephant', object_zh: '大象' },
      { emoji: '🦋', id: 'animal-butterfly', keywords: ['butterfly', '蝴蝶'], object_en: 'butterfly', object_zh: '蝴蝶' },
      { emoji: '🐢', id: 'animal-turtle', keywords: ['turtle', '乌龟'], object_en: 'turtle', object_zh: '乌龟' },
    ],
  },
  {
    emoji: '🌳',
    id: 'nature',
    title: '自然博物馆',
    exhibits: [
      { emoji: '🌳', id: 'nature-tree', keywords: ['tree', '树'], object_en: 'tree', object_zh: '树' },
      { emoji: '🌸', id: 'nature-flower', keywords: ['flower', '花'], object_en: 'flower', object_zh: '花' },
      { emoji: '🍃', id: 'nature-leaf', keywords: ['leaf', 'leaves', '叶', '叶子'], object_en: 'leaf', object_zh: '叶子' },
      { emoji: '🌿', id: 'nature-grass', keywords: ['grass', '草'], object_en: 'grass', object_zh: '草' },
      { emoji: '🪨', id: 'nature-rock', keywords: ['rock', 'stone', '石头'], object_en: 'rock', object_zh: '石头' },
      { emoji: '🌊', id: 'nature-water', keywords: ['water', 'river', 'lake', '水', '河', '湖'], object_en: 'water', object_zh: '水' },
      { emoji: '☁️', id: 'nature-cloud', keywords: ['cloud', '云'], object_en: 'cloud', object_zh: '云' },
      { emoji: '☀️', id: 'nature-sun', keywords: ['sun', '太阳'], object_en: 'sun', object_zh: '太阳' },
      { emoji: '🌙', id: 'nature-moon', keywords: ['moon', '月亮'], object_en: 'moon', object_zh: '月亮' },
      { emoji: '⭐', id: 'nature-star', keywords: ['star', '星星'], object_en: 'star', object_zh: '星星' },
    ],
  },
  {
    emoji: '🚀',
    id: 'technology',
    title: '科技博物馆',
    exhibits: [
      { emoji: '📱', id: 'tech-phone', keywords: ['phone', 'mobile', '手机'], object_en: 'phone', object_zh: '手机' },
      { emoji: '💻', id: 'tech-computer', keywords: ['computer', 'laptop', '电脑'], object_en: 'computer', object_zh: '电脑' },
      { emoji: '📷', id: 'tech-camera', keywords: ['camera', '相机'], object_en: 'camera', object_zh: '相机' },
      { emoji: '🤖', id: 'tech-robot', keywords: ['robot', '机器人'], object_en: 'robot', object_zh: '机器人' },
      { emoji: '🚀', id: 'tech-rocket', keywords: ['rocket', '火箭'], object_en: 'rocket', object_zh: '火箭' },
      { emoji: '🎧', id: 'tech-headphones', keywords: ['headphones', 'earphones', '耳机'], object_en: 'headphones', object_zh: '耳机' },
      { emoji: '⌨️', id: 'tech-keyboard', keywords: ['keyboard', '键盘'], object_en: 'keyboard', object_zh: '键盘' },
      { emoji: '🖱️', id: 'tech-mouse', keywords: ['mouse', '鼠标'], object_en: 'mouse', object_zh: '鼠标' },
      { emoji: '📺', id: 'tech-tv', keywords: ['tv', 'television', '电视'], object_en: 'television', object_zh: '电视' },
      { emoji: '🎮', id: 'tech-gamepad', keywords: ['gamepad', 'controller', '游戏机', '手柄'], object_en: 'game controller', object_zh: '游戏手柄' },
    ],
  },
  {
    emoji: '🏺',
    id: 'culture',
    title: '世界文化馆',
    exhibits: [
      { emoji: '🏺', id: 'culture-vase', keywords: ['vase', 'pottery', '花瓶', '陶器'], object_en: 'vase', object_zh: '花瓶' },
      { emoji: '🖼️', id: 'culture-painting', keywords: ['painting', 'picture', '画', '绘画'], object_en: 'painting', object_zh: '绘画' },
      { emoji: '🎭', id: 'culture-mask', keywords: ['mask', '面具'], object_en: 'mask', object_zh: '面具' },
      { emoji: '📜', id: 'culture-scroll', keywords: ['scroll', 'paper', '卷轴', '纸'], object_en: 'scroll', object_zh: '卷轴' },
      { emoji: '🪘', id: 'culture-drum', keywords: ['drum', '鼓'], object_en: 'drum', object_zh: '鼓' },
      { emoji: '🎻', id: 'culture-violin', keywords: ['violin', '小提琴'], object_en: 'violin', object_zh: '小提琴' },
      { emoji: '🏯', id: 'culture-temple', keywords: ['temple', 'pagoda', '寺庙', '宝塔'], object_en: 'temple', object_zh: '寺庙' },
      { emoji: '🗿', id: 'culture-statue', keywords: ['statue', 'sculpture', '雕像', '雕塑'], object_en: 'statue', object_zh: '雕像' },
      { emoji: '🧭', id: 'culture-compass', keywords: ['compass', '指南针'], object_en: 'compass', object_zh: '指南针' },
      { emoji: '🪙', id: 'culture-coin', keywords: ['coin', 'money', '硬币', '钱币'], object_en: 'coin', object_zh: '硬币' },
    ],
  },
];

const MUSEUM_BADGES: MuseumBadge[] = [
  { emoji: '🔍', id: 'badge-life', museumId: 'life', title: '小小观察家' },
  { emoji: '✈️', id: 'badge-traffic', museumId: 'traffic', title: '飞行探索家' },
  { emoji: '🦁', id: 'badge-animal', museumId: 'animal', title: '动物守护者' },
  { emoji: '🌿', id: 'badge-nature', museumId: 'nature', title: '自然观察家' },
  { emoji: '🚀', id: 'badge-technology', museumId: 'technology', title: '科技探险家' },
  { emoji: '🏺', id: 'badge-culture', museumId: 'culture', title: '文明探索者' },
  { emoji: '👑', id: 'badge-master', museumId: null, title: '博物馆大师' },
];

const ARTIFACT_FACTS: { fact: string; keywords: string[] }[] = [
  { fact: '熊猫每天可以吃20公斤竹子。', keywords: ['panda', '熊猫', '鐔婄尗'] },
  { fact: '狮子的吼声最远可传8公里。', keywords: ['lion', '狮子', '鐙瓙'] },
  { fact: '第一架飞机在1903年成功飞行。', keywords: ['airplane', 'plane', 'jet', 'fighter', '飞机', '战斗机', '椋炴満', '鎴樻枟鏈?'] },
  { fact: '现代汽车拥有上万个零件。', keywords: ['car', 'vehicle', '汽车', '姹借溅'] },
  { fact: '火箭需要强大的推力才能飞向太空。', keywords: ['rocket', '火箭', '鐏'] },
  { fact: '机器人可以帮助人类完成危险或重复的工作。', keywords: ['robot', '机器人', '鏈哄櫒浜?'] },
  { fact: '火车可以一次带很多人去很远的地方。', keywords: ['train', '火车', '鐏溅'] },
  { fact: '轮船能在海上运输巨大的货物。', keywords: ['ship', 'boat', '轮船', '鑸?', '杞埞'] },
  { fact: '苹果里含有丰富的膳食纤维。', keywords: ['apple', '苹果', '鑻规灉'] },
  { fact: '书本像一扇小门，可以带你进入新世界。', keywords: ['book', '书', '涔?'] },
];

const CITY_MAPS: CityMap[] = [
  {
    emoji: '🌆',
    id: 'shanghai',
    name: '上海',
    museums: [
      { emoji: '🦕', id: 'shanghai-natural-history', linkedMuseumId: 'nature', name: '上海自然博物馆' },
      { emoji: '🚀', id: 'shanghai-science-tech', linkedMuseumId: 'technology', name: '上海科技馆' },
      { emoji: '🏛️', id: 'shanghai-history', linkedMuseumId: 'culture', name: '上海历史博物馆' },
    ],
  },
  {
    emoji: '🏯',
    id: 'beijing',
    name: '北京',
    museums: [
      { emoji: '👑', id: 'beijing-palace', linkedMuseumId: 'culture', name: '故宫博物院' },
      { emoji: '🏺', id: 'beijing-national', linkedMuseumId: 'culture', name: '中国国家博物馆' },
      { emoji: '🧪', id: 'beijing-science-tech', linkedMuseumId: 'technology', name: '中国科技馆' },
    ],
  },
  {
    emoji: '🌸',
    id: 'guangzhou',
    name: '广州',
    museums: [
      { emoji: '🏛️', id: 'guangzhou-guangdong-museum', linkedMuseumId: 'culture', name: '广东省博物馆' },
      { emoji: '🔬', id: 'guangzhou-science-center', linkedMuseumId: 'technology', name: '广东科学中心' },
      { emoji: '🦁', id: 'guangzhou-zoo', linkedMuseumId: 'animal', name: '广州动物园' },
    ],
  },
  {
    emoji: '🌊',
    id: 'shenzhen',
    name: '深圳',
    museums: [
      { emoji: '🏙️', id: 'shenzhen-museum', linkedMuseumId: 'culture', name: '深圳博物馆' },
      { emoji: '🧠', id: 'shenzhen-science', linkedMuseumId: 'technology', name: '深圳科学馆' },
      { emoji: '🌿', id: 'shenzhen-fairy-lake', linkedMuseumId: 'nature', name: '仙湖植物园' },
    ],
  },
  {
    emoji: '🗼',
    id: 'tokyo',
    name: '东京',
    museums: [
      { emoji: '🏺', id: 'tokyo-national', linkedMuseumId: 'culture', name: '东京国立博物馆' },
      { emoji: '🦖', id: 'tokyo-nature-science', linkedMuseumId: 'nature', name: '国立科学博物馆' },
      { emoji: '🤖', id: 'tokyo-miraikan', linkedMuseumId: 'technology', name: '日本科学未来馆' },
    ],
  },
  {
    emoji: '🗽',
    id: 'new-york',
    name: '纽约',
    museums: [
      { emoji: '🦕', id: 'new-york-natural-history', linkedMuseumId: 'nature', name: '美国自然历史博物馆' },
      { emoji: '🖼️', id: 'new-york-met', linkedMuseumId: 'culture', name: '大都会艺术博物馆' },
      { emoji: '✈️', id: 'new-york-intrepid', linkedMuseumId: 'traffic', name: '无畏号海空航天博物馆' },
    ],
  },
];

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getYesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getDateKey(date);
}

function readStoredStreak() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STREAK_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as { days?: number; lastDate?: string };
    if (typeof parsed.days !== 'number' || typeof parsed.lastDate !== 'string') {
      return null;
    }

    return { days: parsed.days, lastDate: parsed.lastDate };
  } catch {
    return null;
  }
}

function saveStoredStreak(streak: { days: number; lastDate: string }) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(streak));
  } catch {
    // Streak is a reward cue. Recognition should continue even if storage is blocked.
  }
}

function readStoredXp(): XpState | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(XP_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as { currentXp?: number; level?: number };
    if (typeof parsed.currentXp !== 'number' || typeof parsed.level !== 'number') {
      return null;
    }

    return {
      currentXp: Math.max(0, Math.min(XP_PER_LEVEL - 1, parsed.currentXp)),
      level: Math.max(1, parsed.level),
    };
  } catch {
    return null;
  }
}

function saveStoredXp(xpState: XpState) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(XP_STORAGE_KEY, JSON.stringify(xpState));
  } catch {
    // XP is local encouragement. Recognition should continue even if storage is blocked.
  }
}

function readStoredAchievements(): AchievementId[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validIds = new Set(ACTIVE_ACHIEVEMENTS.map((achievement) => achievement.id));
    const legacyIds = getLegacyAchievementIds();
    return parsed.filter(
      (id): id is AchievementId => validIds.has(id as AchievementId) || legacyIds.has(id as AchievementId),
    );
  } catch {
    return [];
  }
}

function saveStoredAchievements(achievementIds: AchievementId[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievementIds));
  } catch {
    // Achievements are local encouragement. Recognition should continue if storage is blocked.
  }
}

function getLegacyAchievementIds() {
  return new Set([...ACHIEVEMENTS.map((achievement) => achievement.id), ...getUnlockedAchievementIds([], 0)]);
}

function getAllMuseumExhibits() {
  return MAGIC_MUSEUMS.flatMap((museum) => museum.exhibits);
}

function readStoredMuseumIds(): string[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(MUSEUM_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validIds = new Set(getAllMuseumExhibits().map((exhibit) => exhibit.id));
    return parsed.filter((id) => validIds.has(id));
  } catch {
    return [];
  }
}

function saveStoredMuseumIds(exhibitIds: string[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(MUSEUM_STORAGE_KEY, JSON.stringify(exhibitIds));
  } catch {
    // Museum progress is local encouragement. Recognition should continue if storage is blocked.
  }
}

function readStoredMuseumBadgeIds(): string[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(MUSEUM_BADGES_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validIds = new Set(MUSEUM_BADGES.map((badge) => badge.id));
    return parsed.filter((id) => validIds.has(id));
  } catch {
    return [];
  }
}

function saveStoredMuseumBadgeIds(badgeIds: string[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(MUSEUM_BADGES_STORAGE_KEY, JSON.stringify(badgeIds));
  } catch {
    // Badge progress is local encouragement. Recognition should continue if storage is blocked.
  }
}

function getAllCityMapNodeIds() {
  return CITY_MAPS.flatMap((city) => city.museums.map((museum) => museum.id));
}

function readStoredCityMapNodeIds(): string[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(CITY_MAP_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validIds = new Set(getAllCityMapNodeIds());
    return parsed.filter((id) => validIds.has(id));
  } catch {
    return [];
  }
}

function saveStoredCityMapNodeIds(nodeIds: string[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CITY_MAP_STORAGE_KEY, JSON.stringify(nodeIds));
  } catch {
    // City map progress is local encouragement. Recognition should continue if storage is blocked.
  }
}

function readStoredCollection(): CollectionItem[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as CollectionItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.object_en === 'string' &&
          typeof item.object_zh === 'string' &&
          typeof item.confidence === 'string' &&
          typeof item.discoveredAt === 'string',
      )
      .map((item) => ({
        ...item,
        emoji: typeof item.emoji === 'string' && item.emoji.trim() ? item.emoji : getMagicEmoji(item),
      }));
  } catch {
    return [];
  }
}

function saveStoredCollection(collection: CollectionItem[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(collection));
  } catch {
    // Collection cards are local play data. Recognition should continue if storage is blocked.
  }
}

function readStoredExpandedArtifactIds(): string[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(ARTIFACT_STORY_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as string[];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function saveStoredExpandedArtifactIds(artifactIds: string[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(ARTIFACT_STORY_STORAGE_KEY, JSON.stringify(artifactIds));
  } catch {
    // Expanded story cards are a UI preference. The app should keep working if storage is blocked.
  }
}

function readStoredCustomMuseums(): CustomMuseum[] {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(CUSTOM_MUSEUMS_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as CustomMuseum[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((museum) => museum && typeof museum.id === 'string' && typeof museum.name === 'string')
      .map((museum) => ({
        emoji: typeof museum.emoji === 'string' && museum.emoji.trim() ? museum.emoji : '🏛',
        id: museum.id,
        items: Array.isArray(museum.items) ? museum.items : [],
        name: museum.name,
      }));
  } catch {
    return [];
  }
}

function saveStoredCustomMuseums(customMuseums: CustomMuseum[]) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CUSTOM_MUSEUMS_STORAGE_KEY, JSON.stringify(customMuseums));
  } catch {
    // Custom museums are local play data. Recognition should continue if storage is blocked.
  }
}

function getCuratorTitle(level: number) {
  if (level >= 20) {
    return '👑 传奇馆长';
  }

  if (level >= 10) {
    return '🏛 博物馆大师';
  }

  if (level >= 5) {
    return '🔍 探索馆长';
  }

  return '✨ 见习馆长';
}

function readStoredCurator(): CuratorProfile | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(CURATOR_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as { avatar?: string; name?: string; title?: string };
    if (typeof parsed.avatar !== 'string' || typeof parsed.name !== 'string') {
      return null;
    }

    return {
      avatar: parsed.avatar.trim() || '🧙',
      name: parsed.name.trim() || '小小馆长',
      title: typeof parsed.title === 'string' ? parsed.title : getCuratorTitle(1),
    };
  } catch {
    return null;
  }
}

function saveStoredCurator(profile: CuratorProfile, xpState: XpState) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      CURATOR_STORAGE_KEY,
      JSON.stringify({
        avatar: profile.avatar,
        currentXp: xpState.currentXp,
        level: xpState.level,
        name: profile.name,
        title: getCuratorTitle(xpState.level),
      }),
    );
  } catch {
    // Curator profile is local play data. Recognition should continue if storage is blocked.
  }
}

function formatConfidence(confidence: string) {
  const value = confidence.toLowerCase().trim();

  if (value === 'high') {
    return 'High';
  }

  if (value === 'medium') {
    return 'Medium';
  }

  if (value === 'low') {
    return 'Low';
  }

  return confidence;
}

function getMagicEmoji(result: RecognitionResult) {
  const text = `${result.object_en} ${result.object_zh}`.toLowerCase();
  const matchers: [string[], string][] = [
    [['apple', '苹果'], '🍎'],
    [['banana', '香蕉'], '🍌'],
    [['orange', '橙', '橘'], '🍊'],
    [['cat', '猫'], '🐱'],
    [['dog', '狗', '小狗'], '🐶'],
    [['bird', '鸟'], '🐦'],
    [['fish', '鱼'], '🐠'],
    [['airplane', 'plane', 'jet', 'fighter', '飞机', '战斗机'], '✈️'],
    [['car', 'vehicle', '汽车', '车'], '🚗'],
    [['bus', '公交'], '🚌'],
    [['train', '火车'], '🚆'],
    [['ship', 'boat', '船'], '⛵'],
    [['ball', '球'], '⚽'],
    [['book', '书'], '📖'],
    [['flower', '花'], '🌸'],
    [['tree', '树'], '🌳'],
    [['cup', '杯'], '🥤'],
    [['phone', '手机'], '📱'],
    [['computer', '电脑'], '💻'],
    [['shoe', '鞋'], '👟'],
    [['chair', '椅'], '🪑'],
    [['toy', '玩具'], '🧸'],
  ];

  const found = matchers.find(([keywords]) => keywords.some((keyword) => text.includes(keyword)));
  return found ? found[1] : '✨';
}

function getStickerCategory(item: RecognitionResult): StickerCategoryKey {
  const text = `${item.object_en} ${item.object_zh}`.toLowerCase();
  const legendaryKeywords = ['panda', 'rocket', 'castle', 'dinosaur', 'dragon', 'unicorn', '熊猫', '火箭', '城堡', '恐龙', '龙'];
  const epicKeywords = ['fighter', 'airplane', 'plane', 'jet', 'robot', 'train', 'ship', '战斗机', '飞机', '机器人', '火车', '轮船'];
  const rareKeywords = ['car', 'vehicle', 'computer', 'phone', 'camera', '汽车', '手机', '电脑', '相机'];

  if (legendaryKeywords.some((keyword) => text.includes(keyword))) {
    return 'legendary';
  }

  if (epicKeywords.some((keyword) => text.includes(keyword))) {
    return 'epic';
  }

  if (rareKeywords.some((keyword) => text.includes(keyword))) {
    return 'rare';
  }

  return 'common';
}

function getCategoryItems(collection: CollectionItem[], categoryKey: StickerCategoryKey) {
  return collection.filter((item) => getStickerCategory(item) === categoryKey);
}

function getArtifactStoryId(item: CollectionItem) {
  return `${item.object_en.trim().toLowerCase()}-${item.discoveredAt}`;
}

function getStickerCategoryLabel(categoryKey: StickerCategoryKey) {
  if (categoryKey === 'legendary') {
    return '🌈 传奇';
  }

  if (categoryKey === 'epic') {
    return '🟣 史诗';
  }

  if (categoryKey === 'rare') {
    return '🔵 稀有';
  }

  return '⚪ 普通';
}

function formatDiscoveredAt(discoveredAt: string) {
  const date = new Date(discoveredAt);
  if (Number.isNaN(date.getTime())) {
    return '刚刚发现';
  }

  return date.toLocaleString('zh-CN', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
  });
}

function getArtifactFact(item: RecognitionResult) {
  const text = `${item.object_en} ${item.object_zh}`.toLowerCase();
  const matchedFact = ARTIFACT_FACTS.find((fact) =>
    fact.keywords.some((keyword) => text.includes(keyword.toLowerCase())),
  );

  return matchedFact?.fact ?? '每一次发现，都会让你的魔法图鉴变得更丰富。';
}

function getArtifactMuseumAndCity(item: RecognitionResult, cityMaps: CityMap[]) {
  const matchedExhibitId = getMatchedMuseumExhibitIds(item)[0];
  const matchedMuseum = MAGIC_MUSEUMS.find((museum) =>
    museum.exhibits.some((exhibit) => exhibit.id === matchedExhibitId),
  );
  const matchedCity = matchedMuseum
    ? cityMaps.find((city) => city.museums.some((museum) => museum.linkedMuseumId === matchedMuseum.id))
    : null;

  return {
    cityName: matchedCity?.name ?? '魔法城市',
    museumTitle: matchedMuseum?.title ?? '魔法图鉴馆',
  };
}

function buildShareCardData({
  curatorTitle,
  encouragement,
  result,
  title,
}: {
  curatorTitle: string;
  encouragement: string;
  result: RecognitionResult;
  title: string;
}): ShareCardData {
  const location = getArtifactMuseumAndCity(result, CITY_MAPS);
  return {
    curatorTitle,
    encouragement,
    emoji: getMagicEmoji(result),
    museumTitle: location.museumTitle,
    objectEn: result.object_en || 'magic discovery',
    objectZh: result.object_zh || '魔法发现',
    rarityLabel: getStickerCategoryLabel(getStickerCategory(result)),
    title,
  };
}

function collectionHasKeyword(collection: CollectionItem[], keywords: string[]) {
  return collection.some((item) => {
    const text = `${item.object_en} ${item.object_zh}`.toLowerCase();
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
  });
}

function getUnlockedAchievementIds(collection: CollectionItem[], streakDays: number): AchievementId[] {
  const unlockedIds: AchievementId[] = ['first_scan'];

  if (collection.length >= 5) {
    unlockedIds.push('five_items');
  }

  if (collection.length >= 10) {
    unlockedIds.push('ten_items');
  }

  if (streakDays >= 3) {
    unlockedIds.push('three_day_streak');
  }

  if (collectionHasKeyword(collection, ['airplane', 'plane', 'jet', 'fighter', '飞机', '战斗机'])) {
    unlockedIds.push('pilot_apprentice');
  }

  if (collectionHasKeyword(collection, ['car', 'vehicle', '汽车', '车'])) {
    unlockedIds.push('traffic_expert');
  }

  if (collectionHasKeyword(collection, ['animal', 'dog', 'cat', 'bird', 'fish', 'panda', 'rabbit', '动物', '狗', '猫', '鸟', '鱼', '熊猫', '兔'])) {
    unlockedIds.push('animal_friend');
  }

  if (collection.length >= 20) {
    unlockedIds.push('twenty_items');
  }

  return unlockedIds;
}

function getCompletedOfficialMuseumCount(collectedIds: string[]) {
  return MAGIC_MUSEUMS.filter((museum) => getMuseumCollectedCount(museum, collectedIds) === museum.exhibits.length)
    .length;
}

function getActiveUnlockedAchievementIds({
  collection,
  customMuseumCount,
  museumCollectedIds,
  streakDays,
}: {
  collection: CollectionItem[];
  customMuseumCount: number;
  museumCollectedIds: string[];
  streakDays: number;
}): AchievementId[] {
  const unlockedIds: AchievementId[] = [];

  if (collection.length >= 1) {
    unlockedIds.push('first_scan');
  }

  if (collection.length >= 5) {
    unlockedIds.push('five_items');
  }

  if (collection.length >= 10) {
    unlockedIds.push('ten_items');
  }

  if (streakDays >= 3) {
    unlockedIds.push('three_day_streak');
  }

  if (collection.some((item) => getStickerCategory(item) === 'legendary')) {
    unlockedIds.push('legendary_discovery');
  }

  const completedMuseumCount = getCompletedOfficialMuseumCount(museumCollectedIds);
  if (completedMuseumCount >= 1) {
    unlockedIds.push('one_official_museum');
  }

  if (completedMuseumCount >= 3) {
    unlockedIds.push('three_official_museums');
  }

  if (customMuseumCount >= 1) {
    unlockedIds.push('one_custom_museum');
  }

  return unlockedIds;
}

function getAchievement(id: AchievementId) {
  return ACTIVE_ACHIEVEMENTS.find((achievement) => achievement.id === id) ?? ACTIVE_ACHIEVEMENTS[0];
}

function getMatchedMuseumExhibitIds(result: RecognitionResult) {
  const text = `${result.object_en} ${result.object_zh}`.toLowerCase();

  return getAllMuseumExhibits()
    .filter((exhibit) => exhibit.keywords.some((keyword) => text.includes(keyword.toLowerCase())))
    .map((exhibit) => exhibit.id);
}

function getMuseumCollectedCount(museum: MagicMuseum, collectedIds: string[]) {
  return museum.exhibits.filter((exhibit) => collectedIds.includes(exhibit.id)).length;
}

function isOfficialMuseumComplete(museumId: string, collectedIds: string[]) {
  const museum = MAGIC_MUSEUMS.find((item) => item.id === museumId);
  return Boolean(museum && getMuseumCollectedCount(museum, collectedIds) === museum.exhibits.length);
}

function getCompletedCityMapNodeIds(collectedIds: string[]) {
  return CITY_MAPS.flatMap((city) =>
    city.museums
      .filter((museum) => isOfficialMuseumComplete(museum.linkedMuseumId, collectedIds))
      .map((museum) => museum.id),
  );
}

function getUnlockedMuseumBadgeIds(collectedIds: string[]) {
  const completedMuseumIds = MAGIC_MUSEUMS
    .filter((museum) => getMuseumCollectedCount(museum, collectedIds) === museum.exhibits.length)
    .map((museum) => museum.id);
  const badgeIds = MUSEUM_BADGES
    .filter((badge) => badge.museumId !== null && completedMuseumIds.includes(badge.museumId))
    .map((badge) => badge.id);

  if (completedMuseumIds.length === MAGIC_MUSEUMS.length) {
    badgeIds.push('badge-master');
  }

  return badgeIds;
}

function getMuseumBadge(id: string) {
  return MUSEUM_BADGES.find((badge) => badge.id === id) ?? MUSEUM_BADGES[0];
}

function buildCustomMuseumItem(result: RecognitionResult): CustomMuseumItem {
  const normalizedName = result.object_en.trim().toLowerCase() || result.object_zh.trim();
  return {
    ...result,
    addedAt: new Date().toISOString(),
    discoveredAt: new Date().toISOString(),
    emoji: getMagicEmoji(result),
    id: normalizedName,
  };
}

function CuratorProfileCard({
  badgeCount,
  completedMuseumCount,
  glowScale,
  itemCount,
  levelUpOpacity,
  levelUpScale,
  onChangeProfile,
  profile,
  showLevelUp,
  streakDays,
  xpState,
}: {
  badgeCount: number;
  completedMuseumCount: number;
  glowScale: Animated.AnimatedInterpolation<string | number>;
  itemCount: number;
  levelUpOpacity: Animated.AnimatedInterpolation<string | number>;
  levelUpScale: Animated.AnimatedInterpolation<string | number>;
  onChangeProfile: (nextProfile: CuratorProfile) => void;
  profile: CuratorProfile;
  showLevelUp: boolean;
  streakDays: number;
  xpState: XpState;
}) {
  const [draftAvatar, setDraftAvatar] = useState(profile.avatar);
  const [draftName, setDraftName] = useState(profile.name);
  const [isEditing, setIsEditing] = useState(false);
  const xpProgressPercent = `${Math.min(100, (xpState.currentXp / XP_PER_LEVEL) * 100)}%` as `${number}%`;
  const title = getCuratorTitle(xpState.level);

  useEffect(() => {
    setDraftAvatar(profile.avatar);
    setDraftName(profile.name);
  }, [profile.avatar, profile.name]);

  const saveProfile = () => {
    onChangeProfile({
      avatar: draftAvatar,
      name: draftName,
      title,
    });
    setIsEditing(false);
  };

  return (
    <View style={styles.curatorCard}>
      {showLevelUp ? (
        <Animated.View
          style={[
            styles.curatorLevelToast,
            {
              opacity: levelUpOpacity,
              transform: [{ scale: levelUpScale }],
            },
          ]}
        >
          <Animated.View pointerEvents="none" style={[styles.curatorLevelGlow, { transform: [{ scale: glowScale }] }]} />
          <View pointerEvents="none" style={styles.curatorConfettiLayer}>
            <Text style={[styles.curatorConfetti, styles.curatorConfettiOne]}>🎊</Text>
            <Text style={[styles.curatorConfetti, styles.curatorConfettiTwo]}>✨</Text>
            <Text style={[styles.curatorConfetti, styles.curatorConfettiThree]}>🎉</Text>
          </View>
          <Text style={styles.curatorLevelTitle}>🎉 LEVEL UP!</Text>
          <Text style={styles.curatorLevelLabel}>恭喜成为：</Text>
          <Text style={styles.curatorLevelName}>{title}</Text>
        </Animated.View>
      ) : null}

      <View style={styles.curatorHeader}>
        <Text style={styles.curatorAvatar}>{profile.avatar}</Text>
        <View style={styles.curatorHeaderText}>
          <Text style={styles.curatorCardTitle}>👑 馆长档案卡</Text>
          <Text style={styles.curatorName}>{profile.name}</Text>
          <Text style={styles.curatorTitle}>{title}</Text>
        </View>
        <Pressable style={styles.iconTextButton} onPress={() => setIsEditing((currentValue) => !currentValue)}>
          <Text style={styles.iconTextButtonText}>{isEditing ? '收起' : '编辑'}</Text>
        </Pressable>
      </View>

      {isEditing ? (
        <View style={styles.curatorEditBox}>
          <View style={styles.customMuseumForm}>
            <TextInput
              style={[styles.customMuseumInput, styles.customMuseumEmojiInput]}
              onChangeText={setDraftAvatar}
              value={draftAvatar}
            />
            <TextInput style={styles.customMuseumInput} onChangeText={setDraftName} value={draftName} />
          </View>
          <Pressable style={styles.smallMuseumButton} onPress={saveProfile}>
            <Text style={styles.smallMuseumButtonText}>保存馆长档案</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.curatorXpRow}>
        <Text style={styles.curatorLevelText}>LV {xpState.level}</Text>
        <Text style={styles.curatorXpText}>
          {xpState.currentXp} / {XP_PER_LEVEL} XP
        </Text>
      </View>
      <View style={styles.xpTrack}>
        <View style={[styles.xpFill, { width: xpProgressPercent }]} />
      </View>

      <View style={styles.curatorStatsGrid}>
        <View style={styles.curatorStatCard}>
          <Text style={styles.curatorStatValue}>{streakDays}</Text>
          <Text style={styles.curatorStatLabel}>连续探索天数</Text>
        </View>
        <View style={styles.curatorStatCard}>
          <Text style={styles.curatorStatValue}>{completedMuseumCount}</Text>
          <Text style={styles.curatorStatLabel}>完成博物馆</Text>
        </View>
        <View style={styles.curatorStatCard}>
          <Text style={styles.curatorStatValue}>{itemCount}</Text>
          <Text style={styles.curatorStatLabel}>总藏品数量</Text>
        </View>
        <View style={styles.curatorStatCard}>
          <Text style={styles.curatorStatValue}>{badgeCount}</Text>
          <Text style={styles.curatorStatLabel}>已获得徽章</Text>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [debugResponse, setDebugResponse] = useState({
    objectEn: '',
    objectZh: '',
    rawText: '',
    status: '',
  });
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [collectionMessage, setCollectionMessage] = useState('');
  const [collectionFeedback, setCollectionFeedback] = useState<'new' | 'known' | ''>('');
  const [newestDiscoveryAt, setNewestDiscoveryAt] = useState('');
  const [expandedArtifactIds, setExpandedArtifactIds] = useState<string[]>([]);
  const [streakDays, setStreakDays] = useState(0);
  const [lastStreakDate, setLastStreakDate] = useState('');
  const [chestOpened, setChestOpened] = useState(false);
  const [chestReward, setChestReward] = useState('');
  const [xpState, setXpState] = useState<XpState>({ currentXp: 0, level: 1 });
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<AchievementId[]>([]);
  const [latestAchievement, setLatestAchievement] = useState<AchievementDefinition | null>(null);
  const [museumCollectedIds, setMuseumCollectedIds] = useState<string[]>([]);
  const [museumBadgeIds, setMuseumBadgeIds] = useState<string[]>([]);
  const [latestMuseumBadge, setLatestMuseumBadge] = useState<MuseumBadge | null>(null);
  const [cityMapCompletedNodeIds, setCityMapCompletedNodeIds] = useState<string[]>([]);
  const [customMuseums, setCustomMuseums] = useState<CustomMuseum[]>([]);
  const [curatorProfile, setCuratorProfile] = useState<CuratorProfile>({
    avatar: '🧙',
    name: '小小馆长',
    title: getCuratorTitle(1),
  });
  const [shareCard, setShareCard] = useState<ShareCardData | null>(null);
  const [hoveredButton, setHoveredButton] = useState<'camera' | 'album' | null>(null);
  const [speakingLanguage, setSpeakingLanguage] = useState<'zh' | 'en' | null>(null);

  const floatValue = useRef(new Animated.Value(0));
  const scanValue = useRef(new Animated.Value(0));
  const pulseValue = useRef(new Animated.Value(0));
  const shimmerValue = useRef(new Animated.Value(0));
  const resultAppearValue = useRef(new Animated.Value(0));
  const errorAppearValue = useRef(new Animated.Value(0));
  const unlockValue = useRef(new Animated.Value(0));
  const chestValue = useRef(new Animated.Value(0));
  const xpLevelUpValue = useRef(new Animated.Value(0));
  const achievementValue = useRef(new Animated.Value(0));
  const museumBadgeValue = useRef(new Animated.Value(0));
  const countBounceValue = useRef(new Animated.Value(0));
  const streakBounceValue = useRef(new Animated.Value(0));
  const speakBounceValue = useRef(new Animated.Value(0));
  const starTwinkleValue = useRef(new Animated.Value(0));
  const buttonBreathValue = useRef(new Animated.Value(0));
  const buttonFlowValue = useRef(new Animated.Value(0));

  useEffect(() => {
    const storedStreak = readStoredStreak();
    if (storedStreak) {
      setStreakDays(storedStreak.days);
      setLastStreakDate(storedStreak.lastDate);
    }

    const storedXp = readStoredXp();
    if (storedXp) {
      setXpState(storedXp);
    }

    setUnlockedAchievementIds(readStoredAchievements());
    setCollection(readStoredCollection());
    setExpandedArtifactIds(readStoredExpandedArtifactIds());
    setMuseumCollectedIds(readStoredMuseumIds());
    setMuseumBadgeIds(readStoredMuseumBadgeIds());
    setCityMapCompletedNodeIds(readStoredCityMapNodeIds());
    setCustomMuseums(readStoredCustomMuseums());
    const storedCurator = readStoredCurator();
    if (storedCurator) {
      setCuratorProfile(storedCurator);
    }

    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    const nextProfile = {
      ...curatorProfile,
      title: getCuratorTitle(xpState.level),
    };
    saveStoredCurator(nextProfile, xpState);

    if (nextProfile.title !== curatorProfile.title) {
      setCuratorProfile(nextProfile);
    }
  }, [curatorProfile, xpState]);

  useEffect(() => {
    const completedNodeIds = getCompletedCityMapNodeIds(museumCollectedIds);
    if (completedNodeIds.length === 0) {
      return;
    }

    setCityMapCompletedNodeIds((currentIds) => {
      const nextIds = Array.from(new Set([...currentIds, ...completedNodeIds]));
      if (nextIds.length === currentIds.length) {
        return currentIds;
      }

      saveStoredCityMapNodeIds(nextIds);
      return nextIds;
    });
  }, [museumCollectedIds]);

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatValue.current, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(floatValue.current, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    const starLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(starTwinkleValue.current, {
          toValue: 1,
          duration: 1250,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(starTwinkleValue.current, {
          toValue: 0,
          duration: 1250,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    const buttonLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonBreathValue.current, {
          toValue: 1,
          duration: 1300,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(buttonBreathValue.current, {
          toValue: 0,
          duration: 1300,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    const buttonFlowLoop = Animated.loop(
      Animated.timing(buttonFlowValue.current, {
        toValue: 1,
        duration: 1900,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    );

    floatLoop.start();
    starLoop.start();
    buttonLoop.start();
    buttonFlowLoop.start();

    return () => {
      floatLoop.stop();
      starLoop.stop();
      buttonLoop.stop();
      buttonFlowLoop.stop();
    };
  }, []);

  useEffect(() => {
    if (!isRecognizing) {
      scanValue.current.stopAnimation();
      pulseValue.current.stopAnimation();
      shimmerValue.current.stopAnimation();
      scanValue.current.setValue(0);
      pulseValue.current.setValue(0);
      shimmerValue.current.setValue(0);
      return;
    }

    const scanLoop = Animated.loop(
      Animated.timing(scanValue.current, {
        toValue: 1,
        duration: 1450,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue.current, {
          toValue: 1,
          duration: 850,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue.current, {
          toValue: 0,
          duration: 850,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    const shimmerLoop = Animated.loop(
      Animated.timing(shimmerValue.current, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    );

    scanLoop.start();
    pulseLoop.start();
    shimmerLoop.start();

    return () => {
      scanLoop.stop();
      pulseLoop.stop();
      shimmerLoop.stop();
    };
  }, [isRecognizing]);

  useEffect(() => {
    if (!recognitionResult) {
      resultAppearValue.current.setValue(0);
      return;
    }

    resultAppearValue.current.setValue(0);
    Animated.timing(resultAppearValue.current, {
      toValue: 1,
      duration: 460,
      easing: Easing.out(Easing.back(1.6)),
      useNativeDriver: true,
    }).start();
  }, [recognitionResult]);

  useEffect(() => {
    if (!errorMessage) {
      errorAppearValue.current.setValue(0);
      return;
    }

    errorAppearValue.current.setValue(0);
    Animated.timing(errorAppearValue.current, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [errorMessage]);

  useEffect(() => {
    if (collectionFeedback !== 'new') {
      unlockValue.current.setValue(0);
      return;
    }

    unlockValue.current.setValue(0);
    Animated.timing(unlockValue.current, {
      toValue: 1,
      duration: 620,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start();
  }, [collectionFeedback, newestDiscoveryAt]);

  useEffect(() => {
    if (!chestOpened) {
      chestValue.current.setValue(0);
      return;
    }

    chestValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(chestValue.current, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.back(1.9)),
        useNativeDriver: true,
      }),
      Animated.timing(chestValue.current, {
        toValue: 0.92,
        duration: 900,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [chestOpened, chestReward]);

  useEffect(() => {
    if (!showLevelUp) {
      xpLevelUpValue.current.setValue(0);
      return;
    }

    xpLevelUpValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(xpLevelUpValue.current, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.back(1.9)),
        useNativeDriver: true,
      }),
      Animated.timing(xpLevelUpValue.current, {
        toValue: 0.92,
        duration: 900,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [showLevelUp, xpState.level]);

  useEffect(() => {
    if (!latestAchievement) {
      achievementValue.current.setValue(0);
      return;
    }

    achievementValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(achievementValue.current, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.back(1.9)),
        useNativeDriver: true,
      }),
      Animated.timing(achievementValue.current, {
        toValue: 0.94,
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [latestAchievement]);

  useEffect(() => {
    if (!latestMuseumBadge) {
      museumBadgeValue.current.setValue(0);
      return;
    }

    museumBadgeValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(museumBadgeValue.current, {
        toValue: 1,
        duration: 680,
        easing: Easing.out(Easing.back(1.9)),
        useNativeDriver: true,
      }),
      Animated.timing(museumBadgeValue.current, {
        toValue: 0.94,
        duration: 1100,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [latestMuseumBadge]);

  const floatTranslateY = floatValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });
  const floatOpacity = floatValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });
  const scanTranslateY = scanValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-28, 304],
  });
  const pulseScale = pulseValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.022],
  });
  const pulseOpacity = pulseValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.62, 1],
  });
  const shimmerTranslateX = shimmerValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-240, 280],
  });
  const resultOpacity = resultAppearValue.current.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 1, 1],
  });
  const resultScale = resultAppearValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.94, 1.035, 1],
  });
  const errorOpacity = errorAppearValue.current.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 1],
  });
  const errorTranslateX = errorAppearValue.current.interpolate({
    inputRange: [0, 0.16, 0.32, 0.48, 0.64, 1],
    outputRange: [0, -5, 5, -3, 3, 0],
  });
  const errorScale = errorAppearValue.current.interpolate({
    inputRange: [0, 0.55, 1],
    outputRange: [0.97, 1.015, 1],
  });
  const errorEmojiTranslateY = errorAppearValue.current.interpolate({
    inputRange: [0, 0.48, 1],
    outputRange: [0, -8, 0],
  });
  const unlockOpacity = unlockValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const unlockScale = unlockValue.current.interpolate({
    inputRange: [0, 0.62, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const unlockTranslateY = unlockValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });
  const unlockGlowScale = unlockValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.35],
  });
  const unlockGlowOpacity = unlockValue.current.interpolate({
    inputRange: [0, 0.42, 1],
    outputRange: [0, 0.5, 0.12],
  });
  const newItemOpacity = unlockValue.current.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 1, 1],
  });
  const newItemTranslateY = unlockValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });
  const newItemScale = unlockValue.current.interpolate({
    inputRange: [0, 0.68, 1],
    outputRange: [0.9, 1.06, 1],
  });
  const chestOpacity = chestValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const chestScale = chestValue.current.interpolate({
    inputRange: [0, 0.58, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const chestGlowScale = chestValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.65, 1.42, 1.16],
  });
  const xpLevelUpOpacity = xpLevelUpValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const xpLevelUpScale = xpLevelUpValue.current.interpolate({
    inputRange: [0, 0.58, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const xpLevelUpGlowScale = xpLevelUpValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.65, 1.42, 1.16],
  });
  const achievementOpacity = achievementValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const achievementScale = achievementValue.current.interpolate({
    inputRange: [0, 0.58, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const achievementTranslateY = achievementValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });
  const achievementGlowScale = achievementValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.65, 1.42, 1.16],
  });
  const museumBadgeOpacity = museumBadgeValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const museumBadgeScale = museumBadgeValue.current.interpolate({
    inputRange: [0, 0.58, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const museumBadgeTranslateY = museumBadgeValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });
  const museumBadgeGlowScale = museumBadgeValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.65, 1.42, 1.16],
  });
  const countScale = countBounceValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  const streakScale = streakBounceValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.18],
  });
  const speakButtonScale = speakBounceValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });
  const starTwinkleOpacity = starTwinkleValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.42, 1],
  });
  const starTwinkleScale = starTwinkleValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1.16],
  });
  const buttonBreathScale = buttonBreathValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.012],
  });
  const buttonGlowOpacity = buttonBreathValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.34],
  });
  const buttonFlowTranslateX = buttonFlowValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-190, 260],
  });
  const magicEmojiTranslateY = pulseValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -5],
  });

  const animateCount = () => {
    countBounceValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(countBounceValue.current, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(countBounceValue.current, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const updateStreakForToday = () => {
    const today = getDateKey(new Date());
    if (lastStreakDate === today) {
      return;
    }

    const nextDays = lastStreakDate === getYesterdayKey() ? streakDays + 1 : 1;
    setStreakDays(nextDays);
    setLastStreakDate(today);
    saveStoredStreak({ days: nextDays, lastDate: today });

    streakBounceValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(streakBounceValue.current, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(streakBounceValue.current, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const openMagicChest = (nextCount: number) => {
    const reward = CHEST_REWARDS[(Date.now() + nextCount) % CHEST_REWARDS.length];
    setChestReward(reward);
    setChestOpened(true);
  };

  const addXpForRecognition = (result: RecognitionResult) => {
    const category = getStickerCategory(result);
    const earnedXp = XP_REWARDS[category];

    setXpState((currentState) => {
      let nextXp = currentState.currentXp + earnedXp;
      let nextLevel = currentState.level;
      let didLevelUp = false;

      while (nextXp >= XP_PER_LEVEL) {
        nextXp -= XP_PER_LEVEL;
        nextLevel += 1;
        didLevelUp = true;
      }

      const nextState = { currentXp: nextXp, level: nextLevel };
      saveStoredXp(nextState);
      setShowLevelUp(didLevelUp);
      return nextState;
    });
  };

  const unlockAchievements = ({
    nextCollection,
    nextCustomMuseumCount,
    nextMuseumCollectedIds,
    nextStreakDays,
  }: {
    nextCollection: CollectionItem[];
    nextCustomMuseumCount: number;
    nextMuseumCollectedIds: string[];
    nextStreakDays: number;
  }) => {
    const candidateIds = getActiveUnlockedAchievementIds({
      collection: nextCollection,
      customMuseumCount: nextCustomMuseumCount,
      museumCollectedIds: nextMuseumCollectedIds,
      streakDays: nextStreakDays,
    });

    setUnlockedAchievementIds((currentIds) => {
      const newIds = candidateIds.filter((id) => !currentIds.includes(id));
      if (newIds.length === 0) {
        return currentIds;
      }

      const nextIds = [...currentIds, ...newIds];
      saveStoredAchievements(nextIds);
      setLatestAchievement(getAchievement(newIds[0]));
      return nextIds;
    });
  };

  const unlockMuseumBadges = (nextIds: string[]) => {
    const candidateBadgeIds = getUnlockedMuseumBadgeIds(nextIds);
    setMuseumBadgeIds((currentBadgeIds) => {
      const newBadgeIds = candidateBadgeIds.filter((id) => !currentBadgeIds.includes(id));
      if (newBadgeIds.length === 0) {
        return currentBadgeIds;
      }

      const nextBadgeIds = [...currentBadgeIds, ...newBadgeIds];
      saveStoredMuseumBadgeIds(nextBadgeIds);
      setLatestMuseumBadge(getMuseumBadge(newBadgeIds[0]));
      return nextBadgeIds;
    });
  };

  const collectMuseumExhibits = (result: RecognitionResult) => {
    const matchedIds = getMatchedMuseumExhibitIds(result);
    if (matchedIds.length === 0) {
      return;
    }

    setMuseumCollectedIds((currentIds) => {
      const nextIds = Array.from(new Set([...currentIds, ...matchedIds]));
      if (nextIds.length === currentIds.length) {
        return currentIds;
      }

      saveStoredMuseumIds(nextIds);
      unlockMuseumBadges(nextIds);
      return nextIds;
    });
  };

  const updateCustomMuseums = (nextMuseums: CustomMuseum[]) => {
    setCustomMuseums(nextMuseums);
    saveStoredCustomMuseums(nextMuseums);
  };

  const addOfficialMuseumExhibits = (exhibitIds: string[]) => {
    setMuseumCollectedIds((currentIds) => {
      const nextIds = Array.from(new Set([...currentIds, ...exhibitIds]));
      if (nextIds.length === currentIds.length) {
        return currentIds;
      }

      saveStoredMuseumIds(nextIds);
      unlockMuseumBadges(nextIds);
      return nextIds;
    });
  };

  const recognizeImage = async (uri: string) => {
    setIsRecognizing(true);
    setRecognitionResult(null);
    setErrorMessage('');

    setDebugResponse({
      objectEn: '',
      objectZh: '',
      rawText: 'recognizeImage called',
      status: 'started',
    });
    setCollectionMessage('');
    setCollectionFeedback('');
    setNewestDiscoveryAt('');
    setChestOpened(false);

    try {
      const formData = new FormData();

      if (Platform.OS === 'web') {
        const imageResponse = await fetch(uri);
        const blob = await imageResponse.blob();
        formData.append('file', blob, 'photo.jpg');
      } else {
        formData.append('file', {
          uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as unknown as Blob);
      }

      setDebugResponse({
        objectEn: '',
        objectZh: '',
        rawText: 'fetch is about to run',
        status: 'fetching',
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      console.log('status', response.status);
      const rawText = await response.text();
      console.log('rawText', rawText);
      let parsed: Partial<RecognitionResult> = {};
      try {
        parsed = JSON.parse(rawText) as RecognitionResult;
        console.log('parsed JSON', parsed);
      } catch (parseError) {
        console.log('recognize json parse failed', parseError);
      }

      console.log('object_zh', parsed.object_zh ?? '');
      console.log('object_en', parsed.object_en ?? '');

      setDebugResponse({
        objectEn: parsed.object_en ?? '',
        objectZh: parsed.object_zh ?? '',
        rawText,
        status: String(response.status),
      });

      if (!parsed.object_en && !parsed.object_zh) {
        setRecognitionResult(null);
        setErrorMessage(null);
        return;
      }

      const recognizedData: RecognitionResult = {
        confidence: parsed.confidence || 'high',
        object_en: parsed.object_en ?? '',
        object_zh: parsed.object_zh ?? '',
      };

      setRecognitionResult(recognizedData);
      setErrorMessage(null);
      updateStreakForToday();
      const achievementStreakDays = lastStreakDate === getDateKey(new Date())
        ? streakDays
        : lastStreakDate === getYesterdayKey()
          ? streakDays + 1
          : 1;
      addXpForRecognition(recognizedData);
      collectMuseumExhibits(recognizedData);

      setCollection((currentCollection) => {
        const normalizedName = (recognizedData.object_en || recognizedData.object_zh).trim().toLowerCase();
        const alreadyDiscovered = currentCollection.some(
          (item) => (item.object_en || item.object_zh).trim().toLowerCase() === normalizedName,
        );

        if (alreadyDiscovered) {
          setCollectionMessage(COPY.collectionKnown);
          setCollectionFeedback('known');
          setNewestDiscoveryAt('');
          unlockAchievements({
            nextCollection: currentCollection,
            nextCustomMuseumCount: customMuseums.length,
            nextMuseumCollectedIds: museumCollectedIds,
            nextStreakDays: achievementStreakDays,
          });
          return currentCollection;
        }

        const discoveredAt = new Date().toISOString();
        const nextCollection = [
          {
            ...recognizedData,
            discoveredAt,
            emoji: getMagicEmoji(recognizedData),
          },
          ...currentCollection,
        ];

        saveStoredCollection(nextCollection);
        setCollectionMessage(COPY.collectionNew);
        setCollectionFeedback('new');
        setNewestDiscoveryAt(discoveredAt);
        animateCount();
        openMagicChest(nextCollection.length);
        unlockAchievements({
          nextCollection,
          nextCustomMuseumCount: customMuseums.length,
          nextMuseumCollectedIds: museumCollectedIds,
          nextStreakDays: achievementStreakDays,
        });
        return nextCollection;
      });
    } catch (error) {
      console.log('recognition failed', error);
      setDebugResponse({
        objectEn: '',
        objectZh: '',
        rawText: String(error),
        status: 'error',
      });
      setErrorMessage(null);
    } finally {
      setIsRecognizing(false);
    }
  };

  const takePhoto = async () => {
    setRecognitionResult(null);
    setErrorMessage('');
    setDebugResponse({ objectEn: '', objectZh: '', rawText: '', status: '' });

    try {
      if (Platform.OS !== 'web') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          Alert.alert('Camera permission needed', 'Please allow camera access to take a photo.');
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      await recognizeImage(uri);
    } catch (error) {
      console.log('camera failed', error);
      setErrorMessage(COPY.error);
    }
  };

  const chooseFromAlbum = async () => {
    setRecognitionResult(null);
    setErrorMessage('');
    setDebugResponse({ objectEn: '', objectZh: '', rawText: '', status: '' });

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      await recognizeImage(uri);
    } catch (error) {
      console.log('photo selection failed', error);
      setErrorMessage(COPY.error);
    }
  };

  const speakWord = (text: string, language: 'zh' | 'en') => {
    Speech.stop();
    setSpeakingLanguage(language);
    speakBounceValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(speakBounceValue.current, {
        toValue: 1,
        duration: 130,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(speakBounceValue.current, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    Speech.speak(text, {
      language: language === 'zh' ? 'zh-CN' : 'en-US',
      pitch: 1.06,
      rate: language === 'zh' ? 0.72 : 0.76,
      onDone: () => setSpeakingLanguage(null),
      onStopped: () => setSpeakingLanguage(null),
      onError: () => setSpeakingLanguage(null),
    });
  };

  const completedMuseumCount = getCompletedOfficialMuseumCount(museumCollectedIds);
  const customMuseumItemCount = customMuseums.reduce((sum, museum) => sum + museum.items.length, 0);
  const totalCuratorItemCount = museumCollectedIds.length + customMuseumItemCount;

  const updateCuratorProfile = (nextProfile: CuratorProfile) => {
    const normalizedProfile = {
      avatar: nextProfile.avatar.trim() || '🧙',
      name: nextProfile.name.trim() || '小小馆长',
      title: getCuratorTitle(xpState.level),
    };
    setCuratorProfile(normalizedProfile);
    saveStoredCurator(normalizedProfile, xpState);
  };

  const toggleArtifactStory = (artifactId: string) => {
    setExpandedArtifactIds((currentIds) => {
      const isExpanded = currentIds.includes(artifactId);
      const nextIds = isExpanded ? currentIds.filter((id) => id !== artifactId) : [...currentIds, artifactId];
      saveStoredExpandedArtifactIds(nextIds);
      return nextIds;
    });
  };

  const getShareSourceResult = (): RecognitionResult =>
    recognitionResult ??
    collection[0] ?? {
      confidence: 'high',
      object_en: 'magic discovery',
      object_zh: '魔法发现',
    };

  const openShareCard = (title: string, encouragement: string, result: RecognitionResult = getShareSourceResult()) => {
    setShareCard(
      buildShareCardData({
        curatorTitle: getCuratorTitle(xpState.level),
        encouragement,
        result,
        title,
      }),
    );
  };

  useEffect(() => {
    unlockAchievements({
      nextCollection: collection,
      nextCustomMuseumCount: customMuseums.length,
      nextMuseumCollectedIds: museumCollectedIds,
      nextStreakDays: streakDays,
    });
  }, [collection, customMuseums.length, museumCollectedIds, streakDays]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.appShell}>
          <View style={styles.header}>
            <View style={styles.brandPill}>
              <Text style={styles.brandPillText}>{COPY.badge}</Text>
            </View>
            <Text style={styles.title}>{COPY.title}</Text>
            <Text style={styles.subtitle}>{COPY.subtitle}</Text>
          </View>

          <CuratorProfileCard
            badgeCount={museumBadgeIds.length}
            completedMuseumCount={completedMuseumCount}
            glowScale={xpLevelUpGlowScale}
            itemCount={totalCuratorItemCount}
            levelUpOpacity={xpLevelUpOpacity}
            levelUpScale={xpLevelUpScale}
            onChangeProfile={updateCuratorProfile}
            profile={curatorProfile}
            showLevelUp={showLevelUp}
            streakDays={streakDays}
            xpState={xpState}
          />

          <Animated.View
            style={[
              styles.companionCard,
              {
                opacity: floatOpacity,
                transform: [{ translateY: floatTranslateY }],
              },
            ]}
          >
            <Text style={styles.companionAvatar}>🦉</Text>
            <View style={styles.companionBubble}>
              <Text style={styles.companionName}>小猫头鹰</Text>
              <Text style={styles.companionMessage}>
                {isRecognizing ? '我正在帮你看这是什么...' : '每天回来，都会有新的魔法奖励！'}
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.photoGlowFrame,
              photoUri && styles.photoGlowFrameActive,
              {
                opacity: isRecognizing ? pulseOpacity : floatOpacity,
                transform: [
                  { translateY: floatTranslateY },
                  ...(isRecognizing ? [{ scale: pulseScale }] : []),
                ],
              },
            ]}
          >
            <View style={styles.photoCard}>
              <View pointerEvents="none" style={styles.portalGlow}>
                <View style={styles.portalOrbLarge} />
                <View style={styles.portalOrbSmall} />
                <Animated.Text
                  style={[
                    styles.star,
                    styles.starOne,
                    { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                  ]}
                >
                  {'✨'}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.star,
                    styles.starTwo,
                    { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                  ]}
                >
                  {'✦'}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.star,
                    styles.starThree,
                    { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                  ]}
                >
                  {'✨'}
                </Animated.Text>
              </View>

              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.preview} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.uploadIcon}>📸</Text>
                  <Text style={styles.placeholderTitle}>{COPY.placeholderTitle}</Text>
                  <Text style={styles.placeholderText}>{COPY.placeholderText}</Text>
                </View>
              )}

              {isRecognizing ? (
                <>
                  <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanTranslateY }] }]} />
                  <Animated.View style={[styles.shimmerBeam, { transform: [{ translateX: shimmerTranslateX }] }]} />
                </>
              ) : null}
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.resultCard,
              recognitionResult && styles.resultCardSuccess,
              recognitionResult && {
                opacity: resultOpacity,
                transform: [{ scale: resultScale }],
              },
            ]}
          >
            {isRecognizing ? (
              <View style={styles.loadingState}>
                <ActivityIndicator color="#8B5CF6" />
                <Animated.Text
                  style={[styles.loadingMagicIcon, { transform: [{ translateY: magicEmojiTranslateY }] }]}
                >
                  🪄
                </Animated.Text>
                <View>
                  <Text style={styles.statusText}>{COPY.loading}</Text>
                  <Text style={styles.statusHint}>{COPY.loadingHint}</Text>
                </View>
              </View>
            ) : recognitionResult ? (
              <>
                <MagicWordCard
                  result={recognitionResult}
                  onShare={() => openShareCard('AI Magic Word Camera', 'I found a new magic artifact!', recognitionResult)}
                  onSpeakChinese={() => speakWord(recognitionResult.object_zh, 'zh')}
                  onSpeakEnglish={() => speakWord(recognitionResult.object_en, 'en')}
                  speakButtonScale={speakButtonScale}
                  speakingLanguage={speakingLanguage}
                />
                {debugResponse.status || debugResponse.rawText ? (
                  <DebugResponseCard
                    objectEn={debugResponse.objectEn}
                    objectZh={debugResponse.objectZh}
                    rawText={debugResponse.rawText}
                    status={debugResponse.status}
                  />
                ) : null}
              </>
            ) : debugResponse.status || debugResponse.rawText ? (
              <DebugResponseCard
                objectEn={debugResponse.objectEn}
                objectZh={debugResponse.objectZh}
                rawText={debugResponse.rawText}
                status={debugResponse.status}
              />
            ) : errorMessage ? (
              <FailureCard
                emojiTranslateY={errorEmojiTranslateY}
                opacity={errorOpacity}
                scale={errorScale}
                translateX={errorTranslateX}
              />
            ) : (
              <Text style={styles.readyText}>{COPY.ready}</Text>
            )}
          </Animated.View>

          <MagicCollection
            achievementGlowScale={achievementGlowScale}
            achievementOpacity={achievementOpacity}
            achievements={ACTIVE_ACHIEVEMENTS}
            achievementScale={achievementScale}
            achievementTranslateY={achievementTranslateY}
            chestGlowScale={chestGlowScale}
            chestOpened={chestOpened}
            chestOpacity={chestOpacity}
            chestReward={chestReward}
            chestScale={chestScale}
            cityMapCompletedNodeIds={cityMapCompletedNodeIds}
            cityMaps={CITY_MAPS}
            collection={collection}
            collectionMessage={collectionMessage}
            countScale={countScale}
            expandedArtifactIds={expandedArtifactIds}
            feedback={collectionFeedback}
            newestDiscoveryAt={newestDiscoveryAt}
            newItemOpacity={newItemOpacity}
            newItemScale={newItemScale}
            newItemTranslateY={newItemTranslateY}
            starTwinkleOpacity={starTwinkleOpacity}
            starTwinkleScale={starTwinkleScale}
            streakDays={streakDays}
            streakScale={streakScale}
            showLevelUp={showLevelUp}
            latestAchievement={latestAchievement}
            museumCollectedIds={museumCollectedIds}
            museumBadgeGlowScale={museumBadgeGlowScale}
            museumBadgeIds={museumBadgeIds}
            museumBadgeOpacity={museumBadgeOpacity}
            museumBadges={MUSEUM_BADGES}
            museumBadgeScale={museumBadgeScale}
            museumBadgeTranslateY={museumBadgeTranslateY}
            museums={MAGIC_MUSEUMS}
            latestMuseumBadge={latestMuseumBadge}
            unlockGlowOpacity={unlockGlowOpacity}
            unlockGlowScale={unlockGlowScale}
            unlockOpacity={unlockOpacity}
            unlockScale={unlockScale}
            unlockTranslateY={unlockTranslateY}
            xpLevelUpGlowScale={xpLevelUpGlowScale}
            xpLevelUpOpacity={xpLevelUpOpacity}
            xpLevelUpScale={xpLevelUpScale}
            xpState={xpState}
            unlockedAchievementIds={unlockedAchievementIds}
            onToggleArtifactStory={toggleArtifactStory}
            onShareMuseumBadge={(badge) => openShareCard(`${badge.emoji} ${badge.title}`, '这座博物馆被你点亮了，真了不起！')}
          />

          <CustomMuseumPanel
            customMuseums={customMuseums}
            museumCollectedIds={museumCollectedIds}
            museums={MAGIC_MUSEUMS}
            onAddOfficialExhibits={addOfficialMuseumExhibits}
            onChangeCustomMuseums={updateCustomMuseums}
            recognitionResult={recognitionResult}
          />

          <View style={styles.actions}>
            <Animated.View style={{ transform: [{ scale: buttonBreathScale }] }}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  hoveredButton === 'camera' && styles.buttonHovered,
                  pressed && styles.buttonPressed,
                ]}
                onHoverIn={() => setHoveredButton('camera')}
                onHoverOut={() => setHoveredButton(null)}
                onPress={takePhoto}
              >
                <Animated.View style={[styles.buttonGlow, { opacity: buttonGlowOpacity }]} />
                <Animated.View
                  style={[styles.buttonFlow, { transform: [{ translateX: buttonFlowTranslateX }, { rotate: '16deg' }] }]}
                />
                <Text style={styles.buttonText}>{COPY.camera}</Text>
              </Pressable>
            </Animated.View>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                hoveredButton === 'album' && styles.secondaryButtonHovered,
                pressed && styles.secondaryButtonPressed,
              ]}
              onHoverIn={() => setHoveredButton('album')}
              onHoverOut={() => setHoveredButton(null)}
              onPress={chooseFromAlbum}
            >
              <Text style={styles.secondaryButtonText}>{COPY.album}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {shareCard ? <ShareCardPreview data={shareCard} onClose={() => setShareCard(null)} /> : null}
    </SafeAreaView>
  );
}

function MagicWordCard({
  onShare,
  result,
  onSpeakChinese,
  onSpeakEnglish,
  speakButtonScale,
  speakingLanguage,
}: {
  onShare: () => void;
  result: RecognitionResult;
  onSpeakChinese: () => void;
  onSpeakEnglish: () => void;
  speakButtonScale: Animated.AnimatedInterpolation<string | number>;
  speakingLanguage: 'zh' | 'en' | null;
}) {
  return (
    <View style={styles.wordCard}>
      <Text style={styles.foundTitle}>{COPY.found}</Text>
      <Text style={styles.celebrateText}>{COPY.celebrate}</Text>
      <View style={styles.emojiStage}>
        <Text style={styles.magicEmoji}>{getMagicEmoji(result)}</Text>
      </View>
      <Text style={styles.chineseWord}>{result.object_zh || '未命名藏品'}</Text>
      <Text style={styles.englishWord}>{result.object_en || 'unnamed artifact'}</Text>
      <Text style={styles.rarityLine}>稀有度：{getStickerCategoryLabel(getStickerCategory(result))}</Text>
      <Text style={styles.confidenceLine}>
        {COPY.confidence}: {formatConfidence(result.confidence)}
      </Text>
      <Pressable style={({ pressed }) => [styles.shareButton, pressed && styles.shareButtonPressed]} onPress={onShare}>
        <Text style={styles.shareButtonText}>📸 生成分享卡</Text>
      </Pressable>
      <View style={styles.speechActions}>
        <SpeechButton
          active={speakingLanguage === 'zh'}
          label="🔊 中文发音"
          onPress={onSpeakChinese}
          scale={speakButtonScale}
        />
        <SpeechButton
          active={speakingLanguage === 'en'}
          label="🔊 English"
          onPress={onSpeakEnglish}
          scale={speakButtonScale}
        />
      </View>
    </View>
  );
}

function ShareCardPreview({ data, onClose }: { data: ShareCardData; onClose: () => void }) {
  return (
    <View style={styles.sharePreviewOverlay}>
      <View style={styles.sharePreviewBackdrop} />
      <View style={styles.sharePreviewShell}>
        <View pointerEvents="none" style={styles.sharePreviewGlow} />
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleOne]}>✨</Text>
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleTwo]}>🌟</Text>
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleThree]}>✨</Text>

        <View style={styles.sharePreviewCard}>
          <Text style={styles.sharePreviewBrand}>AI魔法识字相机</Text>
          <Text style={styles.sharePreviewTitle}>{data.title}</Text>
          <View style={styles.sharePreviewEmojiStage}>
            <Text style={styles.sharePreviewEmoji}>{data.emoji}</Text>
          </View>
          <Text style={styles.sharePreviewZh}>{data.objectZh}</Text>
          <Text style={styles.sharePreviewEn}>{data.objectEn}</Text>
          <View style={styles.sharePreviewInfoGrid}>
            <View style={styles.sharePreviewInfoPill}>
              <Text style={styles.sharePreviewInfoLabel}>稀有度</Text>
              <Text style={styles.sharePreviewInfoValue}>{data.rarityLabel}</Text>
            </View>
            <View style={styles.sharePreviewInfoPill}>
              <Text style={styles.sharePreviewInfoLabel}>馆长等级</Text>
              <Text style={styles.sharePreviewInfoValue}>{data.curatorTitle}</Text>
            </View>
          </View>
          <Text style={styles.sharePreviewMuseum}>所属博物馆：{data.museumTitle}</Text>
          <Text style={styles.sharePreviewEncouragement}>{data.encouragement}</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.sharePreviewCloseButton, pressed && styles.shareButtonPressed]} onPress={onClose}>
          <Text style={styles.sharePreviewCloseText}>关闭</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SpeechButton({
  active,
  label,
  onPress,
  scale,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  scale: Animated.AnimatedInterpolation<string | number>;
}) {
  return (
    <Animated.View style={active ? { transform: [{ scale }] } : undefined}>
      <Pressable
        style={({ pressed }) => [
          styles.speechButton,
          active && styles.speechButtonActive,
          pressed && styles.speechButtonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.speechButtonText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

function FailureCard({
  emojiTranslateY,
  opacity,
  scale,
  translateX,
}: {
  emojiTranslateY: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
  scale: Animated.AnimatedInterpolation<string | number>;
  translateX: Animated.AnimatedInterpolation<string | number>;
}) {
  return (
    <Animated.View style={[styles.failureCard, { opacity, transform: [{ translateX }, { scale }] }]}>
      <Animated.Text style={[styles.failureEmoji, { transform: [{ translateY: emojiTranslateY }] }]}>
        🪄
      </Animated.Text>
      <Text style={styles.failureTitle}>{COPY.errorTitle}</Text>
      <Text style={styles.failureHint}>{COPY.errorHint}</Text>
      <View style={styles.failureEncouragePill}>
        <Text style={styles.failureEncourageText}>{COPY.errorEncourage}</Text>
      </View>
    </Animated.View>
  );
}

function DebugResponseCard({
  objectEn,
  objectZh,
  rawText,
  status,
}: {
  objectEn: string;
  objectZh: string;
  rawText: string;
  status: string;
}) {
  return (
    <View style={styles.debugResponseCard}>
      <Text style={styles.debugResponseTitle}>DEBUG RESPONSE</Text>
      <Text style={styles.debugResponseLine}>status: {status || '(empty)'}</Text>
      <Text style={styles.debugResponseLine}>object_zh: {objectZh || '(empty)'}</Text>
      <Text style={styles.debugResponseLine}>object_en: {objectEn || '(empty)'}</Text>
      <Text style={styles.debugResponseRawLabel}>rawText:</Text>
      <Text style={styles.debugResponseRawText}>{rawText || '(empty)'}</Text>
    </View>
  );
}

function MagicCollection({
  achievementGlowScale,
  achievementOpacity,
  achievements,
  achievementScale,
  achievementTranslateY,
  chestGlowScale,
  chestOpened,
  chestOpacity,
  chestReward,
  chestScale,
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  collectionMessage,
  countScale,
  expandedArtifactIds,
  feedback,
  newestDiscoveryAt,
  newItemOpacity,
  newItemScale,
  newItemTranslateY,
  starTwinkleOpacity,
  starTwinkleScale,
  streakDays,
  streakScale,
  showLevelUp,
  latestAchievement,
  museumCollectedIds,
  museumBadgeGlowScale,
  museumBadgeIds,
  museumBadgeOpacity,
  museumBadges,
  museumBadgeScale,
  museumBadgeTranslateY,
  museums,
  latestMuseumBadge,
  unlockGlowOpacity,
  unlockGlowScale,
  unlockOpacity,
  unlockScale,
  unlockTranslateY,
  xpLevelUpGlowScale,
  xpLevelUpOpacity,
  xpLevelUpScale,
  xpState,
  unlockedAchievementIds,
  onShareMuseumBadge,
  onToggleArtifactStory,
}: {
  achievementGlowScale: Animated.AnimatedInterpolation<string | number>;
  achievementOpacity: Animated.AnimatedInterpolation<string | number>;
  achievements: AchievementDefinition[];
  achievementScale: Animated.AnimatedInterpolation<string | number>;
  achievementTranslateY: Animated.AnimatedInterpolation<string | number>;
  chestGlowScale: Animated.AnimatedInterpolation<string | number>;
  chestOpened: boolean;
  chestOpacity: Animated.AnimatedInterpolation<string | number>;
  chestReward: string;
  chestScale: Animated.AnimatedInterpolation<string | number>;
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMap[];
  collection: CollectionItem[];
  collectionMessage: string;
  countScale: Animated.AnimatedInterpolation<string | number>;
  expandedArtifactIds: string[];
  feedback: 'new' | 'known' | '';
  newestDiscoveryAt: string;
  newItemOpacity: Animated.AnimatedInterpolation<string | number>;
  newItemScale: Animated.AnimatedInterpolation<string | number>;
  newItemTranslateY: Animated.AnimatedInterpolation<string | number>;
  starTwinkleOpacity: Animated.AnimatedInterpolation<string | number>;
  starTwinkleScale: Animated.AnimatedInterpolation<string | number>;
  streakDays: number;
  streakScale: Animated.AnimatedInterpolation<string | number>;
  showLevelUp: boolean;
  latestAchievement: AchievementDefinition | null;
  museumCollectedIds: string[];
  museumBadgeGlowScale: Animated.AnimatedInterpolation<string | number>;
  museumBadgeIds: string[];
  museumBadgeOpacity: Animated.AnimatedInterpolation<string | number>;
  museumBadges: MuseumBadge[];
  museumBadgeScale: Animated.AnimatedInterpolation<string | number>;
  museumBadgeTranslateY: Animated.AnimatedInterpolation<string | number>;
  museums: MagicMuseum[];
  latestMuseumBadge: MuseumBadge | null;
  unlockGlowOpacity: Animated.AnimatedInterpolation<string | number>;
  unlockGlowScale: Animated.AnimatedInterpolation<string | number>;
  unlockOpacity: Animated.AnimatedInterpolation<string | number>;
  unlockScale: Animated.AnimatedInterpolation<string | number>;
  unlockTranslateY: Animated.AnimatedInterpolation<string | number>;
  xpLevelUpGlowScale: Animated.AnimatedInterpolation<string | number>;
  xpLevelUpOpacity: Animated.AnimatedInterpolation<string | number>;
  xpLevelUpScale: Animated.AnimatedInterpolation<string | number>;
  xpState: XpState;
  unlockedAchievementIds: AchievementId[];
  onShareMuseumBadge: (badge: MuseumBadge) => void;
  onToggleArtifactStory: (artifactId: string) => void;
}) {
  const collectedCount = collection.length;
  const completionPercent = Math.min(100, Math.round((collectedCount / STICKER_TOTAL) * 100));

  return (
    <View style={styles.collectionPanel}>
      <MagicRewardPanel
        chestGlowScale={chestGlowScale}
        chestOpened={chestOpened}
        chestOpacity={chestOpacity}
        chestReward={chestReward}
        chestScale={chestScale}
        showLevelUp={showLevelUp}
        starTwinkleOpacity={starTwinkleOpacity}
        starTwinkleScale={starTwinkleScale}
        streakDays={streakDays}
        streakScale={streakScale}
        xpLevelUpGlowScale={xpLevelUpGlowScale}
        xpLevelUpOpacity={xpLevelUpOpacity}
        xpLevelUpScale={xpLevelUpScale}
        xpState={xpState}
      />

      <AchievementPanel
        achievementGlowScale={achievementGlowScale}
        achievementOpacity={achievementOpacity}
        achievements={achievements}
        achievementScale={achievementScale}
        achievementTranslateY={achievementTranslateY}
        latestAchievement={latestAchievement}
        unlockedAchievementIds={unlockedAchievementIds}
      />

      <MagicMuseumPanel museumCollectedIds={museumCollectedIds} museums={museums} />

      <CityMapPanel cityMapCompletedNodeIds={cityMapCompletedNodeIds} cityMaps={cityMaps} />

      <MuseumBadgeWall
        latestMuseumBadge={latestMuseumBadge}
        museumBadgeGlowScale={museumBadgeGlowScale}
        museumBadgeIds={museumBadgeIds}
        museumBadgeOpacity={museumBadgeOpacity}
        museumBadges={museumBadges}
        museumBadgeScale={museumBadgeScale}
        museumBadgeTranslateY={museumBadgeTranslateY}
        onShareMuseumBadge={onShareMuseumBadge}
      />

      <View style={styles.collectionHeader}>
        <Text style={styles.collectionTitle}>{COPY.collectionTitle}</Text>
        <View style={styles.albumStatsCard}>
          <View style={styles.albumStatBlock}>
            <Text style={styles.albumStatLabel}>已收集：</Text>
            <View style={styles.collectionCountRow}>
              <Animated.Text style={[styles.collectionCountNumber, { transform: [{ scale: countScale }] }]}>
                {collectedCount}
              </Animated.Text>
              <Text style={styles.collectionCount}> / {STICKER_TOTAL}</Text>
            </View>
          </View>
          <View style={styles.albumStatBlock}>
            <Text style={styles.albumStatLabel}>完成度：</Text>
            <Text style={styles.albumPercent}>{completionPercent}%</Text>
          </View>
        </View>
      </View>

      {feedback === 'new' ? (
        <Animated.View
          style={[
            styles.unlockBanner,
            {
              opacity: unlockOpacity,
              transform: [{ translateY: unlockTranslateY }, { scale: unlockScale }],
            },
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.unlockGlow, { opacity: unlockGlowOpacity, transform: [{ scale: unlockGlowScale }] }]}
          />
          <Text style={styles.unlockNewText}>{COPY.unlockNew}</Text>
          <Text style={styles.unlockStickerText}>{COPY.unlockSticker}</Text>
        </Animated.View>
      ) : collectionMessage ? (
        <View style={styles.collectionMessagePill}>
          <Text style={styles.collectionMessageText}>{collectionMessage}</Text>
        </View>
      ) : null}

      <View style={styles.albumSections}>
        {STICKER_CATEGORIES.map((category) => {
          const categoryItems = getCategoryItems(collection, category.key);
          const mysteryCount = Math.max(0, category.total - categoryItems.length);
          const mysterySlots = Array.from({ length: mysteryCount }, (_, index) => `${category.key}-mystery-${index}`);

          return (
            <View key={category.key} style={styles.albumCategory}>
              <View style={styles.albumCategoryHeader}>
                <Text style={styles.albumCategoryTitle}>{category.label}</Text>
                <Text style={styles.albumCategoryCount}>
                  {categoryItems.length}/{category.total}
                </Text>
              </View>

              <ScrollView
                contentContainerStyle={styles.collectionList}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {categoryItems.map((item) => {
                  const artifactId = getArtifactStoryId(item);

                  return (
                    <ArtifactStoryCard
                      key={artifactId}
                      cityMaps={cityMaps}
                      isExpanded={expandedArtifactIds.includes(artifactId)}
                      isNewest={item.discoveredAt === newestDiscoveryAt}
                      item={item}
                      newItemOpacity={newItemOpacity}
                      newItemScale={newItemScale}
                      newItemTranslateY={newItemTranslateY}
                      onToggle={() => onToggleArtifactStory(artifactId)}
                      starTwinkleOpacity={starTwinkleOpacity}
                      starTwinkleScale={starTwinkleScale}
                    />
                  );
                })}

                {mysterySlots.map((slot) => (
                  <View key={slot} style={[styles.collectionItem, styles.mysteryItem]}>
                    <Text style={styles.mysteryEmoji}>❓</Text>
                    <Text numberOfLines={1} style={styles.mysteryTitle}>
                      神秘贴纸
                    </Text>
                    <Text numberOfLines={1} style={styles.mysteryText}>
                      尚未发现
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function ArtifactStoryCard({
  cityMaps,
  isExpanded,
  isNewest,
  item,
  newItemOpacity,
  newItemScale,
  newItemTranslateY,
  onToggle,
  starTwinkleOpacity,
  starTwinkleScale,
}: {
  cityMaps: CityMap[];
  isExpanded: boolean;
  isNewest: boolean;
  item: CollectionItem;
  newItemOpacity: Animated.AnimatedInterpolation<string | number>;
  newItemScale: Animated.AnimatedInterpolation<string | number>;
  newItemTranslateY: Animated.AnimatedInterpolation<string | number>;
  onToggle: () => void;
  starTwinkleOpacity: Animated.AnimatedInterpolation<string | number>;
  starTwinkleScale: Animated.AnimatedInterpolation<string | number>;
}) {
  const entryValue = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const category = getStickerCategory(item);
  const location = getArtifactMuseumAndCity(item, cityMaps);

  useEffect(() => {
    Animated.spring(entryValue, {
      friction: 7,
      tension: 90,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [entryValue]);

  const entryScale = entryValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1],
  });

  const onPressIn = () => {
    Animated.spring(pressScale, {
      friction: 6,
      tension: 140,
      toValue: 1.04,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(pressScale, {
      friction: 6,
      tension: 140,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          opacity: isNewest ? newItemOpacity : entryValue,
          transform: [
            { translateY: isNewest ? newItemTranslateY : 0 },
            { scale: Animated.multiply(isNewest ? newItemScale : entryScale, pressScale) },
          ],
        },
      ]}
    >
      <Pressable onPress={onToggle} onPressIn={onPressIn} onPressOut={onPressOut}>
        <View
          style={[
            styles.artifactStoryCard,
            category === 'rare' && styles.artifactStoryCardRare,
            category === 'epic' && styles.artifactStoryCardEpic,
            category === 'legendary' && styles.artifactStoryCardLegendary,
            isNewest && styles.collectionItemNew,
          ]}
        >
          <Animated.Text
            pointerEvents="none"
            style={[
              styles.artifactSparkle,
              { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
            ]}
          >
            ✨
          </Animated.Text>
          <View style={styles.artifactStoryTopRow}>
            <Text style={styles.artifactStoryEmoji}>{item.emoji}</Text>
            <View style={styles.artifactStoryNameBlock}>
              <Text numberOfLines={1} style={styles.artifactStoryZh}>
                {item.object_zh}
              </Text>
              <Text numberOfLines={1} style={styles.artifactStoryEn}>
                {item.object_en}
              </Text>
            </View>
          </View>

          <Text style={styles.artifactRarity}>{getStickerCategoryLabel(category)}发现</Text>
          <Text style={styles.artifactMeta}>发现时间：{formatDiscoveredAt(item.discoveredAt)}</Text>

          {isExpanded ? (
            <View style={styles.artifactExpandedArea}>
              <Text style={styles.artifactMeta}>所属博物馆：{location.museumTitle}</Text>
              <Text style={styles.artifactMeta}>所属城市：{location.cityName}</Text>
              <Text style={styles.artifactFact}>趣味知识：{getArtifactFact(item)}</Text>
              <Text style={styles.artifactToggleText}>收起 ↑</Text>
            </View>
          ) : (
            <Text style={styles.artifactToggleText}>展开故事 ↓</Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

function MagicMuseumPanel({
  museumCollectedIds,
  museums,
}: {
  museumCollectedIds: string[];
  museums: MagicMuseum[];
}) {
  const totalExhibits = museums.reduce((sum, museum) => sum + museum.exhibits.length, 0);
  const completedMuseumCount = museums.filter(
    (museum) => getMuseumCollectedCount(museum, museumCollectedIds) === museum.exhibits.length,
  ).length;
  const progressPercent = Math.min(100, (museumCollectedIds.length / totalExhibits) * 100);

  return (
    <View style={styles.museumPanel}>
      <View style={styles.museumHero}>
        <Text style={styles.museumTitle}>🏛 我的魔法博物馆</Text>
        <Text style={styles.museumSummary}>
          已完成：{completedMuseumCount} / {museums.length} 馆
        </Text>
        <Text style={styles.museumSummary}>
          已收藏：{museumCollectedIds.length} / {totalExhibits}
        </Text>
        <View style={styles.museumProgressTrack}>
          <View style={[styles.museumProgressFill, { width: `${progressPercent}%` as `${number}%` }]} />
        </View>
      </View>

      <View style={styles.museumList}>
        {museums.map((museum) => {
          const collectedCount = getMuseumCollectedCount(museum, museumCollectedIds);
          const museumPercent = Math.round((collectedCount / museum.exhibits.length) * 100);

          return (
            <View key={museum.id} style={styles.museumCard}>
              <View style={styles.museumCardHeader}>
                <View>
                  <Text style={styles.museumCardTitle}>
                    {museum.emoji} {museum.title}
                  </Text>
                  <Text style={styles.museumCardCount}>
                    {collectedCount} / {museum.exhibits.length}
                  </Text>
                </View>
                <Text style={styles.museumPercent}>{museumPercent}%</Text>
              </View>
              <View style={styles.museumProgressTrackSmall}>
                <View style={[styles.museumProgressFill, { width: `${museumPercent}%` as `${number}%` }]} />
              </View>

              <ScrollView
                contentContainerStyle={styles.museumExhibitList}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {museum.exhibits.map((exhibit) => {
                  const isCollected = museumCollectedIds.includes(exhibit.id);

                  return (
                    <View
                      key={exhibit.id}
                      style={[styles.museumExhibitCard, !isCollected && styles.museumMysteryCard]}
                    >
                      <Text style={isCollected ? styles.museumExhibitEmoji : styles.museumMysteryEmoji}>
                        {isCollected ? exhibit.emoji : '❓'}
                      </Text>
                      <Text numberOfLines={1} style={isCollected ? styles.museumExhibitZh : styles.museumMysteryTitle}>
                        {isCollected ? exhibit.object_zh : '神秘藏品'}
                      </Text>
                      <Text numberOfLines={1} style={isCollected ? styles.museumExhibitEn : styles.museumMysteryText}>
                        {isCollected ? exhibit.object_en : '尚未发现'}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function CityMapPanel({
  cityMapCompletedNodeIds,
  cityMaps,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: CityMap[];
}) {
  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🗺️ 城市魔法地图</Text>
        <Text style={styles.cityMapHint}>完成官方博物馆后，真实城市里的博物馆节点会自动点亮。</Text>
      </View>

      <View style={styles.cityMapList}>
        {cityMaps.map((city) => {
          const completedCount = city.museums.filter((museum) => cityMapCompletedNodeIds.includes(museum.id)).length;
          const percent = Math.round((completedCount / city.museums.length) * 100);
          const cityCompleted = completedCount === city.museums.length;

          return (
            <View key={city.id} style={[styles.cityMapCard, cityCompleted && styles.cityMapCardComplete]}>
              <View style={styles.cityMapCardHeader}>
                <View>
                  <Text style={styles.cityMapCityName}>
                    {city.emoji} {city.name}
                  </Text>
                  <Text style={styles.cityMapProgressText}>
                    完成馆数：{completedCount} / {city.museums.length}
                  </Text>
                </View>
                <Text style={styles.cityMapPercent}>{percent}%</Text>
              </View>

              <View style={styles.cityMapProgressTrack}>
                <View style={[styles.cityMapProgressFill, { width: `${percent}%` as `${number}%` }]} />
              </View>

              {cityCompleted ? <Text style={styles.cityMapMaster}>🏆 城市探索大师</Text> : null}

              <View style={styles.cityMapNodeList}>
                {city.museums.map((museum) => {
                  const isComplete = cityMapCompletedNodeIds.includes(museum.id);
                  return (
                    <View key={museum.id} style={[styles.cityMapNode, isComplete && styles.cityMapNodeComplete]}>
                      <Text style={styles.cityMapNodeEmoji}>{isComplete ? museum.emoji : '🔒'}</Text>
                      <Text numberOfLines={1} style={isComplete ? styles.cityMapNodeName : styles.cityMapNodeLockedName}>
                        {museum.name}
                      </Text>
                      <Text style={isComplete ? styles.cityMapNodeStatus : styles.cityMapNodeLockedStatus}>
                        {isComplete ? '已点亮' : '待探索'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function MuseumBadgeWall({
  latestMuseumBadge,
  museumBadgeGlowScale,
  museumBadgeIds,
  museumBadgeOpacity,
  museumBadges,
  museumBadgeScale,
  museumBadgeTranslateY,
  onShareMuseumBadge,
}: {
  latestMuseumBadge: MuseumBadge | null;
  museumBadgeGlowScale: Animated.AnimatedInterpolation<string | number>;
  museumBadgeIds: string[];
  museumBadgeOpacity: Animated.AnimatedInterpolation<string | number>;
  museumBadges: MuseumBadge[];
  museumBadgeScale: Animated.AnimatedInterpolation<string | number>;
  museumBadgeTranslateY: Animated.AnimatedInterpolation<string | number>;
  onShareMuseumBadge: (badge: MuseumBadge) => void;
}) {
  const unlockedBadges = museumBadges.filter((badge) => museumBadgeIds.includes(badge.id));

  return (
    <View style={styles.badgeWallPanel}>
      {latestMuseumBadge ? (
        <Animated.View
          style={[
            styles.museumRewardToast,
            {
              opacity: museumBadgeOpacity,
              transform: [{ translateY: museumBadgeTranslateY }, { scale: museumBadgeScale }],
            },
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.museumRewardGlow, { transform: [{ scale: museumBadgeGlowScale }] }]}
          />
          <View pointerEvents="none" style={styles.museumRewardConfettiLayer}>
            <Text style={[styles.museumRewardConfetti, styles.museumRewardConfettiOne]}>🎊</Text>
            <Text style={[styles.museumRewardConfetti, styles.museumRewardConfettiTwo]}>✨</Text>
            <Text style={[styles.museumRewardConfetti, styles.museumRewardConfettiThree]}>🎉</Text>
          </View>
          <Text style={styles.museumRewardTitle}>🎉 博物馆完成！</Text>
          <Text style={styles.museumRewardLabel}>获得：</Text>
          <Text style={styles.museumRewardName}>
            {latestMuseumBadge.emoji} {latestMuseumBadge.title}
          </Text>
          <Pressable
            style={({ pressed }) => [styles.shareButton, styles.shareButtonSmall, pressed && styles.shareButtonPressed]}
            onPress={() => onShareMuseumBadge(latestMuseumBadge)}
          >
            <Text style={styles.shareButtonText}>✨ 分享博物馆卡</Text>
          </Pressable>
        </Animated.View>
      ) : null}

      <View style={styles.badgeWallHeader}>
        <Text style={styles.badgeWallTitle}>🏅 我的徽章墙</Text>
        <Text style={styles.badgeWallCount}>
          {unlockedBadges.length}/{museumBadges.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.badgeWallList} horizontal showsHorizontalScrollIndicator={false}>
        {museumBadges.map((badge) => {
          const isUnlocked = museumBadgeIds.includes(badge.id);

          return (
            <View key={badge.id} style={[styles.museumBadgeCard, !isUnlocked && styles.museumBadgeLocked]}>
              <Text style={styles.museumBadgeEmoji}>{isUnlocked ? badge.emoji : '🔒'}</Text>
              <Text numberOfLines={1} style={isUnlocked ? styles.museumBadgeName : styles.museumBadgeLockedText}>
                {isUnlocked ? badge.title : '待解锁'}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function CustomMuseumPanel({
  customMuseums,
  museumCollectedIds,
  museums,
  onAddOfficialExhibits,
  onChangeCustomMuseums,
  recognitionResult,
}: {
  customMuseums: CustomMuseum[];
  museumCollectedIds: string[];
  museums: MagicMuseum[];
  onAddOfficialExhibits: (exhibitIds: string[]) => void;
  onChangeCustomMuseums: (nextMuseums: CustomMuseum[]) => void;
  recognitionResult: RecognitionResult | null;
}) {
  const [newMuseumEmoji, setNewMuseumEmoji] = useState('🏛');
  const [newMuseumName, setNewMuseumName] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [editingMuseumId, setEditingMuseumId] = useState('');
  const [editingEmoji, setEditingEmoji] = useState('');
  const [editingName, setEditingName] = useState('');
  const [movingItem, setMovingItem] = useState<MovingCustomItem>(null);

  const matchedOfficialMuseums = recognitionResult
    ? museums
        .map((museum) => ({
          exhibitIds: museum.exhibits
            .filter((exhibit) => getMatchedMuseumExhibitIds(recognitionResult).includes(exhibit.id))
            .map((exhibit) => exhibit.id),
          museum,
        }))
        .filter((entry) => entry.exhibitIds.length > 0)
    : [];

  const createMuseum = () => {
    const name = newMuseumName.trim();
    if (!name) {
      return;
    }

    onChangeCustomMuseums([
      ...customMuseums,
      {
        emoji: newMuseumEmoji.trim() || '🏛',
        id: `custom-${Date.now()}`,
        items: [],
        name,
      },
    ]);
    setNewMuseumEmoji('🏛');
    setNewMuseumName('');
  };

  const addToCustomMuseum = (museumId: string) => {
    if (!recognitionResult) {
      return;
    }

    const item = buildCustomMuseumItem(recognitionResult);
    const nextMuseums = customMuseums.map((museum) => {
      if (museum.id !== museumId || museum.items.some((existingItem) => existingItem.id === item.id)) {
        return museum;
      }

      return {
        ...museum,
        items: [item, ...museum.items],
      };
    });
    onChangeCustomMuseums(nextMuseums);
  };

  const deleteMuseum = (museumId: string) => {
    onChangeCustomMuseums(customMuseums.filter((museum) => museum.id !== museumId));
    if (editingMuseumId === museumId) {
      setEditingMuseumId('');
    }
  };

  const startRename = (museum: CustomMuseum) => {
    setEditingMuseumId(museum.id);
    setEditingEmoji(museum.emoji);
    setEditingName(museum.name);
  };

  const saveRename = () => {
    const name = editingName.trim();
    if (!editingMuseumId || !name) {
      return;
    }

    onChangeCustomMuseums(
      customMuseums.map((museum) =>
        museum.id === editingMuseumId
          ? {
              ...museum,
              emoji: editingEmoji.trim() || '🏛',
              name,
            }
          : museum,
      ),
    );
    setEditingMuseumId('');
  };

  const moveItemToMuseum = (targetMuseumId: string) => {
    if (!movingItem || targetMuseumId === movingItem.museumId) {
      return;
    }

    const sourceMuseum = customMuseums.find((museum) => museum.id === movingItem.museumId);
    const item = sourceMuseum?.items.find((museumItem) => museumItem.id === movingItem.itemId);
    if (!item) {
      return;
    }

    const nextMuseums = customMuseums.map((museum) => {
      if (museum.id === movingItem.museumId) {
        return {
          ...museum,
          items: museum.items.filter((museumItem) => museumItem.id !== movingItem.itemId),
        };
      }

      if (museum.id === targetMuseumId) {
        return {
          ...museum,
          items: museum.items.some((museumItem) => museumItem.id === item.id) ? museum.items : [item, ...museum.items],
        };
      }

      return museum;
    });

    onChangeCustomMuseums(nextMuseums);
    setMovingItem(null);
  };

  return (
    <View style={styles.customMuseumPanel}>
      <Text style={styles.customMuseumTitle}>➕ 创建博物馆</Text>
      <View style={styles.customMuseumForm}>
        <TextInput
          style={[styles.customMuseumInput, styles.customMuseumEmojiInput]}
          onChangeText={setNewMuseumEmoji}
          placeholder="Emoji"
          value={newMuseumEmoji}
        />
        <TextInput
          style={styles.customMuseumInput}
          onChangeText={setNewMuseumName}
          placeholder="博物馆名称"
          value={newMuseumName}
        />
      </View>
      <Pressable style={({ pressed }) => [styles.customMuseumButton, pressed && styles.buttonPressed]} onPress={createMuseum}>
        <Text style={styles.customMuseumButtonText}>创建博物馆</Text>
      </Pressable>

      {recognitionResult ? (
        <View style={styles.addMuseumBox}>
          <Pressable
            style={({ pressed }) => [styles.addMuseumToggle, pressed && styles.secondaryButtonPressed]}
            onPress={() => setShowDestinations((currentValue) => !currentValue)}
          >
            <Text style={styles.addMuseumToggleText}>➕ 加入博物馆</Text>
          </Pressable>

          {showDestinations ? (
            <View style={styles.destinationList}>
              <Text style={styles.destinationTitle}>官方馆</Text>
              {matchedOfficialMuseums.length > 0 ? (
                matchedOfficialMuseums.map(({ exhibitIds, museum }) => (
                  <Pressable
                    key={museum.id}
                    style={({ pressed }) => [styles.destinationButton, pressed && styles.secondaryButtonPressed]}
                    onPress={() => onAddOfficialExhibits(exhibitIds)}
                  >
                    <Text style={styles.destinationButtonText}>
                      {museum.emoji} {museum.title}
                      {exhibitIds.every((id) => museumCollectedIds.includes(id)) ? ' 已加入' : ''}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.destinationEmptyText}>这次识别暂时没有匹配到官方馆藏品。</Text>
              )}

              <Text style={styles.destinationTitle}>自定义馆</Text>
              {customMuseums.length > 0 ? (
                customMuseums.map((museum) => (
                  <Pressable
                    key={museum.id}
                    style={({ pressed }) => [styles.destinationButton, pressed && styles.secondaryButtonPressed]}
                    onPress={() => addToCustomMuseum(museum.id)}
                  >
                    <Text style={styles.destinationButtonText}>
                      {museum.emoji} {museum.name}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.destinationEmptyText}>先创建一个自己的博物馆吧。</Text>
              )}
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={styles.customMuseumList}>
        {customMuseums.map((museum) => (
          <View key={museum.id} style={styles.customMuseumCard}>
            {editingMuseumId === museum.id ? (
              <View>
                <View style={styles.customMuseumForm}>
                  <TextInput
                    style={[styles.customMuseumInput, styles.customMuseumEmojiInput]}
                    onChangeText={setEditingEmoji}
                    value={editingEmoji}
                  />
                  <TextInput style={styles.customMuseumInput} onChangeText={setEditingName} value={editingName} />
                </View>
                <View style={styles.customMuseumActions}>
                  <Pressable style={styles.smallMuseumButton} onPress={saveRename}>
                    <Text style={styles.smallMuseumButtonText}>保存</Text>
                  </Pressable>
                  <Pressable style={styles.smallMuseumButtonSoft} onPress={() => setEditingMuseumId('')}>
                    <Text style={styles.smallMuseumButtonSoftText}>取消</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View style={styles.customMuseumHeader}>
                <View>
                  <Text style={styles.customMuseumName}>
                    {museum.emoji} {museum.name}
                  </Text>
                  <Text style={styles.customMuseumMeta}>藏品数量：{museum.items.length}</Text>
                  <Text style={styles.customMuseumMeta}>完成度：自由收藏</Text>
                </View>
                <View style={styles.customMuseumHeaderActions}>
                  <Pressable style={styles.iconTextButton} onPress={() => startRename(museum)}>
                    <Text style={styles.iconTextButtonText}>重命名</Text>
                  </Pressable>
                  <Pressable style={styles.iconTextButtonDanger} onPress={() => deleteMuseum(museum.id)}>
                    <Text style={styles.iconTextButtonDangerText}>删除</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {museum.items.length > 0 ? (
              <ScrollView contentContainerStyle={styles.customItemList} horizontal showsHorizontalScrollIndicator={false}>
                {museum.items.map((item) => (
                  <View key={item.id} style={styles.customItemCard}>
                    <Text style={styles.collectionEmoji}>{item.emoji}</Text>
                    <Text numberOfLines={1} style={styles.collectionZh}>
                      {item.object_zh}
                    </Text>
                    <Text numberOfLines={1} style={styles.collectionEn}>
                      {item.object_en}
                    </Text>
                    <Pressable
                      style={styles.moveItemButton}
                      onPress={() => setMovingItem({ itemId: item.id, museumId: museum.id })}
                    >
                      <Text style={styles.moveItemButtonText}>移动</Text>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.destinationEmptyText}>还没有藏品。识别成功后可以加入这里。</Text>
            )}

            {movingItem?.museumId === museum.id ? (
              <View style={styles.movePanel}>
                <Text style={styles.destinationTitle}>移动到：</Text>
                {customMuseums
                  .filter((targetMuseum) => targetMuseum.id !== museum.id)
                  .map((targetMuseum) => (
                    <Pressable
                      key={targetMuseum.id}
                      style={styles.destinationButton}
                      onPress={() => moveItemToMuseum(targetMuseum.id)}
                    >
                      <Text style={styles.destinationButtonText}>
                        {targetMuseum.emoji} {targetMuseum.name}
                      </Text>
                    </Pressable>
                  ))}
                <Pressable style={styles.smallMuseumButtonSoft} onPress={() => setMovingItem(null)}>
                  <Text style={styles.smallMuseumButtonSoftText}>取消移动</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function MagicRewardPanel({
  chestGlowScale,
  chestOpened,
  chestOpacity,
  chestReward,
  chestScale,
  showLevelUp,
  starTwinkleOpacity,
  starTwinkleScale,
  streakDays,
  streakScale,
  xpLevelUpGlowScale,
  xpLevelUpOpacity,
  xpLevelUpScale,
  xpState,
}: {
  chestGlowScale: Animated.AnimatedInterpolation<string | number>;
  chestOpened: boolean;
  chestOpacity: Animated.AnimatedInterpolation<string | number>;
  chestReward: string;
  chestScale: Animated.AnimatedInterpolation<string | number>;
  showLevelUp: boolean;
  starTwinkleOpacity: Animated.AnimatedInterpolation<string | number>;
  starTwinkleScale: Animated.AnimatedInterpolation<string | number>;
  streakDays: number;
  streakScale: Animated.AnimatedInterpolation<string | number>;
  xpLevelUpGlowScale: Animated.AnimatedInterpolation<string | number>;
  xpLevelUpOpacity: Animated.AnimatedInterpolation<string | number>;
  xpLevelUpScale: Animated.AnimatedInterpolation<string | number>;
  xpState: XpState;
}) {
  const xpProgressPercent = `${Math.min(100, (xpState.currentXp / XP_PER_LEVEL) * 100)}%` as `${number}%`;

  return (
    <View style={styles.rewardPanel}>
      <View style={styles.streakCard}>
        <Text style={styles.streakTitle}>{COPY.streakTitle}</Text>
        <Animated.Text style={[styles.streakCount, { transform: [{ scale: streakScale }] }]}>
          {streakDays} {COPY.streakDays}
        </Animated.Text>
      </View>

      <View style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpLevel}>LV {xpState.level}</Text>
          <Text style={styles.xpText}>
            {xpState.currentXp} / {XP_PER_LEVEL} XP
          </Text>
        </View>
        <View style={styles.xpTrack}>
          <View style={[styles.xpFill, { width: xpProgressPercent }]} />
        </View>

        {showLevelUp ? (
          <Animated.View
            style={[
              styles.levelUpBadge,
              {
                opacity: xpLevelUpOpacity,
                transform: [{ scale: xpLevelUpScale }],
              },
            ]}
          >
            <Animated.View
              pointerEvents="none"
              style={[styles.levelUpGlow, { transform: [{ scale: xpLevelUpGlowScale }] }]}
            />
            <Text style={styles.levelUpText}>{COPY.levelUp}</Text>
          </Animated.View>
        ) : null}
      </View>

      <Animated.View
        style={[
          styles.chestCard,
          chestOpened && styles.chestCardOpen,
          chestOpened && {
            opacity: chestOpacity,
            transform: [{ scale: chestScale }],
          },
        ]}
      >
        {chestOpened ? (
          <>
            <Animated.View
              pointerEvents="none"
              style={[styles.chestGlow, { transform: [{ scale: chestGlowScale }] }]}
            />
            <View pointerEvents="none" style={styles.chestConfettiLayer}>
              <Animated.Text
                style={[
                  styles.chestConfetti,
                  styles.chestConfettiOne,
                  { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                ]}
              >
                🎊
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.chestConfetti,
                  styles.chestConfettiTwo,
                  { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                ]}
              >
                ✨
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.chestConfetti,
                  styles.chestConfettiThree,
                  { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                ]}
              >
                🎉
              </Animated.Text>
            </View>
            <Text style={styles.chestEmoji}>🎁</Text>
            <Text style={styles.chestOpenTitle}>{COPY.chestOpened}</Text>
            <Text style={styles.chestOpenText}>{COPY.chestReward}</Text>
            <Text style={styles.chestRewardText}>{chestReward}</Text>
          </>
        ) : (
          <>
            <Text style={styles.chestEmoji}>🎁</Text>
            <Text style={styles.chestTitle}>{COPY.chestTitle}</Text>
            <Text style={styles.chestHint}>{COPY.chestNeedOne}</Text>
          </>
        )}
      </Animated.View>
    </View>
  );
}

function AchievementPanel({
  achievementGlowScale,
  achievementOpacity,
  achievements,
  achievementScale,
  achievementTranslateY,
  latestAchievement,
  unlockedAchievementIds,
}: {
  achievementGlowScale: Animated.AnimatedInterpolation<string | number>;
  achievementOpacity: Animated.AnimatedInterpolation<string | number>;
  achievements: AchievementDefinition[];
  achievementScale: Animated.AnimatedInterpolation<string | number>;
  achievementTranslateY: Animated.AnimatedInterpolation<string | number>;
  latestAchievement: AchievementDefinition | null;
  unlockedAchievementIds: AchievementId[];
}) {
  const unlockedAchievements = achievements.filter((achievement) => unlockedAchievementIds.includes(achievement.id));
  const unlockedCount = unlockedAchievements.length;

  return (
    <View style={styles.achievementPanel}>
      {latestAchievement ? (
        <Animated.View
          style={[
            styles.achievementToast,
            {
              opacity: achievementOpacity,
              transform: [{ translateY: achievementTranslateY }, { scale: achievementScale }],
            },
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.achievementGlow, { transform: [{ scale: achievementGlowScale }] }]}
          />
          <View pointerEvents="none" style={styles.achievementConfettiLayer}>
            <Text style={[styles.achievementConfetti, styles.achievementConfettiOne]}>🎉</Text>
            <Text style={[styles.achievementConfetti, styles.achievementConfettiTwo]}>✨</Text>
            <Text style={[styles.achievementConfetti, styles.achievementConfettiThree]}>🏅</Text>
          </View>
          <Text style={styles.achievementSparkle}>✨</Text>
          <Text style={styles.achievementToastTitle}>✨ 成就解锁！</Text>
          <Text style={styles.achievementToastName}>
            {latestAchievement.emoji} {latestAchievement.title}
          </Text>
          <Text style={styles.achievementToastEncouragement}>
            {latestAchievement.encouragement ?? '新的魔法成就已经点亮！'}
          </Text>
        </Animated.View>
      ) : null}

      <View style={styles.achievementHeader}>
        <Text style={styles.achievementTitle}>🏆 魔法成就</Text>
        <Text style={styles.achievementCount}>
          已解锁 {unlockedCount} / {achievements.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.achievementList} horizontal showsHorizontalScrollIndicator={false}>
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievementIds.includes(achievement.id);

          return (
            <View key={achievement.id} style={[styles.achievementBadge, !isUnlocked && styles.achievementBadgeLocked]}>
              <Text style={[styles.achievementBadgeEmoji, !isUnlocked && styles.achievementBadgeEmojiLocked]}>
                {isUnlocked ? achievement.emoji : '🔒'}
              </Text>
              <Text numberOfLines={1} style={styles.achievementBadgeText}>
                {achievement.title}
              </Text>
              <Text numberOfLines={2} style={isUnlocked ? styles.achievementBadgeHint : styles.achievementLockedHint}>
                {isUnlocked ? achievement.encouragement ?? '已点亮' : '等待解锁'}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF4DC',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  appShell: {
    width: '100%',
    maxWidth: 382,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F7D38A',
    backgroundColor: '#FFF9EB',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
  },
  brandPillText: {
    color: '#8A4B10',
    fontSize: 12,
    fontWeight: '900',
  },
  title: {
    color: '#34214D',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 39,
    textAlign: 'center',
  },
  subtitle: {
    color: '#7C5C99',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  companionCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  companionAvatar: {
    fontSize: 36,
    lineHeight: 44,
  },
  companionBubble: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFF9EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  companionName: {
    color: '#6D28D9',
    fontSize: 13,
    fontWeight: '900',
  },
  companionMessage: {
    color: '#6B4A82',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
    marginTop: 2,
  },
  photoGlowFrame: {
    width: '100%',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#F9D575',
    backgroundColor: '#FFF8E9',
    padding: 6,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 7,
  },
  photoGlowFrameActive: {
    borderColor: '#D8B4FE',
    shadowColor: '#A855F7',
  },
  photoCard: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    aspectRatio: 1,
    width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFE9A8',
    backgroundColor: '#FFFDF7',
  },
  portalGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  portalOrbLarge: {
    position: 'absolute',
    top: 28,
    left: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FDE68A',
    opacity: 0.38,
  },
  portalOrbSmall: {
    position: 'absolute',
    right: 30,
    bottom: 34,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#DDD6FE',
    opacity: 0.52,
  },
  star: {
    position: 'absolute',
    color: '#A855F7',
    fontSize: 20,
    fontWeight: '900',
  },
  starOne: {
    top: 24,
    right: 42,
  },
  starTwo: {
    left: 44,
    bottom: 44,
    color: '#F59E0B',
    fontSize: 24,
  },
  starThree: {
    right: 72,
    bottom: 94,
    color: '#EC4899',
    fontSize: 18,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 34,
  },
  uploadIcon: {
    fontSize: 68,
    lineHeight: 78,
    marginBottom: 12,
  },
  placeholderTitle: {
    color: '#3B245F',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderText: {
    color: '#8A6B9F',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
  },
  scanLine: {
    position: 'absolute',
    left: 18,
    right: 18,
    top: 0,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 18,
  },
  shimmerBeam: {
    position: 'absolute',
    top: -40,
    bottom: -40,
    width: 76,
    backgroundColor: '#FFFFFF',
    opacity: 0.24,
    transform: [{ rotate: '14deg' }],
  },
  resultCard: {
    marginTop: 16,
    minHeight: 136,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F6D9A8',
    backgroundColor: '#FFFDF7',
    padding: 22,
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 26,
    elevation: 5,
  },
  resultCardSuccess: {
    borderColor: '#F7C948',
    backgroundColor: '#FFF9E8',
  },
  loadingState: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingMagicIcon: {
    fontSize: 25,
    lineHeight: 30,
  },
  statusText: {
    color: '#6D28D9',
    fontSize: 16,
    fontWeight: '900',
  },
  statusHint: {
    color: '#9B7BB7',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  wordCard: {
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#FFE2A8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.13,
    shadowRadius: 20,
  },
  foundTitle: {
    color: '#8B3A10',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  celebrateText: {
    color: '#C05A12',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 4,
    textAlign: 'center',
  },
  emojiStage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 112,
    height: 112,
    borderRadius: 38,
    backgroundColor: '#FFF1B8',
    borderWidth: 1,
    borderColor: '#FFD66B',
    marginBottom: 16,
    marginTop: 14,
  },
  magicEmoji: {
    fontSize: 62,
    lineHeight: 74,
  },
  chineseWord: {
    color: '#3B245F',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 38,
    marginBottom: 6,
    textAlign: 'center',
  },
  englishWord: {
    color: '#7C3AED',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  rarityLine: {
    color: '#6D28D9',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  confidenceLine: {
    color: '#A05A16',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  sharePreviewOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 50,
  },
  sharePreviewBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(76, 45, 111, 0.42)',
  },
  sharePreviewShell: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  sharePreviewGlow: {
    position: 'absolute',
    top: 20,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FDE68A',
    opacity: 0.42,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
  },
  sharePreviewSparkle: {
    position: 'absolute',
    color: '#F59E0B',
    fontSize: 24,
    fontWeight: '900',
    zIndex: 2,
  },
  sharePreviewSparkleOne: {
    left: 22,
    top: 28,
  },
  sharePreviewSparkleTwo: {
    right: 26,
    top: 54,
  },
  sharePreviewSparkleThree: {
    bottom: 74,
    left: 42,
  },
  sharePreviewCard: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#F7C948',
    backgroundColor: '#FFF9EB',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 22,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 26,
  },
  sharePreviewBrand: {
    color: '#6D28D9',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 29,
    textAlign: 'center',
  },
  sharePreviewTitle: {
    color: '#A05A16',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginTop: 4,
    textAlign: 'center',
  },
  sharePreviewEmojiStage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 118,
    height: 118,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    marginTop: 16,
  },
  sharePreviewEmoji: {
    fontSize: 66,
    lineHeight: 76,
  },
  sharePreviewZh: {
    color: '#3B245F',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 38,
    marginTop: 14,
    textAlign: 'center',
  },
  sharePreviewEn: {
    color: '#7C3AED',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 27,
    marginTop: 2,
    textAlign: 'center',
  },
  sharePreviewInfoGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    width: '100%',
  },
  sharePreviewInfoPill: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sharePreviewInfoLabel: {
    color: '#8A6B9F',
    fontSize: 11,
    fontWeight: '900',
    lineHeight: 15,
    textAlign: 'center',
  },
  sharePreviewInfoValue: {
    color: '#4C2D6F',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    marginTop: 2,
    textAlign: 'center',
  },
  sharePreviewMuseum: {
    color: '#8A5E22',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
    marginTop: 13,
    textAlign: 'center',
  },
  sharePreviewEncouragement: {
    color: '#6D28D9',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 23,
    marginTop: 12,
    textAlign: 'center',
  },
  sharePreviewCloseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginTop: 14,
    paddingHorizontal: 24,
    paddingVertical: 9,
    shadowColor: '#4C2D6F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
  },
  sharePreviewCloseText: {
    color: '#6D28D9',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    textAlign: 'center',
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#C084FC',
    backgroundColor: '#F5E8FF',
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 13,
  },
  shareButtonSmall: {
    alignSelf: 'center',
    minHeight: 38,
    marginTop: 10,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  shareButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  shareButtonText: {
    color: '#6D28D9',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    textAlign: 'center',
  },
  speechActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    width: '100%',
  },
  speechButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#F5EDFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  speechButtonActive: {
    borderColor: '#C084FC',
    backgroundColor: '#EFE0FF',
  },
  speechButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  speechButtonText: {
    color: '#6D28D9',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },
  readyText: {
    color: '#8A6B9F',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
    textAlign: 'center',
  },
  failureCard: {
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFF8E8',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  failureEmoji: {
    fontSize: 48,
    lineHeight: 58,
    marginBottom: 6,
  },
  failureTitle: {
    color: '#4C2D6F',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  failureHint: {
    color: '#8A5E22',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 23,
    marginTop: 6,
    textAlign: 'center',
  },
  failureEncouragePill: {
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  failureEncourageText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    textAlign: 'center',
  },
  debugResponseCard: {
    alignSelf: 'stretch',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  debugResponseTitle: {
    color: '#6D28D9',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
    marginBottom: 6,
  },
  debugResponseLine: {
    color: '#3B245F',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 18,
  },
  debugResponseRawLabel: {
    color: '#8A5E22',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 18,
    marginTop: 8,
  },
  debugResponseRawText: {
    color: '#4C2D6F',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
    marginTop: 3,
  },
  collectionPanel: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFF9EB',
    marginTop: 16,
    overflow: 'hidden',
    paddingBottom: 16,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  rewardPanel: {
    borderBottomWidth: 1,
    borderColor: '#F3D8A6',
    gap: 10,
    paddingBottom: 16,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  streakCard: {
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FDBA74',
    backgroundColor: '#FFF7ED',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  streakTitle: {
    color: '#9A3412',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
  },
  streakCount: {
    color: '#7C2D12',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  xpCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#F8EEFF',
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  xpHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  xpLevel: {
    color: '#6D28D9',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
  },
  xpText: {
    color: '#7C5C99',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  xpTrack: {
    height: 13,
    borderRadius: 999,
    backgroundColor: '#E9D5FF',
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#F59E0B',
  },
  levelUpBadge: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    marginTop: 12,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
  },
  levelUpGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  levelUpText: {
    color: '#C2410C',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  chestCard: {
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  chestCardOpen: {
    borderColor: '#C084FC',
    backgroundColor: '#FFF7D6',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 26,
  },
  chestGlow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#FFFFFF',
    opacity: 0.48,
  },
  chestConfettiLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  chestConfetti: {
    position: 'absolute',
    color: '#A855F7',
    fontSize: 23,
    fontWeight: '900',
  },
  chestConfettiOne: {
    left: 22,
    top: 10,
  },
  chestConfettiTwo: {
    right: 30,
    top: 16,
  },
  chestConfettiThree: {
    bottom: 12,
    right: 68,
  },
  chestEmoji: {
    fontSize: 34,
    lineHeight: 42,
    marginBottom: 4,
  },
  chestTitle: {
    color: '#4C2D6F',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
    textAlign: 'center',
  },
  chestHint: {
    color: '#9A6A19',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginTop: 3,
    textAlign: 'center',
  },
  chestOpenTitle: {
    color: '#C2410C',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    textAlign: 'center',
  },
  chestOpenText: {
    color: '#7C3AED',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
    marginTop: 2,
    textAlign: 'center',
  },
  chestRewardText: {
    color: '#3B245F',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 23,
    marginTop: 7,
    textAlign: 'center',
  },
  curatorCard: {
    borderBottomWidth: 1,
    borderColor: '#F3D8A6',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  curatorLevelToast: {
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#F7C948',
    backgroundColor: '#FFF7C2',
    marginBottom: 14,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 26,
  },
  curatorLevelGlow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#FFFFFF',
    opacity: 0.48,
  },
  curatorConfettiLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  curatorConfetti: {
    position: 'absolute',
    color: '#A855F7',
    fontSize: 24,
    fontWeight: '900',
  },
  curatorConfettiOne: {
    left: 24,
    top: 12,
  },
  curatorConfettiTwo: {
    right: 26,
    top: 16,
    color: '#F59E0B',
  },
  curatorConfettiThree: {
    bottom: 12,
    right: 78,
    color: '#EC4899',
  },
  curatorLevelTitle: {
    color: '#C2410C',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
    textAlign: 'center',
  },
  curatorLevelLabel: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginTop: 4,
    textAlign: 'center',
  },
  curatorLevelName: {
    color: '#3B245F',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 27,
    marginTop: 2,
    textAlign: 'center',
  },
  curatorHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  curatorAvatar: {
    fontSize: 42,
    lineHeight: 50,
  },
  curatorHeaderText: {
    flex: 1,
  },
  curatorCardTitle: {
    color: '#4C2D6F',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
  },
  curatorName: {
    color: '#8A5E22',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginTop: 2,
  },
  curatorTitle: {
    color: '#7C3AED',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
    marginTop: 2,
  },
  curatorEditBox: {
    marginTop: 12,
  },
  curatorXpRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  curatorLevelText: {
    color: '#7C3AED',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
  },
  curatorXpText: {
    color: '#C2410C',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  curatorStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  curatorStatCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFFFFF',
    minHeight: 58,
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  curatorStatValue: {
    color: '#3B245F',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  curatorStatLabel: {
    color: '#8A6B9F',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    marginTop: 1,
    textAlign: 'center',
  },
  achievementPanel: {
    borderBottomWidth: 1,
    borderColor: '#F3D8A6',
    paddingBottom: 16,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  achievementToast: {
    alignItems: 'center',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    marginBottom: 12,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
  },
  achievementGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  achievementSparkle: {
    color: '#A855F7',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },
  achievementToastTitle: {
    color: '#C2410C',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    textAlign: 'center',
  },
  achievementToastName: {
    color: '#4C2D6F',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 24,
    marginTop: 2,
    textAlign: 'center',
  },
  achievementToastEncouragement: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
    marginTop: 4,
    textAlign: 'center',
  },
  achievementConfettiLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  achievementConfetti: {
    position: 'absolute',
    color: '#A855F7',
    fontSize: 22,
    fontWeight: '900',
  },
  achievementConfettiOne: {
    left: 22,
    top: 10,
  },
  achievementConfettiTwo: {
    right: 26,
    top: 14,
    color: '#F59E0B',
  },
  achievementConfettiThree: {
    bottom: 12,
    right: 74,
    color: '#EC4899',
  },
  achievementHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementTitle: {
    color: '#4C2D6F',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  achievementCount: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  achievementList: {
    gap: 10,
    paddingTop: 12,
  },
  achievementBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 118,
    minHeight: 82,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#F8EEFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  achievementBadgeLocked: {
    borderColor: '#E9D5FF',
    backgroundColor: '#F4ECFF',
    borderStyle: 'dashed',
    opacity: 0.76,
    shadowOpacity: 0.04,
  },
  achievementBadgeEmoji: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 4,
  },
  achievementBadgeEmojiLocked: {
    opacity: 0.62,
  },
  achievementBadgeText: {
    color: '#4C2D6F',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    textAlign: 'center',
    width: '100%',
  },
  achievementEmptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 82,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFF9EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: 210,
  },
  achievementEmptyText: {
    color: '#8A6B9F',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
    textAlign: 'center',
  },
  museumPanel: {
    borderBottomWidth: 1,
    borderColor: '#F3D8A6',
    paddingBottom: 16,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  museumHero: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF7D6',
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
  },
  museumTitle: {
    color: '#4C2D6F',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  museumSummary: {
    color: '#8A5E22',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginTop: 4,
    textAlign: 'center',
  },
  museumProgressTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#FDE68A',
    marginTop: 12,
    overflow: 'hidden',
  },
  museumProgressTrackSmall: {
    height: 9,
    borderRadius: 999,
    backgroundColor: '#FDE68A',
    marginTop: 10,
    overflow: 'hidden',
  },
  museumProgressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#A855F7',
  },
  museumList: {
    gap: 14,
    marginTop: 14,
  },
  museumCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFFDF7',
    overflow: 'hidden',
    paddingBottom: 14,
    paddingTop: 14,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  museumCardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  museumCardTitle: {
    color: '#4C2D6F',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 23,
  },
  museumCardCount: {
    color: '#9A6A19',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    marginTop: 2,
  },
  museumPercent: {
    color: '#7C3AED',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  museumExhibitList: {
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  museumExhibitCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    minHeight: 116,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 11,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  museumMysteryCard: {
    borderColor: '#E9D5FF',
    backgroundColor: '#F7EEFF',
    borderStyle: 'dashed',
    shadowColor: '#A855F7',
    shadowOpacity: 0.06,
  },
  museumExhibitEmoji: {
    fontSize: 36,
    lineHeight: 44,
    marginBottom: 6,
  },
  museumMysteryEmoji: {
    fontSize: 33,
    lineHeight: 42,
    marginBottom: 6,
    opacity: 0.74,
  },
  museumExhibitZh: {
    color: '#3B245F',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
    textAlign: 'center',
    width: '100%',
  },
  museumExhibitEn: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    marginTop: 2,
    textAlign: 'center',
    width: '100%',
  },
  museumMysteryTitle: {
    color: '#6D28D9',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
    textAlign: 'center',
    width: '100%',
  },
  museumMysteryText: {
    color: '#9B7BB7',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
    marginTop: 2,
    textAlign: 'center',
    width: '100%',
  },
  achievementBadgeHint: {
    color: '#7C3AED',
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 15,
    marginTop: 4,
    textAlign: 'center',
    width: '100%',
  },
  achievementLockedHint: {
    color: '#9B7BB7',
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 15,
    marginTop: 4,
    textAlign: 'center',
    width: '100%',
  },
  cityMapPanel: {
    borderBottomWidth: 1,
    borderColor: '#F3D8A6',
    paddingBottom: 16,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  cityMapHero: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#C084FC',
    backgroundColor: '#F8EEFF',
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  cityMapTitle: {
    color: '#4C2D6F',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  cityMapHint: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
    marginTop: 4,
    textAlign: 'center',
  },
  cityMapList: {
    gap: 14,
    marginTop: 14,
  },
  cityMapCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFFDF7',
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  cityMapCardComplete: {
    borderColor: '#F7C948',
    backgroundColor: '#FFF7D6',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.16,
  },
  cityMapCardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cityMapCityName: {
    color: '#4C2D6F',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  cityMapProgressText: {
    color: '#9A6A19',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    marginTop: 2,
  },
  cityMapPercent: {
    color: '#7C3AED',
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 25,
  },
  cityMapProgressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#FDE68A',
    marginTop: 10,
    overflow: 'hidden',
  },
  cityMapProgressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#A855F7',
  },
  cityMapMaster: {
    color: '#C2410C',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
    marginTop: 10,
    textAlign: 'center',
  },
  cityMapNodeList: {
    gap: 9,
    marginTop: 12,
  },
  cityMapNode: {
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#F7EEFF',
    flexDirection: 'row',
    gap: 9,
    minHeight: 46,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  cityMapNodeComplete: {
    borderColor: '#F7C948',
    backgroundColor: '#FFFFFF',
  },
  cityMapNodeEmoji: {
    fontSize: 22,
    lineHeight: 28,
  },
  cityMapNodeName: {
    color: '#3B245F',
    flex: 1,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  cityMapNodeLockedName: {
    color: '#8A6B9F',
    flex: 1,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  cityMapNodeStatus: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
  },
  cityMapNodeLockedStatus: {
    color: '#9B7BB7',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
  },
  badgeWallPanel: {
    borderBottomWidth: 1,
    borderColor: '#F3D8A6',
    paddingBottom: 16,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  museumRewardToast: {
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    marginBottom: 14,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
  },
  museumRewardGlow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  museumRewardConfettiLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  museumRewardConfetti: {
    position: 'absolute',
    color: '#A855F7',
    fontSize: 24,
    fontWeight: '900',
  },
  museumRewardConfettiOne: {
    left: 24,
    top: 14,
  },
  museumRewardConfettiTwo: {
    right: 32,
    top: 18,
  },
  museumRewardConfettiThree: {
    bottom: 14,
    right: 76,
  },
  museumRewardTitle: {
    color: '#C2410C',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  museumRewardLabel: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  museumRewardName: {
    color: '#3B245F',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 27,
    marginTop: 2,
    textAlign: 'center',
  },
  badgeWallHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeWallTitle: {
    color: '#4C2D6F',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  badgeWallCount: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  badgeWallList: {
    gap: 10,
    paddingTop: 12,
  },
  museumBadgeCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 116,
    minHeight: 88,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF7D6',
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
  },
  museumBadgeLocked: {
    borderColor: '#E9D5FF',
    backgroundColor: '#F7EEFF',
    shadowColor: '#A855F7',
    shadowOpacity: 0.06,
  },
  museumBadgeEmoji: {
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 4,
  },
  museumBadgeName: {
    color: '#4C2D6F',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    textAlign: 'center',
    width: '100%',
  },
  museumBadgeLockedText: {
    color: '#9B7BB7',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    textAlign: 'center',
    width: '100%',
  },
  customMuseumPanel: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFF9EB',
    marginTop: 16,
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  customMuseumTitle: {
    color: '#4C2D6F',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
  },
  customMuseumForm: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  customMuseumInput: {
    flex: 1,
    minHeight: 46,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFFFFF',
    color: '#3B245F',
    fontSize: 15,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  customMuseumEmojiInput: {
    flex: 0,
    textAlign: 'center',
    width: 68,
  },
  customMuseumButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
  },
  customMuseumButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  addMuseumBox: {
    borderTopWidth: 1,
    borderColor: '#F3D8A6',
    marginTop: 16,
    paddingTop: 16,
  },
  addMuseumToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addMuseumToggleText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '900',
  },
  destinationList: {
    gap: 9,
    marginTop: 12,
  },
  destinationTitle: {
    color: '#8A5E22',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    marginTop: 4,
  },
  destinationButton: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#F8EEFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  destinationButtonText: {
    color: '#4C2D6F',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  destinationEmptyText: {
    color: '#8A6B9F',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  customMuseumList: {
    gap: 12,
    marginTop: 16,
  },
  customMuseumCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFFDF7',
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  customMuseumHeader: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  customMuseumName: {
    color: '#4C2D6F',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 23,
  },
  customMuseumMeta: {
    color: '#9A6A19',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
    marginTop: 2,
  },
  customMuseumHeaderActions: {
    alignItems: 'flex-end',
    gap: 7,
  },
  iconTextButton: {
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  iconTextButtonText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
  },
  iconTextButtonDanger: {
    borderRadius: 999,
    backgroundColor: '#FFF1E6',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  iconTextButtonDangerText: {
    color: '#C2410C',
    fontSize: 12,
    fontWeight: '900',
  },
  customMuseumActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  smallMuseumButton: {
    borderRadius: 999,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  smallMuseumButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  smallMuseumButtonSoft: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  smallMuseumButtonSoftText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
  },
  customItemList: {
    gap: 10,
    paddingTop: 12,
  },
  customItemCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    minHeight: 138,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 11,
  },
  moveItemButton: {
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  moveItemButtonText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
  },
  movePanel: {
    borderTopWidth: 1,
    borderColor: '#F3D8A6',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
  },
  collectionHeader: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  collectionTitle: {
    color: '#4C2D6F',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
  },
  albumStatsCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFF7ED',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  albumStatBlock: {
    flex: 1,
  },
  albumStatLabel: {
    color: '#9A6A19',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
  },
  albumPercent: {
    color: '#7C3AED',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    marginTop: 2,
  },
  collectionCountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  collectionCount: {
    color: '#9A6A19',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
  },
  collectionCountNumber: {
    color: '#7C3AED',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
  },
  albumSections: {
    gap: 16,
    paddingTop: 14,
  },
  albumCategory: {
    borderTopWidth: 1,
    borderColor: '#F3D8A6',
    paddingTop: 14,
  },
  albumCategoryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  albumCategoryTitle: {
    color: '#4C2D6F',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  albumCategoryCount: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  unlockBanner: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    marginHorizontal: 18,
    marginTop: 12,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  unlockGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
  },
  unlockNewText: {
    color: '#C2410C',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    textAlign: 'center',
  },
  unlockStickerText: {
    color: '#4C2D6F',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
    marginTop: 2,
    textAlign: 'center',
  },
  collectionMessagePill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginHorizontal: 18,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  collectionMessageText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
  },
  collectionList: {
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  artifactStoryCard: {
    width: 236,
    minHeight: 170,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    paddingHorizontal: 13,
    paddingVertical: 13,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
  },
  artifactStoryCardRare: {
    borderColor: '#93C5FD',
    backgroundColor: '#EFF6FF',
    shadowColor: '#2563EB',
    shadowOpacity: 0.16,
  },
  artifactStoryCardEpic: {
    borderColor: '#C084FC',
    backgroundColor: '#FAF5FF',
    shadowColor: '#A855F7',
    shadowOpacity: 0.18,
  },
  artifactStoryCardLegendary: {
    borderColor: '#F7C948',
    backgroundColor: '#FFF7D6',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.24,
  },
  artifactSparkle: {
    color: '#F59E0B',
    fontSize: 22,
    lineHeight: 28,
    position: 'absolute',
    right: 12,
    top: 10,
    zIndex: 2,
  },
  artifactStoryTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingRight: 22,
  },
  artifactStoryEmoji: {
    fontSize: 42,
    lineHeight: 50,
  },
  artifactStoryNameBlock: {
    flex: 1,
  },
  artifactStoryZh: {
    color: '#3B245F',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 23,
  },
  artifactStoryEn: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
    marginTop: 1,
  },
  artifactRarity: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    color: '#6D28D9',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    marginTop: 10,
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  artifactMeta: {
    color: '#8A5E22',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 18,
    marginTop: 6,
  },
  artifactExpandedArea: {
    borderTopWidth: 1,
    borderColor: '#F3D8A6',
    marginTop: 9,
    paddingTop: 8,
  },
  artifactFact: {
    color: '#4C2D6F',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
    marginTop: 7,
  },
  artifactToggleText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    marginTop: 9,
  },
  collectionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 94,
    minHeight: 118,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
  },
  collectionItemNew: {
    borderColor: '#F7C948',
    backgroundColor: '#FFFBEB',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.22,
    shadowRadius: 18,
  },
  mysteryItem: {
    borderColor: '#E9D5FF',
    backgroundColor: '#F7EEFF',
    borderStyle: 'dashed',
    shadowColor: '#A855F7',
    shadowOpacity: 0.06,
  },
  collectionEmoji: {
    fontSize: 38,
    lineHeight: 46,
    marginBottom: 6,
  },
  collectionZh: {
    color: '#3B245F',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    textAlign: 'center',
    width: '100%',
  },
  collectionEn: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    marginTop: 2,
    textAlign: 'center',
    width: '100%',
  },
  mysteryEmoji: {
    fontSize: 34,
    lineHeight: 42,
    marginBottom: 6,
    opacity: 0.74,
  },
  mysteryTitle: {
    color: '#6D28D9',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
    textAlign: 'center',
    width: '100%',
  },
  mysteryText: {
    color: '#9B7BB7',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
    marginTop: 2,
    textAlign: 'center',
    width: '100%',
  },
  emptyCollectionText: {
    color: '#8A6B9F',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
    paddingHorizontal: 18,
    paddingTop: 14,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 58,
    borderRadius: 24,
    backgroundColor: '#7C3AED',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  buttonHovered: {
    backgroundColor: '#6D28D9',
  },
  buttonGlow: {
    position: 'absolute',
    top: -34,
    left: -18,
    width: 150,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FDE68A',
    transform: [{ rotate: '-16deg' }],
  },
  buttonFlow: {
    position: 'absolute',
    top: -34,
    bottom: -34,
    width: 62,
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F0C36A',
    backgroundColor: '#FFF9EB',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  secondaryButtonPressed: {
    backgroundColor: '#FCEEC8',
    transform: [{ scale: 0.99 }],
  },
  secondaryButtonHovered: {
    borderColor: '#D8A531',
    backgroundColor: '#FFF4D4',
  },
  secondaryButtonText: {
    color: '#7C3AED',
    fontSize: 18,
    fontWeight: '900',
  },
});
