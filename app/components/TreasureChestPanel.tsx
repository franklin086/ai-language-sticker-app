import { Animated, Text } from 'react-native';

type ComponentStyles = Record<string, any>;

export function TreasureChestPanel({
  chestGlowScale,
  chestOpened,
  chestOpacity,
  chestReward,
  chestScale,
  chestRewardLabel,
  chestOpenedLabel,
  chestTitleLabel,
  chestHintLabel,
  starTwinkleOpacity,
  starTwinkleScale,
  styles,
}: {
  chestGlowScale: Animated.AnimatedInterpolation<string | number>;
  chestOpened: boolean;
  chestOpacity: Animated.AnimatedInterpolation<string | number>;
  chestReward: string;
  chestScale: Animated.AnimatedInterpolation<string | number>;
  chestRewardLabel: string;
  chestOpenedLabel: string;
  chestTitleLabel: string;
  chestHintLabel: string;
  starTwinkleOpacity: Animated.AnimatedInterpolation<string | number>;
  starTwinkleScale: Animated.AnimatedInterpolation<string | number>;
  styles: ComponentStyles;
}) {
  return (
    <Animated.View
      style={[
        styles.chestCard,
        chestOpened && styles.chestCardOpen,
        chestOpened && {
          opacity: chestOpacity,
          transform: [{ scale: chestScale }],
        },
      ]}
    >
      {chestOpened ? (
        <>
          <Animated.View pointerEvents="none" style={[styles.chestGlow, { transform: [{ scale: chestGlowScale }] }]} />
          <Animated.View pointerEvents="none" style={styles.chestConfettiLayer}>
            <Animated.Text
              style={[
                styles.chestConfetti,
                styles.chestConfettiOne,
                { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
              ]}
            >
              🎄
            </Animated.Text>
            <Animated.Text
              style={[
                styles.chestConfetti,
                styles.chestConfettiTwo,
                { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
              ]}
            >
              ✨
            </Animated.Text>
            <Animated.Text
              style={[
                styles.chestConfetti,
                styles.chestConfettiThree,
                { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
              ]}
            >
              🎉
            </Animated.Text>
          </Animated.View>
          <Text style={styles.chestEmoji}>🎁</Text>
          <Text style={styles.chestOpenTitle}>{chestOpenedLabel}</Text>
          <Text style={styles.chestOpenText}>{chestRewardLabel}</Text>
          <Text style={styles.chestRewardText}>{chestReward}</Text>
        </>
      ) : (
        <>
          <Text style={styles.chestEmoji}>🎁</Text>
          <Text style={styles.chestTitle}>{chestTitleLabel}</Text>
          <Text style={styles.chestHint}>{chestHintLabel}</Text>
        </>
      )}
    </Animated.View>
  );
}
