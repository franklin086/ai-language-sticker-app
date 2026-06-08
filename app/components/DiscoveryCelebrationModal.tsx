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
          overflow: 'hidden',
          padding: 22,
          shadowColor: colors.glow,
          shadowOpacity: 0.32,
          shadowRadius: 24,
          width: '100%',
        }}
      >
        <View
          pointerEvents="none"
          style={{
            backgroundColor: colors.glow,
            borderRadius: 90,
            height: 180,
            opacity: 0.14,
            position: 'absolute',
            right: -58,
            top: -72,
            width: 180,
          }}
        />
        <Text style={{ color: '#8B3A10', fontSize: 16, fontWeight: '900', textAlign: 'center' }}>🎉 发现新藏品！</Text>
        <Text style={{ color: '#6D28D9', fontSize: 27, fontWeight: '900', lineHeight: 34, marginTop: 4, textAlign: 'center' }}>
          ✨ 太棒了！
        </Text>
        <Text style={{ color: '#DB2777', fontSize: 16, fontWeight: '900', marginTop: 4, textAlign: 'center' }}>
          🌟 语言宝藏已解锁！
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '900', marginTop: 7, textAlign: 'center' }}>{colors.title}</Text>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#FDE68A',
            borderRadius: 22,
            borderWidth: 2,
            marginTop: 16,
            padding: 16,
            shadowColor: colors.glow,
            shadowOpacity: 0.16,
            shadowRadius: 18,
          }}
        >
          <Text style={{ fontSize: 58 }}>{data.emoji}</Text>
          <Text style={{ color: '#A05A16', fontSize: 12, fontWeight: '900', marginTop: 8 }}>中文</Text>
          <Text style={{ color: '#5B21B6', fontSize: 24, fontWeight: '900', lineHeight: 31 }}>{data.objectZh}</Text>
          <Text style={{ color: '#A05A16', fontSize: 12, fontWeight: '900', marginTop: 8 }}>English</Text>
          <Text style={{ color: '#7C3AED', fontSize: 17, fontWeight: '900', lineHeight: 23 }}>{data.objectEn}</Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
            <View style={{ backgroundColor: '#FFF7D6', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 }}>
              <Text style={{ color: '#92400E', fontSize: 12, fontWeight: '900' }}>稀有度：{data.rarityLabel}</Text>
            </View>
            <View style={{ backgroundColor: '#F5E8FF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 }}>
              <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>所属博物馆：{data.museumTitle}</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
          <Pressable
            style={({ pressed }) => ({
              alignItems: 'center',
              backgroundColor: pressed ? '#FDE68A' : '#FFF7D6',
              borderColor: '#FBBF24',
              borderRadius: 18,
              borderWidth: 1,
              flex: 1,
              minWidth: 132,
              paddingHorizontal: 12,
              paddingVertical: 12,
            })}
            onPress={onClose}
          >
            <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>📖 阅读故事</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              alignItems: 'center',
              backgroundColor: pressed ? '#DDD6FE' : '#F5E8FF',
              borderColor: '#C4B5FD',
              borderRadius: 18,
              borderWidth: 1,
              flex: 1,
              minWidth: 132,
              paddingHorizontal: 12,
              paddingVertical: 12,
            })}
            onPress={onClose}
          >
            <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>🧠 查看知识</Text>
          </Pressable>
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
