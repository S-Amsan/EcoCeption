import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import Header from "../../../components/Header";
import PostCard from "./Post/PostCard";
import style from "./styles/accueilStyle";
import Navbar from "../../../components/Navbar";

import SignalementReasons from "./Post/signalement/_components/SignalementReasons";
import SignalementSuccess from "./Post/signalement/_components/SignalementSuccess";

import { Pressable } from "react-native";
import {fetchAllPosts} from "../../../services/posts.api";
import {fetchUserById, fetchUsers} from "../../../services/user.api";

export default function AccueilWeb() {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [showSignalement, setShowSignalement] = useState(false);
    const [signalementStep, setSignalementStep] = useState("reasons");

    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState([
        { id: "tri", options: ["Récent", "Ancien"], select: "Récent" },
        { id: "lieu", options: ["France", "Autre"], select: "France" },
    ]);

    useEffect(() => {
        console.log("Recherche :", recherche);
        console.log("Filtres :", filtres);
    }, [recherche, filtres]);


        useEffect(() => {
            const loadPosts = async () => {
                try {
                    const data = await fetchAllPosts();
                    setPosts(data);
                } catch (error) {
                    console.error("Erreur chargement posts :", error);
                } finally {
                    setLoading(false);
                }
            };

            loadPosts();
        }, []);

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            <View style={{ flex: 1 }}>
                <Header  recherche={recherche}
                         setRecherche={setRecherche}
                         filtres={filtres}
                         setFiltres={setFiltres}
                         userDetails userProfil />

                <ScrollView>
                    <View style={{ padding: 15 }}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#1DDE9A" />
                        ) : (
                            <View style={{ alignItems: "center" }}>

                                {posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        styles={style}
                                        onSignaler={() => {
                                            setSelectedPostId(post.id);
                                            setShowSignalement(true);
                                        }}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>

            {/* ===== MODAL SIGNALEMENT WEB ===== */}
            {showSignalement && (
                <Pressable
                    style={style.modalOverlay}
                    onPress={() => {
                        setShowSignalement(false);
                        setSignalementStep("reasons");
                        setSelectedPostId(null);
                    }}
                >
                    <Pressable style={style.modalContent} onPress={() => {}}>
                        {signalementStep === "reasons" && (
                            <SignalementReasons
                                onSelect={() => setSignalementStep("success")}
                            />
                        )}

                        {signalementStep === "success" && (
                            <SignalementSuccess
                                onDone={() => {
                                    setShowSignalement(false);
                                    setSignalementStep("reasons");
                                    setSelectedPostId(null);
                                }}
                            />
                        )}
                    </Pressable>
                </Pressable>
            )}
        </View>
    );

}
