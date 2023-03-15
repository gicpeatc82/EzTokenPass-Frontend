import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseCreateEventTabState, UseDateTimeState } from '../../hooks/types';

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
      {value === index && (
        <Box
          sx={{
            pt: 2,
            bgcolor: '#fff',
            maxWidth: 1280,
            margin: '0 auto',
            // minHeight: '32vh',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EventTimeTab({
  t,
  tableTitle,
  page3Tab,
  createDateTime,
  tab1,
  tab2,
}: {
  t: TFunction;
  tableTitle: { value: string; name: string }[];
  page3Tab: UseCreateEventTabState;
  createDateTime: UseDateTimeState;
  tab1: JSX.Element;
  tab2: JSX.Element;
}) {
  const { timeValues, handleClearEndDateAndTime } = createDateTime;
  const { tabEventDuring, handleChangeEventDuring } = page3Tab;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          border: 0,
          borderColor: '#eee',
          '& .MuiTabs-indicator': { display: 'none', bgcolor: '#fff !important' },
        }}
      >
        <Tabs
          sx={{
            maxWidth: 1280,
            '& .MuiTabs-flexContainer': { justifyContent: 'space-between', width: '100%' },
            '& .Mui-selected': { color: '#fff !important', bgcolor: '#01e2a6', borderRadius: '5px' },
            '& .MuiTabs-flexContainer button:nth-of-type(1)': { mr: { xs: 0, md: 1 } },
            '& .MuiTabs-flexContainer button:nth-of-type(2)': { ml: { xs: 0, md: 1 } },
          }}
          value={tabEventDuring}
          onChange={handleChangeEventDuring}
          aria-label="member tabs"
        >
          {tableTitle.map((data, index) => (
            <Tab
              key={data.value}
              sx={{
                textTransform: 'none',
                fontSize: '16px',
                p: 0,
                width: '50%',
                color: '#333 ',
                bgcolor: '#fff',
                borderRadius: '5px',
                maxWidth: 252,
                height: 41,
              }}
              label={t(data.name)}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={tabEventDuring} index={0}>
        {tab1}
      </TabPanel>
      <TabPanel value={tabEventDuring} index={1}>
        {tab2}
      </TabPanel>
    </Box>
  );
}
