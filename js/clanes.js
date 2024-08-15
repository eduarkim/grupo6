let allClans = []; 
let favoriteClans = []; // Array para almacenar los clanes favoritos

async function fetchClans() {
    const response = await fetch('https://narutodb.xyz/api/clan');
    const data = await response.json();

 //   const filteredClans = data.clans.filter(clan => ![5, 6, 11].includes(clan.id));
    console.log(data.clans);
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
        clanImage.onerror = function () {
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
    // Guardar favoritos en localStorage
    localStorage.setItem('favoriteClans', JSON.stringify(favoriteClans));
    updateFavoriteSection(); // Actualizar sección de favoritos
    updateClanCards(); // Actualizar las tarjetas originales
}

function updateFavoriteSection() {
    const favoriteContainer = document.getElementById('favorite-container');
    favoriteContainer.innerHTML = ''; // Limpiar el contenedor de favoritos
    const favoriteSubtitle = document.createElement('h3');
    favoriteSubtitle.className = 'text-center mb-2 w-100';
    favoriteSubtitle.textContent = 'Clanes Favoritos';
    favoriteContainer.appendChild(favoriteSubtitle);
    if (favoriteClans.length > 0) {
        favoriteClans.forEach(clan => {
            const card = createClanCard(clan, true); // true para estrella rellena
            card.classList.add('clan-card');
            favoriteContainer.appendChild(card);
        });
 //       favoriteContainer.style.display = 'flex'; // Mostrar sección de favoritos
  //      favoriteContainer.style.flexWrap = 'wrap';
    } /* else {
        favoriteContainer.style.display = 'none'; // Ocultar sección de favoritos
    } */
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
// Función para mostrar el modal
function showModal() {
    const modal = document.getElementById('favoriteModal');
    modal.style.display = 'block';

    // Obtener el botón de cierre
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Cerrar el modal si se hace clic fuera del contenido
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

document.getElementById('openFavoritesBtn').addEventListener('click', function() {
    showModal();
});

    function filterClansByMemberCount(clans) {
        const checkboxMas = document.getElementById('checkcategoryMas');
        const checkboxMenos = document.getElementById('checkcategoryMenos');
    
        if (checkboxMas.checked && checkboxMenos.checked) {
            // Si ambos checkboxes están seleccionados, no se filtra nada.
            return clans;
        } else if (checkboxMas.checked) {
            // Filtrar clanes con más de 5 integrantes.
            return clans.filter(clan => clan.characters.length > 5);
        } else if (checkboxMenos.checked) {
            // Filtrar clanes con menos de 6 integrantes.
            return clans.filter(clan => clan.characters.length < 6);
        }
        
        // Si ninguno está seleccionado, devolver todos los clanes.
        return clans;
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
            const card = createClanCard(clan, favoriteClans.some(favClan => favClan.name === clan.name)); // Verificar si es favorito
            container.appendChild(card);
        });
    }
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}



async function main() {
    // Cargar favoritos desde localStorage
    const storedFavorites = localStorage.getItem('favoriteClans');
    favoriteClans = storedFavorites ? JSON.parse(storedFavorites) : []; // Si hay favoritos almacenados, cargarlos

    allClans = await fetchClans(); // Obtener todos los clanes
    await displayClans(allClans); // Mostrar todos los clanes inicialmente

    // Actualizar la sección de favoritos al cargar
    updateFavoriteSection();

    const searchInput = document.getElementById('buscador');
    const checkboxMas = document.getElementById('checkcategoryMas');
    const checkboxMenos = document.getElementById('checkcategoryMenos');

    function filterAndDisplayClans() {
        const searchTerm = normalizeString(searchInput.value);

        // Filtrar clanes por nombre y personajes
        const filteredClans = allClans.filter(clan =>
            normalizeString(clan.name).includes(searchTerm) || 
            clan.characters.some(character => normalizeString(character.name).includes(searchTerm))
        );

        // Aplicar el filtro por cantidad de integrantes
        const finalFilteredClans = filterClansByMemberCount(filteredClans);
        displayClans(finalFilteredClans); // Mostrar clanes filtrados
    }

    searchInput.addEventListener('keyup', filterAndDisplayClans);

    // Agregar eventos a los checkboxes
    checkboxMas.addEventListener('change', filterAndDisplayClans);
    checkboxMenos.addEventListener('change', filterAndDisplayClans);
}

main();


