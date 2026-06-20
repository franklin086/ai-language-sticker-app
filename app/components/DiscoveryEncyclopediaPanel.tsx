import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useDiscoveryEncyclopedia } from '../hooks/useDiscoveryEncyclopedia';
import { useContentLanguage } from '../hooks/useContentLanguage';
import { useLanguage } from '../hooks/useLanguage';
import type { TranslationKey } from '../i18n/translations';
import { getPrimaryArtifactFact } from '../utils/artifactFactHelpers';
import {
  canRevealArtifactLearningContent,
  getLockedLearningContentMessage,
  warnIfLearningContentBlocked,
} from '../utils/discoveryRuleHelpers';
import type { EncyclopediaFilterKey, EncyclopediaSortKey } from '../utils/discoveryEncyclopediaHelpers';
import { getKnowledgeCategory } from '../utils/knowledgeCategoryHelpers';
import { getCollectionBookRarityLabel } from '../utils/museumCollectionsBookHelpers';
import { DiscoveryFactCard } from './DiscoveryFactCard';
import { EncyclopediaArtifactCard } from './EncyclopediaArtifactCard';
import { EncyclopediaSection } from './EncyclopediaSection';
import { KnowledgeCategoryBadge } from './KnowledgeCategoryBadge';
import { LearningBackButton } from './LearningBackButton';

const filterLabelKeys: Record<EncyclopediaFilterKey, TranslationKey> = {
  all: 'all',
  unlocked: 'discovered',
  locked: 'locked',
};

const sortLabelKeys: Record<EncyclopediaSortKey, TranslationKey> = {
  latest: 'latest_discovery',
  az: 'az',
  rarity: 'rarity',
};

