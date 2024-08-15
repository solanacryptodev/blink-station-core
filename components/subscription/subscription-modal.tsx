import { FunctionComponent, useEffect, useRef } from "react";
import Image from 'next/image'
import { observer } from "mobx-react-lite";
import { X } from "react-feather";
import { motion } from "framer-motion";
import { useClickAway } from "react-use";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { SubscriptionTabs } from '@/components/subscription/subscription-tabs';
import { SubscriptionValidation } from '@/components/subscription/subscription-validation';

export const SubscriptionModal: FunctionComponent = observer(() => {
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    const ref = useRef<HTMLDivElement>(null);
    const shdwDrive = `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/blinkstation2.png`;

    useClickAway(ref, () => {
        subscriptionPresenter.activateSubscriptionModal(false);
    });

    useEffect(() => {
        const getSubStatus = async () => {
            if (subscriptionPresenter.player) {
                await subscriptionPresenter.playerSubscriptionStatus();
            }
        }

        getSubStatus();
    }, [subscriptionPresenter, subscriptionPresenter.player]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-40"
        >
            { subscriptionPresenter.playerProfileStatus() && subscriptionPresenter.subscriptionModal && (
                <div className="fixed inset-0 opacity-100 flex items-center justify-center z-50">
                    <div ref={ ref } className="bg-[#194555] rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex">
                                { subscriptionPresenter.displaySubscriptionView ?
                                    <h2 className="text-xl font-bold">Choose Your Path</h2> :
                                    <h2 className="text-xl font-bold">Validation Sequence Initiated.</h2>
                                }
                            </div>
                            <button
                                onClick={ () => subscriptionPresenter.activateSubscriptionModal( false ) }
                                className="text-gray-500 hover:text-white"
                                aria-label="Close"
                            >
                                <X size={ 24 }/>
                            </button>
                        </div>

                        { subscriptionPresenter.displaySubscriptionView && (
                            <div className="justify-center w-full mb-4">
                                <Image
                                    src={ shdwDrive }
                                    width={ 1080 }
                                    height={ 720 }
                                    alt='Image of Blink Station 1.'
                                />
                            </div>
                        )}

                        <div className="flex flex-col">
                            <div className="flex justify-start mb-4">
                                Blink Station 10 was built for players within the Star Atlas ecosystem. A station
                                account is the minimum requirement for access to
                                its array of sophisticated tools. The best tools require a station membership clearance.
                                This is due to the operational costs associated with
                                monthly maintenance. These costs include the database, blockchain data retrieval, and
                                the Atlasson artificial intelligence.
                                The best AI in MRZ-3.
                            </div>
                            <div className="flex justify-start mb-4">
                                Each membership covers you for a month and there are no recurring fees!
                                Below, you will see details about what each clearance level provides.
                            </div>
                        </div>

                        <div className="flex justify-center">
                            { subscriptionPresenter.displaySubscriptionView ?
                                <SubscriptionTabs data={ subscriptionPresenter.subscriptionTabs() }/> :
                                <SubscriptionValidation/>
                            }
                        </div>

                    </div>
                </div>
            ) }
        </motion.div>
    )
} )
