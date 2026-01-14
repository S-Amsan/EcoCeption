import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Header from "../../../../../components/Header"; // Ajuste le nombre de ../ selon la profondeur
import styles from "../../styles/parametresStyle";

export default function SubSectionMobileTemplate() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* HEADER : Garde le même style, affiche le titre et gère le retour */}
            <Header
                titre="Ressources" // <--- À CHANGER POUR CHAQUE PAGE
                boutonRetour={true}
                onBack={() => router.back()}
            />

            <ScrollView style={styles.center}>
                <View style={{ paddingVertical: 10 }}>

                    <View style={{ padding: 16 }}>
                        <Text style={[styles.settingTitle, { fontSize: 18, marginBottom: 15 }]}>
                            Utilisation de vos données
                        </Text>

                        <Text style={[styles.settingDesc, { lineHeight: 20, marginBottom: 20 }]}>
                            Nous collectons des informations pour fournir de meilleurs services à tous nos utilisateurs.
                        </Text>

                        {/* Section interactive pour la confidentialité */}
                        <Text style={[styles.settingTitle, { fontSize: 14, color: '#536471', marginBottom: 10 }]}>
                            VOS CHOIX
                        </Text>

                        <Pressable style={[styles.menuItem, { paddingHorizontal: 0 }]}>
                            <Text style={styles.menuLabel}>Partage de données publicitaires</Text>
                            <Text style={{ color: '#536471' }}>Désactivé</Text>
                        </Pressable>

                        <Pressable style={[styles.menuItem, { paddingHorizontal: 0 }]}>
                            <Text style={styles.menuLabel}>Historique de localisation</Text>
                            <Text style={{ color: '#1d9bf0', fontWeight: 'bold' }}>Activé</Text>
                        </Pressable>

                        <Text style={[styles.settingDesc, { marginTop: 20, fontStyle: 'italic' }]}>
                            Vous pouvez demander la suppression de toutes vos données personnelles via la section "Désactiver le compte".
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}