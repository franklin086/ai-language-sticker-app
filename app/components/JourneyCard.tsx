import { Text, View } from 'react-native';

export function JourneyCard({
  detail,
  emoji,
  isActive = true,
  percent,
  title,
}: {
  detail: string;
  emoji: string;
  isActive?: boolean;
  percent?: number;
  title: string;
}) {
  return (
    <View
      style={{
        backgroundColor: isActive ? '#FFFFFF' : '#FAF5FF',
        borderColor: isActive ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: 1,
        padding: 13,
        shadowColor: '#F59E0B',
        shadowOpacity: isActive ? 0.12 : 0,
        shadowRadius: 12,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
        <Text style={{ fontSize: 26, lineHeight: 32 }}>{emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', lineHeight: 18 }}>
            {title}
          </Text>
          <Text style={{ color: isActive ? '#3B245F' : '#9CA3AF', fontSize: 15, fontWeight: '900', lineHeight: 21, marginTop: 2 }}>
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
              backgroundColor: '#F59E0B',
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
