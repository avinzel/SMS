<?php
    session_start();// starts a session for login authentication
    // session_destroy();
    // exit();
    // 1. Set CORS and Header standards for APIs
   header("Access-Control-Allow-Origin: http://localhost:5173"); // what url are alowwed
    header("Access-Control-Allow-Credentials: true"); // handling cookies from the front end
    header("Access-Control-Allow-Methods: GET,PUT, POST, DELETE, OPTIONS"); //allowed http methods
    header("Content-Type: application/json; charset=UTF-8"); //returns json file format
    header("Access-Control-Allow-Headers: Content-Type, Authorization"); //for content autorization?

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //handles the pre flight request, checks allowed things in the server
        http_response_code(200);
        exit();
    }
    
    require_once "../config/database.php";
    require_once "../models/StudentModel.php";
    require_once "../controllers/StudentController.php";
    require_once "../models/AccountModel.php";
    require_once "../controllers/AccountController.php";
    $database = new Database(); 
    $conn = $database->getConnection();
    
    
    $studentModel = new StudentModel($conn);
    $studentController = new StudentController($studentModel); 
    $accountModel = new AccountModel($conn); 
    $accountController = new AccountController($accountModel);
    
    
    $method = $_SERVER["REQUEST_METHOD"];
    $action = $_GET["action"] ?? "";
    $student_id = $_GET["student_id"] ?? "";
    // echo json_encode($_SESSION["account_id"]);
    switch ($action) {
        case 'student':
            require_once "../middleware/auth.php";
            if ($method === "GET") {
                if ($student_id) {
                    $studentController->handleGetStudent($student_id);
                }else{
                    $studentController->handleGetStudents($_GET["student_name"] , $_GET["course"]);
                }
            }else if($method === "POST"){
                $studentController->handleAddStudent();
            }else if($method === "DELETE"){
                $studentController->handleDeleteStudent();
            }else if($method === "PUT"){
                $studentController->handleUpdateStudent();
            }
            break;
        case "signup": 
            if ($method ==="POST") {
                $accountController->handleSignUp();
            }
        break;
        case "login": 
            if ($method ==="POST") {
                $accountController->handleLogin();   
            }
        break;
        case "logout": 
           if ($method === "GET") {
              $accountController->handleLogout();
           }
        break; 
        case "check_session":
            require_once "../middleware/check_session.php";
        break;
        default:
            http_response_code(404); //not found
            echo json_encode([ "success"=> false,"message" => "Endpoint not found."]);
            break;
    }


?>