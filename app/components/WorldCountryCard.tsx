import { Pressable, Text, View } from 'react-native';
import type { WorldMapCountryProgress } from '../utils/worldMapHelpers';
import { WorldCityCard } from './WorldCityCard';

function getCountryStatus(country: WorldMapCountryProgress) {
  if (country.completed) {
    return '已点亮';
  }

  if (country.completedCityCount > 0 || country.completedMuseumCount > 0) {
    return '探索中';
  }

  return '未开始';
}

export function WorldCountryCard({
  country,
  expanded,
  onEnterCountry,
  onToggle,
}: {
  country: WorldMapCountryProgress;
  expanded: boolean;
  onEnterCountry: () => void;
  onToggle: () => void;
}) {
  const countryCompleted = country.completed;

  return (
    <View
      style={{
        backgroundColor: countryCompleted ? '#FFFBEB' : '#FFF7ED',
        borderColor: countryCompleted ? '#FBBF24' : '#DDD6FE',
        borderRadius: 20,
        borderWidth: countryCompleted ? 2 : 1,
        marginTop: 14,
        padding: 16,
        shadowColor: countryCompleted ? '#F59E0B' : '#7C3AED',
        shadowOpacity: countryCompleted ? 0.22 : 0.12,
        shadowRadius: countryCompleted ? 18 : 10,
      }}
    >
      <Pressable onPress={onToggle}>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ color: '#6D28D9', fontSize: 20, fontWeight: '900', lineHeight: 27 }}>
              {country.emoji} {country.countryName}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '700', lineHeight: 18, marginTop: 6 }}>
              已完成城市 {country.completedCityCount} / {country.totalCityCount}
            </Text>
            <Text style={{ color: '#8B5CF6', fontSize: 12, fontWeight: '700', lineHeight: 17, marginTop: 3 }}>
              状态：{getCountryStatus(country)}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
            <Text style={{ color: countryCompleted ? '#B45309' : '#7C3AED', fontSize: 24, fontWeight: '900' }}>
              {country.percent}%
            </Text>
            <Text style={{ color: '#A855F7', fontSize: 12, fontWeight: '800', lineHeight: 17, marginTop: 4, textAlign: 'right' }}>
              {expanded ? '收起 ▲' : '展开 ▼'}
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 14, overflow: 'hidden' }}>
          <View
            style={{
              backgroundColor: '#FBBF24',
              borderRadius: 999,
              height: '100%',
              width: `${country.percent}%`,
            }}
          />
        </View>

        {countryCompleted ? (
          <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900', marginTop: 10 }}>🎉 国家探索完成</Text>
        ) : null}
      </Pressable>

      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
          borderColor: '#C4B5FD',
          borderRadius: 14,
          borderWidth: 1,
          marginTop: 12,
          padding: 12,
        })}
        onPress={onEnterCountry}
      >
        <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', lineHeight: 18, textAlign: 'center' }}>
          进入{country.countryName}地图
        </Text>
      </Pressable>

      {expanded ? (
        <View style={{ marginTop: 6 }}>
          {country.cities.map((city) => (
            <WorldCityCard city={city} key={city.cityId} />
          ))}
        </View>
      ) : null}
    </View>
  );
}
