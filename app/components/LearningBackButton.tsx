import { Pressable, Text, View } from 'react-native';

function formatBackLabel(label: string) {
  return label.trim().startsWith('←') ? label : `← ${label}`;
}

export function LearningBackButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <View style={{ alignItems: 'flex-start', marginBottom: 14 }}>
      <Pressable
        style={({ pressed }) => ({
          alignItems: 'center',
          backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
          borderColor: '#C4B5FD',
          borderRadius: 999,
          borderWidth: 1,
          minHeight: 38,
          maxWidth: '100%',
          paddingHorizontal: 13,
          paddingVertical: 8,
          shadowColor: '#7C3AED',
          shadowOpacity: 0.08,
          shadowRadius: 10,
        })}
        onPress={onPress}
      >
        <Text style={{ color: '#6D28D9', flexShrink: 1, fontSize: 12, fontWeight: '900', lineHeight: 17, textAlign: 'center' }}>
          {formatBackLabel(label)}
        </Text>
      </Pressable>
    </View>
  );
}
