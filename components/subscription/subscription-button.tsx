import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { MembershipSubscription } from "@/lib/types";

interface SubscriptionButtonProps {
    buttonText: string;
    membershipType: MembershipSubscription['subscriptionStatus'];
}

export const SubscriptionButton: FunctionComponent<{ data: SubscriptionButtonProps }> = observer(({data} : { data: SubscriptionButtonProps }) => {
    const subscriptionPresenter = SubscriptionPresenter.getInstance();

    return (
        <>
            {data.membershipType === 'traveler' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.joinFreePlayer({
                        subscriptionStatus: 'traveler',
                        tokenCount: 3000
                    })}>
                    { data.buttonText }
                </button>
            )}

            {data.membershipType === 'specialist' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.subscribePlayer(1,1, {
                        subscriptionStatus: 'specialist',
                        tokenCount: 7000
                    })}>
                    { data.buttonText }
                </button>
            )}

            {data.membershipType === 'captain' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.subscribePlayer(2,2, {
                        subscriptionStatus: 'captain',
                        tokenCount: 10000
                    })}>
                    { data.buttonText }
                </button>
            )}

            {data.membershipType === 'commander' && (
                <button
                    className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
                    onClick={ () => subscriptionPresenter.subscribePlayer(3,3, {
                        subscriptionStatus: 'commander',
                        tokenCount: 15000
                    })}>
                    { data.buttonText }
                </button>
            )}
        </>
    )
} )
