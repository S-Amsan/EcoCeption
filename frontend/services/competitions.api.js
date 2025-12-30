import { Platform } from "react-native";

const API_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:8080"
        : "http://localhost:8080";

/**
 * Response example:
 * ```js
 * [
 *   {
 *     "id": 1,
 *     "name": "Décembre 2025",
 *     "deadline": "2025-12-30T17:59:59.000+00:00",
 *     "goalPoints": 10000,
 *     "participants": 112,
 *     "qualified": 54,
 *     "inscriptionCost": 1000
 *   }
 * ]
 * ```
*/
export async function fetchCompetitions() {
    const res = await fetch(`${API_URL}/competition/all`);
    const competitions = await res.json();
    return competitions;
}
