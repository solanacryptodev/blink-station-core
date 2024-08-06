import { observer } from "mobx-react-lite";
import { WalletPresenter } from "@/presenters/WalletPresenter";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { IconVercel } from '@/components/ui/icons'
import { FunctionComponent } from "react";

interface WalletButtonProps {
    backgroundColor: string,
    hoverColor: string,
    status: string
}

export const WalletButton: FunctionComponent<WalletButtonProps> = observer(({ backgroundColor, hoverColor, status }: WalletButtonProps) => {
    const wallet = WalletPresenter.getInstance();
    // console.log('public key...', wallet.walletStore.publicKey?.toString());

    return (
        <>
            {status === 'Connect' ? (
                <Button
                    className="transition-colors duration-200"
                    style={{
                            backgroundColor: `#${backgroundColor}`,
                        }}
                    onClick={() => wallet.activateWalletModal(true) }>
                    <IconVercel className="mr-2" />
                    <div className="text-white hidden sm:block">{status} Your Wallet</div>
                    <div className="text-white sm:hidden">{status}</div>
                </Button>
            ) : (
                <Button
                    className="transition-colors duration-200"
                    style={{
                        backgroundColor: `#${backgroundColor}`,
                    }}
                    onClick={() => wallet.handleDisconnect() }>
                    <Image
                        alt='Wallet Icon'
                        src={wallet.walletStore.wallet?.icon!}
                        height={25}
                        width={25}
                        className="mr-2"
                    />
                    <div className="hidden sm:block">{status}</div>
                    <div className="sm:hidden">{status}</div>
                </Button>
            )}
        </>
    )
})
