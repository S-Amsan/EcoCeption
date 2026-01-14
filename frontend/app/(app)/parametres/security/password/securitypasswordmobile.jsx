import React from "react";
import {View, Text, ScrollView, Pressable, TextInput} from "react-native";
import { useRouter } from "expo-router";
import Header from "../../../../../components/Header"; // Ajuste le nombre de ../ selon la profondeur
import styles from "../../styles/parametresStyle";

export default function SubSectionMobileTemplate() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* HEADER : Garde le même style, affiche le titre et gère le retour */}
            <Header
                titre="Sécurité" // <--- À CHANGER POUR CHAQUE PAGE
                boutonRetour={true}
                onBack={() => router.back()}
            />

            <ScrollView style={styles.center}>
                <View style={{ paddingVertical: 10 }}>

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

                </View>
            </ScrollView>
        </View>
    );
}