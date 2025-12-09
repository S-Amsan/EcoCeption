import {Image, View, Text, TextInput, TouchableOpacity,} from "react-native";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import style from "./styles/parrainageStyles"
import * as navigation from "expo-router/build/global-state/routing";

export default function Age(){
    const handleAge=()=>{
        navigation.navigate('photo');
    }
    return(
        <LinearGradient
            colors={['#00DB83', '#0CD8A9']}
            style={style.gradient}
        >
            <View style={style.container}>
                <Image
                    source={require('../assets/logo.png')}
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.title}>
                    Entrez votre âge
                </Text>

                <Text style={style.sub}>
                    Votre âge sert uniquement à des statistiques et reste confidentiel.
                </Text>

                <View style={style.inputBox}>
                    <TextInput
                        style={style.input}
                        placeholder="Entrez votre âge"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={style.nextStep}
                                      onPress={handleAge}>
                        <Text style={style.text}>Passer {">"}</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={style.submit}>
                    <Text style={style.buttonText}>Valider</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );


};