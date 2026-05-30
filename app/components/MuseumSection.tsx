import { ScrollView, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { CollectionArtifactCard } from './CollectionArtifactCard';
import { LockedArtifactCard } from './LockedArtifactCard';

type ComponentStyles = Record<string, any>;

export type MuseumSectionArtifact = {
  discovered: boolean;
  emoji: string;
  id: string;
  isSelected: boolean;
  objectEn: string;
  objectZh: string;
  onPress: () => void;
  rarityCardStyle?: StyleProp<ViewStyle>;
};

export function MuseumSection({
  artifacts,
  collectedCount,
  lockedEmoji,
  lockedName,
  museumEmoji,
  museumPercent,
  museumTitle,
  mysteryName,
  styles,
  totalCount,
}: {
  artifacts: MuseumSectionArtifact[];
  collectedCount: number;
  lockedEmoji: string;
  lockedName: string;
  museumEmoji: string;
  museumPercent: number;
  museumTitle: string;
  mysteryName: string;
  styles: ComponentStyles;
  totalCount: number;
}) {
  return (
    <View style={styles.galleryMuseumCard}>
      <View style={styles.galleryMuseumHeader}>
        <Text style={styles.galleryMuseumTitle}>
          {museumEmoji} {museumTitle}
        </Text>
        <Text style={styles.galleryMuseumCount}>
          {collectedCount} / {totalCount} · {museumPercent}%
        </Text>
      </View>
      <View style={styles.galleryProgressTrack}>
        <View style={[styles.galleryProgressFill, { width: `${museumPercent}%` as `${number}%` }]} />
      </View>
      <ScrollView contentContainerStyle={styles.galleryArtifactList} horizontal showsHorizontalScrollIndicator={false}>
        {artifacts.map((artifact) =>
          artifact.discovered ? (
            <CollectionArtifactCard
              key={artifact.id}
              emoji={artifact.emoji}
              isSelected={artifact.isSelected}
              objectEn={artifact.objectEn}
              objectZh={artifact.objectZh}
              onPress={artifact.onPress}
              rarityCardStyle={artifact.rarityCardStyle}
              styles={styles}
            />
          ) : (
            <LockedArtifactCard
              key={artifact.id}
              isSelected={artifact.isSelected}
              lockedEmoji={lockedEmoji}
              lockedName={lockedName}
              mysteryName={mysteryName}
              onPress={artifact.onPress}
              styles={styles}
            />
          ),
        )}
      </ScrollView>
    </View>
  );
}
