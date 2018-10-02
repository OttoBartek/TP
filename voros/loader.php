<?php
/*
 * The file loads the contents into another application trouht iframe
 * it can be done with the code:
 * echo @file_get_contents('http://...DOMAIN.../loader.php');
 * it should be loaded into div with specified width and height
 */
include_once './serverscripts/configuration.php';

echo '
<iframe src="'.$application_url.'/index2.php" width="100%" height="100%" style="background-color:#FFFFFF;border:0px;">
    <p>Your browser does not support iframes, please use another to view this page.</p>
</iframe>
';
?>