export type WorldMapCity = {
  cityId: string;
  emoji: string;
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
];
