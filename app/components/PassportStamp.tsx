import { Text, View } from 'react-native';
import type { PassportStampData } from '../utils/passportHelpers';

export function PassportStamp({ stamp }: { stamp: PassportStampData }) {
  const unlocked = stamp.status === 'unlocked';

  return (
    <View
      style={{
        backgroundColor: unlocked ? '#FFFBEB' : 'rgba(255, 255, 255, 0.62)',
        borderColor: unlocked ? '#FBBF24' : '#DDD6FE',
        borderRadius: 18,
        borderStyle: unlocked ? 'solid' : 'dashed',
        borderWidth: unlocked ? 2 : 1,
        marginTop: 10,
        minWidth: 150,
        opacity: unlocked ? 1 : 0.62,
        padding: 14,
        shadowColor: unlocked ? '#F59E0B' : '#7C3AED',
        shadowOpacity: unlocked ? 0.22 : 0.08,
        shadowRadius: unlocked ? 16 : 8,
      }}
    >
      <Text style={{ fontSize: 30, textAlign: 'center' }}>{unlocked ? stamp.emoji : '🔒'}</Text>
      <Text style={{ color: '#5B21B6', fontSize: 14, fontWeight: '900', marginTop: 8, textAlign: 'center' }}>
        {stamp.name}
      </Text>
      <Text style={{ color: unlocked ? '#B45309' : '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
        {unlocked ? '已获得' : '继续探索解锁'}
      </Text>
      <Text style={{ color: '#6D28D9', fontSize: 11, fontWeight: '700', marginTop: 6, textAlign: 'center' }}>
        {unlocked ? stamp.description : stamp.lockedDescription}
      </Text>
    </View>
  );
}
