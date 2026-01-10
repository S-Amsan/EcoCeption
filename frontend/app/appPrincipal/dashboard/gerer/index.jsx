import React from "react";
import {View, Text} from "react-native";
import styles from "../../social/index/styles/styles";
import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";


export default function Gerer() {
    const cartesTab = [
        {titre : "SIGNALEMENT", boutonAjouter : false, infoSupplementaire : {text : "signalements en attente"}, couleur : "#EB5254",},
        {titre : "UTILISATEURS", boutonAjouter : false, infoSupplementaire : null, couleur: "",},
        {titre : "GESTES", boutonAjouter : true, infoSupplementaire : null, couleur: "#FF5B02",},
        {titre : "JUSTIFICATIFS", boutonAjouter : false, infoSupplementaire : {text : "signalements en attente"}, couleur: "#525CEB",},
        {titre : "PARTENAIRES", boutonAjouter : true, infoSupplementaire : null, couleur: "#7E58CF",},
        {titre : "RÉCOMPENSES", boutonAjouter : true, infoSupplementaire : null, couleur: "#2DBEBB",},
        {titre : "ÉVÉNEMENTS", boutonAjouter : true, infoSupplementaire : null, couleur: "#E7A2F0",},
        {titre : "CONCOURS", boutonAjouter : true, infoSupplementaire : null, couleur: "#FFD700",},
    ]
    return (
        <View style={styles.container}>
            <View style={{ width: "15%" }}>
                <Navbar/>
            </View>
            <View style={{ flex: 1}}>
                <Header/>
                <View style={styles.contenuContainer}>
                    <Text>Gerer</Text>
                </View>
            </View>
        </View>
    )
};
