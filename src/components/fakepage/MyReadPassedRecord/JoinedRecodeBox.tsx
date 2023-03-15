import * as React from 'react';
import { useRef } from 'react';
import moment from 'moment';
import { Button, Box, IconButton, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TFunction } from 'react-i18next';
import MyLeftTitle from '../../member/MyLeftTitle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CloseIcon from '@mui/icons-material/Close';
import SuccessTokenBox from '../../token/SuccessTokenBox';
import { UserJoinedEvent, UserJoinedEventHistory } from '../../../hooks/types';
import useOpen from '../../../hooks/useOpen';

function ListBox({ t, history }: { t: TFunction; history: UserJoinedEventHistory }) {
  const joinEventSuccessData = { eventId: history.eventId, eventName: history.eventName, tokenId: history.nftTokenId };
  const { open, handleClickOpen, handleClose } = useOpen();
  return (
    <>
      {open ? <SuccessTokenBox t={t} joinEventSuccessData={joinEventSuccessData} /> : null}
      {open ? (
        <Button variant="contained" fullWidth sx={{ mb: 2, boxShadow: 'none' }} onClick={handleClose}>
          <CloseIcon /> {t('close')}
        </Button>
      ) : (
        <Box
          onClick={handleClickOpen}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#ffffff',
            borderRadius: '5px',
            p: 2,
            mb: 2,
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            border: '3px solid #ffffff',
            transition: 'border-color 250ms',
            '&:hover': {
              border: '3px solid #01E2A6',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row', justifyContent: 'space-between', width: '70%' },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 20,
                  mr: 1,
                }}
              >
                <img src="/image/icon/event-calendar-with-star-green.png" alt="" width="100%" />
              </Box>
              <Typography>{moment(history.time).format('YYYY/MM/DD LT')}</Typography>
            </Box>
            <Box sx={{ width: '33%', display: 'flex', flexDirection: 'row' }}>
              <Typography>{`tokenID:${history.nftTokenId}`}</Typography>
            </Box>
          </Box>
          <ArrowCircleRightIcon color="primary" />
        </Box>
      )}
    </>
  );
}

export default function JoinedRecodeBox({
  t,
  buttonComponent,
  historyList,
}: {
  t: TFunction;
  buttonComponent: JSX.Element;
  historyList: UserJoinedEvent['history'];
}) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const { open, handleClickOpen, handleClose } = useOpen();
  const myRef = useRef<any>(null);

  return (
    <>
      <Box sx={{ width: '100%' }} onClick={handleClickOpen}>
        {buttonComponent}
      </Box>
      <Dialog open={open} onClose={handleClose} fullScreen={isMobile} sx={{ '& .MuiPaper-root': { maxWidth: 800 } }}>
        <DialogTitle component="div">
          <div ref={myRef} />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <MyLeftTitle title={t('joined record detail')} />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 20,
                  mr: 1,
                }}
              >
                <img src="/image/icon/event-calendar-with-star-green.png" alt="" width="100%" />
              </Box>
              <Typography>{t('time used')}</Typography>
            </Box>
            <Typography sx={{ width: '50%' }}>{t('TokenID')}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ minHeight: '50vh', minWidth: { xs: '90%', md: 800 }, bgcolor: '#F0F0F0' }}>
          <Box sx={{ mb: 2 }} />
          {historyList && historyList.map((history) => <ListBox key={history.time} t={t} history={history} />)}
        </DialogContent>
      </Dialog>
    </>
  );
}
