import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type RecognitionResult = {
  object_en: string;
  object_zh: string;
  confidence: string;
};

type CollectionItem = RecognitionResult & {
  discoveredAt: string;
  emoji: string;
};

const COPY = {
  badge: '\u2728 Magic Word Camera',
  title: 'AI \u9b54\u6cd5\u8bc6\u5b57\u76f8\u673a',
  subtitle: '\u62cd\u4e00\u4e0b\uff0cAI\u9a6c\u4e0a\u544a\u8bc9\u4f60\u5b83\u53eb\u4ec0\u4e48 \u2728',
  uploadIcon: '\ud83d\udcf8',
  placeholderTitle: '\u7ed9\u6211\u770b\u770b\u8fd9\u662f\u4ec0\u4e48 \ud83d\udc40',
  placeholderText: 'AI\u4f1a\u731c\u51fa\u5b83\u7684\u540d\u5b57\uff01',
  loading: '\u2728 AI\u6b63\u5728\u65bd\u5c55\u9b54\u6cd5...',
  loadingHint: '\ud83e\ude84 \u6b63\u5728\u731c\u5b83\u53eb\u4ec0\u4e48...',
  found: '\u2728 AI\u53d1\u73b0\u4e86\uff01',
  celebrate: '\ud83c\udf89 \u592a\u68d2\u5566\uff01',
  ready: '\u653e\u4e00\u5f20\u56fe\u7247\u8fdb\u9b54\u6cd5\u7a97\uff0c\u9a6c\u4e0a\u53d8\u51fa\u5b66\u4e60\u8d34\u7eb8\u5361\u3002',
  error: '\u6211\u6ca1\u6709\u770b\u6e05\u695a',
  errorTitle: '\ud83e\udd14 \u6211\u6ca1\u6709\u770b\u6e05\u695a',
  errorHint: '\u518d\u7ed9\u6211\u770b\u770b\u5427 \u2728',
  errorEncourage: '\ud83e\ude84 \u6362\u4e00\u5f20\u6e05\u695a\u7684\u7167\u7247\u8bd5\u8bd5',
  collectionTitle: '\u2728 \u6211\u7684\u9b54\u6cd5\u56fe\u9274',
  collectionCount: '\u5df2\u53d1\u73b0',
  collectionNew: '\ud83c\udf89 \u65b0\u53d1\u73b0\u5df2\u52a0\u5165\u9b54\u6cd5\u56fe\u9274\uff01',
  collectionKnown: '\u2728 \u4f60\u5df2\u7ecf\u8ba4\u8bc6\u5b83\u5566\uff01',
  unlockNew: '\ud83c\udf89 NEW!',
  unlockSticker: '\u2728 \u65b0\u9b54\u6cd5\u8d34\u7eb8\u89e3\u9501\uff01',
  english: '\u82f1\u6587',
  chinese: '\u4e2d\u6587',
  confidence: 'Confidence',
  camera: '\ud83d\udcf7 \u62cd\u7167\u8bc6\u522b',
  album: '\ud83d\uddbc\ufe0f \u4ece\u76f8\u518c\u9009\u62e9',
};

