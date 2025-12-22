import React from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";

export default function MissionsPage() {

    const items = [
        {
            id: 1,
            title: "Barbecue",
            address: "96 Av. de La Liberté Tunis",
            distance: "5 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/missions/scan.png"),
        },
        {
            id: 2,
            title: "Équipements maison",
            address: "96 Av. de La Liberté Tunis",
            distance: "13 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/missions/objet.png"),
        },
        {
            id: 3,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "hier",
            image: require("../../../../../assets/missions/scan.png"),
        },
    ];

    if (isWeb) {
        return (
            <View style={styles.page}>
                {/* COLONNE GAUCHE */}
                <View style={styles.left}>
                        <Text style={styles.header}>
                            Objets à récupérer autour de vous
                        </Text>
                    <ScrollView showsVerticalScrollIndicator>
                        {items.map(item => (
                            <View key={item.id} style={styles.card}>
                                <Image source={item.image} style={styles.image}/>

                                <View style={styles.content}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.address}>📍 {item.address}</Text>
                                    <Text style={styles.meta}>
                                        {item.author} • {item.time}
                                    </Text>
                                </View>

                                <View style={styles.right}>
                                    <Text style={styles.distance}>{item.distance}</Text>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            Voir l’objet
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                    <View style={styles.rightPanel}>
                        <InfoCard
                            title="Scanner un QR code et poster"
                            description="Scanner le QR code d’un partenaire puis prenez le produit en photo."
                            button="Commencer"
                        />

                        <InfoCard
                            title="Objets abandonnés"
                            description="Poster des objets abandonnés pour leur donner une seconde vie."
                            button="Commencer"
                        />
                    </View>
            </View>
        );
    }
        return (
            <ScrollView showsVerticalScrollIndicator={true}>
                    <InfoHeader
                        title={"Parrainer un ami"}
                        image={require("../../../../../assets/missions/parrainage.png")}
                        description="+1000/filleul"
                    />
                <View style={styles.infoBox}>
                    <InfoCard
                        title="Scanner un QR code et poster"
                        description="Scanner le QR code d’un partenaire puis prenez le produit en photo."
                        button="Commencer"
                        image={require("../../../../../assets/missions/scan.png")}
                    />

                    <InfoCard
                        title="Objets abandonnés"
                        description="Poster des objets abandonnés pour leur donner une seconde vie."
                        button="Commencer"
                        image={require("../../../../../assets/missions/objet.png")}
                    />
                </View>

                <View style={styles.objetBox}>
                    <View style={styles.left}>
                        <Text style={styles.header}>
                            Objets à récupérer autour de vous
                        </Text>
                            {items.map(item => (
                                <View key={item.id} style={styles.card}>
                                    <Image source={item.image} style={styles.image}/>

                                    <View style={styles.content}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.address}>📍 {item.address}</Text>
                                        <Text style={styles.meta}>
                                            {item.author} • {item.time}
                                        </Text>
                                    </View>

                                    <View style={styles.right}>
                                        <Text style={styles.distance}>{item.distance}</Text>

                                        <TouchableOpacity style={styles.button}>
                                            <Text style={styles.buttonText}>
                                                Voir l’objet
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                </View>
                </View>
            </ScrollView>
        );
}


function InfoCard({ title, description, button, image }) {
    return (
        <View style={styles.infoCard}>

            <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{title}</Text>
                <Text style={styles.infoDesc}>{description}</Text>

                <TouchableOpacity style={styles.infoButton}>
                    <Text style={styles.infoButtonText}>{button}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageWrapper}>
                <Image source={image} style={styles.infoImage} />
            </View>

        </View>
    );
}

function InfoHeader({ title, description,image}) {
    return (
        <View style={styles.infoHeader}>
            <View style={{flexDirection:"row"}}>
            <View>
                <Text style={styles.infoTitle}>{title}</Text>

                <Text style={styles.infoDesc}>{description}</Text>

            </View>
            <Image
                source={image}
                style={styles.HeaderImage}
                resizeMode="contain"
            />
        </View>
        </View>
    );
}
