import { ScrollView, Text, View, Image} from "react-native";
import React from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import styles from "./styles/styles";

const EVENT_CONFIG = {
    concours: {
        titre : "Concours", color : "#FFD54F"
    },
    evenements: {
        titre : "Événements", color : "#E7A2F0"
    },
}

const EnCours = () => {
    return (
        <View>
            <Text>Contenu En cours</Text>
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

    const config = EVENT_CONFIG[type]

    if (!config) {
        return null;
    }

    return (
        <View style={styles.container}>

            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            <View style={{ flex: 1 }}>
                    <Header userDetails={true} />

                <ScrollView>
                        <TabNavbarWeb onglets={ongletsWeb} pageBack={"social"} />
                    <Text>{config.titre}</Text>
                    <EnCours/>
                    <Statistiques/>

                </ScrollView>
            </View>
        </View>
    );
}
