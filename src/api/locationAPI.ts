import { getRequest } from './baseAPI';
import { LocaleState } from './types';

export const getAllCountriesList = async (locale: LocaleState['locale']) => {
  return await getRequest(`/location/countries/${locale}`);
};

export const getAllCitiesByCountry = async (country: string, locale: LocaleState['locale']) => {
  return await getRequest(`/location/cities/${country}/${locale}`);
};
