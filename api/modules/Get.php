<?php
class Get {
    public $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }


    public function getStudents(){
        $sqlString = "CALL getAllExpenses()";
        $data = [];
        try {
            $stmt = $this->pdo->prepare($sqlString);
            $stmt->execute();
            $res = $stmt->fetchAll();
            $data=$res;
            return array("code"=>200, "data"=>$data);
        } catch (\PDOException $ex) {
            return array("code"=>404, "message"=>"ERROR".$ex->getMessage());
        }
    }
}