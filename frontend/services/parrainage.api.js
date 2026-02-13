import {API_URL} from "../constants/API_URL";

export async function existsParrainageCode(code) {
    const res = await fetch(`${API_URL}/parrainage/exists/${code}`, {
        method: "GET",
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    const text = await res.text();
    if (!text) return { exists: false };

    return JSON.parse(text);
}
