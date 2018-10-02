<?php
/* 
 * Outputs the text as variable in javascript file
 */

session_start();

header("Content-type: text/javascript");

include('./generatetexts.php');

$strings = getTextsStrings($_SESSION['language']);

die('var texts='.$strings);

?>
