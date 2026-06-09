import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';
import {
  buildLearningMotivation,
  type LearningMotivationAction,
} from '../utils/learningMotivationHelpers';
import { LearningMotivationCard } from './LearningMotivationCard';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy: Record<
  string,
  {
    actionLabels: Record<LearningMotivationAction, string>;
    currentGoal: string;
    helper: string;
    nextAction: string;
    remaining: string;
    streak: string;
    streakUnit: string;
    title: string;
    weeklyProgress: string;
    weeklySteps: string;
  }
> = {
  zh: {
    actionLabels: {
      completeBook: '完成一个知识册',
      discoverArtifact: '发现新的藏品',
      joinChallenge: '参与知识挑战',
    },
    currentGoal: '当前学习目标',
    helper: '根据当前学习数据推导，不记录历史',
    nextAction: '推荐下一步',
    remaining: '还差',
    streak: '学习连续感',
    streakUnit: '天',
    title: '✨ 学习动力',
    weeklyProgress: '本周学习进度',
    weeklySteps: '项学习信号已点亮',
  },
  en: {
    actionLabels: {
      completeBook: 'Complete a knowledge book',
      discoverArtifact: 'Discover a new artifact',
      joinChallenge: 'Try a knowledge challenge',
    },
    currentGoal: 'Learning Goal',
    helper: 'Derived from current learning data, no history saved',
    nextAction: 'Next Recommended Action',
    remaining: 'Remaining',
    streak: 'Learning Streak',
    streakUnit: 'days',
    title: '✨ Learning Motivation',
    weeklyProgress: 'Weekly Progress',
    weeklySteps: 'learning signals lit up',
  },
  es: {
    actionLabels: {
      completeBook: 'Completar un libro',
      discoverArtifact: 'Descubrir un tesoro',
      joinChallenge: 'Probar un reto',
    },
    currentGoal: 'Objetivo actual',
    helper: 'Derivado de datos actuales, sin guardar historial',
    nextAction: 'Siguiente acción',
    remaining: 'Faltan',
    streak: 'Racha de aprendizaje',
    streakUnit: 'días',
    title: '✨ Motivación de aprendizaje',
    weeklyProgress: 'Progreso semanal',
    weeklySteps: 'señales de aprendizaje activas',
  },
  pt: {
    actionLabels: {
      completeBook: 'Concluir um livro',
      discoverArtifact: 'Descobrir um item',
      joinChallenge: 'Tentar um desafio',
    },
    currentGoal: 'Meta atual',
    helper: 'Derivado dos dados atuais, sem salvar histórico',
    nextAction: 'Próxima ação',
    remaining: 'Faltam',
    streak: 'Sequência de aprendizagem',
    streakUnit: 'dias',
    title: '✨ Motivação de aprendizagem',
    weeklyProgress: 'Progresso semanal',
    weeklySteps: 'sinais de aprendizagem ativos',
  },
  ja: {
    actionLabels: {
      completeBook: '知識ブックを完成',
      discoverArtifact: '新しいコレクションを発見',
      joinChallenge: '知識チャレンジに挑戦',
    },
    currentGoal: '今の学習目標',
    helper: '現在の学習データから推定し、履歴は保存しません',
    nextAction: 'おすすめの次の一歩',
    remaining: 'あと',
    streak: '学習ストリーク',
    streakUnit: '日',
    title: '✨ 学習モチベーション',
    weeklyProgress: '今週の進み具合',
    weeklySteps: '個の学習サインが点灯',
  },
};

export function LearningMotivationPanel({
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
  const motivation = buildLearningMotivation({
    audioStats,
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });
  const goalLabel = labels.actionLabels[motivation.currentGoal.action];
  const actionLabel = labels.actionLabels[motivation.nextAction];

  return (
    <View
      style={{
        backgroundColor: '#FEF3C7',
        borderColor: '#FBBF24',
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

      <View style={{ gap: 10, marginTop: 12 }}>
        <LearningMotivationCard
          detail={`${goalLabel} · ${labels.remaining} ${motivation.currentGoal.remaining}`}
          emoji="🎯"
          label={labels.currentGoal}
          percent={motivation.currentGoal.percent}
        />
        <LearningMotivationCard
          detail={`${motivation.weeklyProgressSteps} / ${motivation.weeklyProgressTotal} ${labels.weeklySteps}`}
          emoji="📈"
          label={labels.weeklyProgress}
          percent={motivation.weeklyProgressPercent}
        />
        <LearningMotivationCard detail={actionLabel} emoji="🧭" label={labels.nextAction} />
        <LearningMotivationCard
          detail={`${motivation.learningStreakDays} ${labels.streakUnit}`}
          emoji="🔥"
          label={labels.streak}
        />
      </View>
    </View>
  );
}
