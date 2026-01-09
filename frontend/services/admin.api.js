import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../constants/API_URL";

export async function checkReport(reportId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/check_report/${reportId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function invalidatePost(postId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/invalidate_post/${postId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function banUser(userId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/ban/${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function unbanUser(userId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/unban/${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function validateDocument(documentId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/document/${documentId}/validate`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function invalidateDocument(documentId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/document/${documentId}/invalidate`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}
