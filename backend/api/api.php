<?php
    // 1. Set CORS and Header standards for APIs
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    require_once "../config/database.php";
    require_once "../models/StudentModel.php";
    require_once "../controllers/StudentController.php";

    $database = new Database(); 
    $conn = $database->getConnection();
    
    
    $studentModel = new StudentModel($conn);
    $studentController = new StudentController($studentModel); 


    $method = $_SERVER["REQUEST_METHOD"];
    $action = $_GET["action"] ?? "";


    switch ($action) {
        case 'student':
            if ($method === "GET") {
                $studentController->handleGetStudents();
            }else if($method === "POST"){
                $studentController->handleAddStudent();
            }else if($method === "DELETE"){
                $studentController->handleDeleteStudent();
            }
            break;
        
        default:
            http_response_code(404);
            echo json_encode([ "success"=> false,"message" => "Endpoint not found."]);
            break;
    }


?>