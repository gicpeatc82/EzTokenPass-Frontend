import Link from 'next/link';
import Image from 'next/image';
import LOGO from '../../../public/image/footer/footer-logo.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { myLoader } from '../../utils/myLoader';

export default function Footer() {
  return (
    <Box sx={{ background: `center / cover no-repeat url('/image/nav/nav-bottom.png')`, pb: { xs: 7, md: 0 } }}>
      <Grid
        container
        sx={{
          pt: 3,
          pb: 3,
          color: 'white.main',
          mx: 'auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: { xs: 'center', md: 'space-around' },
          alignItems: 'center',
          maxWidth: 1280,
        }}
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
            <Link href="/">
              <Button>
                <Image loader={myLoader} src={LOGO} alt="TokenPass" width="54px" height="54px" objectFit="contain" />
              </Button>
            </Link>

            <Typography variant="body1" color="white" fontSize="18px" sx={{ whiteSpace: 'nowrap' }}>
              TokenPass (Taiwan) Bitape Co., Ltd.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            {[
              { name: 'Privacy', link: '/privacy' },
              { name: 'Terms', link: '/terms' },
            ].map((row) => (
              <Link href={row.link} key={row.link}>
                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: '#fff',
                    textTransform: 'capitalize',
                    fontSize: '24px',
                    ml: { xs: 0, md: 0, lg: 6 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                    <img src="/image/footer/footer-diamond.png" alt="" width="100%" />
                  </Box>
                  {row.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
