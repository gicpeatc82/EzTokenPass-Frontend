import { Box, Divider, Button, Typography } from '@mui/material';
import { TFunction } from 'react-i18next';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreateEventQrCode from './CreateEventQrCode';
import { UseEventState, UseDateTimeState } from '../../../../hooks/types';
import QrCodeItem from '../../../qrcode/QrCodeItem';

export function ListBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Box sx={{ mb: 2, textAlign: 'center' }}>{children}</Box>;
}

export function HalfBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        width: '100%',
        '& button:nth-of-type(1)': {
          mb: { xs: 2, md: 0 },
        },
      }}
    >
      {children}
    </Box>
  );
}

export function EventButton({ text, imgSrc, qrcodeUrl }: { text: string; imgSrc: string; qrcodeUrl: string }) {
  const id = text.replace(/Download\s*/g, '');

  const downloadQrcode = () => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const pngUrl = canvas?.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');

    downloadLink.href = pngUrl;
    downloadLink.download = `${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <>
      <Button
        variant="outlined"
        sx={{ minWidth: 249, display: 'flex', justifyContent: 'start', pl: { xs: 4, md: 2 } }}
        onClick={downloadQrcode}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1, width: 30, height: 30 }}>
          <img src={imgSrc} alt="" />
        </Box>
        {text}
      </Button>
      <Box sx={{ display: 'none' }}>
        <QrCodeItem id={id} value={qrcodeUrl} size={250} />
      </Box>
    </>
  );
}

export default function CreateEventPage5({
  t,
  createEvent,
  createDateTime,
}: {
  t: TFunction;
  createEvent: UseEventState;
  createDateTime: UseDateTimeState;
}) {
  const { eventValues, successEventData } = createEvent;
  return (
    <>
      <ListBox>
        <Typography variant="h4" sx={{ pt: 4 }}>
          {t('Event created successfully')}
        </Typography>
        <CheckCircleOutlineIcon sx={{ color: '#01E2A6', fontSize: 150 }} />
        <Typography>{t('Pass by NFT')}</Typography>
        <Typography color="font.main">{successEventData?.eventId}</Typography>
      </ListBox>

      <Divider sx={{ mb: 4 }} />

      {successEventData && (
        <>
          <ListBox>
            <HalfBox>
              <CreateEventQrCode
                t={t}
                buttonText={t('Event QR code')}
                data={eventValues}
                qrcodeUrl={successEventData?.qrcodeUrl}
                createDateTime={createDateTime}
              />
              <CreateEventQrCode
                t={t}
                buttonText={t('Test QR code')}
                data={eventValues}
                qrcodeUrl={successEventData?.testQrcodeUrl}
                createDateTime={createDateTime}
              />
            </HalfBox>
          </ListBox>
          <ListBox>
            <HalfBox>
              <EventButton
                text={t('Download QR code')}
                imgSrc={'/image/icon/download-green.svg'}
                qrcodeUrl={successEventData?.qrcodeUrl}
              />
              <EventButton
                text={t('Download test QR code')}
                imgSrc={'/image/icon/download-green.svg'}
                qrcodeUrl={successEventData?.testQrcodeUrl}
              />
            </HalfBox>
          </ListBox>
        </>
      )}
      <Divider sx={{ mb: 4, pt: 4 }} />
    </>
  );
}
