import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Divider, Typography, InputLabel } from '@mui/material';
import { TFunction, useTranslation } from 'react-i18next';
import { UploadImageBox } from '../../popupBox/createEvent/eventpages/CreateEventPage1';
import CreateEventPage3 from '../../popupBox/createEvent/eventpages/CreateEventPage3';
import { ListBox, HalfBox, EventButton } from '../../popupBox/createEvent/eventpages/CreateEventPage5';
import CreateEventQrCode from '../../popupBox/createEvent/eventpages/CreateEventQrCode';
import { UseEventState, UseDateTimeState, UserEventInfo, UseCreateEventTabState } from '../../../hooks/types';
import { getQRcodeUrlByEventId } from '../../../api/eventAPI';
import BaseTextarea from '../../input/BaseTextarea';
import useEvent from '../../../hooks/useEvent';

function LockInputBox({ title, content }: { title: string; content: string }) {
  return (
    <>
      <Typography>{title}</Typography>
      <Typography
        component="div"
        sx={{ bgcolor: '#F0F0F0', borderRadius: '10px', p: 1, color: 'rgba(0, 0, 0, 0.3)', mb: 2 }}
      >
        {content}
      </Typography>
    </>
  );
}

interface Tab1EventDetailBoxProps {
  editEvent: UseEventState;
  createDateTime: UseDateTimeState;
  page3Tab: UseCreateEventTabState;
  data: UserEventInfo;
}

export default function Tab1EventDetailBox({ editEvent, createDateTime, page3Tab, data }: Tab1EventDetailBoxProps) {
  const { t } = useTranslation();
  const { showImg, handleChangeImage } = useEvent();
  const { eventValues, handleChangeEventValues } = editEvent;
  const [qrcodeData, setQrcodeData] = useState({
    qrcodeUrl: '',
    testQrcodeUrl: '',
  });

  const handleGetQrcodeUrl = (eventId: string) => {
    getQRcodeUrlByEventId(eventId).then((res) => {
      if (res && res.data.code === 200)
        setQrcodeData({
          qrcodeUrl: res.data.data.qrcodeUrl,
          testQrcodeUrl: res.data.data.testQrcodeUrl,
        });
    });
  };

  useEffect(() => {
    handleGetQrcodeUrl(data.eventId);
  }, []);
  return (
    <>
      <ListBox>
        <HalfBox>
          <CreateEventQrCode
            t={t}
            buttonText={t('Event QR code')}
            data={data}
            qrcodeUrl={qrcodeData?.qrcodeUrl}
            createDateTime={createDateTime}
          />
          <CreateEventQrCode
            t={t}
            buttonText={t('Test QR code')}
            data={data}
            qrcodeUrl={qrcodeData?.testQrcodeUrl}
            createDateTime={createDateTime}
          />
        </HalfBox>
      </ListBox>
      <ListBox>
        <HalfBox>
          <EventButton
            text={t('Download QR code')}
            imgSrc={'/image/icon/download-green.svg'}
            qrcodeUrl={qrcodeData?.qrcodeUrl}
          />
          <EventButton
            text={t('Download test QR code')}
            imgSrc={'/image/icon/download-green.svg'}
            qrcodeUrl={qrcodeData?.testQrcodeUrl}
          />
        </HalfBox>
      </ListBox>

      <Divider sx={{ pt: 2, mb: 2 }} />
      <Box>
        <LockInputBox title={t('event name')} content={data.eventName} />
        <LockInputBox title={t('Chain')} content={data.chain} />
        <LockInputBox title={t('NFT contract address')} content={data.tokenAddress} />
        <LockInputBox title={t('Smart Contract type')} content={data.tokenType} />
        <LockInputBox
          title={t('Usage Count(Per token)')}
          content={data.usageCount === 0 ? t('unlimited') : t('Once')}
        />
        <UploadImageBox
          t={t}
          imgURL={showImg.showURL ? showImg.showURL : data.bannerURL}
          handleChangeImage={handleChangeImage}
        />
        <Box sx={{ pt: 2 }} />

        <CreateEventPage3
          t={t}
          createEvent={editEvent}
          createDateTime={createDateTime}
          page3Tab={page3Tab}
          data={data}
        />

        <InputLabel>{t('description')}</InputLabel>
        <BaseTextarea
          name={'eventName'}
          value={eventValues.description}
          handleChange={handleChangeEventValues('description')}
          helperText={t('please fill out this filed.')}
        />
      </Box>
    </>
  );
}
