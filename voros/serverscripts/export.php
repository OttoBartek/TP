<?php
/*
 * The script manages the diagram data export operation
 */
session_start();

if ($_GET['action'] == 'export') {
    $meno_suboru = time() * rand(0, 100) . "." . mt_rand(0, 999999);
    $txtsubor = fopen($meno_suboru, "w");
    fputs($txtsubor, $_SESSION['diagram_data']);
    fclose($txtsubor);
    header("Content-Length: " . filesize($meno_suboru));
    header('Content-Type: text/plain');
    header('Content-Disposition: attachment; filename='.preg_replace('/[^\00-\255]+/u', '_', preg_replace('/\s+/', '', $_SESSION['diagram_name'])).'.wbds');
    readfile($meno_suboru);
    unlink($meno_suboru);
} else {
    echo '{"status":"error","text":"GET"}';
}
?>