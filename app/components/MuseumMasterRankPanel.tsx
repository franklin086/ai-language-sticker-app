import { Text, View } from 'react-native';
import { useMuseumMasterRank } from '../hooks/useMuseumMasterRank';

type ComponentStyles = Record<string, any>;

type MuseumMasterRankInput = Parameters<typeof useMuseumMasterRank>[0];

export function MuseumMasterRankPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  styles,
  totalArtifactCount,
}: MuseumMasterRankInput & {
  styles: ComponentStyles;
}) {
  const rank = useMuseumMasterRank({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
    totalArtifactCount,
  });

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🎓 馆长等级档案</Text>
        <Text style={styles.cityMapHint}>用探索足迹，解锁你的长期馆长身份</Text>
      </View>

      <View
        style={{
          backgroundColor: '#FFF7ED',
          borderColor: '#FBBF24',
          borderRadius: 24,
          borderWidth: 2,
          padding: 16,
          shadowColor: '#F59E0B',
          shadowOpacity: 0.18,
          shadowRadius: 16,
        }}
      >
        <Text style={{ color: '#6D28D9', fontSize: 24, fontWeight: '900' }}>
          Lv{rank.currentRank.id} {rank.currentRank.title}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '800', marginTop: 8 }}>
          {rank.currentRank.description}
        </Text>

        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#E9D5FF', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900' }}>当前进度</Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 8 }}>
            完成博物馆：{rank.completedMuseumCount} · 点亮城市：{rank.completedCityCount} · 完成国家：{rank.completedCountryCount}
          </Text>
          <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900', marginTop: 6 }}>
            护照印章：{rank.achievedPassportStampCount} / {rank.totalPassportStampCount}
          </Text>
          <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 12, overflow: 'hidden' }}>
            <View
              style={{
                backgroundColor: '#FBBF24',
                borderRadius: 999,
                height: '100%',
                width: `${Math.round((rank.currentRank.id / 7) * 100)}%`,
              }}
            />
          </View>
        </View>

        <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#92400E', fontSize: 15, fontWeight: '900' }}>
            {rank.nextRank ? `下一等级：Lv${rank.nextRank.id} ${rank.nextRank.title}` : '你已经是最高等级馆长！'}
          </Text>
          {rank.missingRequirements.length > 0 ? (
            rank.missingRequirements.map((item) => (
              <Text key={item} style={{ color: '#B45309', fontSize: 13, fontWeight: '800', marginTop: 6 }}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '800', marginTop: 6 }}>
              所有长期探索目标都已经完成。
            </Text>
          )}
        </View>

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>等级路线</Text>
        <View style={{ gap: 10, marginTop: 10 }}>
          {rank.ranks.map((item) => {
            const current = item.status === 'current';
            const achieved = item.status === 'achieved';

            return (
              <View
                key={item.id}
                style={{
                  backgroundColor: current ? '#FFFBEB' : achieved ? '#FFFFFF' : 'rgba(255, 255, 255, 0.58)',
                  borderColor: current ? '#FBBF24' : achieved ? '#C4B5FD' : '#DDD6FE',
                  borderRadius: 16,
                  borderWidth: current ? 2 : 1,
                  padding: 12,
                }}
              >
                <Text style={{ color: current ? '#B45309' : '#6D28D9', fontSize: 14, fontWeight: '900' }}>
                  {achieved ? '✅' : current ? '⭐' : '🔒'} Lv{item.id} {item.title}
                </Text>
                <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', marginTop: 4 }}>
                  {item.description}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
