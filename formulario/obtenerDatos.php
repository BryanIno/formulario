<?php
include '../conexion/conexion.php';

try {
    // Obtener datos de la tabla 'candidato'
    $consultaCandidatos = $conexion->query("SELECT idCandidato, nomCandidato, idComuna FROM candidato");
    $candidatos = $consultaCandidatos->fetchAll(PDO::FETCH_ASSOC);

    // Obtener datos de la tabla 'comunas'
    $consultaComunas = $conexion->query("SELECT idComunas, comNombre , idRegion FROM comunas");
    $comunas = $consultaComunas->fetchAll(PDO::FETCH_ASSOC);

    // Obtener datos de la tabla 'regiones'
    $consultaRegiones = $conexion->query("SELECT idRegion, reNombre FROM regiones");
    $regiones = $consultaRegiones->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los datos en formato JSON
    $datos = array(
        "candidatos" => $candidatos,
        "comunas" => $comunas,
        "regiones" => $regiones
    );

    echo json_encode($datos);
} catch (PDOException $e) {
    http_response_code(500);
    die("Error al conectar a la base de datos: " . $e->getMessage());
}
?>

