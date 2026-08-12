<?php
    class StudentModel{
        private $conn; 
        public function __construct($conn){
            $this->conn = $conn; 
        }

        public function getStudents(){
            $query = "Select * from students";
            $stmt = $this->conn->prepare($query);
            
            $stmt->execute(); 

            $result = $stmt->get_result();

            $students = [];

            while ($row = $result->fetch_assoc()) {
                $students[] = $row; 
            }

            return $students;
        }
        public function addStudent($name,$age,$course){
            $query = "INSERT into students(student_name,age,course) 
            VALUES(?,?,?)";

            $stmt = $this->conn->prepare($query); 
            $stmt->bind_param("sis",$name,$age,$course); 
            $success = $stmt->execute();

            if ($success) {
                return ["success"=> true, "student_id"=> $stmt->insert_id];
            }else{
                return ["success"=> false,"message"=>"Insert Failed"];
            }


        }
    }
?>