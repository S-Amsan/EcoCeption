import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]); // <-- stocke les notifications

    const openNotifications = () => setIsOpen(true);
    const closeNotifications = () => setIsOpen(false);

    const addNotification = (notif) => {
        setNotifications((prev) => [...prev, notif]);
    };
    return (
        <NotificationContext.Provider
            value={{ isOpen, openNotifications, closeNotifications, notifications, addNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
