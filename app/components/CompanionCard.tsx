import { Animated, Text, View } from 'react-native';

type CompanionState = { level: number; mood: string; title: string; unlockedMessages: string[]; xp: number };

type ComponentStyles = Record<string, any>;

export function CompanionCard({
  companionMessage,
  companionState,
  companionXpPerLevel,
  floatOpacity,
  floatTranslateY,
  isRecognizing,
  latestCompanionTitle,
  styles,
}: {
  companionMessage: string;
  companionState: CompanionState;
  companionXpPerLevel: number;
  floatOpacity: Animated.AnimatedInterpolation<string | number>;
  floatTranslateY: Animated.AnimatedInterpolation<string | number>;
  isRecognizing: boolean;
  latestCompanionTitle: string;
  styles: ComponentStyles;
}) {
  return (
    <>
      <Animated.View
        style={[styles.companionCard, { opacity: floatOpacity, transform: [{ translateY: floatTranslateY }] }]}
      >
        <Text style={styles.companionAvatar}>🦉</Text>
        <View style={styles.companionBubble}>
          <Text style={styles.companionName}>小猫头鹰</Text>
          <Text style={styles.companionLevel}>
            Lv{companionState.level} · {companionState.title}
          </Text>
          <Text style={styles.companionMood}>心情：{companionState.mood}</Text>
          <View style={styles.companionXpTrack}>
            <View
              style={[
                styles.companionXpFill,
                { width: `${Math.min(100, (companionState.xp / companionXpPerLevel) * 100)}%` as `${number}%` },
              ]}
            />
          </View>
          <Text style={styles.companionMessage}>{companionMessage}</Text>
          <Text style={styles.companionMessage}>
            {isRecognizing ? '我正在帮你看这是什么...' : '每天回来，都会有新的魔法奖励！'}
          </Text>
        </View>
      </Animated.View>
      {latestCompanionTitle ? (
        <View style={styles.companionLevelToast}>
          <Text style={styles.companionLevelToastTitle}>🎉 伙伴升级！</Text>
          <Text style={styles.companionLevelToastText}>获得新称号：{latestCompanionTitle}</Text>
        </View>
      ) : null}
    </>
  );
}
