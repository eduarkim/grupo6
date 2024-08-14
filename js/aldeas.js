import { fetchData, sortVillagesByCharacters, sortClansByCharacters, sortTeamsByCharacters } from './functions.js';

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
        return { villages: villages.villages,
            clans: clans.clans,
            teams: teams.teams
        };
    } catch (error) {
        console.error('Error en la adquisición de datos', error);    
    }
}


// Filtrar aldeas
function filterVillages(villages, searchText, selectedClan, selectedTeam) {
    return villages.filter(village => {
        const hasSearchText = village.name.toLowerCase().includes(searchText.toLowerCase());
        const hasClan = selectedClan ? village.clan === selectedClan : true;
        const hasTeam = selectedTeam ? village.team === selectedTeam : true;
        return hasSearchText && hasClan && hasTeam;
    });    
}

// Otro filtro de aldeas
// function filterVillages(villages, searchText, selectedClan, selectedTeam) {
//     return villages.filter(village => 
//         village.name.toLowerCase().includes(searchText.toLowerCase()) &&
//         (!selectedClan || village.clan === selectedClan) &&
//         (!selectedTeam || village.team === selectedTeam)
//     );
// }



function displayVillages(villages) {
    // Implement your UI update logic here
    console.table(villages); // For demonstration, we use console.table
}

async function init() {
    const { villages, clans, teams } = await fetchVillagesClansTeams();
    const searchTextInput = document.getElementById('searchText');
    const clanSelect = document.getElementById('clanSelect');
    const teamSelect = document.getElementById('teamSelect');

    function updateResults() {
        const searchText = searchTextInput.value;
        const selectedClan = clanSelect.value;
        const selectedTeam = teamSelect.value;

        const filteredVillages = filterVillages(villages, searchText, "", "");
        const sortedVillages = sortVillagesByCharacters(filteredVillages, 0);
        displayVillages(sortedVillages);
        console.log(selectedTeam);
        
    }

    searchTextInput.addEventListener('input', updateResults);
    // clanSelect.addEventListener('change', updateResults);
    teamSelect.addEventListener('change', updateResults);
}
