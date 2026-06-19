import { Text, View } from 'react-native';
import type { KnowledgeCategory } from '../data/knowledgeCategories';
import type { SupportedLanguage } from '../i18n/translations';
import { KnowledgeCategoryBadge } from './KnowledgeCategoryBadge';

export function DiscoveryFactCard({
  category,
  fact,
  language,
}: {
  category?: KnowledgeCategory;
  fact: string | null;
  language?: SupportedLanguage;
}) {
  if (!fact) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FBBF24',
        borderRadius: 18,
        borderWidth: 1,
        marginTop: 12,
        padding: 12,
        shadowColor: '#F59E0B',
        shadowOpacity: 0.12,
        shadowRadius: 10,
      }}
    >
      <View
        style={{
          backgroundColor: '#FFF7D6',
          borderColor: '#FBBF24',
          borderRadius: 14,
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}
      >
        <Text style={{ color: '#92400E', fontSize: 12, fontWeight: '900', lineHeight: 17, textAlign: 'center' }}>
          这是从你发现的藏品中提炼出的一个关键知识点。
        </Text>
      </View>
      <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>💡 你知道吗？</Text>
      {category && language ? <KnowledgeCategoryBadge category={category} language={language} /> : null}
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '800', lineHeight: 18, marginTop: 6 }}>
        {fact}
      </Text>
    </View>
  );
}
