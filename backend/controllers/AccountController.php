<?php
    class AccountController{
        private $model ;
        public function __construct($model)
        {
            $this->model = $model ;            
        }
        public function handleSignUp(){
            $account = json_decode(file_get_contents("php://input"), true); 
            
            if (empty($account["user_name"] )|| empty($account["email"]) || empty($account["password"])) {
                echo json_encode(["success" => false , "message"=> "some data are misiing"]);
                http_response_code(400);
                return;
            }

            $response = $this->model->signUp($account);

            if ($response["success"]) {
                http_response_code(200);
                echo json_encode($response); 
            }else if ($response["message"] === "Something went wrong") {
                http_response_code(500);
                echo json_encode($response); 
            }else{
                http_response_code(400);
                echo json_encode($response);
            }
        }
        public function handleLogin(){
            $account = json_decode(file_get_contents("php://input"), true); 

            if (empty($account["user_name"]) || empty($account["password"])) {
                http_response_code(400);
                echo json_encode(["success"=> false, "message"=> "some data is missing"]);
                return;
            }

            $foundAccount = $this->model->findAccount($account["user_name"]); 

            if (!$foundAccount) {
                http_response_code(400);
                echo json_encode(["success"=> false, "message"=> "Account not found"]);
                return;
            }else{
                if (password_verify($account["password"], $foundAccount["password"])) {
                    $_SESSION["account_id"] = $foundAccount["account_id"]; 
                    $_SESSION["user_name"] = $foundAccount["user_name"];
                    http_response_code(200);
                    echo json_encode(["success"=> true, "message"=> "Logged-In", "account"=>$foundAccount]);
                }else{
                    echo json_encode(["success"=> false, "message"=> "Wrong password"]);
                    http_response_code(200); 
                }   
            }
        }
        public function handleLogout(){
            $_SESSION = [];
           if (session_destroy()) {
               echo json_encode(["success" => true, "message"=>["logout success"]]); 
           }else{
                echo json_encode(["success" => false, "message"=>["logout failed"]]); 
           }

           
        }
    }
?>
