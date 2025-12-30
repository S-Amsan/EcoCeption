import {Platform} from "react-native";

const API_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:8080"
        : "http://localhost:8080";

export async function fetchUserByEmail(email) {
    const res = await fetch(`${API_URL}/user/${email}`);
    const user = await res.json();

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user;
}

export async function fetchUsers() {
    const res = await fetch(`${API_URL}/user/all`);
    const users = await res.json();

    return users;
}
