import { Text, View } from 'react-native';
import { getMuseumNpc, getMuseumNpcProgressMessage } from '../utils/museumNpcHelpers';

export function MuseumNpcCard({
  collectedCount,
  museumName,
  totalCount,
}: {
  collectedCount: number;
  museumName: string;
  totalCount: number;
}) {
  const npc = getMuseumNpc(museumName);
  const message = getMuseumNpcProgressMessage({
    collectedCount,
    museumName,
    totalCount,
  });

  return (
    <View
      style={{
        backgroundColor: '#FFFBEB',
        borderColor: '#FBBF24',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 14,
        padding: 14,
        shadowColor: '#F59E0B',
        shadowOpacity: 0.16,
        shadowRadius: 14,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 }}>
        <Text style={{ fontSize: 42 }}>{npc.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: 17, fontWeight: '900' }}>{npc.name}</Text>
          <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '800', marginTop: 3 }}>{npc.title}</Text>
          <Text style={{ color: '#7C3AED', fontSize: 11, fontWeight: '700', marginTop: 3 }}>
            {npc.personality}
          </Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FDE68A', borderRadius: 16, borderWidth: 1, marginTop: 12, padding: 12 }}>
        <Text style={{ color: '#5B21B6', fontSize: 13, fontWeight: '800' }}>{npc.greeting}</Text>
        <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900', marginTop: 8 }}>{message}</Text>
      </View>
    </View>
  );
}
