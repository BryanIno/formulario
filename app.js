document.addEventListener('DOMContentLoaded', function() {
    const regionesSelect = document.getElementById('region');
    const comunasSelect = document.getElementById('comuna');
    const candidatosSelect = document.getElementById('candidato');
    let data; // Declarar la variable data

    regionesSelect.addEventListener('change', function() {
        const selectedRegionId = this.value; // Obtener el idRegion seleccionado
        // console.log(selectedRegionId);
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

    
});
 
  
  