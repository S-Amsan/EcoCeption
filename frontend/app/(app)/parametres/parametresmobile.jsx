import React, { useState } from "react";
import {View, Text, ScrollView, Pressable, Platform, Alert} from "react-native";
import Header from "../../../components/Header";
import styles from "./styles/parametresStyle";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteMyAccount } from "../../../services/user.api";

const SETTINGS_MENU = [
    { key: "account", label: "Votre compte" },
    { key: "security", label: "Sécurité et accès au compte" },
    { key: "privacy", label: "Confidentialité et sécurité" },
    { key: "notifications", label: "Notifications" },
    { key: "accessibility", label: "Thèmes" },
    { key: "resources", label: "Ressources supplémentaires" },
];

const SECTION_DETAILS = {
    account: [
        {
            id: "account-info",
            title: "Informations du compte",
            desc: "Consultez les informations de votre compte.",
            route: "/(app)/parametres/account/info",
        },
        { id: "account-disconnection", title: "Déconnexion", desc: "Déconnectez-vous." },
        { id: "account-disable", title: "Désactiver le compte", desc: "Supprimer définitivement votre compte.", danger: true },
    ],
    security: [
        { id: "security-password", title: "Changer le mot de passe", desc: "Renforcez la sécurité de votre compte.", route: "/(app)/parametres/security/password" },
        { id: "security-2fa", title: "Authentification à deux facteurs", desc: "Ajoutez une couche de sécurité.", route: "/(app)/parametres/security/2fa" },
    ],
    privacy: [
        { id: "privacy-account", title: "Confidentialité du compte", desc: "Gérez la visibilité de vos informations.", route: "/(app)/parametres/privacy/account" },
        { id: "privacy-visibility", title: "Visibilité du profil", desc: "Contrôlez la visibilité de votre profil.", route: "/(app)/parametres/privacy/visibility" },
    ],
    notifications: [
        { id: "notif-pref", title: "Préférences de notifications", desc: "Choisissez comment vous recevez les notifications.", route: "/(app)/parametres/notifications/preferences" },
    ],
    theme: [
        { id: "dark", title: "Sombre", desc: "Activer le mode nuit.", route: "/(app)/parametres/theme/dark" },
        { id: "light", title: "Clair", desc: "Activer le mode jour.", route: "/(app)/parametres/theme/light" },
    ],
    resources: [
        { id: "help", title: "Centre d’aide", desc: "Consultez les réponses aux questions fréquentes.", route: "/(app)/parametres/resources/help" },
        { id: "terms", title: "Conditions d’utilisation", desc: "Lisez les règles du service.", route: "/(app)/parametres/resources/terms" },
        { id: "privacy-policy", title: "Politique de confidentialité", desc: "Découvrez comment vos données sont utilisées.", route: "/(app)/parametres/resources/policy" },
    ],
};

const getTitle = (screen) => {
    switch (screen) {
        case "account": return "Votre compte";
        case "security": return "Sécurité";
        case "privacy": return "Confidentialité";
        case "notifications": return "Notifications";
        case "accessibility": return "Thèmes";
        case "resources": return "Ressources";
        default: return "Paramètres";
    }
};

export default function ParametresMobile() {
    const router = useRouter();
    const [screen, setScreen] = useState("main");

    const logout = async () => {
        await AsyncStorage.removeItem("@auth_token");
        await AsyncStorage.removeItem("@auth_email");
        await AsyncStorage.removeItem("@auth_user");
        router.replace("Login");
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteMyAccount();
            await logout();
        } catch (e) {
            Alert.alert("Erreur", "Impossible de supprimer le compte");
        }
    };

    const confirmDisableAccount = () => {
        Alert.alert(
            "Désactiver le compte",
            "Êtes-vous sûr ? Cette action est irréversible.",
            [
                { text: "Non", style: "cancel" },
                { text: "Oui, je suis sûr", style: "destructive", onPress: handleDeleteAccount }, // ✅ CORRIGÉ ICI
            ]
        );
    };

    const SettingItem = ({ id, title, desc, danger, route }) => (
        <Pressable
            style={[styles.settingItem, danger && styles.settingItemDanger]}
            onPress={() => {
                if (id === "account-disconnection") {
                    logout();
                } else if (id === "account-disable") {
                    confirmDisableAccount();
                } else if (route) {
                    router.push(route); // ✅ CORRIGÉ ICI
                }
            }}
        >
            <Text style={[styles.settingTitle, danger && styles.settingDanger]}>
                {title}
            </Text>
            {desc && <Text style={styles.settingDesc}>{desc}</Text>}
        </Pressable>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                titre={getTitle(screen)}
                boutonRetour
                onBack={() => {
                    if (screen === "main") {
                        router.back();
                    } else {
                        setScreen("main");
                    }
                }}
            />

            <ScrollView style={styles.center}>
                {screen === "main" ? (
                    SETTINGS_MENU.map((section) => (
                        <Pressable
                            key={section.key}
                            style={styles.menuItem}
                            onPress={() => setScreen(section.key)}
                        >
                            <Text style={styles.menuLabel}>{section.label}</Text>
                            <Text style={styles.chevron}>›</Text>
                        </Pressable>
                    ))
                ) : (
                    SECTION_DETAILS[screen]?.map((item) => (
                        <SettingItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            desc={item.desc}
                            danger={item.danger}
                            route={item.route} // ✅ OBLIGATOIRE POUR QUE LE CLIC MARCHE
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}