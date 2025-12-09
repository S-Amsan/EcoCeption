import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import Header from "../../components/Header"

export default function Accueil() {
    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <Header title="Accueil" />
            <View style={styles.content}>

                <LinearGradient colors={['#0CD8A9', '#00DB83']}>
                    <View style={styles.header}>
                        <View style={styles.searchBox}>
                            <Ionicons name="search" size={20} color="#777" />
                            <TextInput
                                placeholder="Rechercher un utilisateur"
                                style={styles.input}
                                placeholderTextColor="#777"
                            />
                        </View>


                        <View style={styles.filtersContainer}>
                            <TouchableOpacity style={styles.filterBtn}>
                                <Text style={styles.filterText}>Récent</Text>
                                <Ionicons name="chevron-down" size={18} color="#000" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.filterBtn}>
                                <Text style={styles.filterText}>France</Text>
                                <Ionicons name="chevron-down" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                {/* Carte utilisateur */}
                <View style={styles.card}>
                    <View style={styles.userRow}>
                        <Image
                            source={require('../../assets/image.png')}
                            style={styles.avatar}
                        />

                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            <Text style={styles.username}>@Phuong </Text>
                            <Text style={styles.danger}>(utilisateur dangereux)</Text>
                        </View>

                        <Text style={styles.time}>· 2 minutes</Text>
                    </View>

                    <Image
                        source={{
                            uri: "https://i.pravatar.cc/100?img=5"
                        }}
                        style={styles.postImage}
                    />

                    <View style={styles.actions}>
                        <TouchableOpacity>
                            <Ionicons name="arrow-up" size={26} color="#444" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons name="arrow-down" size={26} color="#444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    header: {
        padding:20,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    searchBox: {
        width:'50%',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 15
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    filtersContainer: {
        flexDirection: "row",
        gap: 10
    },
    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8e8e8",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10
    },
    filterText: {
        marginRight: 4,
        fontWeight: "500"
    },


    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd"
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        flexWrap: "wrap"
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10
    },
    username: {
        fontWeight: "bold",
        fontSize: 16
    },
    danger: {
        color: "red",
        fontSize: 14
    },
    time: {
        marginLeft: 6,
        color: "#777",
        fontSize: 13
    },
    postImage: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginTop: 10
    },
    actions: {
        flexDirection: "row",
        gap: 15,
        marginTop: 10
    }
});
