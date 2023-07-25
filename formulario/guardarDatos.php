<?php
include '../conexion/conexion.php';

// Validar los campos del formulario
$nombre = $_POST['nombre'];
$alias = $_POST['alias'];
$rut = $_POST['rut'];
$email = $_POST['email'];
$region = $_POST['region'];
$comuna = $_POST['comuna'];

if (empty($nombre) || empty($alias) || empty($rut) || empty($email) || empty($region) || empty($comuna)) {
    die("Todos los campos son obligatorios.");
}

if (strlen($alias) < 5 || !preg_match('/^[A-Za-z0-9]+$/', $alias)) {
    die("El alias debe tener al menos 5 caracteres y contener solo letras y números.");
}

if (!preg_match('/^\d{7,8}-[0-9kK]$/', $rut)) {
    die("El RUT no tiene un formato válido. Ejemplo: 19897995-3");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("El correo electrónico no tiene un formato válido.");
}

try {
    // cargamos datos del formulario
    $candidato = $_POST['candidato'];
    $nosotros = isset($_POST['nosotros']) ? implode(", ", $_POST['nosotros']) : '';

    // preparamos el insert
    $consulta = $conexion->prepare("INSERT INTO votos (nombre, alias, rut, email, idRegion, idComuna, idCandidato, nosotros)
                                    VALUES (:nombre, :alias, :rut, :email, :region, :comuna, :candidato, :nosotros)");

    //guardamos valores
    $consulta->bindParam(':nombre', $nombre);
    $consulta->bindParam(':alias', $alias);
    $consulta->bindParam(':rut', $rut);
    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':region', $region);
    $consulta->bindParam(':comuna', $comuna);
    $consulta->bindParam(':candidato', $candidato);
    $consulta->bindParam(':nosotros', $nosotros);
    $consulta->execute();

    header('Location: exito.html');
} catch (PDOException $e) {
    http_response_code(500); // Establecer el código de estado HTTP 500 para indicar un error interno del servidor
    die("Error al conectar a la base de datos: " . $e->getMessage());
}
?>
