async function fetchClans() {
    const response = await fetch('https://narutodb.xyz/api/clan');
    const data = await response.json();
    return data.clans;
}

function createClanCard(clan) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 clan-card'; 

    const clanName = document.createElement('h2');
    clanName.textContent = clan.name;
    card.appendChild(clanName);

    const randomCharacter = clan.characters[Math.floor(Math.random() * clan.characters.length)];
    const clanImage = document.createElement('img');
    clanImage.className = 'img-fluid';

    if (randomCharacter.images && randomCharacter.images.length > 0) {
        clanImage.src = randomCharacter.images[0];
    } else {
        clanImage.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057';
    }
    card.appendChild(clanImage);

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
        clans.forEach(clan => {
            const card = createClanCard(clan);
            container.appendChild(card);
        });
    }
}

async function main() {
    const clans = await fetchClans(); // Obtener todos los clanes
    await displayClans(clans); // Mostrar todos los clanes inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredClans = clans.filter(clan =>
            clan.name.toLowerCase().includes(searchTerm)
        );
        displayClans(filteredClans); // Mostrar clanes filtrados
    });
}

main();
