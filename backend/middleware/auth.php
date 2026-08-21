<?php
    // session_start();


    if (!isset($_SESSION["account_id"]) || !isset($_SESSION["user_name"])) {
        http_response_code(401);  
        echo json_encode(["success" => false ,"message" => "login first"]); 
        return
        exit;
    }
?>