import { useState } from 'react';
import { TabValue, TabValueText, UseCreateEventTabState } from './types';
import useDateTime from './useDateTime';

function useCreateEventTab(data?: { isNetworkEvent?: number; isDuring?: number }): UseCreateEventTabState {
  const { handleClearEndDateAndTime } = useDateTime();
  const [tabEventPlace, setTabEventPlace] = useState<UseCreateEventTabState['tabEventPlace']>(
    data?.isNetworkEvent ? data.isNetworkEvent : 0
  );
  const [tabEventDuring, setTabEventDuring] = useState<UseCreateEventTabState['tabEventDuring']>(
    data?.isDuring ? data.isDuring : 0
  );
  const [tabValue, setTabValue] = useState<UseCreateEventTabState['tabValue']>({
    eventPlace: TabValueText.network,
    eventDuring: TabValueText.single,
  });

  const handleChangeTabValue = (key: keyof TabValue, value: TabValueText) => {
    setTabValue({ ...tabValue, [key]: value });
  };

  const handleChangeEventDuring: UseCreateEventTabState['handleChangeEventDuring'] = (event, newValue) => {
    setTabEventDuring(newValue);
    if (newValue === 0) {
      handleChangeTabValue('eventDuring', TabValueText.single);
    } else {
      handleChangeTabValue('eventDuring', TabValueText.recurring);
      // console.log('我是長期活動');
      handleClearEndDateAndTime();
    }
  };

  const handleChangeEventPlace: UseCreateEventTabState['handleChangeEventPlace'] = (event, newValue) => {
    setTabEventPlace(newValue);
    if (newValue === 0) {
      handleChangeTabValue('eventPlace', TabValueText.network);
    } else {
      handleChangeTabValue('eventPlace', TabValueText.physical);
    }
  };

  return {
    tabEventPlace,
    handleChangeEventPlace,

    tabEventDuring,
    handleChangeEventDuring,

    tabValue,
  };
}

export default useCreateEventTab;
