import { StyleSheet } from "react-native";

export default StyleSheet.create({
    conteneurMobile: {
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: "#FFFFFF",
        marginTop: 1,
    },

    onglets: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 34,
        marginBottom: 25,
        marginTop: 15,
    },

    onglet: {
        paddingBottom: 8,
    },

    ongletActif: {
        borderBottomWidth: 3,
        borderBottomColor: "#04DA90",
    },

    texteOnglet: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },

    texteOngletActif: {
        color: "#000",
    },

    ligneFiltresMobile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingRight: 6,
    },

    chip: {
        backgroundColor: "#F4F4F4",
        borderRadius: 999,
        paddingHorizontal: 14,
        height: 34,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDEDED",
    },

    chipActif: {
        backgroundColor: "#E9FBF4",
        borderColor: "#04DA90",
    },

    texteChip: {
        fontSize: 13,
        color: "#000",
        fontWeight: "500",
    },

    texteChipActif: {
        color: "#04DA90",
    },
});
