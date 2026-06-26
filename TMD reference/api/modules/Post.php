<?php
class Post {
    public $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }


    public function deleteStudent($dt){
        $studno = $dt->payload->studno;
        $sqlString = "CALL deleteRecord(?)";
        $data = [];
        try {
            $stmt = $this->pdo->prepare($sqlString);
            $stmt->execute([$studno]);
            $res = $stmt->fetchAll();
            $data=$res;
            return array("code"=>200, "data"=>$data);
        } catch (\PDOException $ex) {
            return array("code"=>404, "message"=>"ERROR".$ex->getMessage());
        }
    }

    public function addStudent($dt){
        $studno = $dt->payload->studno;
        $fname = $dt->payload->fname;
        $lname = $dt->payload->lname;
        $sex = $dt->payload->sex;
        $college = $dt->payload->college;
        $program = $dt->payload->program;

        $sqlString = "CALL insertStudent(?,?,?,?,?,?)";
        $data = [];
        try {
            $stmt = $this->pdo->prepare($sqlString);
            $stmt->execute([$studno, $fname, $lname, $sex, $college, $program]);
            $res = $stmt->fetchAll();
            $data=$res;
            return array("code"=>200, "data"=>$data);
        } catch (\PDOException $ex) {
            return array("code"=>404, "message"=>"ERROR".$ex->getMessage());
        }
    }
}