import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ScanActionButton({ label, onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 24,
        alignSelf: "center",
        backgroundColor: "#1DDE9A",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 14,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        zIndex: 999,
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
