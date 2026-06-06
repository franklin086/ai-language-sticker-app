import { Text, View } from 'react-native';
import { useMagicMuseumLeague } from '../hooks/useMagicMuseumLeague';
import { MuseumLeagueCard } from './MuseumLeagueCard';

type ComponentStyles = Record<string, any>;
type MagicMuseumLeagueInput = Parameters<typeof useMagicMuseumLeague>[0];

export function MagicMuseumLeaguePanel({
  collection,
  museumCollectedIds,
  styles,
}: MagicMuseumLeagueInput & {
  styles: ComponentStyles;
}) {
  const leagueState = useMagicMuseumLeague({
    collection,
    museumCollectedIds,
  });

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>🏛 魔法博物馆联盟</Text>
        <Text style={styles.cityMapHint}>把世界博物馆连接成更大的探索联盟</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FDE68A', borderRadius: 18, borderWidth: 1, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>联盟总进度</Text>
          <Text style={{ color: '#B45309', fontSize: 28, fontWeight: '900', marginTop: 8 }}>
            {leagueState.totalPercent}%
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6 }}>
            联盟数量：{leagueState.leagues.length}
          </Text>
          <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 10, overflow: 'hidden' }}>
            <View
              style={{
                backgroundColor: '#FBBF24',
                borderRadius: 999,
                height: '100%',
                width: `${leagueState.totalPercent}%`,
              }}
            />
          </View>
        </View>

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>最接近完成联盟</Text>
        <MuseumLeagueCard highlighted league={leagueState.closestLeague} />

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>联盟列表</Text>
        {leagueState.leagues.map((league) => (
          <MuseumLeagueCard key={league.id} league={league} />
        ))}
      </View>
    </View>
  );
}
