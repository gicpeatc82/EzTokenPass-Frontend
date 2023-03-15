import { Box } from '@mui/material';
import MyMemberTitle from './MyMemberTitle';
import { useTranslation } from 'react-i18next';
import NFTsTab from '../tabs/NFTsTab/NFTsTab';

const MainContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => <>{children}</>;

function MyNFT() {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 2 }}>
      <MainContainer>
        <MyMemberTitle title={t('my NFT')} />
        <NFTsTab />
      </MainContainer>
    </Box>
  );
}

export default MyNFT;
