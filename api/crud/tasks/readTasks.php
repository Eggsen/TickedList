<?php
require __DIR__ . "/../../config.php";

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
    $sql = "SELECT id, user_id, title, task_description, task_status, list_type, due_date, created_at FROM tasks WHERE user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$currentUserID]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if(count($tasks) <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "No tasks found."
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => true,
            "message" => "Tasks loaded.",
            "tasks" => $tasks
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
