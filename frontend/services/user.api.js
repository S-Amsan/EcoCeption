import {Platform} from "react-native";

const API_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:8080"
        : "http://192.168.1.8:8080";
export async function fetchUserByEmail(email) {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();

    const user = users.find(u => u.email === email);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user;
}
