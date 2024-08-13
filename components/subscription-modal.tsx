import { FunctionComponent, useRef } from "react";
import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { X } from "react-feather";
import { motion } from "framer-motion";
import { useClickAway } from "react-use";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";


export const SubscriptionModal: FunctionComponent = observer(() => {
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, () => {
        subscriptionPresenter.activateSubscriptionModal(false);
    });

    return (
        <motion.div
            initial={ { opacity: 0, scale: 0 } }
            animate={ { opacity: 1, scale: 1 } }
            transition={ { duration: 0.5 } }
        >
            { subscriptionPresenter.playerProfileStatus() && (
                <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
                    <div ref={ ref }
                         className="bg-[#194555] rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex">
                                { subscriptionPresenter.displaySubscriptionView ?
                                    <h2 className="text-xl font-bold">Choose Your Path</h2> :
                                    <h2 className="text-xl font-bold">Validation Sequence Initiated. One Moment
                                        Please...</h2>
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

                        <div className="flex justify-center">
                            { subscriptionPresenter.displaySubscriptionView ?
                                <div>Subscription View</div> :
                                <div>Validation View</div>
                            }
                        </div>

                    </div>
                </div>
            ) }
        </motion.div>
    )
} )
