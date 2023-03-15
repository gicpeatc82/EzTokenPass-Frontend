import { Box } from '@mui/material';

export default function MyLeftTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderLeft: '8px solid #01e2a6',
        pl: 2,
        mb: 2,
        fontSize: { xs: 20, md: 24 },
        textAlign: 'left',
        '&::after': {
          content: "''",
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '86px',
          height: '4px',
          bgcolor: '#01e2a6',
          borderRadius: '50px',
          display: 'none',
        },
      }}
    >
      {title}
    </Box>
  );
}
