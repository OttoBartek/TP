<?php

/*
 * function for creating JSON output with texts for the user interface
 */

function getTextsStrings($language) {

    include_once('../languages/' . $language . '.php');

    $texts = array(
        "MM_1" => MM_1,
        "MM_2" => MM_2,
        "MM_3" => MM_3,
        "MM_4" => MM_4,
        "MM_5" => MM_5,
        "MM_6" => MM_6,
        "MM_7" => MM_7,
        "MM_8" => MM_8,
        "MM_9" => MM_9,
        "MM_10" => MM_10,
        "MM_11" => MM_11,
        "MM_12" => MM_12,
        "MM_13" => MM_13,
        "MM_14" => MM_14,
        "MM_15" => MM_15,
        "MM_16" => MM_16,
        "CM_1" => CM_1,
        "CM_2" => CM_2,
        "CM_3" => CM_3,
        "CM_4" => CM_4,
        "CM_5" => CM_5,
        "CM_6" => CM_6,
        "CM_7" => CM_7,
        "CM_8" => CM_8,
        "CM_9" => CM_9,
        "CM_10" => CM_10,
        "CM_11" => CM_11,
        "CM_12" => CM_12,
        "CM_13" => CM_13,
        "CM_14" => CM_14,
        "SW_1" => SW_1,
        "SW_2" => SW_2,
        "SW_3" => SW_3,
        "SW_4" => SW_4,
        "SW_5" => SW_5,
        "SW_6" => SW_6,
        "SW_7" => SW_7,
        "SW_8" => SW_8,
        "SW_9" => SW_9,
        "SW_10" => SW_10,
        "SW_11" => SW_11,
        "SW_12" => SW_12,
        "SW_13" => SW_13,
        "SW_14" => SW_14,
        "SW_15" => SW_15,
        "SW_16" => SW_16,
        "SW_17" => SW_17,
        "SW_18" => SW_18,
        "SW_19" => SW_19,
        "SW_20" => SW_20,
        "SL_1" => SL_1,
        "SL_2" => SL_2,
        "SL_3" => SL_3,
        "SL_4" => SL_4,
        "HL_1" => HL_1,
        "HL_2" => HL_2,
        "HL_3" => HL_3,
        "HL_4" => HL_4,
        "HL_5" => HL_5,
        "HL_6" => HL_6,
        "HL_7" => HL_7,
        "HL_8" => HL_8,
        "HL_9" => HL_9,
        "HL_10" => HL_10,
        "HL_11" => HL_11,
        "HL_12" => HL_12,
        "HL_13" => HL_13,
        "HL_14" => HL_14,
        "OT_1" => OT_1,
        "ER_10" => ER_10,
        "ER_11" => ER_11,
        "ER_12" => ER_12,
        "ER_13" => ER_13,
        "ER_14" => ER_14,
        "ER_15" => ER_15,
        "ER_16" => ER_16,
        "ER_17" => ER_17
    );

    return json_encode($texts);
}

?>
