<?php
require __DIR__ . "/../config.php";

session_start();

$_SESSION = [];
session_destroy();

echo json_encode([
    "success" => true, 
    "message" => "Logged out successfully"
]);