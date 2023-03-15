import { Box, InputLabel } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseQuestionsState } from '../../../../hooks/types';
import BaseSelect from '../../../input/BaseSelect';
import BaseRadio from '../../../input/BaseRadio';
import { howOftenList, howDoUKnowList } from '../../../../data/eventData';

function ListBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Box sx={{ mb: 3 }}>{children}</Box>;
}

export default function CreateEventPage0({ t, question }: { t: TFunction; question: UseQuestionsState }) {
  const { questions1, handleChangeQuestions1 } = question;

  return (
    <>
      <ListBox>
        <InputLabel>*{t('How often you host an event?')}</InputLabel>
        <BaseSelect
          value={questions1.hostFrequency}
          handleChange={handleChangeQuestions1('hostFrequency')}
          selectList={howOftenList}
          helperText={t('please select one')}
          width="100%"
          ariaLabel={'select how often host an event'}
        />
      </ListBox>

      <ListBox>
        <InputLabel>*{t('Did you deploy any smart contract on chain?')}</InputLabel>
        <BaseRadio
          radioList={[
            { value: 'true', label: 'yes' },
            { value: 'false', label: 'no' },
          ]}
          radioValue={questions1.deployedContract}
          handleChangeRadio={handleChangeQuestions1('deployedContract')}
        />
      </ListBox>

      <ListBox>
        <InputLabel>*{t('How do you know token pass?')}</InputLabel>
        <BaseSelect
          value={questions1.howToKnow}
          handleChange={handleChangeQuestions1('howToKnow')}
          selectList={howDoUKnowList}
          helperText={t('please select one')}
          width="100%"
          ariaLabel={'How do you know token pass'}
        />
      </ListBox>
    </>
  );
}
