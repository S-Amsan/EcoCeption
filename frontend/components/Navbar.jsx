import { View, Text, TouchableOpacity, Image } from 'react-native';
import IconAccueil from "../assets/icones/Accueil.svg";
import IconAccueilOn from "../assets/icones/AccueilOn.svg";
import IconMission from "../assets/icones/Mission.svg";
import IconMissionOn from "../assets/icones/MissionOn.svg";
import IconNotif from "../assets/icones/Notif.svg";
import IconNotifOn from "../assets/icones/NotifOn.svg";
import IconBoutique from "../assets/icones/Boutique.svg";
import IconBoutiqueOn from "../assets/icones/BoutiqueOn.svg";
import IconParam from "../assets/icones/Param.svg";
import IconParamOn from "../assets/icones/ParamOn.svg";
import IconQrCode from "../assets/icones/QrCode.svg";
import IconQrCodeOn from "../assets/icones/QrCodeOn.svg";
import IconTrophy from "../assets/icones/Trophee.svg";
import IconTrophyOn from "../assets/icones/TropheeOn.svg";
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
        <LinearGradient colors={['#00DB83', '#0CD8A9']}>
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
                                style={[
                                    style.tabs,
                                    isActive && {
                                        borderRadius: 10,
                                        marginVertical: 4,
                                    }
                                ]}
                                onPress={() => setActiveTab(tab.id)}
                                activeOpacity={0.7}
                            >
                                <IconComponent style={style.Icon} />
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