import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { selectList } from './filterData';
import { UseTimeFilterState } from './useTimeFilter';
import { TFunction } from 'react-i18next';

export default function TimeFilter({
  t,
  select,
  handleChange,
}: {
  t: TFunction;
  select: UseTimeFilterState['selectTime'];
  handleChange: UseTimeFilterState['handleChangeSelectTime'];
}) {
  return (
    <Box sx={{ minWidth: 176 }}>
      <FormControl fullWidth>
        <Select
          labelId="select-select"
          id="demo-simple-select"
          value={select}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange}
          size="small"
          sx={{ bgcolor: '#fff' }}
        >
          {selectList.map((data) => (
            <MenuItem key={data.value} value={data.value}>
              {t(data.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
