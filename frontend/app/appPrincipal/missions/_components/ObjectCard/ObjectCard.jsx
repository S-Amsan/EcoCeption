import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles/styles";
import { fetchUserById } from "../../../../../services/user.api";
import { formatRelativeTime } from "../../../../../utils/format";

export default function ObjectCard({ item, onSeeObjet }) {
    const [avatar, setAvatar] = useState(null);
    const [pseudo, setPseudo] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await fetchUserById(item.user_id);
                setAvatar(user.photoProfileUrl);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error("Erreur chargement user objet", e);
            }
        };

        loadUser();
    }, [item.user_id]);

    return (
        <View style={styles.card}>
            {/* IMAGE OBJET */}
            <Image
                source={{ uri: item.photoUrl }}
                style={styles.image}
                onError={(e) =>
                    console.log("IMAGE OBJET ERROR", e.nativeEvent)
                }
            />

            {/* CONTENU */}
            <View style={styles.content}>
                <View style={styles.content1}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.address}>📍 {item.address}</Text>
                </View>

                {/* USER */}
                <View style={styles.content1}>
                    {avatar && (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    )}
                    <View style={styles.content}>
                        <View style={styles.content1}>
                        {pseudo && (
                            <Text style={styles.name}>@{pseudo}</Text>
                        )}
                        <Text style={styles.meta}>
                            {"•"} {formatRelativeTime(item.creationDate)}
                        </Text>
                        </View>

                    {item.description && (
                        <Text style={styles.describe}>{item.description}</Text>
                    )}
                    </View>

                </View>
                <View style={{alignItems:"flex-end"}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSeeObjet?.(item)}
                >
                    <Text style={styles.buttonText}>Voir l’objet</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
