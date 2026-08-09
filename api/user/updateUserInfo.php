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

$updates = [];
$params = [];

if(array_key_exists("editFirstName", $data)) {
    $first_name = trim($data["editFirstName"] ?? "");
    if (empty($first_name)) {
        echo json_encode([
            "success" => false,
            "message" => "First name cannot be empty."
        ]);
        exit;
    } else {
        $updates[] = "first_name = ?";
        $params[] = $first_name;
    }
}

if(array_key_exists("editLastName", $data)) {
    $last_name = trim($data["editLastName"] ?? "");
    $updates[] = "last_name = ?";
    $params[] = $last_name;
}

if(array_key_exists("editEmail", $data)) {
    $email = trim($data["editEmail"] ?? "");
    $updates[] = "email = ?";
    $params[] = $email;
}

if(array_key_exists("editContactNo", $data)) {
    $contact_no = trim($data["editContactNo"] ?? "");
    $updates[] = "contact_no = ?";
    $params[] = $contact_no;
}

if(array_key_exists("editBirthdate", $data)) {
    $birthdate = !empty($data["editBirthdate"]) ? trim($data["editBirthdate"]) : null;
    $updates[] = "birthdate = ?";
    $params[] = $birthdate;
}

if (empty($updates)) {
    echo json_encode([
        "success" => false, 
        "message" => "No fields provided to update."]);
    exit;
}

$params[] = $id;

try {
    $sql = "UPDATE users SET " . implode(", ", $updates) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    if($id <= 0) {
        echo json_encode([
            "success" => true,
            "message" => "User not found."
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => true,
            "message" => "User updated successfully."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}