import { Box } from '@mui/system';
import DatePicker from 'react-datepicker';
import { InputLabel } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseDateTimeState } from '../../hooks/types';

function DateColumnBox({ children }: { children: JSX.Element[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff !important',
        '& .react-datepicker__header': {
          bgcolor: '#fff',
        },
        '& .react-datepicker-popper': { zIndex: 2 },
        '& .react-datepicker__input-container input': {
          display: 'block',
          width: '100%',
          fontSize: 16,
          p: '10.5px',
          pl: 5,
          bgcolor: '#F0F0F0',
          borderRadius: '5px',
          border: '1px #b9b9b9 solid',
        },
        '& .react-datepicker__day': {
          borderRadius: '50%',
        },
        '& .react-datepicker__day--in-selecting-range': {
          bgcolor: '#01E2A6',
          borderRadius: '50%',
        },
        '& .react-datepicker__day--selected': {
          borderRadius: '50%',
        },
        '& .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range :nth-chile(1)':
          {
            bgcolor: '#333',
          },
        '& .react-datepicker__day:hover': {
          borderRadius: '50%',
        },
        '& .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover':
          {
            bgcolor: '#005055',
            borderRadius: '50%',
          },
        '& .react-datepicker__day--in-range,': {
          bgcolor: '#01E2A6',
        },
        '& .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__ year-text--in-range),':
          {
            bgcolor: '#d5d5d5',
          },
      }}
    >
      {children}
    </Box>
  );
}

function DateIconBox() {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: 22,
        height: 22,
        zIndex: 1,
        top: '50%',
        left: '14px',
        transform: 'translateY(-50%)',
      }}
    >
      <img src="/image/icon/date-big.png" alt="" width="100%" />
    </Box>
  );
}

export default function BaseDatePicker({ t, createDateTime }: { t: TFunction; createDateTime: UseDateTimeState }) {
  const { timeValues, handleChangeTimeValues } = createDateTime;

  return (
    <DateColumnBox>
      <InputLabel>{t('Start Date')}</InputLabel>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <DateIconBox />
        <DatePicker
          selected={timeValues.startDate}
          onChange={handleChangeTimeValues('startDate')}
          selectsStart
          startDate={timeValues.startDate}
          minDate={new Date()}
          dateFormat="yyyy/MM/dd"
        />
      </Box>
    </DateColumnBox>
  );
}
