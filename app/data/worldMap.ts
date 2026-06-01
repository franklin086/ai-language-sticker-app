export type WorldMapMuseum = {
  emoji: string;
  id: string;
  linkedMuseumId: string;
  name: string;
};

export type WorldMapCity = {
  cityId: string;
  emoji: string;
  museums?: WorldMapMuseum[];
  name: string;
};

export type WorldMapCountry = {
  cities: WorldMapCity[];
  emoji: string;
  id: string;
  name: string;
};

export const worldMagicMap: WorldMapCountry[] = [
  {
    cities: [
      { cityId: 'shanghai', emoji: '🌆', name: '上海' },
      { cityId: 'beijing', emoji: '🏯', name: '北京' },
      { cityId: 'guangzhou', emoji: '🌸', name: '广州' },
      { cityId: 'shenzhen', emoji: '🌊', name: '深圳' },
    ],
    emoji: '🇨🇳',
    id: 'china',
    name: '中国',
  },
  {
    cities: [{ cityId: 'tokyo', emoji: '🗼', name: '东京' }],
    emoji: '🇯🇵',
    id: 'japan',
    name: '日本',
  },
  {
    cities: [{ cityId: 'new-york', emoji: '🗽', name: '纽约' }],
    emoji: '🇺🇸',
    id: 'usa',
    name: '美国',
  },
  {
    cities: [
      {
        cityId: 'paris',
        emoji: '🗼',
        museums: [
          { emoji: '🏛️', id: 'paris-louvre-magic', linkedMuseumId: 'paris-louvre-magic', name: '卢浮宫魔法馆' },
          { emoji: '🎨', id: 'paris-art', linkedMuseumId: 'paris-art', name: '巴黎艺术馆' },
        ],
        name: '巴黎',
      },
    ],
    emoji: '🇫🇷',
    id: 'france',
    name: '法国',
  },
  {
    cities: [
      {
        cityId: 'london',
        emoji: '🎡',
        museums: [
          { emoji: '🏺', id: 'london-british-civilization', linkedMuseumId: 'london-british-civilization', name: '大英文明馆' },
          { emoji: '🔬', id: 'london-science', linkedMuseumId: 'london-science', name: '伦敦科技馆' },
        ],
        name: '伦敦',
      },
    ],
    emoji: '🇬🇧',
    id: 'united-kingdom',
    name: '英国',
  },
  {
    cities: [
      {
        cityId: 'rome',
        emoji: '🏟️',
        museums: [
          { emoji: '🏛️', id: 'rome-ancient-civilization', linkedMuseumId: 'culture', name: '古罗马文明馆' },
          { emoji: '🎨', id: 'rome-renaissance-art', linkedMuseumId: 'culture', name: '文艺复兴艺术馆' },
        ],
        name: '罗马',
      },
    ],
    emoji: '🇮🇹',
    id: 'italy',
    name: '意大利',
  },
  {
    cities: [
      {
        cityId: 'madrid',
        emoji: '🌞',
        museums: [
          { emoji: '🎨', id: 'madrid-spanish-art', linkedMuseumId: 'culture', name: '西班牙艺术馆' },
          { emoji: '⛵', id: 'madrid-navigation-exploration', linkedMuseumId: 'traffic', name: '航海探索馆' },
        ],
        name: '马德里',
      },
    ],
    emoji: '🇪🇸',
    id: 'spain',
    name: '西班牙',
  },
  {
    cities: [
      {
        cityId: 'rio-de-janeiro',
        emoji: '🏖️',
        museums: [
          { emoji: '🌴', id: 'rio-tropical-nature', linkedMuseumId: 'nature', name: '热带自然馆' },
          { emoji: '⚽', id: 'rio-football-culture', linkedMuseumId: 'culture', name: '足球文化馆' },
        ],
        name: '里约热内卢',
      },
    ],
    emoji: '🇧🇷',
    id: 'brazil',
    name: '巴西',
  },
  {
    cities: [
      {
        cityId: 'mexico-city',
        emoji: '🌵',
        museums: [
          { emoji: '🛕', id: 'mexico-city-maya-civilization', linkedMuseumId: 'culture', name: '玛雅文明馆' },
          { emoji: '🏠', id: 'mexico-city-latin-life', linkedMuseumId: 'life', name: '拉美生活馆' },
        ],
        name: '墨西哥城',
      },
    ],
    emoji: '🇲🇽',
    id: 'mexico',
    name: '墨西哥',
  },
  {
    cities: [
      {
        cityId: 'cairo',
        emoji: '🔺',
        museums: [
          { emoji: '🔺', id: 'cairo-pyramid-civilization', linkedMuseumId: 'cairo-pyramid-civilization', name: '金字塔文明馆' },
          { emoji: '🌊', id: 'cairo-nile-nature', linkedMuseumId: 'cairo-nile-nature', name: '尼罗河自然馆' },
        ],
        name: '开罗',
      },
    ],
    emoji: '🇪🇬',
    id: 'egypt',
    name: '埃及',
  },
  {
    cities: [
      {
        cityId: 'new-delhi',
        emoji: '🕌',
        museums: [
          { emoji: '🕌', id: 'new-delhi-indian-civilization', linkedMuseumId: 'new-delhi-indian-civilization', name: '印度文明馆' },
          { emoji: '🌶️', id: 'new-delhi-spice-life', linkedMuseumId: 'new-delhi-spice-life', name: '香料生活馆' },
        ],
        name: '新德里',
      },
    ],
    emoji: '🇮🇳',
    id: 'india',
    name: '印度',
  },
  {
    cities: [
      {
        cityId: 'sydney',
        emoji: '🌉',
        museums: [
          { emoji: '🌊', id: 'sydney-ocean-nature', linkedMuseumId: 'sydney-ocean-nature', name: '海洋自然馆' },
          { emoji: '🦘', id: 'sydney-australian-animals', linkedMuseumId: 'sydney-australian-animals', name: '澳洲动物馆' },
        ],
        name: '悉尼',
      },
    ],
    emoji: '🇦🇺',
    id: 'australia',
    name: '澳大利亚',
  },
];
