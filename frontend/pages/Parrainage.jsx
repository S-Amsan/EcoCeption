import {Image, View} from "react-native";
import React from "react";

export default function Parrainage(){
    return(
        <View>
            <View>
                <Image
                    source={require('../assets/logo.png')}
                    resizeMode="contain"
                />
            </View>
        </View>
    );


};