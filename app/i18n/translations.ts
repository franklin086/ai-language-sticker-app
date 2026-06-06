export const SUPPORTED_LANGUAGES = ['zh', 'en', 'es', 'pt', 'ja'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type TranslationKey =
  | 'achievement'
  | 'all'
  | 'az'
  | 'back'
  | 'back_to_collection_book'
  | 'back_to_guild'
  | 'best_streak'
  | 'category_animal'
  | 'category_art'
  | 'category_civilization'
  | 'category_nature'
  | 'category_technology'
  | 'category_world_culture'
  | 'city'
  | 'cities'
  | 'close'
  | 'collection'
  | 'collection_book'
  | 'collection_book_completion'
  | 'collection_sets'
  | 'completed'
  | 'confidence'
  | 'country'
  | 'current_event'
  | 'current_expedition'
  | 'current_story'
  | 'daily_streak'
  | 'daily_streak_hint'
  | 'days'
  | 'discovered'
  | 'discovered_count'
  | 'discovered_first'
  | 'done'
  | 'encyclopedia'
  | 'encyclopedia_completion'
  | 'english'
  | 'explored_today'
  | 'exploring'
  | 'filter_category'
  | 'guild_connected'
  | 'guild_connected_body'
  | 'guild_headquarters'
  | 'guild_welcome'
  | 'language'
  | 'league_badge'
  | 'league_count'
  | 'league_list'
  | 'latest_discovery'
  | 'locked'
  | 'locked_first'
  | 'magic_collection_sets'
  | 'magic_discovery_encyclopedia'
  | 'magic_museum_league'
  | 'milestone_list'
  | 'milestone_reached'
  | 'mission_board'
  | 'missing'
  | 'museum'
  | 'mysterious_artifact'
  | 'next_goal'
  | 'next_milestone'
  | 'not_explored_today'
  | 'not_started'
  | 'open'
  | 'open_collection_book'
  | 'passport'
  | 'progress'
  | 'rarity'
  | 'related_leagues'
  | 'related_sets'
  | 'return_home'
  | 'reward_preview'
  | 'seasonal_events'
  | 'seasonal_events_hint'
  | 'sort_mode'
  | 'status'
  | 'story'
  | 'theme'
  | 'today_status'
  | 'total_completion'
  | 'unknown'
  | 'unlocked'
  | 'world_expedition'
  | 'world_expedition_hint'
  | 'world_map'
  | 'world_memory'
  | 'you_know';

type TranslationTable = Record<TranslationKey, string>;

export const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
];

const zh: TranslationTable = {
  achievement: '成就',
  all: '全部',
  az: 'A-Z',
  back: '返回',
  back_to_collection_book: '← 返回收藏册',
  back_to_guild: '← 返回公会总部',
  best_streak: '历史最高',
  category_animal: '动物',
  category_art: '艺术',
  category_civilization: '文明',
  category_nature: '自然',
  category_technology: '科技',
  category_world_culture: '世界文化',
  city: '所属城市',
  cities: '城市',
  close: '关闭',
  collection: '收藏',
  collection_book: '魔法收藏册',
  collection_book_completion: '收藏册完成度',
  collection_sets: '收藏套装',
  completed: '已完成',
  confidence: '信心',
  country: '所属国家',
  current_event: '当前活动',
  current_expedition: '当前进行中的远征',
  current_story: '当前主线章节',
  daily_streak: '连续探索',
  daily_streak_hint: '每天回来看看，魔法世界会记得你的脚步',
  days: '天',
  discovered: '已发现',
  discovered_count: '已发现',
  discovered_first: '已发现优先',
  done: '完成',
  encyclopedia: '百科',
  encyclopedia_completion: '百科完成度',
  english: '英文',
  explored_today: '已探索',
  exploring: '探索中',
  filter_category: '分类切换',
  guild_connected: '公会入口已连接',
  guild_connected_body: '馆长等级、世界远征、主线剧情、魔法护照和世界地图都会在这里汇总显示。',
  guild_headquarters: '🏛 魔法探索者公会总部',
  guild_welcome: '欢迎回来，小馆长',
  language: '🌐 Language',
  league_badge: '联盟徽章',
  league_count: '联盟数量',
  league_list: '联盟列表',
  latest_discovery: '最新发现',
  locked: '未发现',
  locked_first: '未发现优先',
  magic_collection_sets: '🎁 魔法收藏套装',
  magic_discovery_encyclopedia: '📚 魔法发现百科',
  magic_museum_league: '魔法博物馆联盟',
  milestone_list: '里程碑列表',
  milestone_reached: '里程碑达成！',
  mission_board: '公会任务板',
  missing: '缺失',
  museum: '所属博物馆',
  mysterious_artifact: '神秘藏品',
  next_goal: '下一目标',
  next_milestone: '下一里程碑',
  not_explored_today: '今日还未探索',
  not_started: '未开始',
  open: '打开',
  open_collection_book: '📖 打开收藏册',
  passport: '护照',
  progress: '进度',
  rarity: '稀有度',
  related_leagues: '相关联盟',
  related_sets: '相关套装',
  return_home: '返回首页',
  reward_preview: '奖励预览',
  seasonal_events: '🎊 世界季节活动',
  seasonal_events_hint: '魔法世界正在发生新的变化',
  sort_mode: '排序方式',
  status: '状态',
  story: '藏品故事',
  theme: '主题',
  today_status: '今日状态',
  total_completion: '总完成度',
  unknown: '继续探索解锁',
  unlocked: '已解锁',
  world_expedition: '🌍 世界远征中心',
  world_expedition_hint: '跟着长期远征，知道下一步该探索什么',
  world_map: '世界地图',
  world_memory: '世界记忆',
  you_know: '你知道吗',
};

