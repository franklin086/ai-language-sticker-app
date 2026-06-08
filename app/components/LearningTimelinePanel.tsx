import { Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { buildLearningTimeline, type LearningTimelineEventType } from '../utils/learningTimelineHelpers';
import { LearningTimelineCard } from './LearningTimelineCard';

type CollectionLike = {
  discoveredAt?: string;
  object_en: string;
  object_zh: string;
};

const copy: Record<
  string,
  {
    empty: Record<LearningTimelineEventType, string>;
    helper: string;
    titles: Record<LearningTimelineEventType, string>;
    title: string;
  }
> = {
  zh: {
    empty: {
      academyLevel: '开始发现藏品后会出现学院等级',
      artifactDiscovered: '还没有发现藏品',
      challengeUnlocked: '发现更多藏品后会解锁挑战',
      knowledgeCollectionCompleted: '完成一个知识册后会出现在这里',
    },
    helper: '根据你现在已发现的内容生成',
    titles: {
      academyLevel: '当前学院等级',
      artifactDiscovered: '最近发现藏品',
      challengeUnlocked: '最近解锁挑战',
      knowledgeCollectionCompleted: '最近完成知识册',
    },
    title: '📅 学习时间轴',
  },
  en: {
    empty: {
      academyLevel: 'Academy level appears after discoveries',
      artifactDiscovered: 'No artifact discovered yet',
      challengeUnlocked: 'Discover more artifacts to unlock challenges',
      knowledgeCollectionCompleted: 'Completed books will appear here',
    },
    helper: 'Generated from what you have discovered now',
    titles: {
      academyLevel: 'Current Academy Level',
      artifactDiscovered: 'Recent Artifact',
      challengeUnlocked: 'Recent Challenge Unlock',
      knowledgeCollectionCompleted: 'Recent Completed Book',
    },
    title: '📅 Learning Timeline',
  },
  es: {
    empty: {
      academyLevel: 'El nivel aparecerá después de descubrir',
      artifactDiscovered: 'Aún no hay tesoros descubiertos',
      challengeUnlocked: 'Descubre más tesoros para desbloquear retos',
      knowledgeCollectionCompleted: 'Los libros completados aparecerán aquí',
    },
    helper: 'Creado con lo que ya descubriste',
    titles: {
      academyLevel: 'Nivel de academia actual',
      artifactDiscovered: 'Tesoro reciente',
      challengeUnlocked: 'Reto desbloqueado reciente',
      knowledgeCollectionCompleted: 'Libro completado reciente',
    },
    title: '📅 Línea de aprendizaje',
  },
  pt: {
    empty: {
      academyLevel: 'O nível aparece depois das descobertas',
      artifactDiscovered: 'Nenhum item descoberto ainda',
      challengeUnlocked: 'Descubra mais itens para liberar desafios',
      knowledgeCollectionCompleted: 'Livros concluídos aparecerão aqui',
    },
    helper: 'Gerado com o que você já descobriu',
    titles: {
      academyLevel: 'Nível atual da academia',
      artifactDiscovered: 'Item recente',
      challengeUnlocked: 'Desafio liberado recente',
      knowledgeCollectionCompleted: 'Livro concluído recente',
    },
    title: '📅 Linha do tempo',
  },
  ja: {
    empty: {
      academyLevel: '発見すると学院レベルが表示されます',
      artifactDiscovered: 'まだコレクションがありません',
      challengeUnlocked: 'もっと発見するとチャレンジが開きます',
      knowledgeCollectionCompleted: '完成したブックがここに出ます',
    },
    helper: '今までの発見から作られます',
    titles: {
      academyLevel: '現在の学院レベル',
      artifactDiscovered: '最近の発見',
      challengeUnlocked: '最近開いたチャレンジ',
      knowledgeCollectionCompleted: '最近完成したブック',
    },
    title: '📅 学習タイムライン',
  },
};

export function LearningTimelinePanel({
  collection,
  museumCollectedIds,
}: {
  collection: CollectionLike[];
  museumCollectedIds: string[];
}) {
  const { currentLanguage } = useLanguage();
  const labels = copy[currentLanguage] ?? copy.en;
  const timeline = buildLearningTimeline({
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
        {labels.helper}
      </Text>

      <View style={{ gap: 10, marginTop: 12 }}>
        {timeline.events.map((event) => (
          <LearningTimelineCard
            detail={event.detail}
            emoji={event.emoji}
            emptyText={labels.empty[event.type]}
            isActive={event.isActive}
            key={event.id}
            title={labels.titles[event.type]}
          />
        ))}
      </View>
    </View>
  );
}
