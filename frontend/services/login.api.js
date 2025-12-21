import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUser } from "./RegisterStorage";
import { fetchUserByEmail } from "./user.api";

const API_URL = "http://localhost:8080";

export async function login(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            email,
            password
        }).toString()
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
