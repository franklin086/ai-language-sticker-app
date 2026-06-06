import { Text, View } from 'react-native';
import type { ReactNode } from 'react';

export function EncyclopediaSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderColor: '#E9D5FF', borderRadius: 16, borderWidth: 1, marginTop: 10, padding: 12 }}>
      <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>{title}</Text>
      <View style={{ marginTop: 6 }}>{children}</View>
    </View>
  );
}
