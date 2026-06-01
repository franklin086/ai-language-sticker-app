import { Text, View } from 'react-native';
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
        <Text style={styles.cityMapTitle}>🌍 世界远征中心</Text>
        <Text style={styles.cityMapHint}>跟着长期远征，知道下一步该探索什么</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>当前进行中的远征</Text>
        <WorldExpeditionCard expedition={activeExpedition} highlighted />

        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FDE68A', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#92400E', fontSize: 14, fontWeight: '900' }}>下一目标</Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6 }}>
            {remaining > 0 ? `还差 ${remaining} 步完成「${activeExpedition.title}」` : `「${activeExpedition.title}」已经完成`}
          </Text>
          <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900', marginTop: 8 }}>
            预计奖励：{activeExpedition.rewardText}
          </Text>
        </View>

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>远征列表</Text>
        {expeditionState.expeditions.map((expedition) => (
          <WorldExpeditionCard expedition={expedition} key={expedition.id} />
        ))}
      </View>
    </View>
  );
}
