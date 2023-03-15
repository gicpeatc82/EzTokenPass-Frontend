import { Box } from '@mui/material';

export default function CoinTabLabel({ name, img }: { name: string; img: string }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: 28, mr: { xs: 0, md: 2 } }}>
        <img src={img} alt="" width="100%" />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}> {name}</Box>
    </Box>
  );
}
