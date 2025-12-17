import React from "react";

import EventPage from "../_components/EventPage";

export default function Evenements() {

    const evenements_DATA = {
        Nom : "Hiver Durable ❄️",
        Date_fin : "2026-01-15T17:59:59",
        Points_objectif : 50000,
        Participants : 342,
        Qualifies : 72,
        Cout_inscription : 5000,
    }; //TODO récupérer les vrai données -> renvoyer null si pas d'

    const evenements_user_DATA = {
        Points_recolte : 2324
    }; //TODO récupérer les vrai données -> renvoyer null si pas inscrit

    const user_DATA = {
        Id : 1,
        Nom : "",
        Pseudo : "",
        Photo_url : "",
        Trophees : 57400,
        Classement : 1544487,

    }; //TODO récupérer les vrai données

    return <EventPage type={"evenements"} event_DATA={evenements_DATA} event_user_DATA={evenements_user_DATA} user_DATA={user_DATA} />
};