<?php
class Post {
    public $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }

    // Working
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

    //Working
    public function insertRecord($dt){
        // 
        $amount = $dt->payload->amount;
        $category_id = $dt->payload->category_id;
        $date = $dt->payload->date;
        $note = $dt->payload->note;

        $sqlString = "CALL insertRecord(?,?,?,?)";
        $data = [];
        try {
            $stmt = $this->pdo->prepare($sqlString);
            // dapat sunod sunod dito
            $stmt->execute([$amount, $category_id, $date, $note,]);
            $res = $stmt->fetchAll();
            $data=$res;
            return array("code"=>200, "data"=>$data);
        } catch (\PDOException $ex) {
            return array("code"=>404, "message"=>"ERROR".$ex->getMessage());
        }
    }

    public function updateRecord($dt){
        // 
        $id = $dt->payload->id;
        $amount = $dt->payload->amount;
        $category_id = $dt->payload->category_id;
        $date = $dt->payload->date;
        $note = $dt->payload->note;

        $sqlString = "CALL updateRecord(?,?,?,?,?)";
        $data = [];
        try {
            $stmt = $this->pdo->prepare($sqlString);
            // dapat sunod sunod dito
            $stmt->execute([$id, $category_id, $amount, $date, $note]);
            $res = $stmt->fetchAll();
            $data=$res;
            return array("code"=>200, "data"=>$data);
        } catch (\PDOException $ex) {
            return array("code"=>404, "message"=>"ERROR".$ex->getMessage());
        }
    }
}