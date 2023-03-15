import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Avatar, Typography } from '@mui/material/';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/reducers/userReducer';
import { getMyAuthToken } from '../../utils/localStorage';

const MemberLayout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (!userInfo) {
      const token = getMyAuthToken();
      if (!token) router.push('/');
    }
  }, [userInfo]);

  return (
    <>
      {userInfo ? (
        <>
          <Box
            sx={{
              display: ' flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              bgcolor: '#fff',
              pt: 3,
              pb: 3,
            }}
          >
            <Avatar src={userInfo.photoURL} sx={{ width: { xs: 64, md: 96 }, height: { xs: 64, md: 96 } }} />
            <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 48 } }}>
              {userInfo.displayName}
            </Typography>
            <Typography variant="h5" color="#a3a3a3" sx={{ fontSize: { xs: 16, md: 24 } }}>
              {userInfo.email}
            </Typography>
          </Box>
          {children}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MemberLayout;
