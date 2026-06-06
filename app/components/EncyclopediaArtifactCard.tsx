import { Pressable, Text } from 'react-native';
import { useContentLanguage } from '../hooks/useContentLanguage';
import { useLanguage } from '../hooks/useLanguage';
import { getCollectionBookRarityLabel } from '../utils/museumCollectionsBookHelpers';
import type { EncyclopediaArtifactEntry } from '../utils/discoveryEncyclopediaHelpers';

export function EncyclopediaArtifactCard({
  entry,
  onPress,
  selected,
}: {
  entry: EncyclopediaArtifactEntry;
  onPress: () => void;
  selected: boolean;
}) {
  const { getArtifactName } = useContentLanguage();
  const { t } = useLanguage();

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: entry.discovered ? '#FFFFFF' : '#F8F5FF',
        borderColor: selected ? '#8B5CF6' : entry.discovered ? '#FBBF24' : '#DDD6FE',
        borderRadius: 16,
        borderWidth: selected ? 2 : 1,
        flexBasis: '48%',
        marginTop: 10,
        minWidth: 138,
        opacity: entry.discovered ? 1 : 0.58,
        padding: 12,
        transform: pressed ? [{ scale: 0.98 }] : [],
      })}
      onPress={onPress}
    >
      <Text style={{ fontSize: 30, textAlign: 'center' }}>{entry.discovered ? entry.artifact.emoji : '❓'}</Text>
      <Text numberOfLines={1} style={{ color: '#5B21B6', fontSize: 13, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
        {entry.discovered ? getArtifactName(entry.artifact) : t('mysterious_artifact')}
      </Text>
      <Text numberOfLines={1} style={{ color: '#7C3AED', fontSize: 11, fontWeight: '800', marginTop: 4, textAlign: 'center' }}>
        {entry.discovered ? entry.artifact.objectEn : t('unknown')}
      </Text>
      {entry.discovered ? (
        <Text style={{ color: '#B45309', fontSize: 11, fontWeight: '900', marginTop: 6, textAlign: 'center' }}>
          {getCollectionBookRarityLabel(entry.rarity)}
        </Text>
      ) : null}
    </Pressable>
  );
}
