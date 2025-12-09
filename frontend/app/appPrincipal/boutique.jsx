import {ScrollView, Text} from "react-native";
import Header from "../../components/Header";

export default function Boutique(){
    return(
        <ScrollView>
            <Header title={"Boutique"}/>
            <Text>
                C La boutique ici
            </Text>
        </ScrollView>
    );
};