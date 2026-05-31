import { Pressable, Text, View } from 'react-native';
import type { NationalMapProgress } from '../utils/nationalMapHelpers';
import { NationalCityCard } from './NationalCityCard';

export function NationalMapPanel({
  nationalMap,
  onBack,
  onOpenMuseum,
}: {
  nationalMap: NationalMapProgress;
  onBack: () => void;
  onOpenMuseum: (selection: {
    cityName: string;
    countryName: string;
    museumId: string;
    museumName: string;
  }) => void;
}) {
  return (
    <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
      <View>
        <Text style={{ color: '#6D28D9', fontSize: 24, fontWeight: '900' }}>
          {nationalMap.emoji} {nationalMap.countryName}魔法地图
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '700', marginTop: 6 }}>
          完成城市，点亮国家探索之路
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E9D5FF',
          borderRadius: 18,
          borderWidth: 1,
          marginTop: 14,
          padding: 14,
        }}
      >
        <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900' }}>国家总进度</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800' }}>
            城市：{nationalMap.completedCityCount} / {nationalMap.totalCityCount}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800' }}>
            博物馆：{nationalMap.completedMuseumCount} / {nationalMap.totalMuseumCount}
          </Text>
          <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900' }}>完成度：{nationalMap.percent}%</Text>
        </View>
        <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 12, overflow: 'hidden' }}>
          <View
            style={{
              backgroundColor: '#FBBF24',
              borderRadius: 999,
              height: '100%',
              width: `${nationalMap.percent}%`,
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 8 }}>
        {nationalMap.cities.map((city) => (
          <NationalCityCard
            city={city}
            key={city.cityId}
            onOpenMuseum={(museum) =>
              onOpenMuseum({
                cityName: city.cityName,
                countryName: nationalMap.countryName,
                museumId: museum.linkedMuseumId,
                museumName: museum.name,
              })
            }
          />
        ))}
      </View>

      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
          borderColor: '#C4B5FD',
          borderRadius: 16,
          borderWidth: 1,
          marginTop: 16,
          padding: 14,
        })}
        onPress={onBack}
      >
        <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>返回世界地图</Text>
      </Pressable>
    </View>
  );
}
