async function obtenerDatos() {
    try {
        const response = await fetch('https://narutodb.xyz/api/clan?page=1&limit=58');
        const data = await response.json();
        console.log(data); // Verificar la estructura de la respuesta
        mostrarTarjetas(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function mostrarTarjetas(data) {
    const contenedorTarjetas = document.getElementById('divtarjetas');
    contenedorTarjetas.innerHTML = '';

    // Ajustar el acceso a los datos según la estructura real de la respuesta
    if (Array.isArray(data.clans)) {
        data.clans.forEach(clan => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'card col-md-4 mb-3';
            tarjeta.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${clan.name}</h5>
                
                    <a href="${clan.characters}" class="btn btn-primary" target="_blank">Más información</a>
                </div>
            `;
            contenedorTarjetas.appendChild(tarjeta);
        });
    } else {
        console.error('La estructura de los datos no es la esperada:', data);
    }
}

obtenerDatos();
