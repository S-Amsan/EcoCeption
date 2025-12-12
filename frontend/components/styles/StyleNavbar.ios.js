import { StyleSheet} from "react-native";


export default StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        width: "80%",
        height: 58,
        zIndex : 100,
        backgroundColor: "#04DA8E",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal : 10,
        opacity: 0.9,
        borderRadius: 30,
        position: "absolute",
        bottom: 35,
        left: "50%",
        transform: [{ translateX: "-50%" }],
    }
});