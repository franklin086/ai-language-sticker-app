import { Pressable, Text, View } from 'react-native';
import type { DailyDiscoveryStreakMilestone, DailyDiscoveryStreakState } from '../utils/dailyDiscoveryStreakHelpers';

type ComponentStyles = Record<string, any>;

export function DailyDiscoveryStreakPanel({
  latestMilestone,
  milestones,
  nextMilestone,
  onClearLatestMilestone,
  state,
  styles,
}: {
  latestMilestone: DailyDiscoveryStreakMilestone | null;
  milestones: DailyDiscoveryStreakMilestone[];
  nextMilestone: DailyDiscoveryStreakMilestone;
  onClearLatestMilestone: () => void;
  state: DailyDiscoveryStreakState;
  styles: ComponentStyles;
}) {
  const currentTarget = Math.max(nextMilestone.days, 1);
  const progressPercent = Math.min(100, Math.round((state.streakDays / currentTarget) * 100));

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🔥 连续探索</Text>
        <Text style={styles.cityMapHint}>每天回来看看，魔法世界会记得你的脚步</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FDE68A', borderRadius: 18, borderWidth: 1, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>
            今日状态：{state.todayExplored ? '已探索' : '今日还未探索'}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            <Text style={{ color: '#B45309', fontSize: 24, fontWeight: '900' }}>{state.streakDays} 天</Text>
            <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 8 }}>
              历史最高：{state.bestStreakDays} 天
            </Text>
          </View>
          <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900', marginTop: 10 }}>
            下一里程碑：{nextMilestone.title}（连续 {nextMilestone.days} 天）
          </Text>
          <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 12, overflow: 'hidden' }}>
            <View
              style={{
                backgroundColor: '#FBBF24',
                borderRadius: 999,
                height: '100%',
                width: `${progressPercent}%`,
              }}
            />
          </View>
        </View>

        {latestMilestone ? (
          <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 2, marginTop: 12, padding: 14 }}>
            <Text style={{ color: '#B45309', fontSize: 16, fontWeight: '900' }}>✨ 里程碑达成！</Text>
            <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', marginTop: 6 }}>
              {latestMilestone.title}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
              你已经连续探索 {latestMilestone.days} 天啦。
            </Text>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
                borderColor: '#C4B5FD',
                borderRadius: 999,
                borderWidth: 1,
                marginTop: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
              })}
              onPress={onClearLatestMilestone}
            >
              <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900', textAlign: 'center' }}>知道啦</Text>
            </Pressable>
          </View>
        ) : null}

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>里程碑列表</Text>
        {milestones.map((milestone) => {
          const reached = state.streakDays >= milestone.days;

          return (
            <View
              key={milestone.id}
              style={{
                backgroundColor: reached ? '#FFFBEB' : '#FFFFFF',
                borderColor: reached ? '#FBBF24' : '#E9D5FF',
                borderRadius: 16,
                borderWidth: reached ? 2 : 1,
                marginTop: 8,
                padding: 12,
              }}
            >
              <Text style={{ color: reached ? '#B45309' : '#6D28D9', fontSize: 13, fontWeight: '900' }}>
                {reached ? '✨' : '🔥'} {milestone.title}
              </Text>
              <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
                连续 {milestone.days} 天
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
