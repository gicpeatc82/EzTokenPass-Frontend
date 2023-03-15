import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddNFTButton({ text }: { text: string }) {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed #01e2a6',
        textTransform: 'capitalize',
        bgcolor: 'inherit',
        boxShadow: 0,
        overflow: 'hidden',
        height: { xs: 70, sm: 120, md: 185 },
        width: { xs: 70, sm: 120, md: 185 },
        maxWidth: 280,
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#01e2a6',
          }}
        >
          <AddIcon sx={{ fontSize: { xs: 20, md: 60 } }} />

          <Typography sx={{ fontSize: { xs: 10, sm: 16, md: 18 }, whiteSpace: 'nowrap' }}>{text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
