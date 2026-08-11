<?php
require __DIR__ . "/../../config.php";

session_start();

header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "POST requests only."
    ]);
    exit;
}

if(!isset($_SESSION["user_id"])) {
    echo json_encode([
        "success" => false,
        "message" => "User is not logged in."
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

$id = $_SESSION["user_id"];

if(array_key_exists("enterCurrentPassword", $data)) {
    $current_password = trim($data["enterCurrentPassword"] ?? "");
    if (empty($current_password)) {
        echo json_encode([
            "success" => false,
            "message" => "Current password cannot be empty."
        ]);
        exit;
    }
}

if(array_key_exists("enterNewPassword", $data)) {
    $new_password = trim($data["enterNewPassword"] ?? "");
    $hashedNewPassword = password_hash($new_password, PASSWORD_DEFAULT);
    if (empty($new_password)) {
        echo json_encode([
            "success" => false,
            "message" => "New password cannot be empty."
        ]);
        exit;
    }
}

$sql = "SELECT id, password_hash FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if($user && password_verify($current_password, $user["password_hash"])) {
    try{
        $_SESSION["password_hash"] = $hashedNewPassword;
        $sql = "UPDATE users SET password_hash = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$hashedNewPassword, $id]);
        echo json_encode([
            "success" => true,
            "message" => "Password updated successfully."
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        ]);
    }  
} else {
    echo json_encode([
        "success" => false,
        "message" => "Current password doesn't match. Please try again."
    ]);
    exit;
}