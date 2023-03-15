import { Box, Divider, Typography } from '@mui/material';
import { TFunction } from 'react-i18next';
import MyMemberTitle from '../member/MyMemberTitle';
import { BsPatchCheck } from 'react-icons/bs';

function MyEventTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderLeft: '4px solid #01e2a6',
        pl: 2,
        mb: 2,
        fontSize: { xs: 16, md: 18 },
        textAlign: 'left',
      }}
    >
      {title}
    </Box>
  );
}

export default function SuccessTokenBox({
  t,
  joinEventSuccessData,
}: {
  t: TFunction;
  joinEventSuccessData: { eventId: string; eventName: string; tokenId: string | null };
}): JSX.Element {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#f9f9f9',
          borderRadius: '15px',
          flexDirection: 'column',
          pb: 4,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            bgcolor: '#fff',
            textTransform: 'capitalize',
            pt: 2,
          }}
        >
          <MyMemberTitle title={t('Already pass the events')} />
        </Box>

        <Box
          sx={{
            width: '100%',
            minWidth: 240,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            mt: { xs: 2, md: 4 },
            p: { xs: 2, md: 0 },
          }}
        >
          <Box sx={{ fontSize: { xs: 100, md: 140 }, color: '#01e2a6' }}>
            <BsPatchCheck />
          </Box>
          <Typography color="primary">Your TokenID: {joinEventSuccessData.tokenId}</Typography>
          <Box sx={{ pt: 2 }}>
            <MyEventTitle title={t('Event Name')} />
            <Typography sx={{ mb: 2, ml: 2 }}>{joinEventSuccessData.eventName}</Typography>
            <MyEventTitle title={t('Event ID')} />
            <Typography sx={{ mb: 4, ml: 2 }}>{joinEventSuccessData.eventId}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            bgcolor: '#fff',
            textTransform: 'capitalize',
            p: { xs: 2, md: 2 },
          }}
        >
          <Typography color="font.main">{t('Please show this screen to the employee.')}</Typography>
        </Box>
      </Box>
    </>
  );
}
