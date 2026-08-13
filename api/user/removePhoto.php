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

$userID = $_SESSION["user_id"];

try {
    $selectSql = "SELECT profile_photo FROM users WHERE id = ?";
    $selectStmt = $pdo->prepare($selectSql);
    $selectStmt->execute([$userID]);
    $currentUser = $selectStmt->fetch(PDO::FETCH_ASSOC);

    if($currentUser && !empty($currentUser["profile_photo"])) {
        $oldFilePhysical = __DIR__ . "/../.." . $currentUser["profile_photo"];
        if(file_exists($oldFilePhysical)) {
            unlink($oldFilePhysical);
        }
    }

    $updateSql = "UPDATE users SET profile_photo = NULL WHERE id = ?";
    $updateStmt = $pdo->prepare($updateSql);
    $updateStmt->execute([$userID]);

    echo json_encode([
        "success" => true,
        "message" => "Profile photo removed successfully."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
