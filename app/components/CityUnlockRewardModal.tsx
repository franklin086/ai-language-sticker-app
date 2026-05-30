import { Pressable, Text, View } from 'react-native';
import type { CityUnlockReward } from '../hooks/useCityUnlockRewards';

type ComponentStyles = Record<string, any>;

export function CityUnlockRewardModal({
  onClose,
  reward,
  styles,
}: {
  onClose: () => void;
  reward: CityUnlockReward;
  styles: ComponentStyles;
}) {
  return (
    <View style={styles.sharePreviewOverlay}>
      <View style={styles.sharePreviewBackdrop} />
      <View style={styles.sharePreviewShell}>
        <View pointerEvents="none" style={styles.sharePreviewGlow} />
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleOne]}>✨</Text>
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleTwo]}>🏙️</Text>
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleThree]}>🎁</Text>

        <View style={styles.sharePreviewCard}>
          <Text style={styles.sharePreviewBrand}>🏙️ 城市点亮！</Text>
          <Text style={styles.sharePreviewTitle}>你已完成「{reward.cityName}」魔法探索</Text>
          <View style={styles.sharePreviewEmojiStage}>
            <Text style={styles.sharePreviewEmoji}>🏅</Text>
          </View>
          <Text style={styles.sharePreviewZh}>获得：</Text>
          <Text style={styles.sharePreviewEn}>+100 XP</Text>
          <Text style={styles.sharePreviewMuseum}>🎁 宝箱 +1</Text>
          <Text style={styles.sharePreviewEncouragement}>🏅 {reward.badgeTitle}</Text>
        </View>

        <View style={styles.sharePreviewActions}>
          <Pressable
            style={({ pressed }) => [styles.sharePreviewSaveButton, pressed && styles.shareButtonPressed]}
            onPress={onClose}
          >
            <Text style={styles.sharePreviewSaveText}>继续探索</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
