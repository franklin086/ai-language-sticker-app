import { Pressable, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

type ComponentStyles = Record<string, any>;

export function CollectionArtifactCard({
  emoji,
  isSelected,
  objectEn,
  objectZh,
  onPress,
  rarityCardStyle,
  styles,
}: {
  emoji: string;
  isSelected: boolean;
  objectEn: string;
  objectZh: string;
  onPress: () => void;
  rarityCardStyle?: StyleProp<ViewStyle>;
  styles: ComponentStyles;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.galleryArtifactCard, rarityCardStyle, isSelected && styles.galleryArtifactSelected]}
    >
      <Text style={styles.galleryArtifactEmoji}>{emoji}</Text>
      <Text numberOfLines={1} style={styles.galleryArtifactZh}>
        {objectZh}
      </Text>
      <Text numberOfLines={1} style={styles.galleryArtifactEn}>
        {objectEn}
      </Text>
    </Pressable>
  );
}
