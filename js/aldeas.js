import { fetchData, sortVillagesByCharacters, sortClansByCharacters, sortTeamsByCharacters, filterVillages } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {
    init();
});

let villageURL = "https://narutodb.xyz/api/village";
let clanURL = "https://narutodb.xyz/api/clan";
let teamURL = "https://narutodb.xyz/api/team";

// Hacer el fetch de las aldeas, clanes y equipos
async function fetchVillagesClansTeams() {
    try {
        const [villages, clans, teams] = await Promise.all([
            fetchData(villageURL),
            fetchData(clanURL),
            fetchData(teamURL)
        ]);
        console.log('Villages:', villages.villages);
        return {
            villages: villages.villages,
            clans: clans.clans,
            teams: teams.teams
        };
    } catch (error) {
        console.error('Error en la adquisición de datos', error);
    }
}

// Mostrar las aldeas en pantalla
function displayVillages(villages) {
    let container = document.getElementById('village-container');
    container.innerHTML = ''; // Limpiar el contenedor

    if (villages.length === 0) {
        let noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'alert alert-warning text-center';
        noResultsMessage.textContent = 'No se encontraron resultados';
        container.appendChild(noResultsMessage);
    }
    else {
        villages.forEach(village => {
            let card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${village.name}</h5>
                    </div>
                    `;
                    
            container.appendChild(card);
        });
        
    }
}

function generateClanOptions(clans) {
    clans.forEach(clan => {
        let option = document.createElement('option');
        option.value = clan.name;
        option.textContent = clan.name;
        clanSelect.appendChild(option);
    });
}
function generateTeamOptions(teams) {
    teams.forEach(team => {
        let option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });
}

async function init() {
    const { villages, clans, teams } = await fetchVillagesClansTeams();
    const searchTextInput = document.getElementById('searchText');
    const clanSelect = document.getElementById('clanSelect');
    const teamSelect = document.getElementById('teamSelect');
    const top4Clans = sortClansByCharacters(clans, 4);
    const top4Teams = sortTeamsByCharacters(teams, 4);

    generateTeamOptions(top4Teams);
    generateClanOptions(top4Clans);

    displayVillages(sortVillagesByCharacters(villages, 0));

    function updateResults() {
        const searchText = searchTextInput.value;
        const selectedClan = clanSelect.value;
        const selectedTeam = teamSelect.value;

        const filteredVillages = filterVillages(villages, searchText, selectedClan, selectedTeam);
        const sortedVillages = sortVillagesByCharacters(filteredVillages, 0);
        displayVillages(sortedVillages);
    }

    searchTextInput.addEventListener('input', updateResults);
    clanSelect.addEventListener('change', updateResults);
    teamSelect.addEventListener('change', updateResults);
}
