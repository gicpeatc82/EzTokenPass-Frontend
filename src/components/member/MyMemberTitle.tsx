import { Box } from '@mui/material';

function MyMemberTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderLeft: { xs: 0, md: '8px solid #01e2a6' },
        pl: { xs: 0, md: 2 },
        mb: { xs: 3, md: 2 },
        fontSize: { xs: 18, md: 24 },
        textAlign: { xs: 'center', md: 'left' },
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
          display: { xs: 'flex', md: 'none' },
        },
      }}
    >
      {title}
    </Box>
  );
}

export default MyMemberTitle;
