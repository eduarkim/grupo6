
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');
const contenedor = document.querySelector('.details-content');

let characterUrl = "https://narutodb.xyz/api/character/"+characterId;

fetch(characterUrl).then(response => response.json()).then(character => {
    console.log(character);
    pintardetalles(character)
    
})

function pintardetalles(character){
    switch(true){
        case character.hasOwnProperty('personal') && character.personal.hasOwnProperty('species'):
            personajeSpecies(character);
        break;

        case character.hasOwnProperty('personal') && character.personal.hasOwnProperty('clan') && !character.personal.hasOwnProperty('jinchūriki'):
            personajeCompleto(character)
        break;

        case character.hasOwnProperty('personal') && character.personal.hasOwnProperty('jinchūriki'):
            personajeBestia(character)
        break;

        case character.hasOwnProperty('personal') && character.personal.hasOwnProperty('status'):
            personajeDeceased(character)
        break;



        default:
            personajeSinInFormacion(character);
        break;
    }
}
function personajeCompleto(character){
    contenedor.innerHTML = `
    <div class="col-12 d-flex flex-wrap rounded">
                    <div class="container d-flex justify-content-center">
                        <img src="${character.images[1]}" alt="details" class=" img-fluid">
                    </div>
                    <div class="container d-flex flex-column align-items-start rounded">
                        <h3 class="d-flex align-self-center mt-3">${character.name}</h3>
                          <p>Anime debut: ${character.debut.anime}</p>
                          <p>Manga debut: ${character.debut.manga}</p>
                          <p>Village: ${character.personal.affiliation}</p>
                          <p>Classification: ${character.personal.classification}</p>
                          <p>Clan: ${character.personal.clan}</p>
                          <p>Kekkei Genkai: ${character.personal.kekkeiGenkai}</p>
                          <p>Jutsu: ${character.jutsu}</p>
                          <p>Occupation: ${character.personal.occupation}</p>
                          <p>Team: ${character.personal.team}</p>
                          <p>Sex: ${character.personal.sex}</p>
                          <p>Birthdate: ${character.personal.birthdate}</p>
                          
                </div>
  `
}

function personajeBestia(character){
    contenedor.innerHTML = `
    <div class="col-12 d-flex flex-wrap rounded">
                    <div class="container d-flex justify-content-center">
                        <img src="${character.images[0]}" alt="details" class="imgDetails img-fluid">
                    </div>
                    <div class="container d-flex flex-column align-items-start rounded">
                        <h3 class="d-flex align-self-center mt-3">${character.name}</h3>
                          <p><strong>Anime debut:</strong>  ${character.debut.anime}</p>
                          <p><strong>Manga debut:</strong>${character.debut.manga}</p>
                          <p><strong>Classification: </strong>${character.personal.classification}</p>
                          <p><strong>Jinchūriki: </strong>${character.personal.jinchūriki}</p>
                          <p><strong>Kekkei Genkai: </strong> ${character.personal.kekkeiGenkai}</p>
                          <p><strong>Jutsu:</strong> ${character.jutsu}</p>            
                </div>
  `
}

function personajeSpecies(character){
    contenedor.innerHTML = `
    <div class="col-12 d-flex flex-wrap rounded">
                    <div class="container d-flex justify-content-center">
                        <img src="${character.images}" alt="details" class="imgDetails img-fluid">
                    </div>
                    <div class="container d-flex flex-column align-items-start rounded">
                        <h3 class="d-flex align-self-center mt-3">${character.name}</h3>
                          <p><strong>Movie debut: </strong>${character.debut.movie}</p>
                          <p><strong>Novel debut: </strong>${character.debut.novel}</p>
                          <p><strong>Jutsu: </strong>${character.jutsu}</p>     
                          <p><strong>Specie: </strong>${character.personal.species}</p>
                </div>
  `
}

function personajeSinInFormacion(character){
    contenedor.innerHTML = `
    <div class="col-12 d-flex flex-wrap rounded">
                    <div class="container d-flex justify-content-center">
                        <img src="${character.images[0]}" alt="details" class="imgDetails img-fluid">
                    </div>
                    <div class="container d-flex flex-column align-items-start rounded">
                        <h3 class="d-flex align-self-center mt-3">${character.name}</h3>
                          <p><strong>There is not more information</strong></p>
                </div>
  `
}

function personajeDeceased(character){
    contenedor.innerHTML = `
    <div class="col-12 d-flex flex-wrap rounded">
                    <div class="container d-flex justify-content-center">
                        <img src="${character.images}" alt="details" class="imgDetails img-fluid">
                    </div>
                    <div class="container d-flex flex-column align-items-start rounded">
                        <h3 class="d-flex align-self-center mt-3">${character.name}</h3>
                        <p><strong>Anime debut: </strong>${character.debut.anime}</p>
                        <p><strong>Manga debut:</strong> ${character.debut.manga}</p>
                        <p><strong>Nature Type: </strong>${character.natureType}</p>
                        <p><strong>Jutsu: </strong>${character.jutsu}</p>
                        <p><strong>Status: </strong>${character.personal.status}</p>
                </div>
  `
}