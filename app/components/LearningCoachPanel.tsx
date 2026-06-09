import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { AudioCoverageStats } from '../utils/audioCoverageHelpers';
import { buildLearningCoach, type LearningCoachSignal } from '../utils/learningCoachHelpers';
import { LearningCoachCard } from './LearningCoachCard';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy: Record<
  string,
  {
    challengeEmpty: string;
    challengeReady: string;
    discoveryHint: Record<LearningCoachSignal, string>;
    helper: string;
    labels: {
      challenge: string;
      discovery: string;
      knowledgeBook: string;
      strength: string;
      weakness: string;
    };
    signalNames: Record<LearningCoachSignal, string>;
    title: string;
  }
> = {
  zh: {
    challengeEmpty: '先发现更多藏品，再开启新的挑战',
    challengeReady: '个挑战已经可以尝试',
    discoveryHint: {
      challenge: '去发现能解锁更多挑战的藏品',
      collection: '去找能补全知识册的藏品',
      discovery: '继续发现新的真实世界物体',
      journey: '选择一个还没点亮的旅程节点',
      knowledge: '去发现带来新知识点的藏品',
      mastery: '选择能提升掌握度的内容',
    },
    helper: '根据现有学习数据生成，不调用 AI',
    labels: {
      challenge: '推荐挑战',
      discovery: '下一次发现方向',
      knowledgeBook: '推荐知识册',
      strength: '优势分析',
      weakness: '薄弱分析',
    },
    signalNames: {
      challenge: '挑战进度',
      collection: '知识册完成',
      discovery: '藏品发现',
      journey: '学习旅程',
      knowledge: '知识解锁',
      mastery: '掌握度',
    },
    title: '🧑‍🏫 学习教练',
  },
  en: {
    challengeEmpty: 'Discover more artifacts to unlock challenges',
    challengeReady: 'challenges are ready to try',
    discoveryHint: {
      challenge: 'Find artifacts that unlock more challenges',
      collection: 'Find artifacts that complete a knowledge book',
      discovery: 'Keep discovering real-world objects',
      journey: 'Light up the next journey step',
      knowledge: 'Find artifacts that unlock knowledge',
      mastery: 'Choose discoveries that grow mastery',
    },
    helper: 'Generated from current learning data, no AI call',
    labels: {
      challenge: 'Recommended Challenge',
      discovery: 'Next Discovery Suggestion',
      knowledgeBook: 'Recommended Knowledge Book',
      strength: 'Strength Analysis',
      weakness: 'Weakness Analysis',
    },
    signalNames: {
      challenge: 'Challenge progress',
      collection: 'Book completion',
      discovery: 'Discovery',
      journey: 'Learning journey',
      knowledge: 'Knowledge unlocks',
      mastery: 'Mastery',
    },
    title: '🧑‍🏫 Learning Coach',
  },
  es: {
    challengeEmpty: 'Descubre más tesoros para desbloquear retos',
    challengeReady: 'retos listos para probar',
    discoveryHint: {
      challenge: 'Busca tesoros que abran más retos',
      collection: 'Busca tesoros para completar un libro',
      discovery: 'Sigue descubriendo objetos reales',
      journey: 'Ilumina el siguiente paso del viaje',
      knowledge: 'Busca tesoros con nuevos conocimientos',
      mastery: 'Elige descubrimientos que suban el dominio',
    },
    helper: 'Creado con datos actuales, sin llamar a IA',
    labels: {
      challenge: 'Reto recomendado',
      discovery: 'Siguiente descubrimiento',
      knowledgeBook: 'Libro recomendado',
      strength: 'Fortaleza',
      weakness: 'Punto débil',
    },
    signalNames: {
      challenge: 'Progreso de retos',
      collection: 'Libros completados',
      discovery: 'Descubrimiento',
      journey: 'Viaje de aprendizaje',
      knowledge: 'Conocimiento',
      mastery: 'Dominio',
    },
    title: '🧑‍🏫 Coach de aprendizaje',
  },
  pt: {
    challengeEmpty: 'Descubra mais itens para liberar desafios',
    challengeReady: 'desafios prontos para tentar',
    discoveryHint: {
      challenge: 'Procure itens que liberem desafios',
      collection: 'Procure itens para concluir um livro',
      discovery: 'Continue descobrindo objetos reais',
      journey: 'Acenda o próximo passo da jornada',
      knowledge: 'Procure itens com novos conhecimentos',
      mastery: 'Escolha descobertas que aumentem domínio',
    },
    helper: 'Gerado com dados atuais, sem chamada de IA',
    labels: {
      challenge: 'Desafio recomendado',
      discovery: 'Próxima descoberta',
      knowledgeBook: 'Livro recomendado',
      strength: 'Ponto forte',
      weakness: 'Ponto fraco',
    },
    signalNames: {
      challenge: 'Progresso dos desafios',
      collection: 'Conclusão de livros',
      discovery: 'Descobertas',
      journey: 'Jornada de aprendizagem',
      knowledge: 'Conhecimento',
      mastery: 'Domínio',
    },
    title: '🧑‍🏫 Coach de aprendizagem',
  },
  ja: {
    challengeEmpty: 'もっと発見するとチャレンジが開きます',
    challengeReady: '個のチャレンジに挑戦できます',
    discoveryHint: {
      challenge: 'チャレンジを開くコレクションを探そう',
      collection: '知識ブックを進める発見をしよう',
      discovery: '身近なものをもっと発見しよう',
      journey: '次の旅ステップを光らせよう',
      knowledge: '新しい知識につながる発見をしよう',
      mastery: '習熟度を伸ばす発見を選ぼう',
    },
    helper: '現在の学習データから生成し、AIは呼びません',
    labels: {
      challenge: 'おすすめチャレンジ',
      discovery: '次の発見方向',
      knowledgeBook: 'おすすめ知識ブック',
      strength: '得意分析',
      weakness: '弱点分析',
    },
    signalNames: {
      challenge: 'チャレンジ進行',
      collection: 'ブック完成',
      discovery: '発見',
      journey: '学習ジャーニー',
      knowledge: '知識解放',
      mastery: '習熟度',
    },
    title: '🧑‍🏫 学習コーチ',
  },
};

export function LearningCoachPanel({
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
  const coach = buildLearningCoach({
    audioCoverageLevel,
    audioStats,
    collection,
    language: currentLanguage,
    museumCollectedIds,
  });
  const challengeDetail =
    coach.recommendedChallengeCount > 0
      ? `${coach.recommendedChallengeCount} ${labels.challengeReady}`
      : labels.challengeEmpty;

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

      <View style={{ gap: 10, marginTop: 12 }}>
        <LearningCoachCard detail={labels.signalNames[coach.strength]} emoji="💪" title={labels.labels.strength} />
        <LearningCoachCard detail={labels.signalNames[coach.weakness]} emoji="🔍" title={labels.labels.weakness} />
        <LearningCoachCard detail={coach.recommendedKnowledgeBook || labels.discoveryHint.knowledge} emoji="📚" title={labels.labels.knowledgeBook} />
        <LearningCoachCard detail={challengeDetail} emoji="🧠" title={labels.labels.challenge} />
        <LearningCoachCard
          detail={labels.discoveryHint[coach.recommendedDiscoverySignal]}
          emoji="🧭"
          title={labels.labels.discovery}
        />
      </View>
    </View>
  );
}
