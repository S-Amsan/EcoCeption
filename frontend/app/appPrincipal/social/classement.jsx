import {ScrollView, Text, View} from "react-native";
import React from "react";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import TabNavbar from "../../../components/TabNavbar";

import {isWeb} from "../../../utils/platform";

import style from "./styles/styles";

export default function Classement(){

    const onglets = [
        {id: "classement",label : "Leaderboard", page : "social/classement"},
        {id: "concours",label : "Concours", page : "social/concours"},
        {id: "evenements",label : "Événements", page : "social/evenements"},
    ];

    return(
        <View style={[style.container, {backgroundColor: "#05D991"}]}>
            {
                isWeb &&
                <View style={{ width: "15%" }}>
                    <Navbar/>
                </View>
            }

            <View style={{ flex: 1}}>
                {isWeb ? <Header userDetails={true}/> : <Header titre={"Classement"} boutonRetour={true} fondTransparent={true}/>}
                <ScrollView>
                    {isWeb && <TabNavbar onglets={onglets} pageBack={"social"}/>}
                    <View>
                        <Text>
                            Classement
                        </Text>
                    </View>
                </ScrollView>
            </ View>
        </View>

    );
};
