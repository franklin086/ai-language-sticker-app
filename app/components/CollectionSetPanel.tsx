import { Pressable, ScrollView, Text, View } from 'react-native';
import { useCollectionSets } from '../hooks/useCollectionSets';
import { useLanguage } from '../hooks/useLanguage';
import { CollectionSetCard } from './CollectionSetCard';

export function CollectionSetPanel({
  collection,
  museumCollectedIds,
  onBack,
}: Parameters<typeof useCollectionSets>[0] & {
  onBack: () => void;
}) {
  const collectionSetState = useCollectionSets({ collection, museumCollectedIds });
  const { t } = useLanguage();

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
        <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>{t('back_to_guild')}</Text>
      </Pressable>

      <Text style={{ color: '#6D28D9', fontSize: 25, fontWeight: '900', marginTop: 14, textAlign: 'center' }}>
        {t('magic_collection_sets')}
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
        {t('collection_sets')}
      </Text>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{t('total_completion')}</Text>
        <Text style={{ color: '#B45309', fontSize: 28, fontWeight: '900', marginTop: 8 }}>
          {collectionSetState.completionPercent}%
        </Text>
        <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 10, overflow: 'hidden' }}>
          <View
            style={{
              backgroundColor: '#FBBF24',
              borderRadius: 999,
              height: '100%',
              width: `${collectionSetState.completionPercent}%`,
            }}
          />
        </View>
      </View>

      <ScrollView style={{ maxHeight: 460, marginTop: 14 }} contentContainerStyle={{ paddingBottom: 8 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{t('latest_discovery')}</Text>
        <CollectionSetCard highlighted set={collectionSetState.closestSet} />

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>{t('collection_sets')}</Text>
        {collectionSetState.sets.map((set) => (
          <CollectionSetCard key={set.id} set={set} />
        ))}
      </ScrollView>
    </View>
  );
}
