<?php

    define("SERVER", "localhost");
    define("DBASE", "sampledb");
    define("USER", "root");
    define("PWORD", "");

    class Connection{
        private $conString = "mysql:host=".SERVER.";dbname=".DBASE.";charset=utf8mb4";
        private $options = [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
            \PDO::ATTR_STRINGIFY_FETCHES => false
        ];

        public function connect(){
            $conn = false;

            try {
                $conn = new \PDO($this->conString, USER, PWORD, $this->options);
            } catch (\PDOException $ex) {
                echo "Connection error: " . $ex->getMessage();
            }
            return $conn;
        }
    }
