<?php
require __DIR__ . "/../config.php";

header("Content-Type: application/json");

session_start();

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

$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if($email === "" || $password === "") {
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

$sql = "SELECT id, first_name, last_name, email, contact_no, birth_date, password_hash FROM users WHERE email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if($user && password_verify($password, $user["password_hash"])) {
    session_regenerate_id(true);
    $_SESSION["user_id"] = $user["id"];
    $_SESSION["first_name"] = $user["first_name"];
    $_SESSION["last_name"] = $user["last_name"];
    $_SESSION["email"] = $user["email"];
    $_SESSION["contact_no"] = $user["contact_no"];
    $_SESSION["birth_date"] = $user["birth_date"];
    echo json_encode([
        "success" => true,
        "message" => "Successfully logged in."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Incorrect email or password. Please try again."
    ]);
    exit;
}