import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { autorun } from "mobx";
import { toast } from "sonner";
import { useEffect, FunctionComponent } from "react";

interface AlertProps {
    alertMessageOne?: string
    alertMessageTwo?: string
}

export const Alert: FunctionComponent<AlertProps> = observer(({alertMessageOne, alertMessageTwo}: AlertProps) => {
    const playerPresenter = PlayerPresenter.getInstance();

    useEffect(() => {
        const disposer = autorun(() => {
            if (playerPresenter.isConnected && playerPresenter.playerName?.length! > 0) {
                toast.success(`${alertMessageOne} ${playerPresenter.playerName}! ${alertMessageTwo}`, {
                    richColors: true,
                    duration: 5000,
                });
            }
        });

        // Clean up the autorun when the component unmounts
        return () => disposer();
    }, []); // Empty dependency array ensures this runs only once

    return null; // This component doesn't render anything
});
