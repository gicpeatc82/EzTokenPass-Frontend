import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tabs, Tab } from '@mui/material';
import CoinTabLabel from './CoinTabLabel';
import MyNFTContainer from './MyNFTContainer';
import { chainCoinMenuData } from '../../../data/navData';
import useUserGetNFTs from '../../../hooks/useUserGetNFTs';
import { ChainName } from '../../../hooks/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const coinTabStyles = () => ({
  paper: { width: '100%' },
  tabsIndicator: {
    border: 0,
    borderColor: '#eee',
    '& .MuiTabs-indicator': { bgcolor: '#fff !important' },
  },
  tabs: {
    maxWidth: 1280,
    '& .MuiTabs-flexContainer': { justifyContent: { xs: 'space-between', md: 'start' }, width: '100%' },
    '& .Mui-selected': { color: '#333 !important', bgcolor: '#fff', borderRadius: '5px 5px 0 0' },
  },
  tab: {
    textTransform: 'none',
    fontSize: { xs: '18px', md: '24px' },
    pl: { xs: 2, md: 8 },
    pr: { xs: 2, md: 8 },
    width: 'auto',
    minWidth: { xs: '20%', md: '90px' },
    color: '#a3a3a3',
  },
  tabPanel: {
    p: { xs: 2, md: 3 },
    bgcolor: '#fff',
    borderRadius: '5px',
    maxWidth: 1280,
    margin: '0 auto',
    minHeight: '100vw',
  },
});

const classes = coinTabStyles();

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={classes.tabPanel}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NFTsTab() {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { userNFTsList, handleGetUserChainNFTs } = useUserGetNFTs();

  useEffect(() => {
    handleGetUserChainNFTs(ChainName['Ethereum']);
  }, []);

  return (
    <Box sx={classes.paper}>
      <Box sx={classes.tabsIndicator}>
        <Tabs sx={classes.tabs} variant="fullWidth" aria-label="NFTs tabs" value={value} onChange={handleChange}>
          {chainCoinMenuData.map((data, index) => (
            <Tab
              onClick={() => handleGetUserChainNFTs(data.name as ChainName)}
              key={data.name}
              sx={classes.tab}
              label={<CoinTabLabel name={t(data.name)} img={data.img} />}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} data-chain={ChainName['Ethereum']}>
        <MyNFTContainer nftList={userNFTsList} />
      </TabPanel>
      <TabPanel value={value} index={1} data-chain={ChainName['BSC']}>
        <MyNFTContainer nftList={userNFTsList} />
      </TabPanel>
      <TabPanel value={value} index={2} data-chain={ChainName['ARA']}>
        <MyNFTContainer nftList={userNFTsList} />
      </TabPanel>
      <TabPanel value={value} index={3} data-chain={ChainName['Polygon']}>
        <MyNFTContainer nftList={userNFTsList} />
      </TabPanel>
      <TabPanel value={value} index={4} data-chain={ChainName['TON']}>
        <MyNFTContainer nftList={userNFTsList} />
      </TabPanel>
    </Box>
  );
}
