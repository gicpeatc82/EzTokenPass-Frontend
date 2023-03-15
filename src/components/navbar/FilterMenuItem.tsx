import React, { useEffect, useState } from 'react';
import { Box, Typography, Menu, MenuItem, Divider } from '@mui/material/';
import { TFunction, useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import Stack from '@mui/material/Stack';
import ChipGroup from '../button/ChipGroup';
import SearchInput from '../input/SearchInput';
import useSelectChip, { useSelectChipState } from '../../hooks/useSelectChip';
import { TabValueText, UseGetLocationState } from '../../hooks/types';
import useGetEvents from '../../hooks/useGetEvents';
import { LocaleState } from '../../api/types';

export interface FilterMenuItemAttr {
  t: TFunction;
  locationChip: UseGetLocationState;
  selectedCountry: useSelectChipState['selectedValue'];
  handleChangeSelectedCountry: useSelectChipState['handleChangeSelectedValue'];
  selectedCity: useSelectChipState['selectedValue'];
  handleChangeSelectedCity: useSelectChipState['handleChangeSelectedValue'];
  locale: LocaleState['locale'];
}

export const TitleBox = ({ name, children }: { name: string; children: JSX.Element }) => (
  <React.Fragment>
    <Box sx={{ padding: '12px 25px', color: '#333' }}>
      <Box sx={{ borderLeft: '6px solid #01e2a6', pl: 2 }}>
        <Typography variant="h5" textAlign="left">
          {name}
        </Typography>
      </Box>
      <Box sx={{ mt: 2, width: '100%', pl: 4, pt: 1, pb: 2 }}>{children}</Box>
    </Box>
    <Divider />
  </React.Fragment>
);

export default function FilterMenuItem({
  t,
  locationChip,
  selectedCountry,
  handleChangeSelectedCountry,
  selectedCity,
  handleChangeSelectedCity,
  locale,
}: FilterMenuItemAttr): JSX.Element {
  const { allCountriesList, handleGetAllCountriesList, allCitiesList } = locationChip;
  const countryIsNetwork = selectedCountry.toLocaleLowerCase() === TabValueText.network;
  const [open, setOpen] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (open !== event.currentTarget) {
      setOpen(event.currentTarget);
      handleGetAllCountriesList(locale);
    }
  };

  const handleCloseLangMenu = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (selectedCountry) handleCloseLangMenu();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) handleCloseLangMenu();
  }, [selectedCity]);

  return (
    <Box sx={{ flexGrow: 0, ml: 2 }}>
      <MenuItem color="white" onClick={handleOpen} sx={{ fontSize: 'large', pl: 4, pr: 4 }}>
        <FilterListIcon />
        {t('filter')}
      </MenuItem>

      <Menu
        id="filter-app-bar"
        anchorEl={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(open)}
        onClose={handleCloseLangMenu}
        sx={{
          marginTop: '20px',
          '& .MuiPaper-root': {
            maxWidth: '600px',
            bgcolor: '#fff',
            overflow: 'visible',
          },
          '& .MuiMenu-list': {
            borderRadius: '5px',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-16px',
            right: '15%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 10px 16px 10px',
            borderColor: 'transparent transparent #fff transparent',
            zIndex: 30,
          }}
        />

        <TitleBox name={t('by country')}>
          <Stack direction="row" spacing={1}>
            {allCountriesList ? (
              <ChipGroup
                dataList={allCountriesList}
                selectedValue={selectedCountry}
                handleChangeSelectedValue={handleChangeSelectedCountry}
              />
            ) : null}
          </Stack>
        </TitleBox>
        {allCitiesList && !countryIsNetwork ? (
          <TitleBox name={t('by city')}>
            <Stack direction="row" spacing={1}>
              <ChipGroup
                dataList={allCitiesList}
                selectedValue={selectedCity}
                handleChangeSelectedValue={handleChangeSelectedCity}
              />
            </Stack>
          </TitleBox>
        ) : null}

        <TitleBox name={t('by NFTs')}>
          <SearchInput />
        </TitleBox>
      </Menu>
    </Box>
  );
}
