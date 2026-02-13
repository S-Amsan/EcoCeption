import React, { useCallback, useMemo } from "react";
import {
    Platform,
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Alert,
    ToastAndroid,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { usePanier } from "../../../../context/PanierContext.js";
import * as Clipboard from "expo-clipboard";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import HeaderBoutique from "../../../../components/boutique/headerBoutique/headerBoutique";

import point from "../../../../assets/icones/point.png";
import partage from "../../../../assets/icones/boutique/partage.png";

import styles from "./styles/styles";
import { Ionicons } from "@expo/vector-icons";

const webNoSelect = StyleSheet.create({
    noSelect: { userSelect: "none" },
});

const lienfictif = "https://ecoception.fr/boutique";

function getTypeLabel(type) {
    const key = String(type).toLowerCase();
    const map = {
        carte: "Cartes cadeaux",
        coupon: "Bons de réduction",
        don: "Dons",
    };
    return map[key] ?? "Aucune";
}

async function copyToClipboard(text) {
    if (Platform.OS === "web") {
        await navigator.clipboard.writeText(text);
        return;
    }
    await Clipboard.setStringAsync(text);
}

function notifyCopySuccess() {
    if (Platform.OS === "web") {
        window.alert("Copié dans le presse-papier ✅");
        return;
    }
    if (Platform.OS === "android") {
        ToastAndroid.show("Copié dans le presse-papier ✅", ToastAndroid.SHORT);
        return;
    }
    Alert.alert("Copié ✅", "Copié dans le presse-papier");
}

function notifyCopyError() {
    if (Platform.OS === "web") {
        window.alert("Impossible de copier ❌");
        return;
    }
    Alert.alert("Erreur", "Impossible de copier ❌");
}

function DetailProduitMobile({
                                 router,
                                 imageBanniere,
                                 imageCarte,
                                 type,
                                 titreCourt,
                                 titreComplet,
                                 points,
                                 description,
                                 peutAcheter,
                                 handlePartager,
                                 toggleFavori,
                                 favori,
                                 articleCourant,
                                 handleBuyMobile,
                             }) {
    return (
        <View style={styles.ecran}>
            <Header boutonNotification={true} userDetails={true} userProfil={true} />

            <ScrollView style={styles.defilement} showsVerticalScrollIndicator={false}>
                <View style={styles.banniere}>
                    <ImageBackground
                        source={{ uri: imageBanniere }}
                        style={styles.banniereImage}
                        blurRadius={8}
                    >
                        <View style={styles.banniereFiltre} />

                        <View style={styles.actionsHaut}>
                            <Pressable onPress={() => router.back()} style={styles.boutonRetour}>
                                <Text style={styles.iconeRetour}>
                                    <Ionicons name="chevron-back" size={21} />
                                </Text>
                            </Pressable>

                            <View style={styles.actionsDroite}>
                                <Pressable style={styles.boutonIcone} onPress={handlePartager}>
                                    <Image source={partage} style={styles.iconeAction} />
                                </Pressable>

                                <Pressable
                                    style={styles.boutonIcone}
                                    onPress={() => toggleFavori(articleCourant)}
                                >
                                    <Ionicons
                                        name={favori ? "heart" : "heart-outline"}
                                        size={25}
                                        color={favori ? "red" : "black"}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.carteAuCentre}>
                            <Image source={{ uri: imageCarte }} style={styles.imageCarte} />
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.contenu}>
                    <Text style={styles.badgeType}>{getTypeLabel(type)}</Text>

                    <Text style={styles.titreProduitCourt}>{titreCourt}</Text>
                    <Text style={styles.titreProduitComplet}>{titreComplet}</Text>

                    <View style={styles.lignePrix}>
                        <Text style={styles.prixLabel}>Dès</Text>
                        <Text style={styles.prixValeur}>{points}</Text>
                        <Image source={point} style={styles.iconePoints} />
                    </View>

                    <View style={styles.infosCourtes}>
                        <Text style={styles.infosCourtesLigne}>✅ En stock</Text>
                        <Text style={styles.infosCourtesSousTexte}>{titreCourt}</Text>
                    </View>

                    <View style={styles.separateur} />

                    <Text style={styles.titreSection}>À propos</Text>
                    <Text style={styles.label}>Description :</Text>
                    <Text style={styles.texteDescription}>{description}</Text>

                    <View style={{ height: 110 }} />
                </View>
            </ScrollView>

            <View style={styles.barreAchat}>
                <Pressable
                    style={[styles.boutonAchat, !peutAcheter && styles.boutonAchatDisabled]}
                    onPress={handleBuyMobile}
                    disabled={!peutAcheter}
                >
                    <LinearGradient
                        colors={["#00DB83", "#0CD8A9"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.fondGradient}
                        pointerEvents="none"
                    />
                    <Text style={styles.texteBoutonAchat} selectable={false}>
                        Acheter l’offre
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

function DetailProduitWeb({
                              router,
                              imageBanniere,
                              imageCarte,
                              titreComplet,
                              points,
                              description,
                              handlePartager,
                              toggleFavori,
                              favori,
                              articleCourant,
                              handleAddToCartWeb,
                              type,
                          }) {
    return (
        <View style={styles.racine}>
            <View style={styles.zoneNavbar}>
                <Navbar />
            </View>

            <View style={styles.zonePrincipale}>
                <Header />

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
                    <View style={styles.bandeau}>
                        <View style={styles.bandeauImageLayer}>
                            <ImageBackground source={{ uri: imageBanniere }} style={styles.imageBandeau}>
                                <View style={styles.filtreBandeau} />

                                <View style={styles.zoneFlou} pointerEvents="none">
                                    <BlurView intensity={35} style={StyleSheet.absoluteFillObject} />
                                    <LinearGradient
                                        colors={[
                                            "rgba(255,255,255,0)",
                                            "rgba(255,255,255,0.25)",
                                            "rgba(255,255,255,1)",
                                        ]}
                                        locations={[0, 0.65, 1]}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                </View>

                                <View style={styles.bandeauBasBlanc} />
                            </ImageBackground>
                        </View>

                        <View style={styles.bandeauOverlay}>
                            <View style={styles.headerBoutiqueFlottant}>
                                <HeaderBoutique mode="detail" />
                            </View>

                            <View style={styles.contenuBandeau}>
                                <View style={styles.carteGauche}>
                                    <Image source={{ uri: imageCarte }} style={styles.imagePrincipale} />
                                </View>

                                <View style={[styles.blocDroite, styles.memeTaille]}>
                                    <View style={styles.blocDroiteHaut}>
                                        <BlurView intensity={30} tint="dark" style={styles.blurFond} />
                                        <View style={styles.overlayFond} />

                                        <View style={styles.blocDroiteHautContenu}>
                                            <Text style={styles.titreProduit}>{titreComplet}</Text>

                                            <View style={styles.badgesBar}>
                                                <View style={styles.badgeItem}>
                                                    <Text style={styles.badgeIcon}>✅</Text>
                                                    <Text style={styles.badgeText}>En stock</Text>
                                                </View>

                                                <View style={styles.badgeDivider} />

                                                <View style={styles.badgeItem}>
                                                    <Text style={styles.badgeIcon}>✅</Text>
                                                    <Text style={styles.badgeText}>Téléchargement digital</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.blocDroiteBas}>
                                        <View style={styles.prixCentre}>
                                            <Text style={styles.prixTexte}>Dès {points}</Text>
                                            <Image source={point} style={styles.iconePoint} />
                                        </View>

                                        <View style={styles.ligneActions}>
                                            <Pressable style={styles.boutonSecondaire} onPress={handlePartager}>
                                                <LinearGradient
                                                    colors={["#00DB83", "#0CD8A9"]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.boutonGradient}
                                                    pointerEvents="none"
                                                />
                                                <Image
                                                    source={partage}
                                                    style={[styles.boutonSecondaireIcon, { zIndex: 2 }]}
                                                    resizeMode="contain"
                                                />
                                            </Pressable>

                                            <Pressable
                                                style={styles.boutonSecondaire}
                                                onPress={() => toggleFavori(articleCourant)}
                                            >
                                                <LinearGradient
                                                    colors={["#00DB83", "#0CD8A9"]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.boutonGradient}
                                                    pointerEvents="none"
                                                />

                                                <Ionicons
                                                    name={favori ? "heart" : "heart-outline"}
                                                    size={35}
                                                    color={favori ? "red" : "white"}
                                                    style={{ zIndex: 2, marginTop: 3 }}
                                                />
                                            </Pressable>

                                            <Pressable
                                                style={[styles.boutonPrincipal, webNoSelect.noSelect]}
                                                onPress={handleAddToCartWeb}
                                            >
                                                <LinearGradient
                                                    colors={["#00DB83", "#0CD8A9"]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.boutonGradient}
                                                    pointerEvents="none"
                                                />
                                                <Text style={[styles.boutonPrincipalTexte, webNoSelect.noSelect]}>
                                                    Ajouter au panier
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.colonneGauche}>
                            <Text style={styles.sectionTitre}>À propos</Text>

                            <Text style={styles.label}>Description :</Text>
                            <Text style={styles.description}>{description}</Text>

                            <Pressable onPress={() => router.push("../boutique")} style={{ marginTop: 20 }}>
                                <Text style={styles.retour}>← Retour boutique</Text>
                            </Pressable>
                        </View>

                        <View style={styles.colonneDroite}>
                            <View style={styles.ligneInfo}>
                                <Text style={styles.infoLabel}>Compatibilité par pays :</Text>
                                <Text style={styles.infoLien}>Voir la liste</Text>
                            </View>

                            <View style={styles.ligneInfo}>
                                <Text style={styles.infoLabel}>Installation :</Text>
                                <Text style={styles.infoLien}>Comment activer ce produit</Text>
                            </View>

                            <View style={styles.ligneInfo}>
                                <Text style={styles.infoLabel}>Genre :</Text>
                                <Text style={styles.infoLien}>{getTypeLabel(type)}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default function DetailProduit() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const id = params.id ?? "";
    const titreCourt = params.titre ?? "Produit";
    const titreComplet = params.titreComplet ?? `E-carte cadeau ${titreCourt} de 10€`;
    const description =
        params.descriptionLongue ?? params.description ?? "Aucune description disponible.";
    const points = params.points ?? "0";
    const imageCarte = params.imageCarte ?? params.image ?? "";
    const imageBanniere = params.banniere ?? params.image ?? "";
    const type = params.type ?? "cartes";

    const { ajouterAuPanier, acheterOffre, toggleFavori, estFavori, pointsUtilisateur } =
        usePanier();

    const coutProduit = Number(points) || 0;
    const peutAcheter = Number(pointsUtilisateur) >= coutProduit;
    const favori = estFavori(id);

    const articleCourant = useMemo(
        () => ({
            id: String(id),
            titre: String(titreCourt),
            titreComplet: String(titreComplet),
            description: String(params.description ?? ""),
            descriptionLongue: String(description),
            points: Number(points),
            imageCarte: String(imageCarte),
            banniere: String(imageBanniere),
            type: String(type),
            quantity: 1,
        }),
        [
            id,
            titreCourt,
            titreComplet,
            params.description,
            description,
            points,
            imageCarte,
            imageBanniere,
            type,
        ]
    );

    const handlePartager = useCallback(async () => {
        const texte = `Découvre cette offre : ${String(titreComplet)}\n${lienfictif}`;
        try {
            await copyToClipboard(texte);
            notifyCopySuccess();
        } catch (e) {
            console.log("Erreur partage:", e);
            notifyCopyError();
        }
    }, [titreComplet]);

    const handleAddToCartWeb = useCallback(() => {
        ajouterAuPanier(articleCourant);
        router.push({
            pathname: "boutique/panier",
            params: { justAdded: "1" },
        });
    }, [ajouterAuPanier, articleCourant, router]);

    const handleBuyMobile = useCallback(() => {
        const ok = acheterOffre(articleCourant);
        if (!ok) {
            Alert.alert("Points insuffisants", "Tu n’as pas assez de points pour acheter cette offre");
            return;
        }
        router.push({
            pathname: "boutique/historique",
            params: { justBought: "1" },
        });
    }, [acheterOffre, articleCourant, router]);

    if (Platform.OS !== "web") {
        return (
            <DetailProduitMobile
                router={router}
                imageBanniere={imageBanniere}
                imageCarte={imageCarte}
                type={type}
                titreCourt={titreCourt}
                titreComplet={titreComplet}
                points={points}
                description={description}
                peutAcheter={peutAcheter}
                handlePartager={handlePartager}
                toggleFavori={toggleFavori}
                favori={favori}
                articleCourant={articleCourant}
                handleBuyMobile={handleBuyMobile}
            />
        );
    }

    return (
        <DetailProduitWeb
            router={router}
            imageBanniere={imageBanniere}
            imageCarte={imageCarte}
            titreComplet={titreComplet}
            points={points}
            description={description}
            handlePartager={handlePartager}
            toggleFavori={toggleFavori}
            favori={favori}
            articleCourant={articleCourant}
            handleAddToCartWeb={handleAddToCartWeb}
            type={type}
        />
    );
}
