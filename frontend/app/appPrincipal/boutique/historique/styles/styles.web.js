import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        paddingHorizontal: 40,
        paddingVertical: 24,
    },

    vide: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
    },

    zoneGroupes: {
        gap: 26,
    },

    groupe: {
        gap: 14,
    },

    titreGroupe: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    grille: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 22,
    },

    carteAchat: {
        width: 520,
        height: 130,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#EDEDED",
        overflow: "hidden",
    },

    imageAchat: {
        width: 180,
        height: "100%",
        resizeMode: "cover",
    },

    contenuAchat: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },

    titreAchat: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },

    sousTitreAchat: {
        fontSize: 13,
        color: "#666",
        fontWeight: "600",
    },

    ligneInfosAchat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 6,
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    points: {
        fontSize: 16,
        fontWeight: "700",
        color: "#97D7B8",
    },

    pointIcon: {
        width: 18,
        height: 18,
        resizeMode: "contain",
    },

    boutonVoirCode: {
        marginLeft: "auto",
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#07D999",
        alignItems: "center",
        justifyContent: "center",
    },

    texteVoirCode: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },

    modalFond: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
    },

    modalCarte: {
        width: 380,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        alignItems: "center",
        position: "relative",
    },

    modalFermer: {
        position: "absolute",
        top: 10,
        right: 12,
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },

    modalFermerTexte: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111",
    },

    modalImage: {
        width: 280,
        height: 140,
        borderRadius: 12,
        resizeMode: "cover",
        marginBottom: 14,
    },

    modalTitre: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111",
        textAlign: "center",
    },

    modalSousTitre: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
        marginTop: 6,
        marginBottom: 14,
    },

    blocCode: {
        width: "100%",
        height: 44,
        borderRadius: 10,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },

    codeTexte: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 16,
        letterSpacing: 0.5,
    },

    modalAide: {
        color: "#2B6CFF",
        textDecorationLine: "underline",
        fontSize: 14,
        fontWeight: "700",
    },
})