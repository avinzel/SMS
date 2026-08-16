<?php
    class StudentController{
        private $model;

        public function __construct($model){
            $this->model = $model; 
        }

        public function handleGetStudents($student_name, $course){
            $students = $this->model->getStudents($student_name, $course);   
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
        public function handleGetStudent($student_id){
            if (is_int($student_id) ) {
                http_response_code(400);
                echo json_encode(["success" => false ,"message" => "bad request"]);
            }

            $response = $this->model->getStudent($student_id);

            if (!$response) {
                http_response_code(500);
               echo  json_encode(["success" => false, "message"=> "failed to find student" ]);
            }else{
                http_response_code(200);
                echo json_encode(["success"=> true, "message" => "student found", "student" => $response]);
            }
        }

        public function handleUpdateStudent(){
            $student = json_decode(file_get_contents("php://input"),true);

            if (!$student["student_id"]|| !$student["student_name"] || !$student["age"] || !$student["course"]) {
                http_response_code(400); // bad request
                echo json_encode(["success"=>false, "message"=>"some data are missing for update"]);
                return;
            }
            
            $response = $this->model->updateStudent( $student);

            if (!$response) {
               http_response_code(500); //server failed
               echo  json_encode(["success" => false, "message"=> "student update failed" ]);
            }else{
                http_response_code(200); //OK
                echo json_encode(["success" => true , "message"=> "student update successfully"]); 
            }   
        }
    }
?>