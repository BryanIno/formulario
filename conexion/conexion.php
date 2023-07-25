<?php
$host = "127.0.0.1"; 
$puerto = "3307";
$usuario = "root"; 
$contrasena = "su_contraseña";
$base_de_datos = "db_ejercicio"; 

try {
    $conexion = new PDO("mysql:host=$host;port=$puerto;dbname=$base_de_datos", $usuario, $contrasena);

    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    die("Error al conectar a la base de datos: " . $e->getMessage());
}
?>
