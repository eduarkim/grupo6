
async function fetchClans() {
    const response = await fetch('https://narutodb.xyz/api/clan');
    const data = await response.json();
    return data.clans;
}

function createClanCard(clan) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const clanName = document.createElement('h5');
    clanName.textContent = clan.name;
    card.appendChild(clanName);

    // Acceder al primer personaje del clan
    const firstCharacter = clan.characters[0]; 
    const clanImage = document.createElement('img');
    clanImage.className = 'img-fluid';

    // Verificar si el primer personaje tiene imágenes
    if (firstCharacter && firstCharacter.images && firstCharacter.images.length > 0) {
        clanImage.src = firstCharacter.images[0];
        clanImage.onerror = function() {
            clanImage.src = 'https://www.shutterstock.com/image-illustration/naruto-chibinaruto-animenaruto-vectoranime-character-260nw-2425023909.jpg';
        };
    } else {
        clanImage.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057';
    }
    card.appendChild(clanImage);
    console.log(clan); // Agregar esta línea para verificar los datos del clan en la consola

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

    return card;
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

function normalizeString(str){
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
