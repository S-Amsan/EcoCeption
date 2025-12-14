import {View} from "react-native";
import React from "react";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

import {isWeb} from "../../../utils/platform";

import style from "./styles/styles";

export default function Profil(){
    const onglets = [
        {id: "profil",label : "Votre profil", page : "votreProfil"},
        {id: "flamme",label : "Votre Série", page : "votreSerie"},
    ];

    return(

        <View style={style.container}>
            {
                isWeb &&
                    <View style={{ width: "15%" }}>
                        <Navbar/>
                    </View>
            }
            <View style={{ flex: 1}}>
                {
                    isWeb ?
                        <Header onglets={onglets} />
                        :
                        <Header titre={"Mon profil"} boutonRetour={true} boutonParametres={true}/>
                }
            </View>
        </View>
    );
};
