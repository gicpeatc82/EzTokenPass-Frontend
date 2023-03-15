import Nav from '../navbar/Nav';
import Meta from './Meta';
import styled from '@emotion/styled';
import { TFunction } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAlertBox } from '../../redux/reducers/alertBoxReducer';
import { selectLoading } from '../../redux/reducers/loadingReducer';
import ScrollTop from './ScrollTop';
import { Toolbar, Fab, Box } from '@mui/material/';
import AlertSnackbar from '../popupBox/AlertSnackbar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LoadingBox from '../popupBox/LoadingBox';
import Footer from './Footer';
import MobileBottomNavbar from '../mobile/MobileBottomNavbar';
import CssBaseline from '@mui/material/CssBaseline';

const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 100vh;
`;

interface PropsPage {
  children: JSX.Element[] | JSX.Element;
  t: TFunction;
}

const Layout = ({ t, children }: PropsPage) => {
  const isAlertBox = useSelector(selectAlertBox);
  const isLoading = useSelector(selectLoading);

  return (
    <>
      <CssBaseline />
      <AlertSnackbar isAlertBox={isAlertBox} />
      <LoadingBox open={isLoading} />
      <Meta />
      <Toolbar sx={{ height: 0, minHeight: '0 !important' }} id="back-to-top-anchor">
        <Nav />
      </Toolbar>
      <Container>
        <Box sx={{ mt: { xs: '60px', md: '115px', lg: '120px' } }} />
        {children}
      </Container>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <Box>
        <Box
          sx={{
            display: { xs: 'flex', md: 'none', lg: 'none' },
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 999,
          }}
        >
          <MobileBottomNavbar />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
