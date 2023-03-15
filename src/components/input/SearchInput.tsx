import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
  const [searchValue, setSearchValue] = React.useState('');

  const handleChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <Box component="form" noValidate>
      <FormControl sx={{ width: { xs: '100%', md: '50ch' }, position: 'relative', bgcolor: '#f0f0f0' }}>
        <Box sx={{ position: 'absolute', top: '55%', left: '3%', transform: 'translateY(-50%)', color: '#848484' }}>
          <SearchIcon />
        </Box>
        <OutlinedInput
          type={'text'}
          size="small"
          value={searchValue}
          onChange={handleChangeSearchValue}
          sx={{ pl: 4 }}
        />
      </FormControl>
    </Box>
  );
}
