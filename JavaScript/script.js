let numeroPagina = 1;  // Pagina 1 de la API
let filtroNombre = '';  // Filtro para nombre (vacio)
let filtroStatus = '';  // Filtro para estado (vacio)

function cambiarPaginaApi(page) {  // Funcion para cambiar de pagina y agregar los filtros si los solicita el usuario
    let apiRickAndMorty = `https://rickandmortyapi.com/api/character/?page=${page}&name=${filtroNombre}&status=${filtroStatus}`;

    fetch(apiRickAndMorty)
        .then(response => response.json())  // Convierte lo que recibe de la API a un archivo .json
        .then(data => {

            // Recibe la URL de la pagina anterior y siguiente
            let prev = data.info.prev; 
            let next = data.info.next;

            let html = '';

            data.results.forEach(character => {
                let modalId = `modalId${character.id}`;  // Modal unico por cada ID

                html += `

                    <!--Boton para Abrir modal -->

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                    <img class="imgCard" src="${character.image}" alt="${character.name}">
                    <h5 class= "nameCharacter" >${character.name}</h5>
                    </button>

                    <!--Modal unico por ID -->

                    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title titleModal fs-5" id="${modalId} Label">${character.name}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <img class="marginModal" src="${character.image}" alt="${character.name}">
                                    <p>Estado: ${character.status}</p>
                                    <p>Género: ${character.gender}</p>
                                    <p>Especie: ${character.species}</p>
                                    <p>Lugar de origen: ${character.origin.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.getElementById('personajes').innerHTML = html;  // Ingresa la variable html lo que esta en el id='personajes'

            const siguiente = document.getElementById('siguiente');
            const siguiente2 = document.getElementById('siguiente2');
            const anterior = document.getElementById('anterior');
            const anterior2 = document.getElementById('anterior2');
            if (anterior) {
                anterior.disabled = !prev;  // Deshabilita boton anterior si la URL no tiene paginas previas 
            }
            if (anterior2) {
                anterior2.disabled = !prev;
            }
            if (siguiente) {
                siguiente.disabled = !next;  // Deshabilita boton siguiente si la URL no tiene mas paginas
            }
            if (siguiente2) {
                siguiente2.disabled = !next;
            }
        })
        .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', () => {  // Funcion para cargar el DOM
    cambiarPaginaApi(numeroPagina);

    const anterior = document.getElementById('anterior');  // Evento para el boton anterior
    if (anterior) {
        anterior.addEventListener('click', () => {
            numeroPagina--;
            cambiarPaginaApi(numeroPagina);
        });
    }

    const anterior2 = document.getElementById('anterior2');
    if (anterior2) {
        anterior2.addEventListener('click', () => {
            numeroPagina--;
            cambiarPaginaApi(numeroPagina);
        });
    }

    const siguiente = document.getElementById('siguiente');  // Evento para el boton siguiente
    if (siguiente) {
        siguiente.addEventListener('click', () => {
            numeroPagina++;
            cambiarPaginaApi(numeroPagina);
        });
    }

    const siguiente2 = document.getElementById('siguiente2');
    if (siguiente2) {
        siguiente2.addEventListener('click', () => {
            numeroPagina++;
            cambiarPaginaApi(numeroPagina);
        });
    }

    const formBuscar = document.getElementById('formBuscar');  // Evento de Busqueda por nombre
    if (formBuscar) {
        formBuscar.addEventListener('submit', (e) => {
            e.preventDefault();  // Evita la recarga de la página
            filtroNombre = document.getElementById('buscarNombre').value.toLowerCase();  // Tiene en cuenta si se busca con mayusculas
            filtroStatus = document.getElementById('filtroStatus').value;
            numeroPagina = 1;
            cambiarPaginaApi(numeroPagina);  // Recarga la pagina con los filtros aplicados
        });
    }

    const filtroStatusSelect = document.getElementById('filtroStatus');  // Evento de Busqueda por status
    if (filtroStatusSelect) {
        filtroStatusSelect.addEventListener('change', (e) => {
            filtroStatus = e.target.value;  // Actualiza los personajes por status sin tener que apretar el boton Buscar
            numeroPagina = 1;
            cambiarPaginaApi(numeroPagina);  // Recarga la pagina con el filtro aplicado
        });
    }
});

