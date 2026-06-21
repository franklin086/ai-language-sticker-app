import { Pressable, Text, View } from 'react-native';

function formatBackLabel(label: string) {
  const trimmedLabel = label.trim();

  return trimmedLabel.startsWith('←') ? trimmedLabel : `← ${trimmedLabel}`;
}

export function MobileBackButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <View style={{ alignItems: 'flex-start', marginBottom: 14, marginTop: 16, paddingLeft: 16, paddingRight: 16 }}>
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        onPress={onPress}
        style={({ pressed }) => ({
          alignItems: 'center',
          backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
          borderColor: '#C4B5FD',
          borderRadius: 999,
          borderWidth: 1,
          justifyContent: 'center',
          maxWidth: '100%',
          minHeight: 44,
          paddingHorizontal: 16,
          paddingVertical: 10,
          shadowColor: '#7C3AED',
          shadowOpacity: 0.08,
          shadowRadius: 10,
        })}
      >
        <Text style={{ color: '#6D28D9', flexShrink: 1, fontSize: 14, fontWeight: '900', lineHeight: 20, textAlign: 'center' }}>
          {formatBackLabel(label)}
        </Text>
      </Pressable>
    </View>
  );
}
