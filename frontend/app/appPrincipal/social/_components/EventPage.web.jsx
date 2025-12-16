import { ScrollView, Text, View, Image} from "react-native";
import React from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import cible from "../../../../assets/icones/social/cible.png";
import horloge from "../../../../assets/icones/social/horloge.png";

import styles from "./styles/styles";

const EVENT_CONFIG = {
    concours: {
        titre : "Concours", color : "#FFD54F"
    },
    evenement: {
        titre : "Événements", color : "#E7A2F0"
    },
}

const EnCours = () => {
    return (
        <View>
            <View style={styles.partieInfoContainer}>
                <View style={styles.nomEventContainer}>
                    <Text style={styles.nomEventText}>Concours du 11/25</Text>
                </View>
                <View style={styles.InfoEventWrapper}>
                    <View style={styles.InfoEventContainer}>
                        <Image source={cible} style={styles.InfoEventImage}></Image>
                        <Text style={styles.InfoEventNom}>Objectif : atteindre 10 000 points</Text>
                    </View>
                    <View style={styles.InfoEventContainer}>
                        <Image source={horloge} style={styles.InfoEventImage}></Image>
                        <Text style={styles.InfoEventNom}>Fin dans 19 jours </Text>
                    </View>
                </View>
            </View>

            <View style={styles.carteInfoContainer}></View>
            <View style={styles.boutonsContainer}></View>
            <View style={styles.infosContainer}></View>
        </View>
    );
};

const Statistiques = () => {
    return (
        <View>
            <Text>Contenu Statistiques</Text>
        </View>
    );
};

export default function EventPage({type, event_DATA, event_user_DATA, user_DATA}) {
    const ongletsWeb = [
        { id: "classement", label: "Leaderboard", page: "social/classement" },
        { id: "concours", label: "Concours", page: "social/concours" },
        { id: "evenements", label: "Événements", page: "social/evenements" },
    ];

    return (
        <View style={styles.container}>

            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            <View style={{ flex: 1 }}>
                    <Header userDetails={true} />

                <ScrollView>
                        <TabNavbarWeb onglets={ongletsWeb} pageBack={"social"} />
                    <Text>{EVENT_CONFIG[type].titre}</Text>
                    <EnCours/>
                    <Statistiques/>

                </ScrollView>
            </View>
        </View>
    );
}
