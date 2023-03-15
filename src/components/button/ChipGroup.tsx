import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { useSelectChipState } from '../../hooks/useSelectChip';

const ChipGrey = ({ text }: { text: string }) => (
  <Chip
    label={text}
    variant="outlined"
    sx={{
      color: '#848484',
      bgcolor: '#f0f0f0',
      border: '0.5px solid #9198a0',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: { xs: '0.8rem', md: '1.05rem' },
      m: { xs: 0.5, md: 1 },
      ml: 0,
    }}
  />
);

const ChipPrimary = ({ text }: { text: string }) => (
  <Chip
    label={text}
    variant="filled"
    color="primary"
    sx={{
      color: '#fff',
      border: '0.5px solid #01e2a6',
      borderRadius: '5px',
      fontSize: { xs: '0.8rem', md: '1.05rem' },
      m: { xs: 0.5, md: 1 },
      ml: 0,
    }}
  />
);

export default function ChipGroup({
  dataList,
  selectedValue,
  handleChangeSelectedValue,
}: {
  dataList: { key: string; name: string }[] | null;
  selectedValue: useSelectChipState['selectedValue'];
  handleChangeSelectedValue: useSelectChipState['handleChangeSelectedValue'];
}) {
  return (
    <FormControl>
      <RadioGroup row aria-labelledby="filter-row-radio-buttons-group-label" name="row-radio-buttons-group">
        {dataList &&
          dataList.map((data) => (
            <FormControlLabel
              key={data.key}
              value={data.key}
              sx={{
                '& .MuiButtonBase-root': {
                  display: 'none',
                  visibilitçy: 'hidden',
                },
              }}
              control={<Radio onChange={handleChangeSelectedValue} />}
              label={
                selectedValue === String(data.key) ? <ChipPrimary text={data.name} /> : <ChipGrey text={data.name} />
              }
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}
