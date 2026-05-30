import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

const CHEST_REWARDS = [
  '🌟 星星徽章',
  '👑 新称号',
  '🪄 魔法能量',
  '✨ 幸运水晶',
  '🦉 小猫头鹰祝福',
];

export function useTreasureChest() {
  const [chestOpened, setChestOpened] = useState(false);
  const [chestReward, setChestReward] = useState('');
  const chestValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (!chestOpened) {
      chestValue.current.setValue(0);
      return;
    }

    chestValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(chestValue.current, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.back(1.9)),
        useNativeDriver: true,
      }),
      Animated.timing(chestValue.current, {
        toValue: 0.92,
        duration: 900,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [chestOpened, chestReward]);

  const openMagicChest = useCallback((nextCount: number) => {
    const reward = CHEST_REWARDS[(Date.now() + nextCount) % CHEST_REWARDS.length];
    setChestReward(reward);
    setChestOpened(true);
  }, []);

  const chestOpacity = chestValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const chestScale = chestValue.current.interpolate({
    inputRange: [0, 0.58, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const chestGlowScale = chestValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.65, 1.42, 1.16],
  });

  return {
    chestGlowScale,
    chestOpened,
    chestOpacity,
    chestReward,
    chestScale,
    openMagicChest,
    setChestOpened,
  };
}
