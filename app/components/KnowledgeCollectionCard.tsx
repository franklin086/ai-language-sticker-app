import { Text, View } from 'react-native';
import type { KnowledgeCollectionProgress } from '../utils/knowledgeCollectionHelpers';

export function KnowledgeCollectionCard({ item }: { item: KnowledgeCollectionProgress }) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: item.completedPercent === 100 ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: item.completedPercent === 100 ? 2 : 1,
        marginTop: 12,
        padding: 12,
        shadowColor: '#F59E0B',
        shadowOpacity: item.completedPercent === 100 ? 0.18 : 0.08,
        shadowRadius: 10,
      }}
    >
      <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>
        {item.collection.emoji} {item.title}
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 6 }}>
        已发现：{item.discoveredCount} / {item.totalCount}
      </Text>
      <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '900', marginTop: 4 }}>
        完成度：{item.completedPercent}%
      </Text>
      <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 8, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: '#FBBF24',
            borderRadius: 999,
            height: '100%',
            width: `${item.completedPercent}%`,
          }}
        />
      </View>
    </View>
  );
}
