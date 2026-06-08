import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { getRarityVisualStyles } from '../utils/rarity';

type RecognitionResult = {
  object_en: string;
  object_zh: string;
  specific_en?: string;
  specific_zh?: string;
  brand?: string;
  subtype?: string;
  confidence: string;
  needs_follow_up?: boolean;
  follow_up_question?: string;
};
type CollectionItem = RecognitionResult & { discoveredAt: string; emoji: string };
type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';
type MuseumExhibit = { emoji: string; id: string; keywords: string[]; object_en: string; object_zh: string };
type MagicMuseum = { emoji: string; exhibits: MuseumExhibit[]; id: string; title: string };
type GalleryArtifactDetails = { discoveredAt: string; emoji: string; rarityLabel: string; story: string };

type ComponentStyles = Record<string, any>;

function SpeechButton({
  active,
  label,
  onPress,
  scale,
  styles,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  scale: Animated.AnimatedInterpolation<string | number>;
  styles: ComponentStyles;
}) {
  return (
    <Animated.View style={active ? { transform: [{ scale }] } : undefined}>
      <Pressable
        style={({ pressed }) => [
          styles.speechButton,
          active && styles.speechButtonActive,
          pressed && styles.speechButtonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.speechButtonText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export function ArtifactDetailModal({
  exhibit,
  item,
  museum,
  onClose,
  onShare,
  onSpeakChinese,
  onSpeakEnglish,
  speakButtonScale,
  speakingLanguage,
  styles,
  getGalleryArtifactDetails,
  getStickerCategory,
  formatDiscoveredAt,
  formatConfidence,
}: {
  exhibit: MuseumExhibit;
  item: CollectionItem;
  museum: MagicMuseum;
  onClose: () => void;
  onShare: () => void;
  onSpeakChinese: () => void;
  onSpeakEnglish: () => void;
  speakButtonScale: Animated.AnimatedInterpolation<string | number>;
  speakingLanguage: 'zh' | 'en' | null;
  styles: ComponentStyles;
  getGalleryArtifactDetails: (exhibit: MuseumExhibit, collection: CollectionItem[]) => GalleryArtifactDetails;
  getStickerCategory: (item: RecognitionResult) => StickerCategoryKey;
  formatDiscoveredAt: (discoveredAt: string) => string;
  formatConfidence: (confidence: string) => string;
}) {
  const details = getGalleryArtifactDetails(exhibit, [item]);
  const rarityCategory = getStickerCategory(item);
  const rarityVisual = getRarityVisualStyles(rarityCategory, styles as Parameters<typeof getRarityVisualStyles>[1]);
  const baseZh = item.object_zh || exhibit.object_zh;
  const baseEn = item.object_en || exhibit.object_en;
  const specificZh = item.specific_zh?.trim() || baseZh;
  const specificEn = item.specific_en?.trim() || baseEn;

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible>
      <View style={styles.artifactDetailOverlay}>
        <Pressable style={styles.artifactDetailBackdrop} onPress={onClose} />
        <View style={[styles.artifactDetailCard, rarityVisual.card]}>
          {rarityCategory === 'legendary' ? (
            <View style={styles.legendaryBanner}>
              <Text style={styles.legendaryBannerTitle}>🌈 LEGENDARY!</Text>
              <Text style={styles.legendaryBannerText}>✨ 传奇发现！</Text>
            </View>
          ) : null}
          <Text style={[styles.artifactDetailSparkle, styles.artifactDetailSparkleOne]}>✨</Text>
          <Text style={[styles.artifactDetailSparkle, styles.artifactDetailSparkleTwo]}>🌟</Text>
          <Text style={styles.artifactDetailKicker}>Magic Encyclopedia</Text>
          <View style={[styles.artifactDetailEmojiStage, rarityVisual.emojiStage]}>
            {rarityCategory === 'legendary' ? (
              <Text style={[styles.raritySparkle, styles.raritySparkleOne]}>✨</Text>
            ) : null}
            {rarityCategory === 'legendary' ? (
              <Text style={[styles.raritySparkle, styles.raritySparkleTwo]}>🌟</Text>
            ) : null}
            <Text style={styles.artifactDetailEmoji}>{details.emoji}</Text>
          </View>
          <Text style={styles.artifactDetailZh}>{specificZh}</Text>
          <Text style={styles.artifactDetailEn}>{specificEn}</Text>
          <View style={styles.artifactDetailStoryFirstBox}>
            <Text style={styles.artifactDetailStoryFirstText}>先了解这个藏品背后的故事</Text>
            <View style={styles.artifactDetailStoryFirstButton}>
              <Text style={styles.artifactDetailStoryFirstButtonText}>📖 阅读故事</Text>
            </View>
          </View>
          <View style={styles.artifactDetailStoryBox}>
            <Text style={styles.artifactDetailStoryTitle}>📖 藏品故事</Text>
            <Text style={styles.artifactDetailStoryText}>{details.story}</Text>
          </View>
          <View style={styles.artifactDetailInfoBox}>
            <Text style={styles.artifactDetailMeta}>基础词：{baseZh} / {baseEn}</Text>
            <Text style={styles.artifactDetailMeta}>具体识别：{specificZh} / {specificEn}</Text>
            <Text style={styles.artifactDetailMeta}>所属博物馆：{museum.title}</Text>
            <Text style={styles.artifactDetailMeta}>稀有度：{details.rarityLabel}</Text>
            <Text style={styles.artifactDetailMeta}>首次发现：{formatDiscoveredAt(item.discoveredAt)}</Text>
            <Text style={styles.artifactDetailMeta}>Confidence：{formatConfidence(item.confidence)}</Text>
          </View>
          <View style={styles.artifactDetailSpeechRow}>
            <SpeechButton
              styles={styles}
              active={speakingLanguage === 'zh'}
              label="🔊 中文发音"
              onPress={onSpeakChinese}
              scale={speakButtonScale}
            />
            <SpeechButton
              styles={styles}
              active={speakingLanguage === 'en'}
              label="🔊 English"
              onPress={onSpeakEnglish}
              scale={speakButtonScale}
            />
          </View>
          <Pressable style={({ pressed }) => [styles.shareButton, pressed && styles.shareButtonPressed]} onPress={onShare}>
            <Text style={styles.shareButtonText}>📸 生成分享卡</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.artifactDetailCloseButton, pressed && styles.shareButtonPressed]} onPress={onClose}>
            <Text style={styles.artifactDetailCloseText}>关闭</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
