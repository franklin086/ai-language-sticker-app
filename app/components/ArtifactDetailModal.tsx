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

function DetailAction({
  label,
  onPress,
  tone,
  variant = 'secondary',
}: {
  label: string;
  onPress: () => void;
  tone: 'gold' | 'purple' | 'blue';
  variant?: 'primary' | 'secondary';
}) {
  const colors = {
    blue: { background: '#EDE9FE', border: '#A78BFA', pressed: '#DDD6FE', text: '#5B21B6' },
    gold: { background: '#FFF7D6', border: '#FBBF24', pressed: '#FDE68A', text: '#7C3AED' },
    purple: { background: '#F5E8FF', border: '#C4B5FD', pressed: '#DDD6FE', text: '#6D28D9' },
  }[tone];

  return (
    <Pressable
      style={({ pressed }) => ({
        alignItems: 'center',
        backgroundColor: pressed ? colors.pressed : colors.background,
        borderColor: colors.border,
        borderRadius: 16,
        borderWidth: variant === 'primary' ? 2 : 1,
        flex: 1,
        flexBasis: variant === 'primary' ? '100%' : undefined,
        minWidth: 120,
        paddingHorizontal: variant === 'primary' ? 12 : 10,
        paddingVertical: variant === 'primary' ? 12 : 10,
      })}
      onPress={onPress}
    >
      <Text style={{ color: colors.text, fontSize: variant === 'primary' ? 14 : 12, fontWeight: '900', lineHeight: variant === 'primary' ? 20 : 17, textAlign: 'center' }}>{label}</Text>
    </Pressable>
  );
}

export function ArtifactDetailModal({
  exhibit,
  formatConfidence,
  formatDiscoveredAt,
  getGalleryArtifactDetails,
  getStickerCategory,
  hasQuiz,
  item,
  museum,
  onChallenge,
  onClose,
  onContinueDiscover,
  onLearnKnowledge,
  onOpenEncyclopedia,
  onShare,
  onSpeakChinese,
  onSpeakEnglish,
  onViewProgress,
  speakButtonScale,
  speakingLanguage,
  styles,
}: {
  exhibit: MuseumExhibit;
  item: CollectionItem;
  museum: MagicMuseum;
  onChallenge: () => void;
  onClose: () => void;
  onContinueDiscover: () => void;
  onLearnKnowledge: () => void;
  onOpenEncyclopedia?: () => void;
  onShare: () => void;
  onSpeakChinese: () => void;
  onSpeakEnglish: () => void;
  onViewProgress: () => void;
  speakButtonScale: Animated.AnimatedInterpolation<string | number>;
  speakingLanguage: 'zh' | 'en' | null;
  styles: ComponentStyles;
  getGalleryArtifactDetails: (exhibit: MuseumExhibit, collection: CollectionItem[]) => GalleryArtifactDetails;
  getStickerCategory: (item: RecognitionResult) => StickerCategoryKey;
  formatDiscoveredAt: (discoveredAt: string) => string;
  formatConfidence: (confidence: string) => string;
  hasQuiz: boolean;
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
            <Text style={styles.artifactDetailStoryFirstText}>📖 故事：先理解这个藏品为什么有趣。</Text>
            <View style={styles.artifactDetailStoryFirstButton}>
              <Text style={styles.artifactDetailStoryFirstButtonText}>📖 读故事</Text>
            </View>
          </View>
          <View style={styles.artifactDetailStoryBox}>
            <Text style={styles.artifactDetailStoryTitle}>📖 故事</Text>
            <Text style={styles.artifactStoryText}>{details.story}</Text>
          </View>
          <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 16, borderWidth: 1, marginTop: 10, padding: 11 }}>
            <Text style={{ color: '#92400E', fontSize: 12, fontWeight: '900', lineHeight: 18 }}>
              先读故事，理解它为什么重要。
              再看知识，记住一个关键点。
              最后查百科，了解更多背景。
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            <DetailAction label="🧠 学知识" onPress={onLearnKnowledge} tone="purple" variant="primary" />
            <DetailAction label={hasQuiz ? '🎯 去挑战' : '✨ 继续发现'} onPress={hasQuiz ? onChallenge : onContinueDiscover} tone="blue" />
            <DetailAction label="📊 看进度" onPress={onViewProgress} tone="gold" />
          </View>
          {onOpenEncyclopedia ? (
            <Pressable
              style={({ pressed }) => ({
                alignItems: 'center',
                backgroundColor: pressed ? '#FEF3C7' : '#FFFFFF',
                borderColor: '#FBBF24',
                borderRadius: 999,
                borderWidth: 1,
                marginTop: 8,
                paddingHorizontal: 12,
                paddingVertical: 9,
              })}
              onPress={onOpenEncyclopedia}
            >
              <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '900', lineHeight: 17, textAlign: 'center' }}>📚 查百科</Text>
            </Pressable>
          ) : null}
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