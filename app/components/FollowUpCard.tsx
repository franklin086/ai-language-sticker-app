import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type ComponentStyles = Record<string, any>;

export function FollowUpCard({
  errorText,
  isLoading,
  onChangePhoto,
  onContinue,
  onLearnCurrent,
  question,
  styles,
}: {
  errorText: string;
  isLoading: boolean;
  onChangePhoto: () => void;
  onContinue: () => void;
  onLearnCurrent: () => void;
  question: string;
  styles: ComponentStyles;
}) {
  return (
    <View style={styles.artifactStoryBox}>
      <Text style={styles.artifactStoryTitle}>🔍 我发现了更多线索！</Text>
      <Text style={styles.artifactStoryText}>{question}</Text>
      {errorText ? <Text style={styles.statusHint}>{errorText}</Text> : null}
      <View style={styles.speechActions}>
        <Pressable
          disabled={isLoading}
          style={({ pressed }) => [styles.shareButton, pressed && styles.shareButtonPressed]}
          onPress={onContinue}
        >
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.shareButtonText}>✨ 继续探索</Text>}
        </Pressable>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]} onPress={onLearnCurrent}>
          <Text style={styles.secondaryButtonText}>📚 学习当前词</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]} onPress={onChangePhoto}>
          <Text style={styles.secondaryButtonText}>📷 换一张照片</Text>
        </Pressable>
      </View>
    </View>
  );
}
