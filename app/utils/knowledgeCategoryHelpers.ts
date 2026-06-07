import {
  KnowledgeCategory,
  knowledgeCategoryMeta,
  knowledgeCategoryOrder,
} from '../data/knowledgeCategories';
import { museumArtifacts, type MuseumArtifact } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';

function normalizeKnowledgeText(value: string) {
  return value.trim().toLowerCase();
}

function getKnowledgeSearchText(artifact: MuseumArtifact) {
  return [
    artifact.objectZh,
    artifact.objectEn,
    artifact.museum,
    artifact.story,
    ...(artifact.aliases ?? []),
    ...Object.values(artifact.nameTranslations ?? {}),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function searchTextIncludes(searchText: string, keywords: string[]) {
  return keywords.some((keyword) => searchText.includes(normalizeKnowledgeText(keyword)));
}

export function getKnowledgeCategory(artifact: MuseumArtifact) {
  const searchText = getKnowledgeSearchText(artifact);

  if (searchTextIncludes(searchText, knowledgeCategoryMeta[KnowledgeCategory.OCEAN].keywords)) {
    return KnowledgeCategory.OCEAN;
  }

  if (searchTextIncludes(searchText, knowledgeCategoryMeta[KnowledgeCategory.ARCHITECTURE].keywords)) {
    return KnowledgeCategory.ARCHITECTURE;
  }

  for (const category of knowledgeCategoryOrder) {
    if (category === KnowledgeCategory.OCEAN || category === KnowledgeCategory.ARCHITECTURE) {
      continue;
    }

    if (searchTextIncludes(searchText, knowledgeCategoryMeta[category].keywords)) {
      return category;
    }
  }

  return KnowledgeCategory.WORLD_CULTURE;
}

export function getKnowledgeCategoryLabel(category: KnowledgeCategory, language: SupportedLanguage) {
  const meta = knowledgeCategoryMeta[category];

  return meta.labels[language] || meta.labels.en || meta.labels.zh;
}

export function getKnowledgeCategoryEmoji(category: KnowledgeCategory) {
  return knowledgeCategoryMeta[category].emoji;
}

export function getArtifactsByKnowledgeCategory(category: KnowledgeCategory) {
  return museumArtifacts.filter((artifact) => getKnowledgeCategory(artifact) === category);
}
