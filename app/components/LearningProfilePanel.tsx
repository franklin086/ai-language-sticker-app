import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';
import { buildLearningProfileStats } from '../utils/learningProfileHelpers';
import { KnowledgeMasteryPanel } from './KnowledgeMasteryPanel';
import { LearningBackButton } from './LearningBackButton';
import { LearningProfileCard } from './LearningProfileCard';
import { LearningStatisticsPanel } from './LearningStatisticsPanel';
import { LearningTimelinePanel } from './LearningTimelinePanel';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy = {
  zh: {
    academyLevel: '学院等级',
    audioCoverage: '音频覆盖率',
    completedChallenges: '已解锁挑战',
    completedKnowledgeBooks: '完成知识册',
    discoveredArtifacts: '总发现藏品',
    helper: '基于你已发现的藏品生成学习档案',
    knowledgePoints: '总知识点',
    title: '📊 学习档案',
  },
  en: {
    academyLevel: 'Academy Level',
    audioCoverage: 'Audio Coverage',
    completedChallenges: 'Unlocked Challenges',
    completedKnowledgeBooks: 'Completed Books',
    discoveredArtifacts: 'Artifacts Found',
    helper: 'Built from artifacts you have discovered',
    knowledgePoints: 'Knowledge Points',
    title: '📊 Learning Profile',
  },
  es: {
    academyLevel: 'Nivel de academia',
    audioCoverage: 'Cobertura de audio',
    completedChallenges: 'Retos desbloqueados',
    completedKnowledgeBooks: 'Libros completados',
    discoveredArtifacts: 'Tesoros descubiertos',
    helper: 'Creado con los tesoros que ya descubriste',
    knowledgePoints: 'Puntos de conocimiento',
    title: '📊 Perfil de aprendizaje',
  },
  pt: {
    academyLevel: 'Nível da academia',
    audioCoverage: 'Cobertura de áudio',
    completedChallenges: 'Desafios liberados',
    completedKnowledgeBooks: 'Livros concluídos',
    discoveredArtifacts: 'Itens descobertos',
    helper: 'Criado com os itens que você já descobriu',
    knowledgePoints: 'Pontos de conhecimento',
    title: '📊 Perfil de aprendizagem',
  },
  ja: {
    academyLevel: '学院レベル',
    audioCoverage: '音声カバー率',
    completedChallenges: '解放済みチャレンジ',
    completedKnowledgeBooks: '完成した知識ブック',
    discoveredArtifacts: '発見したコレクション',
    helper: '発見済みコレクションから作られる学習プロフィール',
    knowledgePoints: '知識ポイント',
    title: '📊 学習プロフィール',
  },
};

export function LearningProfilePanel({
  audioCoverageLevel,
  audioStats,
  collection,
  museumCollectedIds,
  onBack,
}: {
  audioCoverageLevel: string;
  audioStats: AudioCoverageStats;
  collection: CollectionLike[];
  museumCollectedIds: string[];
  onBack: () => void;
}) {
  const { currentLanguage, t } = useLanguage();
  const labels = copy[currentLanguage] ?? copy.en;
  const stats = buildLearningProfileStats({
    audioCoverageLevel,
    audioStats,
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });

  return (
    <View>
      <LearningBackButton label={t('back_to_guild')} onPress={onBack} />

      <Text style={{ color: '#6D28D9', fontSize: 23, fontWeight: '900', lineHeight: 30, textAlign: 'center' }}>
        {labels.title}
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', lineHeight: 19, marginTop: 6, textAlign: 'center' }}>
        {labels.helper}
      </Text>

      <View
        style={{
          backgroundColor: '#FFF7D6',
          borderColor: '#FBBF24',
          borderRadius: 22,
          borderWidth: 2,
          marginTop: 14,
          padding: 14,
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          <LearningProfileCard label={labels.discoveredArtifacts} value={stats.totalDiscoveredArtifacts} />
          <LearningProfileCard label={labels.knowledgePoints} value={stats.totalKnowledgePointCount} />
          <LearningProfileCard label={labels.completedKnowledgeBooks} value={stats.completedKnowledgeCollectionCount} />
          <LearningProfileCard label={labels.completedChallenges} value={stats.completedChallengeCount} />
          <LearningProfileCard
            helperText={`${stats.academyProgressPercent}%`}
            label={labels.academyLevel}
            value={`LV ${stats.academyLevel}`}
          />
          <LearningProfileCard
            helperText={stats.audioCoverageLevel}
            label={labels.audioCoverage}
            value={`${stats.audioCoveragePercent}%`}
          />
        </View>
      </View>

      <LearningStatisticsPanel
        audioStats={audioStats}
        collection={collection}
        museumCollectedIds={museumCollectedIds}
      />

      <KnowledgeMasteryPanel
        collection={collection}
        museumCollectedIds={museumCollectedIds}
      />

      <LearningTimelinePanel
        collection={collection}
        museumCollectedIds={museumCollectedIds}
      />
    </View>
  );
}
