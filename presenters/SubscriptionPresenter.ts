import 'reflect-metadata';
import { singleton } from 'tsyringe';
// import { ObjectId } from 'mongodb';
import { Transaction, PublicKey } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { RootStore } from '@/stores/RootStore';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { MembershipSubscription, TabProps } from "@/lib/types";
import { CONNECTION, USDC_MINT, ATLAS_MINT } from "@/lib/constants";
import { toast } from "sonner";
import { formatDate } from '@/lib/utils';

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

    get account() {
        return this.rootStore.subscriptionStore.hasAccount;
    }

    activateSubscriptionModal( display: boolean ): void {
        this.subscriptionModal = display;
    }

    playerProfileStatus(): boolean {
        if ( !this.rootStore.subscriptionStore.hasAccount ) {
            this.activateSubscriptionModal(true);
        }
        return this.rootStore.subscriptionStore.getPlayerProfileStatus;
    }

    subscriptionTabs(): TabProps {
        return {
            tabOne: 'Traveler',
            tabTwo: 'Station Specialist',
            tabThree: 'Station Captain',
            tabFour: 'Station Commander'
        }
    }

    async playerSubscriptionStatus(): Promise<void> {
        const setupSub: MembershipSubscription = {
            playerName: '',
            publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
            subscriptionStatus: 'traveler',
            tokenCount: 0
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
                updatedAt: formatDate( date )
            }
            await this.rootStore.subscriptionStore.addSubscription( subscription )
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


        const transaction = new Transaction();

        // transaction that transfers USDC, then ATLAS
        transaction
            .add(createTransferInstruction(
                payerUSDCTokenAccount,
                recipientUSDCTokenAccount,
                this.rootStore.walletStore.wallet?.publicKey!,
                usdcAmt * 100
            )).add(createTransferInstruction(
                payerAtlasTokenAccount,
                recipientAtlasTokenAccount,
                this.rootStore.walletStore.wallet?.publicKey!,
                atlasAmt * 100
        ))

        transaction.feePayer = this.rootStore.walletStore.wallet?.publicKey!;
        const latestBlockhash = await CONNECTION.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash;

        const tx = await this.rootStore.walletStore.wallet?.sendTransaction(transaction, CONNECTION, {
            preflightCommitment: 'confirmed'
        })!;

        if (tx) {
            const date = new Date();
            const subscription: MembershipSubscription = {
                playerName: this.rootStore.playerStore.playerName!,
                publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
                subscriptionStatus: membershipLevel.subscriptionStatus!,
                tokenCount: membershipLevel.tokenCount!,
                createdAt: formatDate(date),
                updatedAt: formatDate(date)
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
}