const en: TranslationTable = {
  achievement: 'Achievements',
  all: 'All',
  az: 'A-Z',
  back: 'Back',
  back_to_collection_book: '← Back to Collection Book',
  back_to_guild: '← Back to Guild',
  best_streak: 'Best Streak',
  category_animal: 'Animals',
  category_art: 'Art',
  category_civilization: 'Civilization',
  category_nature: 'Nature',
  category_technology: 'Technology',
  category_world_culture: 'World Culture',
  city: 'City',
  cities: 'Cities',
  close: 'Close',
  collection: 'Collection',
  collection_book: 'Magic Collection Book',
  collection_book_completion: 'Collection Book Progress',
  collection_sets: 'Collection Sets',
  completed: 'Completed',
  confidence: 'Confidence',
  country: 'Country',
  current_event: 'Current Event',
  current_expedition: 'Current Expedition',
  current_story: 'Current Story Chapter',
  daily_streak: 'Daily Streak',
  daily_streak_hint: 'Come back each day, and the magic world will remember your steps',
  days: 'days',
  discovered: 'Discovered',
  discovered_count: 'Discovered',
  discovered_first: 'Discovered First',
  done: 'Done',
  encyclopedia: 'Encyclopedia',
  encyclopedia_completion: 'Encyclopedia Progress',
  english: 'English',
  explored_today: 'Explored today',
  exploring: 'Exploring',
  filter_category: 'Category',
  guild_connected: 'Guild Links Connected',
  guild_connected_body: 'Curator rank, expeditions, storyline, passport, and world map are gathered here.',
  guild_headquarters: '🏛 Magic Explorer Guild',
  guild_welcome: 'Welcome back, little curator',
  language: '🌐 Language',
  league_badge: 'League Badge',
  league_count: 'League Count',
  league_list: 'League List',
  latest_discovery: 'Latest Discovery',
  locked: 'Locked',
  locked_first: 'Locked First',
  magic_collection_sets: '🎁 Magic Collection Sets',
  magic_discovery_encyclopedia: '📚 Discovery Encyclopedia',
  magic_museum_league: 'Magic Museum League',
  milestone_list: 'Milestones',
  milestone_reached: 'Milestone reached!',
  mission_board: 'Guild Mission Board',
  missing: 'Missing',
  museum: 'Museum',
  mysterious_artifact: 'Mysterious Artifact',
  next_goal: 'Next Goal',
  next_milestone: 'Next Milestone',
  not_explored_today: 'Not explored today',
  not_started: 'Not Started',
  open: 'Open',
  open_collection_book: '📖 Open Collection Book',
  passport: 'Passport',
  progress: 'Progress',
  rarity: 'Rarity',
  related_leagues: 'Related Leagues',
  related_sets: 'Related Sets',
  return_home: 'Back to Home',
  reward_preview: 'Reward Preview',
  seasonal_events: '🎊 Seasonal Events',
  seasonal_events_hint: 'The magic world is changing with the seasons',
  sort_mode: 'Sort',
  status: 'Status',
  story: 'Artifact Story',
  theme: 'Theme',
  today_status: 'Today',
  total_completion: 'Total Progress',
  unknown: 'Keep exploring to unlock',
  unlocked: 'Unlocked',
  world_expedition: '🌍 World Expedition Center',
  world_expedition_hint: 'Follow long-term expeditions to know what to explore next',
  world_map: 'World Map',
  world_memory: 'World Memory',
  you_know: 'Did You Know?',
};

