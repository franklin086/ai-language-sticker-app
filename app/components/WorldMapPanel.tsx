import { useMemo, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { worldMagicMap } from '../data/worldMap';
import { useMuseumExplorer } from '../hooks/useMuseumExplorer';
import { useNationalMap } from '../hooks/useNationalMap';
import type { MuseumExplorerCollectionItem, MuseumExplorerMuseum } from '../utils/museumExplorerHelpers';
import type { NationalCitySource } from '../utils/nationalMapHelpers';
import { buildWorldMapProgress } from '../utils/worldMapHelpers';
import { MuseumExplorerPanel } from './MuseumExplorerPanel';
import { NationalMapPanel } from './NationalMapPanel';
import { WorldCountryCard } from './WorldCountryCard';

type ComponentStyles = Record<string, any>;

export function WorldMapPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  onShareArtifact,
  onSpeakArtifactChinese,
  onSpeakArtifactEnglish,
  speakButtonScale,
  speakingLanguage,
  styles,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: NationalCitySource[];
  collection: MuseumExplorerCollectionItem[];
  museumCollectedIds: string[];
  museums: MuseumExplorerMuseum[];
  onShareArtifact: (item: MuseumExplorerCollectionItem) => void;
  onSpeakArtifactChinese: (text: string) => void;
  onSpeakArtifactEnglish: (text: string) => void;
  speakButtonScale: Animated.AnimatedInterpolation<string | number>;
  speakingLanguage: 'zh' | 'en' | null;
  styles: ComponentStyles;
}) {
  const countries = useMemo(
    () =>
      buildWorldMapProgress({
        cityMapCompletedNodeIds,
        cityMaps,
        worldMap: worldMagicMap,
      }),
    [cityMapCompletedNodeIds, cityMaps],
  );
  const [expandedCountryIds, setExpandedCountryIds] = useState<string[]>(() => [countries[0]?.countryId ?? '']);
  const completedCountryCount = countries.filter((country) => country.completed).length;
  const completedCityCount = countries.reduce((sum, country) => sum + country.completedCityCount, 0);
  const totalCityCount = countries.reduce((sum, country) => sum + country.totalCityCount, 0);
  const completedMuseumCount = countries.reduce((sum, country) => sum + country.completedMuseumCount, 0);
  const totalMuseumCount = countries.reduce((sum, country) => sum + country.totalMuseumCount, 0);
  const totalProgress = totalMuseumCount > 0 ? Math.round((completedMuseumCount / totalMuseumCount) * 100) : 0;
  const { closeNationalMap, openNationalMap, selectedNationalMap } = useNationalMap({
    cityMapCompletedNodeIds,
    cityMaps,
    museumCollectedIds,
    museums,
  });
  const { closeMuseumExplorer, museumExplorerData, openMuseumExplorer } = useMuseumExplorer({
    collection,
    museumCollectedIds,
    museums,
  });

  const toggleCountry = (countryId: string) => {
    setExpandedCountryIds((currentIds) =>
      currentIds.includes(countryId) ? currentIds.filter((id) => id !== countryId) : [...currentIds, countryId],
    );
  };

  if (selectedNationalMap) {
    return (
      <View style={styles.cityMapPanel}>
        {museumExplorerData ? (
          <MuseumExplorerPanel
            data={museumExplorerData}
            onBack={closeMuseumExplorer}
            onShareArtifact={(item) => {
              if (item) {
                onShareArtifact(item);
              }
            }}
            onSpeakChinese={onSpeakArtifactChinese}
            onSpeakEnglish={onSpeakArtifactEnglish}
            speakButtonScale={speakButtonScale}
            speakingLanguage={speakingLanguage}
            styles={styles}
          />
        ) : (
          <NationalMapPanel nationalMap={selectedNationalMap} onBack={closeNationalMap} onOpenMuseum={openMuseumExplorer} />
        )}
      </View>
    );
  }

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🌍 世界魔法地图</Text>
        <Text style={styles.cityMapHint}>点亮城市，解锁世界探索之旅</Text>

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
          <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>世界总进度</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800' }}>
              城市：{completedCityCount} / {totalCityCount}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800' }}>
              国家：{completedCountryCount} / {countries.length}
            </Text>
            <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900' }}>总进度：{totalProgress}%</Text>
          </View>
          <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 12, overflow: 'hidden' }}>
            <View
              style={{
                backgroundColor: '#FBBF24',
                borderRadius: 999,
                height: '100%',
                width: `${totalProgress}%`,
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.cityMapList}>
        {countries.map((country) => (
          <WorldCountryCard
            country={country}
            expanded={expandedCountryIds.includes(country.countryId)}
            key={country.countryId}
            onEnterCountry={() => openNationalMap(country.countryId)}
            onToggle={() => toggleCountry(country.countryId)}
          />
        ))}
      </View>
    </View>
  );
}
