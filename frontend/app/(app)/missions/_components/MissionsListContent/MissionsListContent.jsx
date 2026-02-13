import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Animated, Pressable,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";
import Navbar from "../../../../../components/Navbar";
import ScanActionButton from "../../../../../components/ScanActionButton";

import { getAllObjects } from "../../../../../services/objects.api";
import {fetchUserById, getParrainageCode} from "../../../../../services/user.api";
import { formatRelativeTime } from "../../../../../utils/format";

import parrainageIcon from "../../../../../assets/icones/missions/parrainageIcon.png"
import point from "../../../../../assets/icones/point.png"
import PopUp from "../../../../../components/PopUp";
import {Ionicons} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";

/* ===========================
   CARD OBJET
=========================== */
function ObjectCard({ item, onSeeObjet }) {
    const [avatar, setAvatar] = useState(null);
    const [pseudo, setPseudo] = useState(null);

    useEffect(() => {
        if (!item?.publisher_user_id) return;

        const loadUser = async () => {
            try {
                const user = await fetchUserById(item.publisher_user_id);
                setAvatar(user.photoProfileUrl);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error(e);
            }
        };

        loadUser();
    }, [item?.publisher_user_id]);

    return (
        <View style={styles.card}>
            {/* IMAGE */}
            <Image
                source={{ uri: item.photoUrl }}
                style={styles.image}
            />

            {/* CONTENU CENTRAL */}
            <View style={styles.body}>
                {/* TITRE + DISTANCE */}
                <View style={styles.topRow}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.distance}>
                        • {formatRelativeTime(item.creationDate)}
                    </Text>

                </View>

                {/* USER */}
                <View style={styles.userRow}>
                    {avatar && (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    )}
                    <Text style={styles.userText}>
                        @{pseudo}
                    </Text>
                </View>

                {/* ADRESSE */}
                <Text style={styles.address}>
                    📍 {item.address}
                </Text>
            </View>

            {/* COLONNE DROITE */}
            <View style={styles.right}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSeeObjet(item)}
                >
                    <Text style={styles.buttonText}>Récupérer</Text>
                </TouchableOpacity>
            </View>
        </View>


    );
}

function ParrainageCard(){
    const [codeParraingeVisible, setCodeParraingeVisible] = useState(false);
    const [code, setCode] = useState("");

    useEffect(() => {
        getParrainageCode().then((res) => setCode(res.codeParrainage))
    }, []);

    const copierCode = () => {
        Clipboard.setStringAsync(code);
        setCodeParraingeVisible(false)
        Toast.show({
            type: "success",
            text1: "Code copié",
            text2: "Le code de parrainage a été copié.",
        });
    };

    return(
        <>
            <PopUp visible={codeParraingeVisible} setVisible={setCodeParraingeVisible}>
                <View style={{zIndex : 99, flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            zIndex : 100,
                            width: 300,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 20,
                            padding: 25,
                            elevation: 10,
                        }}
                    >
                        <Pressable
                            onPress={() => setCodeParraingeVisible(false)}
                            style={{ position: "absolute", top: 15, right: 15 }}
                        >
                            <Ionicons name="close" size={22} color="#888" />
                        </Pressable>

                        {/* Titre */}
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: 12,
                            }}
                        >
                            Votre code parrainage
                        </Text>

                        {/* Description */}
                        <Text
                            style={{
                                fontSize: 14,
                                color: "#777",
                                textAlign: "center",
                                lineHeight: 20,
                                marginBottom: 25,
                            }}
                        >
                            Invitez un ami à rejoindre l’application.
                            {"\n"}
                            S’il entre votre code à l’inscription,
                            vous gagnez tous les deux{" "}
                            <Text style={{ fontWeight: "bold", color: "#0ED49B" }}>
                                500 points
                            </Text>.
                        </Text>

                        {/* Code */}
                        <Pressable
                            style={{
                                backgroundColor: "#F2F2F2",
                                borderRadius: 15,
                                paddingVertical: 20,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "#E5E5E5",
                            }}
                            onPress={copierCode}
                        >
                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: "bold",
                                    letterSpacing: 4,
                                }}
                            >
                                {code}📋
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </PopUp>

            <TouchableOpacity onPress={() => setCodeParraingeVisible(true)} style={{ backgroundColor : "#0ED49B", flexDirection : "row", borderRadius : 10, height : 90, alignItems: "center", paddingHorizontal: 20, marginBottom: 16,}}>
                <View style={{gap : 10}}>
                    <Text style={{fontWeight : "bold", fontSize : 18, color : "white"}}>Parrainer un ami</Text>
                    <View style={{flexDirection : "row", alignItems: "center",justifyContent : "center", backgroundColor : "white", borderRadius : 12, paddingVertical : 3, paddingHorizontal: 5, alignSelf: "flex-start"}}>
                        <Text style={{fontWeight : "bold"}}>+500</Text>
                        <Image source={point} style={{height:15, width:15}} />
                        <Text style={{fontSize : 11, color : "#757575"}}>/filleul</Text>
                    </View>
                </View>
                <Image source={parrainageIcon} style={{position : "absolute", bottom : 0, right : 20}}/>
            </TouchableOpacity>
        </>
    )
}

