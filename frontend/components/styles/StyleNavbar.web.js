import {Dimensions, StyleSheet} from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    webview: {
        position: "fixed",
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#00DB83',
        flexDirection: 'column',
        zIndex: 100,
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft : 20,
        marginBottom: height * 0.05,
        marginTop: height * 0.02,
        alignItems:'center'
    },

    logo: {
        width: 60,
        height: 60,

    },

    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 600,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,

    },

    tabsContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        padding : 10,
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
        width:35,
        height:35,
    },

    IconText: {
        fontSize: 24,
        fontWeight: "regular",
        marginLeft: 25,

    }
});