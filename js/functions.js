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

// Filtrar aldeas
export function filterVillages(villages, searchText, selectedClan, selectedTeam) {
    return villages.filter(village => {
        const hasSearchText = village.name.toLowerCase().includes(searchText.toLowerCase());
        const hasClan = selectedClan ? village.clan === selectedClan : true;
        const hasTeam = selectedTeam ? village.team === selectedTeam : true;
        return hasSearchText && hasClan && hasTeam;
    });
}
// Generar opciones de clanes
export function generateClanOptions(clans) {
    clans.forEach(clan => {
        let option = document.createElement('option');
        option.value = clan.name;
        option.textContent = clan.name;
        clanSelect.appendChild(option);
    });
}
// Generar opciones de equipos
export function generateTeamOptions(teams) {
    teams.forEach(team => {
        let option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });
}
export function buscarPropiedad(objeto, propiedad) {
    if (objeto.hasOwnProperty(propiedad)) {
        return objeto[propiedad];
    } else {
        for (var clave in objeto) {
            if (typeof objeto[clave] === 'object') {
                var resultado = buscarPropiedad(objeto[clave], propiedad);
                if (resultado !== null) {
                    return resultado;
                }
            }
        }
    }
    return null;
}