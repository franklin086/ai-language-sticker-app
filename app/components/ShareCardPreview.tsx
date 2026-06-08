import { Pressable, Text, View } from 'react-native';
import { getRarityVisualStyles } from '../utils/rarity';

type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';

export type ShareCardData = {
  curatorTitle: string;
  discoveredAt: string;
  encouragement: string;
  emoji: string;
  museumTitle: string;
  objectEn: string;
  objectZh: string;
  rarityCategory: StickerCategoryKey;
  rarityLabel: string;
  title: string;
};

type ComponentStyles = Record<string, any>;

export function ShareCardPreview({
  data,
  onClose,
  onSave,
  styles,
}: {
  data: ShareCardData;
  onClose: () => void;
  onSave: (data: ShareCardData) => void;
  styles: ComponentStyles;
}) {
  const rarityCategory = data.rarityCategory;
  const rarityVisual = getRarityVisualStyles(rarityCategory, styles as Parameters<typeof getRarityVisualStyles>[1]);

  return (
    <View style={styles.sharePreviewOverlay}>
      <View style={styles.sharePreviewBackdrop} />
      <View style={styles.sharePreviewShell}>
        <View pointerEvents="none" style={styles.sharePreviewGlow} />
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleOne]}>✨</Text>
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleTwo]}>⭐</Text>
        <Text style={[styles.sharePreviewSparkle, styles.sharePreviewSparkleThree]}>✨</Text>

        <View style={[styles.sharePreviewCard, rarityVisual.card]}>
          {rarityCategory === 'legendary' ? (
            <View style={styles.legendaryBanner}>
              <Text style={styles.legendaryBannerTitle}>🌈 LEGENDARY!</Text>
              <Text style={styles.legendaryBannerText}>✨ 传奇发现！</Text>
            </View>
          ) : null}

          <Text style={styles.sharePreviewBrand}>AI魔法识字相机</Text>
          <Text numberOfLines={2} style={styles.sharePreviewTitle}>{data.title}</Text>
          <View style={[styles.sharePreviewEmojiStage, rarityVisual.emojiStage]}>
            <Text style={styles.sharePreviewEmoji}>{data.emoji}</Text>
          </View>
          <Text numberOfLines={2} style={styles.sharePreviewZh}>{data.objectZh}</Text>
          <Text numberOfLines={2} style={styles.sharePreviewEn}>{data.objectEn}</Text>

          <View style={styles.sharePreviewInfoGrid}>
            <View style={styles.sharePreviewInfoPill}>
              <Text style={styles.sharePreviewInfoLabel}>稀有度</Text>
              <Text numberOfLines={2} style={styles.sharePreviewInfoValue}>{data.rarityLabel}</Text>
            </View>
            <View style={styles.sharePreviewInfoPill}>
              <Text style={styles.sharePreviewInfoLabel}>馆长等级</Text>
              <Text numberOfLines={2} style={styles.sharePreviewInfoValue}>{data.curatorTitle}</Text>
            </View>
          </View>

          <Text numberOfLines={2} style={styles.sharePreviewMuseum}>所属博物馆：{data.museumTitle}</Text>
          <Text numberOfLines={1} style={styles.sharePreviewMuseum}>发现日期：{data.discoveredAt}</Text>
          <Text numberOfLines={2} style={styles.sharePreviewEncouragement}>世界记忆又恢复了一点点 ✨</Text>
          <Text numberOfLines={2} style={styles.sharePreviewEncouragement}>{data.encouragement}</Text>
          <Text numberOfLines={2} style={styles.sharePreviewMuseum}>AI魔法识字相机 · 发现真实世界的语言魔法</Text>
        </View>

        <View style={styles.sharePreviewActions}>
          <Pressable
            style={({ pressed }) => [styles.sharePreviewSaveButton, pressed && styles.shareButtonPressed]}
            onPress={() => onSave(data)}
          >
            <Text style={styles.sharePreviewSaveText}>💾 保存分享图</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.sharePreviewCloseButton, pressed && styles.shareButtonPressed]}
            onPress={onClose}
          >
            <Text style={styles.sharePreviewCloseText}>关闭</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
