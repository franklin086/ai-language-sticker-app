import { Text, View } from 'react-native';

export function LearningProfileCard({
  helperText,
  label,
  value,
}: {
  helperText?: string;
  label: string;
  value: string | number;
}) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FBBF24',
        borderRadius: 18,
        borderWidth: 1,
        flexBasis: '47%',
        flexGrow: 1,
        minHeight: 104,
        minWidth: 132,
        padding: 12,
        shadowColor: '#F59E0B',
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
    >
      <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: '900', lineHeight: 17, textAlign: 'center' }}>
        {label}
      </Text>
      <Text style={{ color: '#3B245F', fontSize: 25, fontWeight: '900', lineHeight: 32, marginTop: 8, textAlign: 'center' }}>
        {value}
      </Text>
      {helperText ? (
        <Text style={{ color: '#9A6A19', fontSize: 11, fontWeight: '800', lineHeight: 16, marginTop: 4, textAlign: 'center' }}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
