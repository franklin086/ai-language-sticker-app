import { Animated, ScrollView, Text, View } from 'react-native';

type ComponentStyles = Record<string, any>;

type AchievementDefinition = {
  encouragement?: string;
  emoji: string;
  id: string;
  title: string;
};

export function AchievementPanel({
  achievementGlowScale,
  achievementOpacity,
  achievements,
  achievementScale,
  achievementTranslateY,
  latestAchievement,
  unlockedAchievementIds,
  styles,
}: {
  achievementGlowScale: Animated.AnimatedInterpolation<string | number>;
  achievementOpacity: Animated.AnimatedInterpolation<string | number>;
  achievements: AchievementDefinition[];
  achievementScale: Animated.AnimatedInterpolation<string | number>;
  achievementTranslateY: Animated.AnimatedInterpolation<string | number>;
  latestAchievement: AchievementDefinition | null;
  unlockedAchievementIds: string[];
  styles: ComponentStyles;
}) {
  const unlockedAchievements = achievements.filter((achievement) => unlockedAchievementIds.includes(achievement.id));
  const unlockedCount = unlockedAchievements.length;

  return (
    <View style={styles.achievementPanel}>
      {latestAchievement ? (
        <Animated.View
          style={[
            styles.achievementToast,
            {
              opacity: achievementOpacity,
              transform: [{ translateY: achievementTranslateY }, { scale: achievementScale }],
            },
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.achievementGlow, { transform: [{ scale: achievementGlowScale }]}]}
          />
          <View pointerEvents="none" style={styles.achievementConfettiLayer}>
            <Text style={[styles.achievementConfetti, styles.achievementConfettiOne]}>🎉</Text>
            <Text style={[styles.achievementConfetti, styles.achievementConfettiTwo]}>✨</Text>
            <Text style={[styles.achievementConfetti, styles.achievementConfettiThree]}>🏆</Text>
          </View>
          <Text style={styles.achievementSparkle}>✨</Text>
          <Text style={styles.achievementToastTitle}>✨ 成就解锁！</Text>
          <Text style={styles.achievementToastName}>
            {latestAchievement.emoji} {latestAchievement.title}
          </Text>
          <Text style={styles.achievementToastEncouragement}>
            {latestAchievement.encouragement ?? '新的魔法成就已经点亮！'}
          </Text>
        </Animated.View>
      ) : null}

      <View style={styles.achievementHeader}>
        <Text style={styles.achievementTitle}>🏆 魔法成就</Text>
        <Text style={styles.achievementCount}>
          已解锁 {unlockedCount} / {achievements.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.achievementList} horizontal showsHorizontalScrollIndicator={false}>
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievementIds.includes(achievement.id);

          return (
            <View key={achievement.id} style={[styles.achievementBadge, !isUnlocked && styles.achievementBadgeLocked]}>
              <Text style={[styles.achievementBadgeEmoji, !isUnlocked && styles.achievementBadgeEmojiLocked]}>
                {isUnlocked ? achievement.emoji : '🔒'}
              </Text>
              <Text numberOfLines={1} style={styles.achievementBadgeText}>
                {achievement.title}
              </Text>
              <Text numberOfLines={2} style={isUnlocked ? styles.achievementBadgeHint : styles.achievementLockedHint}>
                {isUnlocked ? achievement.encouragement ?? '已点亮' : '等待解锁'}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
