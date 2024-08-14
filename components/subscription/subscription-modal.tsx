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
    const shdwDrive = `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/blinkstation1.png`;

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
            initial={ { opacity: 0, scale: 0 } }
            animate={ { opacity: 1, scale: 1 } }
            transition={ { duration: 0.5 } }
        >
            { subscriptionPresenter.playerProfileStatus() && (
                <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
                    <div ref={ ref }
                         className="bg-[#194555] rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
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
                            <div className="justify-center w-full">
                                <Image
                                    src={ shdwDrive }
                                    width={ 250 }
                                    height={ 250 }
                                    alt='Image of Blink Station 1.'
                                />
                            </div>
                        ) }

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
