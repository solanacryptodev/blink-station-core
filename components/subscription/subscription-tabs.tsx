import { observer } from "mobx-react-lite";
import { FunctionComponent, useState } from "react";
import { TabProps, TabPanelProps } from "@/lib/types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SubscriptionButton } from '@/components/subscription/subscription-button';

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
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
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

export const SubscriptionTabs: FunctionComponent<{ data: TabProps }> = observer(({ data }: { data: TabProps }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="flex flex-col mb-3">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab sx={{ color: 'white' }} label='Wanderer' {...a11yProps(0)} />
                        <Tab sx={{ color: 'white' }} label="Station Specialist" {...a11yProps(1)} />
                        <Tab sx={{ color: 'white' }} label="Station Captain" {...a11yProps(2)} />
                        <Tab sx={{ color: 'white' }} label="Station Commander" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="flex flex-col">
                        <div className="mb-3">
                            { data.tabOne }
                        </div>
                        <div className="self-end">
                            <SubscriptionButton data={ { buttonText: 'Join Blink Station 10' } }/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={ value } index={ 1 }>
                    <div className="flex flex-col">
                        <div className="mb-3">
                            { data.tabTwo }
                        </div>
                        <div className="self-end">
                            <SubscriptionButton data={ { buttonText: 'Join Blink Station 10' } }/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={ value } index={ 2 }>
                    <div className="flex flex-col">
                        <div className="mb-3">
                            { data.tabThree }
                        </div>
                        <div className="self-end">
                            <SubscriptionButton data={ { buttonText: 'Join Blink Station 10' } }/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={ value } index={ 3 }>
                    <div className="flex flex-col">
                        <div className="mb-3">
                            { data.tabFour }
                        </div>
                        <div className="self-end">
                            <SubscriptionButton data={ { buttonText: 'Join Blink Station 10' } }/>
                        </div>
                    </div>
                </TabPanel>
            </div>
        </>
    )
} )
