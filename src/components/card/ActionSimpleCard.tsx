import * as React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Box } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TFunction } from 'react-i18next';
import moment from 'moment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { noBannerImg } from '../../data/imgData';
import JoinedRecodeBox from '../fakepage/MyReadPassedRecord/JoinedRecodeBox';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { UserJoinedEvent } from '../../hooks/types';

interface ActionSimpleCardAttr {
  t: TFunction;
  data: UserJoinedEvent;
}

export default function ActionSimpleCard({ t, data }: ActionSimpleCardAttr) {
  const { bannerURL, eventId, eventName, history: historyList } = data;

  return (
    <Card>
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

        {/* <Box sx={{ display: 'flex', alignItems: 'center', color: '#7f7f7f' }}>
          <DateRangeIcon fontSize="small" />
          <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontSize: '18px' }}>
            {moment(data.time).format('YYYY/MM/DD LT')}
          </Typography>
        </Box> */}
      </CardContent>

      <Grid2 container spacing={2} sx={{ p: 1 }}>
        <Grid2 xs={6}>
          <JoinedRecodeBox
            t={t}
            historyList={historyList}
            buttonComponent={
              <Button
                variant="outlined"
                sx={{ whiteSpace: 'nowrap', pl: { xs: 1, md: 2 }, pr: { xs: 1, md: 2 }, width: '100%' }}
              >
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                </Box>
                {t('Joined Record')}
              </Button>
            }
          />
        </Grid2>
        <Grid2 xs={6}>
          <Link href={`/event/${eventId}`}>
            <Button
              variant="outlined"
              sx={{ whiteSpace: 'nowrap', width: '100%', pl: { xs: 1, md: 2 }, pr: { xs: 1, md: 2 } }}
            >
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
        </Grid2>
      </Grid2>
    </Card>
  );
}
