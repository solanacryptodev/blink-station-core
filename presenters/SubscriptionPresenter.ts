import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { PublicKey, Transaction } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { RootStore } from '@/stores/RootStore';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { MembershipSubscription, TabProps } from "@/lib/types";
import { ATLAS_MINT, CONNECTION, USDC_MINT } from "@/lib/constants";
import { toast } from "sonner";
import { addDaysToDate, formatDate, formatTokenAmount } from '@/lib/utils';
import { Adapter } from "@solana/wallet-adapter-base";

@singleton()
export class SubscriptionPresenter {
    private rootStore: RootStore;
    private static instance: SubscriptionPresenter | null = null;
    displaySubscriptionView: boolean;
    displayValidationView: boolean;
    upgradeModal: boolean;
    subscriptionModal: boolean;
    blinkKey: PublicKey;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.displaySubscriptionView = false;
        this.displayValidationView = false;
        this.upgradeModal = false;
        this.subscriptionModal = false;
        this.blinkKey = new PublicKey(process.env.NEXT_PUBLIC_BLINK_KEY! as string);

        makeObservable( this, {
            displaySubscriptionView: observable,
            displayValidationView: observable,
            upgradeModal: observable,
            subscriptionModal: observable,

            activateSubscriptionModal: action.bound,
            activateUpgradeModal: action.bound,

            player: computed,
            account: computed,
            freeAccount: computed,
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

    get freeAccount(): boolean {
        console.log('Has free account:', this.rootStore.subscriptionStore.hasFreeAccount);
        return this.rootStore.subscriptionStore.hasFreeAccount!;
    }

    get wallet(): Adapter {
        return this.rootStore.walletStore.wallet!;
    }

    activateSubscriptionModal( display: boolean ): void {
        this.subscriptionModal = display;
    }

    activateUpgradeModal( display: boolean ): void {
        this.upgradeModal = display;
    }

    subscriptionTabs(): TabProps {
        return {
            tabOne: 'Traveler',
            tabTwo: 'Station Specialist',
            tabThree: 'Station Captain',
            tabFour: 'Station Commander',
            upgrade: this.upgradeModal
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
                subscribedOn: null,
                membershipStartDate: null,
                membershipEndDate: null,
                chatLogs: []
            }
            const added = await this.rootStore.subscriptionStore.addSubscription( subscription )
            if (added) toast.success('Account created.', {
                richColors: true,
                duration: 5000
            });
        } catch ( error ) {
            toast.error( 'Transaction failed. Please try again.' );
        }
    }

    /* Creates a new account in the DB for a subscriber */
    async subscribePlayer(usdcAmt: number, atlasAmt: number, membershipLevel: Partial<MembershipSubscription>): Promise<void> {
        let transaction = '';
        try {
            transaction = await this.handleSolanaTransfer( usdcAmt, atlasAmt );
            console.log( 'Transaction:', transaction );
            if (transaction.length > 0) {
                const currentDate = new Date();
                const subscription: MembershipSubscription = {
                    playerName: this.rootStore.playerStore.playerName!,
                    publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
                    subscriptionStatus: membershipLevel.subscriptionStatus!,
                    tokenCount: membershipLevel.tokenCount!,
                    createdAt: formatDate( currentDate ),
                    subscribedOn: formatDate( currentDate ),
                    membershipStartDate: currentDate,
                    membershipEndDate: addDaysToDate( currentDate, 30 ),
                    chatLogs: []
                }
                await this.rootStore.subscriptionStore.addSubscription( subscription );
            }
        } catch ( error ) {
            toast.error( 'Transaction failed. Please try again.' );
        }
    }

    /* Upgrades or Re-Subscribes a player that already has an account */
    async upgradeOrReSubscribePlayer(usdcAmt: number, atlasAmt: number, membershipLevel: Partial<MembershipSubscription>): Promise<void> {
        try {
            const transaction = await this.handleSolanaTransfer( usdcAmt, atlasAmt );
            if (transaction.length > 0) {
                const currentDate = new Date();
                const subscription: MembershipSubscription = {
                    playerName: this.rootStore.playerStore.playerName!,
                    publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
                    subscriptionStatus: membershipLevel.subscriptionStatus!,
                    tokenCount: membershipLevel.tokenCount!,
                    createdAt: formatDate( currentDate ),
                    upgradedAt: formatDate( currentDate ),
                    membershipStartDate: currentDate,
                    membershipEndDate: addDaysToDate(currentDate, 30),
                    paidInFull: false,
                    chatLogs: []
                }

                await this.rootStore.subscriptionStore.updateProfile(this.wallet.publicKey?.toString()!, {
                    subscriptionStatus: subscription.subscriptionStatus,
                    tokenCount: subscription.tokenCount,
                    upgradedAt: subscription.upgradedAt,
                    membershipStartDate: subscription.membershipStartDate,
                    membershipEndDate: subscription.membershipEndDate,
                })
            }
        } catch ( error ) {
            toast.error( 'Transaction failed. Please try again.' );
        }
    }

    async deductFromTokenCount(tokenAmount: number): Promise<void> {
        const user = this.account.find(sub => sub.publicKey === this.wallet.publicKey?.toString()!)!;
        const date = new Date();

        try {
            await this.rootStore.subscriptionStore.updateProfile(this.wallet.publicKey?.toString()!, {
                tokenCount: user?.tokenCount! - tokenAmount,
                lastSeenOn: formatDate(date),
            })
        } catch ( error ) {
            toast.error( 'There was an issue updating your token count.' );
        }
    }

    async handleSolanaTransfer(usdcAmt: number, atlasAmt: number): Promise<string> {
        let tx = '';
        try {
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

            tx = await this.rootStore.walletStore.wallet?.sendTransaction( transaction, CONNECTION, {
                preflightCommitment: 'confirmed'
            })!;
        } catch ( error ) {
            toast.error( 'Transaction failed. Please try again.' );
            console.log( 'Error:', error );
        }

        return tx;
    }
}
