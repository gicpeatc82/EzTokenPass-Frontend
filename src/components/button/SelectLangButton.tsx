import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TFunction } from 'react-i18next';
import { Button, Typography } from '@mui/material';

export default function SelectLangButton({ t }: { t: TFunction<'translation', undefined> }) {
  const langList = ['english', 'japan', 'traditional Chinese'];
  const [lang, setLang] = React.useState(langList[0]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box sx={{ minWidth: 176, mr: 1 }}>
            <FormControl fullWidth>
              <Select
                labelId="select-lang"
                id="demo-simple-select"
                value={lang}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleChange}
                size="small"
              >
                {langList.map((data) => (
                  <MenuItem key={data} value={data}>
                    {t(data)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" onClick={handleClose}>
            {t('submit')}
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant="body1">{t(lang)}</Typography>

          <Button onClick={handleOpen}>{t('edit')}</Button>
        </Box>
      )}
    </>
  );
}
