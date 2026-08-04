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

$title = trim($data["title"] ?? "");
$task_description = trim($data["taskDescription"] ?? "");
$task_status = trim($data["taskStatus"] ?? "pending");
$list_type = trim($data["listType"] ?? "Personal");
$due_date = !empty($data["dueDate"]) ? trim($data["dueDate"]) : null;

if (empty($title)) {
    echo json_encode([
        "success" => false,
        "message" => "Task title is required."
    ]);
    exit;
}

try {
    $sql = "INSERT INTO tasks (user_id, title, task_description, task_status, list_type, due_date) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_SESSION["user_id"],
        $title,
        $task_description,
        $task_status,
        $list_type,
        $due_date
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Task added successfully."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}