import {Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../../../components/Header";
import {useRouter} from "expo-router";
import Navbar from "../../../../components/Navbar";
import React from "react";

export default function Index(action){
    const router = useRouter();

    return(
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
            {Platform.OS === "web" && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{flex: 1}}>

                <Header/>
                <View>
                    <Text>
                        DetailProduit
                    </Text>

                    <Pressable style={{margin : 50, padding : 50, backgroundColor : '#2680b8'}}title="Retour" onPress={() => router.push("../boutique")}>
                        <Text>Retour</Text>
                    </Pressable>

                    <TouchableOpacity style={styles.bouton} onPress={action}>
                        <Text style={styles.texteBouton}>Ajouter au panier</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    bouton: {
        backgroundColor: "#07D999",
        paddingVertical: 11,
        borderRadius: 10,
        alignItems: "center",
    },

    texteBouton: {
        color: "white",
        fontWeight: "500",
        fontSize: 14,
    },
})
