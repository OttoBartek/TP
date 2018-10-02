<?php
	$v = $_GET['v'];
	$a = $_GET['a'];
	
	$t = 0.05;
	echo "0;0;0;";
	while (true){
		$x = $v*$t*cos($a);
		$y = $v*$t*sin($a) - 0.5*9.81*pow($t,2);

		echo $t.";".$x.";".$y.";";
		
        if ($y<0) {
            break;
        }
		$t+=0.05;
	}
?>
