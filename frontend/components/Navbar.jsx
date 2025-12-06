import { View, Text, TouchableOpacity, Image } from 'react-native';
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
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Accueil');

    const tabs = [
        {
            id: 'Accueil',
            Icon: IconAccueil,
            IconActive: IconAccueilOn,
            label: 'Accueil'
        },
        {
            id: 'Missions',
            Icon: IconMission,
            IconActive: IconMissionOn,
            label: 'Missions'
        },
        {
            id: 'Social',
            Icon: IconTrophy,
            IconActive: IconTrophyOn,
            label: 'Social'
        },
        {
            id: 'Boutique',
            Icon: IconBoutique,
            IconActive: IconBoutiqueOn,
            label: 'Boutique'
        },
        {
            id: 'QR Code',
            Icon: IconQrCode,
            IconActive: IconQrCodeOn,
            label: 'QR Code'
        },
        {
            id: 'Notifications',
            Icon: IconNotif,
            IconActive: IconNotifOn,
            label: 'Notifications'
        },
        {
            id: 'Paramètre',
            Icon: IconParam,
            IconActive: IconParamOn,
            label: 'Paramètre'
        },
    ];

    return (
        <LinearGradient colors={['#1DDE9A', '#1FDDA0']}>
            <View style={style.webview}>
                <View style={style.titleContainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={style.logo}
                        resizeMode="contain"
                    />
                    <Text style={style.title}>Ecoception</Text>
                </View>

                <View style={style.tabsContainer}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const IconComponent = isActive ? tab.IconActive : tab.Icon;

                        return (
                            <TouchableOpacity
                                key={tab.id}
                                style={style.tabs}
                                onPress={() => setActiveTab(tab.id)}
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={IconComponent}
                                    style={[style.Icon, !isActive && { opacity: 0.45 }]}
                                />
                                <Text style={[
                                    style.IconText,
                                    isActive
                                        ? { color: '#FFFFFF', fontWeight: '600' }
                                        : { color: '#107956', fontWeight: '400' }
                                ]}>
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </LinearGradient>
    );
};

export default Navbar;
