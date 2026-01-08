
// Exemples :
// formatNombreCourt(950)        => "950"
// formatNombreCourt(1200)       => "1.2k"
// formatNombreCourt(10000)      => "10k"
// formatNombreCourt(2500000)    => "2.5M"
// formatNombreCourt(3000000000) => "3B"
// formatNombreCourt(null)       => ""
// formatNombreCourt(undefined)  => ""
export const formatNombreCourt  = (n) => {
    if (n == null) return "";

    return n >= 1e9 ? (n / 1e9).toFixed(1).replace('.0', '') + 'B'
        : n >= 1e6 ? (n / 1e6).toFixed(1).replace('.0', '') + 'M'
            : n >= 1e3 ? (n / 1e3).toFixed(1).replace('.0', '') + 'k'
                : n.toString();
};

// Exemples :
// formatNombreEspace(1000)        => "1 000"
// formatNombreEspace(1234567)    => "1 234 567"
// formatNombreEspace(50)          => "50"
// formatNombreEspace(0)           => "0"
// formatNombreEspace(null)        => ""
// formatNombreEspace(undefined)   => ""
export const formatNombreEspace = (n) => {
    if (n == null) return "";

    return n
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default function parseIsoLocal(dateString) {
    if (!dateString) return null;

    // Si on a juste une date → on ajoute une heure par défaut
    let s = String(dateString);
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        s = s + "T00:00:00";
    } else {
        s = s.replace(" ", "T");
    }

    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
}


export function formatRelativeTime(dateString) {
    const date = parseIsoLocal(dateString);
    if (!date) return "";

    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const isFuture = diffMs > 0;

    const absMinutes = Math.floor(Math.abs(diffMs) / 60000);
    const absHours = Math.floor(absMinutes / 60);
    const absDays = Math.floor(absHours / 24);
    const absWeeks = Math.floor(absDays / 7);
    const absMonths = Math.floor(absDays / 30);
    const absYears = Math.floor(absDays / 365);

    const prefix = isFuture ? "dans" : "il y a";

    if (absMinutes < 1) return "à l’instant";
    if (absMinutes < 60) return `${prefix} ${absMinutes} min`;
    if (absHours < 24) return `${prefix} ${absHours} h`;
    if (absDays < 7) return `${prefix} ${absDays} j`;
    if (absWeeks < 4) return `${prefix} ${absWeeks} sem`;
    if (absMonths < 12) return `${prefix} ${absMonths} mois`;
    return `${prefix} ${absYears} an${absYears > 1 ? "s" : ""}`;
}





