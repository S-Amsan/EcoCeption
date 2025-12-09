import { Drawer } from "expo-router/drawer";
import Navbar from "../../components/Navbar";

export default function Layout() {
    return (
        <Drawer
            drawerContent={(props) => <Navbar {...props}/>}
            screenOptions={{
                headerShown: false,
                drawerType: "front",
                drawerStyle: {
                    backgroundColor: "transparent",
                    width: "20%",
                },
                drawerContentContainerStyle: {
                    flex: 1,
                    paddingBottom: 0,
                    backgroundColor: "transparent",
                },
            }}
        >


        <Drawer.Screen name="accueil"/>
            <Drawer.Screen name="missions" />
            <Drawer.Screen name="social" />
            <Drawer.Screen name="boutique" />
            <Drawer.Screen name="qrcode" />
            <Drawer.Screen name="notifications" />
            <Drawer.Screen name="parametres" />
        </Drawer>
    );
}
