import { StyleSheet } from "react-native";
import { Platform } from "react-native";


export default StyleSheet.create({

    page: {
        flex: 1,
        flexDirection: "row",
    },

    left: {
        padding: 30,
        alignItems:'center',
    },

    header: {
        backgroundColor: "#45E2B2",
        padding: 16,
        borderRadius: 5,
        marginBottom: 16,
        width:920,
        height:110,
        justifyContent:'center',
    },

    headerTitle: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: "center",
        width:920,

    },

    content: {
        flex: 1,
        flexDirection:'column',
        marginLeft: 12,

    },

    content1: {
        flex: 1,
        flexDirection:'row',
        marginVertical:10,
    },

    image: {
        width: 180,
        height: 130,
        borderRadius: 8,
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#eee",
    },


    title: {
        fontSize: 15,
        fontWeight: "600",
    },

    address: {
        color: "#666",
        marginLeft:12,
        fontSize: 13,

    },

    meta: {
        color: "#999",
        fontSize: 12,

    },

    describe:{
        fontSize:12,
        marginVertical:10,
    },

    right: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        height: 100,
        padding:20,
    },

    distance: {
        color: "#666",
        fontSize: 12,
    },

    button: {
        backgroundColor: "#3EDFA4",
        marginVertical:20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        width:160,
        height:33,
        justifyContent:'center'
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
        textAlign:'center'
    },

    rightPanel: {
        flex: 1,
        padding:15,
    },
    info:{
        alignItems: "flex-end",
    },

    infoBox:{
        margin:15
    },

    Container:{
        alignItems:'center',
        padding:15,
    },

    infoCard: {
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 16,

        elevation: Platform.OS === "android" ? 6 : 0,


        shadowColor: Platform.OS === "ios" ? "#000" : undefined,
        shadowOffset:
            Platform.OS === "ios"
                ? { width: 0, height: 4 }
                : undefined,
        shadowOpacity: Platform.OS === "ios" ? 0.15 : undefined,
        shadowRadius: Platform.OS === "ios" ? 8 : undefined,

        ...(Platform.OS === "web" && {
            boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
            width:580,
            height:250
        }),
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
        width:110,
        ...(Platform.OS === "web" && {
            width: 220,
        }),
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
