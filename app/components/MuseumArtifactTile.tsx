import { Pressable, Text, View } from 'react-native';
import { useContentLanguage } from '../hooks/useContentLanguage';
import { useLanguage } from '../hooks/useLanguage';
import { findMuseumArtifact } from '../utils/artifactHelpers';
import type { MuseumExplorerArtifact } from '../utils/museumExplorerHelpers';
import { AudioButton } from './AudioButton';

export function MuseumArtifactTile({
  artifact,
  onPress,
  rarityLabel,
}: {
  artifact: MuseumExplorerArtifact;
  onPress: () => void;
  rarityLabel: string;
}) {
  const { getArtifactName } = useContentLanguage();
  const { t } = useLanguage();
  const museumArtifact = findMuseumArtifact({
    object_en: artifact.exhibit.object_en,
    object_zh: artifact.exhibit.object_zh,
  });

  if (!artifact.discovered) {
    return (
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.58)',
          borderColor: '#DDD6FE',
          borderRadius: 16,
          borderStyle: 'dashed',
          borderWidth: 1,
          minWidth: 132,
          opacity: 0.68,
          padding: 12,
        }}
      >
        <Text style={{ fontSize: 28, textAlign: 'center' }}>🔒</Text>
        <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
          {t('mysterious_artifact')}
        </Text>
        <Text style={{ color: '#8B5CF6', fontSize: 11, fontWeight: '700', marginTop: 5, textAlign: 'center' }}>
          {t('unknown')}
        </Text>
      </View>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#FBBF24',
          borderRadius: 16,
          borderWidth: 1,
          minWidth: 132,
          padding: 12,
          shadowColor: '#F59E0B',
          shadowOpacity: 0.12,
          shadowRadius: 10,
        }}
      >
        <Text style={{ fontSize: 30, textAlign: 'center' }}>{artifact.item?.emoji ?? artifact.exhibit.emoji}</Text>
        <Text numberOfLines={1} style={{ color: '#5B21B6', fontSize: 13, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
          {museumArtifact ? getArtifactName(museumArtifact) : artifact.exhibit.object_zh}
        </Text>
        <Text numberOfLines={1} style={{ color: '#7C3AED', fontSize: 11, fontWeight: '700', marginTop: 4, textAlign: 'center' }}>
          {artifact.exhibit.object_en}
        </Text>
        <Text style={{ color: '#B45309', fontSize: 11, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
          {rarityLabel}
        </Text>
        <View
          style={{
            backgroundColor: '#FFF7D6',
            borderColor: '#FBBF24',
            borderRadius: 999,
            borderWidth: 1,
            marginTop: 8,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
        >
          <Text style={{ color: '#7C3AED', fontSize: 11, fontWeight: '900', textAlign: 'center' }}>📖 读故事</Text>
        </View>
        <AudioButton artifact={museumArtifact ?? artifact.exhibit} />
      </View>
    </Pressable>
  );
}
