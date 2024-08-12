/*
async function fetchTeams() {
    const response = await fetch('https://narutodb.xyz/api/team');
    const data = await response.json();
    return data.teams;
}

function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const teamName = document.createElement('h5');
    teamName.textContent = team.name;
    card.appendChild(teamName);

    const randomCharacter = team.characters[Math.floor(Math.random() * team.characters.length)];
    const teamImage = document.createElement('img');
    teamImage.className = 'img-fluid team-image';

    if (randomCharacter.images && randomCharacter.images.length > 0) {
        teamImage.src = randomCharacter.images[0];
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

    return card;
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
            const card = createTeamCard(team);
            container.appendChild(card);
        });
    }
}

async function main() {
    const teams = await fetchTeams(); // Obtener todos los equipos
    await displayTeams(teams); // Mostrar todos los equipos inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTeams = teams.filter(team =>
            team.name.toLowerCase().includes(searchTerm)
        );
        displayTeams(filteredTeams); // Mostrar equipos filtrados
    });
}

main();
*/
/*
async function fetchTeams() {
    const response = await fetch('https://narutodb.xyz/api/team');
    const data = await response.json();
    return data.teams;
}

function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const teamName = document.createElement('h5');
    teamName.textContent = team.name;
    card.appendChild(teamName);

    // Acceder al primer personaje del equipo
    const firstCharacter = team.characters[0]; 
    const teamImage = document.createElement('img');
    teamImage.className = 'img-fluid team-image';

    // Verificar si el primer personaje tiene imágenes
    if (firstCharacter && firstCharacter.images && firstCharacter.images.length > 0) {
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

    return card;
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
            const card = createTeamCard(team);
            container.appendChild(card);
        });
    }
}

async function main() {
    const teams = await fetchTeams(); // Obtener todos los equipos
    await displayTeams(teams); // Mostrar todos los equipos inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTeams = teams.filter(team =>
            team.name.toLowerCase().includes(searchTerm)
        );
        displayTeams(filteredTeams); // Mostrar equipos filtrados
    });
}

main();

*/
/*
async function fetchTeams() {
    const response = await fetch('https://narutodb.xyz/api/team');
    const data = await response.json();
    return data.teams;
}

function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const teamName = document.createElement('h5');
    teamName.textContent = team.name;
    card.appendChild(teamName);

    // Acceder al primer personaje del equipo
    const firstCharacter = team.characters[0]; 
    const teamImage = document.createElement('img');
    teamImage.className = 'img-fluid team-image';

    // Verificar si el primer personaje tiene imágenes
    if (firstCharacter && firstCharacter.images && firstCharacter.images.length > 0) {
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

    return card;
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
            const card = createTeamCard(team);
            container.appendChild(card);
        });
    }
}

async function main() {
    const teams = await fetchTeams(); // Obtener todos los equipos
    await displayTeams(teams); // Mostrar todos los equipos inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTeams = teams.filter(team =>
            team.name.toLowerCase().includes(searchTerm)
        );
        displayTeams(filteredTeams); // Mostrar equipos filtrados
    });
}

main();
*/
async function fetchTeams() {
    const response = await fetch('https://narutodb.xyz/api/team');
    const data = await response.json();
    return data.teams;
}

function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const teamName = document.createElement('h5');
    teamName.textContent = team.name;
    card.appendChild(teamName);

    // Acceder al primer personaje del equipo
    const firstCharacter = team.characters[0]; 
    const teamImage = document.createElement('img');
    teamImage.className = 'img-fluid team-image';

    // Verificar si el equipo es "Ame Orphans"
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

    return card;
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
            const card = createTeamCard(team);
            container.appendChild(card);
        });
    }
}

async function main() {
    const teams = await fetchTeams(); // Obtener todos los equipos
    await displayTeams(teams); // Mostrar todos los equipos inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTeams = teams.filter(team =>
            team.name.toLowerCase().includes(searchTerm) || team.characters.some(character => character.name.toLowerCase().includes(searchTerm))
        );
        displayTeams(filteredTeams); // Mostrar equipos filtrados
    });
}

main();