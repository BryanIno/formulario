document.addEventListener('DOMContentLoaded', function() {
    const regionesSelect = document.getElementById('region');
    const comunasSelect = document.getElementById('comuna');
    const candidatosSelect = document.getElementById('candidato');
    let data; // Declarar la variable data

    regionesSelect.addEventListener('change', function() {
        const selectedRegionId = this.value; // Obtener el idRegion seleccionado
        // Filtrar las comunas correspondientes al idRegion seleccionado
        const comunasFiltradas = data.comunas.filter(comuna => comuna.idRegion == selectedRegionId);

        // Limpiar el select de comunas antes de llenarlo nuevamente
        comunasSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

        // Llenar el select de comunas con las opciones filtradas
        comunasFiltradas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna.idComunas;
            option.textContent = comuna.comNombre;
            comunasSelect.appendChild(option);
        });

        // Limpiar el select de candidatos
        candidatosSelect.innerHTML = '<option value="">Seleccione un candidato</option>';
    });

    comunasSelect.addEventListener('change', function() {
        const selectedComunaId = this.value; // Obtener el idComuna seleccionado

        // Filtrar los candidatos correspondientes al idComuna seleccionado
        const candidatosFiltrados = data.candidatos.filter(candidato => candidato.idComuna == selectedComunaId);

        // Limpiar el select de candidatos antes de llenarlo nuevamente
        candidatosSelect.innerHTML = '<option value="">Seleccione un candidato</option>';

        // Llenar el select de candidatos con las opciones filtradas
        candidatosFiltrados.forEach(candidato => {
            const option = document.createElement('option');
            option.value = candidato.idCandidato;
            option.textContent = candidato.nomCandidato;
            candidatosSelect.appendChild(option);
        });
    });

    // Obtener los datos desde obtener_datos.php usando AJAX
    fetch('./formulario/obtenerDatos.php')
        .then(response => response.json())
        .then(result => {
            data = result; // Asignar los datos recibidos a la variable data

            // Llenar el select de regiones
            data.regiones.forEach(region => {
                const option = document.createElement('option');
                option.value = region.idRegion;
                option.textContent = region.reNombre;
                regionesSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));

        const form = document.getElementById('form'); // Obtener el formulario por su ID

        form.addEventListener('submit', async function (event) {
            event.preventDefault(); // Detener el envío del formulario para realizar las validaciones
        
            if (!validarFormulario()) {
                // Si hay errores, mostrar el mensaje en el div con id="error-container"
                const errorContainer = document.getElementById('error-container');
        
                // Obtener el mensaje de error desde el servidor
                const response = await fetch('./formulario/guardarDatos.php', {
                    method: 'POST',
                    body: new FormData(form),
                });
                const responseData = await response.json();
        
                if (responseData.error) {
                    // Mostrar el mensaje de error en una alerta
                    alert(responseData.error);
                } else {
                    // Si no hay errores, enviar el formulario
                    form.submit();
                }
            } else {
                // Si no hay errores, enviar el formulario
                form.submit();
            }
        });
    });
//Validaciones

function validarFormulario() {
    //nombre
    const nombreInput = document.getElementById('nombre');
    if (nombreInput.value.trim() === '') {
        alert('El nombre y apellido no deben quedar en blanco.');
        return false;
    }

    //alias
    const aliasInput = document.getElementById('alias');
    if (aliasInput.value.length < 5 || !/^[A-Za-z0-9]+$/.test(aliasInput.value)) {
        alert('El alias debe tener al menos 5 caracteres y contener solo letras y números.');
        return false;
    }

    // rut
    const rutInput = document.getElementById('rut');
    if (!/^\d{7,8}-[0-9kK]$/.test(rutInput.value)) {
        alert('El RUT no tiene un formato válido. Ejemplo: 19897995-3');
        return false;
    }

    // email
    const emailInput = document.getElementById('email');
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {
        alert('El correo electrónico no tiene un formato válido.');
        return false;
    }
     // region
    const regionSelect = document.getElementById('region');
    if (regionSelect.value === '') {
        alert('Debe seleccionar una región.');
        return false;
    }

    // comuna
    const comunaSelect = document.getElementById('comuna');
    if (comunaSelect.value === '') {
        alert('Debe seleccionar una comuna.');
        return false;
    }
    // candidato
    const candidatoSelect = document.getElementById('candidato');
    if (candidatoSelect.value === '') {
        alert('Debe seleccionar un candidato.');
        return false;
    }
    return true;
}
 
  
  
