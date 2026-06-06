import { Text, View } from 'react-native';
import type { WorldMemoryFragmentProgress } from '../utils/worldMemoryFragmentHelpers';

function getStatusLabel(status: WorldMemoryFragmentProgress['status']) {
  if (status === 'restored') {
    return '已恢复';
  }

  if (status === 'restoring') {
    return '恢复中';
  }

  return '未开始';
}

export function WorldMemoryFragmentCard({
  fragment,
  highlighted = false,
}: {
  fragment: WorldMemoryFragmentProgress;
  highlighted?: boolean;
}) {
  const restored = fragment.status === 'restored';

  return (
    <View
      style={{
        backgroundColor: restored || highlighted ? '#FFFBEB' : '#FFFFFF',
        borderColor: restored || highlighted ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: restored || highlighted ? 2 : 1,
        marginTop: 12,
        opacity: fragment.status === 'not_started' ? 0.72 : 1,
        padding: 14,
        shadowColor: restored || highlighted ? '#F59E0B' : '#60A5FA',
        shadowOpacity: restored || highlighted ? 0.18 : 0.08,
        shadowRadius: restored || highlighted ? 14 : 8,
      }}
    >
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: highlighted ? 18 : 15, fontWeight: '900' }}>
            {restored ? '✨' : fragment.emoji} {fragment.title}
          </Text>
          <Text style={{ color: '#2563EB', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
            主题：{fragment.theme}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', lineHeight: 18, marginTop: 6 }}>
            {fragment.description}
          </Text>
        </View>
        <Text style={{ color: restored ? '#B45309' : '#2563EB', fontSize: 16, fontWeight: '900' }}>
          {fragment.percent}%
        </Text>
      </View>

      <View style={{ backgroundColor: '#DBEAFE', borderRadius: 999, height: 10, marginTop: 12, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: restored ? '#FBBF24' : '#60A5FA',
            borderRadius: 999,
            height: '100%',
            width: `${fragment.percent}%`,
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
        <Text style={{ color: '#5B21B6', fontSize: 12, fontWeight: '800' }}>
          进度：{Math.min(fragment.currentValue, fragment.targetCount)} / {fragment.targetCount}
        </Text>
        <Text style={{ color: restored ? '#B45309' : '#2563EB', fontSize: 12, fontWeight: '900' }}>
          状态：{getStatusLabel(fragment.status)}
        </Text>
      </View>
    </View>
  );
}
