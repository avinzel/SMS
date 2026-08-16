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
    }
?>
