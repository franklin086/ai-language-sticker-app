import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type RecognitionResult = {
  object_en: string;
  object_zh: string;
  confidence: string;
};

export default function HomeScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognizeImage = async (uri: string) => {
    setIsRecognizing(true);
    setRecognitionResult(null);
    setErrorMessage(null);

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

      const data = (await response.json()) as RecognitionResult;
      console.log('raw backend response', data);
      setRecognitionResult(data);
      setErrorMessage(null);
    } catch (error) {
      console.log('recognition failed', error);
      setErrorMessage('Recognition failed');
    } finally {
      setIsRecognizing(false);
    }
  };

  const takePhoto = async () => {
    setRecognitionResult(null);
    setErrorMessage(null);

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
      setErrorMessage('Recognition failed');
    }
  };

  const chooseFromAlbum = async () => {
    setRecognitionResult(null);
    setErrorMessage(null);

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
      console.log('selected image uri', uri);
      setPhotoUri(uri);
      await recognizeImage(uri);
    } catch (error) {
      console.log('photo selection failed', error);
      setErrorMessage('Recognition failed');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>AI Language Sticker App</Text>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.preview} />
        ) : (
          <Text style={styles.emptyText}>No image selected</Text>
        )}

        <View style={styles.resultCard}>
          {isRecognizing ? (
            <Text style={styles.statusText}>Recognizing...</Text>
          ) : null}

          {recognitionResult ? (
            <View style={styles.resultLines}>
              <Text style={styles.resultText}>English: {recognitionResult.object_en}</Text>
              <Text style={styles.resultText}>中文: {recognitionResult.object_zh}</Text>
              <Text style={styles.resultText}>Confidence: {recognitionResult.confidence}</Text>
            </View>
          ) : (
            <Text style={styles.resultText}>No recognition result</Text>
          )}

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take photo</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={chooseFromAlbum}>
            <Text style={styles.secondaryButtonText}>Choose from album</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 38,
    marginBottom: 32,
    textAlign: 'center',
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  preview: {
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: 24,
    marginBottom: 20,
    maxHeight: 320,
    maxWidth: 320,
    width: '100%',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    minHeight: 56,
    padding: 16,
  },
  resultLines: {
    gap: 8,
  },
  resultText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  actions: {
    gap: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '700',
  },
});
