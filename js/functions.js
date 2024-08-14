export async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;  
}
// Ordenar aldeas por cantidad de personajes
export function sortVillagesByCharacters(villages, limit) {
    let sortedVillages = villages.sort((a, b) => b.characters.length - a.characters.length);
    if (limit===0) {
        return sortedVillages;
    }
    return sortedVillages.slice(0, limit);
}

// Ordenar clanes por cantidad de personajes
export function sortClansByCharacters(clans, limit) {
    const sortedClans= clans.sort((a, b) => b.characters.length - a.characters.length);
    if (limit===0) {
        return sortedClans;
    }
    return sortedClans.slice(0, limit);
}
// Ordenar equipos por cantidad de personajes
export function sortTeamsByCharacters(teams, limit) {
    const sortedTeams = teams.sort((a, b) => b.characters.length - a.characters.length);
    if (limit===0) {
        return sortedTeams;
    }
    return sortedTeams.slice(0, limit);
}