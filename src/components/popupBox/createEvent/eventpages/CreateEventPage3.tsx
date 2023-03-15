import { useEffect, useState } from 'react';
import { Box, Divider, InputLabel, Typography } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseEventState, UseCreateEventTabState, UseDateTimeState, UserEventInfo } from '../../../../hooks/types';
import BaseInput from '../../../input/BaseInput';
import IconSelect from '../../../input/IconSelect';
import useGetLocation from '../../../../hooks/useGetLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DateRangeSelect from '../../../datetime/DateRangeSelect';
import TimeRangeSelect from '../../../datetime/TimeRangeSelect';
import BaseDatePicker from '../../../datetime/BaseDatePicker';
import BaseTimePicker from '../../../datetime/BaseTimePicker';
import EventPlaceTab from '../../../tabs/EventPlaceTab';
import EventTimeTab from '../../../tabs/EventTimeTab';
import { useSelector } from 'react-redux';
import { selectLocale } from '../../../../redux/reducers/userReducer';
import { TabValue, TabValueText } from '../../../../hooks/types';

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

function TimeZoomBox({
  t,
  createEvent,
  timeZoomList,
}: {
  t: TFunction;
  createEvent: UseEventState;
  timeZoomList: [] | null;
}) {
  const { eventValues, handleChangeEventValues } = createEvent;
  return (
    <HalfBox>
      <Box sx={{ width: { xs: '100%', md: '50%' }, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}>
        <InputLabel>*{t('Time zoom')}</InputLabel>
        <IconSelect
          value={eventValues.gmt}
          handleChange={handleChangeEventValues('gmt')}
          selectList={timeZoomList}
          icon={<Box sx={{ width: 22, height: 22 }} />}
        />
      </Box>
      <div style={{ width: '50%', marginLeft: '8px' }}></div>
    </HalfBox>
  );
}

function EventTimeBox({
  t,
  createEvent,
  createDateTime,
  timeZoomList,
  page3Tab,
}: {
  t: TFunction;
  createEvent: UseEventState;
  createDateTime: UseDateTimeState;
  timeZoomList?: [] | null;
  page3Tab: UseCreateEventTabState;
}) {
  return (
    <>
      <Typography sx={{ mb: 2, fontSize: 18 }}>{t('Event time')}</Typography>
      <EventTimeTab
        t={t}
        tableTitle={tableTitleDuring}
        page3Tab={page3Tab}
        createDateTime={createDateTime}
        tab1={
          <>
            {timeZoomList && (
              <ListBox>
                <TimeZoomBox t={t} createEvent={createEvent} timeZoomList={timeZoomList} />
              </ListBox>
            )}
            <ListBox>
              <HalfBox>
                <Box sx={{ width: { xs: '100%', md: '50%' }, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}>
                  <DateRangeSelect t={t} createDateTime={createDateTime} />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 0, md: 1 } }}>
                  <TimeRangeSelect t={t} createDateTime={createDateTime} />
                </Box>
              </HalfBox>
            </ListBox>
          </>
        }
        tab2={
          <>
            {timeZoomList && (
              <ListBox>
                <TimeZoomBox t={t} createEvent={createEvent} timeZoomList={timeZoomList} />
              </ListBox>
            )}
            <ListBox>
              <HalfBox>
                <Box sx={{ width: { xs: '100%', md: '50%' }, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}>
                  <BaseDatePicker t={t} createDateTime={createDateTime} />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 0, md: 1 } }}>
                  <BaseTimePicker t={t} createDateTime={createDateTime} />
                </Box>
              </HalfBox>
            </ListBox>
          </>
        }
      />
    </>
  );
}

const tableTitlePlace = [
  { value: TabValueText.network, name: 'Network Event' },
  { value: TabValueText.physical, name: 'Physical Event' },
];

const tableTitleDuring = [
  { value: TabValueText.single, name: 'Single Event' },
  { value: TabValueText.recurring, name: 'Recurring Event' },
];

export default function CreateEventPage3({
  t,
  createEvent,
  createDateTime,
  page3Tab,
}: {
  t: TFunction;
  createEvent: UseEventState;
  createDateTime: UseDateTimeState;
  page3Tab: UseCreateEventTabState;
  data?: UserEventInfo;
}) {
  const { eventValues, handleChangeEventValues } = createEvent;
  const locationData = useGetLocation();
  const {
    allCountriesList,
    handleGetAllCountriesList,

    allCitiesList,
    handleGetAllCitiesByCountry,

    timeZoomList,
    handleGetTimeZoom,
  } = locationData;
  const locale = useSelector(selectLocale);

  useEffect(() => {
    handleGetAllCountriesList(locale);
    handleGetTimeZoom(locale);
    // handleGetAllCitiesByCountry('taiwan');
  }, [locale]);

  useEffect(() => {
    if (eventValues.country) handleGetAllCitiesByCountry(eventValues.country, locale);
  }, [eventValues.country, locale]);

  return (
    <>
      <Typography sx={{ mb: 2, fontSize: 18 }}>{t('Event Location')}</Typography>
      <EventPlaceTab
        t={t}
        tableTitle={tableTitlePlace}
        page3Tab={page3Tab}
        tab1={
          <>
            <Divider sx={{ pt: 2, mb: 2 }} />
            <EventTimeBox
              t={t}
              createEvent={createEvent}
              createDateTime={createDateTime}
              timeZoomList={timeZoomList}
              page3Tab={page3Tab}
            />
          </>
        }
        tab2={
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
                  <InputLabel>*{t('Country')}</InputLabel>
                  <IconSelect
                    value={eventValues.country ? eventValues.country : ''}
                    handleChange={handleChangeEventValues('country')}
                    selectList={
                      allCountriesList &&
                      allCountriesList.filter((data: { key: string; name: string }) => data.key !== 'Network')
                    }
                    helperText={t('please select one')}
                    icon={<LocationOnIcon />}
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 0, md: 1 } }}>
                  <InputLabel>*{t('City')}</InputLabel>
                  <IconSelect
                    value={eventValues.city ? eventValues.city : ''}
                    handleChange={handleChangeEventValues('city')}
                    selectList={allCitiesList}
                    helperText={t('please select one')}
                    icon={<LocationCityIcon />}
                  />
                </Box>
              </Box>
            </ListBox>
            <ListBox>
              <InputLabel>*{t('Address')}</InputLabel>
              <BaseInput
                name={'address'}
                value={eventValues.address}
                handleChange={handleChangeEventValues('address')}
                autocomplete={'off'}
                helperText={t('please fill out this filed.')}
              />
            </ListBox>
            <Divider sx={{ pt: 2, mb: 2 }} />
            <EventTimeBox t={t} createEvent={createEvent} createDateTime={createDateTime} page3Tab={page3Tab} />
          </>
        }
      />
    </>
  );
}
