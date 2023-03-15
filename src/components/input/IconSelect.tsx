import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, SvgIcon, FormHelperText } from '@mui/material';

export default function IconSelect({
  value,
  selectList,
  handleChange,
  icon,
  helperText,
  width,
}: {
  value: string;
  selectList: string[] | null;
  handleChange: (event: SelectChangeEvent | any) => void;
  icon: JSX.Element;
  helperText?: string;
  width?: string;
}) {
  return (
    <FormControl sx={{ width: width ? width : '100%' }}>
      <Select
        value={value ? value : ''}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        size="small"
        sx={{ bgcolor: '#f0f0f0' }}
        renderValue={() =>
          selectList &&
          selectList.map((list: any, index) => (
            <React.Fragment key={index}>
              {list.key === value && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <SvgIcon color="font">{icon}</SvgIcon>
                  {list.name}
                </Box>
              )}
            </React.Fragment>
          ))
        }
      >
        {selectList &&
          selectList.map((list: any, index) => (
            <MenuItem key={index} value={list.key}>
              {list.name}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{value ? '' : helperText}</FormHelperText>
    </FormControl>
  );
}
