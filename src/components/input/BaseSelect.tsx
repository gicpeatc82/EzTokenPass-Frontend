import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function BaseSelect({
  value,
  selectList,
  handleChange,
  helperText,
  width,
  ariaLabel,
}: {
  value: string;
  selectList: any[];
  handleChange: (event: SelectChangeEvent | any) => void;
  helperText: string;
  width?: string;
  ariaLabel?: string;
}) {
  return (
    <FormControl sx={{ width: width ? width : '100%' }}>
      <Select
        value={value ? value : ''}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': ariaLabel || 'Without label' }}
        size="small"
        sx={{ bgcolor: '#f0f0f0' }}
      >
        {selectList &&
          selectList.map((list, index) => (
            <MenuItem key={index} value={list.value}>
              {list.name}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{value ? '' : helperText}</FormHelperText>
    </FormControl>
  );
}
