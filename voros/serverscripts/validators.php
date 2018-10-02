<?php
/*
 * Functions for block diagram validation
 */

/*
 * Function checks the given pins in associative array for their correct values
 */
function arePinsCorrect($pins,$block_type){
    $pins_OK = true;
    switch($block_type){
        case 'junction':
            if(!isset($pins['pin4'])) $pins_OK = false;
        case 'sumator':
            if(!isset($pins['pin3'])) $pins_OK = false;
        case 'multiply':
            if(!isset($pins['pin2'])) $pins_OK = false;
        case 'io':
            if(!isset($pins['pin1'])) $pins_OK = false;
            foreach ($pins as $pin_name => $pin){
                if(!(isset($pin['type']) &&
                     preg_match('/^(input|output)$/', $pin['type']) &&
                     isset($pin['location']) &&
                     preg_match('/^(top|bottom|left|right)$/', $pin['location']) &&
                     isset($pin['connected_to_block']) &&
                     isset($pin['connected_to_pin']) &&
                     ((preg_match('/^block\d+$/', $pin['connected_to_block']) && preg_match('/^(input|output)$/', $pin['connected_to_pin'])) ||
                      ($pin['connected_to_block'] == "" && $pin['connected_to_pin'] == "")
                     )
                )){
                    $pins_OK = false;
                }
            }
            break;
        case 'line':
            if(isset($pins['input']) && isset($pins['output'])){
                if(!(isset($pins['input']['connected_to_block']) &&
                     preg_match('/^block\d+$/', $pins['input']['connected_to_block']) &&
                     isset($pins['input']['connected_to_pin']) &&
                     preg_match('/^pin[1-4]$/', $pins['input']['connected_to_pin']) &&
                     isset($pins['output']['connected_to_block']) &&
                     preg_match('/^block\d+$/', $pins['output']['connected_to_block']) &&
                     isset($pins['output']['connected_to_pin']) &&
                     preg_match('/^pin[1-4]$/', $pins['output']['connected_to_pin'])
                )){
                    $pins_OK = false;
                }
            }else{
                $pins_OK = false;
            }
            break;
        default:
            $pins_OK = false;
            break;
    }
    return $pins_OK;
}

/*
 * Function check the given diagram in associative array correctness
 */
