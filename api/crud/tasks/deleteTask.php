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

$id = (int)$data["id"] ?? 0;

try {
    $sql = "DELETE FROM tasks WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);

    if($id <= 0) {
        echo json_encode([
            "success" => true,
            "message" => "Task not found."
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => true,
            "message" => "Task deleted successfully."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}