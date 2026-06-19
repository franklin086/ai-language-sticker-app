import { Animated, Pressable, Text, View } from 'react-native';
import { getRarityVisualStyles } from '../utils/rarity';
import { MuseumProgressCard, type MuseumProgress } from './MuseumProgressCard';

type ComponentStyles = Record<string, any>;
type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';

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

export function MagicWordCard({
  artifactFact,
  celebrateText,
  confidenceLabel,
  confidenceText,
  foundTitle,
  magicEmoji,
  museumProgress,
  onShare,
  onSpeakChinese,
  onSpeakEnglish,
  rarityCategory,
  rarityLabel,
  result,
  shareButtonLabel,
  speakButtonScale,
  speakingLanguage,
  styles,
}: {
  artifactFact: string;
  celebrateText: string;
  confidenceLabel: string;
  confidenceText: string;
  foundTitle: string;
  magicEmoji: string;
  museumProgress: MuseumProgress | null;
  onShare: () => void;
  onSpeakChinese: () => void;
  onSpeakEnglish: () => void;
  rarityCategory: StickerCategoryKey;
  rarityLabel: string;
  result: RecognitionResult;
  shareButtonLabel: string;
  speakButtonScale: Animated.AnimatedInterpolation<string | number>;
  speakingLanguage: 'zh' | 'en' | null;
  styles: ComponentStyles;
}) {
  const rarityVisual = getRarityVisualStyles(rarityCategory, styles as Parameters<typeof getRarityVisualStyles>[1]);
  const displayZh = result.specific_zh?.trim() || result.object_zh || '未命名藏品';
  const displayEn = result.specific_en?.trim() || result.object_en || 'unnamed artifact';

  return (
    <View style={[styles.wordCard, rarityVisual.card]}>
      {rarityCategory === 'legendary' ? (
        <View style={styles.legendaryBanner}>
          <Text style={styles.legendaryBannerTitle}>🌈 LEGENDARY!</Text>
          <Text style={styles.legendaryBannerText}>✨ 传奇发现！</Text>
        </View>
      ) : null}
      <Text style={styles.foundTitle}>{foundTitle}</Text>
      <Text style={styles.celebrateText}>{celebrateText}</Text>
      <View style={[styles.emojiStage, rarityVisual.emojiStage]}>
        {rarityCategory === 'legendary' ? (
          <Text style={[styles.raritySparkle, styles.raritySparkleOne]}>✨</Text>
        ) : null}
        {rarityCategory === 'legendary' ? (
          <Text style={[styles.raritySparkle, styles.raritySparkleTwo]}>🌟</Text>
        ) : null}
        <Text style={styles.magicEmoji}>{magicEmoji}</Text>
      </View>
      <Text style={styles.chineseWord}>{displayZh}</Text>
      <Text style={styles.englishWord}>{displayEn}</Text>
      <Text style={styles.rarityLine}>稀有度：{rarityLabel}</Text>
      <Text style={styles.confidenceLine}>
        {confidenceLabel}: {confidenceText}
      </Text>
      <View style={styles.artifactStoryBox}>
        <Text style={styles.artifactStoryTitle}>📖 藏品故事</Text>
        <Text style={styles.artifactStoryText}>{artifactFact}</Text>
      </View>
      <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 1, marginTop: 12, padding: 12 }}>
        <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900' }}>下一步</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 9 }}>
          <Text style={{ backgroundColor: '#FFF7D6', borderRadius: 999, color: '#7C3AED', fontSize: 12, fontWeight: '900', paddingHorizontal: 10, paddingVertical: 7 }}>📖 读故事</Text>
          <Text style={{ backgroundColor: '#F5E8FF', borderRadius: 999, color: '#6D28D9', fontSize: 12, fontWeight: '900', paddingHorizontal: 10, paddingVertical: 7 }}>🧠 学知识</Text>
          <Text style={{ backgroundColor: '#EDE9FE', borderRadius: 999, color: '#5B21B6', fontSize: 12, fontWeight: '900', paddingHorizontal: 10, paddingVertical: 7 }}>🎯 去挑战</Text>
        </View>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 9 }}>
          先读藏品故事，再学习知识点，最后用知识挑战巩固记忆。
        </Text>
      </View>
      {museumProgress ? <MuseumProgressCard progress={museumProgress} styles={styles} /> : null}
      <Pressable style={({ pressed }) => [styles.shareButton, pressed && styles.shareButtonPressed]} onPress={onShare}>
        <Text style={styles.shareButtonText}>{shareButtonLabel}</Text>
      </Pressable>
      <View style={styles.speechActions}>
        <SpeechButton
          active={speakingLanguage === 'zh'}
          label="🔊 中文发音"
          onPress={onSpeakChinese}
          scale={speakButtonScale}
          styles={styles}
        />
        <SpeechButton
          active={speakingLanguage === 'en'}
          label="🔊 English"
          onPress={onSpeakEnglish}
          scale={speakButtonScale}
          styles={styles}
        />
      </View>
    </View>
  );
}
