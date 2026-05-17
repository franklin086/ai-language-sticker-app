import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const takePhoto = async () => {
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

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Camera unavailable', 'The camera could not be opened on this device.');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Language Sticker App</Text>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.preview} />
        ) : null}

        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take photo</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Choose from album</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 38,
    marginBottom: 40,
    textAlign: 'center',
  },
  preview: {
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: 24,
    marginBottom: 28,
    width: '100%',
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
