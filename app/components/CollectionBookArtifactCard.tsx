import { Text, View } from 'react-native';
import { useContentLanguage } from '../hooks/useContentLanguage';
import { useLanguage } from '../hooks/useLanguage';
import { getCollectionBookRarityLabel, type CollectionBookArtifact } from '../utils/museumCollectionsBookHelpers';
import { AudioButton } from './AudioButton';

export function CollectionBookArtifactCard({ item }: { item: CollectionBookArtifact }) {
  const { getArtifactName } = useContentLanguage();
  const { t } = useLanguage();

  if (!item.discovered) {
    return (
      <View
        style={{
          backgroundColor: '#F8F5FF',
          borderColor: '#DDD6FE',
          borderRadius: 16,
          borderWidth: 1,
          flexBasis: '48%',
          marginTop: 10,
          minWidth: 138,
          opacity: 0.58,
          padding: 12,
        }}
      >
        <Text style={{ fontSize: 30, textAlign: 'center' }}>❓</Text>
        <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
          {t('mysterious_artifact')}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 11, fontWeight: '800', marginTop: 5, textAlign: 'center' }}>
          {t('unknown')}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FBBF24',
        borderRadius: 16,
        borderWidth: 1,
        flexBasis: '48%',
        marginTop: 10,
        minWidth: 138,
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 30, textAlign: 'center' }}>{item.artifact.emoji}</Text>
      <Text numberOfLines={1} style={{ color: '#5B21B6', fontSize: 13, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
        {getArtifactName(item.artifact)}
      </Text>
      <Text numberOfLines={1} style={{ color: '#7C3AED', fontSize: 11, fontWeight: '800', marginTop: 4, textAlign: 'center' }}>
        {item.artifact.objectEn}
      </Text>
      <Text style={{ color: '#B45309', fontSize: 11, fontWeight: '900', marginTop: 6, textAlign: 'center' }}>
        {getCollectionBookRarityLabel(item.rarity)}
      </Text>
      <Text numberOfLines={1} style={{ color: '#6D28D9', fontSize: 10, fontWeight: '700', marginTop: 4, textAlign: 'center' }}>
        {item.artifact.museum}
      </Text>
      <AudioButton artifact={item.artifact} />
    </View>
  );
}
