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

                        <View style={{ padding: 20 }}>
                            <Text style={[styles.settingTitle, { fontSize: 22, marginBottom: 15 }]}>
                                Charte du Collecteur Ecoception
                            </Text>

                            <Text style={[styles.settingDesc, { lineHeight: 22, color: '#000' }]}>
                                <Text style={{ fontWeight: 'bold' }}>1. Engagement de sincérité</Text>{"\n"}
                                En utilisant l'application, vous vous engagez à prendre des photos réelles de déchets ramassés. Toute tentative de fraude (photos Internet, photos répétées) entraînera une remise à zéro de vos points.{"\n\n"}

                                <Text style={{ fontWeight: 'bold' }}>2. Validation des points</Text>{"\n"}
                                Les points sont attribués après analyse de la photo. Nous nous réservons le droit de refuser une action si le déchet n'est pas clairement identifiable ou si le lieu semble inapproprié.{"\n\n"}

                                <Text style={{ fontWeight: 'bold' }}>3. Sécurité lors du ramassage</Text>{"\n"}
                                L'utilisateur est seul responsable de sa sécurité. Ne ramassez jamais de déchets dangereux (seringues, produits chimiques, verre brisé) sans équipement de protection adéquat.{"\n\n"}

                                <Text style={{ fontWeight: 'bold' }}>4. Utilisation des récompenses</Text>{"\n"}
                                Les points et trophées gagnés n'ont pas de valeur monétaire réelle, sauf indication contraire dans le cadre d'un partenariat spécifique avec nos sponsors.
                            </Text>

                            <View style={{ marginTop: 30, padding: 15, backgroundColor: '#f7f9f9', borderRadius: 10 }}>
                                <Text style={{ fontSize: 12, color: '#536471', textAlign: 'center' }}>
                                    Règlement mis à jour le : 14 Janvier 2026
                                </Text>
                            </View>
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