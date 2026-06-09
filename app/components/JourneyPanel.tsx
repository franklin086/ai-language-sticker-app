import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';
import { buildJourney, type JourneyMilestoneId } from '../utils/journeyHelpers';
import { JourneyCard } from './JourneyCard';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy: Record<
  string,
  {
    badgeLocked: string;
    badges: string;
    helper: string;
    milestoneLabels: Record<JourneyMilestoneId, string>;
    milestones: string;
    nextMilestone: string;
    noNext: string;
    stageLabels: Record<string, string>;
    title: string;
  }
> = {
  zh: {
    badgeLocked: '待解锁',
    badges: '学习阶段徽章',
    helper: '把学习数据变成一条可见的成长路线',
    milestoneLabels: {
      bookCompleted: '完成一个知识册',
      challengeUnlocked: '解锁知识挑战',
      firstDiscovery: '发现第一个藏品',
      knowledgeUnlocked: '获得第一个知识点',
      masteryGrowth: '进入稳定学习阶段',
    },
    milestones: '学习里程碑',
    nextMilestone: '下一目标预览',
    noNext: '当前旅程目标已全部点亮',
    stageLabels: {
      collector: '收集者',
      explorer: '探索者',
      master: '大师',
      scholar: '学习家',
      spark: '启程',
    },
    title: '🗺️ 学习旅程',
  },
  en: {
    badgeLocked: 'Locked',
    badges: 'Progress Badges',
    helper: 'Turns learning data into a visible growth journey',
    milestoneLabels: {
      bookCompleted: 'Complete a knowledge book',
      challengeUnlocked: 'Unlock a knowledge challenge',
      firstDiscovery: 'Discover the first artifact',
      knowledgeUnlocked: 'Unlock the first knowledge point',
      masteryGrowth: 'Reach steady learning growth',
    },
    milestones: 'Milestone Tracking',
    nextMilestone: 'Next Milestone Preview',
    noNext: 'All journey goals are lit up',
    stageLabels: {
      collector: 'Collector',
      explorer: 'Explorer',
      master: 'Master',
      scholar: 'Scholar',
      spark: 'Spark',
    },
    title: '🗺️ Learning Journey',
  },
  es: {
    badgeLocked: 'Bloqueado',
    badges: 'Insignias de progreso',
    helper: 'Convierte los datos en una ruta visible',
    milestoneLabels: {
      bookCompleted: 'Completar un libro',
      challengeUnlocked: 'Desbloquear un reto',
      firstDiscovery: 'Descubrir el primer tesoro',
      knowledgeUnlocked: 'Obtener el primer conocimiento',
      masteryGrowth: 'Entrar en aprendizaje constante',
    },
    milestones: 'Hitos de aprendizaje',
    nextMilestone: 'Próximo objetivo',
    noNext: 'Todos los objetivos están iluminados',
    stageLabels: {
      collector: 'Coleccionista',
      explorer: 'Explorador',
      master: 'Maestro',
      scholar: 'Estudiante',
      spark: 'Chispa',
    },
    title: '🗺️ Viaje de aprendizaje',
  },
  pt: {
    badgeLocked: 'Bloqueado',
    badges: 'Medalhas de progresso',
    helper: 'Transforma dados de aprendizagem em uma rota visível',
    milestoneLabels: {
      bookCompleted: 'Concluir um livro',
      challengeUnlocked: 'Liberar um desafio',
      firstDiscovery: 'Descobrir o primeiro item',
      knowledgeUnlocked: 'Liberar o primeiro conhecimento',
      masteryGrowth: 'Entrar em crescimento constante',
    },
    milestones: 'Marcos de aprendizagem',
    nextMilestone: 'Próximo objetivo',
    noNext: 'Todos os objetivos estão acesos',
    stageLabels: {
      collector: 'Colecionador',
      explorer: 'Explorador',
      master: 'Mestre',
      scholar: 'Estudante',
      spark: 'Começo',
    },
    title: '🗺️ Jornada de aprendizagem',
  },
  ja: {
    badgeLocked: '未解放',
    badges: '成長バッジ',
    helper: '学習データを見える成長ルートにします',
    milestoneLabels: {
      bookCompleted: '知識ブックを完成',
      challengeUnlocked: '知識チャレンジを解放',
      firstDiscovery: '最初のコレクションを発見',
      knowledgeUnlocked: '最初の知識を獲得',
      masteryGrowth: '安定した学習段階へ',
    },
    milestones: '学習マイルストーン',
    nextMilestone: '次の目標',
    noNext: 'すべての旅目標が点灯しました',
    stageLabels: {
      collector: 'コレクター',
      explorer: '探検家',
      master: 'マスター',
      scholar: '学習家',
      spark: 'はじまり',
    },
    title: '🗺️ 学習ジャーニー',
  },
};

