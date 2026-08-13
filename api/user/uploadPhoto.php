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

if(!isset($_FILES["profile_photo"]) || $_FILES["profile_photo"]["error"] !== UPLOAD_ERR_OK) {
    echo json_encode([
        "success" => false,
        "message" => "No file uploaded or upload error occurred."
    ]);
    exit;
}

$file = $_FILES["profile_photo"];
$maxSize = 5 * 1024 * 1024; // 5MB

if($file["size"] > $maxSize) {
    echo json_encode([
        "success" => false,
        "message" => "File size exceeds limit of 5MB."
    ]);
    exit;
}

$allowedTypes = ["image/jpeg", "image/png", "image/webp"];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file["tmp_name"]);
finfo_close($finfo);

if(!in_array($mimeType, $allowedTypes)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid file format. Only JPG, PNG, and WebP are allowed."
    ]);
    exit;
}

$ext = pathinfo($file["name"], PATHINFO_EXTENSION);
$userID = $_SESSION["user_id"];
$newFilename = "user_" . $userID . "_" . time() . "." . strtolower($ext);

$uploadDir = __DIR__ . "/../../assets/uploads/profile_photos/";

if(!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$targetPath = $uploadDir . $newFilename;
$dbPath = "/assets/uploads/profile_photos/" . $newFilename;

try {
    // Retrieve old profile photo to delete file from server
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

    if(move_uploaded_file($file["tmp_name"], $targetPath)) {
        $updateSql = "UPDATE users SET profile_photo = ? WHERE id = ?";
        $updateStmt = $pdo->prepare($updateSql);
        $updateStmt->execute([$dbPath, $userID]);

        echo json_encode([
            "success" => true,
            "message" => "Profile photo updated successfully.",
            "profile_photo" => $dbPath
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to move uploaded file."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
