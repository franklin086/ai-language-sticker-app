import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import {
  buildKnowledgeMastery,
  type KnowledgeMasteryLevel,
} from '../utils/knowledgeMasteryHelpers';
import { KnowledgeMasteryCard } from './KnowledgeMasteryCard';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy: Record<
  string,
  {
    allDone: string;
    formula: string;
    levelNames: Record<KnowledgeMasteryLevel, string>;
    nextPrefix: string;
    nextSuffix: string;
    title: string;
  }
> = {
  zh: {
    allDone: '已经达到最高掌握度',
    formula: '综合知识点、知识册、挑战和学院进度',
    levelNames: {
      BEGINNER: '刚刚开始',
      EXPERT: '知识专家',
      LEARNING: '正在学习',
      MASTER: '知识大师',
      PROFICIENT: '熟练掌握',
    },
    nextPrefix: '距离下一等级还差',
    nextSuffix: '%',
    title: '🏆 知识掌握度',
  },
  en: {
    allDone: 'Top mastery level reached',
    formula: 'Blends knowledge, books, challenges, and academy progress',
    levelNames: {
      BEGINNER: 'Beginner',
      EXPERT: 'Expert',
      LEARNING: 'Learning',
      MASTER: 'Master',
      PROFICIENT: 'Proficient',
    },
    nextPrefix: 'Need',
    nextSuffix: '% for the next level',
    title: '🏆 Knowledge Mastery',
  },
  es: {
    allDone: 'Nivel máximo alcanzado',
    formula: 'Combina conocimiento, libros, retos y academia',
    levelNames: {
      BEGINNER: 'Principiante',
      EXPERT: 'Experto',
      LEARNING: 'Aprendiendo',
      MASTER: 'Maestro',
      PROFICIENT: 'Competente',
    },
    nextPrefix: 'Falta',
    nextSuffix: '% para el siguiente nivel',
    title: '🏆 Dominio del conocimiento',
  },
  pt: {
    allDone: 'Nível máximo alcançado',
    formula: 'Combina conhecimento, livros, desafios e academia',
    levelNames: {
      BEGINNER: 'Iniciante',
      EXPERT: 'Especialista',
      LEARNING: 'Aprendendo',
      MASTER: 'Mestre',
      PROFICIENT: 'Proficiente',
    },
    nextPrefix: 'Faltam',
    nextSuffix: '% para o próximo nível',
    title: '🏆 Domínio do conhecimento',
  },
  ja: {
    allDone: '最高レベルに到達しました',
    formula: '知識、ブック、チャレンジ、学院進度を合わせて計算',
    levelNames: {
      BEGINNER: 'はじめの一歩',
      EXPERT: '知識エキスパート',
      LEARNING: '学習中',
      MASTER: '知識マスター',
      PROFICIENT: 'しっかり習得',
    },
    nextPrefix: '次のレベルまであと',
    nextSuffix: '%',
    title: '🏆 知識習熟度',
  },
};

export function KnowledgeMasteryPanel({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const { currentLanguage } = useLanguage();
  const labels = copy[currentLanguage] ?? copy.en;
  const mastery = buildKnowledgeMastery({
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });
  const nextHint = mastery.nextLevel
    ? `${labels.nextPrefix} ${mastery.percentToNextLevel}${labels.nextSuffix}`
    : labels.allDone;

  return (
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
      <Text style={{ color: '#6D28D9', fontSize: 18, fontWeight: '900', lineHeight: 24, textAlign: 'center' }}>
        {labels.title}
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 17, marginTop: 4, textAlign: 'center' }}>
        {labels.formula}
      </Text>

      <View style={{ marginTop: 12 }}>
        <KnowledgeMasteryCard
          icon={mastery.icon}
          levelCode={mastery.level}
          levelName={labels.levelNames[mastery.level]}
          masteryPercent={mastery.masteryPercent}
          nextHint={nextHint}
        />
      </View>
    </View>
  );
}
