import React from 'react';
import { Drawer } from 'expo-router/drawer';
import Navbar from '../../components/Navbar';

export default function AppPrincipalLayout() {
    return (
        <Drawer
            drawerContent={(props) => <Navbar {...props} />}
            screenOptions={{
                drawerPosition: 'left',
                drawerStyle: {
                    height:'100%',
                },
                headerShown: false,
                swipeEnabled: true,
            }}
        >
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Accueil',
                    title: 'Accueil',
                }}
            />
            <Drawer.Screen
                name="missions"
                options={{
                    drawerLabel: 'Missions',
                    title: 'Missions',
                }}
            />
            <Drawer.Screen
                name="social"
                options={{
                    drawerLabel: 'Social',
                    title: 'Social',
                }}
            />
            <Drawer.Screen
                name="boutique"
                options={{
                    drawerLabel: 'Boutique',
                    title: 'Boutique',
                }}
            />
            <Drawer.Screen
                name="qrcode"
                options={{
                    drawerLabel: 'QR Code',
                    title: 'QR Code',
                }}
            />
            <Drawer.Screen
                name="notifications"
                options={{
                    drawerLabel: 'Notifications',
                    title: 'Notifications',
                }}
            />
            <Drawer.Screen
                name="parametre"
                options={{
                    drawerLabel: 'Paramètre',
                    title: 'Paramètre',
                }}
            />
        </Drawer>
    );
}