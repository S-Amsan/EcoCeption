import { StyleSheet } from "react-native";

export default StyleSheet.create({

    conteneur: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 16,
    },

    gauche: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginLeft: 9,
    },

    boutonFiltre: {
        backgroundColor: "#FFFFFF",
        borderRadius: 35,
        paddingHorizontal: 24,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDEDED",
    },

    texteFiltre: {
        fontSize: 20,
        color: "#278674",
        fontWeight: "600",
    },

    boutonFiltreActif: {
        backgroundColor: "#E9FBF4",
        borderColor: "#04DA90",
    },

    texteFiltreActif: {
        color: "#04DA90",
    },

    droite: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginRight: 20,
    },

    boutonPanier: {
        width: 84,
        height: 60,
        borderRadius: 35,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#EDEDED",
        position: "relative",
    },

    iconePanier: {
        width: 36,
        height: 36,
        resizeMode: "contain",
    },

    badgePanier: {
        position: "absolute",
        top: -6,
        right: -6,
        minWidth: 26,
        height: 26,
        paddingHorizontal: 6,
        borderRadius: 13,
        backgroundColor: "#04DA90",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    badgePanierTexte: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 13,
    },

    blocPoints: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 35,
        paddingHorizontal: 24,
        height: 60,
        borderWidth: 1,
        gap: 8,
        borderColor: "#EDEDED",
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    textePoints: {
        fontSize: 20,
        color: "#278674",
        fontWeight: "600",
    },

    valeurPoints: {
        fontSize: 20,
        color: "#278674",
        fontWeight: "600",
    },

    pointIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        marginTop: 2,
    },
});