export function JourneyPanel({
  audioCoverageLevel,
  audioStats,
  collection,
  museumCollectedIds,
}: {
  audioCoverageLevel: string;
  audioStats: AudioCoverageStats;
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const { currentLanguage } = useLanguage();
  const labels = copy[currentLanguage] ?? copy.en;
  const journey = buildJourney({
    audioCoverageLevel,
    audioStats,
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });
  const nextMilestone = journey.nextMilestone;

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
        {labels.helper}
      </Text>

      <View style={{ marginTop: 12 }}>
        <JourneyCard
          detail={`${labels.stageLabels[journey.currentStageId]} · ${journey.journeyPercent}%`}
          emoji="🗺️"
          percent={journey.journeyPercent}
          title={labels.title}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
        {journey.stages.map((stage) => (
          <View
            key={stage.id}
            style={{
              alignItems: 'center',
              backgroundColor: stage.isCurrent ? '#FEF3C7' : stage.isUnlocked ? '#FFFFFF' : '#FAF5FF',
              borderColor: stage.isCurrent ? '#F59E0B' : '#E9D5FF',
              borderRadius: 16,
              borderWidth: 1,
              flexGrow: 1,
              minWidth: 78,
              padding: 8,
            }}
          >
            <Text style={{ fontSize: 21, lineHeight: 26 }}>{stage.emoji}</Text>
            <Text numberOfLines={1} style={{ color: '#6D28D9', fontSize: 11, fontWeight: '900', lineHeight: 15 }}>
              {labels.stageLabels[stage.id]}
            </Text>
          </View>
        ))}
      </View>

      <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900', lineHeight: 21, marginTop: 14 }}>
        {labels.milestones}
      </Text>
      <View style={{ gap: 8, marginTop: 8 }}>
        {journey.milestones.map((milestone) => (
          <JourneyCard
            detail={milestone.isCompleted ? '100%' : `${milestone.progress}%`}
            emoji={milestone.isCompleted ? '✅' : '⭐'}
            isActive={milestone.isCompleted}
            key={milestone.id}
            percent={milestone.progress}
            title={labels.milestoneLabels[milestone.id]}
          />
        ))}
      </View>

      <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900', lineHeight: 21, marginTop: 14 }}>
        {labels.badges}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {journey.badges.map((badge) => (
          <View
            key={badge.id}
            style={{
              alignItems: 'center',
              backgroundColor: badge.isUnlocked ? '#FFFFFF' : '#FAF5FF',
              borderColor: badge.isUnlocked ? '#FBBF24' : '#E9D5FF',
              borderRadius: 16,
              borderWidth: 1,
              flexGrow: 1,
              minWidth: 86,
              padding: 9,
            }}
          >
            <Text style={{ fontSize: 23, lineHeight: 29 }}>{badge.isUnlocked ? badge.emoji : '❔'}</Text>
            <Text numberOfLines={2} style={{ color: '#7C3AED', fontSize: 10, fontWeight: '900', lineHeight: 14, textAlign: 'center' }}>
              {badge.isUnlocked ? labels.milestoneLabels[badge.id] : labels.badgeLocked}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 10 }}>
        <JourneyCard
          detail={nextMilestone ? labels.milestoneLabels[nextMilestone.id] : labels.noNext}
          emoji="🎯"
          percent={nextMilestone?.progress}
          title={labels.nextMilestone}
        />
      </View>
    </View>
  );
}
