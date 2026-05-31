import { Text, View } from 'react-native';
import type { WorldMapCityProgress } from '../utils/worldMapHelpers';

function getCityStatus(city: WorldMapCityProgress) {
  if (city.completed) {
    return '✨ 已点亮';
  }

  if (city.completedMuseumCount > 0) {
    return '探索中';
  }

  return '待探索';
}

export function WorldCityCard({ city }: { city: WorldMapCityProgress }) {
  const cityCompleted = city.completed;

  return (
    <View
      style={{
        backgroundColor: cityCompleted ? '#FFF8DB' : '#FFFFFF',
        borderColor: cityCompleted ? '#FACC15' : '#E9D5FF',
        borderRadius: 14,
        borderWidth: cityCompleted ? 2 : 1,
        marginTop: 10,
        padding: 12,
        shadowColor: cityCompleted ? '#F59E0B' : '#7C3AED',
        shadowOpacity: cityCompleted ? 0.18 : 0.08,
        shadowRadius: cityCompleted ? 12 : 8,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#5B21B6', fontSize: 15, fontWeight: '800' }}>
            {city.emoji} {city.cityName}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', marginTop: 4 }}>
            {city.completedMuseumCount} / {city.totalMuseumCount} 个博物馆
          </Text>
        </View>
        <Text style={{ color: cityCompleted ? '#B45309' : '#8B5CF6', fontSize: 16, fontWeight: '900' }}>
          {city.percent}%
        </Text>
      </View>

      <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 8, marginTop: 10, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: cityCompleted ? '#FBBF24' : '#A78BFA',
            borderRadius: 999,
            height: '100%',
            width: `${city.percent}%`,
          }}
        />
      </View>

      <Text style={{ color: cityCompleted ? '#B45309' : '#6D28D9', fontSize: 12, fontWeight: '800', marginTop: 8 }}>
        {getCityStatus(city)}
      </Text>
      {cityCompleted ? (
        <Text style={{ color: '#92400E', fontSize: 12, fontWeight: '700', marginTop: 4 }}>🏙️ 城市探索完成</Text>
      ) : null}
    </View>
  );
}
