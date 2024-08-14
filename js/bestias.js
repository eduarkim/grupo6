
async function fetchTailedBeasts() {
    try {
        const response = await fetch('https://narutodb.xyz/api/tailed-beast');
        const data = await response.json();
        console.log(data); // Verificar la estructura de los datos
        return data.tailedBeasts || []; // Devolver array de bestias
    } catch (error) {
        console.error('Error fetching Tailed Beasts:', error);
        return [];
    }
}

function createTailedBeastCard(tailedBeast) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4 tarjetas-card'; 

    const name = document.createElement('h5');
    name.textContent = tailedBeast.name;
    card.appendChild(name);

    const tailedBeastImage = document.createElement('img');
    tailedBeastImage.className = 'img-fluid team-image';

    if (tailedBeast.images && tailedBeast.images.length > 0) {
        tailedBeastImage.src = tailedBeast.images[0];
        tailedBeastImage.onerror = function() {
            tailedBeastImage.src = 'https://www.shutterstock.com/image-illustration/naruto-chibinaruto-animenaruto-vectoranime-character-260nw-2425023909.jpg';
        };
    } else {
        tailedBeastImage.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057';
    }
    
    card.appendChild(tailedBeastImage);

    // Información de debut
    const debutInfo = document.createElement('p');
    if (tailedBeast.debut) {
        debutInfo.innerHTML = `<strong>Debut:</strong> Manga: ${tailedBeast.debut.manga}, Anime: ${tailedBeast.debut.anime}, Novel: ${tailedBeast.debut.novel}, Movie: ${tailedBeast.debut.movie}, Game: ${tailedBeast.debut.game}, OVA: ${tailedBeast.debut.ova}`;
    } else {
        debutInfo.textContent = 'No hay información en la API';
    }
    card.appendChild(debutInfo);

    // Información de uniqueTraits
    const uniqueTraitsInfo = document.createElement('p');
    if (tailedBeast.uniqueTraits && tailedBeast.uniqueTraits.length > 0) {
        uniqueTraitsInfo.innerHTML = `<strong>Rasgos Únicos:</strong> ${tailedBeast.uniqueTraits.join(', ')}`;
    } else {
        uniqueTraitsInfo.textContent = 'No hay información en la API';
    }
    card.appendChild(uniqueTraitsInfo);

    return card;
}

async function displayTailedBeasts(tailedBeasts) {
    const container = document.getElementById('tailed-beast-container');
    container.innerHTML = ''; // Limpiar el contenedor

    if (tailedBeasts.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.textContent = 'No se encontraron resultados';
        container.appendChild(noResultsMessage);
    } else {
        const fragment = document.createDocumentFragment();
        tailedBeasts.forEach(tb => {
            const card = createTailedBeastCard(tb);
            fragment.appendChild(card);
        });
        container.appendChild(fragment);
    }
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function main() {
    const tailedBeasts = await fetchTailedBeasts(); // Obtener todas las Bestias con Cola
    await displayTailedBeasts(tailedBeasts); // Mostrar todas las Bestias con Cola inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = normalizeString(searchInput.value);
 
        const filteredTailedBeasts = tailedBeasts.filter(tb =>
            normalizeString(tb.name).includes(searchTerm)
        );
        displayTailedBeasts(filteredTailedBeasts); // Mostrar Bestias con Cola filtradas
    });
}

main();
