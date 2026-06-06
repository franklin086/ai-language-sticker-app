import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import type { TranslationKey } from '../i18n/translations';
import type {
  CollectionBookFilter,
  CollectionBookFilterKey,
  CollectionBookSort,
  CollectionBookSortKey,
} from '../utils/museumCollectionsBookHelpers';

const filterLabelKeys: Record<CollectionBookFilterKey, TranslationKey> = {
  all: 'all',
  animal: 'category_animal',
  nature: 'category_nature',
  technology: 'category_technology',
  civilization: 'category_civilization',
  art: 'category_art',
  world_culture: 'category_world_culture',
};

const sortLabelKeys: Record<CollectionBookSortKey, TranslationKey> = {
  latest: 'latest_discovery',
  rarity: 'rarity',
  discovered_first: 'discovered_first',
  locked_first: 'locked_first',
};

export function CollectionBookFilterBar({
  activeFilterKey,
  activeSortKey,
  filters,
  onChangeFilter,
  onChangeSort,
  sortOptions,
}: {
  activeFilterKey: CollectionBookFilterKey;
  activeSortKey: CollectionBookSortKey;
  filters: CollectionBookFilter[];
  onChangeFilter: (filterKey: CollectionBookFilterKey) => void;
  onChangeSort: (sortKey: CollectionBookSortKey) => void;
  sortOptions: CollectionBookSort[];
}) {
  const { t } = useLanguage();

  return (
    <View style={{ gap: 12, marginTop: 14 }}>
      <View>
        <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>{t('filter_category')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {filters.map((filter) => {
            const active = filter.key === activeFilterKey;

            return (
              <Pressable
                key={filter.key}
                style={({ pressed }) => ({
                  backgroundColor: active ? '#8B5CF6' : pressed ? '#DDD6FE' : '#FFFFFF',
                  borderColor: active ? '#7C3AED' : '#C4B5FD',
                  borderRadius: 999,
                  borderWidth: 1,
                  paddingHorizontal: 11,
                  paddingVertical: 7,
                })}
                onPress={() => onChangeFilter(filter.key)}
              >
                <Text style={{ color: active ? '#FFFFFF' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>
                  {t(filterLabelKeys[filter.key])}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '900' }}>{t('sort_mode')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {sortOptions.map((sortOption) => {
            const active = sortOption.key === activeSortKey;

            return (
              <Pressable
                key={sortOption.key}
                style={({ pressed }) => ({
                  backgroundColor: active ? '#FBBF24' : pressed ? '#FEF3C7' : '#FFFFFF',
                  borderColor: active ? '#F59E0B' : '#FDE68A',
                  borderRadius: 999,
                  borderWidth: 1,
                  paddingHorizontal: 11,
                  paddingVertical: 7,
                })}
                onPress={() => onChangeSort(sortOption.key)}
              >
                <Text style={{ color: active ? '#92400E' : '#6D28D9', fontSize: 12, fontWeight: '900' }}>
                  {t(sortLabelKeys[sortOption.key])}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
