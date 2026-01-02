import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";

import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";

export default function ObjetRecupPhoto({ objet, onBack, onSubmit }) {
    const [photo, setPhoto] = useState(null);

    const handleTakePhoto = () => {
        // TODO: caméra / picker
        console.log("PRENDRE PHOTO");
        setPhoto("fake");
    };

    const Content = (
        <ScrollView contentContainerStyle={styles.container}>
            {/* BANNER */}
            <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>
                    Donnez une seconde vie à cet objet !
                </Text>
                <Text style={styles.rewardSub}>
                    Récompense : +500 points
                </Text>
            </View>

            {/* TITLE */}
            <Text style={styles.sectionTitle}>
                Prenez une photo
            </Text>

            {/* UPLOAD */}
            <TouchableOpacity
                style={styles.uploadBox}
                onPress={handleTakePhoto}
            >
                {photo ? (
                    <Image
                        source={{ uri: "https://via.placeholder.com/300" }}
                        style={styles.preview}
                    />
                ) : (
                    <Text style={styles.uploadIcon}>📷</Text>
                )}
            </TouchableOpacity>

            {/* REMINDER */}
            <View style={styles.reminder}>
                <Text style={styles.reminderTitle}>Rappel :</Text>
                <Text style={styles.reminderItem}>
                    • Prenez la photo une fois l’objet chez vous
                </Text>
                <Text style={styles.reminderItem}>
                    • La photo doit être claire
                </Text>
                <Text style={styles.reminderItem}>
                    • Pas d’informations personnelles visibles
                </Text>
            </View>

            <Text style={styles.footerText}>
                Les points sont attribués après validation de votre photo
            </Text>

            {/* SUBMIT */}
            <TouchableOpacity
                style={[
                    styles.submitButton,
                    !photo && styles.submitDisabled,
                ]}
                disabled={!photo}
                onPress={onSubmit}
            >
                <Text style={styles.submitText}>Poster</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    if (isWeb) {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* FERMER */}
                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={onBack}
                    >
                        <Text style={styles.modalCloseText}>✕</Text>
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={styles.modalScroll}>
                        {Content}
                    </ScrollView>
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {Content}
        </View>
    );
}
