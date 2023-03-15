import moment from 'moment';

export const getDateTimeToTimeStamp = (date: Date, time: Date) => {
  const date1 = moment(date);
  const time1 = moment(time);

  const result = date1.startOf('day').add(time1.hours(), 'hours').add(time1.minutes(), 'minutes').unix();
  return result;
};
