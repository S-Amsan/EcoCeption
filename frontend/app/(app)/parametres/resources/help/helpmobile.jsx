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

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[styles.settingDesc, { paddingHorizontal: 16, marginBottom: 10 }]}>
                            Comment pouvons-nous vous aider ?
                        </Text>

                        <Pressable style={styles.menuItem}>
                            <Text style={styles.menuLabel}>Mon compte est bloqué</Text>
                            <Text style={styles.chevron}>›</Text>
                        </Pressable>

                        <Pressable style={styles.menuItem}>
                            <Text style={styles.menuLabel}>Signaler un problème technique</Text>
                            <Text style={styles.chevron}>›</Text>
                        </Pressable>

                        <Pressable style={styles.menuItem}>
                            <Text style={styles.menuLabel}>Sécurité et piratage</Text>
                            <Text style={styles.chevron}>›</Text>
                        </Pressable>

                        <Pressable style={styles.menuItem}>
                            <Text style={styles.menuLabel}>Règles de la communauté</Text>
                            <Text style={styles.chevron}>›</Text>
                        </Pressable>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}