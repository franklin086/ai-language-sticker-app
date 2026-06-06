import { Text, View } from 'react-native';
import { useSeasonalEvents } from '../hooks/useSeasonalEvents';
import { SeasonalEventCard } from './SeasonalEventCard';

type ComponentStyles = Record<string, any>;
type SeasonalEventInput = Parameters<typeof useSeasonalEvents>[0];

export function SeasonalEventPanel({
  collection,
  museumCollectedIds,
  styles,
}: SeasonalEventInput & {
  styles: ComponentStyles;
}) {
  const seasonalEventState = useSeasonalEvents({
    collection,
    museumCollectedIds,
  });

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🎊 世界季节活动</Text>
        <Text style={styles.cityMapHint}>魔法世界正在发生新的变化</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>当前活动</Text>
        <SeasonalEventCard event={seasonalEventState.activeEvent} highlighted />

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>活动列表</Text>
        {seasonalEventState.events.map((event) => (
          <SeasonalEventCard event={event} key={event.id} />
        ))}
      </View>
    </View>
  );
}