function isDiagramCorrect($diagram){
    $diagram_OK = true;
    if( isset($diagram['block_diagram']['counter']) &&
        is_int($diagram['block_diagram']['counter']) &&
        isset($diagram['block_diagram']['canvas']['width']) &&
        (is_int($diagram['block_diagram']['canvas']['width']) || is_float($diagram['block_diagram']['canvas']['width'])) &&
        isset($diagram['block_diagram']['canvas']['height']) &&
        (is_int($diagram['block_diagram']['canvas']['height']) || is_float($diagram['block_diagram']['canvas']['height'])) &&
        isset($diagram['block_diagram']['blocks'])
    ){

        $blocks = $diagram['block_diagram']['blocks'];
        foreach ($blocks as $block_name => $block) {
            if( isset($block['position_x']) &&
                (is_int($block['position_x']) || is_float($block['position_x'])) &&
                isset($block['position_y']) &&
                (is_int($block['position_y']) || is_float($block['position_y'])) &&
                isset($block['empty_pin_count']) &&
                (is_int($block['empty_pin_count']) || is_float($block['empty_pin_count'])) &&
                isset($block['block_type'])
            ){

                switch ($block['block_type']) {
                    case 'io':
                        if(!(isset($block['type']) && preg_match('/^(input|output)$/',$block['type']))){
                            $diagram_OK = false;
                        }
                        break;
                    case 'multiply':
                        if(isset($block['numerator']) && isset($block['denominator'])){
                            if(!(
                               (preg_match('/^(\w|\w\d+)$/',$block['numerator']) && preg_match('/^1$/',$block['denominator'])) ||
                               (preg_match('/^(\d+|(\d )+\d)$/',$block['numerator']) && preg_match('/^(\d )+\d$/',$block['denominator']))
                            )){
                                $diagram_OK = false;
                            }
                        }else{
                            $diagram_OK = false;
                        }
                        break;
                    case 'sumator':
                        if(!(isset($block['input_1_signum']) &&
                             preg_match('/^(\+|-)$/',$block['input_1_signum']) &&
                             isset($block['input_2_signum']) &&
                             preg_match('/^(\+|-)$/',$block['input_2_signum'])
                        )){
                            $diagram_OK = false;
                        }
                        break;
                    case 'line':
                        if(isset($block['x_coordinates']) && isset($block['y_coordinates'])){
                            if(count($block['x_coordinates']) == 3 && count($block['y_coordinates']) == 3){
                                if(!((is_int($block['x_coordinates'][0]) || is_float($block['x_coordinates'][0])) &&
                                     (is_int($block['x_coordinates'][1]) || is_float($block['x_coordinates'][1])) &&
                                     (is_int($block['x_coordinates'][2]) || is_float($block['x_coordinates'][2])) &&
                                     (is_int($block['y_coordinates'][0]) || is_float($block['y_coordinates'][0])) &&
                                     (is_int($block['y_coordinates'][1]) || is_float($block['y_coordinates'][1])) &&
                                     (is_int($block['y_coordinates'][2]) || is_float($block['y_coordinates'][2]))
                                )){
                                    $diagram_OK = false;
                                }
                            }else if(count($block['x_coordinates']) == 4 && count($block['y_coordinates']) == 4){
                                if(!((is_int($block['x_coordinates'][0]) || is_float($block['x_coordinates'][0])) &&
                                     (is_int($block['x_coordinates'][1]) || is_float($block['x_coordinates'][1])) &&
                                     (is_int($block['x_coordinates'][2]) || is_float($block['x_coordinates'][2])) &&
                                     (is_int($block['x_coordinates'][3]) || is_float($block['x_coordinates'][3])) &&
                                     (is_int($block['y_coordinates'][0]) || is_float($block['y_coordinates'][0])) &&
                                     (is_int($block['y_coordinates'][1]) || is_float($block['y_coordinates'][1])) &&
                                     (is_int($block['y_coordinates'][2]) || is_float($block['y_coordinates'][2])) &&  
                                     (is_int($block['y_coordinates'][3]) || is_float($block['y_coordinates'][3]))
                                )){
                                    $diagram_OK = false;
                                }
                            }else{
                                $diagram_OK = false;
                            }
                        }else{
                            $diagram_OK = false;
                        }
                        break;
                    case 'junction':
                        break;
                    default:
                        $diagram_OK = false;
                        break;
                }

                if(!(isset($block['pins']) && arePinsCorrect($block['pins'],$block['block_type']))){
                    $diagram_OK = false;
                }
            }else{
                $diagram_OK = false;
            }
        }
    }else{
        $diagram_OK = false;
    }

    return $diagram_OK;
}

/*
 * Checks if the given diagram is correct or not
 */
function isDiagramComplete($blocks) {
    $input_number = 0;
    $output_number = 0;
    $empty_pin_number = 0;
    foreach ($blocks as $block_name => $block) {
        switch ($block['block_type']) {
            case 'io':
                if ($block['type'] == 'output') {
                    $output_number++;
                } else if ($block['type'] == 'input') {
                    $input_number++;
                } else {
                    $output_number++;
                    $input_number++;
                }
            case 'multiply':
            case 'sumator':
            case 'line':
                if ($block['empty_pin_count'] != 0) {
                    $empty_pin_number++;
                }
                foreach ($block['pins'] as $pin_name => $pin) {
                    if ($pin['connected_to_block'] == '' || $pin['connected_to_pin'] == '') {
                        $empty_pin_number++;
                    }
                }
                break;
            case 'junction':
                $opin = 0;
                $ipin = 0;
                foreach ($block['pins'] as $pin_name => $pin) {
                    if ($pin['connected_to_block'] != '' && $pin['connected_to_pin'] != '') {
                        if ($pin['type'] == 'input') {
                            $ipin++;
                        }
                        if ($pin['type'] == 'output') {
                            $opin++;
                        }
                    }
                }
                if ($ipin != 1 || !($opin > 1 && $opin < 4)) {
                    $empty_pin_number++;
                }
                break;
            default:
                $empty_pin_number++;
                break;
        }
    }
    if ($input_number == 1 && $output_number == 1 && $empty_pin_number == 0) {
        return true;
    } else {
        return false;
    }
}
?>