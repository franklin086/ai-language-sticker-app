import { Text, View } from 'react-native';

type DailyQuestId = 'animal_discovery' | 'traffic_discovery' | 'three_unique_artifacts';
type DailyQuestDefinition = { id: DailyQuestId; title: string; rewardLabel: string; target: number; type: 'animal' | 'traffic' | 'unique' };
type DailyQuestProgress = DailyQuestDefinition & { completed: boolean; progress: number; rewarded: boolean };

type ComponentStyles = Record<string, any>;

export function DailyQuestPanel({
  latestDailyQuestReward,
  questProgress,
  styles,
}: {
  latestDailyQuestReward: string;
  questProgress: DailyQuestProgress[];
  styles: ComponentStyles;
}) {
  const completedCount = questProgress.filter((quest) => quest.completed).length;
  const allComplete = questProgress.length > 0 && completedCount === questProgress.length;

  return (
    <View style={styles.dailyQuestPanel}>
      <View style={styles.dailyQuestHeader}>
        <Text style={styles.dailyQuestTitle}>✨ 每日探索任务</Text>
        <Text style={styles.dailyQuestSummary}>
          今日完成：{completedCount} / {questProgress.length}
        </Text>
      </View>

      <View style={styles.dailyQuestList}>
        {questProgress.map((quest) => (
          <View key={quest.id} style={[styles.dailyQuestCard, quest.completed && styles.dailyQuestCardComplete]}>
            <View style={styles.dailyQuestCardHeader}>
              <Text style={styles.dailyQuestName}>{quest.title}</Text>
              <Text style={styles.dailyQuestStatus}>{quest.completed ? '🎉 任务完成' : `${quest.progress} / ${quest.target}`}</Text>
            </View>
            <View style={styles.dailyQuestTrack}>
              <View
                style={[
                  styles.dailyQuestFill,
                  { width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` as `${number}%` },
                ]}
              />
            </View>
            <Text style={styles.dailyQuestReward}>
              {quest.rewarded ? `已领取：${quest.rewardLabel}` : quest.rewardLabel}
            </Text>
          </View>
        ))}
      </View>

      {allComplete ? (
        <View style={styles.dailyQuestCompleteBanner}>
          <Text style={styles.dailyQuestCompleteTitle}>✨ 今日探索完成！</Text>
          <Text style={styles.dailyQuestCompleteText}>明天还有新的魔法任务等你来发现。</Text>
        </View>
      ) : null}

      {latestDailyQuestReward ? (
        <View style={styles.dailyQuestRewardToast}>
          <Text style={styles.dailyQuestRewardToastTitle}>🎉 任务完成</Text>
          <Text style={styles.dailyQuestRewardToastText}>获得：{latestDailyQuestReward}</Text>
        </View>
      ) : null}
    </View>
  );
}
