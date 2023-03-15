import * as React from 'react';
import Link from 'next/link';
import { Typography, Box, Avatar, Button, Card, CardContent, CardMedia, CardActions } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { UserEventInfo, UseUserState } from '../../hooks/types';
import MyEventEditFakePage from '../fakepage/MyEventEdit/MyEventEditFakePage';
import { noBannerImg } from '../../data/imgData';

export default function ManageEventCard({
  data,
  handleRemoveUserEvent,
}: {
  data: UserEventInfo;
  handleRemoveUserEvent: UseUserState['handleRemoveUserEvent'];
}) {
  const { t } = useTranslation();
  const { bannerURL, eventId, eventName, owner } = data;
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: '-14%', left: 0, zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar src={''} sx={{ mr: 1 }} />
          <Typography sx={{ whiteSpace: 'nowrap' }}>{owner}</Typography>
        </Box>
      </Box>
      <Card sx={{ mb: { xs: 6, md: 4 } }}>
        <CardMedia component="img" height="200" image={bannerURL ? bannerURL : noBannerImg} alt={eventName} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {eventName}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <MyEventEditFakePage
            data={data}
            handleRemoveUserEvent={handleRemoveUserEvent}
            buttonComponent={
              <Button variant="outlined" sx={{ whiteSpace: 'nowrap', width: '100%' }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <EditIcon />
                </Box>
                {t('edit event')}
              </Button>
            }
          />
          <Link href={`/event/${eventId}`}>
            <Button variant="outlined" sx={{ whiteSpace: 'nowrap', width: '50%', ml: 1 }}>
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
              {t('Event Page')}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
