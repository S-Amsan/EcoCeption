// =======================
// IMPORT DES IMAGES
// =======================
import bronzeIII from '../assets/icones/rank/Bronze III.png'
import bronzeII from '../assets/icones/rank/Bronze II.png'
import bronzeI from '../assets/icones/rank/Bronze I.png'

import argentIII from '../assets/icones/rank/Argent III.png'
import argentII from '../assets/icones/rank/Argent II.png'
import argentI from '../assets/icones/rank/Argent I.png'

import orIII from '../assets/icones/rank/Or III.png'
import orII from '../assets/icones/rank/Or II.png'
import orI from '../assets/icones/rank/Or I.png'

import platineIII from '../assets/icones/rank/Platine III.png'
import platineII from '../assets/icones/rank/Platine II.png'
import platineI from '../assets/icones/rank/Platine I.png'

import diamantIII from '../assets/icones/rank/Diamant III.png'
import diamantII from '../assets/icones/rank/Diamant II.png'
import diamantI from '../assets/icones/rank/Diamant I.png'

import maitreIII from '../assets/icones/rank/Maitre III.png'
import maitreII from '../assets/icones/rank/Maitre II.png'
import maitreI from '../assets/icones/rank/Maitre I.png'

import elite from '../assets/icones/rank/Elite.png'


// =======================
// CONSTANTES
// =======================

const TROPHIES_PER_STEP = 5000
export const RANG_MINIMUM_EVENEMENT = "Or III"

const BASE_RANKS = [
    "Bronze",
    "Argent",
    "Or",
    "Platine",
    "Diamant",
    "Maitre",
    "Elite",
]

const DIVISIONS = ["III", "II", "I"]


// =======================
// MAPPINGS
// =======================

const IMAGE_BY_FULL_RANK = {
    "Bronze III": bronzeIII,
    "Bronze II": bronzeII,
    "Bronze I": bronzeI,

    "Argent III": argentIII,
    "Argent II": argentII,
    "Argent I": argentI,

    "Or III": orIII,
    "Or II": orII,
    "Or I": orI,

    "Platine III": platineIII,
    "Platine II": platineII,
    "Platine I": platineI,

    "Diamant III": diamantIII,
    "Diamant II": diamantII,
    "Diamant I": diamantI,

    "Maitre III": maitreIII,
    "Maitre II": maitreII,
    "Maitre I": maitreI,

    "Elite": elite,
}

const DESCRIPTION_BY_FULL_RANK = {
    "Bronze III": "Un débutant de l’éco-engagement",
    "Bronze II": "Un citoyen sensible à l’écologie",
    "Bronze I": "Un citoyen engagé pour la planète",

    "Argent III": "Un éco-responsable en devenir",
    "Argent II": "Un éco-responsable régulier",
    "Argent I": "Un éco-responsable confirmé",

    "Or III": "Un éco-responsable en Or",
    "Or II": "Un éco-acteur exemplaire",
    "Or I": "Un éco-acteur de référence",

    "Platine III": "Un pilier de l’écologie quotidienne",
    "Platine II": "Un modèle d’engagement écologique",
    "Platine I": "Un leader éco-responsable",

    "Diamant III": "Un ambassadeur de la transition écologique",
    "Diamant II": "Un ambassadeur écologique reconnu",
    "Diamant I": "Un ambassadeur écologique d’exception",

    "Maitre III": "Un maître des actions durables",
    "Maitre II": "Un expert de l’engagement écologique",
    "Maitre I": "Un maître incontesté de l’écologie",

    "Elite": "Une légende de l’engagement écologique",
}

const COLOR_BY_RANK = {
    "Bronze": "#ac5f26",
    "Argent": "#898b87",
    "Or": "#f8c131",
    "Platine": "#88aacc",
    "Diamant": "#4cdecc",
    "Maitre": "#e2aded",
    "Elite": "#ed4f3c",
}


// =======================
// GÉNÉRATION DES RANGS
// =======================

export const RANK_PALIERS = []

let trophies = 0
let id = 1

for (const rank of BASE_RANKS.slice(0, -1)) {
    for (const division of DIVISIONS) {
        const fullName = `${rank} ${division}`

        RANK_PALIERS.push({
            id: id++,
            name: rank,
            division,
            requiredTrophies: trophies,
            image: IMAGE_BY_FULL_RANK[fullName],
            description: DESCRIPTION_BY_FULL_RANK[fullName],
            color : COLOR_BY_RANK[rank],
        })

        trophies += TROPHIES_PER_STEP
    }
}

// Rang Elite
RANK_PALIERS.push({
    id: id,
    name: "Elite",
    division: "",
    requiredTrophies: trophies,
    image: elite,
    description: DESCRIPTION_BY_FULL_RANK["Elite"],
    color : COLOR_BY_RANK["Elite"],
})


// =======================
// FONCTIONS UTILITAIRES
// =======================

export function getCurrentRank(userTrophies) {
    for (let i = RANK_PALIERS.length - 1; i >= 0; i--) {
        if (userTrophies >= RANK_PALIERS[i].requiredTrophies) {
            return { rank: RANK_PALIERS[i], index: i }
        }
    }
    return { rank: RANK_PALIERS[0], index: 0 }
}

export function getFullRankName(userTrophies) {
    const { rank } = getCurrentRank(userTrophies)
    return rank.division ? `${rank.name} ${rank.division}` : rank.name
}

export function getRankImage(userTrophies) {
    const fullName = getFullRankName(userTrophies)
    return IMAGE_BY_FULL_RANK[fullName] ?? elite
}

export function getCarriere(userTrophies) {
    const { rank, index } = getCurrentRank(userTrophies)

    return {
        rankPrecedent: index > 0 ? RANK_PALIERS[index - 1] : null,
        rankActuel: rank,
        rankSuivant: index < RANK_PALIERS.length - 1 ? RANK_PALIERS[index + 1] : null,
    }
}

export function getRequiredTrophiesByRankId(rankId) {
    const rank = RANK_PALIERS.find(r => r.id === rankId)
    return rank ? rank.requiredTrophies : -1
}

export function getRequiredTrophiesByRankName(fullRankName) {
    const normalized = fullRankName.trim().toLowerCase()

    const rank = RANK_PALIERS.find(r => {
        const name = r.division ? `${r.name} ${r.division}` : r.name
        return name.toLowerCase() === normalized
    })

    return rank ? rank.requiredTrophies : -1
}
