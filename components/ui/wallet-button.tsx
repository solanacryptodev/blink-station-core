import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
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
    const playerPresenter = PlayerPresenter.getInstance();
    // console.log('public key...', wallet.walletStore.publicKey?.toString());

    return (
        <>
            {status === 'Connect' ? (
                <Button
                    className="transition-colors duration-200"
                    style={{
                            backgroundColor: `#${backgroundColor}`,
                        }}
                    onClick={() => playerPresenter.activateWalletModal(true) }>
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
                    onClick={() => playerPresenter.handleDisconnect() }>
                    <Image
                        alt='Wallet Icon'
                        src={playerPresenter.wallet?.icon!}
                        height={25}
                        width={25}
                        className="mr-2"
                    />
                    <div className="text-white hidden sm:block">{status}</div>
                    <div className="text-white sm:hidden">{status}</div>
                </Button>
            )}
        </>
    )
})
