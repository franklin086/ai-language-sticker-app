import type { SupportedLanguage } from '../i18n/translations';
import type { MuseumArtifact, MuseumArtifactTranslations } from '../data/museumArtifacts';

type ArtifactLike = {
  objectEn?: string;
  objectZh?: string;
  object_en?: string;
  object_zh?: string;
};

function getTranslatedValue(translations: MuseumArtifactTranslations | undefined, language: SupportedLanguage) {
  if (!translations) {
    return '';
  }

  return translations[language] || translations.en || translations.zh || '';
}

export function getLocalizedArtifactName(artifact: MuseumArtifact | ArtifactLike, language: SupportedLanguage) {
  if ('nameTranslations' in artifact) {
    const translatedName = getTranslatedValue(artifact.nameTranslations, language);

    if (translatedName) {
      return translatedName;
    }
  }

  const objectEn = 'objectEn' in artifact ? artifact.objectEn : artifact.object_en;
  const objectZh = 'objectZh' in artifact ? artifact.objectZh : artifact.object_zh;

  return objectEn || objectZh || '';
}

export function getLocalizedArtifactDescription(artifact: MuseumArtifact, language: SupportedLanguage) {
  return getTranslatedValue(artifact.descriptionTranslations, language) || artifact.story;
}
