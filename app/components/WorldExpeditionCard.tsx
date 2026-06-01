import { Text, View } from 'react-native';
import type { WorldExpeditionProgress } from '../utils/worldExpeditionHelpers';

export function WorldExpeditionCard({
  expedition,
  highlighted = false,
}: {
  expedition: WorldExpeditionProgress;
  highlighted?: boolean;
}) {
  const completed = expedition.status === 'completed';

  return (
    <View
      style={{
        backgroundColor: highlighted ? '#FFFBEB' : '#FFFFFF',
        borderColor: completed || highlighted ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: completed || highlighted ? 2 : 1,
        marginTop: 12,
        padding: 14,
        shadowColor: completed || highlighted ? '#F59E0B' : '#7C3AED',
        shadowOpacity: completed || highlighted ? 0.18 : 0.08,
        shadowRadius: completed || highlighted ? 14 : 8,
      }}
    >
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: highlighted ? 18 : 15, fontWeight: '900' }}>
            {completed ? '✅' : '🧭'} {expedition.title}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', lineHeight: 18, marginTop: 6 }}>
            {expedition.description}
          </Text>
        </View>
        <Text style={{ color: completed ? '#B45309' : '#7C3AED', fontSize: 16, fontWeight: '900' }}>
          {expedition.percent}%
        </Text>
      </View>

      <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 12, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: '#FBBF24',
            borderRadius: 999,
            height: '100%',
            width: `${expedition.percent}%`,
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
        <Text style={{ color: '#5B21B6', fontSize: 12, fontWeight: '800' }}>
          进度：{Math.min(expedition.currentValue, expedition.target)} / {expedition.target}
        </Text>
        <Text style={{ color: completed ? '#B45309' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>
          状态：{completed ? '已完成' : '进行中'}
        </Text>
      </View>

      <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '800', marginTop: 8 }}>
        奖励预览：{expedition.rewardText}
      </Text>
    </View>
  );
}
