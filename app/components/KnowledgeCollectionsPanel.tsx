import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { buildKnowledgeCollectionsState } from '../utils/knowledgeCollectionHelpers';
import { KnowledgeCollectionCard } from './KnowledgeCollectionCard';
import { KnowledgeQuizPanel } from './KnowledgeQuizPanel';

export function KnowledgeCollectionsPanel({
  collection,
  museumCollectedIds,
  onBack,
}: {
  collection: Parameters<typeof buildKnowledgeCollectionsState>[0]['collection'];
  museumCollectedIds: string[];
  onBack: () => void;
}) {
  const [showQuiz, setShowQuiz] = useState(false);
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
      />
    );
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Pressable
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
            borderColor: '#C4B5FD',
            borderRadius: 999,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 8,
          })}
          onPress={onBack}
        >
          <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>← {t('back_to_guild')}</Text>
        </Pressable>

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
          <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>🧠 知识挑战</Text>
        </Pressable>
      </View>

      <Text style={{ color: '#6D28D9', fontSize: 25, fontWeight: '900', marginTop: 14, textAlign: 'center' }}>
        📚 主题知识册
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
        按知识分类整理你的发现进度
      </Text>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900' }}>知识册统计</Text>
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
