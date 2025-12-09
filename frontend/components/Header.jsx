import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title }) {
    const navigation = useNavigation();

    return (
        <View style={{
            height: 60,
            backgroundColor: "#1DDE9A",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            elevation: 4,
        }}>
            {/* Bouton drawer */}
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                    source={require("../assets/menu.png")}
                    style={{ width: 26, height: 26, tintColor: "#fff" }}
                />
            </TouchableOpacity>

            {/* Titre */}
            <Text style={{
                marginLeft: 12,
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                textTransform: "capitalize",
            }}>
                {title}
            </Text>
        </View>
    );
}
