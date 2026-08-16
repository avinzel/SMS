<?php
    class StudentModel{
        private $conn; 
        public function __construct($conn){
            $this->conn = $conn; 
        }

        public function getStudents($student_name, $course){
            $inName = empty($student_name)? "%" : $student_name."%";
             $inCourse = empty($course) ? "%" : $course."%";
            $query = "Select * from students where student_name like ? and course like ? ";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ss",$inName,$inCourse );
            
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
                return ["success"=> true, "message"=>"Added Succesfully!","student_id"=> $stmt->insert_id];
            }else{
                return ["success"=> false,"message"=>"Insert Failed"];
            }
        }

        public function  deleteStudent($student_id){
            $query = "delete from students where student_id = ?";             
            $stmt = $this->conn->prepare($query); 
            $stmt->bind_param("i", $student_id);
            if($stmt->execute()){
                return true;
            }else {
                return false; 
            }

        }
        public function getStudent($student_id){
            $query = "select * from students where student_id = ?";

            $stmt = $this->conn->prepare($query); 
            $stmt->bind_param("i",$student_id );

            if ($stmt->execute()) {
                $result = $stmt->get_result()->fetch_assoc();
                return $result;
            }else{
                return false;
            }
        }
        public function updateStudent($student){
           $query = "update students set student_name = ?, age = ?, course = ?  where student_id = ?"; 
           $stmt = $this->conn->prepare($query);

           $stmt->bind_param("sisi",$student["student_name"], $student["age"], $student["course"], $student["student_id"]);

           return $stmt->execute();
        }
    }
?>