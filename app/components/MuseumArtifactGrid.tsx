import { Text, View } from 'react-native';
import type { MuseumExplorerArtifact } from '../utils/museumExplorerHelpers';
import { MuseumArtifactTile } from './MuseumArtifactTile';

export function MuseumArtifactGrid({
  artifacts,
  getRarityLabel,
  onOpenArtifact,
}: {
  artifacts: MuseumExplorerArtifact[];
  getRarityLabel: (artifact: MuseumExplorerArtifact) => string;
  onOpenArtifact: (artifact: MuseumExplorerArtifact) => void;
}) {
  const discoveredArtifacts = artifacts.filter((artifact) => artifact.discovered);
  const lockedArtifacts = artifacts.filter((artifact) => !artifact.discovered);

  return (
    <View>
      <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 16 }}>已发现</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
        {discoveredArtifacts.map((artifact) => (
          <MuseumArtifactTile
            artifact={artifact}
            key={artifact.exhibit.id}
            onPress={() => onOpenArtifact(artifact)}
            rarityLabel={getRarityLabel(artifact)}
          />
        ))}
      </View>

      <Text style={{ color: '#6D28D9', fontSize: 16, fontWeight: '900', marginTop: 18 }}>未发现</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
        {lockedArtifacts.map((artifact) => (
          <MuseumArtifactTile
            artifact={artifact}
            key={artifact.exhibit.id}
            onPress={() => undefined}
            rarityLabel={getRarityLabel(artifact)}
          />
        ))}
      </View>
    </View>
  );
}
