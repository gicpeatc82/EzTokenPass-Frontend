import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import { Box } from '@mui/material';
import { TFunction } from 'react-i18next';

export default function ProgressMobileStepper({ t, activeStep }: { t: TFunction; activeStep: number }) {
  return (
    <Box sx={{ p: { xs: '8px 16px', md: '16px 24px' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Box>{t('Progress')}</Box> <Box>{activeStep}/4</Box>
      </Box>
      <MobileStepper
        variant="progress"
        steps={5}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1, bgcolor: '#fff', '& > .MuiLinearProgress-root': { width: '100%', bgcolor: '#F0F0F0' } }}
        nextButton={<></>}
        backButton={<></>}
      />
    </Box>
  );
}
