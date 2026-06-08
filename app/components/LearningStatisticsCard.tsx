import { Text, View } from 'react-native';

export function LearningStatisticsCard({
  completed,
  label,
  percent,
  total,
}: {
  completed: number;
  label: string;
  percent: number;
  total: number;
}) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#DDD6FE',
        borderRadius: 18,
        borderWidth: 1,
        padding: 13,
        shadowColor: '#8B5CF6',
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
        <Text
          numberOfLines={2}
          style={{ color: '#6D28D9', flex: 1, fontSize: 13, fontWeight: '900', lineHeight: 18 }}
        >
          {label}
        </Text>
        <Text style={{ color: '#3B245F', fontSize: 18, fontWeight: '900', lineHeight: 24 }}>
          {percent}%
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#F3E8FF',
          borderRadius: 999,
          height: 10,
          marginTop: 10,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            backgroundColor: '#A855F7',
            borderRadius: 999,
            height: '100%',
            width: `${percent}%` as `${number}%`,
          }}
        />
      </View>

      <Text style={{ color: '#9A6A19', fontSize: 12, fontWeight: '800', lineHeight: 17, marginTop: 7 }}>
        {completed} / {total}
      </Text>
    </View>
  );
}
