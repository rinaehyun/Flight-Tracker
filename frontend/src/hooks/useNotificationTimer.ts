import {Dispatch, SetStateAction, useEffect} from "react";

export const useNotificationTimer = (
    showNotification: boolean,
    setShowNotification: Dispatch<SetStateAction<boolean>>
) => {
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showNotification]);
}
