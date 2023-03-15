import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import LoginButton from '../button/loginButton';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SignTab({ t }: { t: any }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', margin: '0 auto', maxWidth: 700, minHeight: '100vh', mt: { xs: 1, md: 10 } }}>
      <Box sx={{ borderBottom: 1, borderColor: '#01e2a6' }}>
        <Tabs
          sx={{ '& .MuiTabs-flexContainer': { justifyContent: 'space-between' } }}
          value={value}
          onChange={handleChange}
          aria-label="Sign in and sign up tabs"
        >
          <Tab
            sx={{ textTransform: 'none', fontSize: { xs: '18px', md: '36px' }, width: '50%' }}
            label={t('Sign in')}
            {...a11yProps(0)}
          />
          <Tab
            sx={{ textTransform: 'none', fontSize: { xs: '18px', md: '36px' }, width: '50%' }}
            label={t('Sign up')}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pt: { xs: 0, md: 5 },
          }}
        >
          <LoginButton text={'google'} />
          <LoginButton text={'apple'} />
          <LoginButton text={'facebook'} />
          <Typography variant="body1" component="div" textAlign="center" sx={{ maxWidth: 360, color: '#585858' }}>
            {t('Registering to this website, you accept our Terms of use and our Privacy policy')}
          </Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pt: { xs: 0, md: 5 },
          }}
        >
          <LoginButton text={'google'} />
          <LoginButton text={'apple'} />
          <LoginButton text={'facebook'} />
          <Typography variant="body1" component="div" textAlign="center" sx={{ maxWidth: 360, color: '#585858' }}>
            {t('Registering to this website, you accept our Terms of use and our Privacy policy')}
          </Typography>
        </Box>
      </TabPanel>
    </Box>
  );
}
