import { Pressable, Text, View } from 'react-native';
import type { MuseumExplorerArtifact } from '../utils/museumExplorerHelpers';

export function MuseumArtifactTile({
  artifact,
  onPress,
  rarityLabel,
}: {
  artifact: MuseumExplorerArtifact;
  onPress: () => void;
  rarityLabel: string;
}) {
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
          神秘藏品
        </Text>
        <Text style={{ color: '#8B5CF6', fontSize: 11, fontWeight: '700', marginTop: 5, textAlign: 'center' }}>
          继续探索解锁
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
          {artifact.exhibit.object_zh}
        </Text>
        <Text numberOfLines={1} style={{ color: '#7C3AED', fontSize: 11, fontWeight: '700', marginTop: 4, textAlign: 'center' }}>
          {artifact.exhibit.object_en}
        </Text>
        <Text style={{ color: '#B45309', fontSize: 11, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
          {rarityLabel}
        </Text>
      </View>
    </Pressable>
  );
}
