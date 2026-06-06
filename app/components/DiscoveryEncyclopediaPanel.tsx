import { Pressable, ScrollView, Text, View } from 'react-native';
import { useDiscoveryEncyclopedia } from '../hooks/useDiscoveryEncyclopedia';
import { useContentLanguage } from '../hooks/useContentLanguage';
import { useLanguage } from '../hooks/useLanguage';
import type { TranslationKey } from '../i18n/translations';
import type { EncyclopediaFilterKey, EncyclopediaSortKey } from '../utils/discoveryEncyclopediaHelpers';
import { getCollectionBookRarityLabel } from '../utils/museumCollectionsBookHelpers';
import { EncyclopediaArtifactCard } from './EncyclopediaArtifactCard';
import { EncyclopediaSection } from './EncyclopediaSection';

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
}: Parameters<typeof useDiscoveryEncyclopedia>[0] & {
  onBack: () => void;
}) {
  const encyclopedia = useDiscoveryEncyclopedia({ collection, museumCollectedIds });
  const { getArtifactDescription, getArtifactName } = useContentLanguage();
  const { t } = useLanguage();
  const selectedEntry = encyclopedia.selectedEntry;

  return (
    <View>
      <Pressable
        style={({ pressed }) => ({
          alignSelf: 'flex-start',
          backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
          borderColor: '#C4B5FD',
          borderRadius: 999,
          borderWidth: 1,
          paddingHorizontal: 12,
          paddingVertical: 8,
        })}
        onPress={onBack}
      >
        <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>{t('back_to_collection_book')}</Text>
      </Pressable>

      <Text style={{ color: '#6D28D9', fontSize: 25, fontWeight: '900', marginTop: 14, textAlign: 'center' }}>
        {t('magic_discovery_encyclopedia')}
      </Text>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{t('encyclopedia_completion')}</Text>
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
                <Text style={{ color: active ? '#FFFFFF' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>
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
                <Text style={{ color: active ? '#92400E' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>
                  {t(sortLabelKeys[sortOption.key])}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {selectedEntry ? (
        <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
          {selectedEntry.discovered ? (
            <>
              <Text style={{ fontSize: 42, textAlign: 'center' }}>{selectedEntry.artifact.emoji}</Text>
              <Text style={{ color: '#6D28D9', fontSize: 20, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
                {getArtifactName(selectedEntry.artifact)}
              </Text>
              <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 4, textAlign: 'center' }}>
                {selectedEntry.artifact.objectEn}
              </Text>
              <Text style={{ color: '#92400E', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 8, textAlign: 'center' }}>
                {getArtifactDescription(selectedEntry.artifact)}
              </Text>

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

              <EncyclopediaSection title={`📖 ${t('story')}`}>
                <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18 }}>{selectedEntry.artifact.story}</Text>
              </EncyclopediaSection>

              <EncyclopediaSection title={`🔍 ${t('you_know')}`}>
                <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18 }}>{selectedEntry.fact}</Text>
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
