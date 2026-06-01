import { Pressable, Text, View } from 'react-native';
import { useMagicGuild } from '../hooks/useMagicGuild';
import { GuildMissionBoard } from './GuildMissionBoard';
import { GuildStatusCard } from './GuildStatusCard';

type MagicGuildInput = Parameters<typeof useMagicGuild>[0];

export function MagicGuildPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  onClose,
  totalArtifactCount,
}: MagicGuildInput & {
  onClose: () => void;
}) {
  const guild = useMagicGuild({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
    totalArtifactCount,
  });

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
        zIndex: 28,
      }}
    >
      <View
        style={{
          backgroundColor: '#FFF7ED',
          borderColor: '#FBBF24',
          borderRadius: 28,
          borderWidth: 2,
          maxWidth: 520,
          padding: 20,
          shadowColor: '#F59E0B',
          shadowOpacity: 0.24,
          shadowRadius: 22,
          width: '100%',
        }}
      >
        <Text style={{ color: '#6D28D9', fontSize: 25, fontWeight: '900', textAlign: 'center' }}>
          🏛 魔法探索者公会总部
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
          欢迎回来，小馆长
        </Text>

        <View style={{ marginTop: 16 }}>
          <GuildStatusCard guild={guild} />
          <GuildMissionBoard guild={guild} />
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#E9D5FF', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 12 }}>
          <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>公会入口已连接</Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 6 }}>
            馆长等级、世界远征、主线剧情、魔法护照和世界地图都会在这里汇总显示。
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
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '900', textAlign: 'center' }}>返回首页</Text>
        </Pressable>
      </View>
    </View>
  );
}
