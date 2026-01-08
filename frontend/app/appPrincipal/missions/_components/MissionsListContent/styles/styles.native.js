import {Platform, StyleSheet} from "react-native";

export default StyleSheet.create({

    /* ===== PAGE ===== */
    page: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },

    /* ===== HEADER ===== */
    header: {
        backgroundColor: "#0ED49B",
        borderRadius: 12,
        padding: 20,
        margin: 15,
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#eee",
    },


    infoHeader: {
        backgroundColor: "#0ED49B",
        borderRadius: 12,
        margin: 15,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,

        elevation: 4,
        alignItems:'center'
    },

    spship:{
        flexDirection:"row",
        padding:20,
    },

    HeaderImage:{
        width:80,
        height:50,
    },

    headerTitle: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    /* ===== INFO SECTION ===== */
    infoBox: {
        marginHorizontal: 15,
        marginBottom: 20,
    },

    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        elevation: 3,
    },

    infoContent: {
        padding: 16,
        paddingRight:130,
    },

    infoTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    imageWrapper: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width:110,
    },

    infoDesc: {
        fontSize: 14,
        color: "#666",
    },

    infoButton: {
        marginTop: 12,
        backgroundColor: "#3EDFA4",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "flex-start",
    },

    infoButtonText: {
        color: "#fff",
        fontWeight: "600",
    },

    infoImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    /* ===== LISTE DES CARTES ===== */
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 5,
        marginHorizontal: 15,
        marginBottom: 12,
        flexDirection: "row",
        width: "auto",
    },

    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },

    content: {
        flex: 1,
        marginLeft: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
    },

    address: {
        color: "#666",
        fontSize: 12,
        marginTop: 2,
    },

    meta: {
        color: "#999",
        fontSize: 12,
        marginTop: 6,
    },

    describe: {
        fontSize: 12,
        marginTop: 8,
    },

    right: {
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginLeft: 10,
    },

    distance: {
        color: "#666",
        fontSize: 12,
    },

    button: {
        backgroundColor: "#3EDFA4",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginTop: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
        textAlign: "center",
    },

});
