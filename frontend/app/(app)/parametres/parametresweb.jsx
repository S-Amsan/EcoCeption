import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import styles from "./styles/parametresStyle";
import { deleteMyAccount } from "../../../services/user.api";

/* ===== MENU GAUCHE (IDENTIQUE MOBILE) ===== */
const SETTINGS_MENU = [
    { key: "account", label: "Votre compte" },
    { key: "security", label: "Sécurité et accès au compte" },
    { key: "privacy", label: "Confidentialité et sécurité" },
    { key: "notifications", label: "Notifications" },
    { key: "accessibility", label: "Thèmes" },
    { key: "resources", label: "Ressources supplémentaires" },
];

/* ===== DÉTAILS (IDENTIQUES MOBILE) ===== */
const SECTION_DETAILS = {
    account: [
        {
            id: "account-info",
            title: "Informations du compte",
            desc: "Consultez les informations de votre compte.",
            route: "/appPrincipal/parametres/account/info",
        },
        {
            id: "account-password",
            title: "Changer le mot de passe",
            desc: "Modifiez votre mot de passe à tout moment.",
        },
        {
            id: "account-disconnection",
            title: "Déconnexion",
            desc: "Déconnectez-vous.",
        },
        {
            id: "account-disable",
            title: "Désactiver le compte",
            desc: "Supprimer définitivement votre compte.",
            danger: true,
        },
    ],
    security: [
        {
            id: "security-main",
            title: "Sécurité du compte",
            desc: "Gérez la sécurité de votre compte.",
        },
        {
            id: "security-password",
            title: "Changer le mot de passe",
            desc: "Renforcez la sécurité de votre compte.",
        },
        {
            id: "security-2fa",
            title: "Authentification à deux facteurs",
            desc: "Ajoutez une couche de sécurité.",
        },
    ],
    privacy: [
        {
            id: "privacy-account",
            title: "Confidentialité du compte",
            desc: "Gérez la visibilité de vos informations.",
        },
        {
            id: "privacy-visibility",
            title: "Visibilité du profil",
            desc: "Contrôlez la visibilité de votre profil.",
        },
    ],
    notifications: [
        {
            id: "notif-pref",
            title: "Préférences de notifications",
            desc: "Choisissez comment vous recevez les notifications.",
        },
    ],
    accessibility: [
        { id: "dark", title: "Sombre" },
        { id: "light", title: "Clair" },
    ],
    resources: [
        {
            id: "help",
            title: "Centre d’aide",
            desc: "Consultez les réponses aux questions fréquentes.",
        },
        {
            id: "terms",
            title: "Conditions d’utilisation",
            desc: "Lisez les règles du service.",
        },
        {
            id: "privacy-policy",
            title: "Politique de confidentialité",
            desc: "Découvrez comment vos données sont utilisées.",
        },
    ],
};

export default function ParametresWeb() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("account");
    const [activeSetting, setActiveSetting] = useState(null);

    /* ===== ACTIONS ===== */

    const logout = async () => {
        await AsyncStorage.removeItem("@auth_token");
        await AsyncStorage.removeItem("@auth_email");
        await AsyncStorage.removeItem("@auth_user");
        router.replace("/Login");
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteMyAccount();
            await logout();
        } catch {
            Alert.alert("Erreur", "Impossible de supprimer le compte");
        }
    };

    const confirmDisableAccount = () => {
        Alert.alert(
            "Désactiver le compte",
            "Êtes-vous sûr de vouloir désactiver votre compte ?",
            [
                { text: "Non", style: "cancel" },
                {
                    text: "Oui, je suis sûr",
                    style: "destructive",
                    onPress: handleDeleteAccount,
                },
            ]
        );
    };

    /* ===== ITEM ===== */

    const SettingItem = ({ id, title, desc, danger }) => (
        <Pressable
            onPress={() => {
                setActiveSetting(id);

                if (id === "account-disconnection") logout();
                if (id === "account-disable") confirmDisableAccount();
            }}
            style={({ hovered }) => [
                danger ? styles.settingItemDanger : styles.settingItem,
                hovered && styles.settingItemHover,
                activeSetting === id && styles.settingItemActive,
            ]}
        >
            <Text style={danger ? styles.settingDanger : styles.settingTitle}>
                {title}
            </Text>
            {desc && <Text style={styles.settingDesc}>{desc}</Text>}
        </Pressable>
    );

    /* ===== PANNEAU DROIT ===== */

    const renderRightPanel = () => (
        <>
            <Text style={styles.rightTitle}>
                {SETTINGS_MENU.find((s) => s.key === activeSection)?.label}
            </Text>

            {SECTION_DETAILS[activeSection]?.map((item) => (
                <SettingItem key={item.id} {...item} />
            ))}
        </>
    );

    return (
        <View style={styles.page}>
                <View style={styles.navbar}>
                    <Navbar />
                    <Header />
                </View>

            <View style={styles.container}>
                <Header />
                <View style={styles.center}>
                    <ScrollView>
                        <Text style={styles.pageTitle}>Paramètres</Text>
                        {SETTINGS_MENU.map((item) => (
                            <Pressable
                                key={item.key}
                                onPress={() => {
                                    setActiveSection(item.key);
                                    setActiveSetting(null);
                                }}
                                style={({ hovered }) => [
                                    styles.menuItem,
                                    hovered && styles.menuItemHover,
                                    activeSection === item.key && styles.menuItemActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.menuLabel,
                                        activeSection === item.key && styles.menuLabelActive,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                                <Text style={styles.chevron}>›</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>

                <View style={styles.right}>
                    <ScrollView>{renderRightPanel()}</ScrollView>
                </View>
        </View>
    );
}
