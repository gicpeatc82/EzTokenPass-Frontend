import { TFunction } from 'react-i18next';
import { Button, Box, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import moment from 'moment';
import useOpen from '../../../../hooks/useOpen';
import { UseDateTimeState } from '../../../../hooks/types';
import SquareImgBox from '../../../imgBox/SquareImgBox';
import QrCodeItem from '../../../qrcode/QrCodeItem';

function ListBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <Box
      sx={{
        pl: { xs: 2, md: 0 },
        mb: { xs: 1, md: 2 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      {children}
    </Box>
  );
}

function EventButton({ text, imgSrc }: { text: string; imgSrc: string }) {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{ minWidth: 249, display: 'flex', justifyContent: 'start', pl: { xs: 4, md: 2 } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, width: 30, height: 30 }}>
        <img src={imgSrc} alt="" />
      </Box>
      {text}
    </Button>
  );
}

export default function CreateEventQrCode({
  t,
  buttonText,
  data,
  qrcodeUrl,
  createDateTime,
}: {
  t: TFunction<'translation', undefined>;
  buttonText: string;
  data: {
    eventName: string | null;
    country?: string | null;
    city?: string | null;
    address?: string | null;
  };
  qrcodeUrl: string;
  createDateTime: UseDateTimeState;
}) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const { open, handleClickOpen, handleClose } = useOpen();
  const { timeValues } = createDateTime;

  return (
    <>
      <Box onClick={handleClickOpen}>
        <EventButton text={buttonText} imgSrc={'/image/icon/qrcode-green.svg'} />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
          '& .MuiPaper-root': { maxWidth: 800, m: { xs: 2, md: 4 } },
          background: 'center / cover no-repeat url(/image/qrcode-bgcolor.png)',
        }}
      >
        <Typography
          whiteSpace="nowrap"
          sx={{
            position: 'fixed',
            bottom: '2%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 300,
            color: '#585858',
          }}
        >
          {t('Notice: touch any where to return')}
        </Typography>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center', fontSize: { xs: 20, md: 36 } }}>
          {data.eventName}
        </DialogTitle>

        <DialogContent sx={{ position: 'relative', minHeight: '50vh', minWidth: { xs: '90%', md: 800 }, pt: 4, pb: 4 }}>
          <Box sx={{ maxWidth: 520, margin: '0 auto' }}>
            <ListBox>
              <Box sx={{ mr: 2 }}>
                <SquareImgBox WH={isMobile ? 16 : 30} imgSrc={'/image/icon/date-green.svg'} />
              </Box>
              <Typography color="font.main" sx={{ fontSize: { xs: 14, md: 16 } }}>
                {moment(timeValues.startDate).format('YYYY/MM/DD')} {moment(timeValues.startTime).format('LT')}{' '}
                {timeValues.endDate && ' - '}
                {isMobile ? <br /> : <></>}
                {timeValues.endDate && moment(timeValues.endDate).format('YYYY/MM/DD')}{' '}
                {timeValues.endTime && moment(timeValues.endTime).format('LT')}
              </Typography>
            </ListBox>

            {data.city && (
              <ListBox>
                <Box sx={{ mr: 2 }}>
                  <SquareImgBox WH={isMobile ? 16 : 30} imgSrc={'/image/icon/LC3030.png'} />
                </Box>
                <Typography color="font.main" sx={{ fontSize: { xs: 14, md: 16 } }}>
                  {data.country} {data.city} {data.address}
                </Typography>
              </ListBox>
            )}

            <Box
              sx={{
                pt: { xs: 1, md: 2 },
                mb: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ background: 'center / contain no-repeat url(/image/qrcode-frame-green.png)' }}>
                <Box sx={{ p: { xs: 2, md: 6 } }}>
                  <a href={qrcodeUrl} target="_blank" rel="noreferrer">
                    <QrCodeItem id={'event_qr_code'} value={qrcodeUrl} size={isMobile ? 160 : 250} />
                  </a>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
