import { useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import {
  getMuseumArtifactCategory,
  findMuseumArtifact,
  type StickerCategoryKey,
} from '../utils/artifactHelpers';
import type { MuseumExplorerArtifact, MuseumExplorerData } from '../utils/museumExplorerHelpers';
import { ArtifactDetailModal } from './ArtifactDetailModal';
import { MuseumArtifactGrid } from './MuseumArtifactGrid';
import { MuseumNpcCard } from './MuseumNpcCard';

type ComponentStyles = Record<string, any>;
type SpeakingLanguage = 'zh' | 'en' | null;

function getArtifactCategory(artifact: MuseumExplorerArtifact): StickerCategoryKey {
  const museumArtifact = findMuseumArtifact({
    confidence: artifact.item?.confidence,
    object_en: artifact.item?.object_en ?? artifact.exhibit.object_en,
    object_zh: artifact.item?.object_zh ?? artifact.exhibit.object_zh,
  });

  return museumArtifact ? getMuseumArtifactCategory(museumArtifact) : 'common';
}

function getRarityLabel(category: StickerCategoryKey) {
  if (category === 'legendary') {
    return '传奇';
  }

  if (category === 'epic') {
    return '史诗';
  }

  if (category === 'rare') {
    return '稀有';
  }

  return '普通';
}

function formatDate(discoveredAt: string) {
  if (!discoveredAt) {
    return '尚未发现';
  }

  return new Date(discoveredAt).toLocaleDateString('zh-CN');
}

function formatConfidence(confidence: string) {
  return confidence || 'high';
}

export function MuseumExplorerPanel({
  data,
  onBack,
  onShareArtifact,
  onSpeakChinese,
  onSpeakEnglish,
  speakButtonScale,
  speakingLanguage,
  styles,
}: {
  data: MuseumExplorerData;
  onBack: () => void;
  onShareArtifact: (item: MuseumExplorerData['artifacts'][number]['item']) => void;
  onSpeakChinese: (text: string) => void;
  onSpeakEnglish: (text: string) => void;
  speakButtonScale: Animated.AnimatedInterpolation<string | number>;
  speakingLanguage: SpeakingLanguage;
  styles: ComponentStyles;
}) {
  const [selectedArtifact, setSelectedArtifact] = useState<MuseumExplorerArtifact | null>(null);

  return (
    <View style={{ backgroundColor: '#FFF7ED', borderColor: data.completed ? '#FBBF24' : '#E9D5FF', borderRadius: 24, borderWidth: data.completed ? 2 : 1, padding: 16 }}>
      <Text style={{ color: '#6D28D9', fontSize: 24, fontWeight: '900' }}>🏛 博物馆探索页</Text>
      <Text style={{ color: '#5B21B6', fontSize: 20, fontWeight: '900', marginTop: 8 }}>{data.museumName}</Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '700', marginTop: 6 }}>
        {data.countryName} · {data.cityName}
      </Text>

      <MuseumNpcCard collectedCount={data.collectedCount} museumName={data.museum.title} totalCount={data.totalCount} />

      <View style={{ backgroundColor: data.completed ? '#FFFBEB' : '#FFFFFF', borderColor: data.completed ? '#FBBF24' : '#E9D5FF', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
        <Text style={{ color: data.completed ? '#B45309' : '#6D28D9', fontSize: 16, fontWeight: '900' }}>
          {data.completed ? '🏅 博物馆完成印章' : '继续探索，收集更多藏品'}
        </Text>
        {data.completed ? (
          <Text style={{ color: '#92400E', fontSize: 13, fontWeight: '900', marginTop: 6 }}>馆长认证完成</Text>
        ) : null}
        <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 10 }}>
          已收藏藏品：{data.collectedCount} / {data.totalCount}
        </Text>
        <Text style={{ color: '#B45309', fontSize: 15, fontWeight: '900', marginTop: 4 }}>完成度：{data.percent}%</Text>
        <View style={{ backgroundColor: '#F3E8FF', borderRadius: 999, height: 12, marginTop: 10, overflow: 'hidden' }}>
          <View style={{ backgroundColor: '#FBBF24', borderRadius: 999, height: '100%', width: `${data.percent}%` }} />
        </View>
      </View>

      <MuseumArtifactGrid
        artifacts={data.artifacts}
        getRarityLabel={(artifact) => getRarityLabel(getArtifactCategory(artifact))}
        onOpenArtifact={setSelectedArtifact}
      />

      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
          borderColor: '#C4B5FD',
          borderRadius: 16,
          borderWidth: 1,
          marginTop: 16,
          padding: 14,
        })}
        onPress={onBack}
      >
        <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>返回国家地图</Text>
      </Pressable>

      {selectedArtifact?.item ? (
        <ArtifactDetailModal
          exhibit={selectedArtifact.exhibit}
          item={selectedArtifact.item}
          museum={data.museum}
          onClose={() => setSelectedArtifact(null)}
          onShare={() => onShareArtifact(selectedArtifact.item)}
          onSpeakChinese={() => onSpeakChinese(selectedArtifact.item?.object_zh ?? selectedArtifact.exhibit.object_zh)}
          onSpeakEnglish={() => onSpeakEnglish(selectedArtifact.item?.object_en ?? selectedArtifact.exhibit.object_en)}
          speakButtonScale={speakButtonScale}
          speakingLanguage={speakingLanguage}
          styles={styles}
          getGalleryArtifactDetails={(exhibit, collection) => {
            const item = collection[0];
            return {
              discoveredAt: item ? formatDate(item.discoveredAt) : '尚未发现',
              emoji: item?.emoji ?? exhibit.emoji,
              rarityLabel: getRarityLabel(getArtifactCategory({ discovered: Boolean(item), exhibit, item: item ?? null })),
              story: findMuseumArtifact({
                confidence: item?.confidence,
                object_en: item?.object_en ?? exhibit.object_en,
                object_zh: item?.object_zh ?? exhibit.object_zh,
              })?.story ?? '每一次发现，都会让你的魔法图鉴变得更丰富。',
            };
          }}
          getStickerCategory={(item) =>
            getArtifactCategory({
              discovered: true,
              exhibit: selectedArtifact.exhibit,
              item: {
                confidence: item.confidence,
                discoveredAt: selectedArtifact.item?.discoveredAt ?? '',
                emoji: selectedArtifact.item?.emoji ?? selectedArtifact.exhibit.emoji,
                object_en: item.object_en,
                object_zh: item.object_zh,
              },
            })
          }
          formatDiscoveredAt={formatDate}
          formatConfidence={formatConfidence}
        />
      ) : null}
    </View>
  );
}
