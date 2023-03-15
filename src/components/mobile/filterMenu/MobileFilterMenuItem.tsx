import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MobileUserTopNavbar from '../userMenu/MobileUserTopNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/reducers/userReducer';
import { MenuItem } from '@mui/material/';
import FilterListIcon from '@mui/icons-material/FilterList';
import Stack from '@mui/material/Stack';
import ChipGroup from '../../button/ChipGroup';
import SearchInput from '../../input/SearchInput';
import { FilterMenuItemAttr } from '../../navbar/FilterMenuItem';
import { TabValueText } from '../../../hooks/types';

export default function MobileFilterMenuItem({
  t,
  locationChip,
  selectedCountry,
  handleChangeSelectedCountry,
  selectedCity,
  handleChangeSelectedCity,
  locale,
}: FilterMenuItemAttr) {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  const FilterList = () => (
    <Box
      sx={{ width: '100vw' }}
      role="presentation"
      onClick={() => handleToggleDrawer(false)}
      onKeyDown={() => handleToggleDrawer(false)}
    >
      <MobileUserTopNavbar />
      <List>
        <ListItem onClick={(e) => e.stopPropagation()} sx={{ pl: 3 }}>
          <ListItemText primary={t('filter')} sx={{ textTransform: 'capitalize' }} />
        </ListItem>
      </List>
      <List>
        <ListItem onClick={(e) => e.stopPropagation()}>
          <ListItemText primary={t('by country')} sx={{ borderLeft: '6px solid #01e2a6', pl: 2 }} />
        </ListItem>
        <ListItem onClick={(e) => e.stopPropagation()} sx={{ p: '0 48px' }}>
          <Stack direction="row" spacing={1}>
            {allCountriesList ? (
              <ChipGroup
                dataList={allCountriesList}
                selectedValue={selectedCountry}
                handleChangeSelectedValue={handleChangeSelectedCountry}
              />
            ) : null}
          </Stack>
        </ListItem>
      </List>
      {allCitiesList && !countryIsNetwork ? (
        <List>
          <ListItem>
            <ListItemText primary={t('by city')} sx={{ borderLeft: '6px solid #01e2a6', pl: 2 }} />
          </ListItem>
          <ListItem onClick={(e) => e.stopPropagation()} sx={{ p: '0 16px 8px 48px' }}>
            <Stack direction="row" spacing={1}>
              <ChipGroup
                dataList={allCitiesList}
                selectedValue={selectedCity}
                handleChangeSelectedValue={handleChangeSelectedCity}
              />
            </Stack>
          </ListItem>
        </List>
      ) : null}
      <List>
        <ListItem>
          <ListItemText primary={t('by NFTs')} sx={{ borderLeft: '6px solid #01e2a6', pl: 2 }} />
        </ListItem>
        <ListItem onClick={(e) => e.stopPropagation()} sx={{ p: '0 16px 8px 48px' }}>
          <SearchInput />
        </ListItem>
      </List>
      <Box sx={{ pb: 4 }}></Box>
    </Box>
  );

  const { allCountriesList, handleGetAllCountriesList, allCitiesList } = locationChip;
  const countryIsNetwork = selectedCountry.toLocaleLowerCase() === TabValueText.network;

  useEffect(() => {
    if (selectedCountry) handleToggleDrawer(false);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) handleToggleDrawer(false);
  }, [selectedCity]);

  return (
    <>
      <BottomNavigationAction
        onClick={() => handleToggleDrawer(true)}
        icon={
          <MenuItem color="white" sx={{ fontSize: 'large' }}>
            <FilterListIcon />
            {t('filter')}
          </MenuItem>
        }
      />
      <SwipeableDrawer
        anchor={'right'}
        open={open}
        onClose={() => handleToggleDrawer(false)}
        onOpen={() => handleToggleDrawer(true)}
      >
        <FilterList />
      </SwipeableDrawer>
    </>
  );
}
