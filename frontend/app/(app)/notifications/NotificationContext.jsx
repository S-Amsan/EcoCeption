import {createContext, useContext, useState, useEffect, useMemo} from "react";
import { fetchNotifications } from "../../../services/notifications.api.js";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const openNotifications = () => setIsOpen(true);
    const closeNotifications = () => setIsOpen(false);

    const loadNotifications = async () => {
        try {
            const data = await fetchNotifications();
            setNotifications(data);
        } catch (e) {
            console.error("Erreur notifications :", e);
            setNotifications([]); // <-- stocke les notifications

        }
    };

    // 🔥 recharge quand on ouvre le drawer
    useEffect(() => {
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen]);

    const value = useMemo(() => ({
        isOpen,
        openNotifications,
        closeNotifications,
        notifications,
        setNotifications
    }), [isOpen, openNotifications, closeNotifications, notifications]);

    return (
        <NotificationContext.Provider
            value={value}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
