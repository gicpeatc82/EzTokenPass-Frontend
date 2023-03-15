import Button from '@mui/material/Button';
import { Box, InputLabel, Typography } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseEventState } from '../../../../hooks/types';
import BaseInput from '../../../input/BaseInput';
import BaseTextarea from '../../../input/BaseTextarea';
import BaseSelect from '../../../input/BaseSelect';
import { FiUpload } from 'react-icons/fi';
import { howManyPeopleList } from '../../../../data/eventData';

function ListBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Box sx={{ mb: 2 }}>{children}</Box>;
}

function UploadImageButton({
  handleChangeImage,
}: {
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Button
      size="small"
      component="label"
      startIcon={<FiUpload size="36" />}
      color="font"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '2px dashed #01e2a6',
        bgcolor: '#F0F0F0',
        textTransform: 'initial',
        pt: 4,
        pb: 4,
      }}
    >
      <Typography sx={{ color: '#333' }}>click to upload</Typography>
      <Typography fontSize="14px">300x250 / Max 500KB each</Typography>

      <input hidden accept=".jpg, .jpeg, .png" multiple type="file" name="image" onChange={handleChangeImage} />
    </Button>
  );
}

export function UploadImageBox({
  t,
  imgURL,
  handleChangeImage,
}: {
  t: TFunction;
  imgURL: string;
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'end',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 250,
          background: `center / contain no-repeat url(${imgURL})`,
          bgcolor: '#f5f5f5',
        }}
      />

      <Button variant="contained" component="label">
        {t('edit')}
        <input hidden accept=".jpg, .jpeg, .png" multiple type="file" name="image" onChange={handleChangeImage} />
      </Button>
    </Box>
  );
}

export default function CreateEventPage1({ t, createEvent }: { t: TFunction; createEvent: UseEventState }) {
  const { eventValues, handleChangeEventValues, showImg, handleChangeImage } = createEvent;

  return (
    <>
      <ListBox>
        <InputLabel>*{t('Your event name')}</InputLabel>
        <BaseInput
          name={'eventName'}
          value={eventValues.eventName}
          handleChange={handleChangeEventValues('eventName')}
          autocomplete={'off'}
          helperText={t('please fill out this filed.')}
        />
      </ListBox>

      <ListBox>
        <InputLabel>*{t('Event image')}</InputLabel>
        {showImg['showURL'] ? (
          <UploadImageBox t={t} imgURL={showImg['showURL']} handleChangeImage={handleChangeImage} />
        ) : (
          <UploadImageButton handleChangeImage={handleChangeImage} />
        )}
      </ListBox>

      <ListBox>
        <InputLabel>*{t('How many people plan the event with you?')}</InputLabel>
        <BaseSelect
          value={eventValues.howPeople}
          handleChange={handleChangeEventValues('howPeople')}
          selectList={howManyPeopleList}
          helperText={t('please select one')}
          width="100%"
        />
      </ListBox>

      <ListBox>
        <InputLabel>{t('description')}</InputLabel>
        <BaseTextarea
          name={'eventName'}
          value={eventValues.description}
          handleChange={handleChangeEventValues('description')}
          helperText={t('please fill out this filed.')}
        />
      </ListBox>
    </>
  );
}
