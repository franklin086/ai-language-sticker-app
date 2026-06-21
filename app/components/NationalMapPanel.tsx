import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { NationalMapProgress } from '../utils/nationalMapHelpers';
import { NationalCityCard } from './NationalCityCard';
import { NationalNpcCard } from './NationalNpcCard';
import { LearningBackButton } from './LearningBackButton';

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
  const { t } = useLanguage();

  return (
    <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
      <LearningBackButton label="返回世界地图" onPress={onBack} />
      <View>
        <Text style={{ color: '#6D28D9', fontSize: 22, fontWeight: '900', lineHeight: 29 }}>
          {nationalMap.emoji} {nationalMap.countryName} {t('world_map')}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '700', lineHeight: 19, marginTop: 6 }}>
          {t('cities')} / {t('museum')} / {t('progress')}
        </Text>
      </View>

      <NationalNpcCard countryId={nationalMap.countryId} percent={nationalMap.percent} />

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
        <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900' }}>{t('total_completion')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          <Text style={{ color: '#7C3AED', flexBasis: '45%', flexGrow: 1, fontSize: 13, fontWeight: '800', lineHeight: 18 }}>
            {t('cities')}: {nationalMap.completedCityCount} / {nationalMap.totalCityCount}
          </Text>
          <Text style={{ color: '#7C3AED', flexBasis: '45%', flexGrow: 1, fontSize: 13, fontWeight: '800', lineHeight: 18 }}>
            {t('museum')}: {nationalMap.completedMuseumCount} / {nationalMap.totalMuseumCount}
          </Text>
          <Text style={{ color: '#B45309', flexBasis: '45%', flexGrow: 1, fontSize: 13, fontWeight: '900', lineHeight: 18 }}>
            {t('completed')}: {nationalMap.percent}%
          </Text>
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
            onBack={onBack}
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
        <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', lineHeight: 20, textAlign: 'center' }}>
          {t('back')} {t('world_map')}
        </Text>
      </Pressable>
    </View>
  );
}
