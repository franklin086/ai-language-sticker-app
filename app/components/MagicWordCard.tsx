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

function ActionButton({
  label,
  onPress,
  tone,
  variant = 'secondary',
}: {
  label: string;
  onPress: () => void;
  tone: 'gold' | 'purple' | 'blue' | 'white';
  variant?: 'primary' | 'secondary';
}) {
  const colors = {
    blue: { background: '#EDE9FE', border: '#A78BFA', pressed: '#DDD6FE', text: '#5B21B6' },
    gold: { background: '#FFF7D6', border: '#FBBF24', pressed: '#FDE68A', text: '#7C3AED' },
    purple: { background: '#F5E8FF', border: '#C4B5FD', pressed: '#DDD6FE', text: '#6D28D9' },
    white: { background: '#FFFFFF', border: '#E9D5FF', pressed: '#F5E8FF', text: '#6D28D9' },
  }[tone];

  return (
    <Pressable
      style={({ pressed }) => ({
        alignItems: 'center',
        backgroundColor: pressed ? colors.pressed : colors.background,
        borderColor: colors.border,
        borderRadius: 999,
        borderWidth: variant === 'primary' ? 2 : 1,
        flexBasis: variant === 'primary' ? '100%' : undefined,
        flexGrow: 1,
        paddingHorizontal: variant === 'primary' ? 14 : 11,
        paddingVertical: variant === 'primary' ? 12 : 9,
      })}
      onPress={onPress}
    >
      <Text style={{ color: colors.text, fontSize: variant === 'primary' ? 14 : 12, fontWeight: '900', lineHeight: variant === 'primary' ? 20 : 17, textAlign: 'center' }}>
        {label}
      </Text>
    </Pressable>
  );
}

export function MagicWordCard({
  artifactFact,
  celebrateText,
  confidenceLabel,
  confidenceText,
  foundTitle,
  hasQuiz,
  isKnownArtifact = true,
  magicEmoji,
  museumProgress,
  onChallenge,
  onLearnKnowledge,
  onReadStory,
  onShare,
  onSpeakChinese,
  onSpeakEnglish,
  onViewProgress,
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
  hasQuiz: boolean;
  isKnownArtifact?: boolean;
  magicEmoji: string;
  museumProgress: MuseumProgress | null;
  onChallenge: () => void;
  onLearnKnowledge: () => void;
  onReadStory: () => void;
  onShare: () => void;
  onSpeakChinese: () => void;
  onSpeakEnglish: () => void;
  onViewProgress: () => void;
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
          <Text style={styles.legendaryBannerTitle}>🌈 传奇发现！</Text>
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
      {isKnownArtifact ? (
        <>
          <View style={styles.artifactStoryBox}>
            <Text style={styles.artifactStoryTitle}>📖 藏品故事</Text>
            <Text style={styles.artifactStoryText}>{artifactFact}</Text>
          </View>
          <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 1, marginTop: 12, padding: 12 }}>
            <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900' }}>下一步</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 9 }}>
              <ActionButton label="📖 读故事" onPress={onReadStory} tone="gold" variant="primary" />
              <ActionButton label="🧠 学知识" onPress={onLearnKnowledge} tone="purple" />
              <ActionButton label={hasQuiz ? '🎯 去挑战' : '✨ 继续发现'} onPress={onChallenge} tone="blue" />
              <ActionButton label="📊 看进度" onPress={onViewProgress} tone="white" />
            </View>
          </View>
          {museumProgress ? <MuseumProgressCard progress={museumProgress} styles={styles} /> : null}
          <Pressable style={({ pressed }) => [styles.shareButton, pressed && styles.shareButtonPressed]} onPress={onShare}>
            <Text style={styles.shareButtonText}>{shareButtonLabel}</Text>
          </Pressable>
        </>
      ) : (
        <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 1, marginTop: 12, padding: 12 }}>
          <Text style={{ color: '#7C2D12', fontSize: 14, fontWeight: '900', lineHeight: 20 }}>
            识别到了：{displayZh} / {displayEn}
          </Text>
          <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '700', lineHeight: 20, marginTop: 6 }}>
            这个物品还没有加入魔法博物馆，可以继续发现其他藏品。
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            <ActionButton label="✨ 继续发现" onPress={onChallenge} tone="gold" variant="primary" />
          </View>
        </View>
      )}
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