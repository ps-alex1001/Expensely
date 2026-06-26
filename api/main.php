<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    date_default_timezone_set("Asia/Manila");
    set_time_limit(1000);

    require_once("./config/Connection.php");
    require_once("./modules/Get.php");
    require_once("./modules/Post.php");

    $db = new Connection();
    $pdo = $db->connect();
    $get = new Get($pdo);
    $post = new Post($pdo);

    // echo $_REQUEST['request'];

    if(isset($_REQUEST['request'])){
        $req = explode('/', rtrim($_REQUEST['request'], '/'));
    } else {
        $req = [];
    }

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET': 
            switch($req[0]){
                case 'getAllExpenses':
                    echo json_encode($get->getStudents());
                break;

                default:
                    http_response_code(400);
                    
            }
        break;

        case 'POST':
            $d = json_decode(file_get_contents("php://input"));
            switch($req[0]){

                case 'deleteRecord':
                    echo json_encode($post->deleteRecord($d));
                break;
                
                case 'insertRecord':
                    echo json_encode($post->insertRecord($d));
                break;

                case 'updateRecord':
                    echo json_encode($post->updateRecord($d));
                break;

                default:
                    http_response_code(400);
            }
        break;

        default:
            http_response_code(401);
    }

