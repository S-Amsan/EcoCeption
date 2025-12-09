import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
    webview: {
        // ❌ NE PAS METTRE flex:1 ICI
        // le ScrollView gère la hauteur
        backgroundColor: "transparent",
        flexDirection: "column",
    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height * 0.05,
        marginTop: height * 0.02,
    },

    logo: {
        width: 80,
        height: 80,
        marginRight: 10,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.1)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    tabsContainer: {
        // ⚠️ Très important : pas de height ici
        alignItems: "center",
        paddingHorizontal: 10,
    },

    tabs: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        width: "90%",
        borderRadius: 10,
    },

    Icon: {
        width: 40,
        height: 40,
    },

    IconText: {
        fontSize: 22,
        fontWeight: "400",
        marginLeft: 15,
    },
});
