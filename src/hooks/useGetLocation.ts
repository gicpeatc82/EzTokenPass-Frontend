import { useState } from 'react';
import { getAllCountriesList, getAllCitiesByCountry } from '../api/locationAPI';
import useResponseMessage from './useResponseMessage';
import { UseGetLocationState } from './types';

function useGetLocation(): UseGetLocationState {
  const { handleGetAPISuccess } = useResponseMessage();
  const [allCountriesList, setAllCountries] = useState<UseGetLocationState['allCountriesList']>(null);
  const [allCitiesList, setAllCitiesList] = useState<UseGetLocationState['allCitiesList']>(null);
  const [timeZoomList, setTimeZoomList] = useState<UseGetLocationState['timeZoomList']>(null);

  const handleGetAllCountriesList: UseGetLocationState['handleGetAllCountriesList'] = (locale) => {
    getAllCountriesList(locale).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setAllCountries(res.data.data);
    });
  };

  const handleGetAllCitiesByCountry: UseGetLocationState['handleGetAllCitiesByCountry'] = (country, locale) => {
    getAllCitiesByCountry(country, locale).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setAllCitiesList(res.data.data);
    });
  };

  const handleGetTimeZoom: UseGetLocationState['handleGetTimeZoom'] = (locale) => {
    getAllCitiesByCountry('Network', locale).then((res: any) => {
      const successRes = handleGetAPISuccess(res);
      if (successRes) setTimeZoomList(res.data.data);
    });
  };

  return {
    allCountriesList,
    handleGetAllCountriesList,

    allCitiesList,
    handleGetAllCitiesByCountry,

    timeZoomList,
    handleGetTimeZoom,
  };
}

export default useGetLocation;
