import { Text, View } from 'react-native';

type ComponentStyles = Record<string, any>;

export type MuseumProgress = {
  emoji: string;
  foundCount: number;
  title: string;
  totalCount: number;
};

export function MuseumProgressCard({
  progress,
  styles,
}: {
  progress: MuseumProgress;
  styles: ComponentStyles;
}) {
  return (
    <View style={styles.museumProgressBox}>
      <Text style={styles.museumProgressTitle}>
        {progress.emoji} {progress.title}
      </Text>
      <Text style={styles.museumProgressText}>
        已发现 {progress.foundCount} / {progress.totalCount}
      </Text>
    </View>
  );
}
