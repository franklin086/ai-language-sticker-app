import { MobileBackButton } from './MobileBackButton';

export function LearningBackButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return <MobileBackButton label={label} onPress={onPress} />;
}