export function DiscoveryEncyclopediaPanel({
  collection,
  museumCollectedIds,
  onBack,
  preferredArtifactId = null,
}: Parameters<typeof useDiscoveryEncyclopedia>[0] & {
  onBack: () => void;
  preferredArtifactId?: string | null;
}) {
  const encyclopedia = useDiscoveryEncyclopedia({ collection, museumCollectedIds, preferredArtifactId });
  const { getArtifactDescription, getArtifactName } = useContentLanguage();
  const { currentLanguage, t } = useLanguage();
  const selectedEntry = encyclopedia.selectedEntry;
  const canRevealSelectedEntry = selectedEntry ? canRevealArtifactLearningContent(selectedEntry.discovered) : false;
  const selectedStory = selectedEntry?.artifact.story?.trim() || '更多资料正在完善中';
  const selectedFact = selectedEntry?.fact?.trim() || '更多资料正在完善中';

  useEffect(() => {
    if (!selectedEntry) {
      return;
    }

    warnIfLearningContentBlocked({
      artifactId: selectedEntry.id,
      context: 'DiscoveryEncyclopediaPanel',
      discovered: selectedEntry.discovered,
    });
  }, [selectedEntry]);

  return (
    <View>
      <LearningBackButton label={t('back')} onPress={onBack} />

      <Text style={{ color: '#6D28D9', fontSize: 23, fontWeight: '900', lineHeight: 30, marginTop: 14, textAlign: 'center' }}>
        {t('magic_discovery_encyclopedia')}
      </Text>

      <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 1, marginTop: 12, padding: 12 }}>
        <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', lineHeight: 20, textAlign: 'center' }}>
          📚 百科是完整资料页。
        </Text>
        <Text style={{ color: '#92400E', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 4, textAlign: 'center' }}>
          如果你刚发现这个藏品，建议先读故事，再学知识。
        </Text>
      </View>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900', lineHeight: 21 }}>{t('encyclopedia_completion')}</Text>
        <Text style={{ color: '#B45309', fontSize: 28, fontWeight: '900', marginTop: 8 }}>
          {encyclopedia.completionPercent}%
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 4 }}>
          {t('unlocked')}: {encyclopedia.unlockedCount} / {encyclopedia.totalCount}
        </Text>
        <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 10, overflow: 'hidden' }}>
          <View
            style={{
              backgroundColor: '#FBBF24',
              borderRadius: 999,
              height: '100%',
              width: `${encyclopedia.completionPercent}%`,
            }}
          />
        </View>
      </View>

      <View style={{ gap: 10, marginTop: 14 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {encyclopedia.filters.map((filter) => {
            const active = filter.key === encyclopedia.filterKey;

            return (
              <Pressable
                key={filter.key}
                style={{
                  backgroundColor: active ? '#8B5CF6' : '#FFFFFF',
                  borderColor: active ? '#7C3AED' : '#C4B5FD',
                  borderRadius: 999,
                  borderWidth: 1,
                  paddingHorizontal: 11,
                  paddingVertical: 7,
                }}
                onPress={() => encyclopedia.setFilterKey(filter.key)}
              >
                <Text style={{ color: active ? '#FFFFFF' : '#6D28D9', fontSize: 12, fontWeight: '900', lineHeight: 17, textAlign: 'center' }}>
                  {t(filterLabelKeys[filter.key])}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {encyclopedia.sortOptions.map((sortOption) => {
            const active = sortOption.key === encyclopedia.sortKey;

            return (
              <Pressable
                key={sortOption.key}
                style={{
                  backgroundColor: active ? '#FBBF24' : '#FFFFFF',
                  borderColor: active ? '#F59E0B' : '#FDE68A',
                  borderRadius: 999,
                  borderWidth: 1,
                  paddingHorizontal: 11,
                  paddingVertical: 7,
                }}
                onPress={() => encyclopedia.setSortKey(sortOption.key)}
              >
                <Text style={{ color: active ? '#92400E' : '#6D28D9', fontSize: 12, fontWeight: '900', lineHeight: 17, textAlign: 'center' }}>
                  {t(sortLabelKeys[sortOption.key])}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {selectedEntry ? (
        <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
          {canRevealSelectedEntry ? (
            <>
              <Text style={{ fontSize: 42, textAlign: 'center' }}>{selectedEntry.artifact.emoji}</Text>
              <Text style={{ color: '#6D28D9', fontSize: 19, fontWeight: '900', lineHeight: 25, marginTop: 8, textAlign: 'center' }}>
                {getArtifactName(selectedEntry.artifact)}
              </Text>
              <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 4, textAlign: 'center' }}>
                {selectedEntry.artifact.objectEn}
              </Text>
              <KnowledgeCategoryBadge
                category={getKnowledgeCategory(selectedEntry.artifact)}
                language={currentLanguage}
              />
              <Text style={{ color: '#92400E', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 8, textAlign: 'center' }}>
                {getArtifactDescription(selectedEntry.artifact)}
              </Text>

              <View
                style={{
                  backgroundColor: '#FFF7D6',
                  borderColor: '#FBBF24',
                  borderRadius: 18,
                  borderWidth: 2,
                  marginTop: 12,
                  padding: 12,
                }}
              >
                <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900', textAlign: 'center' }}>
                  先读故事，理解它为什么有趣。
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#7C3AED',
                    borderRadius: 999,
                    marginTop: 9,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '900' }}>📖 读故事</Text>
                </View>
              </View>

              <EncyclopediaSection title={`📖 ${t('story')}`}>
                <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18 }}>{selectedStory}</Text>
              </EncyclopediaSection>

              <EncyclopediaSection title={`🏛 ${t('collection')}`}>
                <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18 }}>
                  {t('museum')}: {selectedEntry.artifact.museum}
                  {selectedEntry.countryName ? `\n${t('country')}: ${selectedEntry.countryName}` : ''}
                  {selectedEntry.cityName ? `\n${t('city')}: ${selectedEntry.cityName}` : ''}
                  {selectedEntry.relatedLeagues.length ? `\n${t('related_leagues')}: ${selectedEntry.relatedLeagues.join(' / ')}` : ''}
                  {selectedEntry.relatedSets.length ? `\n${t('related_sets')}: ${selectedEntry.relatedSets.join(' / ')}` : ''}
                  {`\n${t('rarity')}: ${getCollectionBookRarityLabel(selectedEntry.rarity)}`}
                  {`\n${t('status')}: ${t('discovered')}`}
                </Text>
              </EncyclopediaSection>

              <DiscoveryFactCard
                category={getKnowledgeCategory(selectedEntry.artifact)}
                fact={getPrimaryArtifactFact(selectedEntry.artifact, currentLanguage)}
                language={currentLanguage}
              />

              <EncyclopediaSection title={`🔍 ${t('you_know')}`}>
                <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18 }}>{selectedFact}</Text>
              </EncyclopediaSection>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 42, textAlign: 'center' }}>❓</Text>
              <Text style={{ color: '#6D28D9', fontSize: 20, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
                {t('mysterious_artifact')}
              </Text>
              <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
                {t('unknown')}
              </Text>
              <EncyclopediaSection title={`🏛 ${t('collection')}`}>
                <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18 }}>
                  {t('status')}: {t('locked')}
                  {`\n${getLockedLearningContentMessage()}`}
                </Text>
              </EncyclopediaSection>
            </>
          )}
        </View>
      ) : null}

      <ScrollView style={{ maxHeight: 360, marginTop: 12 }} contentContainerStyle={{ paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' }}>
          {encyclopedia.entries.map((entry) => (
            <EncyclopediaArtifactCard
              entry={entry}
              key={entry.id}
              onPress={() => encyclopedia.selectArtifact(entry.id)}
              selected={entry.id === encyclopedia.selectedArtifactId}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
