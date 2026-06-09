import { Text, View } from 'react-native';

export function LearningCoachCard({
  detail,
  emoji,
  title,
}: {
  detail: string;
  emoji: string;
  title: string;
}) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#C4B5FD',
        borderRadius: 18,
        borderWidth: 1,
        padding: 13,
        shadowColor: '#8B5CF6',
        shadowOpacity: 0.1,
        shadowRadius: 12,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
        <Text style={{ fontSize: 26, lineHeight: 32 }}>{emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', lineHeight: 18 }}>
            {title}
          </Text>
          <Text style={{ color: '#3B245F', fontSize: 15, fontWeight: '900', lineHeight: 21, marginTop: 3 }}>
            {detail}
          </Text>
        </View>
      </View>
    </View>
  );
}
