<?php
require __DIR__ . "/../config.php";

session_start();

header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] !== "GET") {
    echo json_encode([
        "success" => false,
        "message" => "GET requests only."
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

try {
    $currentUserID = $_SESSION["user_id"];
    $sql = "SELECT id, first_name, last_name, email, contact_no, birth_date FROM users WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$currentUserID]);
    $users = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$users) {
        echo json_encode([
            "success" => false,
            "message" => "No users found."
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => true,
            "message" => "Users loaded.",
            "users" => $users
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}