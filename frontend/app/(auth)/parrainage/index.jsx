import { Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import style from "./styles/parrainageStyles";
import {useRouter} from "expo-router";
import Toast from "react-native-toast-message";
import { loadRegisterData, updateRegisterData } from "../../../services/RegisterStorage";
import {existsParrainageCode} from "../../../services/parrainage.api";

export default function Index() {
    const router = useRouter();
    const [parrainCode, setParrainCode] = useState("");

    useEffect(() => {
        async function load() {
            const saved = await loadRegisterData();
            if (saved?.parrainCode) {
                setParrainCode(saved.parrainCode);
            }
        }
        load();
    }, []);

    const handleNext = async () => {
        const response = await existsParrainageCode(parrainCode);
        console.log(response)

        if (!response.exists) {
            Toast.show({
                type: "error",
                text1: "Code invalide",
                text2: "Aucun utilisateur n'est associé à ce code."
            });
            return;
        }

        await updateRegisterData({
            parrainCode: parrainCode.trim() || undefined
        });


        Toast.show({
            type: "success",
            text1: "Code enregistré",
            text2: "Passons à l'étape suivante."
        });

        router.push("age");
    };

    useEffect(() => {
        async function guard() {
            const data = await loadRegisterData();
            if (!data?.pseudo || !data?.email) {
                router.replace("SignUp");
            }
        }
        guard();
    }, []);

    const handleSkip = () => {
        router.navigate("age");
    };

    return (
        <LinearGradient colors={["#00DB83", "#0CD8A9"]} style={style.gradient}>
            <View style={style.container}>
                <Image
                    source={require("../../../assets/logo.png")}
                    style={style.logo}
                    resizeMode="contain"
                />

                <Text style={style.title}>Avez-vous un code de parrainage ?</Text>

                <Text style={style.sub}>Demandez à un ami sinon !</Text>

                <View style={style.inputBox}>
                    <TextInput
                        style={style.input}
                        placeholder="Code de parrainage"
                        placeholderTextColor="#999"
                        value={parrainCode.trim().toUpperCase()}
                        onChangeText={setParrainCode}
                        maxLength={6}
                    />


                    <TouchableOpacity onPress={handleSkip} style={style.skip}>
                        <Text style={style.skipText}>Passer {">"}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.submit} onPress={handleNext}>
                    <Text style={style.buttonText}>Valider mon code</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
