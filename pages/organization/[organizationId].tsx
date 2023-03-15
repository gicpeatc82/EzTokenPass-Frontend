import type { NextPage } from 'next';
import Layout from '../../src/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MyMemberTitle from '../../src/components/member/MyMemberTitle';
import StoreIcon from '@mui/icons-material/Store';
import ActionSimpleCard from '../../src/components/card/ActionSimpleCard';
import Link from 'next/link';

function NoEventsBox({ text }: { text: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
      <img src={'/image/icon/date-big.png'} alt="" />
      <Typography variant="h6" color="font.main" sx={{ mt: 2 }}>
        {text}
      </Typography>
    </Box>
  );
}

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout t={t}>
      <Box sx={{ bgcolor: '#fff', p: { xs: 2, md: 4 } }}>
        <Grid container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
          <Grid xs={12} sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                m: { xs: 0, md: 2 },
              }}
            >
              <Avatar src={''} sx={{ width: 98, height: 98, mr: { xs: 2, md: 4 } }}>
                <StoreIcon fontSize="large" />
              </Avatar>
              <Typography
                component="div"
                variant="h3"
                sx={{ fontSize: { xs: '1.25rem', md: '1.4rem', lg: '2rem' }, mt: { xs: 2, md: 0 } }}
              >
                International Olympic Committee
              </Typography>
            </Box>
          </Grid>
          <Divider />
          <Grid xs={12}>
            <MyMemberTitle title={t('about')} />
          </Grid>
          <Grid xs={12} md={10}>
            <Typography
              component="div"
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, ml: { xs: 0, md: 3 } }}
            >
              A spoken or written representation or account of a person, object, or event.a spoken or written
              representation or account of a person, object, or event.a spoken or written representation or account of a
              person, object, or event.a spoken or written representation or account of a person, object, or event.a
              spoken or written representation or account of a person, object, or event. A spoken or written
              representation or account of a person, object, or event.a spoken or written representation or account of a
              person
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
          <Grid xs={12} sx={{ mt: 4, mb: 4, minHeight: '100vh' }}>
            <MyMemberTitle title={t('event')} />

            <NoEventsBox text={t('there are currently no events')} />

            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 4, md: 6 }}
                columns={{ xs: 12, sm: 8, md: 3, lg: 3 }}
                maxWidth="lg"
                sx={{ margin: '0 auto', justifyContent: 'space-between' }}
              >
                {/* {Array.from(Array(6)).map((_, index) => (
                  <Grid key={index} xs={12} md={4} lg={6} smOffset={2} mdOffset={0} sx={{ maxWidth: 380 }}>
                    <Link href={'/events/1'}>
                      <Box>
                        <ActionSimpleCard t={t} />
                      </Box>
                    </Link>
                  </Grid>
                ))} */}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
