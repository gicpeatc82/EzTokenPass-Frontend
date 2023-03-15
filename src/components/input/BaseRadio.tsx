import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function BaseRadio({
  radioList,
  radioValue,
  handleChangeRadio,
}: {
  radioList: any[];
  radioValue: string;
  handleChangeRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormControl>
      <RadioGroup row name="controlled-radio-buttons-group" value={radioValue} onChange={handleChangeRadio}>
        {radioList &&
          radioList.map((radio, index) => (
            <FormControlLabel
              sx={{
                mt: 1,
                '& .MuiSvgIcon-root': {
                  fontSize: 0,
                },
                '& .MuiFormControlLabel-label': {
                  bgcolor: '#F0F0F0',
                  borderRadius: '5px',
                  p: '8px 24px',
                },
                '.Mui-checked + .MuiFormControlLabel-label': {
                  bgcolor: '#01e2a6',
                  borderRadius: '5px',
                  color: '#fff',
                },
              }}
              key={index}
              value={radio.value}
              control={<Radio />}
              label={radio.label}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}
