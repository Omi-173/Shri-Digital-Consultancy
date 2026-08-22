<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Spam check failed.']);
    exit;
}

$email = trim((string)($_POST['email'] ?? ''));

$name = trim((string)($_POST['name'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$company = trim((string)($_POST['company'] ?? ''));
$service = trim((string)($_POST['service'] ?? ''));
$budget = trim((string)($_POST['budget'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if (strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($phone) < 7 || strlen($message) < 15 || $service === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please complete all required fields.']);
    exit;
}

$recipient = 'digitalconsulting1390@gmail.com';
$subject = 'New Shri Digital Consultancy enquiry';
$body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nCompany: {$company}\nService: {$service}\nBudget: {$budget}\n\nMessage:\n{$message}\n";
$headers = "From: Shri Digital Consultancy <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (!mail($recipient, $subject, $body, $headers)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'The server could not send this enquiry.']);
    exit;
}

echo json_encode(['ok' => true]);
