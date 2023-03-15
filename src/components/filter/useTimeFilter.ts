import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { TimeOrder } from '../../hooks/types';
import { selectList } from './filterData';

export interface UseTimeFilterState {
  selectTime: TimeOrder.ASC | TimeOrder.DESC;
  handleChangeSelectTime: (event: SelectChangeEvent) => void;
}

function useTimeFilter(): UseTimeFilterState {
  const [selectTime, setSelectTime] = React.useState<UseTimeFilterState['selectTime']>(selectList[0].value);

  const handleChangeSelectTime: UseTimeFilterState['handleChangeSelectTime'] = (event) => {
    setSelectTime(event.target.value as TimeOrder);
  };

  return {
    selectTime,
    handleChangeSelectTime,
  };
}

export default useTimeFilter;
