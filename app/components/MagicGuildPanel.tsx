import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { useMagicGuild } from '../hooks/useMagicGuild';
import { CollectionSetPanel } from './CollectionSetPanel';
import { GuildMissionBoard } from './GuildMissionBoard';
import { GuildStatusCard } from './GuildStatusCard';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MuseumCollectionsBookPanel } from './MuseumCollectionsBookPanel';

type MagicGuildInput = Parameters<typeof useMagicGuild>[0];

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
  const [guildView, setGuildView] = useState<'home' | 'collectionsBook' | 'collectionSets'>('home');
  const { t } = useLanguage();
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
        ) : (
          <>
            <Text style={{ color: '#6D28D9', fontSize: 25, fontWeight: '900', textAlign: 'center' }}>
              {t('guild_headquarters')}
            </Text>
            <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
              {t('guild_welcome')}
            </Text>

            <LanguageSwitcher />

            <View style={{ marginTop: 16 }}>
              <GuildStatusCard guild={guild} />
              <GuildMissionBoard guild={guild} />
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#FEF3C7' : '#FFFFFF',
                  borderColor: '#FBBF24',
                  borderRadius: 18,
                  borderWidth: 1,
                  flex: 1,
                  minWidth: 150,
                  padding: 12,
                })}
                onPress={() => setGuildView('collectionsBook')}
              >
                <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>
                  {t('open_collection_book')}
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#FEF3C7' : '#FFFFFF',
                  borderColor: '#FBBF24',
                  borderRadius: 18,
                  borderWidth: 1,
                  flex: 1,
                  minWidth: 150,
                  padding: 12,
                })}
                onPress={() => setGuildView('collectionSets')}
              >
                <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900', textAlign: 'center' }}>
                  🎁 {t('collection_sets')}
                </Text>
              </Pressable>
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
