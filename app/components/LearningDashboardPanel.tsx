import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';
import { buildLearningDashboard, type LearningRecommendedNextAction } from '../utils/learningDashboardHelpers';
import { JourneyPanel } from './JourneyPanel';
import { KnowledgeMasteryPanel } from './KnowledgeMasteryPanel';
import { LearningBackButton } from './LearningBackButton';
import { LearningCoachPanel } from './LearningCoachPanel';
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
    currentLevel: '当前等级',
    helper: '把学习档案、统计、掌握度和时间轴汇总在一起',
    knowledgeMastery: '知识掌握度',
    knowledgePoints: '总知识点',
    nextAction: '下一步推荐',
    nextGoal: '下一目标',
    recentActivity: '最近行动',
    snapshot: '今日学习快照',
    timelineEvents: '学习时间轴',
    title: '📊 学习总览',
    totalDiscovered: '总发现藏品',
    weeklyProgress: '本周学习进度',
  },
  en: {
    academyLevel: 'Academy Level',
    audioCoverage: 'Audio Coverage',
    challengeCompletion: 'Challenge Completion',
    completedBooks: 'Completed Books',
    currentLevel: 'Current Level',
    helper: 'Profile, statistics, mastery, and timeline in one place',
    knowledgeMastery: 'Knowledge Mastery',
    knowledgePoints: 'Knowledge Points',
    nextAction: 'Recommended Next Action',
    nextGoal: 'Next Goal',
    recentActivity: 'Recent Activity',
    snapshot: 'Dashboard Snapshot',
    timelineEvents: 'Timeline',
    title: '📊 Learning Dashboard',
    totalDiscovered: 'Artifacts Found',
    weeklyProgress: 'Weekly Progress',
  },
  es: {
    academyLevel: 'Nivel de academia',
    audioCoverage: 'Cobertura de audio',
    challengeCompletion: 'Progreso de retos',
    completedBooks: 'Libros completados',
    currentLevel: 'Nivel actual',
    helper: 'Perfil, estadísticas, dominio y línea de tiempo juntos',
    knowledgeMastery: 'Dominio del conocimiento',
    knowledgePoints: 'Puntos de conocimiento',
    nextAction: 'Siguiente acción recomendada',
    nextGoal: 'Siguiente objetivo',
    recentActivity: 'Actividad reciente',
    snapshot: 'Resumen del panel',
    timelineEvents: 'Línea de tiempo',
    title: '📊 Panel de aprendizaje',
    totalDiscovered: 'Tesoros descubiertos',
    weeklyProgress: 'Progreso semanal',
  },
  pt: {
    academyLevel: 'Nível da academia',
    audioCoverage: 'Cobertura de áudio',
    challengeCompletion: 'Progresso dos desafios',
    completedBooks: 'Livros concluídos',
    currentLevel: 'Nível atual',
    helper: 'Perfil, estatísticas, domínio e linha do tempo juntos',
    knowledgeMastery: 'Domínio do conhecimento',
    knowledgePoints: 'Pontos de conhecimento',
    nextAction: 'Próxima ação recomendada',
    nextGoal: 'Próxima meta',
    recentActivity: 'Atividade recente',
    snapshot: 'Resumo do painel',
    timelineEvents: 'Linha do tempo',
    title: '📊 Painel de aprendizagem',
    totalDiscovered: 'Itens descobertos',
    weeklyProgress: 'Progresso semanal',
  },
  ja: {
    academyLevel: '学院レベル',
    audioCoverage: '音声カバー率',
    challengeCompletion: 'チャレンジ進行率',
    completedBooks: '完成ブック',
    currentLevel: '現在レベル',
    helper: 'プロフィール、統計、習熟度、タイムラインをまとめます',
    knowledgeMastery: '知識習熟度',
    knowledgePoints: '知識ポイント',
    nextAction: 'おすすめの次の行動',
    nextGoal: '次の目標',
    recentActivity: '最近の活動',
    snapshot: 'ダッシュボード概要',
    timelineEvents: 'タイムライン',
    title: '📊 学習ダッシュボード',
    totalDiscovered: '発見したコレクション',
    weeklyProgress: '週間進捗',
  },
};

function getRecommendedActionButtonLabel(actionId: LearningRecommendedNextAction['id']) {
  if (actionId === 'completeKnowledgeBook') {
    return '学知识';
  }

  if (actionId === 'joinChallenge') {
    return '去挑战';
  }

  if (actionId === 'improveAcademy') {
    return '看进度';
  }

  return '继续发现';
}

export function LearningDashboardPanel({
  audioCoverageLevel,
  audioStats,
  collection,
  museumCollectedIds,
  onBack,
  onRecommendedAction,
}: {
  audioCoverageLevel: string;
  audioStats: AudioCoverageStats;
  collection: CollectionLike[];
  museumCollectedIds: string[];
  onBack: () => void;
  onRecommendedAction?: (actionId: LearningRecommendedNextAction['id']) => void;
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
  const { recentActivity, recommendedNextAction, snapshot, summary } = dashboard;

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
          backgroundColor: '#FFFBEB',
          borderColor: '#FBBF24',
          borderRadius: 22,
          borderWidth: 2,
          marginTop: 14,
          padding: 14,
        }}
      >
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{labels.snapshot}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          <LearningDashboardCard label={labels.currentLevel} value={snapshot.currentLevel} />
          <LearningDashboardCard label={labels.knowledgeMastery} value={`${snapshot.knowledgeMasteryPercent}%`} />
          <LearningDashboardCard label={labels.academyLevel} value={`LV ${snapshot.academyLevel}`} />
          <LearningDashboardCard label={labels.weeklyProgress} value={`${snapshot.weeklyProgressPercent}%`} />
          <LearningDashboardCard label={labels.nextGoal} value={snapshot.nextGoal} />
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#C4B5FD',
          borderRadius: 20,
          borderWidth: 1,
          marginTop: 12,
          padding: 14,
        }}
      >
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{labels.nextAction}</Text>
        <Text style={{ color: '#5B21B6', fontSize: 22, fontWeight: '900', marginTop: 8 }}>
          {recommendedNextAction.emoji} {recommendedNextAction.title}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 6 }}>
          {recommendedNextAction.detail}
        </Text>
        {onRecommendedAction ? (
          <Pressable
            style={({ pressed }) => ({
              alignItems: 'center',
              backgroundColor: pressed ? '#7C3AED' : '#8B5CF6',
              borderRadius: 16,
              marginTop: 12,
              paddingHorizontal: 14,
              paddingVertical: 11,
            })}
            onPress={() => onRecommendedAction(recommendedNextAction.id)}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '900', textAlign: 'center' }}>
              {getRecommendedActionButtonLabel(recommendedNextAction.id)}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View
        style={{
          backgroundColor: '#FFF7ED',
          borderColor: '#FDE68A',
          borderRadius: 20,
          borderWidth: 1,
          marginTop: 12,
          padding: 14,
        }}
      >
        <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>{labels.recentActivity}</Text>
        <View style={{ gap: 8, marginTop: 10 }}>
          {recentActivity.map((activity) => (
            <View
              key={activity.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E9D5FF',
                borderRadius: 14,
                borderWidth: 1,
                padding: 10,
              }}
            >
              <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900' }}>
                {activity.emoji} {activity.title}
              </Text>
              <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
                {activity.detail}
              </Text>
            </View>
          ))}
        </View>
      </View>

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

      <LearningCoachPanel
        audioCoverageLevel={audioCoverageLevel}
        audioStats={audioStats}
        collection={collection}
        museumCollectedIds={museumCollectedIds}
      />
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
