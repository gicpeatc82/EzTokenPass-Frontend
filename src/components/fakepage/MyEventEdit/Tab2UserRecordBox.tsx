import * as React from 'react';
import moment from 'moment';
import { TFunction, useTranslation } from 'react-i18next';
import { ListBox } from '../../popupBox/createEvent/eventpages/CreateEventPage5';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import useGetEvents from '../../../hooks/useGetEvents';
import { EventJoinedUser } from '../../../hooks/types';
import TimeFilter from '../../filter/TimeFilter';
import useTimeFilter from '../../filter/useTimeFilter';
import { handleSetAddress } from '../../../utils/walletAddress';

function EventUserBox({ t, user }: { t: TFunction; user: EventJoinedUser }) {
  return (
    <Paper sx={{ color: '#a3a3a3', mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', p: 2 }}>
        <Avatar src={user.userPhotoURL ? user.userPhotoURL : ''} sx={{ mr: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'start', mb: 1 }}>
            <Typography sx={{ color: '#333' }}>{user.userName}</Typography>
            <Typography sx={{ display: { xs: 'none', md: 'flex' }, ml: 1, mr: 1 }}>{t('used')}</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: '#ADF7E3',
                borderRadius: '5px',
                pr: 1,
                pl: 1,
                ml: { xs: 0, md: 1 },
                mr: { xs: 0, md: 1 },
              }}
            >
              <Typography>{`${t('TokenID')} : `}</Typography>
              <Typography> {user.nftTokenId}</Typography>
            </Box>
            <Typography sx={{ display: { xs: 'none', md: 'flex' }, ml: 1, mr: 1 }}>{t('in')}</Typography>
            <Typography color="font">{moment(user.time).format('YYYY/MM/DD LT')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography sx={{ display: { xs: 'flex', md: 'none' } }}>{handleSetAddress(user.tokenAddress)}</Typography>
            <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>{user.tokenAddress}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default function Tab2UserRecordBox({ eventId }: { eventId: string }) {
  const { t } = useTranslation();
  const { eventJoinedUserList, handleGetEventJoinedUserByOwner } = useGetEvents();

  React.useEffect(() => {
    if (eventId) handleGetEventJoinedUserByOwner(eventId);
  }, [eventId]);

  const { selectTime, handleChangeSelectTime } = useTimeFilter();

  React.useEffect(() => {
    if (eventId && selectTime) handleGetEventJoinedUserByOwner(eventId, selectTime);
  }, [eventId, selectTime]);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <TimeFilter t={t} select={selectTime} handleChange={handleChangeSelectTime} />
      </Box>
      <ListBox>
        <>
          {eventJoinedUserList &&
            eventJoinedUserList.map((joinedUser, index) => <EventUserBox key={index} t={t} user={joinedUser} />)}
          {eventJoinedUserList &&
            eventJoinedUserList.map((joinedUser, index) => <EventUserBox key={index} t={t} user={joinedUser} />)}
          {eventJoinedUserList &&
            eventJoinedUserList.map((joinedUser, index) => <EventUserBox key={index} t={t} user={joinedUser} />)}
          {eventJoinedUserList &&
            eventJoinedUserList.map((joinedUser, index) => <EventUserBox key={index} t={t} user={joinedUser} />)}
          {eventJoinedUserList &&
            eventJoinedUserList.map((joinedUser, index) => <EventUserBox key={index} t={t} user={joinedUser} />)}
          {eventJoinedUserList &&
            eventJoinedUserList.map((joinedUser, index) => <EventUserBox key={index} t={t} user={joinedUser} />)}
          {eventJoinedUserList &&
            eventJoinedUserList.map((joinedUser, index) => <EventUserBox key={index} t={t} user={joinedUser} />)}
        </>
      </ListBox>
    </>
  );
}
