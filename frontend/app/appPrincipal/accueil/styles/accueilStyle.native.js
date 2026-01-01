import { StyleSheet } from "react-native";

export default StyleSheet.create({
        card: {
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 14,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 4,
        },

        header: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 10,
            gap: 10,
        },

        avatar: {
            width: 42,
            height: 42,
            borderRadius: 21,
        },

        nameRow: {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
        },

        name: {
            fontWeight: "700",
            fontSize: 15,
        },

        time: {
            color: "#777",
            fontSize: 13,
        },

        text: {
            marginTop: 2,
            fontSize: 15,
        },

        image: {
            width: "100%",
            height: 220,
            borderRadius: 16,
            marginTop: 10,
        },

        actions: {
            flexDirection: "row",
            gap: 14,
            marginTop: 12,
        },

        actionBtn: {
            width: 25,
            height: 25,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
        },

        icon:{
            width:25,
            height:25,
        },

    profil:{
        width:20,
        height:20,
    },

    signal:{
        width:15,
        height:17,
    },

    postMenu: {
        position: "absolute",
        top: 40,
        right: 2,
        width: 170,
        backgroundColor: "rgba(60,60,60,0.95)",
        borderRadius: 18,
        overflow: "hidden",
        zIndex: 20,
    },

    postMenuRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 14,
    },

    postMenuText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },

    postMenuDanger: {
        color: "#ff4d4f",
        fontSize: 16,
        fontWeight: "500",
    },

    postMenuSeparator: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginHorizontal: 12,
    },
});
