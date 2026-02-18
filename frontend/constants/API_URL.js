import {Platform} from "react-native";

export const API_URL =
    Platform.OS === "android" || Platform.OS === "ios"
        ? "https://ecoception.fr.nf/api"
        : "https://ecoception.fr.nf/api";
