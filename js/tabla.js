async function fetchAkatsukiMembers() {
    try {
        const response = await fetch('https://narutodb.xyz/api/akatsuki');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Verifica la estructura de los datos
        return data.akatsuki; // Acceder a los miembros correctamente
    } catch (error) {
        console.error('Error fetching Akatsuki members:', error);
        return [];
    }
}

function createTableRow(member) {
    const row = document.createElement('tr');

    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.className = 'member-image';
    image.src = member.images[0] || 'https://www.mundodeportivo.com/alfabeta/hero/2021/01/akatsuki-abj.jpg?width=1200&aspect_ratio=16:9';
    image.onerror = function() {
        image.src = 'https://www.mundodeportivo.com/alfabeta/hero/2021/01/akatsuki-abj.jpg?width=1200&aspect_ratio=16:9';
    };
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = member.name;
    row.appendChild(nameCell);

    const natureTypeCell = document.createElement('td');
    if (Array.isArray(member.natureType)) {
        natureTypeCell.textContent = member.natureType.join(', ');
    } else {
        natureTypeCell.textContent = 'No hay información';
    }
    row.appendChild(natureTypeCell);

    const debutCell = document.createElement('td');
    debutCell.textContent = member.debut?.appearsIn || 'No hay información';
    row.appendChild(debutCell);



    return row;
}

async function displayAkatsukiMembers() {
    const members = await fetchAkatsukiMembers();
    console.log(members); // Verifica los miembros obtenidos
    const tableBody = document.getElementById('akatsuki-table-body');
    tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla

    if (members && Array.isArray(members)) {
        members.forEach(member => {
            const row = createTableRow(member);
            tableBody.appendChild(row);
        });
    } else {
        console.error('Members data is not an array:', members);
    }
}

// Llamar a la función para mostrar los miembros de Akatsuki
displayAkatsukiMembers();