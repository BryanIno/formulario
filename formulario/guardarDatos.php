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
    $response = array("error" => "Todos los campos son obligatorios.");
    echo json_encode($response);
    exit();
}

if (strlen($alias) < 5 || !preg_match('/^[A-Za-z0-9]+$/', $alias)) {
    $response = array("error" => "El alias debe tener al menos 5 caracteres y contener solo letras y números.");
    echo json_encode($response);
    exit();
}

if (!preg_match('/^\d{7,8}-[0-9kK]$/', $rut)) {
    $response = array("error" => "El RUT no tiene un formato válido. Ejemplo: 19897995-3");
    echo json_encode($response);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response = array("error" => "El correo electrónico no tiene un formato válido.");
    echo json_encode($response);
    exit();
}

try {
    // Verificar si el RUT ya existe en la tabla votos
    $consultaVerificarRut = $conexion->prepare("SELECT COUNT(*) AS total FROM votos WHERE rut = :rut");
    $consultaVerificarRut->bindParam(':rut', $rut);
    $consultaVerificarRut->execute();
    $resultado = $consultaVerificarRut->fetch(PDO::FETCH_ASSOC);

    if ($resultado['total'] > 0) {
        $response = array("error" => "El RUT ya existe en la base de datos. No se permite duplicar.");
    } else {
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

        $response = array("success" => true);
         // Redireccionar al index.html en caso de éxito
        header("Location: exito.html");
        exit();
    }
} catch (PDOException $e) {
    $response = array("error" => "Error al conectar a la base de datos: " . $e->getMessage());
    http_response_code(500); // Establecer el código de estado HTTP 500 para indicar un error interno del servidor
}

// Enviar la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
exit();
?>
