import { Text, View } from 'react-native';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';

function AudioCoverageRow({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800' }}>{label}</Text>
      <Text style={{ color: '#4C1D95', fontSize: 12, fontWeight: '900' }}>{value}</Text>
    </View>
  );
}

export function AudioCoverageCard({
  coverageLevel,
  stats,
}: {
  coverageLevel: string;
  stats: AudioCoverageStats;
}) {
  return (
    <View
      style={{
        backgroundColor: '#FFFBEB',
        borderColor: '#FBBF24',
        borderRadius: 18,
        borderWidth: 1,
        marginTop: 14,
        padding: 12,
        shadowColor: '#F59E0B',
        shadowOpacity: 0.12,
        shadowRadius: 10,
      }}
    >
      <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900' }}>🎧 发音覆盖率</Text>
      <AudioCoverageRow label="总藏品" value={stats.totalArtifacts} />
      <AudioCoverageRow label="本地发音" value={stats.localAudioCount} />
      <AudioCoverageRow label="AI发音" value={stats.ttsAudioCount} />
      <AudioCoverageRow label="真人发音" value={stats.humanAudioCount} />
      <AudioCoverageRow label="暂无发音" value={stats.noneAudioCount} />
      <AudioCoverageRow label="覆盖率" value={`${stats.coveragePercent}%`} />
      <AudioCoverageRow label="覆盖等级" value={coverageLevel} />
    </View>
  );
}
