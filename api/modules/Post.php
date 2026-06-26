<?php
class Post {
    public $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }


    public function deleteRecord($dt){
        $id = $dt->payload->id;
        // var_dump($id);
        $sqlString = "CALL deleteRecord(?)";
        $data = [];

        try {
            $stmt = $this->pdo->prepare($sqlString);
            $stmt->execute([$id]);
            $res = $stmt->fetchAll();
            $data=$res;
            return array("code"=>200, "data"=>$data);
        } catch (\PDOException $ex) {
            return array("code"=>404, "message"=>"ERROR".$ex->getMessage());
        }
    }

    public function insertRecord($dt){
        // 
        $amount = $dt->payload->amount;
        $categoryid = $dt->payload->categoryid;
        $date = $dt->payload->date;
        $note = $dt->payload->note;

        $sqlString = "CALL insertRecord(?,?,?,?)";
        $data = [];
        try {
            $stmt = $this->pdo->prepare($sqlString);
            // dapat sunod sunod dito
            $stmt->execute([$amount, $categoryid, $date, $note,]);
            $res = $stmt->fetchAll();
            $data=$res;
            return array("code"=>200, "data"=>$data);
        } catch (\PDOException $ex) {
            return array("code"=>404, "message"=>"ERROR".$ex->getMessage());
        }
    }
}