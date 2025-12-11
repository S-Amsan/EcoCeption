import {Dimensions, Platform, StyleSheet} from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    webview: {
        position: "fixed",
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#00DB83',
        flexDirection: 'column',
        zIndex: 100,
        width: width*0.15
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.05,
        marginTop: height * 0.02,
        alignItems:'center'
    },

    logo: {
        width: 80,
        height: 80,

    },

    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,

    },

    tabsContainer: {
        alignItems: 'center',
        height: '100%',
        padding:10
    },

    tabs: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        width: '95%',
        borderRadius: 10,
        transition: 'all 0.3s ease',

    },

    Icon:{
        width:40,
        height:40,
    },

    IconText: {
        fontSize: 22,
        fontWeight: '400',
        marginLeft: 15,

    }
});