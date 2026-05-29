import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type StickerCategoryKey = 'common' | 'rare' | 'epic' | 'legendary';

type RarityStyles = {
  rarityCardCommon: StyleProp<ViewStyle>;
  rarityCardEpic: StyleProp<ViewStyle>;
  rarityCardLegendary: StyleProp<ViewStyle>;
  rarityCardRare: StyleProp<ViewStyle>;
  rarityEmojiCommon: StyleProp<ViewStyle>;
  rarityEmojiEpic: StyleProp<ViewStyle>;
  rarityEmojiLegendary: StyleProp<ViewStyle>;
  rarityEmojiRare: StyleProp<ViewStyle>;
  rarityLabelCommon: StyleProp<TextStyle>;
  rarityLabelEpic: StyleProp<TextStyle>;
  rarityLabelLegendary: StyleProp<TextStyle>;
  rarityLabelRare: StyleProp<TextStyle>;
};

type RarityVisualStyles = {
  card: StyleProp<ViewStyle>;
  emojiStage: StyleProp<ViewStyle>;
  label: StyleProp<TextStyle>;
};

export function getRarityVisualStyles(category: StickerCategoryKey, styles: RarityStyles): RarityVisualStyles {
  if (category === 'legendary') {
    return {
      card: styles.rarityCardLegendary,
      emojiStage: styles.rarityEmojiLegendary,
      label: styles.rarityLabelLegendary,
    };
  }

  if (category === 'epic') {
    return {
      card: styles.rarityCardEpic,
      emojiStage: styles.rarityEmojiEpic,
      label: styles.rarityLabelEpic,
    };
  }

  if (category === 'rare') {
    return {
      card: styles.rarityCardRare,
      emojiStage: styles.rarityEmojiRare,
      label: styles.rarityLabelRare,
    };
  }

  return {
    card: styles.rarityCardCommon,
    emojiStage: styles.rarityEmojiCommon,
    label: styles.rarityLabelCommon,
  };
}
