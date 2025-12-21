// appPrincipal/notification/index.jsx
import { useEffect } from "react";
import { View } from "react-native";
import { NotificationProvider, useNotifications } from "./NotificationContext";
import NotificationDrawer from "./NotificationDrawer";

export default function NotificationPage() {
    return (
        <NotificationProvider>
            <OpenOnMount />
            <NotificationDrawer />
        </NotificationProvider>
    );
}

function OpenOnMount() {
    const { openDrawer } = useNotifications();

    useEffect(() => {
        openDrawer();
    }, []);

    return null;
}
