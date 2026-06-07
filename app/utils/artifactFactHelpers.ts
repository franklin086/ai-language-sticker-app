import { artifactFacts } from '../data/artifactFacts';
import type { MuseumArtifact } from '../data/museumArtifacts';
import type { SupportedLanguage } from '../i18n/translations';

function normalizeFactText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getArtifactFactCandidates(artifact: MuseumArtifact) {
  return [
    artifact.objectEn,
    artifact.objectZh,
    ...(artifact.aliases ?? []),
    ...Object.values(artifact.nameTranslations ?? {}),
  ].filter((value): value is string => Boolean(value?.trim()));
}

export function getArtifactFactKey(artifact: MuseumArtifact) {
  const candidates = getArtifactFactCandidates(artifact).map((candidate) => normalizeFactText(candidate));

  for (const key of Object.keys(artifactFacts)) {
    const normalizedKey = normalizeFactText(key);

    if (
      candidates.some(
        (candidate) =>
          candidate === normalizedKey ||
          candidate.includes(normalizedKey) ||
          normalizedKey.includes(candidate),
      )
    ) {
      return key;
    }
  }

  return null;
}

function getLocalizedFactValue(
  fact: Partial<Record<SupportedLanguage, string>>,
  language: SupportedLanguage,
) {
  return fact[language] || fact.en || fact.zh || null;
}

export function getArtifactFacts(artifact: MuseumArtifact, language: SupportedLanguage) {
  const factKey = getArtifactFactKey(artifact);

  if (!factKey) {
    return [];
  }

  return artifactFacts[factKey]
    .map((fact) => getLocalizedFactValue(fact, language))
    .filter((value): value is string => Boolean(value));
}

export function getPrimaryArtifactFact(artifact: MuseumArtifact, language: SupportedLanguage) {
  return getArtifactFacts(artifact, language)[0] ?? null;
}
