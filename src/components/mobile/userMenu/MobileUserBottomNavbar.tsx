import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BiScan } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { IoPersonSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';

export default function MobileUserBottomNavbar() {
  const router = useRouter();
  // const [value, setValue] = React.useState(2);

  const handleSetValue = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) router.push('/');
    if (newValue === 1) router.push('/scanning');
  };

  return (
    <Box sx={{ width: '100%', zIndex: 999 }}>
      <BottomNavigation
        sx={{
          justifyContent: 'space-between',
          boxShadow: '0 0.2em 0.4em 0.2rem rgb(0 0 0 / 8%)',
          '& .Mui-selected': { borderTop: '2px solid #01e2a6' },
        }}
        showLabels
        value={2}
        onChange={(event, newValue) => handleSetValue(event, newValue)}
      >
        <BottomNavigationAction
          icon={
            <Box sx={{ fontSize: 24 }}>
              <HiHome />
            </Box>
          }
        />
        <BottomNavigationAction
          icon={
            <Box sx={{ fontSize: 24 }}>
              <BiScan />
            </Box>
          }
        />
        <BottomNavigationAction
          icon={
            <Box sx={{ fontSize: 24 }}>
              <IoPersonSharp />
            </Box>
          }
        />
      </BottomNavigation>
    </Box>
  );
}
