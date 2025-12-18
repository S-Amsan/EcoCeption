import {Modal, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";

export default function PopUp({
                                  visible, // Boolean ou un autre, si null ou undefined alors c'est une defined
                                  setVisible, // Pour enlever le popup
                                  children // pas un paramètres, c'est ceux qu'il y'a a l'intérieur. Exemple <PopUp> <Text>contenu<Text/> <PopUp/>
}) {
    return (
        <Modal transparent visible={!!visible} statusBarTranslucent>
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={() => setVisible(false)}
            >
                {children}
            </TouchableOpacity>

        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 50,
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
