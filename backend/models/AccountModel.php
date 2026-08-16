<?php
class AccountModel
{
    private $conn;
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function signUp($account)
    {
        $password = password_hash($account["password"], PASSWORD_DEFAULT);
        $query = "insert into accounts(user_name,password,email)
            values(?,?,?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sss", $account["user_name"], $password, $account["email"]);

        try {
            if ($stmt->execute()) {
                return (["success" => true, "message" => "Sign-Up Succes"]);
            } else {
                return (["success" => false, "message" => "Something went wrong"]);
            }
        } catch (\Throwable $e) {
            if ($e->getCode() == 1062) {
                return (["success" => false, "message" => "User Name or Email is already taken"]);
            } else {
                return (["success" => false, "message" => "omething went wrong"]);
            }
        }
    }
}
