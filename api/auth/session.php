<?php
require __DIR__ . "/../config.php";

session_start();

if (isset($_SESSION["user_id"])) {
    echo json_encode([
        "logged_in" => true,
        "user" => [
            "id" => $_SESSION["user_id"],
            "first_name" => $_SESSION["first_name"] ?? "",
            "email" => $_SESSION["email"] ?? ""
        ]
    ]);
} else {
    echo json_encode([
        "logged_in" => false
    ]);  
}
