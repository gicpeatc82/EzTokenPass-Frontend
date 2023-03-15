import type { NextPage } from 'next';
import Layout from '../src/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import BannerSlider from '../src/components/BannerSlider';
import { Box, Button, Card, Theme, Typography } from '@mui/material';
import ActionAreaCard from '../src/components/card/ActionAreaCard';
import Grid from '@mui/material/Unstable_Grid2';
import FilterMenuItem from '../src/components/navbar/FilterMenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileFilterMenuItem from '../src/components/mobile/filterMenu/MobileFilterMenuItem';
import React, { useEffect } from 'react';
import useGetEvents from '../src/hooks/useGetEvents';
import { useSelector } from 'react-redux';
import { selectLocale } from '../src/redux/reducers/userReducer';
import usePage from '../src/hooks/usePage';
import useGetLocation from '../src/hooks/useGetLocation';
import useSelectChip from '../src/hooks/useSelectChip';
import { ClickMoreEventsButtonAttr, GetEventDefaultAttr, TabValueText } from '../src/hooks/types';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const locale = useSelector(selectLocale);
  const getEvents = useGetEvents();
  const {
    eventList,
    handleGetAllEvents,
    handleGetEventsListByCountry,
    handleGetEventsListByCity,
    handleClickMoreEventsButton,
  } = getEvents;
  const pageState = usePage({ defaultLimit: 9 });
  const { page, handleChangePage, handleChangePageAddOnePage, limit, offset } = pageState;
  const locationChip = useGetLocation();
  const { handleGetAllCitiesByCountry } = locationChip;
  const { selectedValue: selectedCountry, handleChangeSelectedValue: handleChangeSelectedCountry } = useSelectChip();
  const {
    selectedValue: selectedCity,
    setSelectedValue: setSelectedCity,
    handleChangeSelectedValue: handleChangeSelectedCity,
  } = useSelectChip();

  useEffect(() => {
    handleGetAllEvents({ locale, offset, limit });
  }, []);

  const handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>, data: GetEventDefaultAttr) => {
    handleChangePage(event, 1);
    handleChangeSelectedCountry(event);
    setSelectedCity('');
    const value = event.target.value;
    const submitData = Object.assign(data, { country: value });

    handleGetEventsListByCountry(submitData);
    if (value && value.toLocaleLowerCase() !== TabValueText.network) {
      handleGetAllCitiesByCountry(value, locale);
    }
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>, data: GetEventDefaultAttr) => {
    handleChangePage(event, 1);
    handleChangeSelectedCity(event);
    const value = event.target.value;
    const submitData = Object.assign(data, { city: value });

    if (value) handleGetEventsListByCity(submitData);
  };

  const handleAddOnePage = (data: ClickMoreEventsButtonAttr) => {
    handleChangePageAddOnePage();
    handleClickMoreEventsButton(data);
  };

  return (
    <Layout t={t}>
      <BannerSlider />
      <Grid container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
        <Grid xs={2} md={2} lg={2} />
        <Grid xs={8} md={8} lg={8}>
          <Typography
            component="div"
            variant="h3"
            sx={{
              width: '100%',
              textAlign: 'center',
              mt: 3,
              mb: 2,
              fontSize: { xs: '1.25rem', md: '2rem', lg: '3rem' },
            }}
          >
            {t('Latest Events')}
          </Typography>
        </Grid>
        <Grid xs={2} md={2} lg={2} sx={{ display: 'flex', justifyContent: 'end' }}>
          {isMobile ? (
            <MobileFilterMenuItem
              t={t}
              locationChip={locationChip}
              selectedCountry={selectedCountry}
              handleChangeSelectedCountry={(e) => handleChangeCountry(e, { locale: locale, offset: 0, limit: limit })}
              selectedCity={selectedCity}
              handleChangeSelectedCity={(e) => handleChangeCity(e, { locale: locale, offset: 0, limit: limit })}
              locale={locale}
            />
          ) : (
            <FilterMenuItem
              t={t}
              locationChip={locationChip}
              selectedCountry={selectedCountry}
              handleChangeSelectedCountry={(e) => handleChangeCountry(e, { locale: locale, offset: 0, limit: limit })}
              selectedCity={selectedCity}
              handleChangeSelectedCity={(e) => handleChangeCity(e, { locale: locale, offset: 0, limit: limit })}
              locale={locale}
            />
          )}
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 4 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 3 }}
          maxWidth="lg"
          sx={{ margin: '0 auto', justifyContent: { xs: 'center', md: 'space-between' } }}
        >
          {eventList &&
            eventList.map((data, index) => (
              <Grid key={index} xs={12} md={4} lg={4} smOffset={0} mdOffset={0} sx={{ maxWidth: 380 }}>
                <ActionAreaCard data={data} />
              </Grid>
            ))}

          <Grid xs={12} sm={12} md={6} lg={12} smOffset={0} mdOffset={0} sx={{ maxWidth: 380 }}>
            <Card sx={{ maxWidth: 380, minWidth: 300 }} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '100%', textAlign: 'center', mt: 3, mb: 2 }}>
        <Button
          variant="contained"
          disableElevation
          onClick={() =>
            handleAddOnePage({
              eventList: eventList,
              defaultAttr: { locale: locale, offset: offset + limit, limit: limit },
              country: selectedCountry ? selectedCountry : '',
              city: selectedCity ? selectedCity : '',
            })
          }
          sx={{
            width: { xs: '90%', md: 390 },
            height: { xs: 'auto', md: 85 },
            color: '#fff',
            fontSize: '3rem',
            textTransform: 'capitalize',
          }}
        >
          {t('More')}
        </Button>
      </Box>
      <Box sx={{ mt: { xs: 70, md: 115, lg: 120 } }}></Box>
    </Layout>
  );
};

export default Home;
