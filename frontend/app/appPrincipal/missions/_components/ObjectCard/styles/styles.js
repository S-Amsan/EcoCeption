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
        borderRadius: 16,
        padding: 12,
        width:"80%",
        elevation: 4,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },

    content: {
        width:"65%",
        flexDirection:'column',
        padding:12,
    },

    content1: {
        flexDirection:'row',
        width:"100%",
    },

    image: {
        width: "35%",
        height: "100%",
        borderRadius: 16,
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 21,
    },

    name:{
        fontSize: 20,
        marginLeft:10,
    },

    title: {
        fontSize: 32,
    },

    address: {
        color: "#666",
        fontSize: 16,
        padding:15
    },

    meta: {
        marginVertical:4,
        color: "#999",
        fontSize: 14,
        marginLeft:16,
    },

    describe:{
        fontSize:16,
        marginVertical:20,
        marginLeft:35,
    },

    button: {
        backgroundColor: "#3EDFA4",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        width:250,
        height:40,
        justifyContent:'center',
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
        textAlign:'center'
    },

});
