
export const tempsRestant = (dateFin) => {
    const maintenant = new Date();
    const fin = new Date(dateFin);

    const diffMs = fin - maintenant;

    if (diffMs <= 0) return "Terminé";

    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHeures = Math.floor(diffMin / 60);
    const diffJours = Math.floor(diffHeures / 24);

    if (diffJours >= 1) {
        return `${diffJours} jour${diffJours > 1 ? "s" : ""}`;
    }

    if (diffHeures >= 1) {
        const heures = diffHeures;
        const minutes = diffMin % 60;
        return `${heures} h ${minutes} min`;
    }

    return `${diffMin} min`;
};

export const tempsEcoule = (dateDebut) => {
    const maintenant = new Date();
    const debut = new Date(dateDebut);

    const diffMs = maintenant - debut;

    if (diffMs <= 0) return "À l’instant";

    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHeures = Math.floor(diffMin / 60);
    const diffJours = Math.floor(diffHeures / 24);

    // Après 60 jours → mois
    if (diffJours >= 60) {
        const diffMois = Math.floor(diffJours / 30);
        return `${diffMois} mois`;
    }

    if (diffJours >= 1) {
        return `${diffJours} jour${diffJours > 1 ? "s" : ""}`;
    }

    if (diffHeures >= 1) {
        const heures = diffHeures;
        const minutes = diffMin % 60;
        return `${heures} h ${minutes} min`;
    }

    return `${diffMin} min`;
};
