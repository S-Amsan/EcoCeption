import React, {useEffect, useState} from "react";
import {View, Text, ScrollView, Pressable, ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";
import Navbar from "../../../../../components/Navbar";
import Header from "../../../../../components/Header";
import styles from "../../styles/parametresStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchUserByEmail} from "../../../../../services/user.api";

export default function SubSectionWebTemplate() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadFreshUserData = async () => {
            try {
                // 1. On récupère l'email stocké à la connexion
                const email = await AsyncStorage.getItem("@auth_email");

                if (email) {
                    // 2. On appelle l'API pour avoir les vraies infos à jour
                    const userData = await fetchUserByEmail(email);
                    setUser(userData);
                }
            } catch (e) {
                console.error("Erreur API:", e);
            } finally {
                setLoading(false);
            }
        };
        loadFreshUserData();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator color="#1d9bf0" />
            </View>
        );
    }

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

                        <View style={{ padding: 20 }}>
                            <Pressable style={styles.menuItem}>
                                <Text style={styles.menuLabel}>Nom d'utilisateur</Text>
                                <Text style={{ color: '#536471' }}>@{user?.pseudo}</Text>
                            </Pressable>

                            <Pressable style={styles.menuItem}>
                                <Text style={styles.menuLabel}>Nom complet</Text>
                                <Text style={{ color: '#536471' }}>{user?.name}</Text>
                            </Pressable>

                            <Pressable style={styles.menuItem}>
                                <Text style={styles.menuLabel}>E-mail</Text>
                                <Text style={{ color: '#536471' }}>{user?.email}</Text>
                            </Pressable>

                            <Pressable style={styles.menuItem}>
                                <Text style={styles.menuLabel}>Téléphone</Text>
                                <Text style={{ color: '#536471' }}>{user?.phone || "Non renseigné"}</Text>
                            </Pressable>

                            <Pressable style={styles.menuItem}>
                                <Text style={styles.menuLabel}>Âge</Text>
                                <Text style={{ color: '#536471' }}>{user?.age} ans</Text>
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
