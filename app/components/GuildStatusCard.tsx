import { Text, View } from 'react-native';
import type { MagicGuildData } from '../utils/magicGuildHelpers';

export function GuildStatusCard({ guild }: { guild: MagicGuildData }) {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, padding: 14 }}>
      <Text style={{ color: '#6D28D9', fontSize: 18, fontWeight: '900' }}>🏛 魔法探索者公会</Text>
      <Text style={{ color: '#B45309', fontSize: 16, fontWeight: '900', marginTop: 8 }}>
        Lv{guild.currentRankLevel} {guild.currentRankTitle}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          世界记忆：{guild.restoredMemoryCount} / {guild.totalMemoryCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          城市：{guild.completedCityCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          国家：{guild.completedCountryCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          护照：{guild.passportStampCount} / {guild.totalPassportStampCount}
        </Text>
      </View>
    </View>
  );
}