/* ===========================
   INFO CARD
=========================== */
function InfoCard({ title, description, button, image, onPress }) {
    return (
        <View style={styles.infoCard}>
            <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{title}</Text>
                <Text style={styles.infoDesc}>{description}</Text>

                <TouchableOpacity
                    style={styles.infoButton}
                    onPress={onPress}
                >
                    <Text style={styles.infoButtonText}>{button}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageWrapper}>
                <Image source={image} style={styles.infoImage} />
            </View>
        </View>
    );
}

/* ===========================
   PAGE MISSIONS
=========================== */
export default function MissionsPage({ onPostObjet, onSeeObjet }) {
    const router = useRouter();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadObjects = async () => {
            try {
                const data = await getAllObjects();

                const availableObjects = Array.isArray(data)
                    ? data.filter(
                        o => o.picked_up_user_id === null
                    )
                    : [];

                console.log("AVAILABLE OBJECTS:", availableObjects);

                setItems(availableObjects);
            } catch (e) {
                console.error("Erreur chargement objets", e);
            }
        };

        loadObjects();

    }, []);

    /* ===== ANIMATIONS MOBILE ===== */
    const navbarTranslateY = useRef(new Animated.Value(0)).current;
    const scanBtnTranslateX = useRef(new Animated.Value(0)).current;
    const lastScrollY = useRef(0);
    const NAVBAR_HEIGHT = 90;

    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;

        Animated.parallel([
            Animated.timing(navbarTranslateY, {
                toValue: y > lastScrollY.current ? NAVBAR_HEIGHT : 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scanBtnTranslateX, {
                toValue: y > lastScrollY.current ? 120 : 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        lastScrollY.current = y;
    };

    /* ===== WEB ===== */
    if (isWeb) {
        return (
            <View style={styles.page}>
                <View style={styles.left}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Objets à récupérer autour de vous
                        </Text>
                    </View>

                    <ScrollView>
                        {items.map(item => (
                            <ObjectCard
                                key={item.id}
                                item={item}
                                onSeeObjet={onSeeObjet}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* 👉 INFO CARDS WEB */}
                <View style={styles.rightPanel}>
                    <ParrainageCard/>
                    <InfoCard
                        title="Scanner un Code Barre et poster"
                        description="Scanner le QR code d’un partenaire puis prenez le produit en photo."
                        button="Commencer"
                        image={require("../../../../../assets/missions/scan.png")}
                        onPress={() => router.push("/(app)/codebar")}
                    />

                    <InfoCard
                        title="Objets abandonnés"
                        description="Poster des objets abandonnés pour leur donner une seconde vie."
                        button="Commencer"
                        image={require("../../../../../assets/missions/objet.png")}
                        onPress={onPostObjet}
                    />
                </View>
            </View>
        );
    }

    /* ===== MOBILE ===== */
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: NAVBAR_HEIGHT + 20 }}
            >
                {/* 👉 INFO CARDS MOBILE */}
                <View style={styles.infoBox}>
                    <ParrainageCard/>
                    <InfoCard
                        title="Scanner un Code Barres et poster"
                        description="Scanner le Code Barres d’un partenaire puis prenez le produit en photo."
                        button="Commencer"
                        image={require("../../../../../assets/missions/scan.png")}
                        onPress={() => router.push("/(app)/codebar")}
                    />

                    <InfoCard
                        title="Objets abandonnés"
                        description="Poster des objets abandonnés pour leur donner une seconde vie."
                        button="Commencer"
                        image={require("../../../../../assets/missions/objet.png")}
                        onPress={onPostObjet}
                    />
                </View>

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Objets à récupérer autour de vous
                    </Text>
                </View>

                {items.map(item => (
                    <ObjectCard
                        key={item.id}
                        item={item}
                        onSeeObjet={onSeeObjet}
                    />
                ))}
            </ScrollView>

            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    transform: [{ translateY: navbarTranslateY }],
                }}
            >
                <Navbar />
            </Animated.View>

            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 10,
                    right: 16,
                    transform: [{ translateX: scanBtnTranslateX }],
                }}
            >
                <ScanActionButton
                    onPress={() => router.push("/(app)/codebar")}
                />
            </Animated.View>
        </View>
    );
}
