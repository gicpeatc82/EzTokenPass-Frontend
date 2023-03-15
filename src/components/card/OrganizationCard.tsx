import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { TFunction } from 'react-i18next';

export default function OrganizationCard({ t }: { t: TFunction<'translation', undefined> }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="200" image="/image/banner/cat02.jpg" alt="" />
        <CardContent sx={{ p: { xs: '8px !important', md: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 20, height: 20, mr: 1 }}>
              <img src={'/image/user_icon/organization-black.png'} alt="" width="100%" />
            </Box>
            <Typography variant="h6">Organization NAME</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
