import {Image, View, Text, TextInput, TouchableOpacity,} from "react-native";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import style from "./styles/parrainageStyles"
import * as navigation from "expo-router/build/global-state/routing";

export default function Parrainage(){
    const handleAge=()=>{
        navigation.navigate('age');
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
                    Avez-vous un code de parrainage ?
                </Text>

                <Text style={style.sub}>
                   Demandez à un ami sinon!
                </Text>

                <View style={style.inputBox}>
                    <TextInput
                        style={style.input}
                        placeholder="code de parrainage"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={style.nextStep}
                    onPress={handleAge}>
                        <Text style={style.text}>Passer {">"}</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={style.submit}>
                    <Text style={style.buttonText}>Valider mon code</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );


};