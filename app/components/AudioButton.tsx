import { Pressable, Text } from 'react-native';
import type { AudioLanguageCode } from '../data/audioLanguages';
import { playArtifactAudio, type AudioArtifact } from '../utils/audioHelpers';
import { describeAudioSource, getBestAudioSource } from '../utils/audioStrategyHelpers';

export function AudioButton({
  artifact,
  language = 'en',
}: {
  artifact: AudioArtifact;
  language?: AudioLanguageCode;
}) {
  const audioSource = getBestAudioSource(artifact, language);
  const audioTitle = describeAudioSource(audioSource);

  return (
    <Pressable
      accessibilityLabel={`Play audio: ${audioTitle}`}
      style={({ pressed }) => ({
        alignSelf: 'center',
        backgroundColor: pressed ? '#FEF3C7' : '#FFF7ED',
        borderColor: '#FBBF24',
        borderRadius: 999,
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        shadowColor: '#F59E0B',
        shadowOpacity: pressed ? 0.08 : 0.14,
        shadowRadius: 8,
      })}
      onPress={() => playArtifactAudio(artifact, language)}
    >
      <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>
        🔊 {audioTitle}
      </Text>
    </Pressable>
  );
}
