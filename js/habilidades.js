async function fetchKekkeiGenkai() {
    try {
        const response = await fetch('https://narutodb.xyz/api/kekkei-genkai');
        const data = await response.json();
        console.log(data)
        return data.kekkei_genkai || []; // devolver array de kekkei
    } catch (error) {
        console.error('Error fetching Kekkei Genkai:', error);
        return [];
    }
}
function createKekkeiGenkaiCard(kekkeiGenkai) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const kgName = document.createElement('h5');
    kgName.textContent = kekkei_genkai.name;
    card.appendChild(kgName);

    const kgImage = document.createElement('img');
    kgImage.className = 'img-fluid team-image';
    
    if (kekkeiGenkai.images && kekkeiGenkai.images.length > 0) {
        kgImage.src = kekkei_genkai.images[0];
        kgImage.onerror = function() {
            kgImage.src = 'https://www.shutterstock.com/image-illustration/naruto-chibinaruto-animenaruto-vectoranime-character-260nw-2425023909.jpg';
        };
    } else {
        kgImage.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057';
    }
    
    card.appendChild(kgImage);

    const description = document.createElement('p');
    description.textContent = kekkei_genkai.description || 'No description available';
    card.appendChild(description);

    return card;
}

async function displayKekkeiGenkai(kekkeiGenkai) {
    const container = document.getElementById('kekkei-genkai-container');
    container.innerHTML = ''; 
    if (kekkeiGenkai.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.textContent = 'No se encontraron resultados';
        container.appendChild(noResultsMessage);
    } else {
        kekkeiGenkai.forEach(kg => {
            const card = createKekkeiGenkaiCard(kg);
            container.appendChild(card);
        });
    }
}
function normalizeString(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function main() {
    const kekkeiGenkai = await fetchKekkeiGenkai(); // Obtener todos los Kekkei Genkai
    await displayKekkeiGenkai(kekkeiGenkai); // Mostrar todos los Kekkei Genkai inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = normalizeString(searchInput.value);
 
        const filteredKekkeiGenkai = kekkeiGenkai.filter(kg =>
            normalizeString(kg.name).includes(searchTerm) || 
            normalizeString(kg.description || '').includes(searchTerm)
        );
        displayKekkeiGenkai(filteredKekkeiGenkai); // Mostrar Kekkei Genkai filtrados
    });
}

main();