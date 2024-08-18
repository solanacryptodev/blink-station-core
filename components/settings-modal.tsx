import { observer } from "mobx-react-lite";
import { FunctionComponent, useRef } from "react";
import { motion } from "framer-motion";
import { SettingsPresenter } from "@/presenters/SettingsPresenter";
import { Separator } from "@/components/ui/separator";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { useClickAway } from "react-use";

export const SettingsModal: FunctionComponent = observer(() => {
    const settingsPresenter = SettingsPresenter.getInstance();
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, () => {
        settingsPresenter.activateSettingsModal(false);
    });

    return (
        <>
            {settingsPresenter.modal && settingsPresenter.account && (
                <motion.div
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    transition={ { duration: 0.3 } }
                    className="fixed inset-0 flex items-center justify-center z-40"
                >
                    <div className="flex fixed inset-0 opacity-100 items-center justify-center z-50">
                        <div ref={ref} className="flex bg-[#194555] flex-col rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between flex-row mb-5 items-center">
                                <div className="text-xl">Settings</div>
                                <div
                                    className="text-lg border-amber-500 border-2 rounded-lg cursor-pointer p-2"
                                    onClick={ () => {
                                        subscriptionPresenter.activateUpgradeModal( true );
                                        settingsPresenter.activateSettingsModal( false )
                                    }
                                    }>Upgrade
                                </div>
                            </div>

                            <div className="text-lg mb-4">Music Player Controls</div>
                            {/* MusicPlayerControls Component */ }

                            <div className="flex flex-col">
                                <div className="text-lg">Theme Selector</div>
                                <div className="text-sm">Coming Soon</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
} )
