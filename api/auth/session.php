<?php
require __DIR__ . "/../config.php";

session_start();

header("Content-Type: application/json");

if (isset($_SESSION["user_id"])) {
    echo json_encode([
        "logged_in" => true,
        "user" => [
            "id" => $_SESSION["user_id"],
            "first_name" => $_SESSION["first_name"] ?? "",
            "last_name" => $_SESSION["last_name"] ?? "",
            "email" => $_SESSION["email"] ?? "",
            "contact_no" => $_SESSION["contact_no"] ?? "",
            "birth_date" => $_SESSION["birth_date"] ?? "",
            "password_hash" => $_SESSION["password_hash"] ?? ""
        ]
    ]);
} else {
    echo json_encode([
        "logged_in" => false
    ]);  
}