export default function HomeScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [collectionMessage, setCollectionMessage] = useState('');
  const [collectionFeedback, setCollectionFeedback] = useState<'new' | 'known' | ''>('');
  const [newestDiscoveryAt, setNewestDiscoveryAt] = useState('');
  const [hoveredButton, setHoveredButton] = useState<'camera' | 'album' | null>(null);
  const [speakingLanguage, setSpeakingLanguage] = useState<'zh' | 'en' | null>(null);
  const floatValue = useRef(new Animated.Value(0));
  const buttonBreathValue = useRef(new Animated.Value(0));
  const buttonFlowValue = useRef(new Animated.Value(0));
  const resultAppearValue = useRef(new Animated.Value(0));
  const errorAppearValue = useRef(new Animated.Value(0));
  const unlockValue = useRef(new Animated.Value(0));
  const countBounceValue = useRef(new Animated.Value(0));
  const speakBounceValue = useRef(new Animated.Value(0));
  const starTwinkleValue = useRef(new Animated.Value(0));
  const scanValue = useRef(new Animated.Value(0));
  const pulseValue = useRef(new Animated.Value(0));
  const shimmerValue = useRef(new Animated.Value(0));
  const previousCollectionCount = useRef(0);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatValue.current, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(floatValue.current, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    const buttonLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonBreathValue.current, {
          toValue: 1,
          duration: 1300,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(buttonBreathValue.current, {
          toValue: 0,
          duration: 1300,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    const buttonFlowLoop = Animated.loop(
      Animated.timing(buttonFlowValue.current, {
        toValue: 1,
        duration: 1900,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    );
    const starLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(starTwinkleValue.current, {
          toValue: 1,
          duration: 1250,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(starTwinkleValue.current, {
          toValue: 0,
          duration: 1250,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    floatLoop.start();
    buttonLoop.start();
    buttonFlowLoop.start();
    starLoop.start();

    return () => {
      floatLoop.stop();
      buttonLoop.stop();
      buttonFlowLoop.stop();
      starLoop.stop();
    };
  }, []);

  useEffect(() => {
    if (!isRecognizing) {
      scanValue.current.stopAnimation();
      pulseValue.current.stopAnimation();
      shimmerValue.current.stopAnimation();
      scanValue.current.setValue(0);
      pulseValue.current.setValue(0);
      shimmerValue.current.setValue(0);
      return;
    }

    const scanLoop = Animated.loop(
      Animated.timing(scanValue.current, {
        toValue: 1,
        duration: 1450,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue.current, {
          toValue: 1,
          duration: 850,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue.current, {
          toValue: 0,
          duration: 850,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    const shimmerLoop = Animated.loop(
      Animated.timing(shimmerValue.current, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    );

    scanLoop.start();
    pulseLoop.start();
    shimmerLoop.start();

    return () => {
      scanLoop.stop();
      pulseLoop.stop();
      shimmerLoop.stop();
    };
  }, [isRecognizing]);

  useEffect(() => {
    if (!recognitionResult) {
      resultAppearValue.current.setValue(0);
      return;
    }

    resultAppearValue.current.setValue(0);
    Animated.timing(resultAppearValue.current, {
      toValue: 1,
      duration: 460,
      easing: Easing.out(Easing.back(1.6)),
      useNativeDriver: true,
    }).start();
  }, [recognitionResult]);

  useEffect(() => {
    if (!errorMessage) {
      errorAppearValue.current.setValue(0);
      return;
    }

    errorAppearValue.current.setValue(0);
    Animated.timing(errorAppearValue.current, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [errorMessage]);

  useEffect(() => {
    if (collection.length === previousCollectionCount.current) {
      return;
    }

    previousCollectionCount.current = collection.length;
    countBounceValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(countBounceValue.current, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(countBounceValue.current, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [collection.length]);

  useEffect(() => {
    if (collectionFeedback !== 'new') {
      unlockValue.current.setValue(0);
      return;
    }

    unlockValue.current.setValue(0);
    Animated.timing(unlockValue.current, {
      toValue: 1,
      duration: 620,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start();
  }, [collectionFeedback, newestDiscoveryAt]);

  const floatTranslateY = floatValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });
  const floatOpacity = floatValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });
  const buttonBreathScale = buttonBreathValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.012],
  });
  const buttonGlowOpacity = buttonBreathValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.34],
  });
  const buttonFlowTranslateX = buttonFlowValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-190, 260],
  });
  const starTwinkleOpacity = starTwinkleValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.42, 1],
  });
  const starTwinkleScale = starTwinkleValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1.16],
  });
  const magicEmojiTranslateY = pulseValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -5],
  });
  const resultOpacity = resultAppearValue.current.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 1, 1],
  });
  const resultScale = resultAppearValue.current.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.94, 1.035, 1],
  });
  const speakButtonScale = speakBounceValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });
  const errorOpacity = errorAppearValue.current.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 1],
  });
  const errorTranslateX = errorAppearValue.current.interpolate({
    inputRange: [0, 0.16, 0.32, 0.48, 0.64, 1],
    outputRange: [0, -5, 5, -3, 3, 0],
  });
  const errorScale = errorAppearValue.current.interpolate({
    inputRange: [0, 0.55, 1],
    outputRange: [0.97, 1.015, 1],
  });
  const errorEmojiTranslateY = errorAppearValue.current.interpolate({
    inputRange: [0, 0.48, 1],
    outputRange: [0, -8, 0],
  });
  const scanTranslateY = scanValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-28, 304],
  });
  const pulseScale = pulseValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.022],
  });
  const pulseOpacity = pulseValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.62, 1],
  });
  const shimmerTranslateX = shimmerValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-240, 280],
  });
  const unlockOpacity = unlockValue.current.interpolate({
    inputRange: [0, 0.22, 1],
    outputRange: [0, 1, 1],
  });
  const unlockScale = unlockValue.current.interpolate({
    inputRange: [0, 0.62, 1],
    outputRange: [0.82, 1.08, 1],
  });
  const unlockTranslateY = unlockValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });
  const unlockGlowScale = unlockValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.35],
  });
  const unlockGlowOpacity = unlockValue.current.interpolate({
    inputRange: [0, 0.42, 1],
    outputRange: [0, 0.5, 0.12],
  });
  const unlockSparkleScale = unlockValue.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.7, 1.25, 1],
  });
  const unlockSparkleOpacity = unlockValue.current.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 1, 0.72],
  });
  const countScale = countBounceValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  const newItemOpacity = unlockValue.current.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 1, 1],
  });
  const newItemTranslateY = unlockValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });
  const newItemScale = unlockValue.current.interpolate({
    inputRange: [0, 0.68, 1],
    outputRange: [0.9, 1.06, 1],
  });

  const recognizeImage = async (uri: string) => {
    setIsRecognizing(true);
    setRecognitionResult(null);
    setErrorMessage('');
    setCollectionMessage('');
    setCollectionFeedback('');
    setNewestDiscoveryAt('');

    try {
      const formData = new FormData();

      if (Platform.OS === 'web') {
        const imageResponse = await fetch(uri);
        const blob = await imageResponse.blob();
        formData.append('file', blob, 'photo.jpg');
      } else {
        formData.append('file', {
          uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as unknown as Blob);
      }

      const response = await fetch('http://localhost:8000/api/recognize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Recognition request failed.');
      }

      const parsed = (await response.json()) as RecognitionResult;
      setRecognitionResult(parsed);
      setCollection((currentCollection) => {
        const normalizedName = parsed.object_en.trim().toLowerCase();
        const alreadyDiscovered = currentCollection.some(
          (item) => item.object_en.trim().toLowerCase() === normalizedName,
        );

        if (alreadyDiscovered) {
          setCollectionMessage(COPY.collectionKnown);
          setCollectionFeedback('known');
          setNewestDiscoveryAt('');
          return currentCollection;
        }

        const discoveredAt = new Date().toISOString();
        setCollectionMessage(COPY.collectionNew);
        setCollectionFeedback('new');
        setNewestDiscoveryAt(discoveredAt);
        return [
          {
            ...parsed,
            discoveredAt,
            emoji: getMagicEmoji(parsed),
          },
          ...currentCollection,
        ];
      });
    } catch (error) {
      console.log('recognition failed', error);
      setErrorMessage(COPY.error);
    } finally {
      setIsRecognizing(false);
    }
  };

  const takePhoto = async () => {
    setRecognitionResult(null);
    setErrorMessage('');

    try {
      if (Platform.OS !== 'web') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          Alert.alert('Camera permission needed', 'Please allow camera access to take a photo.');
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      await recognizeImage(uri);
    } catch (error) {
      console.log('camera failed', error);
      setErrorMessage(COPY.error);
    }
  };

  const chooseFromAlbum = async () => {
    setRecognitionResult(null);
    setErrorMessage('');

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      await recognizeImage(uri);
    } catch (error) {
      console.log('photo selection failed', error);
      setErrorMessage(COPY.error);
    }
  };

  const speakWord = (text: string, language: 'zh' | 'en') => {
    Speech.stop();
    setSpeakingLanguage(language);
    speakBounceValue.current.setValue(0);
    Animated.sequence([
      Animated.timing(speakBounceValue.current, {
        toValue: 1,
        duration: 130,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(speakBounceValue.current, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    Speech.speak(text, {
      language: language === 'zh' ? 'zh-CN' : 'en-US',
      pitch: 1.06,
      rate: language === 'zh' ? 0.72 : 0.76,
      onDone: () => setSpeakingLanguage(null),
      onStopped: () => setSpeakingLanguage(null),
      onError: () => setSpeakingLanguage(null),
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.appShell}>
          <View style={styles.header}>
            <View style={styles.brandPill}>
              <Text style={styles.brandPillText}>{COPY.badge}</Text>
            </View>
            <Text style={styles.title}>{COPY.title}</Text>
            <Text style={styles.subtitle}>{COPY.subtitle}</Text>
          </View>

          <Animated.View
            style={[
              styles.photoGlowFrame,
              photoUri && styles.photoGlowFrameActive,
              {
                opacity: isRecognizing ? pulseOpacity : floatOpacity,
                transform: [
                  { translateY: floatTranslateY },
                  ...(isRecognizing ? [{ scale: pulseScale }] : []),
                ],
              },
            ]}
          >
            <View style={styles.photoCard}>
              <View pointerEvents="none" style={styles.portalGlow}>
                <View style={styles.portalOrbLarge} />
                <View style={styles.portalOrbSmall} />
                <Animated.Text
                  style={[
                    styles.star,
                    styles.starOne,
                    { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                  ]}
                >
                  {'\u2728'}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.star,
                    styles.starTwo,
                    { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                  ]}
                >
                  {'\u2726'}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.star,
                    styles.starThree,
                    { opacity: starTwinkleOpacity, transform: [{ scale: starTwinkleScale }] },
                  ]}
                >
                  {'\u2728'}
                </Animated.Text>
              </View>

              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.preview} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.uploadIcon}>{COPY.uploadIcon}</Text>
                  <Text style={styles.placeholderTitle}>{COPY.placeholderTitle}</Text>
                  <Text style={styles.placeholderText}>{COPY.placeholderText}</Text>
                </View>
              )}

              {isRecognizing ? (
                <>
                  <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanTranslateY }] }]} />
                  <Animated.View style={[styles.shimmerBeam, { transform: [{ translateX: shimmerTranslateX }] }]} />
                </>
              ) : null}
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.resultCard,
              recognitionResult && styles.resultCardSuccess,
              recognitionResult && {
                opacity: resultOpacity,
                transform: [{ scale: resultScale }],
              },
            ]}
          >
            {isRecognizing ? (
              <View style={styles.loadingState}>
                <ActivityIndicator color="#8B5CF6" />
                <Animated.Text
                  style={[
                    styles.loadingMagicIcon,
                    {
                      transform: [{ translateY: magicEmojiTranslateY }, { scale: pulseScale }],
                    },
                  ]}
                >
                  {'\ud83e\ude84'}
                </Animated.Text>
                <View>
                  <Text style={styles.statusText}>{COPY.loading}</Text>
                  <Text style={styles.statusHint}>{COPY.loadingHint}</Text>
                </View>
              </View>
            ) : recognitionResult ? (
              <MagicWordCard
                result={recognitionResult}
                onSpeakChinese={() => speakWord(recognitionResult.object_zh, 'zh')}
                onSpeakEnglish={() => speakWord(recognitionResult.object_en, 'en')}
                speakButtonScale={speakButtonScale}
                speakingLanguage={speakingLanguage}
              />
            ) : errorMessage ? (
              <FailureCard
                emojiTranslateY={errorEmojiTranslateY}
                opacity={errorOpacity}
                scale={errorScale}
                translateX={errorTranslateX}
              />
            ) : (
              <Text style={styles.readyText}>{COPY.ready}</Text>
            )}
          </Animated.View>

          <MagicCollection
            collection={collection}
            countScale={countScale}
            feedback={collectionFeedback}
            message={collectionMessage}
            newestDiscoveryAt={newestDiscoveryAt}
            newItemOpacity={newItemOpacity}
            newItemScale={newItemScale}
            newItemTranslateY={newItemTranslateY}
            unlockGlowOpacity={unlockGlowOpacity}
            unlockGlowScale={unlockGlowScale}
            unlockOpacity={unlockOpacity}
            unlockScale={unlockScale}
            unlockSparkleOpacity={unlockSparkleOpacity}
            unlockSparkleScale={unlockSparkleScale}
            unlockTranslateY={unlockTranslateY}
          />

          <View style={styles.actions}>
            <Animated.View style={{ transform: [{ scale: buttonBreathScale }] }}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  hoveredButton === 'camera' && styles.buttonHovered,
                  pressed && styles.buttonPressed,
                ]}
                onHoverIn={() => setHoveredButton('camera')}
                onHoverOut={() => setHoveredButton(null)}
                onPress={takePhoto}
              >
                <Animated.View style={[styles.buttonGlow, { opacity: buttonGlowOpacity }]} />
                <Animated.View
                  style={[styles.buttonFlow, { transform: [{ translateX: buttonFlowTranslateX }, { rotate: '16deg' }] }]}
                />
                <Text style={styles.buttonText}>{COPY.camera}</Text>
              </Pressable>
            </Animated.View>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                hoveredButton === 'album' && styles.secondaryButtonHovered,
                pressed && styles.secondaryButtonPressed,
              ]}
              onHoverIn={() => setHoveredButton('album')}
              onHoverOut={() => setHoveredButton(null)}
              onPress={chooseFromAlbum}
            >
              <Text style={styles.secondaryButtonText}>{COPY.album}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FailureCard({
  emojiTranslateY,
  opacity,
  scale,
  translateX,
}: {
  emojiTranslateY: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
  scale: Animated.AnimatedInterpolation<string | number>;
  translateX: Animated.AnimatedInterpolation<string | number>;
}) {
  return (
    <Animated.View
      style={[
        styles.failureCard,
        {
          opacity,
          transform: [{ translateX }, { scale }],
        },
      ]}
    >
      <Animated.Text style={[styles.failureEmoji, { transform: [{ translateY: emojiTranslateY }] }]}>
        {'\ud83e\ude84'}
      </Animated.Text>
      <Text style={styles.failureTitle}>{COPY.errorTitle}</Text>
      <Text style={styles.failureHint}>{COPY.errorHint}</Text>
      <View style={styles.failureEncouragePill}>
        <Text style={styles.failureEncourageText}>{COPY.errorEncourage}</Text>
      </View>
    </Animated.View>
  );
}

