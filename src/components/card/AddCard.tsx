import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddCard({ text }: { text: string }) {
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
        maxHeight: { xs: 200, md: 348 },
        maxWidth: 348,
        mb: { xs: 6, md: 4 },
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
            p: 10,
          }}
        >
          <AddIcon sx={{ fontSize: 60 }} />

          <Typography sx={{ fontSize: { xs: 16, md: 18 }, whiteSpace: 'nowrap' }}>{text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
