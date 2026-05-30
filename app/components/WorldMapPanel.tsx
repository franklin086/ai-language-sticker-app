import { Text, View } from 'react-native';
import { worldMagicMap } from '../data/worldMap';
import { buildWorldMapProgress, type WorldMapCitySource } from '../utils/worldMapHelpers';

type ComponentStyles = Record<string, any>;

export function WorldMapPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  styles,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: WorldMapCitySource[];
  styles: ComponentStyles;
}) {
  const countries = buildWorldMapProgress({
    cityMapCompletedNodeIds,
    cityMaps,
    worldMap: worldMagicMap,
  });
  const completedCountryCount = countries.filter((country) => country.completed).length;
  const completedMuseumCount = countries.reduce((sum, country) => sum + country.completedMuseumCount, 0);
  const totalMuseumCount = countries.reduce((sum, country) => sum + country.totalMuseumCount, 0);

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🌍 世界魔法地图</Text>
        <Text style={styles.cityMapHint}>
          藏品点亮博物馆，博物馆点亮城市，城市再点亮整个世界。
        </Text>
        <Text style={styles.cityMapProgressText}>
          国家进度：{completedCountryCount} / {countries.length} · 博物馆进度：{completedMuseumCount} / {totalMuseumCount}
        </Text>
      </View>

      <View style={styles.cityMapList}>
        {countries.map((country) => (
          <View key={country.countryId} style={[styles.cityMapCard, country.completed && styles.cityMapCardComplete]}>
            <View style={styles.cityMapCardHeader}>
              <View>
                <Text style={styles.cityMapCityName}>
                  {country.emoji} {country.countryName}
                </Text>
                <Text style={styles.cityMapProgressText}>
                  城市完成：{country.completedCityCount} / {country.totalCityCount}
                </Text>
                <Text style={styles.cityMapProgressText}>
                  博物馆完成：{country.completedMuseumCount} / {country.totalMuseumCount}
                </Text>
              </View>
              <Text style={styles.cityMapPercent}>{country.percent}%</Text>
            </View>

            <View style={styles.cityMapProgressTrack}>
              <View style={[styles.cityMapProgressFill, { width: `${country.percent}%` as `${number}%` }]} />
            </View>

            {country.completed ? <Text style={styles.cityMapMaster}>🏆 国家探索大师</Text> : null}

            <View style={styles.cityMapNodeList}>
              {country.cities.map((city) => (
                <View key={city.cityId} style={[styles.cityMapNode, city.completed && styles.cityMapNodeComplete]}>
                  <Text style={styles.cityMapNodeEmoji}>{city.completed ? city.emoji : '🔒'}</Text>
                  <Text numberOfLines={1} style={city.completed ? styles.cityMapNodeName : styles.cityMapNodeLockedName}>
                    {city.cityName}
                  </Text>
                  <Text style={city.completed ? styles.cityMapNodeStatus : styles.cityMapNodeLockedStatus}>
                    {city.completed ? '已点亮' : `${city.completedMuseumCount} / ${city.totalMuseumCount} · ${city.percent}%`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
