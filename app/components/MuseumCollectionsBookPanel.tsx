import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { useMuseumCollectionsBook } from '../hooks/useMuseumCollectionsBook';
import { CollectionBookArtifactCard } from './CollectionBookArtifactCard';
import { CollectionBookFilterBar } from './CollectionBookFilterBar';
import { DiscoveryEncyclopediaPanel } from './DiscoveryEncyclopediaPanel';

export function MuseumCollectionsBookPanel({
  collection,
  museumCollectedIds,
  onBack,
}: Parameters<typeof useMuseumCollectionsBook>[0] & {
  onBack: () => void;
}) {
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const { t } = useLanguage();
  const book = useMuseumCollectionsBook({ collection, museumCollectedIds });

  if (showEncyclopedia) {
    return (
      <DiscoveryEncyclopediaPanel
        collection={collection}
        museumCollectedIds={museumCollectedIds}
        onBack={() => setShowEncyclopedia(false)}
      />
    );
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
            borderColor: '#C4B5FD',
            borderRadius: 999,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 8,
          })}
          onPress={onBack}
        >
          <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>{t('back_to_guild')}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#FEF3C7' : '#FFFFFF',
            borderColor: '#FBBF24',
            borderRadius: 999,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 8,
          })}
          onPress={() => setShowEncyclopedia(true)}
        >
          <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>📚 {t('encyclopedia')}</Text>
        </Pressable>
      </View>

      <Text style={{ color: '#6D28D9', fontSize: 25, fontWeight: '900', marginTop: 14, textAlign: 'center' }}>
        📖 {t('collection_book')}
      </Text>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{t('collection_book_completion')}</Text>
        <Text style={{ color: '#B45309', fontSize: 28, fontWeight: '900', marginTop: 8 }}>
          {book.completionPercent}%
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 4 }}>
          {t('discovered_count')}: {book.discoveredCount} / {book.totalCount}
        </Text>
        <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 10, overflow: 'hidden' }}>
          <View
            style={{
              backgroundColor: '#FBBF24',
              borderRadius: 999,
              height: '100%',
              width: `${book.completionPercent}%`,
            }}
          />
        </View>
      </View>

      <CollectionBookFilterBar
        activeFilterKey={book.filterKey}
        activeSortKey={book.sortKey}
        filters={book.filters}
        onChangeFilter={book.setFilterKey}
        onChangeSort={book.setSortKey}
        sortOptions={book.sortOptions}
      />

      <ScrollView style={{ maxHeight: 420, marginTop: 12 }} contentContainerStyle={{ paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' }}>
          {book.artifacts.map((item) => (
            <CollectionBookArtifactCard
              item={item}
              key={item.id}
              onPressStory={item.discovered ? () => setShowEncyclopedia(true) : undefined}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
