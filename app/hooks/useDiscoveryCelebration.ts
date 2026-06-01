import { useState } from 'react';
import {
  buildDiscoveryCelebration,
  type DiscoveryCelebrationData,
} from '../utils/discoveryCelebrationHelpers';

export function useDiscoveryCelebration() {
  const [discoveryCelebration, setDiscoveryCelebration] = useState<DiscoveryCelebrationData | null>(null);

  return {
    closeDiscoveryCelebration: () => setDiscoveryCelebration(null),
    discoveryCelebration,
    triggerDiscoveryCelebration: (input: Parameters<typeof buildDiscoveryCelebration>[0]) => {
      setDiscoveryCelebration(buildDiscoveryCelebration(input));
    },
  };
}
