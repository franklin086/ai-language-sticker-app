import { Text, View } from 'react-native';
import { usePassport } from '../hooks/usePassport';
import type { WorldMapCitySource } from '../utils/worldMapHelpers';
import { PassportStamp } from './PassportStamp';
import { LearningBackButton } from './LearningBackButton';

type ComponentStyles = Record<string, any>;

function StampSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900', lineHeight: 21 }}>{title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>{children}</View>
    </View>
  );
}

export function PassportPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  museumCollectedIds,
  onBackHome,
  styles,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: WorldMapCitySource[];
  museumCollectedIds: string[];
  onBackHome?: () => void;
  styles: ComponentStyles;
}) {
  const passport = usePassport({
    cityMapCompletedNodeIds,
    cityMaps,
    museumCollectedIds,
  });
  const unlockedCityCount = passport.cityStamps.filter((stamp) => stamp.status === 'unlocked').length;
  const unlockedCountryCount = passport.countryStamps.filter((stamp) => stamp.status === 'unlocked').length;

  return (
    <View style={styles.cityMapPanel}>
      {onBackHome ? <LearningBackButton label="返回首页" onPress={onBackHome} /> : null}
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>📕 魔法探索护照</Text>
        <Text style={styles.cityMapHint}>点亮城市，收集世界印章</Text>
        <Text style={[styles.cityMapProgressText, { textAlign: 'center' }]}>
          城市印章：{unlockedCityCount} / {passport.cityStamps.length} · 国家印章：{unlockedCountryCount} / {passport.countryStamps.length}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#FFF7ED',
          borderColor: '#E9D5FF',
          borderRadius: 22,
          borderWidth: 1,
          padding: 16,
        }}
      >
        <StampSection title="🏙️ 城市印章">
          {passport.cityStamps.map((stamp) => (
            <PassportStamp key={stamp.id} stamp={stamp} />
          ))}
        </StampSection>

        <StampSection title="🏅 国家印章">
          {passport.countryStamps.map((stamp) => (
            <PassportStamp key={stamp.id} stamp={stamp} />
          ))}
        </StampSection>

        <StampSection title="🌍 世界印章">
          <PassportStamp stamp={passport.worldStamp} />
        </StampSection>
      </View>
    </View>
  );
}
