import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { autorun } from "mobx";
import { toast } from "sonner";
import { useEffect, FunctionComponent } from "react";

export const Alert: FunctionComponent<{alertMessage?: string}> = observer(({alertMessage}: {alertMessage?: string}) => {
    const playerPresenter = PlayerPresenter.getInstance();

    useEffect(() => {
        const disposer = autorun(() => {
            if (playerPresenter.isConnected && playerPresenter.playerName?.length! > 0) {
                toast.success(`${alertMessage} ${playerPresenter.playerName}!`);
            }
        });

        // Clean up the autorun when the component unmounts
        return () => disposer();
    }, []); // Empty dependency array ensures this runs only once

    return null; // This component doesn't render anything
});
