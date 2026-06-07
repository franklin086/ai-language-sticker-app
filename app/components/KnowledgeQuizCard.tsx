import { Pressable, Text, View } from 'react-native';
import type { SupportedLanguage } from '../i18n/translations';
import type { KnowledgeQuizQuestion } from '../data/knowledgeQuizData';
import {
  getQuizCorrectAnswer,
  getQuizQuestionOptions,
  getQuizQuestionText,
} from '../utils/knowledgeQuizHelpers';

export function KnowledgeQuizCard({
  language,
  onAnswer,
  question,
  selectedAnswer,
}: {
  language: SupportedLanguage;
  onAnswer: (answer: string, correct: boolean) => void;
  question: KnowledgeQuizQuestion;
  selectedAnswer: string | null;
}) {
  const correctAnswer = getQuizCorrectAnswer(question, language);
  const answered = Boolean(selectedAnswer);

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FBBF24',
        borderRadius: 20,
        borderWidth: 2,
        marginTop: 14,
        padding: 14,
      }}
    >
      <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>🧠 知识挑战</Text>
      <Text style={{ color: '#4C1D95', fontSize: 15, fontWeight: '900', lineHeight: 22, marginTop: 10 }}>
        {getQuizQuestionText(question, language)}
      </Text>

      <View style={{ gap: 8, marginTop: 12 }}>
        {getQuizQuestionOptions(question, language).map((option) => {
          const selected = selectedAnswer === option;
          const correct = option === correctAnswer;

          return (
            <Pressable
              key={option}
              style={({ pressed }) => ({
                backgroundColor: selected ? (correct ? '#DCFCE7' : '#FEE2E2') : pressed ? '#FEF3C7' : '#FFF7ED',
                borderColor: selected ? (correct ? '#22C55E' : '#EF4444') : '#FBBF24',
                borderRadius: 16,
                borderWidth: 1,
                padding: 11,
              })}
              onPress={() => onAnswer(option, correct)}
            >
              <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900' }}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {answered ? (
        <Text style={{ color: selectedAnswer === correctAnswer ? '#15803D' : '#DC2626', fontSize: 14, fontWeight: '900', marginTop: 12 }}>
          {selectedAnswer === correctAnswer ? '✅ 回答正确' : '❌ 再试试看'}
        </Text>
      ) : null}
    </View>
  );
}
