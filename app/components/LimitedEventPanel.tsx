import { Text, View } from 'react-native';

type LimitedEventProgress = { badgeId: string; badgeTitle: string; completed: boolean; eventId: string; progress: number; target: number };

type ComponentStyles = Record<string, any>;

export function LimitedEventPanel({
  latestLimitedEventReward,
  progress,
  styles,
}: {
  latestLimitedEventReward: string;
  progress: LimitedEventProgress;
  styles: ComponentStyles;
}) {
  const percent = Math.min(100, (progress.progress / progress.target) * 100);

  return (
    <View style={styles.limitedEventPanel}>
      <View style={[styles.limitedEventCard, progress.completed && styles.limitedEventCardComplete]}>
        <Text style={styles.limitedEventKicker}>本周活动</Text>
        <Text style={styles.limitedEventTitle}>🐾 动物探索周</Text>
        <Text style={styles.limitedEventText}>发现 3 个动物类藏品</Text>
        <Text style={styles.limitedEventProgress}>
          当前进度：{progress.progress} / {progress.target}
        </Text>
        <View style={styles.limitedEventTrack}>
          <View style={[styles.limitedEventFill, { width: `${percent}%` as `${number}%` }]} />
        </View>
        <Text style={styles.limitedEventReward}>奖励：50 XP · 🐾 动物探索家 · 宝箱一次</Text>
        <Text style={progress.completed ? styles.limitedEventDone : styles.limitedEventTodo}>
          {progress.completed ? '已完成' : '继续寻找动物藏品'}
        </Text>
      </View>

      {latestLimitedEventReward ? (
        <View style={styles.limitedEventToast}>
          <Text style={styles.limitedEventToastTitle}>🎉 限定活动完成！</Text>
          <Text style={styles.limitedEventToastText}>获得：{latestLimitedEventReward}</Text>
        </View>
      ) : null}
    </View>
  );
}
