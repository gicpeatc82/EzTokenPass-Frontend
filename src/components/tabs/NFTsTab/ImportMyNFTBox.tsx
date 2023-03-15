import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Dialog, DialogTitle, DialogContent, useMediaQuery, InputLabel } from '@mui/material';
import { Theme } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { ChainId, ChainName, ChainNameState } from '../../../hooks/types';
import useOpen from '../../../hooks/useOpen';
import BaseInput from '../../input/BaseInput';
import BaseSelect from '../../input/BaseSelect';
import theme from '../../../utils/theme';
import { chainTypeList, smartContractTypeList } from '../../../data/eventData';
import { addUserNewNFT } from '../../../api/userAPI';
import { ImportNFTAttr } from '../../../api/types';
import useResponseMessage from '../../../hooks/useResponseMessage';

/*
body: {
	tokenId: string,
  tokenAddress: string,
	chain: "Ethereum" | "BSC" | "Polygon" | "ARA" | "Ton",
	tokenType: "ERC721" | "ERC1155" | "TON"
}
*/

const importMyNFTBoxStyle = (theme: Theme) => ({
  dialogTitle: { color: theme.palette.primary.main, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  dialogContent: { minHeight: '30vh', minWidth: { xs: '90%', md: 400 } },
});

function ListBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Box sx={{ mb: 2 }}>{children}</Box>;
}

export default function ImportMyNFTBox({ buttonComponent }: { buttonComponent: JSX.Element }) {
  const { t } = useTranslation();
  const classes = importMyNFTBoxStyle(theme);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const { open, handleClickOpen, handleClose } = useOpen();
  const { handleShowInfoMessage } = useResponseMessage();

  const [values, setValues] = useState<ImportNFTAttr>({
    tokenId: '',
    tokenAddress: '',
    chain: ChainName.Ethereum,
    tokenType: ChainId.is721,
  });

  const handleChangeEventValues = (prop: keyof ImportNFTAttr) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 200) return;
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleImportUserNFT = async (values: ImportNFTAttr) => {
    const res = await addUserNewNFT(values);
    const successRes = handleShowInfoMessage(res);
    if (successRes) window.location.reload();
  };

  return (
    <>
      <Box onClick={handleClickOpen}>{buttonComponent}</Box>
      <Dialog open={open} onClose={handleClose} fullScreen={isMobile}>
        <DialogTitle sx={classes.dialogTitle}>
          <AddIcon />
          {t('Import My NFT')}
        </DialogTitle>
        <DialogContent sx={classes.dialogContent}>
          <ListBox>
            <InputLabel>*{t('NFT Token ID')}</InputLabel>
            <BaseInput
              name={'tokenId'}
              value={values.tokenId}
              handleChange={handleChangeEventValues('tokenId')}
              autocomplete={'off'}
            />
          </ListBox>

          <ListBox>
            <InputLabel>*{t('NFT address')}</InputLabel>
            <BaseInput
              name={'tokenAddress'}
              value={values.tokenAddress}
              handleChange={handleChangeEventValues('tokenAddress')}
              autocomplete={'off'}
            />
          </ListBox>

          <ListBox>
            <InputLabel>*{t('Chain type')}</InputLabel>
            <BaseSelect
              value={values.chain}
              handleChange={handleChangeEventValues('chain')}
              selectList={chainTypeList}
              helperText={t('please select one')}
              width="100%"
            />
          </ListBox>

          <ListBox>
            <InputLabel>*{t('Smart contract type')}</InputLabel>
            <BaseSelect
              value={values.tokenType}
              handleChange={handleChangeEventValues('tokenType')}
              selectList={smartContractTypeList}
              helperText={t('please select one')}
              width="100%"
            />
          </ListBox>
          <Box sx={{ textAlign: 'right', pt: 1 }}>
            <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
              {t('close')}
            </Button>
            <Button
              variant="contained"
              sx={{ boxShadow: 'none' }}
              onClick={() => {
                handleClose();
                handleImportUserNFT(values);
              }}
            >
              {t('import')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
