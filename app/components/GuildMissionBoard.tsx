import { Text, View } from 'react-native';
import type { MagicGuildData } from '../utils/magicGuildHelpers';

export function GuildMissionBoard({ guild }: { guild: MagicGuildData }) {
  return (
    <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderRadius: 20, borderWidth: 1, marginTop: 14, padding: 14 }}>
      <Text style={{ color: '#92400E', fontSize: 16, fontWeight: '900' }}>公会任务板</Text>
      <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', marginTop: 10 }}>当前主线章节</Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 4 }}>{guild.currentStoryChapter}</Text>
      <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', marginTop: 10 }}>当前远征</Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 4 }}>{guild.currentExpeditionTitle}</Text>
      <Text style={{ color: '#B45309', fontSize: 14, fontWeight: '900', marginTop: 12 }}>下一目标：</Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', lineHeight: 19, marginTop: 4 }}>{guild.nextGoal}</Text>
    </View>
  );
}
