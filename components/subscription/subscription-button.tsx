import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";

interface SubscriptionButtonProps {
    buttonText: string
}

export const SubscriptionButton: FunctionComponent<{ data: SubscriptionButtonProps }> = observer(({data} : { data: SubscriptionButtonProps }) => {
    const subscriptionPresenter = SubscriptionPresenter.getInstance();

    return (
        <button
            className="bg-[#90724A] text-white py-2 px-4 rounded-lg hover:bg-[#54422D] border-4 border-[#8F6B34]"
            onClick={() => console.log('button clicked')}>
            {data.buttonText}
        </button>
    )
})
