
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";

/**
 * Example response:
 * ```json
 * {
 *   "id": 1,
 *   "title": "Canapé",
 *   "address": "143 avenue de Versailles",
 *   "description": "Vieux truc pourri",
 *   "photoUrl": "http://82.66.240.161:8090/files/be1da047d3f3323851a1219447158af54df17496f2f48d2dc3f0768b7eb00582.png",
 *   "pickedUp": false,
 *   "creationDate": "2026-01-08",
 *   "user_id": 1
 * }
 * ```
*/
export async function postObject(title, description, address, photoUri) {
    const token = await AsyncStorage.getItem('@auth_token');
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    const fileRes = await fetch(photoUri);
    const bytes = await fileRes.arrayBuffer();
    const blob = new Blob([bytes]);
    formData.append("image", blob);

    const response = await fetch(`${API_URL}/object/post`, {
        method: "POST",
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });

    return response.json();
}

/**
 * Example response:
 * ```json
 * [
 *   {
 *     "id": 1,
 *     "title": "Canapé",
 *     "address": "143 avenue de Versailles",
 *     "description": "Vieux truc pourri",
 *     "photoUrl": "http://82.66.240.161:8090/files/be1da047d3f3323851a1219447158af54df17496f2f48d2dc3f0768b7eb00582.png",
 *     "pickedUp": false,
 *     "creationDate": "2026-01-08",
 *     "user_id": 1
 *   }
 * ]
 * ```
*/
export async function getAllObjects() {
    const response = await fetch(`${API_URL}/object/getAll`);
    return response.json();
}
