import { StyleSheet, Text, Pressable, SafeAreaView, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Language Sticker App</Text>

        <View style={styles.actions}>
          <Pressable style={styles.button}>
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