const es: TranslationTable = {
  ...en,
  all: 'Todo',
  back: 'Volver',
  back_to_collection_book: '← Volver al álbum',
  back_to_guild: '← Volver al gremio',
  category_animal: 'Animales',
  category_art: 'Arte',
  category_civilization: 'Civilización',
  category_nature: 'Naturaleza',
  category_technology: 'Tecnología',
  category_world_culture: 'Cultura mundial',
  collection_book: 'Álbum mágico',
  collection_book_completion: 'Progreso del álbum',
  collection_sets: 'Sets de colección',
  completed: 'Completado',
  current_event: 'Evento actual',
  current_expedition: 'Expedición actual',
  current_story: 'Capítulo actual',
  daily_streak: 'Racha diaria',
  discovered: 'Descubierto',
  discovered_count: 'Descubiertos',
  encyclopedia: 'Enciclopedia',
  exploring: 'Explorando',
  guild_headquarters: '🏛 Gremio de Exploradores Mágicos',
  guild_welcome: 'Bienvenido de nuevo, pequeño curador',
  locked: 'Bloqueado',
  magic_collection_sets: '🎁 Sets mágicos',
  magic_discovery_encyclopedia: '📚 Enciclopedia mágica',
  magic_museum_league: 'Liga de Museos Mágicos',
  mysterious_artifact: 'Tesoro misterioso',
  not_started: 'Sin empezar',
  progress: 'Progreso',
  rarity: 'Rareza',
  return_home: 'Volver al inicio',
  seasonal_events: '🎊 Eventos de temporada',
  status: 'Estado',
  unknown: 'Sigue explorando para desbloquear',
  world_map: 'Mapa mundial',
};

const pt: TranslationTable = {
  ...en,
  all: 'Tudo',
  back: 'Voltar',
  back_to_collection_book: '← Voltar ao álbum',
  back_to_guild: '← Voltar à guilda',
  category_animal: 'Animais',
  category_art: 'Arte',
  category_civilization: 'Civilização',
  category_nature: 'Natureza',
  category_technology: 'Tecnologia',
  category_world_culture: 'Cultura mundial',
  collection_book: 'Álbum mágico',
  collection_book_completion: 'Progresso do álbum',
  collection_sets: 'Conjuntos',
  completed: 'Concluído',
  current_event: 'Evento atual',
  current_expedition: 'Expedição atual',
  current_story: 'Capítulo atual',
  daily_streak: 'Sequência diária',
  discovered: 'Descoberto',
  discovered_count: 'Descobertos',
  encyclopedia: 'Enciclopédia',
  exploring: 'Explorando',
  guild_headquarters: '🏛 Guilda dos Exploradores Mágicos',
  guild_welcome: 'Bem-vindo de volta, pequeno curador',
  locked: 'Bloqueado',
  magic_collection_sets: '🎁 Conjuntos mágicos',
  magic_discovery_encyclopedia: '📚 Enciclopédia mágica',
  magic_museum_league: 'Liga dos Museus Mágicos',
  mysterious_artifact: 'Tesouro misterioso',
  not_started: 'Não iniciado',
  progress: 'Progresso',
  rarity: 'Raridade',
  return_home: 'Voltar ao início',
  seasonal_events: '🎊 Eventos sazonais',
  unknown: 'Continue explorando para desbloquear',
  world_map: 'Mapa mundial',
};

const ja: TranslationTable = {
  ...en,
  all: 'すべて',
  back: '戻る',
  back_to_collection_book: '← コレクションに戻る',
  back_to_guild: '← ギルドに戻る',
  category_animal: '動物',
  category_art: '芸術',
  category_civilization: '文明',
  category_nature: '自然',
  category_technology: '科学技術',
  category_world_culture: '世界文化',
  collection_book: '魔法コレクションブック',
  collection_book_completion: 'コレクション進行度',
  collection_sets: 'コレクションセット',
  completed: '完了',
  current_event: '開催中イベント',
  current_expedition: '進行中の遠征',
  current_story: '現在の物語章',
  daily_streak: '連続探索',
  discovered: '発見済み',
  discovered_count: '発見済み',
  encyclopedia: '百科',
  exploring: '探索中',
  guild_headquarters: '🏛 魔法探索者ギルド',
  guild_welcome: 'おかえり、小さな館長さん',
  locked: '未発見',
  magic_collection_sets: '🎁 魔法コレクションセット',
  magic_discovery_encyclopedia: '📚 魔法発見百科',
  magic_museum_league: '魔法博物館リーグ',
  mysterious_artifact: '謎のコレクション',
  not_started: '未開始',
  progress: '進行度',
  rarity: 'レア度',
  return_home: 'ホームへ戻る',
  seasonal_events: '🎊 季節イベント',
  status: '状態',
  unknown: '探索を続けて解放',
  world_map: '世界地図',
};

export const translations: Record<SupportedLanguage, TranslationTable> = {
  zh,
  en,
  es,
  pt,
  ja,
};
