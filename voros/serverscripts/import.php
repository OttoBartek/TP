<?php

/**
 * The script reads the block diagram from the user uploaded file
 */
session_start();

if(!isset($_SESSION['language'])){
    $_SESSION['language'] = $_POST['language'];
}

include_once('../languages/'.$_SESSION['language'].'.php');
include_once( 'validators.php' );

/**
 * Check if the file upload is correct
 */
if (!empty($_FILES)) {
    if ($_FILES["subor_diagram"]["error"] > 0) {
        echo '{"status": "error", "text": "'.urlencode(ER_1).'"}';
    } else {
        if ($_FILES["subor_diagram"]["size"] <= 524288) {
            if ($_FILES["subor_diagram"]["type"] == "text/plain" || $_FILES["subor_diagram"]["type"] == "application/octet-stream") {
                $obsah_suboru = file_get_contents($_FILES["subor_diagram"]["tmp_name"]);
                $vysledok = json_decode($obsah_suboru,true);
                if($vysledok != NULL){
                    if(isDiagramCorrect($vysledok)){
                        echo '{"status": "success", "text": "OK", "diagram": '.  json_encode($vysledok).'}';
                    }else{
                        echo '{"status": "error", "text": "'.urlencode(ER_2).'"}';
                    }
                }else{
                    echo '{"status": "error", "text": "'.urlencode(ER_3).'"}';
                }
            } else {
                echo '{"status": "error", "text": "'.urlencode(ER_4).'"}';
            }
        } else {
            echo '{"status": "error", "text": "'.urlencode(ER_5).'"}';
        }
    }
} else {
    echo '{"status": "error", "text": "'.urlencode(ER_6).'"}';
}
?>
