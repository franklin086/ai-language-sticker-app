import { Pressable, Text, View } from 'react-native';
import { LANGUAGE_OPTIONS } from '../i18n/translations';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <View style={{ backgroundColor: '#FFFFFF', borderColor: '#E9D5FF', borderRadius: 18, borderWidth: 1, marginTop: 12, padding: 12 }}>
      <Text style={{ color: '#6D28D9', fontSize: 13, fontWeight: '900', textAlign: 'center' }}>{t('language')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 10 }}>
        {LANGUAGE_OPTIONS.map((option) => {
          const active = option.code === currentLanguage;

          return (
            <Pressable
              key={option.code}
              style={({ pressed }) => ({
                backgroundColor: active ? '#8B5CF6' : pressed ? '#DDD6FE' : '#FFF7ED',
                borderColor: active ? '#7C3AED' : '#FBBF24',
                borderRadius: 999,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 7,
              })}
              onPress={() => setLanguage(option.code)}
            >
              <Text style={{ color: active ? '#FFFFFF' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
