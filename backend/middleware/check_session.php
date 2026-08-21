<?php
    if (isset($_SESSION["account_id"]) || isset($_SESSION["user_name"])) {
       http_response_code(200);
       $account = ["account_id"=> $_SESSION["account_id"], "user_name"=>$_SESSION["user_name"]];
       echo json_encode(["success"=> true , "account" => $account]);
    }else{
         echo json_encode(["success"=>false,"message"=>"session expired"]);
    }
?>