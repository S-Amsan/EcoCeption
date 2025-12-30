import React, { useEffect, useState, useRef } from "react";
import {
    ScrollView,
    View,
    ActivityIndicator,
    Animated
} from "react-native";

import Header from "../../../components/Header";
import PostCard from "./PostCard";
import style from "./styles/accueilStyle";
import Navbar from "../../../components/Navbar";
import { loadUser as loadUserFromStorage } from "../../../services/RegisterStorage";
import { isWeb } from "../../../utils/platform";

export default function Index() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => {
        async function initUser() {
            const storedUser = await loadUserFromStorage();
            setUser(storedUser);
        }
        initUser();
    }, []);


    useEffect(() => {
        const fakePosts = [
            { id: 1,
                username: "EcoWarrior",
                avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEuxNTNZ9pcyw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732986053908?e=2147483647&v=beta&t=KXGYmWrWy4lV6GsVKTahXunyKG4OOIU7-TS_oMW5Q-8",
                isDangerous: false,
                time: "il y a 2h",
                postImage: "https://picsum.photos/600/400?random=1" },
            {
            id: 2, username: "GreenLife",
                avatar: "https://i.pravatar.cc/150?img=32",
                isDangerous: true,
                time: "il y a 5h",
                postImage: "https://picsum.photos/600/400?random=2" },
            { id: 3, username: "CleanCity",
                avatar: "https://i.pravatar.cc/150?img=45",
                sDangerous: false,
                time: "hier",
                postImage: "https://picsum.photos/600/400?random=3" } ]
        ; setTimeout(() => {
            setPosts(fakePosts); setLoading(false); }, 800); }, []);


    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState([
        { id: "tri", options: ["Récent", "Ancien"], select: "Récent" },
        { id: "lieu", options: ["France", "Autre"], select: "France" }
    ]);


    const navbarTranslateY = useRef(new Animated.Value(0)).current;
    const lastScrollY = useRef(0);
    const NAVBAR_HEIGHT = 90;

    const handleScroll = (event) => {
        const currentY = event.nativeEvent.contentOffset.y;

        if (currentY > lastScrollY.current + 5) {
            Animated.timing(navbarTranslateY, {
                toValue: NAVBAR_HEIGHT,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else if (currentY < lastScrollY.current - 5) {
            Animated.timing(navbarTranslateY, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }

        lastScrollY.current = currentY;
    };

    if (isWeb) {
        return (
            <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
                {/* CONTENU DROIT */}
                <View style={{ flex: 1 }}>
                    <Header
                        recherche={recherche}
                        setRecherche={setRecherche}
                        filtres={filtres}
                        setFiltres={setFiltres}
                        userDetails
                        userProfil
                    />
                    <ScrollView>
                    <View style={{ flex: 1, padding: 15 }}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#1DDE9A" />
                        ) : (
                            <View>
                                {posts.map(p => (
                                    <PostCard key={p.id} post={p} styles={style} />
                                ))}
                            </View>
                        )}
                    </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

            {/* NAVBAR MOBILE ANIMÉE */}
            <Animated.View
                style={{
                    transform: [{ translateY: navbarTranslateY }],
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                }}
            >
                <Navbar />
            </Animated.View>

            {/* CONTENU */}
            <View style={{ flex: 1 }}>
                <Header
                    boutonNotification
                    userProfil
                    userDetails
                    user={user}
                />

                <View style={{ flex: 1, padding: 15 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#1DDE9A" />
                    ) : (
                        <ScrollView
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            contentContainerStyle={{ paddingBottom: NAVBAR_HEIGHT + 20 }}
                        >
                            {posts.map(p => (
                                <PostCard key={p.id} post={p} styles={style} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>
        </View>
    );
}
