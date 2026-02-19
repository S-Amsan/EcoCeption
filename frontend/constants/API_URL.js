import {Platform} from "react-native";

export const API_URL =
    Platform.OS === "android" || Platform.OS === "ios"
        ? "http://ecoception.fr.nf/api"
        : "http://ecoception.fr.nf/api";
