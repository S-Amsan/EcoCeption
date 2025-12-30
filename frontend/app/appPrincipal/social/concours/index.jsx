import React from "react";

import EventPage from "../_components/EventPage";

export default function Concours() {
    const concours_DATA = {
        Nom : "Décembre 2025",
        Date_fin : "2025-12-30T17:59:59",
        Points_objectif : 10000,
        Participants : 112,
        Qualifies : 54,
        Cout_inscription : 1000,
    }; //TODO récupérer les vrai données (le concours le plus récent et pas fini, Date_fin > date d'aujourd'hui) -> renvoyer null si pas de concours en cours

    const user_event_DATA = [{
        Nom : "Novembre 2025",
        Date_fin : "2025-11-30T23:59:59",
        Points_objectif : 10000,
        Points_recolte : 12000,
        Recompense : null,
        Participants : 112,
        Qualifies : 54,
        Cout_inscription : 1000,
    },{
        Nom : "Septembre 2025",
        Date_fin : "2025-09-30T23:59:59",
        Points_objectif : 10000,
        Points_recolte : 500,
        Recompense : null,
        Participants : 112,
        Qualifies : 54,
        Cout_inscription : 1000,
    },{
        Nom : "Juin 2025",
        Date_fin : "2025-06-30T23:59:59",
        Points_objectif : 10000,
        Points_recolte : 42332,
        Recompense : null,
        Participants : 112,
        Qualifies : 54,
        Cout_inscription : 1000,
    },{
        Nom : "Mai 2025",
        Date_fin : "2025-05-30T23:59:59",
        Points_objectif : 10000,
        Points_recolte : 15000,
        Recompense : {Nom : "E-carte cadeau 25€ (Amazon)"},
        Participants : 112,
        Qualifies : 54,
        Cout_inscription : 1000,
    }]; //TODO récupérer les vrai données (Tous les concours où l'utilisateur connecté s'est inscrit) -> renvoyer null si pas de concours

    return <EventPage type={"concours"} event_DATA={concours_DATA} user_event_DATA={user_event_DATA}/>
};
