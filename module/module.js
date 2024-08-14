

export function crearCardCharacterCompleto(personaje){
    let cardPersonajeHTML = 
    `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-primary text-bg-light">
            <div class = "card-header d-flex justify-content-center align-items-center">
                <h4 class="fs-6">${personaje.name}</h4>
            </div>
            <img class="card-img-top img-card" src="${personaje.images}">
            <div class = "card-body d-flex flex-column justify-content-center">
                <p class= "card-text status">Status: Dead</p>
                <p class= "card-text clan">Clan: ${personaje.personal.clan}</p>
                <a id= "btnDetalles" href="./details.html?id=${personaje.id}" class="btn btn-info w-100">Details</a> 
            </div>
        </div>
    </div>
    `
    return cardPersonajeHTML;
}

export function crearCardCharacterSinClan(personaje){
    let cardPersonajeHTML = `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-primary text-bg-light">
            <div class = "card-header d-flex justify-content-center align-items-center">
                <h4 class="fs-6">${personaje.name}</h4>
            </div>
            <img class="card-img-top img-card" src="${personaje.images}">
            <div class = "card-body d-flex flex-column justify-content-center">
                <p class= "card-text status">Status: ${personaje.personal.status}</p>
                <p class= "card-text clan">Clan: Unknown</p>
                <a id= "btnDetalles" href="./details.html?id=${personaje.id}" class="btn btn-info w-100">Details</a> 
            </div>
        </div>
    </div>
    `
    return cardPersonajeHTML;
}

export function crearCardCharacterSinStatus(personaje){
    let cardPersonajeHTML = `
    
    <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-primary text-bg-light">
            <div class = "card-header d-flex justify-content-center align-items-center">
                <h4 class="fs-6">${personaje.name}</h4>
            </div>
            <img class="card-img-top img-card" src="${personaje.images}">
            <div class = "card-body d-flex flex-column justify-content-center">
                <p class= "card-text status">Status: Live</p>
                <p class= "card-text clan">Clan: ${personaje.personal.clan}</p>
                <a id= "btnDetalles" href="./details.html?id=${personaje.id}" class="btn btn-info w-100">Details</a> 
            </div>
        </div>
    </div>
    `
    return cardPersonajeHTML;
}

export function crearCardCharacterSinStatusClan(personaje){
    let cardPersonajeHTML = `
    <div class="col-12  col-md-6 col-lg-4 mb-4">
        <div class="card border-primary text-bg-light">
            <div class = "card-header d-flex justify-content-center align-items-center">
                <h4 class="fs-6" >${personaje.name}</h4>
            </div>
            <img class="card-img-top img-card" src="${personaje.images[0]}">
            <div class = "card-body d-flex flex-column justify-content-center">
                <p class= "card-text status">Status: Unknown</p>
                <p class= "card-text clan">Clan: Unknown</p>
                <a id= "btnDetalles" href="./details.html?id=${personaje.id}" class="btn btn-info w-100">Details</a> 
            </div>
        </div>
    </div>
    `
    return cardPersonajeHTML;
}

export function filtrarPersonajesPorTexto(arrayPersonajes, texto){
    let textoFiltrado = arrayPersonajes.filter(personaje => personaje.name.toLowerCase().includes(texto));

    return textoFiltrado;
}

export function obtenerArrayApisFiltros(api){
    const filtrosCheckbox = [];
    for(let i = 0; i <api.length; i++){
        filtrosCheckbox.push(api[i].name);
    }
    const arrayFiltros= new Set(filtrosCheckbox);
    return arrayFiltros
}

export function crearCheckbox(valor){
    let contenedor = 
    `
    <div class= "col-12">
        <div class="form-check form-check-inline ms-2">
            <input class="form-check-input" type="checkbox" value="${valor}">
            <label class="form-check-label"> ${valor} </label>
        </div>
    </div>
    `
    return contenedor
}

export function pintarCheckbox(apiValor, contenedor){
    const filtrosCheckbox = [...obtenerArrayApisFiltros(apiValor)];    
    let checkboxApi = " "
    if(apiValor.length > 0){
        for( let i = 0; i < filtrosCheckbox.length; i++){
            let check = filtrosCheckbox[i];
            checkboxApi += crearCheckbox(check);    
        }
        contenedor.innerHTML = checkboxApi;
    }
    
}

