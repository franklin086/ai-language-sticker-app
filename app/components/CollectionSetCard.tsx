import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { CollectionSetProgress } from '../utils/collectionSetHelpers';

function getStatusKey(status: CollectionSetProgress['status']) {
  if (status === 'completed') {
    return 'completed';
  }

  if (status === 'collecting') {
    return 'exploring';
  }

  return 'not_started';
}

export function CollectionSetCard({
  highlighted = false,
  set,
}: {
  highlighted?: boolean;
  set: CollectionSetProgress;
}) {
  const { t } = useLanguage();
  const completed = set.status === 'completed';

  return (
    <View
      style={{
        backgroundColor: completed || highlighted ? '#FFFBEB' : '#FFFFFF',
        borderColor: completed || highlighted ? '#FBBF24' : '#E9D5FF',
        borderRadius: 18,
        borderWidth: completed || highlighted ? 2 : 1,
        marginTop: 12,
        padding: 14,
        shadowColor: completed || highlighted ? '#F59E0B' : '#7C3AED',
        shadowOpacity: completed || highlighted ? 0.18 : 0.08,
        shadowRadius: completed || highlighted ? 14 : 8,
      }}
    >
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6D28D9', fontSize: highlighted ? 18 : 15, fontWeight: '900' }}>
            {completed ? '✅' : set.emoji} {set.title}
          </Text>
          <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
            {t('theme')}: {set.theme}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', lineHeight: 18, marginTop: 6 }}>
            {set.description}
          </Text>
        </View>
        <Text style={{ color: completed ? '#B45309' : '#7C3AED', fontSize: 16, fontWeight: '900' }}>
          {set.percent}%
        </Text>
      </View>

      <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 10, marginTop: 12, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: completed ? '#FBBF24' : '#A78BFA',
            borderRadius: 999,
            height: '100%',
            width: `${set.percent}%`,
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
        <Text style={{ color: '#5B21B6', fontSize: 12, fontWeight: '800' }}>
          {t('completed')}: {set.acquiredCount} / {set.totalCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>
          {t('missing')}: {set.missingCount}
        </Text>
        <Text style={{ color: completed ? '#B45309' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>
          {t('status')}: {t(getStatusKey(set.status))}
        </Text>
      </View>

      <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '800', marginTop: 8 }}>
        {t('reward_preview')}: {set.rewardPreview}
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
        {set.artifacts.map((artifact) => (
          <View
            key={artifact.requiredName}
            style={{
              backgroundColor: artifact.discovered ? '#FFFFFF' : '#F8F5FF',
              borderColor: artifact.discovered ? '#FBBF24' : '#DDD6FE',
              borderRadius: 14,
              borderWidth: 1,
              opacity: artifact.discovered ? 1 : 0.62,
              paddingHorizontal: 9,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>
              {artifact.discovered ? artifact.artifact?.emoji ?? '✅' : '❓'} {artifact.discovered ? artifact.label : t('mysterious_artifact')}
            </Text>
            {!artifact.discovered ? (
              <Text style={{ color: '#7C3AED', fontSize: 10, fontWeight: '800', marginTop: 3 }}>
                {artifact.requiredName}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}
