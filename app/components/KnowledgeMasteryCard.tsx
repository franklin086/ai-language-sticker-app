import { Text, View } from 'react-native';

export function KnowledgeMasteryCard({
  icon,
  levelCode,
  levelName,
  masteryPercent,
  nextHint,
}: {
  icon: string;
  levelCode: string;
  levelName: string;
  masteryPercent: number;
  nextHint: string;
}) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FBBF24',
        borderRadius: 22,
        borderWidth: 2,
        padding: 16,
        shadowColor: '#F59E0B',
        shadowOpacity: 0.15,
        shadowRadius: 14,
      }}
    >
      <Text style={{ fontSize: 44, lineHeight: 52, textAlign: 'center' }}>{icon}</Text>
      <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900', letterSpacing: 0, lineHeight: 17, marginTop: 6, textAlign: 'center' }}>
        {levelCode}
      </Text>
      <Text style={{ color: '#3B245F', fontSize: 25, fontWeight: '900', lineHeight: 32, marginTop: 2, textAlign: 'center' }}>
        {levelName}
      </Text>

      <View
        style={{
          backgroundColor: '#F3E8FF',
          borderRadius: 999,
          height: 12,
          marginTop: 14,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            backgroundColor: '#F59E0B',
            borderRadius: 999,
            height: '100%',
            width: `${masteryPercent}%` as `${number}%`,
          }}
        />
      </View>

      <Text style={{ color: '#7C3AED', fontSize: 18, fontWeight: '900', lineHeight: 24, marginTop: 9, textAlign: 'center' }}>
        {masteryPercent}%
      </Text>
      <Text style={{ color: '#9A6A19', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 4, textAlign: 'center' }}>
        {nextHint}
      </Text>
    </View>
  );
}
