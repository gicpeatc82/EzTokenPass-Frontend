import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from '@mui/material';
import MyMemberTitle from './MyMemberTitle';
import { TFunction } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/reducers/userReducer';
import SelectLangButton from '../button/SelectLangButton';
import MyReadPassedRecordPage from '../fakepage/MyReadPassedRecord/MyReadPassedRecordPage';
import useUser from '../../hooks/useUser';
import useEvent from '../../hooks/useEvent';
import useOpen from '../../hooks/useOpen';
import CloseIcon from '@mui/icons-material/Close';
import BaseInput from '../input/BaseInput';

const MainContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => <>{children}</>;
const FakeContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => <>{children}</>;

const EditUserNameBox = ({
  t,
  buttonComponent,
  userName,
}: {
  t: TFunction;
  buttonComponent: JSX.Element;
  userName: string;
}) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const { open, handleClickOpen, handleClose } = useOpen();
  const { handleUpdateUserName } = useUser();

  const [userNameValue, setUserNameValue] = useState(userName);
  const handleChangeUserNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 42) return;
    setUserNameValue(event.target.value);
  };
  return (
    <>
      <Box onClick={handleClickOpen}>{buttonComponent}</Box>
      <Dialog open={open} onClose={handleClose} fullScreen={isMobile ? true : false}>
        <DialogContent sx={{ minHeight: '30vh', minWidth: { xs: '90%', md: 400 } }}>
          <BaseInput
            name={'eventName'}
            value={userNameValue}
            handleChange={handleChangeUserNameValue}
            autocomplete={'off'}
            placeholder={t('new user name')}
          />
          <Box sx={{ textAlign: 'right', pt: 1 }}>
            <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
              {t('close')}
            </Button>
            <Button
              variant="contained"
              sx={{ boxShadow: 'none' }}
              onClick={() => {
                handleClose();
                handleUpdateUserName(userNameValue);
              }}
            >
              {t('submit')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const MyInfoBox = ({ t, userInfo }: { t: TFunction; userInfo: any }) => {
  const { showImg, handleChangeImage } = useEvent();
  const { handleUpdateUserAvatar } = useUser();

  useEffect(() => {
    if (showImg['imageFile']) handleUpdateUserAvatar(showImg);
  }, [showImg]);

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: '5px',
        p: { xs: 2, md: 4 },
        mb: { xs: 2, md: 6 },
        display: 'flex',
        alignItems: { xs: 'center', md: 'start' },
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ borderRadius: '5px', width: 96, height: 96, display: { xs: 'none', md: 'block' } }}>
        <img src={userInfo.photoURL} alt="" width="100%" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'start' },
          justifyContent: 'space-between',
          pl: { xs: 0, md: 4 },
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, display: { xs: 'none', md: 'block' } }}>
          <Typography color="font.main">{userInfo.email}</Typography>
          <Typography>{userInfo.displayName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant="outlined" component="label" sx={{ mt: { xs: 2, md: 1 }, mr: 1, textAlign: 'center' }}>
            {t('upload avatar')}
            <input hidden accept=".jpg, .jpeg, .png" multiple type="file" name="image" onChange={handleChangeImage} />
          </Button>
          <EditUserNameBox
            t={t}
            userName={userInfo.displayName}
            buttonComponent={
              <Button variant="outlined" sx={{ mt: { xs: 2, md: 1 } }}>
                {t('modify name')}
              </Button>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const RecordBox = ({ t, handleOpen }: { t: TFunction<'translation', undefined>; handleOpen: () => void }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#333333',
        textTransform: 'capitalize',
        p: { xs: 2, md: 4 },
        mb: { xs: 2, md: 6 },
      }}
      onClick={handleOpen}
    >
      <Typography component="div" variant="body1" textAlign="center" sx={{ width: '100%', pt: '6px', pb: '6px' }}>
        {t('read passed record')}
      </Typography>
    </Button>
  );
};

function MyInfo({ t }: { t: TFunction<'translation', undefined> }) {
  const userInfo = useSelector(selectUserInfo);
  const { userJoinedEvents, handleGetUserJoinedEvents } = useUser();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {open ? (
        <FakeContainer>
          <MyReadPassedRecordPage
            t={t}
            open={open}
            handleClose={handleClose}
            data={userJoinedEvents}
            handleGetUserJoinedEvents={handleGetUserJoinedEvents}
          />
        </FakeContainer>
      ) : (
        <MainContainer>
          <MyMemberTitle title={t('my info')} />
          <MyInfoBox t={t} userInfo={userInfo} />
          <RecordBox
            t={t}
            handleOpen={() => {
              handleOpen();
            }}
          />
        </MainContainer>
      )}
    </Box>
  );
}

export default MyInfo;
