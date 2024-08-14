

let favoriteTeam = []; // Array para almacenar los equipos favoritos
let allTeams = []; // Array para almacenar todos los equipos

async function fetchTeams() {
    const response = await fetch('https://narutodb.xyz/api/team');
    const data = await response.json();
    return data.teams;
}

function createTeamCard(team, isFavorite = false) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const teamName = document.createElement('h5');
    teamName.textContent = team.name;
    card.appendChild(teamName);

    // Acceder al primer personaje del equipo
    const firstCharacter = team.characters[0]; 
    const teamImage = document.createElement('img');
    teamImage.className = 'img-fluid team-image';

    
    if (team.name === "Ame Orphans") {
        teamImage.src = './assets/Young_Ame_Orphans.webp';
    } else if (firstCharacter && firstCharacter.images && firstCharacter.images.length > 0) {
        teamImage.src = firstCharacter.images[0];
        teamImage.onerror = function() {
            teamImage.src = 'https://www.shutterstock.com/image-illustration/naruto-chibinaruto-animenaruto-vectoranime-character-260nw-2425023909.jpg';
        };
    } else {
        teamImage.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057';
    }
    
    card.appendChild(teamImage);

    const characterSubtitle = document.createElement('h5');
    characterSubtitle.textContent = 'Integrantes:';
    card.appendChild(characterSubtitle);

    const characterList = document.createElement('ul');
    team.characters.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;
        characterList.appendChild(listItem);
    });
    card.appendChild(characterList);

    // Crear estrella para favoritos
    const favoriteStar = document.createElement('span');
    favoriteStar.textContent = isFavorite ? '★' : '☆'; // Estrella rellena o vacía
    favoriteStar.style.cursor = 'pointer';
    favoriteStar.style.fontSize = '24px';
    favoriteStar.addEventListener('click', () => {
        toggleFavorite(team); // Pasar solo el equipo
    });
    card.appendChild(favoriteStar);

    return card;
}

function toggleFavorite(team) {
    const index = favoriteTeam.findIndex(favTeam => favTeam.name === team.name);
    if (index === -1) {
        // Agregar a favoritos
        favoriteTeam.push(team);
    } else {
        // Quitar de favoritos
        favoriteTeam.splice(index, 1);
    }
    // Guardar favoritos en localStorage
    localStorage.setItem('favoriteTeam', JSON.stringify(favoriteTeam));
    updateFavoriteSection(); // Actualizar sección de favoritos
    updateTeamCards(); // Actualizar las tarjetas originales
}

function updateFavoriteSection() {
    const favoriteContainer = document.getElementById('favorite-container');
    favoriteContainer.innerHTML = ''; // Limpiar el contenedor de favoritos
    const favoriteSubtitle = document.createElement('h3');
    favoriteSubtitle.className = 'text-center mb-4 w-100';
    favoriteSubtitle.textContent = 'Equipos Favoritos';
    favoriteContainer.appendChild(favoriteSubtitle);
    if (favoriteTeam.length > 0) {
        favoriteTeam.forEach(team => {
            const card = createTeamCard(team, true); // true para estrella rellena
            card.classList.add('team-card');
            favoriteContainer.appendChild(card);
        });
        favoriteContainer.style.display = 'flex'; // Mostrar sección de favoritos
        favoriteContainer.style.flexWrap = 'wrap';
    } else {
        favoriteContainer.style.display = 'none'; // Ocultar sección de favoritos
    }
}

function updateTeamCards() {
    const teamContainer = document.getElementById('team-container');
    const teamCards = teamContainer.getElementsByClassName('tarjetas-card');

    for (let card of teamCards) {
        const teamName = card.querySelector('h5').textContent;
        const isFavorite = favoriteTeam.some(favTeam => favTeam.name === teamName);

        // Actualizar la estrella en la tarjeta original
        const favoriteStar = card.querySelector('span');
        favoriteStar.textContent = isFavorite ? '★' : '☆'; // Estrella rellena o vacía
    }
}

function filterTeamsByMemberCount(teams) {
    const checkbox = document.getElementById('checkcategory'); 
    if (checkbox.checked) {
        return teams.filter(team => team.characters.length > 3);
    }
    return teams;
}

async function displayTeams(teams) {
    const container = document.getElementById('team-container');
    container.innerHTML = ''; // Limpiar el contenedor

    if (teams.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.textContent = 'No se encontraron resultados';
        container.appendChild(noResultsMessage);
    } else {
        const uniqueTeams = Array.from(new Set(teams.map(team => team.name)))
            .map(name => teams.find(team => team.name === name));

        uniqueTeams.forEach(team => {
            const card = createTeamCard(team, favoriteTeam.some(favTeam => favTeam.name === team.name)); // Verificar si es favorito
            container.appendChild(card);
        });
    }
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function main() {
    // Obtener equipos favoritos de localStorage
    const favoriteTeamStr = localStorage.getItem('favoriteTeam');
    favoriteTeam = favoriteTeamStr ? JSON.parse(favoriteTeamStr) : [];
   
    allTeams = await fetchTeams(); // Obtener todos los equipos
    await displayTeams(allTeams); // Mostrar todos los equipos inicialmente

    // Actualizar la sección de favoritos al cargar
    updateFavoriteSection();

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = normalizeString(searchInput.value);
        const filteredTeams = allTeams.filter(team =>
            normalizeString(team.name).includes(searchTerm) || team.characters.some(character => normalizeString(character.name).includes(searchTerm))
        );
        displayTeams(filterTeamsByMemberCount(filteredTeams)); // Mostrar equipos filtrados
    });

    const checkbox = document.getElementById('checkcategory'); 
    checkbox.addEventListener('change', () => {
        const filteredTeams = filterTeamsByMemberCount(allTeams);
        displayTeams(filteredTeams); // Mostrar equipos filtrados por checkbox
    });
}

main();