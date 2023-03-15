import { Box } from '@mui/material';
import MyMemberTitle from './MyMemberTitle';
import { TFunction } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import OrganizationCard from '../card/OrganizationCard';
import AddCard from '../card/AddCard';

const MainContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => <>{children}</>;

function MyOrganization({ t }: { t: TFunction<'translation', undefined> }) {
  return (
    <Box sx={{ mt: 2 }}>
      <MainContainer>
        <MyMemberTitle title={t('my organization')} />
        <Grid
          container
          spacing={{ xs: 2, sm: 4, md: 6 }}
          columns={{ xs: 12, sm: 8, md: 12, lg: 12 }}
          maxWidth="lg"
          sx={{ margin: '0 auto', justifyContent: 'space-between' }}
        >
          <Grid xs={12} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <AddCard text={t('add organization')} />
          </Grid>
          {Array.from(Array(12)).map((_, index) => (
            <Grid key={index} xs={12} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <OrganizationCard t={t} />
            </Grid>
          ))}

          {Array.from(Array(3)).map((_, index) => (
            <Grid key={index} xs={4} md={4} lg={3} sx={{ maxWidth: 280 }}>
              <Box sx={{ width: { xs: 70, sm: 120, md: 185 }, height: { xs: 70, sm: 120, md: 185 } }} />
            </Grid>
          ))}
        </Grid>
      </MainContainer>
    </Box>
  );
}

export default MyOrganization;
