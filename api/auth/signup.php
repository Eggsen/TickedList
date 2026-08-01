<?php
require __DIR__ . "/../config.php";

header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "POST requests only."
    ]);
    exit;
}

$rawJson = file_get_contents("php://input");
$data = json_decode($rawJson, true);

if(!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON format."
    ]);
    exit;
}

$first_name = trim($data["firstName"] ?? "");
$last_name = trim($data["lastName"] ?? "");
$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");
$confirmPassword = trim($data["confirmPassword"] ?? "");
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

if($first_name === "" || 
    $last_name === "" || 
    $email === "" || 
    $password === "" || 
    $confirmPassword === ""
) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter all required fields."
    ]);
    exit;
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email format."
    ]);
    exit;
}

if($password !== $confirmPassword) {
    echo json_encode([
        "success" => false,
        "message" => "Passwords do not match."
    ]);
    exit;
}

$checkSql = "SELECT 1 FROM users WHERE email = ? LIMIT 1";
$checkStmt = $pdo->prepare($checkSql);
$checkStmt->execute([$email]);

if($checkStmt->fetch()) {
    echo json_encode([
        "success" => false,
        "message" => "Email has been already registered."
    ]);
    exit;
}

$sql = "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    $first_name,
    $last_name,
    $email,
    $hashedPassword
]);

echo json_encode([
    "success" => true,
    "message" => "Successfully registered."
]);