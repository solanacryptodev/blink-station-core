import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { X } from "react-feather";
import Image from "next/image";
import { SubscriptionTabs } from "@/components/subscription/subscription-tabs";
import { useRef } from "react";
import { useClickAway } from "react-use";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";


export const UpgradeModal = observer(() => {
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    const ref = useRef<HTMLDivElement>(null);
    const shdwDrive = `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/blinkstation2.png`;

    useClickAway(ref, () => {
        subscriptionPresenter.activateUpgradeModal(false);
    });
    return (
        <>
            {subscriptionPresenter.upgradeModal && subscriptionPresenter.account.length > 0 && (
                <motion.div
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    transition={ { duration: 0.3 } }
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div className="fixed inset-0 opacity-100 flex items-center justify-center z-50">
                        <div ref={ ref } className="bg-gradient-to-r from-[#121B23] to-[#0F4F59] rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex">
                                    <h2 className="text-xl font-bold">Become a Blink Station 10 Member</h2>
                                </div>
                                <button
                                    onClick={ () => subscriptionPresenter.activateUpgradeModal( false ) }
                                    className="text-black hover:text-white"
                                    aria-label="Close"
                                >
                                    <X size={ 24 }/>
                                </button>
                            </div>

                            <div className="justify-center w-full mb-4">
                                <Image
                                    src={ shdwDrive }
                                    width={ 1080 }
                                    height={ 720 }
                                    alt='Image of Blink Station 1.'
                                />
                            </div>

                            <div className="flex flex-col text-white text-lg">
                                <div className="flex justify-start mb-4">
                                    Blink Station 10 was built for players within the Star Atlas ecosystem. A
                                    station
                                    account is the minimum requirement for access to
                                    its array of sophisticated tools. The best tools require a station membership
                                    clearance.
                                    This is due to the operational costs associated with
                                    monthly maintenance. These costs include the database, blockchain data
                                    retrieval, and
                                    the Atlasson artificial intelligence.
                                    The best AI in MRZ-3.
                                </div>
                                <div className="flex justify-start mb-4">
                                    Each membership covers you for a month and there are no recurring fees!
                                    Below, you will see details about what each clearance level provides.
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <SubscriptionTabs data={ subscriptionPresenter.subscriptionTabs() }/> :
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
} )
