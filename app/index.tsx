import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  error: 'Oops, I could not see it clearly. Try another photo!',
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
  const [hoveredButton, setHoveredButton] = useState<'camera' | 'album' | null>(null);
  const floatValue = useRef(new Animated.Value(0));
  const buttonBreathValue = useRef(new Animated.Value(0));
  const buttonFlowValue = useRef(new Animated.Value(0));
  const resultAppearValue = useRef(new Animated.Value(0));
  const starTwinkleValue = useRef(new Animated.Value(0));
  const scanValue = useRef(new Animated.Value(0));
  const pulseValue = useRef(new Animated.Value(0));
  const shimmerValue = useRef(new Animated.Value(0));

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

  const recognizeImage = async (uri: string) => {
    setIsRecognizing(true);
    setRecognitionResult(null);
    setErrorMessage('');

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
              <MagicWordCard result={recognitionResult} />
            ) : errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : (
              <Text style={styles.readyText}>{COPY.ready}</Text>
            )}
          </Animated.View>

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

function MagicWordCard({ result }: { result: RecognitionResult }) {
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
    </View>
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
  readyText: {
    color: '#8A6B9F',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
    textAlign: 'center',
  },
  errorText: {
    color: '#B45309',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
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
