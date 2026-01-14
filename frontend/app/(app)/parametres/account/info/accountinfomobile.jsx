import React, {useCallback, useEffect, useState} from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import {useFocusEffect, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../../../../components/Header";
import styles from "../../styles/parametresStyle";
// Importe la fonction de ton fichier api (ajuste le chemin selon ton projet)
import { fetchUserByEmail } from "../../../../../services/user.api";

export default function AccountInfoMobile() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const getUpdatedUser = async () => {
                setLoading(true);
                try {
                    const email = await AsyncStorage.getItem("@auth_email");
                    if (email && isActive) {
                        // On appelle l'API pour être sûr d'avoir le dernier état de la DB
                        const data = await fetchUserByEmail(email);
                        setUser(data);
                    }
                } catch (e) {
                    console.log("Erreur refresh:", e);
                } finally {
                    if (isActive) setLoading(false);
                }
            };

            getUpdatedUser();

            return () => { isActive = false; };
        }, [])
    );
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
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                titre="Informations du compte"
                boutonRetour={true}
                onBack={() => router.back()}
            />

            <ScrollView style={styles.center}>
                <View style={{ paddingVertical: 10 }}>



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

                <View style={{ padding: 20 }}>
                    <Text style={{ color: '#536471', fontSize: 13 }}>
                        Dernière modification : {user?.dateModification ? new Date(user.dateModification).toLocaleDateString() : "Jamais"}
                    </Text>
                </View>

                <View style={{ padding: 16, marginTop: 10 }}>
                    <Pressable
                        onPress={() => router.push("/(app)/parametres/account/info/changeinfomobile")}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#e8f5fe' : 'transparent',
                                borderWidth: 1,
                                borderColor: '#1d9bf0',
                                padding: 14,
                                borderRadius: 25,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        ]}
                    >
                        <Text style={{ color: '#1d9bf0', fontWeight: 'bold', fontSize: 16 }}>
                            Modifier les informations
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}