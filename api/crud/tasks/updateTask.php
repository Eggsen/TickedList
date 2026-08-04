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

$id = (int)$data["id"] ?? 0;

$updates = [];
$params = [];

if(array_key_exists("editTitle", $data)) {
    $title = trim($data["editTitle"] ?? "");
    if (empty($title)) {
        echo json_encode([
            "success" => false,
            "message" => "Task title is required."
        ]);
        exit;
    } else {
        $updates[] = "title = ?";
        $params[] = $title;
    }
}

if(array_key_exists("editDescription", $data)) {
    $task_description = trim($data["editDescription"] ?? "");
    $updates[] = "task_description = ?";
    $params[] = $task_description;
}

if(array_key_exists("newStatus", $data)) {
    $task_status = trim($data["newStatus"] ?? "pending");
    $updates[] = "task_status = ?";
    $params[] = $task_status;
}

if(array_key_exists("editListType", $data)) {
    $list_type = trim($data["editListType"] ?? "personal");
    $updates[] = "list_type = ?";
    $params[] = $list_type;
}

if(array_key_exists("editDueDate", $data)) {
    $due_date = !empty($data["editDueDate"]) ? trim($data["editDueDate"]) : null;
    $updates[] = "due_date = ?";
    $params[] = $due_date;
}

$params[] = $id;

try {
    $sql = "UPDATE tasks SET " . implode(", ", $updates) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    if($id <= 0) {
        echo json_encode([
            "success" => true,
            "message" => "Task not found."
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => true,
            "message" => "Task updated successfully."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}