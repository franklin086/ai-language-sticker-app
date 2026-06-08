import type { TranslationKey } from '../i18n/translations';

export type GuildView =
  | 'collectionsBook'
  | 'collectionSets'
  | 'knowledgeCollections'
  | 'explorerAcademy'
  | 'learningProfile'
  | 'learningDashboard';

export type NavigationItem = {
  id: GuildView;
  labelKey: TranslationKey;
};

export const guildNavigationItems: NavigationItem[] = [
  { id: 'collectionsBook', labelKey: 'open_collection_book' },
  { id: 'collectionSets', labelKey: 'magic_collection_sets' },
  { id: 'knowledgeCollections', labelKey: 'knowledge_collections' },
  { id: 'explorerAcademy', labelKey: 'explorer_academy' },
  { id: 'learningDashboard', labelKey: 'learning_dashboard' },
  { id: 'learningProfile', labelKey: 'learning_profile' },
];
