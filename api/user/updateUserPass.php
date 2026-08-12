<?php
require __DIR__ . "/../config.php";

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

$id = $_SESSION["user_id"] ?? 0;
$currentPasswordInput = trim($data["editCurrentPassword"] ?? "");
$newPassword = trim($data["editNewPassword"] ?? "");
$confirmNewPassword = trim($data["editConfirmNewPassword"] ?? "");

if (empty($currentPasswordInput) || empty($newPassword) || empty($confirmNewPassword)) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

if($newPassword !== $confirmNewPassword) {
    echo json_encode([
        "success" => false,
        "message" => "New passwords do not match."
    ]);
    exit;
}

try {
    $checkSql = "SELECT password_hash FROM users WHERE id = ?";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([$id]);
    $users = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if (!$users) {
        echo json_encode([
            "success" => false,
            "message" => "User not found."
        ]);
        exit;
    }

    if(password_verify($newPassword, $users["password_hash"])) {
        echo json_encode([
            "success" => false,
            "message" => "New password cannot be the same as your current password."
        ]);
        exit; 
    } else if(password_verify($currentPasswordInput, $users["password_hash"])) {
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        
        $updateSql = "UPDATE users SET password_hash = ? WHERE id = ?";
        $updateStmt = $pdo->prepare($updateSql);
        $updateStmt->execute([
            $hashedNewPassword,
            $id
        ]);
    
        echo json_encode([
            "success" => true,
            "message" => "Password updated successfully."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Incorrect current password. Please try again."
        ]);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}