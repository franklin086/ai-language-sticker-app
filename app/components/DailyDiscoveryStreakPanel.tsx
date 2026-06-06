import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
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
  const { t } = useLanguage();
  const currentTarget = Math.max(nextMilestone.days, 1);
  const progressPercent = Math.min(100, Math.round((state.streakDays / currentTarget) * 100));

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🔥 {t('daily_streak')}</Text>
        <Text style={styles.cityMapHint}>{t('daily_streak_hint')}</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FDE68A', borderRadius: 18, borderWidth: 1, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>
            {t('today_status')}: {state.todayExplored ? t('explored_today') : t('not_explored_today')}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            <Text style={{ color: '#B45309', fontSize: 24, fontWeight: '900' }}>
              {state.streakDays} {t('days')}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 8 }}>
              {t('best_streak')}: {state.bestStreakDays} {t('days')}
            </Text>
          </View>
          <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900', marginTop: 10 }}>
            {t('next_milestone')}: {nextMilestone.title} ({nextMilestone.days} {t('days')})
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
            <Text style={{ color: '#B45309', fontSize: 16, fontWeight: '900' }}>✨ {t('milestone_reached')}</Text>
            <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', marginTop: 6 }}>
              {latestMilestone.title}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
              {latestMilestone.days} {t('days')}
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
              <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900', textAlign: 'center' }}>{t('done')}</Text>
            </Pressable>
          </View>
        ) : null}

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>{t('milestone_list')}</Text>
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
                {reached ? '✅' : '🔥'} {milestone.title}
              </Text>
              <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
                {milestone.days} {t('days')}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
