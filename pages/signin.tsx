import type { NextPage } from 'next';
import Layout from '../src/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import SignTab from '../src/components/tabs/SignTab';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../src/redux/reducers/userReducer';

const SignInPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo) router.push('/');
  }, [userInfo]);

  return (
    <Layout t={t}>
      <Grid container maxWidth="lg" sx={{ margin: '0 auto', justifyContent: 'space-between', bgcolor: '#fff' }}>
        <SignTab t={t} />
      </Grid>
    </Layout>
  );
};

export default SignInPage;
