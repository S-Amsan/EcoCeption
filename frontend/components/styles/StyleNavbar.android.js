import {Dimensions, Platform, StyleSheet} from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    webview :{
        position: "fixed",
        left: 0,
        top: 0,
        height: '100%',
        width: 200,
        backgroundColor: '#00DB83',
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        zIndex: 100,
    }
});