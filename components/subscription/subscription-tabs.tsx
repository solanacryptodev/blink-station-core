import { observer } from "mobx-react-lite";
import { FunctionComponent, useState } from "react";
import { TabProps, TabPanelProps } from "@/lib/types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { SubscriptionButton } from '@/components/subscription/subscription-button';
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { UpgradeButton } from "@/components/subscription/upgrade-button";

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
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="flex flex-col mb-3">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab sx={{ color: 'white' }} label={data.tabOne} {...a11yProps(0)} />
                        <Tab sx={{ color: 'white' }} label={data.tabTwo} {...a11yProps(1)} />
                        <Tab sx={{ color: 'white' }} label={data.tabThree} {...a11yProps(2)} />
                        <Tab sx={{ color: 'white' }} label={data.tabFour} {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={ value } index={ 0 }>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            This is the Blink Station 10 free tier. You will have access to the blink builder, the lore tool and limited access to Atlasson.
                            You will be restricted from accessing live blockchain analytics data and more advanced tools that require a station membership.
                        </div>
                        <div className="self-end">
                            { !subscriptionPresenter.upgradeModal ? <SubscriptionButton data={ { buttonText: 'Join Blink Station 10', membershipType: 'Traveler' }} />
                                : <button disabled>Not Available For Upgrade</button>
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={ value } index={ 1 }>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            As a station specialist, you gain access to everything in the Traveler tier, but you also gain access to the live tools of Blink Station 10.
                            This includes, but is not limited to, the Marketplace Asset Analyzer (MAA) and 1,000,000 tokens to communicate with Atlasson.
                        </div>
                        <div className="self-end">
                            { !subscriptionPresenter.upgradeModal ? <SubscriptionButton data={{ buttonText: 'Join Blink Station 10 | 10 USDC / 3,100 ATLAS', membershipType: 'Specialist' }} />
                                : <UpgradeButton data={{ buttonText: 'Upgrade to a Station Specialist | 10 USDC / 3,100 ATLAS', membershipType: 'Specialist' }} />
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={ value } index={ 2 }>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            As a station captain, you gain access to everything in the lower tiers, but you also gain privileged access to S3, the Sage Sector Scanner.
                            This tool will give you an edge in the Galia Expanse as the game grows. This tier also includes 3,000,000 tokens to communicate with Atlasson.
                        </div>
                        <div className="self-end">
                            { !subscriptionPresenter.upgradeModal ? <SubscriptionButton data={{ buttonText: 'Join Blink Station 10 | 20 USDC / 6,100 ATLAS', membershipType: 'Captain' }} />
                                : <UpgradeButton data={{ buttonText: 'Upgrade to a Station Captain | 20 USDC / 6,100 ATLAS', membershipType: 'Captain' }} /> }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={ value } index={ 3 }>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            As a station commander, you gain full access to all of the tools of Blink Station 10 and 5,000,000 tokens to communicate with Atlasson.
                            You will also gain early access to upcoming tool releases as Blink Station 10 grows.
                        </div>
                        <div className="self-end">
                            { !subscriptionPresenter.upgradeModal ? <SubscriptionButton data={{ buttonText: 'Join Blink Station 10 | 30 USDC / 9,100 ATLAS', membershipType: 'Commander' }} />
                                : <UpgradeButton data={{ buttonText: 'Upgrade to a Station Commander | 30 USDC / 9,100 ATLAS', membershipType: 'Commander' }} /> }
                        </div>
                    </div>
                </TabPanel>
            </div>
        </>
    )
} )
