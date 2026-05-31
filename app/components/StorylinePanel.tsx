import { Text, View } from 'react-native';
import { useStoryline } from '../hooks/useStoryline';
import { StorylineProgressCard } from './StorylineProgressCard';

type ComponentStyles = Record<string, any>;
type StorylineInput = Parameters<typeof useStoryline>[0];

export function StorylinePanel({
  cityMapCompletedNodeIds,
  cityMaps,
  restoredMemoryCount,
  styles,
  totalMemoryCount,
}: StorylineInput & {
  styles: ComponentStyles;
}) {
  const storyline = useStoryline({
    cityMapCompletedNodeIds,
    cityMaps,
    restoredMemoryCount,
    totalMemoryCount,
  });

  return (
    <View style={styles.cityMapPanel}>
      <View style={styles.cityMapHero}>
        <Text style={styles.cityMapTitle}>📖 世界记忆之书</Text>
        <Text style={styles.cityMapHint}>每一次发现，都会恢复一点世界记忆</Text>
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#E9D5FF', borderRadius: 24, borderWidth: 1, padding: 16 }}>
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>很久以前</Text>
        <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '700', lineHeight: 20, marginTop: 8 }}>
          魔法世界拥有一本《世界记忆之书》。后来，一场遗忘风暴吹散了许多记忆碎片。动物、交通工具、人物、科技和文化都失去了部分记忆。每发现一个新的藏品，就会恢复一点世界记忆。
        </Text>

        <StorylineProgressCard
          restoredMemoryCount={storyline.restoredMemoryCount}
          totalMemoryCount={storyline.totalMemoryCount}
        />

        <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900' }}>当前章节</Text>
          <Text style={{ color: '#6D28D9', fontSize: 20, fontWeight: '900', marginTop: 6 }}>
            {storyline.currentChapter.title}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', lineHeight: 20, marginTop: 8 }}>
            {storyline.currentChapter.unlocked ? storyline.currentChapter.storyText : '🔒 继续探索解锁'}
          </Text>
        </View>

        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>章节目录</Text>
        <View style={{ gap: 10, marginTop: 10 }}>
          {storyline.chapters.map((chapter) => (
            <View
              key={chapter.id}
              style={{
                backgroundColor: chapter.unlocked ? '#FFFFFF' : 'rgba(255, 255, 255, 0.58)',
                borderColor: chapter.unlocked ? '#C4B5FD' : '#DDD6FE',
                borderRadius: 16,
                borderStyle: chapter.unlocked ? 'solid' : 'dashed',
                borderWidth: 1,
                opacity: chapter.unlocked ? 1 : 0.72,
                padding: 12,
              }}
            >
              <Text style={{ color: '#5B21B6', fontSize: 14, fontWeight: '900' }}>
                {chapter.unlocked ? '✨' : '🔒'} {chapter.title}
              </Text>
              <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '700', marginTop: 4 }}>
                {chapter.unlocked ? chapter.description : '继续探索解锁'}
              </Text>
              <Text style={{ color: chapter.unlocked ? '#B45309' : '#8B5CF6', fontSize: 12, fontWeight: '800', marginTop: 6 }}>
                {chapter.unlocked ? chapter.unlockCondition : chapter.lockedReason}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
