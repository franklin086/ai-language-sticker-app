import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { NationalCityProgress } from '../utils/nationalMapHelpers';

export function NationalCityCard({
  city,
  onBack,
  onOpenMuseum,
}: {
  city: NationalCityProgress;
  onBack: () => void;
  onOpenMuseum: (museum: NationalCityProgress['museums'][number]) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const completed = city.completed;

  return (
    <View
      style={{
        backgroundColor: completed ? '#FFFBEB' : '#FFFFFF',
        borderColor: completed ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: completed ? 2 : 1,
        marginTop: 12,
        padding: 14,
        shadowColor: completed ? '#F59E0B' : '#7C3AED',
        shadowOpacity: completed ? 0.18 : 0.08,
        shadowRadius: completed ? 14 : 8,
      }}
    >
      <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#DDD6FE' : '#F5F3FF',
            borderColor: '#C4B5FD',
            borderRadius: 999,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 7,
          })}
          onPress={onBack}
        >
          <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>← {t('world_map')}</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => setExpanded((current) => !current)}>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#5B21B6', fontSize: 18, fontWeight: '900' }}>
              {city.emoji} {city.cityName}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 5 }}>
              {t('museum')}: {city.completedMuseumCount} / {city.totalMuseumCount}
            </Text>
            <Text style={{ color: completed ? '#B45309' : '#6D28D9', fontSize: 13, fontWeight: '900', marginTop: 5 }}>
              {city.status}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: completed ? '#B45309' : '#7C3AED', fontSize: 22, fontWeight: '900' }}>
              {city.percent}%
            </Text>
            <Text style={{ color: '#A855F7', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
              {expanded ? `${t('close')} ▲` : `${t('open')} ${t('museum')} ▼`}
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 12, overflow: 'hidden' }}>
          <View
            style={{
              backgroundColor: '#FBBF24',
              borderRadius: 999,
              height: '100%',
              width: `${city.percent}%`,
            }}
          />
        </View>

        {completed ? (
          <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900', marginTop: 8 }}>
            ✨ {t('completed')}
          </Text>
        ) : null}
      </Pressable>

      {expanded ? (
        <View style={{ marginTop: 10 }}>
          {city.museums.map((museum) => (
            <View
              key={museum.id}
              style={{
                backgroundColor: museum.completed ? '#FFF8DB' : '#F8F5FF',
                borderColor: museum.completed ? '#FBBF24' : '#DDD6FE',
                borderRadius: 14,
                borderWidth: 1,
                marginTop: 8,
                padding: 12,
              }}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#5B21B6', fontSize: 14, fontWeight: '900' }}>
                    {museum.emoji} {museum.name}
                  </Text>
                  <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', marginTop: 4 }}>
                    {t('collection')}: {museum.collectedCount} / {museum.totalCount}
                  </Text>
                </View>
                <Text style={{ color: museum.completed ? '#B45309' : '#7C3AED', fontSize: 15, fontWeight: '900' }}>
                  {museum.percent}%
                </Text>
              </View>
              <Text style={{ color: museum.completed ? '#B45309' : '#6D28D9', fontSize: 12, fontWeight: '800', marginTop: 6 }}>
                {museum.status}
              </Text>
              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
                  borderColor: '#C4B5FD',
                  borderRadius: 12,
                  borderWidth: 1,
                  marginTop: 8,
                  padding: 10,
                })}
                onPress={() => onOpenMuseum(museum)}
              >
                <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900', textAlign: 'center' }}>
                  {t('open')} {t('museum')}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
