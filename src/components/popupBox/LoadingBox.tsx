import { Backdrop, Box, Typography } from '@mui/material';

function LoadingBox({ open }: { open: boolean }) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={open}>
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
        <Typography variant="h3" color="#fff" fontStyle="italic" fontWeight="bold">
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default LoadingBox;
