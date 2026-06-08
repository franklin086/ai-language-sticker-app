import { Text, View } from 'react-native';

export function LearningTimelineCard({
  detail,
  emptyText,
  emoji,
  isActive,
  title,
}: {
  detail: string;
  emptyText: string;
  emoji: string;
  isActive: boolean;
  title: string;
}) {
  return (
    <View
      style={{
        backgroundColor: isActive ? '#FFFFFF' : '#FAF5FF',
        borderColor: isActive ? '#C4B5FD' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        shadowColor: '#8B5CF6',
        shadowOpacity: isActive ? 0.1 : 0,
        shadowRadius: 10,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: isActive ? '#FEF3C7' : '#F3E8FF',
          borderRadius: 16,
          height: 48,
          justifyContent: 'center',
          width: 48,
        }}
      >
        <Text style={{ fontSize: 25, lineHeight: 31 }}>{emoji}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', lineHeight: 18 }}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: isActive ? '#3B245F' : '#9CA3AF',
            fontSize: 15,
            fontWeight: '900',
            lineHeight: 21,
            marginTop: 3,
          }}
        >
          {isActive ? detail : emptyText}
        </Text>
      </View>
    </View>
  );
}
