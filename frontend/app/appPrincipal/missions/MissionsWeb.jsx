import { View } from "react-native";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";
import Gestes from "./_components/Gestes/Gestes";
import { useState } from "react";

export default function MissionsWeb() {
    const [ongletActifId, setOngletActifId] = useState("listes");

    const onglets = [
        { id: "listes", label: "Régulières" },
        { id: "gestes", label: "Une fois" },
    ];

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f6f6f6" }}>
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            <View style={{ flex: 1 }}>
                <Header
                    onglets={onglets}
                    ongletActifId={ongletActifId}
                    setOngletActif={setOngletActifId}
                />

                <View style={{ flex: 1, padding: 24 }}>
                    {ongletActifId === "listes" && <MissionsListContent />}
                    {ongletActifId === "gestes" && <Gestes />}
                </View>
            </View>
        </View>
    );
}
