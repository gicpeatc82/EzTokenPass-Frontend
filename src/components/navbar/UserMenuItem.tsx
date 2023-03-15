import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material/';
import { userMenuData } from '../../data/navData';
import { useTranslation } from 'react-i18next';
import { handleLogOut } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';

export default function UserMenuItem({ photoURL }: { photoURL: string }): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (open !== event.currentTarget) {
      setOpen(event.currentTarget);
    }
  };

  const handleCloseLangMenu = () => {
    setOpen(null);
  };

  return (
    <Box sx={{ flexGrow: 0, ml: 2 }}>
      <MenuItem color="white" onClick={handleOpen} sx={{ fontSize: 'large', pl: 4, pr: 4 }}>
        <Avatar src={photoURL} sx={{ width: 50, height: 50 }} />
      </MenuItem>
      <Menu
        id="lang-app-bar"
        anchorEl={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(open)}
        onClose={handleCloseLangMenu}
        sx={{
          mt: '45px',
          marginTop: '20px',
          '& .MuiPaper-root': {
            bgcolor: '#fff',
            overflow: 'visible',
          },
          '& .MuiMenu-list': {
            borderRadius: '5px',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 10px 16px 10px',
            borderColor: 'transparent transparent #fff transparent',
            zIndex: 30,
          }}
        />
        {userMenuData &&
          userMenuData.map((data) => (
            <Link key={data.name} href={data.link}>
              <a>
                <MenuItem sx={{ padding: '12px 25px', color: '#333' }}>
                  <Typography textAlign="center" id={data.name}>
                    {data.name}
                  </Typography>
                </MenuItem>
              </a>
            </Link>
          ))}
        <Divider />

        <MenuItem sx={{ padding: '12px 25px', color: '#333' }} onClick={() => dispatch(handleLogOut())}>
          <Typography textAlign="center">{t('Sign out')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
