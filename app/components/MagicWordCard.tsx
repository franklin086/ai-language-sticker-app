import { Animated, Pressable, Text, View } from 'react-native';
import { getRarityVisualStyles } from '../utils/rarity';
import { MuseumProgressCard, type MuseumProgress } from './MuseumProgressCard';

type ComponentStyles = Record<string, any>;
type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';

type RecognitionResult = {
  object_en: string;
  object_zh: string;
  confidence: string;
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
      <Text style={styles.chineseWord}>{result.object_zh || '未命名藏品'}</Text>
      <Text style={styles.englishWord}>{result.object_en || 'unnamed artifact'}</Text>
      <Text style={styles.rarityLine}>稀有度：{rarityLabel}</Text>
      <Text style={styles.confidenceLine}>
        {confidenceLabel}: {confidenceText}
      </Text>
      <View style={styles.artifactStoryBox}>
        <Text style={styles.artifactStoryTitle}>📖 藏品故事</Text>
        <Text style={styles.artifactStoryText}>{artifactFact}</Text>
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
