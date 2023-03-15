import * as React from 'react';
import { TFunction } from 'react-i18next';
import { useRouter } from 'next/router';
import { Box, Theme, Tabs, Tab } from '@mui/material';
import { userMenuData } from '../../data/navData';
import MyWalletList from '../member/myWalletList/MyWalletList';
import MyInfo from '../member/MyInfo';
import MyNFT from '../member/MyNFT';
import MyOrganization from '../member/MyOrganization';
import MyManageEvents from '../member/MyManageEvents';
import theme from '../../utils/theme';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const memberTabStyles = (theme: Theme) => ({
  tabsIndicator: {
    display: { xs: 'none', md: 'flex' },
    border: 0,
    borderColor: '#eee',
    bgcolor: '#fff',
    '& .MuiTabs-indicator': { bgcolor: '#eee !important' },
  },
  tabs: {
    maxWidth: 1280,
    margin: '0 auto',
    '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
    '& .Mui-selected': { color: '#333 !important', bgcolor: '#eee', borderRadius: '5px 5px 0 0' },
    '& .MuiTabs-scroller': { width: 1280 },
  },
  tab: { textTransform: 'none', fontSize: { xs: '18px', md: '24px' }, width: '20%', color: '#a3a3a3' },
});

const classes = memberTabStyles(theme);

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
      {value === index && <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1280, margin: '0 auto' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MemberTab({ t, tabValue }: { t: TFunction<'translation', undefined>; tabValue: number }) {
  const [value, setValue] = React.useState(tabValue);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(userMenuData[newValue].link);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={classes.tabsIndicator}>
        <Tabs sx={classes.tabs} value={value} onChange={handleChange} aria-label="member tabs">
          {userMenuData.map((data, index) => (
            <Tab key={data.name} sx={classes.tab} label={t(data.name)} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MyWalletList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyInfo t={t} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyNFT />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MyOrganization t={t} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MyManageEvents t={t} />
      </TabPanel>
    </Box>
  );
}
