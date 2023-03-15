import * as React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Button, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material/';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import MyMemberTitle from '../../member/MyMemberTitle';
import EditEventTab from '../../tabs/EditEventTab';
import AlertDelete from '../../popupBox/AlertDelete';
import Tab1EventDetailBox from './Tab1EventDetailBox';
import Tab2UserRecordBox from './Tab2UserRecordBox';
import useOpen from '../../../hooks/useOpen';
import useCreateEvent from '../../../hooks/useEvent';
import useDateTime from '../../../hooks/useDateTime';
import useCreateEventTab from '../../../hooks/useCreateEventTab';
import { UserEventInfo, UseUserState } from '../../../hooks/types';

// 可以編輯的資料
// city: string,
// physicalAddress: string,
// startTime?: string, //default: now
// endTime?: string, //default: now
// description?: string

interface MyEventEditFakePageProps {
  buttonComponent: JSX.Element;
  data: UserEventInfo;
  handleRemoveUserEvent: UseUserState['handleRemoveUserEvent'];
}

const myEventEditFakePageStyles = () => ({
  dialog: { '& .MuiPaper-root': { maxWidth: 800 } },
  dialogTitle: { display: 'flex', justifyContent: 'space-between', bgcolor: '#fff', zIndex: 2 },
  dialogContent: { minHeight: '50vh', minWidth: { xs: '90%', sm: 600, md: 800 }, mt: { xs: 0, md: '-80px' } },
  dialogActions: { display: 'flex', justifyContent: 'space-between', p: 2, width: '100%' },
});

export default function MyEventEditFakePage({
  buttonComponent,
  data,
  handleRemoveUserEvent,
}: MyEventEditFakePageProps) {
  const { t } = useTranslation();
  const classes = myEventEditFakePageStyles();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const { open, handleClickOpen, handleClose } = useOpen();

  const editEvent = useCreateEvent({ city: data.city, address: data.physicalAddress, timeZone: data.timeZone });
  const createDateTime = useDateTime(
    moment(Number(data.startTime) * 1000).toDate(),
    moment(Number(data.startTime) * 1000).toDate(),
    Number(data.endTime) !== 0 ? moment(Number(data.endTime) * 1000).toDate() : null,
    Number(data.endTime) !== 0 ? moment(Number(data.endTime) * 1000).toDate() : null
  );
  const page3Tab = useCreateEventTab({
    isNetworkEvent: data.isNetworkEvent ? 0 : 1,
    isDuring: data.endTime === 0 ? 1 : 0,
  });

  const { eventValues, handleUpdateEvent } = editEvent;
  const { timeValues } = createDateTime;
  const { tabEventPlace, tabEventDuring } = page3Tab;

  const handleUpdateEventClick = () => {
    handleClose();
    const isNetwork = tabEventPlace === 0;
    const isDuring = tabEventDuring === 1;

    handleUpdateEvent(data.eventId, {
      city: isNetwork ? '' : eventValues.city,
      physicalAddress: isNetwork ? '' : eventValues.address,
      isNetworkEvent: isNetwork ? true : false,
      timeZone: isNetwork ? data.timeZone : '',
      startDate: timeValues.startDate,
      startTime: timeValues.startTime,
      endDate: isDuring ? null : timeValues.endDate,
      endTime: isDuring ? null : timeValues.endTime,
      description: eventValues.description,
    });
  };

  return (
    <>
      <Box sx={{ width: '50%' }} onClick={handleClickOpen}>
        {buttonComponent}
      </Box>

      <Dialog open={open} onClose={handleClose} fullScreen={isMobile} sx={classes.dialog}>
        <DialogTitle sx={classes.dialogTitle}>
          <MyMemberTitle title={t('Event Detail')} />
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={classes.dialogContent}>
          <EditEventTab
            tab1={
              <Tab1EventDetailBox
                editEvent={editEvent}
                createDateTime={createDateTime}
                page3Tab={page3Tab}
                data={data}
              />
            }
            tab2={<Tab2UserRecordBox eventId={data.eventId} />}
          />
        </DialogContent>
        <DialogActions sx={classes.dialogActions}>
          <AlertDelete
            handleRemove={() => {
              handleClose();
              handleRemoveUserEvent(data.eventId);
            }}
            deleteButton={
              <Button variant="contained" color="error">
                {t('delete')}
              </Button>
            }
          />
          <Button variant="contained" onClick={handleUpdateEventClick}>
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
