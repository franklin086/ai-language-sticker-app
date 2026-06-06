import { useLanguage } from './useLanguage';
import { getLocalizedArtifactDescription, getLocalizedArtifactName } from '../utils/contentLanguageHelpers';
import type { MuseumArtifact } from '../data/museumArtifacts';

type ArtifactLike = Parameters<typeof getLocalizedArtifactName>[0];

export function useContentLanguage() {
  const { currentLanguage } = useLanguage();

  return {
    currentLanguage,
    getArtifactDescription: (artifact: MuseumArtifact) => getLocalizedArtifactDescription(artifact, currentLanguage),
    getArtifactName: (artifact: ArtifactLike) => getLocalizedArtifactName(artifact, currentLanguage),
  };
}
