import { useState } from 'react';
import { TimeState, UseDateTimeState } from './types';

function useDateTime(
  defaultStartDate?: Date,
  defaultStartTime?: Date,
  defaultEndDate?: Date | null,
  defaultEndTime?: Date | null
): UseDateTimeState {
  const [timeValues, setTimeValues] = useState({
    startDate: defaultStartDate ? defaultStartDate : new Date(),
    startTime: defaultStartTime ? defaultStartTime : new Date(),
    endDate: defaultEndDate ? defaultEndDate : null,
    endTime: defaultEndTime ? defaultEndTime : null,
  });

  const handleChangeTimeValues = (prop: keyof TimeState) => (date: Date) => {
    setTimeValues({ ...timeValues, [prop]: date });
  };

  const handleClearEndDateAndTime = () => {
    setTimeValues({ ...timeValues, ['endDate']: null, ['endTime']: null });
  };

  return { timeValues, handleChangeTimeValues, handleClearEndDateAndTime };
}

export default useDateTime;
