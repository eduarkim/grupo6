async function fetchTailedBeasts() {
    try {
        const response = await fetch('https://narutodb.xyz/api/tailed-beast');
        const data = await response.json();
        console.log(data)
        return data.tailed_beasts || []; //devolver array tailed
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

    const image = document.createElement('img');
    image.className = 'img-fluid team-image';
    
    if (tailedBeast.image) {
        image.src = tailedBeast.image;
        image.onerror = function() {
            image.src = 'https://www.shutterstock.com/image-illustration/naruto-chibinaruto-animenaruto-vectoranime-character-260nw-2425023909.jpg';
        };
    } else {
        image.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057';
    }
    
    card.appendChild(image);

    const description = document.createElement('p');
    description.textContent = tailedBeast.description || 'No description available';
    card.appendChild(description);

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
        tailedBeasts.forEach(tb => {
            const card = createTailedBeastCard(tb);
            container.appendChild(card);
        });
    }
}
function normalizeString(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function main() {
    const tailedBeasts = await fetchTailedBeasts(); // Obtener todas las Bestias con Cola
    await displayTailedBeasts(tailedBeasts); // Mostrar todas las Bestias con Cola inicialmente

    const searchInput = document.getElementById('buscador');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = normalizeString(searchInput.value);
 
        const filteredTailedBeasts = tailedBeasts.filter(tb =>
            normalizeString(tb.name).includes(searchTerm) || 
            normalizeString(tb.description || '').includes(searchTerm)
        );
        displayTailedBeasts(filteredTailedBeasts); // Mostrar Bestias con Cola filtradas
    });
}

main();