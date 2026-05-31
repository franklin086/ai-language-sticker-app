import { Text, View } from 'react-native';

export function StorylineProgressCard({
  restoredMemoryCount,
  totalMemoryCount,
}: {
  restoredMemoryCount: number;
  totalMemoryCount: number;
}) {
  const percent = totalMemoryCount > 0 ? Math.round((restoredMemoryCount / totalMemoryCount) * 100) : 0;

  return (
    <View style={{ backgroundColor: '#FFFFFF', borderColor: '#E9D5FF', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
      <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900' }}>当前进度</Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 8 }}>
        已恢复：{restoredMemoryCount} / {totalMemoryCount} 世界记忆
      </Text>
      <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900', marginTop: 6 }}>记忆复苏：{percent}%</Text>
      <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 12, overflow: 'hidden' }}>
        <View style={{ backgroundColor: '#FBBF24', borderRadius: 999, height: '100%', width: `${percent}%` }} />
      </View>
    </View>
  );
}
