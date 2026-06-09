import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';
import { buildLearningDashboard } from '../utils/learningDashboardHelpers';
import { JourneyPanel } from './JourneyPanel';
import { KnowledgeMasteryPanel } from './KnowledgeMasteryPanel';
import { LearningBackButton } from './LearningBackButton';
import { LearningDashboardCard } from './LearningDashboardCard';
import { LearningMotivationPanel } from './LearningMotivationPanel';
import { LearningStatisticsPanel } from './LearningStatisticsPanel';
import { LearningTimelinePanel } from './LearningTimelinePanel';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy = {
  zh: {
    academyLevel: '当前学院等级',
    audioCoverage: '音频覆盖率',
    challengeCompletion: '挑战完成率',
    completedBooks: '完成知识册',
    helper: '把学习档案、统计、掌握度和时间轴汇总在一起',
    knowledgeMastery: '知识掌握度',
    knowledgePoints: '总知识点',
    timelineEvents: '学习时间轴',
    title: '📊 学习总览',
    totalDiscovered: '总发现藏品',
  },
  en: {
    academyLevel: 'Academy Level',
    audioCoverage: 'Audio Coverage',
    challengeCompletion: 'Challenge Completion',
    completedBooks: 'Completed Books',
    helper: 'Profile, statistics, mastery, and timeline in one place',
    knowledgeMastery: 'Knowledge Mastery',
    knowledgePoints: 'Knowledge Points',
    timelineEvents: 'Timeline',
    title: '📊 Learning Dashboard',
    totalDiscovered: 'Artifacts Found',
  },
  es: {
    academyLevel: 'Nivel de academia',
    audioCoverage: 'Cobertura de audio',
    challengeCompletion: 'Progreso de retos',
    completedBooks: 'Libros completados',
    helper: 'Perfil, estadísticas, dominio y línea de tiempo juntos',
    knowledgeMastery: 'Dominio del conocimiento',
    knowledgePoints: 'Puntos de conocimiento',
    timelineEvents: 'Línea de tiempo',
    title: '📊 Panel de aprendizaje',
    totalDiscovered: 'Tesoros descubiertos',
  },
  pt: {
    academyLevel: 'Nível da academia',
    audioCoverage: 'Cobertura de áudio',
    challengeCompletion: 'Progresso dos desafios',
    completedBooks: 'Livros concluídos',
    helper: 'Perfil, estatísticas, domínio e linha do tempo juntos',
    knowledgeMastery: 'Domínio do conhecimento',
    knowledgePoints: 'Pontos de conhecimento',
    timelineEvents: 'Linha do tempo',
    title: '📊 Painel de aprendizagem',
    totalDiscovered: 'Itens descobertos',
  },
  ja: {
    academyLevel: '学院レベル',
    audioCoverage: '音声カバー率',
    challengeCompletion: 'チャレンジ進行率',
    completedBooks: '完成ブック',
    helper: 'プロフィール、統計、習熟度、タイムラインをまとめます',
    knowledgeMastery: '知識習熟度',
    knowledgePoints: '知識ポイント',
    timelineEvents: 'タイムライン',
    title: '📊 学習ダッシュボード',
    totalDiscovered: '発見したコレクション',
  },
};

export function LearningDashboardPanel({
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
  const dashboard = buildLearningDashboard({
    audioCoverageLevel,
    audioStats,
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });
  const { summary } = dashboard;

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
          <LearningDashboardCard label={labels.totalDiscovered} value={summary.totalDiscoveredArtifacts} />
          <LearningDashboardCard label={labels.knowledgePoints} value={summary.totalKnowledgePoints} />
          <LearningDashboardCard
            helperText={summary.knowledgeMasteryLevel}
            label={labels.knowledgeMastery}
            value={`${summary.knowledgeMasteryPercent}%`}
          />
          <LearningDashboardCard label={labels.completedBooks} value={summary.completedKnowledgeBooks} />
          <LearningDashboardCard label={labels.challengeCompletion} value={`${summary.challengeCompletionPercent}%`} />
          <LearningDashboardCard label={labels.academyLevel} value={`LV ${summary.academyLevel}`} />
          <LearningDashboardCard label={labels.audioCoverage} value={`${summary.audioCoveragePercent}%`} />
          <LearningDashboardCard label={labels.timelineEvents} value={dashboard.timelineEventCount} />
        </View>
      </View>

      <JourneyPanel
        audioCoverageLevel={audioCoverageLevel}
        audioStats={audioStats}
        collection={collection}
        museumCollectedIds={museumCollectedIds}
      />
      <LearningMotivationPanel audioStats={audioStats} collection={collection} museumCollectedIds={museumCollectedIds} />
      <KnowledgeMasteryPanel collection={collection} museumCollectedIds={museumCollectedIds} />
      <LearningStatisticsPanel audioStats={audioStats} collection={collection} museumCollectedIds={museumCollectedIds} />
      <LearningTimelinePanel collection={collection} museumCollectedIds={museumCollectedIds} />
    </View>
  );
}
