import { Backdrop, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function EventLoading() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%)',
        color: '#fff',
        '& span': { width: '50px !important', height: '50px !important' },
      }}
    >
      <CircularProgress />
    </Box>
  );
}

function LoadingCircleBox({ open }: { open: boolean }) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1000,
        '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
        '& .MuiPaper-root': { maxWidth: 800, m: { xs: 2, md: 4 }, borderRadius: '15px' },
        background: 'center / cover no-repeat url(/image/qrcode-bgcolor.png)',
      }}
      open={open}
    >
      <Box
        sx={{
          mb: { xs: 2, md: 4 },
          p: { xs: 2, md: 'auto' },
          maxWidth: { xs: '320px', md: 'fit-content' },
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <EventLoading />
      </Box>
    </Backdrop>
  );
}

export default LoadingCircleBox;
