
let allTeams = []; 
let favoriteTeams = []; // Array para almacenar los equipos favoritos

async function fetchTeams() {
    const response = await fetch('https://narutodb.xyz/api/team');
    const data = await response.json();
    console.log(data); // Verificar la estructura de los datos
    return data.teams;
}

function createTeamCard(team, isFavorite = false) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card';

    const teamName = document.createElement('h5');
    teamName.textContent = team.name;
    card.appendChild(teamName);

    const firstCharacter = team.characters[0];
    const teamImage = document.createElement('img');
    teamImage.className = 'img-fluid';

    if (team.name === "Ame Orphans") {
        teamImage.src = './assets/Young_Ame_Orphans.webp';
    } else if (firstCharacter && firstCharacter.images && firstCharacter.images.length > 0) {
        teamImage.src = firstCharacter.images[0];
        teamImage.onerror = function () {
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
    const index = favoriteTeams.findIndex(favTeam => favTeam.name === team.name);
    if (index === -1) {
        // Agregar a favoritos
        favoriteTeams.push(team);
    } else {
        // Quitar de favoritos
        favoriteTeams.splice(index, 1);
    }
    // Guardar favoritos en localStorage
    localStorage.setItem('favoriteTeams', JSON.stringify(favoriteTeams));
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
    if (favoriteTeams.length > 0) {
        favoriteTeams.forEach(team => {
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
        const isFavorite = favoriteTeams.some(favTeam => favTeam.name === teamName);

        // Actualizar la estrella en la tarjeta original
        const favoriteStar = card.querySelector('span');
        favoriteStar.textContent = isFavorite ? '★' : '☆'; // Estrella rellena o vacía
    }
}

function filterTeamsByMemberCount(teams) {
    const checkboxMas = document.getElementById('checkcategoryMas');
    const checkboxMenos = document.getElementById('checkcategoryMenos');

    if (checkboxMas.checked && checkboxMenos.checked) {
        // Si ambos checkboxes están seleccionados, no se filtra nada.
        return teams;
    } else if (checkboxMas.checked) {
        // Filtrar equipos con más de 3 integrantes.
        return teams.filter(team => team.characters.length > 3);
    } else if (checkboxMenos.checked) {
        // Filtrar equipos con menos de 4 integrantes.
        return teams.filter(team => team.characters.length < 4);
    }
    
    // Si ninguno está seleccionado, devolver todos los equipos.
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
            const card = createTeamCard(team, favoriteTeams.some(favTeam => favTeam.name === team.name)); // Verificar si es favorito
            container.appendChild(card);
        });
    }
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function main() {
    // Cargar favoritos desde localStorage
    const storedFavorites = localStorage.getItem('favoriteTeams');
    favoriteTeams = storedFavorites ? JSON.parse(storedFavorites) : []; // Si hay favoritos almacenados, cargarlos

    allTeams = await fetchTeams(); // Obtener todos los equipos
    await displayTeams(allTeams); // Mostrar todos los equipos inicialmente

    // Actualizar la sección de favoritos al cargar
    updateFavoriteSection();

    const searchInput = document.getElementById('buscador');
    const checkboxMas = document.getElementById('checkcategoryMas');
    const checkboxMenos = document.getElementById('checkcategoryMenos');

    function filterAndDisplayTeams() {
        const searchTerm = normalizeString(searchInput.value);

        // Filtrar equipos por nombre y personajes
        const filteredTeams = allTeams.filter(team =>
            normalizeString(team.name).includes(searchTerm) || 
            team.characters.some(character => normalizeString(character.name).includes(searchTerm))
        );

        // Aplicar el filtro por cantidad de integrantes
        const finalFilteredTeams = filterTeamsByMemberCount(filteredTeams);
        displayTeams(finalFilteredTeams); // Mostrar equipos filtrados
    }

    searchInput.addEventListener('keyup', filterAndDisplayTeams);

    // Agregar eventos a los checkboxes
    checkboxMas.addEventListener('change', filterAndDisplayTeams);
    checkboxMenos.addEventListener('change', filterAndDisplayTeams);
}

main();