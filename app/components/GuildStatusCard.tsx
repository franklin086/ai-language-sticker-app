import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { MagicGuildData } from '../utils/magicGuildHelpers';

export function GuildStatusCard({ guild }: { guild: MagicGuildData }) {
  const { t } = useLanguage();

  return (
    <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, padding: 14 }}>
      <Text style={{ color: '#6D28D9', fontSize: 18, fontWeight: '900' }}>🏛 {t('guild_headquarters')}</Text>
      <Text style={{ color: '#B45309', fontSize: 16, fontWeight: '900', marginTop: 8 }}>
        Lv{guild.currentRankLevel} {guild.currentRankTitle}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          {t('world_memory')}: {guild.restoredMemoryCount} / {guild.totalMemoryCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          {t('cities')}: {guild.completedCityCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          {t('country')}: {guild.completedCountryCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          {t('passport')}: {guild.passportStampCount} / {guild.totalPassportStampCount}
        </Text>
      </View>
    </View>
  );
}
