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

    const user_event_DATA = [{
        Nom : "Hiver Durable ❄️",
        Date_fin : "2026-01-15T17:59:59",
        Points_objectif : 50000,
        Points_recolte : 2324,
        Recompense : null,
        Participants : 342,
        Qualifies : 72,
        Cout_inscription : 5000,
    }]; //TODO récupérer les vrai données -> renvoyer null si pas inscrit

    return <EventPage type={"evenements"} event_DATA={evenements_DATA} user_event_DATA={user_event_DATA}/>
};