export function filtrosCheckboxClanes(arrayDatos){
    let checkboxCheck = [...document.querySelectorAll('input[type=checkbox]:checked')]
    checkboxCheck = checkboxCheck.map(e => e.value);
    console.log(checkboxCheck);
    let arrayFiltersClanes = []
    if(checkboxCheck.length === 0){
        console.log('vacio');
        arrayFiltersClanes = arrayDatos;
    }

   else if(checkboxCheck.length >0){
        for(let i = 0; i < arrayDatos.length; i++){
            if(arrayDatos[i].hasOwnProperty('personal') && arrayDatos[i].personal.hasOwnProperty('clan')){
                if(checkboxCheck.includes(arrayDatos[i].personal.clan)){
                    arrayFiltersClanes.push(arrayDatos[i]);
                }
            }
        }
    }
    console.log(arrayFiltersClanes);
    
    return arrayFiltersClanes;
    
}

export function filtrosCheckboxVillages(arrayDatos){
    let checkboxCheck = [...document.querySelectorAll('input[type=checkbox]:checked')]
    checkboxCheck = checkboxCheck.map(e => e.value);
    console.log(checkboxCheck);
    let arrayFiltersVillages = []
    if(checkboxCheck.length === 0){
        console.log('vacio');
        arrayFiltersVillages = arrayDatos;
    }

   else if(checkboxCheck.length >0){
        for(let i = 0; i < arrayDatos.length; i++){
            if(arrayDatos[i].hasOwnProperty('personal') && arrayDatos[i].personal.hasOwnProperty('affiliation')){
                if(checkboxCheck.includes(arrayDatos[i].personal.affiliation)){
                    arrayFiltersVillages.push(arrayDatos[i]);
                }
            }
        }
    }
    console.log(arrayFiltersVillages);
    
    return arrayFiltersVillages;
    
}

export function filtrosCheckboxKekkeiGenkai(arrayDatos){
    let checkboxCheck = [...document.querySelectorAll('input[type=checkbox]:checked')]
    checkboxCheck = checkboxCheck.map(e => e.value);
    let arrayFiltersKekkiGenkai = []
    if(checkboxCheck.length === 0){
        console.log('vacio');
        arrayFiltersKekkiGenkai= arrayDatos;
    }

   else if(checkboxCheck.length >0){
        for(let i = 0; i < arrayDatos.length; i++){
            if(arrayDatos[i].hasOwnProperty('personal') && arrayDatos[i].personal.hasOwnProperty('kekkeiGenkai')){
                if(checkboxCheck.includes(arrayDatos[i].personal.kekkeiGenkai)){
                    arrayFiltersKekkiGenkai.push(arrayDatos[i]);
                }
            }
        }
    }
    console.log(arrayFiltersKekkiGenkai);
    
    return arrayFiltersKekkiGenkai;
    
}

export function filtrosCheckboxTeam(arrayDatos){
    let checkboxCheck = [...document.querySelectorAll('input[type=checkbox]:checked')]
    checkboxCheck = checkboxCheck.map(e => e.value);
    console.log(checkboxCheck);
    let arrayFiltersTeams = []
    if(checkboxCheck.length === 0){
        console.log('vacio');
        arrayFiltersTeams= arrayDatos;
    }

   else if(checkboxCheck.length >0){
        for(let i = 0; i < arrayDatos.length; i++){
            if(arrayDatos[i].hasOwnProperty('personal') && arrayDatos[i].personal.hasOwnProperty('team')){
                if(checkboxCheck.includes(arrayDatos[i].personal.team)){
                    arrayFiltersTeams.push(arrayDatos[i]);
                }
            }
        }
    }
    console.log(arrayFiltersTeams);
    
    return arrayFiltersTeams;
    
}

export function filtrarApiPorTexto(arrayApi, texto){
    let textoFiltrado = arrayApi.filter(api => api.name.toLowerCase().includes(texto));

    return textoFiltrado;
}

