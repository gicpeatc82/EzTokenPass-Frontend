import Image from 'next/image';
import LOGO from '../../../../public/image/logo_01.png';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material/';
import { myLoader } from '../../../utils/myLoader';
import { BiArrowBack } from 'react-icons/bi';

export default function MobileUserTopNavbar(): JSX.Element {
  return (
    <>
      <AppBar
        position="relative"
        sx={{
          zIndex: 997,
          boxShadow: 0,
          transition: 'background 0.3s',
          '&.MuiPaper-elevation0': {
            bgcolor: 'rgb(255 255 255 / 0%)',
          },
          background: `center / cover no-repeat url('/image/nav/nav-bottom.png')`,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            width: '100%',
            height: { xs: 60, md: 115, lg: 120 },
          }}
        >
          <IconButton
            sx={{ position: 'absolute', left: '5%', top: '50%', color: '#fff', transform: 'translateY(-50%)' }}
          >
            <BiArrowBack />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ width: { xs: '120px', md: '200px' }, p: 0, mr: { xs: 0, md: 0, lg: 2 } }}>
              <Image loader={myLoader} src={LOGO} alt="TokenPass" width="200" height="70" objectFit="contain" />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
