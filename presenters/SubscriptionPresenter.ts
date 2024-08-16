import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { Transaction, PublicKey } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { RootStore } from '@/stores/RootStore';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { MembershipSubscription, TabProps } from "@/lib/types";
import { CONNECTION, USDC_MINT, ATLAS_MINT } from "@/lib/constants";
import { toast } from "sonner";
import { formatDate, formatTokenAmount, addDaysToDate } from '@/lib/utils';
import { Adapter } from "@solana/wallet-adapter-base";

@singleton()
export class SubscriptionPresenter {
    private rootStore: RootStore;
    private static instance: SubscriptionPresenter | null = null;
    displaySubscriptionView: boolean;
    displayValidationView: boolean;
    subscriptionModal: boolean;
    blinkKey: PublicKey;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.displaySubscriptionView = false;
        this.displayValidationView = false;
        this.subscriptionModal = false;
        this.blinkKey = new PublicKey(process.env.NEXT_PUBLIC_BLINK_KEY! as string);

        makeObservable( this, {
            displaySubscriptionView: observable,
            displayValidationView: observable,
            subscriptionModal: observable,

            activateSubscriptionModal: action.bound,

            player: computed,
            account: computed,
            wallet: computed,
        } )
    }

    static getInstance(): SubscriptionPresenter {
        if ( !SubscriptionPresenter.instance ) {
            SubscriptionPresenter.instance = new SubscriptionPresenter();
        }
        return SubscriptionPresenter.instance;
    }

    get player(): string {
        return this.rootStore.playerStore.playerName!;
    }

    get account(): MembershipSubscription[] {
        return this.rootStore.subscriptionStore.playerAcct;
    }

    get wallet(): Adapter {
        return this.rootStore.walletStore.wallet!;
    }

    activateSubscriptionModal( display: boolean ): void {
        this.subscriptionModal = display;
    }

    subscriptionTabs(): TabProps {
        return {
            tabOne: 'Traveler',
            tabTwo: 'Station Specialist',
            tabThree: 'Station Captain',
            tabFour: 'Station Commander'
        }
    }

    /* Checks to validate existence of player account in DB */
    async playerSubscriptionStatus(): Promise<void> {
        this.activateSubscriptionModal(true);
        const setupSub: Partial<MembershipSubscription> = {
            publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
        }
        const data = await this.rootStore.subscriptionStore.setSubscriptions( setupSub );

        if ( !data ) {
            runInAction( () => {
                this.displaySubscriptionView = true;
            })
        } else {
            runInAction( () => {
                this.displayValidationView = true;
            })
            this.activateSubscriptionModal(false);
        }
    }

    /* Creates a new account in DB for new user at free level */
    async joinFreePlayer(membershipLevel: Partial<MembershipSubscription>): Promise<void> {
        try {
            const date = new Date();
            const subscription: MembershipSubscription = {
                playerName: this.rootStore.playerStore.playerName!,
                publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
                subscriptionStatus: membershipLevel.subscriptionStatus!,
                tokenCount: membershipLevel.tokenCount!,
                createdAt: formatDate( date ),
                updatedAt: formatDate( date ),
                membershipStartDate: null,
                membershipEndDate: null,
                paidInFull: false,
                chatLogs: []
            }
            const added = await this.rootStore.subscriptionStore.addSubscription( subscription )
            if (added) toast.success('Account created.');
        } catch ( error ) {
            toast.error( 'Transaction failed. Please try again.' );
        }
    }

    /* Creates a new account in the DB for a subscriber */
    async subscribePlayer(usdcAmt: number, atlasAmt: number, membershipLevel: Partial<MembershipSubscription>): Promise<void> {
        // return ATA accounts for payer and receiver
        const payerUSDCTokenAccount = await getAssociatedTokenAddress(USDC_MINT, this.rootStore.walletStore.wallet?.publicKey!);
        const payerAtlasTokenAccount = await getAssociatedTokenAddress(ATLAS_MINT, this.rootStore.walletStore.wallet?.publicKey!);
        const recipientUSDCTokenAccount = await getAssociatedTokenAddress(USDC_MINT, this.blinkKey);
        const recipientAtlasTokenAccount = await getAssociatedTokenAddress(ATLAS_MINT, this.blinkKey);

        const usdcTokenAmount = formatTokenAmount(usdcAmt, 6);
        const atlasTokenAmount = formatTokenAmount(atlasAmt, 8);

        const transaction = new Transaction();

        // transaction that transfers USDC, then ATLAS
        transaction
            .add(createTransferInstruction(
                payerUSDCTokenAccount,
                recipientUSDCTokenAccount,
                this.rootStore.walletStore.wallet?.publicKey!,
                usdcTokenAmount
            )).add(createTransferInstruction(
                payerAtlasTokenAccount,
                recipientAtlasTokenAccount,
                this.rootStore.walletStore.wallet?.publicKey!,
                atlasTokenAmount
        ))

        transaction.feePayer = this.rootStore.walletStore.wallet?.publicKey!;
        const latestBlockhash = await CONNECTION.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash;

        const tx = await this.rootStore.walletStore.wallet?.sendTransaction(transaction, CONNECTION, {
            preflightCommitment: 'confirmed'
        })!;

        if (tx) {
            const currentDate = new Date();
            const subscription: MembershipSubscription = {
                playerName: this.rootStore.playerStore.playerName!,
                publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
                subscriptionStatus: membershipLevel.subscriptionStatus!,
                tokenCount: membershipLevel.tokenCount!,
                createdAt: formatDate(currentDate),
                updatedAt: formatDate(currentDate),
                membershipStartDate: currentDate,
                membershipEndDate: addDaysToDate(currentDate, 30),
                paidInFull: false,
                chatLogs: []
            }
            await this.rootStore.subscriptionStore.addSubscription( subscription )
        } else {
            toast.error( 'Transaction failed. Please try again.' );
        }
    }

    /* Upgrades or Re-Subscribes a player that already has an account */
    async upgradeOrReSubscribePlayer(usdcAmt: number, atlasAmt: number, membershipLevel: Partial<MembershipSubscription>): Promise<void> {
        try {
            const date = new Date();
            const subscription: MembershipSubscription = {
                playerName: this.rootStore.playerStore.playerName!,
                publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
                subscriptionStatus: membershipLevel.subscriptionStatus!,
                tokenCount: membershipLevel.tokenCount!,
                createdAt: formatDate( date ),
                updatedAt: formatDate( date )
            }
            // await this.rootStore.subscriptionStore.upgradeSubscription( subscription )
        } catch ( error ) {
            toast.error( 'Transaction failed. Please try again.' );
        }
    }

    async deductFromTokenCount(tokenAmount: number): Promise<void> {
        const user = this.account.find(sub => sub.publicKey === this.wallet.publicKey?.toString()!)!;

        await this.rootStore.subscriptionStore.updateProfile(this.wallet.publicKey?.toString()!, {
            tokenCount: user?.tokenCount! - tokenAmount
        })
    }
}
