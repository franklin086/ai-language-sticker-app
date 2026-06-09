import { Text, View } from 'react-native';

export function LearningMotivationCard({
  detail,
  emoji,
  label,
  percent,
}: {
  detail: string;
  emoji: string;
  label: string;
  percent?: number;
}) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FBBF24',
        borderRadius: 18,
        borderWidth: 1,
        padding: 13,
        shadowColor: '#F59E0B',
        shadowOpacity: 0.12,
        shadowRadius: 12,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
        <Text style={{ fontSize: 25, lineHeight: 31 }}>{emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', lineHeight: 18 }}>
            {label}
          </Text>
          <Text style={{ color: '#3B245F', fontSize: 15, fontWeight: '900', lineHeight: 21, marginTop: 2 }}>
            {detail}
          </Text>
        </View>
      </View>

      {typeof percent === 'number' ? (
        <View
          style={{
            backgroundColor: '#F3E8FF',
            borderRadius: 999,
            height: 10,
            marginTop: 11,
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
      ) : null}
    </View>
  );
}
