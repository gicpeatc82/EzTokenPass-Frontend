import * as React from 'react';
import { useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Button } from '@mui/material';
import { TFunction } from 'react-i18next';
import CreateEventPage0 from './eventpages/CreateEventPage0';
import CreateEventPage1 from './eventpages/CreateEventPage1';
import CreateEventPage2 from './eventpages/CreateEventPage2';
import CreateEventPage3 from './eventpages/CreateEventPage3';
import CreateEventPage4 from './eventpages/CreateEventPage4';
import CreateEventPage5 from './eventpages/CreateEventPage5';
import ProgressMobileStepper from '../../ProgressMobileStepper';
import useStep from '../../../hooks/useStep';
import useOpen from '../../../hooks/useOpen';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import MyMemberTitle from '../../member/MyMemberTitle';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import useEvent from '../../../hooks/useEvent';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import useDateTime from '../../../hooks/useDateTime';
import useQuestions from '../../../hooks/useQuestions';
import useCheckAndAddEvent from '../../../hooks/useCheckAndAddEvent';
import useCreateEventTab from '../../../hooks/useCreateEventTab';

const CreateEventMainBoxStyles = () => ({
  dialog: { '& .MuiPaper-root': { maxWidth: 800 } },
  dialogTitle: { display: 'flex', justifyContent: 'space-between' },
  dialogContent: { minHeight: '50vh', minWidth: { xs: '90%', md: 800 } },
  dialogActions: { display: 'flex', justifyContent: 'space-between', p: 2, width: '100%' },
});

export default function CreateEventMainBox({ t, buttonComponent }: { t: TFunction; buttonComponent: JSX.Element }) {
  const classes = CreateEventMainBoxStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const { activeStep, handleNext, handleBack, handleInitStep } = useStep();
  const { open, handleClickOpen, handleClose } = useOpen();
  const createEvent = useEvent();
  const createDateTime = useDateTime();
  const myRef = useRef<any>(null);
  const question = useQuestions();
  const { handleCheckValues } = useCheckAndAddEvent();
  const page3Tab = useCreateEventTab();

  useEffect(() => {
    if (myRef.current) myRef.current.scrollIntoView();
  }, [activeStep]);

  return (
    <>
      <Box id="create-new-event-btn" onClick={handleClickOpen}>
        {buttonComponent}
      </Box>
      <Dialog open={open} onClose={handleClose} fullScreen={isMobile} sx={classes.dialog}>
        {activeStep !== 5 && (
          <>
            <DialogTitle sx={classes.dialogTitle}>
              <MyMemberTitle title={t('Create a new event')} />
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <ProgressMobileStepper t={t} activeStep={activeStep} />
          </>
        )}
        <DialogContent sx={classes.dialogContent}>
          <div ref={myRef} />
          <Box sx={{ maxWidth: 520, margin: '0 auto' }}>
            {activeStep === 0 && <CreateEventPage0 t={t} question={question} />}
            {activeStep === 1 && <CreateEventPage1 t={t} createEvent={createEvent} />}
            {activeStep === 2 && <CreateEventPage2 t={t} createEvent={createEvent} />}
            {activeStep === 3 && (
              <CreateEventPage3 t={t} createEvent={createEvent} createDateTime={createDateTime} page3Tab={page3Tab} />
            )}
            {activeStep === 4 && <CreateEventPage4 t={t} createEvent={createEvent} createDateTime={createDateTime} />}
            {activeStep === 5 && <CreateEventPage5 t={t} createEvent={createEvent} createDateTime={createDateTime} />}
          </Box>
        </DialogContent>

        <DialogActions sx={classes.dialogActions}>
          {activeStep === 0 || activeStep === 5 ? (
            <div></div>
          ) : (
            <Button variant="contained" size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              {t('Back')}
            </Button>
          )}
          {activeStep === 5 ? (
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                handleInitStep();
                window.location.reload();
              }}
            >
              {t('finish')}
            </Button>
          ) : activeStep === 4 ? (
            <Button
              variant="contained"
              onClick={() => handleCheckValues(activeStep, question, createEvent, createDateTime, page3Tab, handleNext)}
            >
              {t('submit')}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleCheckValues(activeStep, question, createEvent, createDateTime, page3Tab, handleNext)}
              disabled={activeStep === 4}
            >
              {t('Next')}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
