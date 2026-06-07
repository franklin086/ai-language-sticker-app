import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import {
  getDiscoveredQuizQuestions,
  getQuizProgress,
  type QuizAnswerState,
} from '../utils/knowledgeQuizHelpers';
import { KnowledgeQuizCard } from './KnowledgeQuizCard';

export function KnowledgeQuizPanel({
  collection,
  museumCollectedIds,
  onBack,
}: {
  collection: Parameters<typeof getDiscoveredQuizQuestions>[0]['collection'];
  museumCollectedIds: string[];
  onBack: () => void;
}) {
  const { currentLanguage, t } = useLanguage();
  const [answerState, setAnswerState] = useState<QuizAnswerState>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const questions = useMemo(
    () => getDiscoveredQuizQuestions({ collection, museumCollectedIds }),
    [collection, museumCollectedIds]
  );
  const progress = getQuizProgress({ answerState, collection, museumCollectedIds });
  const currentQuestion = questions[currentIndex] ?? null;

  function handleAnswer(answer: string, correct: boolean) {
    if (!currentQuestion) {
      return;
    }

    setSelectedAnswer(answer);
    setAnswerState((current) => ({
      ...current,
      [currentQuestion.artifactKey]: correct,
    }));
  }

  function handleNextQuestion() {
    setSelectedAnswer(null);
    setCurrentIndex((current) => (questions.length > 0 ? (current + 1) % questions.length : 0));
  }

  return (
    <View>
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

      <Text style={{ color: '#6D28D9', fontSize: 25, fontWeight: '900', marginTop: 14, textAlign: 'center' }}>
        🧠 知识挑战
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
        只挑战你已经发现的知识
      </Text>

      <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
        <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900' }}>挑战统计</Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 8 }}>
          总题目：{progress.totalQuestionCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
          已解锁题目：{progress.unlockedQuestionCount}
        </Text>
        <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
          已完成题目：{progress.completedQuestionCount}
        </Text>
        <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '900', marginTop: 4 }}>
          正确率：{progress.correctRate}%
        </Text>
      </View>

      {currentQuestion ? (
        <>
          <KnowledgeQuizCard
            language={currentLanguage}
            onAnswer={handleAnswer}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
          />
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#7C3AED' : '#8B5CF6',
              borderRadius: 18,
              marginTop: 12,
              padding: 12,
            })}
            onPress={handleNextQuestion}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>下一题</Text>
          </Pressable>
        </>
      ) : (
        <View style={{ backgroundColor: '#FFF7ED', borderColor: '#FBBF24', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>
            继续探索，发现知识后解锁挑战
          </Text>
        </View>
      )}
    </View>
  );
}
