import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../constants/API_URL";


export async function existsParrainageCode(code) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/parrainage/exists/${code}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}
