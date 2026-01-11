import {Platform} from "react-native";

export const API_URL =
    Platform.OS === "android" || Platform.OS === "ios"
        ? "https://regine-umbonic-nonactionably.ngrok-free.dev"
        : "http://localhost:8080";
