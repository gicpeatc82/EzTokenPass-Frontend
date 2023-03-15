import { useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../../src/components/layout/Layout';
import { TFunction, useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import WebEventIdInfoBox from '../../src/components/web/WebEventIdInfoBox';
import MobileEventIdInfoBox from '../../src/components/mobile/MobileEventIdInfoBox';
import { Theme } from '@mui/material';
import { useRouter } from 'next/router';
import useGetEvents from '../../src/hooks/useGetEvents';
import Meta from '../../src/components/layout/Meta';
import useUser from '../../src/hooks/useUser';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../src/redux/reducers/userReducer';
import { OneEventInfo, UseUserState } from '../../src/hooks/types';

export interface EventPageData {
  t: TFunction;
  data: OneEventInfo;
  userBoundAddress: UseUserState['userBoundAddress'];
  userEventNFTsAmount: UseUserState['userEventNFTsAmount'];
}

const EventPage: NextPage = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const router = useRouter();
  const eventId = !Array.isArray(router.query.eventId) ? router.query.eventId : null;
  const { eventInfo, handleGetOneEventInfo } = useGetEvents();
  const { userBoundAddress, handleGetUserBoundAddress, userEventNFTsAmount, handleGetUserEventNFTsAmount } = useUser();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (eventId) {
      handleGetOneEventInfo(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    if (userInfo && eventId) {
      handleGetUserEventNFTsAmount(eventId);
    }
  }, [userInfo, eventId]);

  useEffect(() => {
    handleGetUserBoundAddress();
  }, []);

  return (
    <Layout t={t}>
      <Meta title={eventInfo && eventInfo['eventName'] ? eventInfo['eventName'] : ''} />
      <>
        {eventInfo ? (
          <>
            {isMobile ? (
              <MobileEventIdInfoBox
                t={t}
                data={eventInfo}
                userBoundAddress={userBoundAddress}
                userEventNFTsAmount={userEventNFTsAmount}
              />
            ) : (
              <WebEventIdInfoBox
                t={t}
                data={eventInfo}
                userBoundAddress={userBoundAddress}
                userEventNFTsAmount={userEventNFTsAmount}
              />
            )}
          </>
        ) : null}
      </>
    </Layout>
  );
};

export default EventPage;
