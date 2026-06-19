import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { buildKnowledgeCollectionsState } from '../utils/knowledgeCollectionHelpers';
import { KnowledgeCollectionCard } from './KnowledgeCollectionCard';
import { KnowledgeQuizPanel } from './KnowledgeQuizPanel';
import { LearningBackButton } from './LearningBackButton';

export function KnowledgeCollectionsPanel({
  collection,
  initialShowQuiz = false,
  museumCollectedIds,
  onBack,
  onOpenLearningDashboard,
  preferredQuizArtifactKey,
}: {
  collection: Parameters<typeof buildKnowledgeCollectionsState>[0]['collection'];
  initialShowQuiz?: boolean;
  museumCollectedIds: string[];
  onBack: () => void;
  onOpenLearningDashboard?: () => void;
  preferredQuizArtifactKey?: string | null;
}) {
  const [showQuiz, setShowQuiz] = useState(initialShowQuiz);
  const { currentLanguage, t } = useLanguage();
  const state = buildKnowledgeCollectionsState({
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });

  if (showQuiz) {
    return (
      <KnowledgeQuizPanel
        collection={collection}
        museumCollectedIds={museumCollectedIds}
        onBack={() => setShowQuiz(false)}
        onOpenLearningDashboard={onOpenLearningDashboard}
        preferredArtifactKey={preferredQuizArtifactKey}
      />
    );
  }

  return (
    <View>
      <LearningBackButton label={t('back_to_guild')} onPress={onBack} />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Pressable
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            backgroundColor: pressed ? '#FEF3C7' : '#FFFFFF',
            borderColor: '#FBBF24',
            borderRadius: 999,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 8,
          })}
          onPress={() => setShowQuiz(true)}
        >
          <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900', lineHeight: 17, textAlign: 'center' }}>🧠 知识挑战</Text>
        </Pressable>
      </View>

      <Text style={{ color: '#6D28D9', fontSize: 23, fontWeight: '900', lineHeight: 30, marginTop: 14, textAlign: 'center' }}>
        📚 主题知识册
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
        按知识分类整理你的发现进度
      </Text>

      <View style={{ backgroundColor: '#FFF7D6', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#8B3A10', fontSize: 15, fontWeight: '900', lineHeight: 21, textAlign: 'center' }}>
          收集知识点
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '900', lineHeight: 20, marginTop: 5, textAlign: 'center' }}>
          完成主题知识册
        </Text>
        <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', lineHeight: 20, marginTop: 5, textAlign: 'center' }}>
          解锁更高学习进度
        </Text>
      </View>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900', lineHeight: 21 }}>知识册统计</Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 8 }}>
          总知识册数量：{state.totalCollectionCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
          已开始知识册数量：{state.startedCollectionCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
          完成知识册数量：{state.completedCollectionCount}
        </Text>
      </View>

      <ScrollView style={{ maxHeight: 460, marginTop: 14 }} contentContainerStyle={{ paddingBottom: 8 }}>
        {state.collections.map((item) => (
          <KnowledgeCollectionCard item={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
}
