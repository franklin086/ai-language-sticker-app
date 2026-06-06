import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
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
  const { t } = useLanguage();
  const seasonalEventState = useSeasonalEvents({
    collection,
    museumCollectedIds,
  });

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>{t('seasonal_events')}</Text>
        <Text style={styles.cityMapHint}>{t('seasonal_events_hint')}</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{t('current_event')}</Text>
        <SeasonalEventCard event={seasonalEventState.activeEvent} highlighted />

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>{t('seasonal_events')}</Text>
        {seasonalEventState.events.map((event) => (
          <SeasonalEventCard event={event} key={event.id} />
        ))}
      </View>
    </View>
  );
}
