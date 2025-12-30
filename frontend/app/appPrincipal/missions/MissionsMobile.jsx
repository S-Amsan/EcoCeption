import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "../../../components/Header";
import TabNavbarMobile from "../../../components/TabNavbarMobile";
import ScanActionButton from "../../../components/ScanActionButton";
import { useLocalSearchParams, useRouter } from "expo-router";

import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";
import Gestes from "./_components/Gestes/Gestes";

export default function MissionsMobile() {
    const [ongletActifId, setOngletActifId] = useState("listes");
    const router = useRouter();
    const { scannedData } = useLocalSearchParams();

    useEffect(() => {
        if (scannedData) {
            console.log("MISSION → SCAN REÇU :", scannedData);
        }
    }, [scannedData]);

    const onglets = [
        { id: "listes", label: "Régulières" },
        { id: "gestes", label: "Une fois" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header titre="Missions" boutonRetour />

            <ScanActionButton
                label="Scanner un produit"
                onPress={() => router.push("/appPrincipal/codebar")}
            />

            <TabNavbarMobile
                ongletActifId={ongletActifId}
                onglets={onglets}
                setOngletActif={setOngletActifId}
            />

            {ongletActifId === "listes" && <MissionsListContent />}
            {ongletActifId === "gestes" && <Gestes />}
        </View>
    );
}
