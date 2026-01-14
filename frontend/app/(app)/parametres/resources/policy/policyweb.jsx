import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Navbar from "../../../../../components/Navbar";
import Header from "../../../../../components/Header";
import styles from "../../styles/parametresStyle";

export default function SubSectionWebTemplate() {
    const router = useRouter();

    return (
        <View style={styles.page}>
            {/* COLONNE 1 : NAVBAR (STRICTEMENT INCHANGÉE) */}
            <View style={styles.navbar}>
                <Navbar />
                <Header />
            </View>

            {/* COLONNE 2 : CONTENU CENTRAL */}
            <View style={styles.container}>
                {/* Ici on garde TON Header.
                   Si ton Header ne l'affiche pas, le bouton Pressable ci-dessous force le retour.
                */}
                <Header titre="Paramètres" boutonRetour={true} onBack={() => router.back()} />

                <View style={styles.center}>
                    <ScrollView>
                        {/* BOUTON RETOUR MANUEL (Au cas où ton Header ne l'affiche pas sur Web) */}
                        <Pressable
                            onPress={() => router.back()}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: '#eff3f4'
                            }}
                        >
                            <Text style={{ fontSize: 20, marginRight: 10 }}>←</Text>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>Retour aux paramètres</Text>
                        </Pressable>

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
                    </ScrollView>
                </View>
            </View>

            {/* COLONNE 3 : DROITE (VIDE POUR LE DESIGN) */}
            <View style={styles.right}>
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        <Text style={styles.settingDesc}>
                            Informations complémentaires sur cette section.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}