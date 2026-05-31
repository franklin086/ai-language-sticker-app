import { useState } from 'react';
import {
  buildNationalMapProgress,
  type NationalCitySource,
  type NationalMuseumSource,
} from '../utils/nationalMapHelpers';

export function useNationalMap({
  cityMapCompletedNodeIds,
  cityMaps,
  museumCollectedIds,
  museums,
}: {
  cityMapCompletedNodeIds: string[];
  cityMaps: NationalCitySource[];
  museumCollectedIds: string[];
  museums: NationalMuseumSource[];
}) {
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const selectedNationalMap = selectedCountryId
    ? buildNationalMapProgress({
        cityMapCompletedNodeIds,
        cityMaps,
        countryId: selectedCountryId,
        museumCollectedIds,
        museums,
      })
    : null;

  return {
    closeNationalMap: () => setSelectedCountryId(''),
    openNationalMap: setSelectedCountryId,
    selectedCountryId,
    selectedNationalMap,
  };
}
