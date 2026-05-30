import { useState } from 'react';
import { Platform } from 'react-native';

export type FollowUpRecognitionResult = {
  object_en: string;
  object_zh: string;
  specific_en?: string;
  specific_zh?: string;
  brand?: string;
  subtype?: string;
  confidence?: string;
  needs_follow_up?: boolean;
  follow_up_question?: string;
};

export function useFollowUpRecognition(endpoint: string) {
  const [isFollowingUp, setIsFollowingUp] = useState(false);
  const [followUpError, setFollowUpError] = useState('');

  const runFollowUpRecognition = async ({
    currentResult,
    uri,
  }: {
    currentResult: FollowUpRecognitionResult;
    uri: string;
  }) => {
    setIsFollowingUp(true);
    setFollowUpError('');

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

      formData.append('object_zh', currentResult.object_zh);
      formData.append('object_en', currentResult.object_en);
      formData.append('specific_zh', currentResult.specific_zh ?? '');
      formData.append('specific_en', currentResult.specific_en ?? '');

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      const rawText = await response.text();

      if (!response.ok) {
        throw new Error(rawText || `Follow-up recognition failed with status ${response.status}`);
      }

      return JSON.parse(rawText) as FollowUpRecognitionResult;
    } catch (error) {
      console.log('follow-up recognition failed', error);
      setFollowUpError('Follow-up recognition failed');
      return null;
    } finally {
      setIsFollowingUp(false);
    }
  };

  return {
    followUpError,
    isFollowingUp,
    runFollowUpRecognition,
  };
}
