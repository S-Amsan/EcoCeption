import {Platform} from "react-native";

const API_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:8080"
        : "http://192.168.1.8:8080";
export async function fetchUserByEmail(email) {
    const res = await fetch(`${API_URL}/user/${email}`);
    const user = await res.json();

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user;
}
