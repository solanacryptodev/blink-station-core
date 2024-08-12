import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { FunctionComponent, useRef } from "react";
import { useClickAway } from "react-use";
import { X } from "react-feather";
import { motion } from "framer-motion";

export const WalletModal: FunctionComponent = observer(() => {
    const playerPresenter = PlayerPresenter.getInstance();
    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, () => {
        playerPresenter.activateWalletModal(false);
    });

    return (
        <motion.div
            initial={ { opacity: 0, scale: 0 } }
            animate={ { opacity: 1, scale: 1 } }
            transition={ { duration: 0.5 } }
        >
            <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
                <div
                    ref={ ref }
                    className="bg-[#194555] rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Select a Wallet</h2>
                        <button
                            onClick={ () => playerPresenter.activateWalletModal( false ) }
                            className="text-gray-500 hover:text-white"
                            aria-label="Close"
                        >
                            <X size={ 24 }/>
                        </button>
                    </div>
                    <div className="space-y-2">
                        { playerPresenter.supportedWallets.map( ( wallet ) => (
                            <div
                                key={ wallet.name }
                                className='flex items-center hover:bg-[#4C8A90] pl-3 rounded-lg'
                            >
                                <img src={ wallet.icon } alt={ `${ wallet.name } icon` } className="size-8"/>
                                <button
                                    onClick={ () => playerPresenter.handleConnect( wallet ) }
                                    className="w-full text-left p-3 rounded-md text-amber-100 transition-colors duration-200 flex items-center space-x-3"
                                >
                                    <span>{ wallet.name }</span>
                                </button>
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>
        </motion.div>
    );
} );
