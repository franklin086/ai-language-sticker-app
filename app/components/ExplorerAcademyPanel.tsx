import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { getAcademyProgress } from '../utils/explorerAcademyHelpers';
import { AcademyCard } from './AcademyCard';
import { LearningBackButton } from './LearningBackButton';

export function ExplorerAcademyPanel({
  collection,
  museumCollectedIds,
  onBack,
}: {
  collection: Parameters<typeof getAcademyProgress>[0]['collection'];
  museumCollectedIds: string[];
  onBack: () => void;
}) {
  const { currentLanguage, t } = useLanguage();
  const academies = useMemo(
    () =>
      getAcademyProgress({
        collection,
        language: currentLanguage,
        museumCollectedIds,
      }),
    [collection, currentLanguage, museumCollectedIds]
  );
  const [selectedAcademyId, setSelectedAcademyId] = useState<string | null>(academies[0]?.id ?? null);
  const selectedAcademy = academies.find((academy) => academy.id === selectedAcademyId) ?? academies[0] ?? null;

  return (
    <View>
      <LearningBackButton label={t('back_to_guild')} onPress={onBack} />

      <Text style={{ color: '#6D28D9', fontSize: 23, fontWeight: '900', lineHeight: 30, marginTop: 14, textAlign: 'center' }}>
        🎓 探索学院
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
        发现、学习，再挑战
      </Text>

      <View style={{ backgroundColor: '#FFF7D6', borderColor: '#FBBF24', borderRadius: 22, borderWidth: 2, marginTop: 14, padding: 14 }}>
        {['发现藏品', '获得知识', '完成知识册', '参与知识挑战', '提升学院等级'].map((step, index, steps) => (
          <View key={step} style={{ alignItems: 'center' }}>
            <Text style={{ color: index === 0 ? '#8B3A10' : '#6D28D9', fontSize: 14, fontWeight: '900', lineHeight: 20 }}>
              {step}
            </Text>
            {index < steps.length - 1 ? (
              <Text style={{ color: '#C084FC', fontSize: 16, fontWeight: '900', lineHeight: 22 }}>↓</Text>
            ) : null}
          </View>
        ))}
      </View>

      {selectedAcademy ? (
        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 15, fontWeight: '900', lineHeight: 21 }}>
            {selectedAcademy.emoji} {selectedAcademy.title}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 8 }}>
            发现进度：{selectedAcademy.discoveredArtifactCount} / {selectedAcademy.totalArtifactCount}
          </Text>
          <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', marginTop: 4 }}>
            挑战进度：{selectedAcademy.quizUnlockedCount} / {selectedAcademy.quizTotalCount}
          </Text>
          <Text style={{ color: '#B45309', fontSize: 12, fontWeight: '900', marginTop: 4 }}>
            知识册进度：{selectedAcademy.collectionPercent}%
          </Text>
        </View>
      ) : null}

      <ScrollView style={{ maxHeight: 460, marginTop: 14 }} contentContainerStyle={{ paddingBottom: 8 }}>
        {academies.map((academy) => (
          <AcademyCard
            academy={academy}
            key={academy.id}
            onPress={() => setSelectedAcademyId(academy.id)}
            selected={academy.id === selectedAcademy?.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
