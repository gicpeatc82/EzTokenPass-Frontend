import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import GroupsIcon from '@mui/icons-material/Groups';
import { HomeEvent } from '../../hooks/types';
import moment from 'moment';
import Link from 'next/link';
import { noBannerImg } from '../../data/imgData';

export default function ActionAreaCard({ data }: { data: HomeEvent }) {
  return (
    <Card>
      <Link href={`/event/${data.eventId}`}>
        <a>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={data.bannerURL ? data.bannerURL : noBannerImg}
              alt={data.eventName}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {data.eventName}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', color: '#7f7f7f' }}>
                <DateRangeIcon fontSize="small" />
                <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontSize: '18px' }}>
                  {`${moment(data.startTime * 1000).format('YYYY/MM/DD')}`}
                  {data.endTime !== 0 && ` - ${moment(data.endTime * 1000).format('YYYY/MM/DD')}`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#7f7f7f' }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontSize: '18px' }}>
                  {data.countryKey}
                  {data.cityName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#7f7f7f' }}>
                <LocalActivityIcon fontSize="small" />
                <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontSize: '18px' }}>
                  {/* Ticket chain Icon / Type / address */}
                  {data.chain}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#7f7f7f' }}>
                <GroupsIcon fontSize="small" />
                <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontSize: '18px' }}>
                  {data.ownerName}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
    </Card>
  );
}
