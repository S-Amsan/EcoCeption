import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";

import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import style from "./styles/ageStyles";
import { loadRegisterData, updateRegisterData } from "../../services/RegisterStorage";
import { useNavigation } from "expo-router";
import Toast from "react-native-toast-message";

export default function Age() {
    const navigation = useNavigation();
    const [age, setAge] = useState("");

    useEffect(() => {
        async function load() {
            const saved = await loadRegisterData();
            if (saved?.age !== undefined) {
                setAge(String(saved.age));
            }
        }
        load();
    }, []);

    const handleSkip = async () => {
        await updateRegisterData({ age: undefined });
        navigation.navigate("photo");
    };

    const handleNext = async () => {
        const cleanAge = Number(age);

        if (Number.isNaN(cleanAge) || cleanAge < 13 || cleanAge > 120) {
            return Toast.show({
                type: "error",
                text1: "Âge invalide",
                text2: "Veuillez entrer un âge entre 13 et 120 ans."
            });
        }

        await updateRegisterData({ age: cleanAge });

        Toast.show({
            type: "success",
            text1: "Âge enregistré"
        });

        navigation.navigate("photo");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <LinearGradient
                    colors={["#00DB83", "#0CD8A9"]}
                    style={style.gradient}
                >

                <View style={style.container}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={style.logo}
                    resizeMode="contain"
                />

                <Text style={style.title}>Entrez votre âge</Text>

                <Text style={style.sub}>
                    Votre âge sert uniquement à des statistiques et reste confidentiel.
                </Text>

                <View style={style.inputBox}>
                    <TextInput
                        style={style.input}
                        placeholder="Entrez votre âge"
                        keyboardType="number-pad"
                        value={age}
                        onChangeText={setAge}
                        returnKeyType="done"
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />


                    <TouchableOpacity onPress={handleSkip} style={style.skip}>
                        <Text style={style.skipText}>Passer {">"}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.submit} onPress={handleNext}>
                    <Text style={style.buttonText}>Valider</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);
}
