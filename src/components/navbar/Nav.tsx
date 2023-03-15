import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/';
import { selectUserInfo, handleCheckIsLogin } from '../../redux/reducers/userReducer';
import { Box, Button, AppBar, Toolbar, MenuItem, useScrollTrigger } from '@mui/material/';
import LOGO from '../../../public/image/logo_01.png';
import LangChangItem from './LangChangItem';
import { myLoader } from '../../utils/myLoader';
import UserMenuItem from './UserMenuItem';
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children as React.ReactElement<any>, {
    elevation: trigger ? 4 : 0,
  });
}

const NavItem = ({ pathLink, name }: { pathLink: string; name: string }) => {
  const NavMenuItem = styled(MenuItem)(() => ({
    paddingLeft: 24,
    paddingRight: 24,
    textTransform: 'capitalize',
    fontSize: '24px',
    color: '#fff',
  }));

  return (
    <Link href={`/${pathLink}`}>
      <a>
        <NavMenuItem>{name}</NavMenuItem>
      </a>
    </Link>
  );
};

const NavAppBar = styled(AppBar)(() => ({
  zIndex: 997,
  boxShadow: 'none',
  transition: 'background 0.3s',
  '&.MuiPaper-elevation0': {
    bgcolor: 'rgb(255 255 255 / 0%)',
  },
  background: `center / cover no-repeat url('/image/nav/nav-bottom.png')`,
}));

const NavStyle = () => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: {
      xs: 'center',
      md: 'space-between',
      lg: 'space-between',
    },
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    height: { xs: 60, md: 115, lg: 120 },
  },
  boxLeft: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  button: { width: { xs: '120px', md: '200px' }, p: 0, mr: { xs: 0, md: 0, lg: 2 } },
  navItemsBox: { display: { xs: 'none', md: 'flex', lg: 'flex', flexDirection: 'row' } },
  boxRight: {
    display: { xs: 'none', md: 'flex', lg: 'flex' },
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
});

export default function Nav(props: Props): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const classes = NavStyle();

  useEffect(() => {
    if (!userInfo) dispatch(handleCheckIsLogin(router));
  }, [userInfo]);

  return (
    <>
      <ElevationScroll {...props}>
        <NavAppBar position="fixed">
          <Toolbar sx={classes.toolbar}>
            <Box sx={classes.boxLeft}>
              <Button sx={classes.button}>
                <Link href="/">
                  <a>
                    <Image loader={myLoader} src={LOGO} alt="TokenPass" width="200" height="70" objectFit="contain" />
                  </a>
                </Link>
              </Button>

              {/* <Box sx={classes.navItemsBox}>
                <NavItem pathLink={'host'} name={t('Host')} />
              </Box> */}
            </Box>
            <Box sx={classes.boxRight}>
              <LangChangItem />

              {userInfo ? (
                <UserMenuItem photoURL={userInfo.photoURL} />
              ) : (
                <NavItem pathLink={'signin'} name={t('Sign in')} />
              )}
            </Box>
          </Toolbar>
        </NavAppBar>
      </ElevationScroll>
    </>
  );
}
