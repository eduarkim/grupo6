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

// Mapa de imágenes para aldeas
const imagesMap = {
    "Inaho Village": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_6l5v98rYMuSIcVqVObUp_3h7fqo5aS83mg&s",
    "8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBSBVFnSv-rQe1o4Je6lm8d4MrYNdnPwLW6g&s",
    "2": "https://i.pinimg.com/originals/93/cc/1c/93cc1cb30bf97a4c298513cc186180b2.jpg",
    "10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgaiaKhqadZYowQZSS-UJ3IHeeqfPsXDoaw&s",
    "3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRGVmjN2SbwRGrDkXLw-IONW0jbRfHYRzWA&s",
    "19": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_mAN63tZAcziEcpJpwwQK0JSVvTIfVT0og&s",
    "15": "https://staticg.sportskeeda.com/editor/2022/11/3bf44-16674636134997.png",
    "Konohagakure": "../img/aldeas/konohagakure.webp",
    "Kirigakure": "../img/aldeas/kirigakure.jpeg",
    "Kumogakure": "../img/aldeas/kumogakure.webp",
    "Iwagakure": "../img/aldeas/iwagakure.jpeg",
    "Amegakure":"../img/aldeas/Amegakure.webp",
    "Kusagakure":"../img/aldeas/Kusagakure.webp",
    "Daidai Village":"../img/aldeas/Aldea_Daidai.webp",
    "Hoshigakure":"../img/aldeas/Hoshigakure.webp",
    "Bamboo Village":"../img/aldeas/bamboo.webp",
    "Genjutsu Tree Village": "../img/aldeas/Genjutsu_Trees.webp",
    "6": "../img/aldeas/hachovillage.jpeg",
    "12":"../img/aldeas/Jomae.webp",
    "13":"../img/aldeas/kagero.webp"

};

// Mostrar las aldeas en pantalla
function displayVillages(villages) {
    let container = document.getElementById('village-container');
    container.innerHTML = ''; // Limpiar el contenedor

    if (villages.length === 0) {
        let noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'alert alert-warning text-center';
        noResultsMessage.textContent = 'No se encontraron resultados';
        container.appendChild(noResultsMessage);
    } else {
        villages.forEach(village => {
            // Determinar la imagen según el nombre o ID de la aldea
            let characterImage = imagesMap[village.name] || imagesMap[village.id] || '';

            let card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${village.name}</h5>
                    ${characterImage ? `
                        <img src="${characterImage}" 
                             alt="${village.name}" 
                             class="card-img-top" 
                             onerror="this.onerror=null; this.src='https://via.placeholder.com/150'; console.error('Error loading image:', '${characterImage}');">
                    ` : ''}
                </div>
            `;

            // Agregar un evento de clic a la tarjeta
            card.addEventListener('click', () => {
                console.log(`ID de la aldea: ${village.id}, Nombre de la aldea: ${village.name}`);
            });

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
/*
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
    } else {
        villages.forEach(village => {
            let characterImage = '';

            // Determinar la imagen según el nombre o ID de la aldea
            if (village.name === "Inaho Village") {
                characterImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_6l5v98rYMuSIcVqVObUp_3h7fqo5aS83mg&s";
            } else if (village.id == "8") {
                characterImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBSBVFnSv-rQe1o4Je6lm8d4MrYNdnPwLW6g&s";
            } else if (village.id === 2) {
                characterImage = "https://i.pinimg.com/originals/93/cc/1c/93cc1cb30bf97a4c298513cc186180b2.jpg"; // Reemplaza con la URL específica
            } else if (village.id === 10) {
                characterImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgaiaKhqadZYowQZSS-UJ3IHeeqfPsXDoaw&s"; // Reemplaza con la URL específica
            } else if (village.id === 3) {
                characterImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRGVmjN2SbwRGrDkXLw-IONW0jbRfHYRzWA&s"; // Reemplaza con la URL específica
            } else if (village.id === 19) {
                characterImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_mAN63tZAcziEcpJpwwQK0JSVvTIfVT0og&s"; // Reemplaza con la URL específica
            } else if (village.id === 15) {
                characterImage = "https://staticg.sportskeeda.com/editor/2022/11/3bf44-16674636134997.png"; // Reemplaza con la URL específica
            } else {
                // Si no hay una imagen específica, intenta obtener la imagen del primer personaje
                let firstCharacter = village.characters[0]; // Obtener el primer personaje
                characterImage = firstCharacter ? firstCharacter.images[0] : ''; // Obtener la URL de la imagen
            }

            let card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${village.name}</h5>
                    ${characterImage ? `
                        <img src="${characterImage}" 
                             alt="${village.name}" 
                             class="card-img-top" 
                             onerror="this.onerror=null; this.src='https://via.placeholder.com/150'; console.error('Error loading image:', '${characterImage}');">
                    ` : ''}
                </div>
            `;

            // Agregar un evento de clic a la tarjeta
            card.addEventListener('click', () => {
                if (!characterImage) { // Si no hay imagen
                    console.log(`ID de la aldea: ${village.id}, Nombre de la aldea: ${village.name}`);
                }
            });

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
    */