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
                titre="Confidentialité" // <--- À CHANGER POUR CHAQUE PAGE
                boutonRetour={true}
                onBack={() => router.back()}
            />

            <ScrollView style={styles.center}>
                <View style={{ paddingVertical: 10 }}>

                    <View style={{ paddingVertical: 10 }}>
                        <Pressable style={styles.menuItem}>
                            <Text style={styles.menuLabel}>Protéger vos publications</Text>
                            <Text style={{ color: '#1d9bf0' }}>Désactivé</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem}>
                            <Text style={styles.menuLabel}>Identification photo</Text>
                            <Text style={{ color: '#1d9bf0' }}>Tout le monde</Text>
                        </Pressable>

                    </View>

                </View>
            </ScrollView>
        </View>
    );
}