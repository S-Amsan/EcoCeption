import { StyleSheet } from "react-native";

export default StyleSheet.create({

    page: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F8F8F8",
    },

    left: {
        flex: 2,
        padding: 16,
    },

    header: {
        backgroundColor: "#3EDFA4",
        color: "#fff",
        padding: 16,
        borderRadius: 8,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center",
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: "center",
    },

    image: {
        width: 110,
        height: 80,
        borderRadius: 8,
    },

    content: {
        flex: 1,
        marginLeft: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: "600",
    },

    address: {
        color: "#666",
        marginVertical: 4,
        fontSize: 13,
    },

    meta: {
        color: "#999",
        fontSize: 12,
    },

    right: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        height: 80,
    },

    distance: {
        color: "#666",
        fontSize: 12,
    },

    button: {
        backgroundColor: "#3EDFA4",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },

    rightPanel: {
        flex: 1,
        padding: 16,
    },

    infoBox:{
        margin:15
    },

    infoCard: {
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,

        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
    },

    infoContent: {
        padding: 16,
        paddingRight: 130,
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
        width: 110,
    },

    infoDesc: {
        fontSize: 14,
        color: "#666",
        width:230
    },

    infoButton: {
        backgroundColor: "#3EDFA4",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginTop:15
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

    infoHeader:{
        backgroundColor:"#0ED49B",
        borderRadius: 12,
        marginBottom: 10,
        padding:20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        margin:15
    },

    HeaderImage:{
        width:80,
        height:80,
    }

});
