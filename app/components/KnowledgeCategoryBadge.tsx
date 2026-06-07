import { Text, View } from 'react-native';
import type { KnowledgeCategory } from '../data/knowledgeCategories';
import type { SupportedLanguage } from '../i18n/translations';
import { getKnowledgeCategoryEmoji, getKnowledgeCategoryLabel } from '../utils/knowledgeCategoryHelpers';

export function KnowledgeCategoryBadge({
  category,
  language,
}: {
  category: KnowledgeCategory;
  language: SupportedLanguage;
}) {
  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: '#F5F3FF',
        borderColor: '#C4B5FD',
        borderRadius: 999,
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Text style={{ color: '#6D28D9', fontSize: 12, fontWeight: '900' }}>
        {getKnowledgeCategoryEmoji(category)} {getKnowledgeCategoryLabel(category, language)}
      </Text>
    </View>
  );
}
