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
                http_response_code(400); //Bad Request
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
        public function handleDeleteStudent(){
            $student_id = json_decode(file_get_contents("php://input"), true); 

            if (!is_int( $student_id ) ) {
                http_response_code(400); // server could not understand the request
                echo json_encode(["success" => false, "message" =>  "Deletion Failed"]); 
            }
            
            if ($this->model->deleteStudent($student_id )) {
                http_response_code(200); // OK
                echo json_encode(["success" => true, "message" => "Student successfully deleted"]); 
            }else{
                http_response_code(500); //server error
                echo json_encode(["success" => false, "message" =>  "Deletion Failed server error"]); 
            }
        }
    }
?>