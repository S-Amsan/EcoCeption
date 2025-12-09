import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, usePathname } from "expo-router";

import IconAccueil from "../assets/icones/Navbar/Acceuil.png";
import IconMission from "../assets/icones/Navbar/Mission.png";
import IconNotif from "../assets/icones/Navbar/Notification.png";
import IconBoutique from "../assets/icones/Navbar/Boutique.png";
import IconParam from "../assets/icones/Navbar/Parametres.png";
import IconQrCode from "../assets/icones/Navbar/QrCode.png";
import IconTrophy from "../assets/icones/Navbar/Social.png";

import IconAccueilOn from "../assets/icones/Navbar/AccueilOn.png";
import IconMissionOn from "../assets/icones/Navbar/MissionOn.png";
import IconNotifOn from "../assets/icones/Navbar/NotificationOn.png";
import IconBoutiqueOn from "../assets/icones/Navbar/BoutiqueOn.png";
import IconParamOn from "../assets/icones/Navbar/ParametresOn.png";
import IconQrCodeOn from "../assets/icones/Navbar/QrCodeOn.png";
import IconTrophyOn from "../assets/icones/Navbar/SocialOn.png";

import style from "./styles/StyleNavbar";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        { id: "accueil", label: "Accueil", Icon: IconAccueil, IconActive: IconAccueilOn },
        { id: "missions", label: "Missions", Icon: IconMission, IconActive: IconMissionOn },
        { id: "social", label: "Social", Icon: IconTrophy, IconActive: IconTrophyOn },
        { id: "boutique", label: "Boutique", Icon: IconBoutique, IconActive: IconBoutiqueOn },
        { id: "qrcode", label: "QR Code", Icon: IconQrCode, IconActive: IconQrCodeOn },
        { id: "notifications", label: "Notifications", Icon: IconNotif, IconActive: IconNotifOn },
        { id: "parametres", label: "Paramètres", Icon: IconParam, IconActive: IconParamOn },
    ];

    return (
        <LinearGradient colors={["#1DDE9A", "#1FDDA0"]} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

                <View style={style.titleContainer}>
                    <Image
                        source={require("../assets/logo.png")}
                        style={style.logo}
                        resizeMode="contain"
                    />
                    <Text style={style.title}>Ecoception</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    {tabs.map((tab) => {
                        const isActive = pathname === `/appPrincipal/${tab.id}`;
                        const IconComponent = isActive ? tab.IconActive : tab.Icon;

                        return (
                            <TouchableOpacity
                                key={tab.id}
                                style={style.tabs}
                                activeOpacity={0.7}
                                onPress={() => router.push(`/appPrincipal/${tab.id}`)}
                            >
                                <Image
                                    source={IconComponent}
                                    style={[style.Icon, !isActive && { opacity: 0.45 }]}
                                />
                                <Text
                                    style={[
                                        style.IconText,
                                        isActive
                                            ? { color: "#FFFFFF", fontWeight: "600" }
                                            : { color: "#107956", fontWeight: "400" },
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

            </ScrollView>
        </LinearGradient>
    );
};

export default Navbar;