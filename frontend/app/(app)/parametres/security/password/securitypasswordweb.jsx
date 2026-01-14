import React from "react";
import {View, Text, ScrollView, Pressable, TextInput} from "react-native";
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
                            <Text style={[styles.settingTitle, { marginBottom: 20 }]}>Changez votre mot de passe</Text>
                            <TextInput
                                style={{ borderBottomWidth: 1, borderColor: '#eff3f4', padding: 12, marginBottom: 20 }}
                                placeholder="Ancien mot de passe"
                                secureTextEntry
                            />
                            <TextInput
                                style={{ borderBottomWidth: 1, borderColor: '#eff3f4', padding: 12, marginBottom: 20 }}
                                placeholder="Nouveau mot de passe"
                                secureTextEntry
                            />
                            <Pressable style={{ backgroundColor: '#1d9bf0', padding: 15, borderRadius: 30, alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Mettre à jour le mot de passe</Text>
                            </Pressable>
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