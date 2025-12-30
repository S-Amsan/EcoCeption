import {Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import React from "react";

import Header from "../../../../components/Header";

import styles from "./styles/styles";
import TabNavbarMobile from "../../../../components/TabNavbarMobile";

import DEFAULT_PICTURE from "../../../../assets/icones/default_picture.jpg";
import tropheeIcon from "../../../../assets/icones/trophee.png";
import medaille from "../../../../assets/icones/social/medailleClassement.png";

import {getCarriere} from "../../../../constants/rank";
import {formatNombreCourt, formatNombreEspace} from "../../../../utils/format";

// ---------------- LEADERBOARD ----------------

const Leaderboard = ({isActive, leaderboard_DATA, user_DATA}) => {
    const podium_users = leaderboard_DATA.slice(0,3);
    const users_hors_podium = leaderboard_DATA.slice(3);

    return (
        <View style={[{display: isActive ? "flex" : "none"}, styles.leaderboardContainer]}>
            <View style={styles.podiumContainer}>
                {
                    PODIUM_ORDRE.map((index) => (<Place key={index} user_DATA={podium_users[index]}/>))
                }
            </View>
            <View style={styles.classementTableauContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {
                        users_hors_podium.map((user, index) => (<UserCarte key={index} user_DATA={user} userActuel={user_DATA.Id === user.Id} separateur={index !== users_hors_podium.length - 1}/>))
                    }
                    <Text style={styles.finText}>Seul le Top 100 est affiché</Text>
                </ScrollView>
                <View style={styles.userActuelCarte}>
                    <UserCarte user_DATA={user_DATA} userActuel={true} separateur={false}/>
                </View>
            </View>
        </View>
    )
}

const PODIUM_ORDRE = [1, 0, 2];

const PODIUM_CONFIG =
    {
        widths: ["100%", "100%", "100%"],
        heights: ["55%", "40%", "30%"],
    };

const podiumStyle = [0, 1, 2].map((index) => ({
    place: {
        width: PODIUM_CONFIG.widths[index],
        height: PODIUM_CONFIG.heights[index],
    },
}));


const Place = ({user_DATA}) => {
    if (!user_DATA) return null;

    const num = user_DATA.Classement;
    const style = podiumStyle[num-1];

    return (
        <View style={styles.placeContainer}>
            <Image
                source={user_DATA?.Photo_url || DEFAULT_PICTURE}
                style={styles.placePicture}
            />
            <Text style={styles.placeNomText}>{user_DATA?.Nom || "USER_NOM"}</Text>
            <View style={styles.placeTropheesContainer}>
                <Text style={styles.placeTropheesText}>{formatNombreCourt(user_DATA?.Trophees || -1)}</Text>
                <Image source={tropheeIcon} style={styles.podiumTropheeIcon}/>
            </View>
            <View style={[styles.place, style.place]}>
                <Text style={styles.placeNumero}>{num}</Text>
            </View>
        </View>
    )
}

const UserCarte = ({user_DATA, userActuel = false, separateur = true}) => {
    return (
        <View style={styles.userTopContainer}>
            <Text style={styles.userTopText}>{formatNombreCourt(user_DATA.Classement || -1)}</Text>
            <View style={styles.userInfoContainer}>
                <Image source={user_DATA?.Photo_url || DEFAULT_PICTURE} style={styles.userTopPicture}/>
                <Text style={styles.userTopName}>{user_DATA?.Nom || "USER_NOM"} {userActuel && "(Vous)"}</Text>{/* TODO Mettre (Vous quand c'est le user Actuel)*/}
            </View>
            <View style={styles.userTropheesContainer}>
                <Text style={styles.userTropheesText}>{formatNombreCourt(user_DATA?.Trophees || -1)}</Text>
                <Image source={tropheeIcon} style={styles.TropheesIcon}/>
            </View>
            {
                separateur &&
                <View style={styles.separateurWrapper}>
                    <View style={styles.demiLigneSeparateur}/>
                </View>
            }
        </View>
    )
}


// ---------------- MA CARRIERE ----------------

const MaCarriere = ({isActive, user_DATA}) => {
    if (!user_DATA) return null;

    const {rankPrecedent , rankActuel, rankSuivant} = getCarriere(user_DATA.Trophees);

    const tropheesPourPalierSuivant = rankSuivant ? (rankSuivant.requiredTrophies - rankActuel.requiredTrophies) : 0;
    const tropheesDepuisPalierActuel = user_DATA.Trophees - rankActuel.requiredTrophies;
    const pourcentageDAvancement = Math.min((tropheesDepuisPalierActuel) / tropheesPourPalierSuivant, 1);

    return (
        <View style={[{display: isActive ? "flex" : "none"}, styles.macarriereContainer]}>
           <View style={styles.rankInfoContainer}>
               <Text style={styles.titreCarriere}>Vous êtes</Text>
               <View style={styles.rankContainer}>
                   <View>
                       <Image source={rankPrecedent?.image || null} style={styles.rankCoter}/>
                       <Image source={rankPrecedent?.image || null} style={[styles.rankCoter, styles.rankSombre]} />
                   </View>
                   <Image source={rankActuel.image} style={styles.rankActuel}/>
                   <View>
                       <Image source={rankSuivant?.image || null} style={styles.rankCoter}/>
                       <Image source={rankSuivant?.image || null} style={[styles.rankCoter, styles.rankSombre]} />
                   </View>
               </View>
               <View>
                   <Text style={[styles.rankNomText,{color : rankActuel.color}]}>{rankActuel.name + " " + rankActuel.division}</Text>
                   <Text style={styles.rankDescriptionText}>{rankActuel.description}</Text>
               </View>
           </View>
           <View style={styles.tropheesInfoContainer}>
               <View style={styles.barreDeProgressionContainer}>
                   <Text style={styles.tropheesPalier}>{rankActuel ? formatNombreCourt(rankActuel.requiredTrophies) : ""}</Text>
                   <View style={styles.barreDAvancementContainer}>
                       <View
                           style={{
                               backgroundColor: rankActuel.color,
                               borderRadius: 24,
                               width: `${pourcentageDAvancement * 100}%`,
                           }}
                       />
                       <View
                           style={{
                               width: `${(1 - pourcentageDAvancement) * 100}%`,
                           }}
                       />
                   </View>
                   <Text style={styles.tropheesPalier}>{rankSuivant ? formatNombreCourt(rankSuivant.requiredTrophies) : "∞"}</Text>
               </View>
               <Text style={styles.tropheesUser}>{formatNombreCourt(user_DATA.Trophees)} Trophées</Text>
           </View>
           <View style={styles.boutonsContainer}>
               <View style={styles.bulleInfoPrincipal}>
                   <Image source={medaille} style={styles.infoPrincipalImage}/>

                   <Text style={styles.infoPrincipalText}>Classement global : <Text style={styles.classementGlobalText}>#{formatNombreEspace(user_DATA.Classement || -1)}</Text></Text>
               </View>
               <View style={styles.boutonsSecondaireContainer}>
                   <TouchableOpacity style={styles.boutonSecondaire}>
                       <Text style={styles.boutonSecondaireText}>En savoir plus sur le classement</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.boutonSecondaire}>
                       <Text style={styles.boutonSecondaireText}>Voir les rangs disponibles</Text>
                   </TouchableOpacity>
               </View>
           </View>
        </View>
    )
}


// ---------------- CLASSEMENT ----------------
const CONFIG_TABNAVBAR = {
    leaderboard : {transparent : true},
    macarriere : {transparent : false},
}

export default function Classement(){

    const ongletsMobile = [
        {id: "leaderboard", label: "Leaderboard", component: Leaderboard},
        {id: "macarriere", label: "Ma carrière", component: MaCarriere},
    ];

    const [ongletActifId, setOngletActifId] = React.useState("leaderboard");

    const config = CONFIG_TABNAVBAR[ongletActifId];

    const user_DATA = {
        Id : 35,
        Nom : "",
        Pseudo : "",
        Photo_url : "",
        Trophees : Math.floor(Math.random() * 100000),
    };//TODO récupérer les vrai données (les données de l'utilisateur connecté)

    const users_DATA = Array.from({ length: 300 }, (_, index) => ({
        Id: index + 1,
        Nom: `USER_NOM`,
        Pseudo: `USER_PSEUDO`,
        Photo_url: "",
        Trophees: Math.floor(Math.random() * 100000),
    }));//TODO récupérer les vrai données (les données de tout les utilisateurs de l'application)

    const allUsers = [
        ...users_DATA.filter(u => u.Id !== user_DATA.Id),
        user_DATA,
    ];

    const usersSortedByRank = [...allUsers]
        .sort((a, b) => b.Trophees - a.Trophees)
        .map((u, i) => ({ ...u, Classement: i + 1 }));

    const userClassement =
        usersSortedByRank.findIndex(u => u.Id === user_DATA.Id) + 1;

    const user_DATA_WITH_RANK = {
        ...user_DATA,
        Classement: userClassement,
    };

    const leaderboard_DATA = usersSortedByRank.slice(0,100)

    return(
        <View style={[styles.container, config.transparent && {backgroundColor: "#05D991"}]}>

            <View style={{ flex: 1}}>
                <Header titre={"Classement"} boutonRetour={true} fondTransparent={config.transparent}/>
                <View style={{ flex: 1}}>
                    <TabNavbarMobile
                        ongletActifId={ongletActifId}
                        onglets={ongletsMobile}
                        setOngletActif={setOngletActifId}
                        transparent={config.transparent}
                    />

                    {
                        ongletsMobile.map((onglet) => {
                            const OngletComponent = onglet.component;
                            return (
                                <OngletComponent
                                    key={onglet.id}
                                    isActive={onglet.id === ongletActifId}
                                    setOngletActifId={setOngletActifId}
                                    user_DATA={user_DATA_WITH_RANK}
                                    leaderboard_DATA={leaderboard_DATA}
                                />
                            );
                        })
                    }
                </View>
            </View>
        </View>
    );
};
