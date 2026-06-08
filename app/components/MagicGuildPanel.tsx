import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAudioCoverage } from '../hooks/useAudioCoverage';
import { useLanguage } from '../hooks/useLanguage';
import { useMagicGuild } from '../hooks/useMagicGuild';
import { guildNavigationItems, type GuildView } from '../utils/navigationMap';
import { AudioCoverageCard } from './AudioCoverageCard';
import { CollectionSetPanel } from './CollectionSetPanel';
import { ExplorerAcademyPanel } from './ExplorerAcademyPanel';
import { GuildMissionBoard } from './GuildMissionBoard';
import { GuildStatusCard } from './GuildStatusCard';
import { KnowledgeCollectionsPanel } from './KnowledgeCollectionsPanel';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LearningDashboardPanel } from './LearningDashboardPanel';
import { LearningProfilePanel } from './LearningProfilePanel';
import { MuseumCollectionsBookPanel } from './MuseumCollectionsBookPanel';

type MagicGuildInput = Parameters<typeof useMagicGuild>[0];
type MagicGuildView = 'home' | GuildView;

export function MagicGuildPanel({
  cityMapCompletedNodeIds,
  cityMaps,
  collection,
  museumCollectedIds,
  museums,
  onClose,
  totalArtifactCount,
}: MagicGuildInput & {
  onClose: () => void;
}) {
  const [guildView, setGuildView] = useState<MagicGuildView>('home');
  const { t } = useLanguage();
  const audioCoverage = useAudioCoverage('en');
  const guild = useMagicGuild({
    cityMapCompletedNodeIds,
    cityMaps,
    collection,
    museumCollectedIds,
    museums,
    totalArtifactCount,
  });

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'rgba(48, 16, 96, 0.42)',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        padding: 20,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 28,
      }}
    >
      <View
        style={{
          backgroundColor: '#FFF7ED',
          borderColor: '#FBBF24',
          borderRadius: 28,
          borderWidth: 2,
          maxWidth: 520,
          padding: 20,
          shadowColor: '#F59E0B',
          shadowOpacity: 0.24,
          shadowRadius: 22,
          width: '100%',
        }}
      >
        {guildView === 'collectionsBook' ? (
          <MuseumCollectionsBookPanel
            collection={collection}
            museumCollectedIds={museumCollectedIds}
            onBack={() => setGuildView('home')}
          />
        ) : guildView === 'collectionSets' ? (
          <CollectionSetPanel
            collection={collection}
            museumCollectedIds={museumCollectedIds}
            onBack={() => setGuildView('home')}
          />
        ) : guildView === 'knowledgeCollections' ? (
          <KnowledgeCollectionsPanel
            collection={collection}
            museumCollectedIds={museumCollectedIds}
            onBack={() => setGuildView('home')}
          />
        ) : guildView === 'explorerAcademy' ? (
          <ExplorerAcademyPanel
            collection={collection}
            museumCollectedIds={museumCollectedIds}
            onBack={() => setGuildView('home')}
          />
        ) : guildView === 'learningProfile' ? (
          <LearningProfilePanel
            audioCoverageLevel={audioCoverage.coverageLevel}
            audioStats={audioCoverage.stats}
            collection={collection}
            museumCollectedIds={museumCollectedIds}
            onBack={() => setGuildView('home')}
          />
        ) : guildView === 'learningDashboard' ? (
          <LearningDashboardPanel
            audioCoverageLevel={audioCoverage.coverageLevel}
            audioStats={audioCoverage.stats}
            collection={collection}
            museumCollectedIds={museumCollectedIds}
            onBack={() => setGuildView('home')}
          />
        ) : (
          <>
            <Pressable
              style={({ pressed }) => ({
                alignSelf: 'flex-start',
                backgroundColor: pressed ? '#DDD6FE' : '#FFFFFF',
                borderColor: '#C4B5FD',
                borderRadius: 999,
                borderWidth: 1,
                marginBottom: 12,
                paddingHorizontal: 12,
                paddingVertical: 8,
              })}
              onPress={onClose}
            >
              <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>← {t('back')}</Text>
            </Pressable>
            <Text style={{ color: '#6D28D9', fontSize: 23, fontWeight: '900', lineHeight: 30, textAlign: 'center' }}>
              {t('guild_headquarters')}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 13, fontWeight: '800', lineHeight: 19, marginTop: 6, textAlign: 'center' }}>
              {t('guild_welcome')}
            </Text>

            <LanguageSwitcher />

            <View style={{ marginTop: 16 }}>
              <GuildStatusCard guild={guild} />
              <GuildMissionBoard guild={guild} />
            </View>

            <AudioCoverageCard coverageLevel={audioCoverage.coverageLevel} stats={audioCoverage.stats} />

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
              {guildNavigationItems.map((item) => (
                <GuildButton key={item.id} label={t(item.labelKey)} onPress={() => setGuildView(item.id)} />
              ))}
            </View>

            <View style={{ backgroundColor: '#FFFFFF', borderColor: '#E9D5FF', borderRadius: 18, borderWidth: 1, marginTop: 14, padding: 12 }}>
              <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>{t('guild_connected')}</Text>
              <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 6 }}>
                {t('guild_connected_body')}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#7C3AED' : '#8B5CF6',
                borderRadius: 18,
                marginTop: 16,
                padding: 14,
              })}
              onPress={onClose}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '900', textAlign: 'center' }}>{t('return_home')}</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

function GuildButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#FEF3C7' : '#FFFFFF',
        borderColor: '#FBBF24',
        borderRadius: 18,
        borderWidth: 1,
        flex: 1,
        minHeight: 54,
        minWidth: 128,
        padding: 12,
      })}
      onPress={onPress}
    >
      <Text style={{ color: '#6D28D9', flexShrink: 1, fontSize: 13, fontWeight: '900', lineHeight: 18, textAlign: 'center' }}>
        {label}
      </Text>
    </Pressable>
  );
}
