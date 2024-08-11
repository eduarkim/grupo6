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

    // Seleccionamos una imagen aleatoria de los personajes del clan
    const randomCharacter = clan.characters[Math.floor(Math.random() * clan.characters.length)];
    const clanImage = document.createElement('img');
    clanImage.className = 'img-fluid';
  /*   const placeholderImages = [
        'https://i.pinimg.com/originals/89/a8/9f/89a89f3b2248784262a2280ecbb4e3fb.jpg',
    'https://i.pinimg.com/1200x/f0/70/dc/f070dc410d14597b0cf0ec2d0c1bcf15.jpg',
    'https://static.wikia.nocookie.net/naruto/images/7/70/Tapiz_Clanes.png/revision/latest?cb=20120712182644&path-prefix=es',
    'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057'
     
    ]; */
    if (randomCharacter.images && randomCharacter.images.length > 0) {
        clanImage.src = randomCharacter.images[0];
    } else {
        
       // const randomPlaceholder = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
        clanImage.src = 'https://cdn.shopify.com/s/files/1/0046/2779/1960/files/clans_de_naruto.jpg?v=1609139057'
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

async function displayClans() {
    const clans = await fetchClans();
    const container = document.getElementById('clan-container');

    clans.forEach(clan => {
        const card = createClanCard(clan);
        container.appendChild(card);
    });
}

displayClans();
