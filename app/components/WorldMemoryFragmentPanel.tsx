import { Text, View } from 'react-native';
import { useWorldMemoryFragments } from '../hooks/useWorldMemoryFragments';
import { WorldMemoryFragmentCard } from './WorldMemoryFragmentCard';

type ComponentStyles = Record<string, any>;
type WorldMemoryFragmentInput = Parameters<typeof useWorldMemoryFragments>[0];

export function WorldMemoryFragmentPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  styles,
}: WorldMemoryFragmentInput & {
  styles: ComponentStyles;
}) {
  const fragmentState = useWorldMemoryFragments({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
  });

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🧩 世界记忆碎片</Text>
        <Text style={styles.cityMapHint}>每一次发现，都会让世界记忆重新发光</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#BFDBFE', borderRadius: 18, borderWidth: 1, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>总恢复进度</Text>
          <Text style={{ color: '#2563EB', fontSize: 28, fontWeight: '900', marginTop: 8 }}>
            {fragmentState.totalPercent}%
          </Text>
          <View style={{ backgroundColor: '#DBEAFE', borderRadius: 999, height: 12, marginTop: 10, overflow: 'hidden' }}>
            <View
              style={{
                backgroundColor: '#FBBF24',
                borderRadius: 999,
                height: '100%',
                width: `${fragmentState.totalPercent}%`,
              }}
            />
          </View>
        </View>

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>当前最接近完成的碎片</Text>
        <WorldMemoryFragmentCard fragment={fragmentState.closestFragment} highlighted />

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>碎片列表</Text>
        {fragmentState.fragments.map((fragment) => (
          <WorldMemoryFragmentCard fragment={fragment} key={fragment.id} />
        ))}
      </View>
    </View>
  );
}
