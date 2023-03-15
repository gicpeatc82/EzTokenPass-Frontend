import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BiScan } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { IoPersonSharp } from 'react-icons/io5';
import MobileUserMenuItem from './userMenu/MobileUserMenuItem';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/reducers/userReducer';

export default function MobileBottomNavbar() {
  const userInfo = useSelector(selectUserInfo);
  const router = useRouter();
  const [value, setValue] = useState(0);

  const handleSetValue = (event: any, newValue: number) => {
    if (newValue === 0) router.push('/');
    else if (newValue === 1) router.push('/scanning');
    else if (newValue === 2 && !userInfo) router.push('/signin');
    else if (newValue === 2 && userInfo) handleToggleDrawer(true);
  };

  const [open, setOpen] = useState<boolean>(false);

  const handleToggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  useEffect(() => {
    if (router.pathname === '/') {
      setValue(0);
    } else if (router.pathname === '/scanning') {
      setValue(1);
    } else if (router.pathname.includes('/member') || router.pathname === '/signin') {
      // 要加入判斷有沒有登入
      setValue(2);
    }
  }, [router.pathname]);

  return (
    <Box sx={{ width: '100%', zIndex: 999 }}>
      <BottomNavigation
        sx={{
          justifyContent: 'space-between',
          boxShadow: '0 0.2em 0.4em 0.2rem rgb(0 0 0 / 8%)',
          '& .Mui-selected': { borderTop: '2px solid #01e2a6' },
        }}
        showLabels
        value={value}
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
        <MobileUserMenuItem open={open} handleToggleDrawer={handleToggleDrawer} />
      </BottomNavigation>
    </Box>
  );
}
