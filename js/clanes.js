
let favoriteClans = []; // Array para almacenar los clanes favoritos

async function fetchClans() {
    const response = await fetch('https://narutodb.xyz/api/clan');
    const data = await response.json();
    return data.clans;
}

function createClanCard(clan, isFavorite = false) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const clanName = document.createElement('h5');
    clanName.textContent = clan.name;
    card.appendChild(clanName);

    const firstCharacter = clan.characters[0]; 
    const clanImage = document.createElement('img');
    clanImage.className = 'img-fluid';

    if (firstCharacter && firstCharacter.images && firstCharacter.images.length > 0) {
        clanImage.src = firstCharacter.images[0];
        clanImage.onerror = function() {
            clanImage.src = 'https://www.shutterstock.com/image-illustration/naruto-chibinaruto-animenaruto-vectoranime-character-260nw-2425023909.jpg';
        };
    } else {
        clanImage.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057';
    }
    card.appendChild(clanImage);

    const characterSubtitle = document.createElement('h5');
    characterSubtitle.textContent = 'Integrantes:';
    card.appendChild(characterSubtitle);

    const characterList = document.createElement('ul');
    clan.characters.forEach(character => {
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
        toggleFavorite(clan); // Pasar solo el clan
    });
    card.appendChild(favoriteStar);

    return card;
}

function toggleFavorite(clan) {
    const index = favoriteClans.findIndex(favClan => favClan.name === clan.name);
    if (index === -1) {
        // Agregar a favoritos
        favoriteClans.push(clan);
    } else {
        // Quitar de favoritos
        favoriteClans.splice(index, 1);
    }
    updateFavoriteSection(); // Actualizar sección de favoritos
    updateClanCards(); // Actualizar las tarjetas originales
}

function updateFavoriteSection() {
    const favoriteContainer = document.getElementById('favorite-container');
    favoriteContainer.innerHTML = ''; // Limpiar el contenedor de favoritos
    const favoriteSubtitle = document.createElement('h3');
    favoriteSubtitle.textContent = 'Clanes Favoritos';
    favoriteContainer.appendChild(favoriteSubtitle);
    if (favoriteClans.length > 0) {
        favoriteClans.forEach(clan => {
            const card = createClanCard(clan, true); // true para estrella rellena
            favoriteContainer.appendChild(card);
        });
        favoriteContainer.style.display = 'block'; // Mostrar sección de favoritos
    } else {
        favoriteContainer.style.display = 'none'; // Ocultar sección de favoritos
    }
}

function updateClanCards() {
    const clanContainer = document.getElementById('clan-container');
    const clanCards = clanContainer.getElementsByClassName('tarjetas-card');

    for (let card of clanCards) {
        const clanName = card.querySelector('h5').textContent;
        const isFavorite = favoriteClans.some(favClan => favClan.name === clanName);

        // Actualizar la estrella en la tarjeta original
        const favoriteStar = card.querySelector('span');
        favoriteStar.textContent = isFavorite ? '★' : '☆'; // Estrella rellena o vacía
    }
}

async function displayClans(clans) {
    const container = document.getElementById('clan-container');
    container.innerHTML = ''; // Limpiar el contenedor

    if (clans.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.textContent = 'No se encontraron resultados';
        container.appendChild(noResultsMessage);
    } else {
        const uniqueClans = Array.from(new Set(clans.map(clan => clan.name)))
            .map(name => clans.find(clan => clan.name === name));

        uniqueClans.forEach(clan => {
            const card = createClanCard(clan);
            container.appendChild(card);
        });
    }
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function main() {
    const clans = await fetchClans(); // Obtener todos los clanes
    await displayClans(clans); // Mostrar todos los clanes inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = normalizeString(searchInput.value);
        const filteredClans = clans.filter(clan =>
            normalizeString(clan.name).includes(searchTerm) || clan.characters.some(character => normalizeString(character.name).includes(searchTerm))
        );
        displayClans(filteredClans); // Mostrar clanes filtrados
    });
}

main();