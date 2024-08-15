import * as module from "../module/module.js"
let contenedorPersonajes = document.querySelector('.characters');
let textoIngresado = document.getElementById('buscarPersonajes')
let contenedorClanes = document.querySelector('.clanes');
let contenedorVillages = document.querySelector('.villages');
let contenedorKekkeiGenkai = document.querySelector('.kekkeiGenkai');
let contenedorTeams = document.querySelector('.teams');
let textoIngresadoClanes = document.getElementById("searchClans");
let textoIngresadoVillages = document.getElementById('searchVillages');
let textoIngresadoKekkeiGenkai = document.getElementById('searchKekkeiGenkai');
let textoIngresadoTeams = document.getElementById('searchTeams');
fetch("https://narutodb.xyz/api/character?page=1&limit=1431").then(response => response.json()).then(data => {
  
  console.log(data.characters);
  
  pintarCardPersonaje(data.characters, contenedorPersonajes);

    fetch("https://narutodb.xyz/api/clan?page=1&limit=58").then(clanes => clanes.json()).then(datos => {
      module.pintarCheckbox(datos.clans, contenedorClanes);
      
      fetch("https://narutodb.xyz/api/village?page=1&limit=39").then(aldeas => aldeas.json()).then(village =>{
        module.pintarCheckbox(village.villages, contenedorVillages);
        
        fetch("https://narutodb.xyz/api/kekkei-genkai?page=1&limit=39").then(habilidades => habilidades.json()).then(kekkei => {
          module.pintarCheckbox(kekkei.kekkeigenkai, contenedorKekkeiGenkai);
          console.log(kekkei);
          

          fetch("https://narutodb.xyz/api/team?page=1&limit=191").then(equipos => equipos.json()).then(team => {
            module.pintarCheckbox(team.teams, contenedorTeams); 
            
            document.querySelector('.clanes').addEventListener('change', () => {
              let clanFilter = module.filtrosCheckboxClanes(data.characters);
              let filterText = module.filtrarPersonajesPorTexto(clanFilter, textoIngresado.value.toLowerCase());

              pintarCardPersonaje(filterText, contenedorPersonajes);
            });

            document.querySelector('.villages').addEventListener('change', () => {
              let villageFilter = module.filtrosCheckboxVillages(data.characters);
              let filterText = module.filtrarPersonajesPorTexto(villageFilter, textoIngresado.value.toLowerCase());
              pintarCardPersonaje(filterText, contenedorPersonajes)
            });

            document.querySelector('.kekkeiGenkai').addEventListener('change', () => {
              let kekkeiGenkaiFilter = module.filtrosCheckboxKekkeiGenkai(data.characters);
              let filterText = module.filtrarPersonajesPorTexto(kekkeiGenkaiFilter, textoIngresado.value.toLowerCase());
              pintarCardPersonaje(filterText, contenedorPersonajes)
            });

            document.querySelector('.teams').addEventListener('change', () => {
              let teamsFilter = module.filtrosCheckboxTeam(data.characters);
              let filterText = module.filtrarPersonajesPorTexto(teamsFilter, textoIngresado.value.toLowerCase());
              pintarCardPersonaje(filterText, contenedorPersonajes)
            });

            document.getElementById('searchClans').addEventListener('keyup', () => {
              let clanesFiltrados = module.filtrarApiPorTexto(datos.clans, textoIngresadoClanes.value.toLowerCase());
              module.pintarCheckbox(clanesFiltrados, contenedorClanes);
            });

            document.getElementById('searchVillages').addEventListener('keyup', () => {
              let villagesFiltrados = module.filtrarApiPorTexto(village.villages, textoIngresadoVillages.value.toLowerCase());
              module.pintarCheckbox(villagesFiltrados, contenedorVillages);
            });

            document.getElementById('searchKekkeiGenkai').addEventListener('keyup', () => {
              let kekkeiGenkaiFiltrados = module.filtrarApiPorTexto(kekkei.kekkeigenkai, textoIngresadoKekkeiGenkai.value.toLowerCase());
              module.pintarCheckbox(kekkeiGenkaiFiltrados, contenedorKekkeiGenkai);
            });

            document.getElementById('searchTeams').addEventListener('keyup', () => {
              let teamsFiltrados = module.filtrarApiPorTexto(team.teams, textoIngresadoTeams.value.toLowerCase());
              module.pintarCheckbox(teamsFiltrados, contenedorTeams);
            });
            
            


            
          });
          
        });
        
      });
      
    });

   document.getElementById('buscarPersonajes').addEventListener('keyup', () => {
        let personajesFiltrados = module.filtrarPersonajesPorTexto(data.characters, textoIngresado.value.toLowerCase());
        let clan = module.filtrosCheckboxClanes(personajesFiltrados);
        pintarCardPersonaje(clan, contenedorPersonajes);
    });
    
});



function pintarCardPersonaje(arrayCharacters, contenedorCharacters){
    let cardsHTML = "";
    if (arrayCharacters.length >0){
      for(let i = 0; i < arrayCharacters.length; i++){
        let card = arrayCharacters[i];
        if(arrayCharacters[i].hasOwnProperty('personal') && arrayCharacters[i].personal.hasOwnProperty('clan') && arrayCharacters[i].personal.hasOwnProperty('status')){
            cardsHTML += module.crearCardCharacterCompleto(card);
        }
        if(arrayCharacters[i].hasOwnProperty('personal') && arrayCharacters[i].personal.hasOwnProperty('clan') && !arrayCharacters[i].personal.hasOwnProperty('status')){
            cardsHTML += module.crearCardCharacterSinStatus(card);
        }
        if(arrayCharacters[i].hasOwnProperty('personal') && !arrayCharacters[i].personal.hasOwnProperty('clan') && arrayCharacters[i].personal.hasOwnProperty('status')){
            cardsHTML += module.crearCardCharacterSinClan(card);
        }
        if(arrayCharacters[i].hasOwnProperty('personal') && !arrayCharacters[i].personal.hasOwnProperty('clan') && !arrayCharacters[i].personal.hasOwnProperty('status')){
            cardsHTML += module.crearCardCharacterSinStatusClan(card);
        }
      }
      contenedorCharacters.innerHTML = cardsHTML; 
    }
      
    else{
      contenedorCharacters.innerHTML = `
      <div class="d-flex justify-content-center">
        <h3>No hay perosajes que mostrar</h3>
      </div>
      `
    }
}

