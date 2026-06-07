import { KnowledgeCategory } from './knowledgeCategories';
import type { SupportedLanguage } from '../i18n/translations';

export type KnowledgeCollection = {
  category: KnowledgeCategory;
  emoji: string;
  id: string;
  titleTranslations: Record<SupportedLanguage, string>;
};

export const knowledgeCollections: KnowledgeCollection[] = [
  {
    category: KnowledgeCategory.ANIMALS,
    emoji: '🐼',
    id: 'ANIMALS_BOOK',
    titleTranslations: {
      zh: '动物知识册',
      en: 'Animal Knowledge Book',
      es: 'Libro de animales',
      pt: 'Livro dos animais',
      ja: '動物知識ブック',
    },
  },
  {
    category: KnowledgeCategory.TECHNOLOGY,
    emoji: '🚀',
    id: 'TECHNOLOGY_BOOK',
    titleTranslations: {
      zh: '科技知识册',
      en: 'Technology Knowledge Book',
      es: 'Libro de tecnología',
      pt: 'Livro de tecnologia',
      ja: 'テクノロジー知識ブック',
    },
  },
  {
    category: KnowledgeCategory.CIVILIZATION,
    emoji: '🏛',
    id: 'CIVILIZATION_BOOK',
    titleTranslations: {
      zh: '文明知识册',
      en: 'Civilization Knowledge Book',
      es: 'Libro de civilización',
      pt: 'Livro de civilização',
      ja: '文明知識ブック',
    },
  },
  {
    category: KnowledgeCategory.ART,
    emoji: '🎨',
    id: 'ART_BOOK',
    titleTranslations: {
      zh: '艺术知识册',
      en: 'Art Knowledge Book',
      es: 'Libro de arte',
      pt: 'Livro de arte',
      ja: '芸術知識ブック',
    },
  },
  {
    category: KnowledgeCategory.ARCHITECTURE,
    emoji: '🏰',
    id: 'ARCHITECTURE_BOOK',
    titleTranslations: {
      zh: '建筑知识册',
      en: 'Architecture Knowledge Book',
      es: 'Libro de arquitectura',
      pt: 'Livro de arquitetura',
      ja: '建築知識ブック',
    },
  },
  {
    category: KnowledgeCategory.OCEAN,
    emoji: '🌊',
    id: 'OCEAN_BOOK',
    titleTranslations: {
      zh: '海洋知识册',
      en: 'Ocean Knowledge Book',
      es: 'Libro del océano',
      pt: 'Livro do oceano',
      ja: '海洋知識ブック',
    },
  },
  {
    category: KnowledgeCategory.WORLD_CULTURE,
    emoji: '🌎',
    id: 'WORLD_CULTURE_BOOK',
    titleTranslations: {
      zh: '世界文化知识册',
      en: 'World Culture Knowledge Book',
      es: 'Libro de cultura mundial',
      pt: 'Livro de cultura mundial',
      ja: '世界文化知識ブック',
    },
  },
];
