import { Box } from '@mui/material';
import MyMemberTitle from './MyMemberTitle';
import { TFunction } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import ManageEventCard from '../card/ManageEventCard';
import AddCard from '../card/AddCard';
import CreateEventMainBox from '../popupBox/createEvent/CreateEventMainBox';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';
import { Card } from '@mui/material';

const MainContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => <>{children}</>;

function MyManageEvents({ t }: { t: TFunction<'translation', undefined> }) {
  const userMethod = useUser();
  const { userCreateEvents, handleGetUserCreateEvents, handleRemoveUserEvent } = userMethod;

  useEffect(() => {
    handleGetUserCreateEvents();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <MainContainer>
        <MyMemberTitle title={t('my manage events')} />
        <Grid
          container
          spacing={{ xs: 2, sm: 4, md: 4 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          maxWidth="lg"
          sx={{ margin: '0 auto', justifyContent: 'space-between' }}
        >
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={12}
            smOffset={0}
            mdOffset={0}
            sx={{ display: 'flex', justifyContent: 'center', maxWidth: 380 }}
          >
            <CreateEventMainBox t={t} buttonComponent={<AddCard text={t('create new event')} />} />
          </Grid>
          {userCreateEvents &&
            userCreateEvents.map((data, index) => (
              <Grid key={index} xs={12} sm={12} md={6} lg={12} smOffset={0} mdOffset={0} sx={{ maxWidth: 380 }}>
                <ManageEventCard data={data} handleRemoveUserEvent={handleRemoveUserEvent} />
              </Grid>
            ))}
          <Grid xs={12} sm={12} md={6} lg={12} smOffset={0} mdOffset={0} sx={{ maxWidth: 380 }}>
            <Card sx={{ bgcolor: '#333', maxWidth: 380, minWidth: 300 }} />
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={12} smOffset={0} mdOffset={0} sx={{ maxWidth: 380 }}>
            <Card sx={{ bgcolor: '#333', maxWidth: 380, minWidth: 300 }} />
          </Grid>
        </Grid>
      </MainContainer>
    </Box>
  );
}

export default MyManageEvents;
