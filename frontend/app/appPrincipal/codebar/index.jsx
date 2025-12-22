import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ScanPage() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!permission) requestPermission();
    }, [permission]);

    const handleBarcodeScanned = ({ data, type }) => {
        setScanned(true);
        console.log("SCAN:", type, data);

        router.replace({
            pathname: "/appPrincipal/missions",
            params: { scannedData: data },
        });
    };

    if (!permission) return null;
    if (!permission.granted) {
        return <Text>Accès caméra refusé</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFill}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
                }}
            />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Scanner un produit</Text>
            </View>

            {/* ZONE DE SCAN */}
            <View style={styles.scanArea}>
                <View style={styles.scanFrame} />
                <Text style={styles.scanText}>
                    Place le code-barres dans le cadre
                </Text>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Le scan se fera automatiquement
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    header: {
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        zIndex: 10,
    },

    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },

    scanArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    scanFrame: {
        width: 260,
        height: 160,
        borderWidth: 3,
        borderColor: "#1DDE9A",
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.2)",
    },

    scanText: {
        marginTop: 16,
        color: "#fff",
        fontSize: 14,
        opacity: 0.85,
    },

    footer: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: "center",
    },

    footerText: {
        color: "#fff",
        opacity: 0.7,
    },
});

