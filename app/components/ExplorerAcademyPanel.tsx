import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { getAcademyProgress } from '../utils/explorerAcademyHelpers';
import { AcademyCard } from './AcademyCard';

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
        🎓 探索学院
      </Text>
      <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
        发现、学习，再挑战
      </Text>

      {selectedAcademy ? (
        <View style={{ backgroundColor: '#FFFFFF', borderColor: '#FBBF24', borderRadius: 20, borderWidth: 2, marginTop: 14, padding: 14 }}>
          <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900' }}>
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
