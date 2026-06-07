import { Pressable, Text, View } from 'react-native';
import type { AcademyProgress } from '../utils/explorerAcademyHelpers';

export function AcademyCard({
  academy,
  onPress,
  selected,
}: {
  academy: AcademyProgress;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: selected ? '#F5F3FF' : pressed ? '#FEF3C7' : '#FFFFFF',
        borderColor: selected ? '#8B5CF6' : academy.percent === 100 ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: selected || academy.percent === 100 ? 2 : 1,
        marginTop: 12,
        padding: 12,
        shadowColor: '#F59E0B',
        shadowOpacity: academy.percent === 100 ? 0.18 : 0.08,
        shadowRadius: 10,
      })}
      onPress={onPress}
    >
      <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>
        {academy.emoji} {academy.title}
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 6 }}>
        发现：{academy.discoveredArtifactCount} / {academy.totalArtifactCount}
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
        挑战：{academy.quizUnlockedCount} / {academy.quizTotalCount}
      </Text>
      <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '900', marginTop: 4 }}>
        完成度：{academy.percent}%
      </Text>
      <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 8, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: '#FBBF24',
            borderRadius: 999,
            height: '100%',
            width: `${academy.percent}%`,
          }}
        />
      </View>
    </Pressable>
  );
}
