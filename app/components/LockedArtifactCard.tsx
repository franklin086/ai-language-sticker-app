import { Pressable, Text } from 'react-native';

type ComponentStyles = Record<string, any>;

export function LockedArtifactCard({
  isSelected,
  lockedEmoji,
  lockedName,
  mysteryName,
  onPress,
  styles,
}: {
  isSelected: boolean;
  lockedEmoji: string;
  lockedName: string;
  mysteryName: string;
  onPress: () => void;
  styles: ComponentStyles;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.galleryArtifactCard,
        styles.galleryArtifactLocked,
        isSelected && styles.galleryArtifactSelected,
      ]}
    >
      <Text style={styles.galleryArtifactEmoji}>{lockedEmoji}</Text>
      <Text numberOfLines={1} style={styles.galleryArtifactZh}>
        {lockedName}
      </Text>
      <Text numberOfLines={1} style={styles.galleryArtifactEn}>
        {mysteryName}
      </Text>
    </Pressable>
  );
}
