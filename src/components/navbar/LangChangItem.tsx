import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Typography, Menu, MenuItem } from '@mui/material/';
import { langData } from '../../data/navData';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocale, handleChangeLang } from '../../redux/reducers/userReducer';
import Cookies from 'js-cookie';

export default function LangChangItem(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const locale = useSelector(selectLocale);
  const [openLang, setOpenLang] = useState<null | HTMLElement>(null);

  const handleOpenLang = (event: React.MouseEvent<HTMLElement>) => {
    if (openLang !== event.currentTarget) {
      setOpenLang(event.currentTarget);
    }
  };

  const handleCloseLangMenu = () => {
    setOpenLang(null);
  };

  const handleChangeLangMenu = (locale: string) => {
    setOpenLang(null);
    dispatch(handleChangeLang(locale));
    window.location.reload();
  };

  useEffect(() => {
    if (locale !== 'en') i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    const cookiesLocale = Cookies.get('locale');
    if (cookiesLocale) dispatch(handleChangeLang(cookiesLocale));
  }, []);

  return (
    <Box sx={{ flexGrow: 0, ml: 2 }}>
      <MenuItem color="white" onClick={handleOpenLang} sx={{ fontSize: 'large', pl: 4, pr: 4 }}>
        <Box sx={{ width: { xs: 25, md: 35, lg: 50 } }}>
          <img src="/image/nav/nav-lang.png" alt="lang" width="100%" />
        </Box>
      </MenuItem>
      <Menu
        id="lang-app-bar"
        anchorEl={openLang}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(openLang)}
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
        {langData &&
          langData.map((lang) => (
            <Link key={lang.name} href={router.pathname}>
              <MenuItem sx={{ padding: '12px 25px', color: '#333' }} onClick={() => handleChangeLangMenu(lang.locale)}>
                <Typography textAlign="center" id={lang.language}>
                  {lang.name}
                </Typography>
              </MenuItem>
            </Link>
          ))}
      </Menu>
    </Box>
  );
}
