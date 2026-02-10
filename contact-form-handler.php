<?php
header('Content-Type: application/json; charset=utf-8');

// Configura aquí el email receptor
$to = 'tu@ejemplo.com'; // <-- reemplaza por tu correo

$response = ['success' => false, 'message' => 'Ha ocurrido un error inesperado.'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    $response['message'] = 'Método no permitido';
    echo json_encode($response);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'Nuevo mensaje desde sitio';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(422);
    $response['message'] = 'Por favor completa los campos requeridos.';
    echo json_encode($response);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    $response['message'] = 'Email inválido.';
    echo json_encode($response);
    exit;
}

$mail_subject = '[Web] ' . $subject;
$body = "Nombre: $name\nEmail: $email\n\nMensaje:\n$message";

$headers = "From: sitio-web <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = false;
try {
    $sent = mail($to, $mail_subject, $body, $headers);
} catch (Exception $e) {
    $sent = false;
}

if ($sent) {
    $response['success'] = true;
    $response['message'] = 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.';
    echo json_encode($response);
    exit;
} else {
    http_response_code(500);
    $response['message'] = 'No se pudo enviar el mensaje. Verifica la configuración del servidor.';
    echo json_encode($response);
    exit;
}

?>
