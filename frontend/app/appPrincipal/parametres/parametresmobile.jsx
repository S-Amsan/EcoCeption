import React, { useState } from "react";
import {View, Text, ScrollView, Pressable, Platform} from "react-native";
import Header from "../../../components/Header";
import styles from "./styles/parametresStyle";
import { useRouter } from "expo-router";

const SETTINGS_MENU = [
    { key: "account", label: "Votre compte" },
    { key: "security", label: "Sécurité et accès au compte" },
    { key: "privacy", label: "Confidentialité et sécurité" },
    { key: "notifications", label: "Notifications" },
    { key: "accessibility", label: "Accessibilité, affichage et langues" },
    { key: "resources", label: "Ressources supplémentaires" },
];

// Détails pour chaque section (ce qui était à droite sur le web)
const SECTION_DETAILS = {
    account: [
        { id: "account-info", title: "Informations du compte", desc: "Consultez les informations de votre compte comme votre numéro de téléphone et votre adresse e-mail." },
        { id: "account-password", title: "Changer le mot de passe", desc: "Modifiez votre mot de passe à tout moment." },
        { id: "account-data", title: "Télécharger une archive de vos données", desc: "Obtenez un aperçu des données associées à votre compte." },
        { id: "account-disable", title: "Désactiver le compte", desc: "Découvrez comment désactiver temporairement ou définitivement votre compte.", danger: true },
    ],
    security: [
        { id: "security-main", title: "Sécurité du compte", desc: "Gérez la sécurité de votre compte et protégez-le contre les accès non autorisés." },
        { id: "security-password", title: "Changer le mot de passe", desc: "Mettez à jour votre mot de passe pour renforcer la sécurité de votre compte." },
        { id: "security-2fa", title: "Authentification à deux facteurs", desc: "Ajoutez une couche de sécurité supplémentaire lors de la connexion." },
    ],
    privacy: [
        { id: "privacy-account", title: "Confidentialité du compte", desc: "Gérez qui peut voir votre contenu et interagir avec vous." },
        { id: "privacy-blocked", title: "Comptes bloqués", desc: "Consultez et gérez la liste des comptes que vous avez bloqués." },
        { id: "privacy-visibility", title: "Visibilité du profil", desc: "Contrôlez la visibilité de votre profil et de vos informations personnelles." },
    ],
    notifications: [
        { id: "notif-pref", title: "Préférences de notifications", desc: "Choisissez comment et quand vous recevez des notifications." },
        { id: "notif-push", title: "Notifications push", desc: "Activez ou désactivez les notifications sur votre appareil." },
        { id: "notif-mail", title: "Notifications par e-mail", desc: "Gérez les e-mails que vous recevez concernant votre activité." },
    ],
    accessibility: [
        { id: "accessibility", title: "Accessibilité", desc: "Ajustez l’interface pour améliorer votre expérience d’utilisation." },
        { id: "display", title: "Affichage", desc: "Modifiez le thème, la taille du texte et l’apparence générale." },
        { id: "language", title: "Langue", desc: "Choisissez la langue utilisée dans l’application." },
    ],
    resources: [
        { id: "help", title: "Centre d’aide", desc: "Consultez les réponses aux questions fréquentes." },
        { id: "terms", title: "Conditions d’utilisation", desc: "Lisez les règles et conditions liées à l’utilisation du service." },
        { id: "privacy-policy", title: "Politique de confidentialité", desc: "Découvrez comment vos données sont collectées et utilisées." },
    ],
};
const getTitle = (screen) => {
    switch (screen) {
        case "account": return "Votre compte";
        case "security": return "Sécurité";
        case "notifications": return "Notifications";
        default: return "Paramètres";
    }
};
export default function ParametresMobile() {
    const router = useRouter(); // ✅ OBLIGATOIRE
    const [screen, setScreen] = useState("main");

    const SettingItem = ({ title, desc, danger = false }) => (
        <Pressable
            style={[styles.settingItem, danger && styles.settingItemDanger]}
        >
            <Text style={[styles.settingTitle, danger && styles.settingDanger]}>
                {title}
            </Text>
            <Text style={styles.settingDesc}>{desc}</Text>
        </Pressable>
    );

    return (
        <View style={{ flex: 1 }}>
            {/* HEADER TOUJOURS PRÉSENT */}
            <Header
                titre={getTitle(screen)}
                boutonRetour
                onBack={() => {
                    if (screen === "main") {
                        router.back();   // ← revenir à la page précédente
                    } else {
                        setScreen("main"); // ← revenir au menu paramètres
                    }
                }}
            />

            <ScrollView style={styles.center}>
                {/* ===== PAGE 1 : LISTE DES SECTIONS ===== */}
                {screen === "main" && (
                    SETTINGS_MENU.map((section) => (
                        <Pressable
                            key={section.key}
                            style={styles.menuItem}
                            onPress={() => setScreen(section.key)}
                        >
                            <Text style={styles.menuLabel}>
                                {section.label}
                            </Text>
                            <Text style={styles.chevron}>›</Text>
                        </Pressable>
                    ))
                )}

                {/* ===== PAGE 2 : DÉTAILS ===== */}
                {screen !== "main" &&
                    SECTION_DETAILS[screen]?.map((item) => (
                        <SettingItem
                            key={item.id}
                            title={item.title}
                            desc={item.desc}
                            danger={item.danger}
                        />
                    ))
                }
            </ScrollView>
        </View>
    );
}

