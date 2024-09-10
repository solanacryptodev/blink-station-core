import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { MembershipSubscription } from "@/lib/types";

interface SubscriptionButtonProps {
    buttonText: string;
    membershipType: MembershipSubscription['subscriptionRank'];
}

export const SubscriptionButton: FunctionComponent<{ data: SubscriptionButtonProps }> = observer(({data} : { data: SubscriptionButtonProps }) => {
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    // console.log('membershipType...', data.membershipType)

    return (
        <>
            {data.membershipType === 'Traveler' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.joinFreePlayer({
                        subscriptionRank: 'Traveler',
                        tokenCount: 30000
                    })}>
                    { data.buttonText }
                </button>
            )}

            {data.membershipType === 'Specialist' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.subscribePlayer(10, 3100, {
                        subscriptionRank: 'Specialist',
                        tokenCount: 1000000
                    })}>
                    { data.buttonText }
                </button>
            )}

            {data.membershipType === 'Captain' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.subscribePlayer(20, 6100, {
                        subscriptionRank: 'Captain',
                        tokenCount: 3000000
                    })}>
                    { data.buttonText }
                </button>
            )}

            {data.membershipType === 'Commander' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.subscribePlayer(30, 9100, {
                        subscriptionRank: 'Commander',
                        tokenCount: 5000000
                    })}>
                    { data.buttonText }
                </button>
            )}
        </>
    )
} )
