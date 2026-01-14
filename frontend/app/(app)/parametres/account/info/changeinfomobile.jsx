import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../../../../components/Header";
import styles from "../../styles/parametresStyle";
import { fetchUserByEmail, updateMyAccount } from "../../../../../services/user.api";

export default function AccountUpdateMobile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // État du formulaire basé sur les champs de ton API
    const [form, setForm] = useState({
        pseudo: "",
        email: "",
        name: "",
        phone: "",
        age: "",
        password: "" // Optionnel pour l'update selon ton API
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const email = await AsyncStorage.getItem("@auth_email");
                if (email) {
                    const data = await fetchUserByEmail(email);
                    setForm({
                        pseudo: data.pseudo || "",
                        email: data.email || "",
                        name: data.name || "",
                        phone: data.phone || "",
                        age: String(data.age) || "",
                        password: ""
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const handleSave = async () => {
        if (!form.pseudo || !form.email) {
            Alert.alert("Erreur", "Le pseudo et l'email sont obligatoires.");
            return;
        }

        setUpdating(true);
        try {
            // 1. On envoie l'update
            await updateMyAccount(
                form.pseudo,
                form.email,
                form.name,
                form.password, // peut être vide
                form.phone,
                form.age
            );

            // 2. IMPORTANT : On attend un tout petit peu que la DB se mette à jour
            // et on récupère les nouvelles données du serveur
            const freshData = await fetchUserByEmail(form.email);

            // 3. On écrase le stockage local avec les infos fraîches
            await AsyncStorage.setItem("@auth_user", JSON.stringify(freshData));
            await AsyncStorage.setItem("@auth_email", freshData.email);

            Alert.alert("Succès", "Profil mis à jour avec succès !", [
                {
                    text: "OK",
                    onPress: () => router.replace("/(app)/parametres/account/info")
                }
            ]);
        } catch (e) {
            console.error("Erreur lors de l'update:", e);
            Alert.alert("Erreur", "L'API n'a pas pu mettre à jour les données.");
        } finally {
            setUpdating(false);
        }
    };
    if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#1d9bf0" />;

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                titre="Modifier le profil"
                boutonRetour={true}
                onBack={() => router.back()}
            />

            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 16 }}>

                    {/* INPUTS STYLE TWITTER */}
                    <Text style={styles.settingTitle}>Pseudo</Text>
                    <TextInput
                        style={styles.inputUpdate} // Ajoute ce style ou utilise un standard
                        value={form.pseudo}
                        onChangeText={(t) => setForm({...form, pseudo: t})}
                        placeholder="Pseudo"
                    />

                    <Text style={styles.settingTitle}>Nom complet</Text>
                    <TextInput
                        style={styles.inputUpdate}
                        value={form.name}
                        onChangeText={(t) => setForm({...form, name: t})}
                        placeholder="Nom"
                    />

                    <Text style={styles.settingTitle}>E-mail</Text>
                    <TextInput
                        style={styles.inputUpdate}
                        value={form.email}
                        onChangeText={(t) => setForm({...form, email: t})}
                        keyboardType="email-address"
                    />

                    <Text style={styles.settingTitle}>Téléphone</Text>
                    <TextInput
                        style={styles.inputUpdate}
                        value={form.phone}
                        onChangeText={(t) => setForm({...form, phone: t})}
                        placeholder="06..."
                    />

                    <Text style={styles.settingTitle}>Âge</Text>
                    <TextInput
                        style={styles.inputUpdate}
                        value={form.age}
                        onChangeText={(t) => setForm({...form, age: t})}
                        keyboardType="numeric"
                    />

                    <Pressable
                        onPress={handleSave}
                        disabled={updating}
                        style={{
                            backgroundColor: '#1d9bf0',
                            padding: 15,
                            borderRadius: 30,
                            alignItems: 'center',
                            marginTop: 30,
                            opacity: updating ? 0.7 : 1
                        }}
                    >
                        {updating ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Enregistrer les modifications</Text>
                        )}
                    </Pressable>

                </View>
            </ScrollView>
        </View>
    );
}