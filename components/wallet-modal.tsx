import { observer } from "mobx-react-lite";
import { WalletPresenter } from "@/presenters/WalletPresenter";
import { FunctionComponent, useRef } from "react";
import { useClickAway } from "react-use";
import { X } from "react-feather";
import { nanoid } from "nanoid";


export const WalletModal: FunctionComponent = observer(() => {
    const walletPresenter = WalletPresenter.getInstance();

    const ref = useRef(null);

    useClickAway(ref, () => {
        walletPresenter.activateWalletModal(false);
    });

    return (
        <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
            <div
                ref={ref}
                className="bg-[#194555] rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Select a Wallet</h2>
                    <button onClick={() => walletPresenter.activateWalletModal(false)} className="text-gray-500 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-2">
                    {walletPresenter.supportedWallets.map((wallet, index) => (
                        <>
                            <div key={nanoid()} className='flex row items-center hover:bg-[#4C8A90] pl-3 rounded-lg'>
                                <img src={ wallet.icon } alt='' className="size-8"/>
                                <button
                                    key={ index }
                                    onClick={() => (walletPresenter.handleConnect( wallet ))}
                                    className="w-full text-left p-3 rounded-md text-amber-100 transition-colors duration-200 flex items-center space-x-3"
                                >
                                    <span>{ wallet.name }</span>
                                </button>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
})