function MagicCollection({
  collection,
  countScale,
  feedback,
  message,
  newestDiscoveryAt,
  newItemOpacity,
  newItemScale,
  newItemTranslateY,
  unlockGlowOpacity,
  unlockGlowScale,
  unlockOpacity,
  unlockScale,
  unlockSparkleOpacity,
  unlockSparkleScale,
  unlockTranslateY,
}: {
  collection: CollectionItem[];
  countScale: Animated.AnimatedInterpolation<string | number>;
  feedback: 'new' | 'known' | '';
  message: string;
  newestDiscoveryAt: string;
  newItemOpacity: Animated.AnimatedInterpolation<string | number>;
  newItemScale: Animated.AnimatedInterpolation<string | number>;
  newItemTranslateY: Animated.AnimatedInterpolation<string | number>;
  unlockGlowOpacity: Animated.AnimatedInterpolation<string | number>;
  unlockGlowScale: Animated.AnimatedInterpolation<string | number>;
  unlockOpacity: Animated.AnimatedInterpolation<string | number>;
  unlockScale: Animated.AnimatedInterpolation<string | number>;
  unlockSparkleOpacity: Animated.AnimatedInterpolation<string | number>;
  unlockSparkleScale: Animated.AnimatedInterpolation<string | number>;
  unlockTranslateY: Animated.AnimatedInterpolation<string | number>;
}) {
  if (collection.length === 0) {
    return null;
  }

  return (
    <View style={styles.collectionPanel}>
      <View style={styles.collectionHeader}>
        <View>
          <Text style={styles.collectionTitle}>{COPY.collectionTitle}</Text>
          <View style={styles.collectionCountRow}>
            <Text style={styles.collectionCount}>{COPY.collectionCount}: </Text>
            <Animated.Text style={[styles.collectionCountNumber, { transform: [{ scale: countScale }] }]}>
              {collection.length}
            </Animated.Text>
            <Text style={styles.collectionCount}> \u4e2a</Text>
          </View>
        </View>
      </View>

      {feedback === 'new' ? (
        <Animated.View
          style={[
            styles.unlockBanner,
            {
              opacity: unlockOpacity,
              transform: [{ translateY: unlockTranslateY }, { scale: unlockScale }],
            },
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              styles.unlockGlow,
              {
                opacity: unlockGlowOpacity,
                transform: [{ scale: unlockGlowScale }],
              },
            ]}
          />
          <Animated.Text
            style={[
              styles.unlockSpark,
              styles.unlockSparkLeft,
              { opacity: unlockSparkleOpacity, transform: [{ scale: unlockSparkleScale }] },
            ]}
          >
            {'\u2728'}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.unlockSpark,
              styles.unlockSparkRight,
              { opacity: unlockSparkleOpacity, transform: [{ scale: unlockSparkleScale }] },
            ]}
          >
            {'\u2726'}
          </Animated.Text>
          <Text style={styles.unlockNewText}>{COPY.unlockNew}</Text>
          <Text style={styles.unlockStickerText}>{COPY.unlockSticker}</Text>
        </Animated.View>
      ) : message ? (
        <View style={styles.collectionMessagePill}>
          <Text style={styles.collectionMessageText}>{message}</Text>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={styles.collectionList}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {collection.map((item) => (
          <Animated.View
            key={`${item.object_en}-${item.discoveredAt}`}
            style={[
              styles.collectionItem,
              item.discoveredAt === newestDiscoveryAt && styles.collectionItemNew,
              item.discoveredAt === newestDiscoveryAt && {
                opacity: newItemOpacity,
                transform: [{ translateY: newItemTranslateY }, { scale: newItemScale }],
              },
            ]}
          >
            <Text style={styles.collectionEmoji}>{item.emoji}</Text>
            <Text numberOfLines={1} style={styles.collectionZh}>
              {item.object_zh}
            </Text>
            <Text numberOfLines={1} style={styles.collectionEn}>
              {item.object_en}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

function formatConfidence(confidence: string) {
  const value = confidence.toLowerCase().trim();

  if (value === 'high') {
    return 'High';
  }

  if (value === 'medium') {
    return 'Medium';
  }

  if (value === 'low') {
    return 'Low';
  }

  return confidence;
}

function getMagicEmoji(result: RecognitionResult) {
  const text = `${result.object_en} ${result.object_zh}`.toLowerCase();
  const matchers: Array<[string[], string]> = [
    [['apple', '\u82f9\u679c'], '\ud83c\udf4e'],
    [['banana', '\u9999\u8549'], '\ud83c\udf4c'],
    [['orange', '\u6a59', '\u6a58'], '\ud83c\udf4a'],
    [['cat', '\u732b'], '\ud83d\udc31'],
    [['dog', '\u72d7', '\u5c0f\u72d7'], '\ud83d\udc36'],
    [['bird', '\u9e1f'], '\ud83d\udc26'],
    [['fish', '\u9c7c'], '\ud83d\udc20'],
    [['airplane', 'plane', 'jet', 'fighter', '\u98de\u673a', '\u6218\u6597\u673a'], '\u2708\ufe0f'],
    [['car', 'vehicle', '\u6c7d\u8f66', '\u8f66'], '\ud83d\ude97'],
    [['bus', '\u516c\u4ea4'], '\ud83d\ude8c'],
    [['train', '\u706b\u8f66'], '\ud83d\ude86'],
    [['ship', 'boat', '\u8239'], '\u26f5'],
    [['ball', '\u7403'], '\u26bd'],
    [['book', '\u4e66'], '\ud83d\udcd6'],
    [['flower', '\u82b1'], '\ud83c\udf38'],
    [['tree', '\u6811'], '\ud83c\udf33'],
    [['cup', '\u676f'], '\ud83e\udd64'],
    [['phone', '\u624b\u673a'], '\ud83d\udcf1'],
    [['computer', '\u7535\u8111'], '\ud83d\udcbb'],
    [['shoe', '\u978b'], '\ud83d\udc5f'],
    [['chair', '\u6905'], '\ud83e\ude91'],
    [['toy', '\u73a9\u5177'], '\ud83e\uddf8'],
  ];

  const found = matchers.find(([keywords]) => keywords.some((keyword) => text.includes(keyword)));
  return found ? found[1] : '\u2728';
}

function MagicWordCard({
  result,
  onSpeakChinese,
  onSpeakEnglish,
  speakButtonScale,
  speakingLanguage,
}: {
  result: RecognitionResult;
  onSpeakChinese: () => void;
  onSpeakEnglish: () => void;
  speakButtonScale: Animated.AnimatedInterpolation<string | number>;
  speakingLanguage: 'zh' | 'en' | null;
}) {
  return (
    <View style={styles.wordCard}>
      <View style={styles.wordCardTop}>
        <Text style={styles.foundTitle}>{COPY.found}</Text>
        <Text style={styles.celebrateText}>{COPY.celebrate}</Text>
      </View>

      <View style={styles.emojiStage}>
        <Text style={styles.magicEmoji}>{getMagicEmoji(result)}</Text>
      </View>

      <Text style={styles.chineseWord}>{result.object_zh}</Text>
      <Text style={styles.englishWord}>{result.object_en}</Text>
      <Text style={styles.confidenceLine}>
        {COPY.confidence}: {formatConfidence(result.confidence)}
      </Text>

      <View style={styles.speechActions}>
        <SpeechButton
          active={speakingLanguage === 'zh'}
          label={'\ud83d\udd0a \u4e2d\u6587\u53d1\u97f3'}
          onPress={onSpeakChinese}
          scale={speakButtonScale}
        />
        <SpeechButton
          active={speakingLanguage === 'en'}
          label={'\ud83d\udd0a English'}
          onPress={onSpeakEnglish}
          scale={speakButtonScale}
        />
      </View>
    </View>
  );
}

function SpeechButton({
  active,
  label,
  onPress,
  scale,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  scale: Animated.AnimatedInterpolation<string | number>;
}) {
  return (
    <Animated.View style={active ? { transform: [{ scale }] } : undefined}>
      <Pressable
        style={({ pressed }) => [
          styles.speechButton,
          active && styles.speechButtonActive,
          pressed && styles.speechButtonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.speechButtonText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF4DC',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  appShell: {
    width: '100%',
    maxWidth: 382,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  brandPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F7D38A',
    backgroundColor: '#FFF9EB',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
  },
  brandPillText: {
    color: '#8A4B10',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  title: {
    color: '#34214D',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 39,
    maxWidth: 350,
    textAlign: 'center',
  },
  subtitle: {
    color: '#7C5C99',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 24,
    marginTop: 10,
    maxWidth: 330,
    textAlign: 'center',
  },
  photoGlowFrame: {
    width: '100%',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#F9D575',
    backgroundColor: '#FFF8E9',
    padding: 6,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 7,
  },
  photoGlowFrameActive: {
    borderColor: '#D8B4FE',
    shadowColor: '#A855F7',
    shadowOpacity: 0.2,
  },
  photoCard: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    aspectRatio: 1,
    width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFE9A8',
    backgroundColor: '#FFFDF7',
  },
  portalGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  portalOrbLarge: {
    position: 'absolute',
    top: 28,
    left: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FDE68A',
    opacity: 0.38,
  },
  portalOrbSmall: {
    position: 'absolute',
    right: 30,
    bottom: 34,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#DDD6FE',
    opacity: 0.52,
  },
  star: {
    position: 'absolute',
    color: '#A855F7',
    fontSize: 20,
    fontWeight: '900',
  },
  starOne: {
    top: 24,
    right: 42,
  },
  starTwo: {
    left: 44,
    bottom: 44,
    color: '#F59E0B',
    fontSize: 24,
  },
  starThree: {
    right: 72,
    bottom: 94,
    color: '#EC4899',
    fontSize: 18,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 34,
  },
  uploadIcon: {
    fontSize: 68,
    lineHeight: 78,
    marginBottom: 12,
  },
  placeholderTitle: {
    color: '#3B245F',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderText: {
    color: '#8A6B9F',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
    maxWidth: 260,
    textAlign: 'center',
  },
  scanLine: {
    position: 'absolute',
    left: 18,
    right: 18,
    top: 0,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 18,
  },
  shimmerBeam: {
    position: 'absolute',
    top: -40,
    bottom: -40,
    width: 76,
    backgroundColor: '#FFFFFF',
    opacity: 0.24,
    transform: [{ rotate: '14deg' }],
  },
  resultCard: {
    marginTop: 16,
    minHeight: 136,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F6D9A8',
    backgroundColor: '#FFFDF7',
    padding: 22,
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 26,
    elevation: 5,
  },
  resultCardSuccess: {
    borderColor: '#F7C948',
    backgroundColor: '#FFF9E8',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.18,
  },
  loadingState: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingMagicIcon: {
    fontSize: 25,
    lineHeight: 30,
  },
  statusText: {
    color: '#6D28D9',
    fontSize: 16,
    fontWeight: '900',
  },
  statusHint: {
    color: '#9B7BB7',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  foundTitle: {
    color: '#8B3A10',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  celebrateText: {
    color: '#C05A12',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 4,
    textAlign: 'center',
  },
  wordCard: {
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#FFE2A8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.13,
    shadowRadius: 20,
  },
  wordCardTop: {
    marginBottom: 14,
  },
  emojiStage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 112,
    height: 112,
    borderRadius: 38,
    backgroundColor: '#FFF1B8',
    borderWidth: 1,
    borderColor: '#FFD66B',
    marginBottom: 16,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
  },
  magicEmoji: {
    fontSize: 62,
    lineHeight: 74,
  },
  chineseWord: {
    color: '#3B245F',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 38,
    marginBottom: 6,
    textAlign: 'center',
  },
  englishWord: {
    color: '#7C3AED',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  confidenceLine: {
    color: '#A05A16',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  speechActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    width: '100%',
  },
  speechButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    minWidth: 124,
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#F5EDFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  speechButtonActive: {
    borderColor: '#C084FC',
    backgroundColor: '#EFE0FF',
    shadowOpacity: 0.28,
  },
  speechButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  speechButtonText: {
    color: '#6D28D9',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },
  readyText: {
    color: '#8A6B9F',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
    textAlign: 'center',
  },
  failureCard: {
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFF8E8',
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.13,
    shadowRadius: 20,
  },
  failureEmoji: {
    fontSize: 48,
    lineHeight: 58,
    marginBottom: 6,
  },
  failureTitle: {
    color: '#4C2D6F',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  failureHint: {
    color: '#8A5E22',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 23,
    marginTop: 6,
    textAlign: 'center',
  },
  failureEncouragePill: {
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  failureEncourageText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
    textAlign: 'center',
  },
  collectionPanel: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    backgroundColor: '#FFF9EB',
    marginTop: 16,
    overflow: 'hidden',
    paddingBottom: 16,
    paddingTop: 18,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  collectionHeader: {
    paddingHorizontal: 18,
  },
  collectionTitle: {
    color: '#4C2D6F',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
  },
  collectionCountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  collectionCount: {
    color: '#9A6A19',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
  },
  collectionCountNumber: {
    color: '#7C3AED',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
  },
  unlockBanner: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F7C948',
    backgroundColor: '#FFF1B8',
    marginHorizontal: 18,
    marginTop: 12,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 13,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
  },
  unlockGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
  },
  unlockSpark: {
    position: 'absolute',
    color: '#A855F7',
    fontSize: 23,
    fontWeight: '900',
  },
  unlockSparkLeft: {
    left: 24,
    top: 16,
  },
  unlockSparkRight: {
    right: 26,
    bottom: 16,
    color: '#EC4899',
  },
  unlockNewText: {
    color: '#C2410C',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    textAlign: 'center',
  },
  unlockStickerText: {
    color: '#4C2D6F',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
    marginTop: 2,
    textAlign: 'center',
  },
  collectionMessagePill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#F5E8FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginHorizontal: 18,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  collectionMessageText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
  },
  collectionList: {
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  collectionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 94,
    minHeight: 118,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F8D58D',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
  },
  collectionItemNew: {
    borderColor: '#F7C948',
    backgroundColor: '#FFFBEB',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.22,
    shadowRadius: 18,
  },
  collectionEmoji: {
    fontSize: 38,
    lineHeight: 46,
    marginBottom: 6,
  },
  collectionZh: {
    color: '#3B245F',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    textAlign: 'center',
    width: '100%',
  },
  collectionEn: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    marginTop: 2,
    textAlign: 'center',
    width: '100%',
  },
  actions: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 58,
    borderRadius: 24,
    backgroundColor: '#7C3AED',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  buttonHovered: {
    backgroundColor: '#6D28D9',
  },
  buttonGlow: {
    position: 'absolute',
    top: -34,
    left: -18,
    width: 150,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FDE68A',
    transform: [{ rotate: '-16deg' }],
  },
  buttonFlow: {
    position: 'absolute',
    top: -34,
    bottom: -34,
    width: 62,
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F0C36A',
    backgroundColor: '#FFF9EB',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  secondaryButtonPressed: {
    backgroundColor: '#FCEEC8',
    transform: [{ scale: 0.99 }],
  },
  secondaryButtonHovered: {
    borderColor: '#D8A531',
    backgroundColor: '#FFF4D4',
  },
  secondaryButtonText: {
    color: '#7C3AED',
    fontSize: 18,
    fontWeight: '900',
  },
});
