import DatePicker from 'react-datepicker';
import { Box, InputLabel } from '@mui/material';
import { TFunction } from 'react-i18next';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { UseDateTimeState } from '../../hooks/types';

function TimeIconBox() {
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
        color: '#a3a3a3',
      }}
    >
      <AccessTimeIcon />
    </Box>
  );
}

export default function TimeRangeSelect({ t, createDateTime }: { t: TFunction; createDateTime: UseDateTimeState }) {
  const { timeValues, handleChangeTimeValues } = createDateTime;

  return (
    <Box
      sx={{
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
      }}
    >
      <InputLabel sx={{ textTransform: 'capitalize' }}>*{t('start time')}</InputLabel>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <TimeIconBox />
        <DatePicker
          selected={timeValues.startTime}
          onChange={handleChangeTimeValues('startTime')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </Box>

      <InputLabel sx={{ textTransform: 'capitalize' }}>{t('end time')}</InputLabel>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <TimeIconBox />
        <DatePicker
          selected={timeValues.endTime}
          onChange={handleChangeTimeValues('endTime')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </Box>
    </Box>
  );
}
