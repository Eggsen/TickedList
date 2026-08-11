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
        $_SESSION["first_name"] = $first_name;
    }
}

if(array_key_exists("editLastName", $data)) {
    $last_name = trim($data["editLastName"] ?? "");
    if (empty($last_name)) {
        echo json_encode([
            "success" => false,
            "message" => "Last name cannot be empty."
        ]);
        exit;
    } else {
        $updates[] = "last_name = ?";
        $params[] = $last_name;
        $_SESSION["last_name"] = $last_name;
    }
}

if(array_key_exists("editEmail", $data)) {
    $email = trim($data["editEmail"] ?? "");
    if (empty($email)) {
        echo json_encode([
            "success" => false,
            "message" => "Email cannot be empty."
        ]);
        exit;
    } else {
        $updates[] = "email = ?";
        $params[] = $email;
        $_SESSION["email"] = $email;
    }
}

if(array_key_exists("editContactNum", $data)) {
    $contact_no = !empty($data["editContactNum"]) ? trim($data["editContactNum"]) : null;
    $updates[] = "contact_no = ?";
    $params[] = $contact_no;
    $_SESSION["contact_no"] = $contact_no;
}

if (array_key_exists("editBirthDate", $data)) {
    $birth_date = !empty($data["editBirthDate"]) ? trim($data["editBirthDate"]) : null;
    $updates[] = "birth_date = ?";
    $params[] = $birth_date;
    $_SESSION["birth_date"] = $birth_date;
}

if (count($updates) === 0) {
    echo json_encode([
        "success" => false,
        "message" => "No fields to update."
    ]);
    exit;
}

$params[] = $id;

try {
    $sql = "UPDATE users SET " . implode(", ", $updates) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode([
        "success" => true,
        "message" => "User updated successfully."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}