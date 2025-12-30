import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUser } from "./RegisterStorage";
import { Platform } from "react-native";
import { fetchUserByEmail } from "./user.api";

const API_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:8080"
        : "http://localhost:8080";

export async function login(email, password) {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    // 🔹 IMPORTANT : on ne lit PAS le body ici
    // le backend ne renvoie rien d’utile pour l’instant

    // 🔹 On sauvegarde l’email pour la session
    await AsyncStorage.setItem("@auth_email", email);

    // 🔹 On récupère le user complet
    const user = await fetchUserByEmail(email);

    // 🔹 On stocke le user
    await saveUser(user);

    return user;
}
