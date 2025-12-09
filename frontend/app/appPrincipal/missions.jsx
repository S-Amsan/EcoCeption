import {ScrollView, Text} from "react-native";
import Header from "../../components/Header";

export default function Missions(){
    return(
        <ScrollView>
            <Header title={"Missions"}/>
            <Text>
                C Les missions ici
            </Text>
        </ScrollView>
    );
};