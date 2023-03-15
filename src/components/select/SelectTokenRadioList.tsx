import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Box, CircularProgress } from '@mui/material';
import useAlertBox from '../../hooks/useAlertBox';
import Pagination from '@mui/material/Pagination';
import { TFunction } from 'react-i18next';

const ChipWhite = ({ text }: { text: string }) => (
  <Chip
    avatar={<CheckIcon sx={{ opacity: 0 }} />}
    label={text}
    variant="outlined"
    sx={{
      width: '100%',
      minWidth: '220px',
      color: '#848484',
      border: '2px solid #9198a0',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: { xs: '0.8rem', md: '1.05rem' },
      m: { xs: 0.5, md: 1 },
      p: { xs: 2, md: 4 },
      pl: { xs: 1, md: 2 },
      ml: 0,
    }}
  />
);

const ChipPrimary = ({ text }: { text: string }) => (
  <Chip
    avatar={<CheckIcon sx={{ borderRadius: '50%', bgcolor: '#01e2a6 !important' }} />}
    label={text}
    variant="outlined"
    color="primary"
    sx={{
      width: '100%',
      minWidth: '220px',
      maxWidth: '300px',
      border: '2px solid #01e2a6',
      borderRadius: '5px',
      fontSize: { xs: '0.8rem', md: '1.05rem' },
      m: { xs: 0.5, md: 1 },
      p: { xs: 2, md: 4 },
      pl: { xs: 1, md: 2 },
      ml: 0,
    }}
  />
);

export default function SelectTokenRadioList({
  t,
  dataList,
  userBoundAddress,
  eventId,
  eventHash,
  handleCheckBoundAddress,
  page,
  handleChangePage,
  totalPage,
}: {
  t: TFunction;
  dataList: [] | null;
  userBoundAddress: { address: string; walletType: string }[] | null;
  eventId: string | null;
  eventHash: string | null;
  handleCheckBoundAddress: (eventId: string, data: { address: string; tokenId: string; hash: string }) => void;
  page: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPage: number;
}) {
  const { handleShowAlertBox } = useAlertBox();
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChangeSelectedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = () => {
    if (eventId && eventHash && selectedValue && userBoundAddress) {
      handleCheckBoundAddress(eventId, {
        address: userBoundAddress[0]['address'],
        tokenId: selectedValue,
        hash: eventHash,
      });
    }
    if (!selectedValue) handleShowAlertBox('please select one token!', 'error');
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="filter-column-radio-buttons-group-label"
        name="column-radio-buttons-group"
        sx={{ minHeight: '20vh' }}
      >
        {dataList === null && (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {dataList &&
          dataList.map((data) => (
            <FormControlLabel
              key={data}
              value={data}
              sx={{
                '& .MuiButtonBase-root': {
                  display: 'none',
                  visibility: 'hidden',
                },
                '&.MuiFormControlLabel-root': {
                  display: 'flex',
                  justifyContent: 'center',
                  mr: 0,
                },
              }}
              control={<Radio onChange={handleChangeSelectedValue} />}
              label={selectedValue === String(data) ? <ChipPrimary text={data} /> : <ChipWhite text={data} />}
            />
          ))}
      </RadioGroup>
      {totalPage > 1 && (
        <Box sx={{ pt: 1, mb: 1 }}>
          <Pagination
            variant="outlined"
            color="primary"
            boundaryCount={0}
            count={totalPage}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      )}
      <Button variant="contained" sx={{ ml: { xs: 0, md: 1 } }} onClick={handleClick}>
        {t('Check')}
      </Button>
    </FormControl>
  );
}
