import Button from '@mui/material/Button';
import { Box, Divider, InputLabel } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseEventState } from '../../../../hooks/types';
import BaseInput from '../../../input/BaseInput';
import BaseSelect from '../../../input/BaseSelect';
import { chainTypeList, smartContractTypeList, usageCountList } from '../../../../data/eventData';
import LockIcon from '@mui/icons-material/Lock';

function ListBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Box sx={{ mb: 2 }}>{children}</Box>;
}

export default function CreateEventPage2({ t, createEvent }: { t: TFunction; createEvent: UseEventState }) {
  const { eventValues, handleChangeEventValues } = createEvent;

  return (
    <>
      <ListBox>
        <InputLabel>{t('The NFTs you want to validate')}</InputLabel>
        <Button variant="contained" fullWidth disabled sx={{ textTransform: 'initial' }}>
          <LockIcon fontSize="small" sx={{ mr: 2 }} /> {t('Just let me have awesome digital pass')}
        </Button>
      </ListBox>

      <Divider sx={{ pt: 2, mb: 2 }} />

      <ListBox>
        <InputLabel>*{t('Chain type')}</InputLabel>
        <BaseSelect
          value={eventValues.chain}
          handleChange={handleChangeEventValues('chain')}
          selectList={chainTypeList}
          helperText={t('please select one')}
          width="100%"
        />
      </ListBox>

      <ListBox>
        <InputLabel>*{t('NFT contract address')}</InputLabel>
        <BaseInput
          name={'tokenAddress'}
          value={eventValues.tokenAddress}
          handleChange={handleChangeEventValues('tokenAddress')}
          autocomplete={'off'}
          helperText={t('please fill out this filed.')}
        />
      </ListBox>

      <ListBox>
        <InputLabel>*{t('Smart contract type')}</InputLabel>
        <BaseSelect
          value={eventValues.contractType}
          handleChange={handleChangeEventValues('contractType')}
          selectList={smartContractTypeList}
          helperText={t('please select one')}
          width="100%"
        />
      </ListBox>

      {/* <ListBox>
        <InputLabel>*{t('Require quantity')}</InputLabel>
        <BaseInput
          name={'tokenAddress'}
          value={eventValues.tokenAddress}
          handleChange={handleChangeEventValues('tokenAddress')}
          autocomplete={'off'}
          placeholder={t('int (Only for 1155 and 20)')}
          helperText={t('please fill out this filed.')}
        />
      </ListBox> */}

      <ListBox>
        <InputLabel>*{t('Usage Count(Per token)')}</InputLabel>
        <BaseSelect
          value={eventValues.usageCount ? String(eventValues.usageCount) : '1'}
          handleChange={handleChangeEventValues('usageCount')}
          selectList={usageCountList}
          helperText={t('please select one')}
          width="100%"
        />
      </ListBox>
    </>
  );
}
