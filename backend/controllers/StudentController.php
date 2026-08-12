<?php
    class StudentController{
        private $model;

        public function __construct($model){
            $this->model = $model; 
        }

        public function handleGetStudents(){
            $students = $this->model->getStudents();   
            echo json_encode($students); 
        }
        public function handleAddStudent(){
            $data = json_decode(file_get_contents("php://input"),true);

            if(empty($data["student_name"] || empty($data["course"]))|| empty($data["age"])){
                http_response_code(404); //Bad Request
               echo json_encode(["success"=>false , "message"=> "data is empty"]);
               return;
            }

            $response =  $this->model->addStudent($data["student_name"], $data["age"], $data["course"]); 

            if ($response["success"]) {
                http_response_code(201);//data created
                echo json_encode($response);
            }else{
                http_response_code(500);// server error;
                echo json_encode($response);
            }
        }
    }
?>