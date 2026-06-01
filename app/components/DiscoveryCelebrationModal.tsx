import { Pressable, Text, View } from 'react-native';
import type { DiscoveryCelebrationData } from '../utils/discoveryCelebrationHelpers';

function getGlowColors(category: DiscoveryCelebrationData['rarityCategory']) {
  if (category === 'legendary') {
    return {
      borderColor: '#F472B6',
      glow: '#F59E0B',
      title: '🌈 传奇发现！',
    };
  }

  if (category === 'epic') {
    return {
      borderColor: '#A855F7',
      glow: '#7C3AED',
      title: '🟣 史诗发现！',
    };
  }

  if (category === 'rare') {
    return {
      borderColor: '#60A5FA',
      glow: '#2563EB',
      title: '🔵 稀有发现！',
    };
  }

  return {
    borderColor: '#FBBF24',
    glow: '#F59E0B',
    title: '✨ 新发现！',
  };
}

export function DiscoveryCelebrationModal({
  data,
  onClose,
}: {
  data: DiscoveryCelebrationData;
  onClose: () => void;
}) {
  const colors = getGlowColors(data.rarityCategory);

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'rgba(48, 16, 96, 0.42)',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        padding: 20,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 30,
      }}
    >
      <View
        style={{
          backgroundColor: '#FFF7ED',
          borderColor: colors.borderColor,
          borderRadius: 28,
          borderWidth: 3,
          maxWidth: 420,
          padding: 22,
          shadowColor: colors.glow,
          shadowOpacity: 0.32,
          shadowRadius: 24,
          width: '100%',
        }}
      >
        <Text style={{ color: '#6D28D9', fontSize: 26, fontWeight: '900', textAlign: 'center' }}>{colors.title}</Text>
        <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
          世界记忆恢复了一点点
        </Text>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#FDE68A',
            borderRadius: 22,
            borderWidth: 1,
            marginTop: 16,
            padding: 16,
          }}
        >
          <Text style={{ fontSize: 58 }}>{data.emoji}</Text>
          <Text style={{ color: '#5B21B6', fontSize: 22, fontWeight: '900', marginTop: 8 }}>{data.objectZh}</Text>
          <Text style={{ color: '#7C3AED', fontSize: 15, fontWeight: '800', marginTop: 4 }}>{data.objectEn}</Text>
          <Text style={{ color: '#B45309', fontSize: 13, fontWeight: '900', marginTop: 10 }}>
            {data.museumTitle} · {data.rarityLabel}
          </Text>
        </View>

        <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 12 }}>
          <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900' }}>远征进度</Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6 }}>{data.expeditionHint}</Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#E9D5FF', borderRadius: 18, borderWidth: 1, marginTop: 12, padding: 12 }}>
          <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900' }}>馆长祝福</Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', lineHeight: 19, marginTop: 6 }}>
            {data.curatorBlessing}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#7C3AED' : '#8B5CF6',
            borderRadius: 18,
            marginTop: 16,
            padding: 14,
          })}
          onPress={onClose}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '900', textAlign: 'center' }}>继续探索</Text>
        </Pressable>
      </View>
    </View>
  );
}
