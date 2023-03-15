import * as React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
      {value === index && <Box sx={{ p: { xs: 0, md: 3 }, pt: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const editEventTabStyles = () => ({
  box1: { width: '100%', margin: '0 auto', maxWidth: 700, minHeight: '100vh', mt: { xs: 1, md: 10 } },
  box2: { borderBottom: 1, borderColor: '#01e2a6' },
  tabs: { '& .MuiTabs-flexContainer': { justifyContent: 'space-between' } },
  tab: { textTransform: 'none', fontSize: { xs: '18px', md: '36px' }, width: '50%' },
});

export default function EditEventTab({ tab1, tab2 }: { tab1: JSX.Element; tab2: JSX.Element }) {
  const { t } = useTranslation();
  const classes = editEventTabStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={classes.box1}>
      <Box sx={classes.box2}>
        <Tabs sx={classes.tabs} value={value} onChange={handleChange} aria-label="Event Detail tabs">
          <Tab sx={classes.tab} label={t('Event Detail')} {...a11yProps(0)} />
          <Tab sx={classes.tab} label={t('User Record')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {tab1}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tab2}
      </TabPanel>
    </Box>
  );
}
