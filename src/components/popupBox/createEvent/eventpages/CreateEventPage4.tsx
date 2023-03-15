import { Box, Divider, InputLabel, Typography } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseEventState, UseDateTimeState } from '../../../../hooks/types';
import moment from 'moment';

function ListBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Box sx={{ mb: 2 }}>{children}</Box>;
}

function HalfBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}

function ImageBox({ imgURL }: { imgURL: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: 300,
          height: 250,
          background: `center / contain no-repeat url(${imgURL})`,
          bgcolor: '#f5f5f5',
        }}
      />
    </Box>
  );
}

function TextBox({ text }: { text: string }) {
  return (
    <Typography component="div" sx={{ bgcolor: '#f5f5f5', p: '8px 16px', borderRadius: '5px' }}>
      {text}
    </Typography>
  );
}

export default function CreateEventPage4({
  t,
  createEvent,
  createDateTime,
}: {
  t: TFunction;
  createEvent: UseEventState;
  createDateTime: UseDateTimeState;
}) {
  const { eventValues, showImg } = createEvent;
  const { timeValues } = createDateTime;

  return (
    <>
      <ListBox>
        <ImageBox imgURL={showImg['showURL']} />
      </ListBox>

      <ListBox>
        <InputLabel>{t('Your event name')}</InputLabel>
        <TextBox text={eventValues.eventName} />
      </ListBox>

      {eventValues.city && (
        <>
          <ListBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box sx={{ width: { xs: '100%', md: '50%' }, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}>
                <InputLabel>{t('Country')}</InputLabel>
                <TextBox text={eventValues.country ? eventValues.country : ''} />
              </Box>
              <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 0, md: 1 } }}>
                <InputLabel>{t('City')}</InputLabel>
                <TextBox text={eventValues.city ? eventValues.city : ''} />
              </Box>
            </Box>
          </ListBox>
          <ListBox>
            <InputLabel>{t('Address')}</InputLabel>
            <TextBox text={eventValues.address} />
          </ListBox>
        </>
      )}

      <Divider sx={{ pt: 2, mb: 2 }} />

      <Typography sx={{ mb: 2, fontSize: 18 }}>{t('Event time')}</Typography>

      {eventValues.gmt && (
        <ListBox>
          <HalfBox>
            <Box sx={{ width: { xs: '100%', md: '50%' }, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}>
              <InputLabel>{t('Time zoom')}</InputLabel>
              <TextBox text={eventValues.gmt.replace('Network', '')} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 0, md: 1 } }}></Box>
          </HalfBox>
        </ListBox>
      )}

      <ListBox>
        <HalfBox>
          <Box sx={{ width: { xs: '100%', md: '50%' }, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}>
            <InputLabel>{t('Start Date')}</InputLabel>
            <TextBox text={moment(timeValues.startDate).format('YYYY/MM/DD')} />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 0, md: 1 } }}>
            <InputLabel>{t('Start time')}</InputLabel>
            <TextBox text={moment(timeValues.startTime).format('LT')} />
          </Box>
        </HalfBox>
      </ListBox>

      {timeValues.endDate && (
        <ListBox>
          <HalfBox>
            <Box sx={{ width: { xs: '100%', md: '50%' }, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}>
              <InputLabel>{t('End Date')}</InputLabel>
              <TextBox text={moment(timeValues.endDate).format('YYYY/MM/DD')} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 0, md: 1 } }}>
              <InputLabel>{t('End time')}</InputLabel>
              <TextBox text={moment(timeValues.endTime).format('LT')} />
            </Box>
          </HalfBox>
        </ListBox>
      )}

      <ListBox>
        <InputLabel>{t('description')}</InputLabel>
        <TextBox text={eventValues.description} />
      </ListBox>
    </>
  );
}
