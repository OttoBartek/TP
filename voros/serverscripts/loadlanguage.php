<?php
/* 
 * Sends new texts to UI on dynamical language change
 */

session_start();

if (isset($_POST['action']) && isset($_POST['language']) && ($_POST['action'] == 'loadlanguage')) {
    $_SESSION['language'] = $_POST['language'];
    
    include_once('../languages/' . $_SESSION['language'] . '.php');
    include('./generatetexts.php');

    $strings = getTextsStrings($_POST['language']);

    die('{"status":"success","new_language":' . $strings . '}');
} else {
    die('{"status":"error","text":"' . ER_9 . '"}');
}

?>
