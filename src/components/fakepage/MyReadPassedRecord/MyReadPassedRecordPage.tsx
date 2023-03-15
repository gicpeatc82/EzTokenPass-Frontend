import * as React from 'react';
import { useEffect } from 'react';
import { TFunction } from 'react-i18next';
import { Box, Button, Typography, IconButton, Card } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ActionSimpleCard from '../../card/ActionSimpleCard';
import Grid from '@mui/material/Unstable_Grid2';
import { BiArrowBack } from 'react-icons/bi';
import { UseUserState } from '../../../hooks/types';
import useTimeFilter from '../../filter/useTimeFilter';
import TimeFilter from '../../filter/TimeFilter';

function TopBox({
  t,
  handleClose,
  handleGetUserJoinedEvents,
}: {
  t: TFunction<'translation', undefined>;
  handleClose: () => void;
  handleGetUserJoinedEvents: UseUserState['handleGetUserJoinedEvents'];
}) {
  const { selectTime, handleChangeSelectTime } = useTimeFilter();

  useEffect(() => {
    if (selectTime) handleGetUserJoinedEvents(selectTime);
  }, [selectTime]);

  return (
    <>
      <IconButton
        onClick={handleClose}
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          zIndex: 998,
          left: '5%',
          top: '5%',
          color: '#fff',
          transform: 'translateY(-50%)',
        }}
      >
        <BiArrowBack />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={handleClose} color="font" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <ArrowBackIosNewIcon />
          {t('back')}
        </Button>
        <MyRecordTitle title={t('my read passed record')} />
        <TimeFilter t={t} select={selectTime} handleChange={handleChangeSelectTime} />
      </Box>
    </>
  );
}

export function MyRecordTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        position: 'relative',
        pl: 0,
        mb: { xs: 3, md: 0 },
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
        },
      }}
    >
      {title}
    </Box>
  );
}

export default function MyReadPassedRecordPage({
  t,
  open,
  handleClose,
  data,
  handleGetUserJoinedEvents,
}: {
  t: TFunction<'translation', undefined>;
  open: boolean;
  handleClose: () => void;
  data: UseUserState['userJoinedEvents'];
  handleGetUserJoinedEvents: UseUserState['handleGetUserJoinedEvents'];
}) {
  return (
    <>
      {open ? (
        <>
          <TopBox t={t} handleClose={handleClose} handleGetUserJoinedEvents={handleGetUserJoinedEvents} />
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, sm: 4, md: 4 }}
              columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              maxWidth="lg"
              sx={{ margin: '0 auto', justifyContent: 'space-between' }}
            >
              {data &&
                data.map((row, index) => (
                  <Grid
                    key={row.eventId}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={12}
                    smOffset={0}
                    mdOffset={0}
                    sx={{ maxWidth: 380 }}
                  >
                    <ActionSimpleCard data={row} t={t} />
                  </Grid>
                ))}
              <Grid xs={12} sm={12} md={6} lg={12} smOffset={0} mdOffset={0} sx={{ maxWidth: 380 }}>
                <Card sx={{ maxWidth: 380, minWidth: 300 }} />
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={12} smOffset={0} mdOffset={0} sx={{ maxWidth: 380 }}>
                <Card sx={{ maxWidth: 380, minWidth: 300 }} />
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Typography component="div" variant="body1" textAlign="center" sx={{ width: '100%', pt: '6px', pb: '6px' }}>
          {t('read passed record')}
        </Typography>
      )}
    </>
  );
}
