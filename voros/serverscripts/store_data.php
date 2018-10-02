<?php
/*
 * The script stores the diagram data to SESSION variable
 */
session_start();

if(!isset($_SESSION['language'])){
    $_SESSION['language'] = $_POST['language'];
}

include_once('../languages/'.$_SESSION['language'].'.php');

if (isset($_POST['action']) && isset($_POST['data']) && $_POST['action'] == 'store') {
    $data = stripslashes($_POST['data']);
    $object_diagram = json_decode($data,true);
    if($object_diagram != null){
        $_SESSION['diagram_name'] = $object_diagram['block_diagram']['name'];
        $_SESSION['diagram_data'] = $data;
        die('{"status":"success","text":"OK"}');
    }else{
        die('{"status":"error","text":"'.ER_8.'"}');
    }
} else {
    die('{"status":"error","text":"'.ER_9.'"}');
}
?>