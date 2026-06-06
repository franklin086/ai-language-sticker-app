import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { MagicMuseumLeagueProgress } from '../utils/magicMuseumLeagueHelpers';

function getStatusKey(status: MagicMuseumLeagueProgress['status']) {
  if (status === 'complete') {
    return 'completed';
  }

  if (status === 'growing') {
    return 'exploring';
  }

  return 'not_started';
}

export function MuseumLeagueCard({
  highlighted = false,
  league,
}: {
  highlighted?: boolean;
  league: MagicMuseumLeagueProgress;
}) {
  const { t } = useLanguage();
  const complete = league.status === 'complete';

  return (
    <View
      style={{
        backgroundColor: complete || highlighted ? '#FFFBEB' : '#FFFFFF',
        borderColor: complete || highlighted ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: complete || highlighted ? 2 : 1,
        marginTop: 12,
        padding: 14,
        shadowColor: complete || highlighted ? '#F59E0B' : '#7C3AED',
        shadowOpacity: complete || highlighted ? 0.18 : 0.08,
        shadowRadius: complete || highlighted ? 14 : 8,
      }}
    >
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: highlighted ? 18 : 15, fontWeight: '900' }}>
            {complete ? '✅' : league.emoji} {league.title}
          </Text>
          <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
            {t('league_badge')}: {league.theme}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', lineHeight: 18, marginTop: 6 }}>
            {league.description}
          </Text>
        </View>
        <Text style={{ color: complete ? '#B45309' : '#7C3AED', fontSize: 16, fontWeight: '900' }}>
          {league.percent}%
        </Text>
      </View>

      <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 12, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: complete ? '#FBBF24' : '#A78BFA',
            borderRadius: 999,
            height: '100%',
            width: `${league.percent}%`,
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
        <Text style={{ color: '#5B21B6', fontSize: 12, fontWeight: '800' }}>
          {t('discovered_count')}: {league.collectedCount} / {league.totalCount}
        </Text>
        <Text style={{ color: complete ? '#B45309' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>
          {t('status')}: {t(getStatusKey(league.status))}
        </Text>
      </View>
    </View>
  );
}
