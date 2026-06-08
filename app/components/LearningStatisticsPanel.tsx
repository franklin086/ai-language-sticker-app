import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';
import { buildLearningStatistics, type LearningStatisticsId } from '../utils/learningStatisticsHelpers';
import { LearningStatisticsCard } from './LearningStatisticsCard';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy: Record<
  string,
  {
    academySource: string;
    labels: Record<LearningStatisticsId, string>;
    title: string;
  }
> = {
  zh: {
    academySource: '包含探索学院进度来源',
    labels: {
      audioCoverageRate: '音频覆盖率',
      challengeCompletionRate: '挑战完成率',
      collectionCompletionRate: '知识册完成率',
      discoveryRate: '发现率',
      knowledgeCompletionRate: '知识完成率',
    },
    title: '📈 学习统计',
  },
  en: {
    academySource: 'Includes Explorer Academy progress source',
    labels: {
      audioCoverageRate: 'Audio Coverage',
      challengeCompletionRate: 'Challenge Completion',
      collectionCompletionRate: 'Book Completion',
      discoveryRate: 'Discovery Rate',
      knowledgeCompletionRate: 'Knowledge Completion',
    },
    title: '📈 Learning Statistics',
  },
  es: {
    academySource: 'Incluye el progreso de la academia',
    labels: {
      audioCoverageRate: 'Cobertura de audio',
      challengeCompletionRate: 'Progreso de retos',
      collectionCompletionRate: 'Libros completados',
      discoveryRate: 'Tasa de descubrimiento',
      knowledgeCompletionRate: 'Progreso de conocimiento',
    },
    title: '📈 Estadísticas de aprendizaje',
  },
  pt: {
    academySource: 'Inclui progresso da academia',
    labels: {
      audioCoverageRate: 'Cobertura de áudio',
      challengeCompletionRate: 'Progresso dos desafios',
      collectionCompletionRate: 'Livros concluídos',
      discoveryRate: 'Taxa de descoberta',
      knowledgeCompletionRate: 'Progresso do conhecimento',
    },
    title: '📈 Estatísticas de aprendizagem',
  },
  ja: {
    academySource: '探索学院の進み具合も含みます',
    labels: {
      audioCoverageRate: '音声カバー率',
      challengeCompletionRate: 'チャレンジ進行率',
      collectionCompletionRate: '知識ブック完成率',
      discoveryRate: '発見率',
      knowledgeCompletionRate: '知識完成率',
    },
    title: '📈 学習統計',
  },
};

export function LearningStatisticsPanel({
  audioStats,
  collection,
  museumCollectedIds,
}: {
  audioStats: AudioCoverageStats;
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const { currentLanguage } = useLanguage();
  const labels = copy[currentLanguage] ?? copy.en;
  const statistics = buildLearningStatistics({
    audioStats,
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });

  return (
    <View
      style={{
        backgroundColor: '#F5E8FF',
        borderColor: '#C4B5FD',
        borderRadius: 22,
        borderWidth: 2,
        marginTop: 14,
        padding: 14,
      }}
    >
      <Text style={{ color: '#6D28D9', fontSize: 18, fontWeight: '900', lineHeight: 24, textAlign: 'center' }}>
        {labels.title}
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 17, marginTop: 4, textAlign: 'center' }}>
        {labels.academySource} · {statistics.academyProgressPercent}%
      </Text>

      <View style={{ gap: 10, marginTop: 12 }}>
        {statistics.items.map((item) => (
          <LearningStatisticsCard
            completed={item.completed}
            key={item.id}
            label={labels.labels[item.id]}
            percent={item.percent}
            total={item.total}
          />
        ))}
      </View>
    </View>
  );
}
