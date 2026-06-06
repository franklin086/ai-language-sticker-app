import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { useWorldExpedition } from '../hooks/useWorldExpedition';
import { WorldExpeditionCard } from './WorldExpeditionCard';

type ComponentStyles = Record<string, any>;
type WorldExpeditionInput = Parameters<typeof useWorldExpedition>[0];

export function WorldExpeditionPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  styles,
}: WorldExpeditionInput & {
  styles: ComponentStyles;
}) {
  const { t } = useLanguage();
  const expeditionState = useWorldExpedition({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
  });
  const activeExpedition = expeditionState.activeExpedition;
  const remaining = Math.max(0, activeExpedition.target - activeExpedition.currentValue);

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>{t('world_expedition')}</Text>
        <Text style={styles.cityMapHint}>{t('world_expedition_hint')}</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{t('current_expedition')}</Text>
        <WorldExpeditionCard expedition={activeExpedition} highlighted />

        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FDE68A', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#92400E', fontSize: 14, fontWeight: '900' }}>{t('next_goal')}</Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6 }}>
            {remaining > 0 ? `${remaining} / ${activeExpedition.target} - ${activeExpedition.title}` : `${activeExpedition.title} - ${t('completed')}`}
          </Text>
          <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900', marginTop: 8 }}>
            {t('reward_preview')}: {activeExpedition.rewardText}
          </Text>
        </View>

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>{t('world_expedition')}</Text>
        {expeditionState.expeditions.map((expedition) => (
          <WorldExpeditionCard expedition={expedition} key={expedition.id} />
        ))}
      </View>
    </View>
  );
}
