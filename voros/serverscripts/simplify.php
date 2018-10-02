<?php
/* 
 * Simplifyes the diagram and sends back solution to the user interface
 */
session_start();
if(!isset($_SESSION['language'])){
    $_SESSION['language'] = $_POST['language'];
}

include_once('../languages/'.$_SESSION['language'].'.php');
include_once( 'validators.php' );

/*
 * Gets the block name on the second end of the connection
 */
function getConnectedBlock($blocks_collection,$block_name){
    $another_side = $blocks_collection[$block_name]['pins']['input']['connected_to_block'];
    if($blocks_collection[$another_side]['block_type'] == 'junction') {
        $another_side = getConnectedBlock($blocks_collection,$blocks_collection[$another_side]['pins']['pin4']['connected_to_block']);
    }
    return $another_side;
}

/*
 * Prepares the linear equations for sending to maxima and sends the data
 */
function sendDataForSimplify($eqs){
    include('configuration.php');
	$executestring = 'display2d:false;load("'.$coma_path.'");transfer_function(' . $eqs . ',u,y);tex(%);';

    $result = shell_exec($maxima_launcher_path.' 19 '.$maxima_installdir.' '.escapeshellarg($executestring));
    $result = preg_replace('/\s+/', ' ', $result);
    
    $solutiontex = '';
    preg_match_all('/\$\$[^\$]*\$\$/',$result,$solutiontex);
    $solution['solutiontex'] = '{{Y}\over{U}}='.preg_replace('/\$\$/', '', $solutiontex[0][0]);
    
    $solutiontext = '';
    preg_match_all('/\(%o3\).*\(%i4\)/',$result,$solutiontext);
    $solution['solutiontext'] = 'Y/U='.preg_replace('/(\(%o3\))|(\(%i4\))/', '', $solutiontext[0][0]);

    $solution['solutionimg'] = '$' . $solution['solutiontex'] . '$';//'<img src="'.$mathtex_path.'?'.$solution['solutiontex'].'" />';
    
    return $solution;
}

/*
 * Creates polynome from numerator and denominator in format 'd d d d'
 */
function createPolynome($input){
    $input = explode(' ', $input);
    $polynome = '';
    $power = 0;
    $index = sizeof($input)-1;
    $signum = '';
    while($index > -1){
        if(preg_match('/^-/',$input[$index])){
            $signum = '';
        }else{
            $signum = '+';
        }
        $polynome = $signum.$input[$index].'*s^'.$power.$polynome;
        
        $power++;
        $index--;
    }
    
    return $polynome;
}

if (isset($_POST['action']) && isset($_POST['data']) && $_POST['action'] == 'simplify') {
    $data = stripslashes($_POST['data']);
    $object_diagram = json_decode($data, true);
    if ($object_diagram != null) {
        $blocks = $object_diagram['block_diagram']['blocks'];

        if (isDiagramCorrect($object_diagram) && isDiagramComplete($blocks)) {
            $solution = '[';
            $vars = '[';

            foreach ($blocks as $block_name => $block) {
                switch ($block['block_type']) {
                    case 'multiply':
                        $solution .= $block_name . '=((' . createPolynome($block['numerator']) . ')/(' . createPolynome($block['denominator']) . '))*' . getConnectedBlock($blocks, $block['pins']['pin2']['connected_to_block']) . ',';
                        $vars .= $block_name . ',';
                        break;
                    case 'sumator':
                        $solution .= $block_name . '=(' . $block['input_1_signum'] . getConnectedBlock($blocks, $block['pins']['pin2']['connected_to_block']) . $block['input_2_signum'] . getConnectedBlock($blocks, $block['pins']['pin3']['connected_to_block']) . '),';
                        $vars .= $block_name . ',';
                        break;
                    case 'io':
                        if ($block['type'] == 'input') {
                            $solution .= $block_name . '=u,';
                            $vars .= $block_name . ',';
                        } elseif ($block['type'] == 'output') {
                            $solution .= 'y=' . getConnectedBlock($blocks, $block['pins']['pin1']['connected_to_block']) . ',';
                            $vars .= 'y,';
                        }
                        break;
                    default:
                        break;
                }
            }

            $vars = substr($vars, 0, -1) . ']';
            $solution = substr($solution, 0, -1) . ']';
            $equations = $solution.','.$vars;
            
            $simplified = sendDataForSimplify($equations);
            $sol['status'] = "success";
            $sol['text'] = "OK";
            $sol['solution'] = $simplified;
            die(json_encode($sol));
            
        } else {
            die('{"status":"error","text":"'.ER_7.'"}');
        }
    } else {
        die('{"status":"error","text":"'.ER_8.'"}');
    }
} else {
    die('{"status":"error","text":"'.ER_9.'"}');
}
?>
