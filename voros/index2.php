<?php
/*
 * this is the file which is loaded into iframe to another page
 */

session_start();

if (isset($_GET['language'])) {
    if (file_exists('./languages/' . $_GET['language'] . '.php')) {
        $_SESSION['language'] = $_GET['language'];
    } else {
        $_SESSION['language'] = 'sk';
    }
} else {
    $_SESSION['language'] = 'sk';
}

include('./languages/'.$_SESSION['language'].'.php');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Web Block Diagram Simplifier</title>
        <meta name="description" content="Online zjednodušovanie blokových diagramov lineárnych dynamických systémov s jedným vstupom a jedným výstupom. Online block diagram simplification." />
        <meta name="keywords" content="online, zjednodušenie, blokový, diagram, Maxima, diplomovka, Ľudovít, Vörös, blokových, diagramov, SISO, block, simplify" />
        <link rel="stylesheet" href="styles/jquery-ui-1.8.11.custom.css" />
        <script type="text/javascript" src="scripts/jquery-1.6.1.min.js"></script>
        <script type="text/javascript" src="scripts/jquery-ui-1.8.12.custom.min.js"></script>
        <script type="text/javascript" src="scripts/jquery.hotkeys.js"></script>
        <script type="text/javascript" src="scripts/ajaxupload.js"></script>
        <script type="text/javascript" src="serverscripts/texts.js.php"></script>
        <script type="text/javascript" src="scripts/blocks.js"></script>
        <script type="text/javascript" src="scripts/menumanager.js"></script>
        <script type="text/javascript" src="scripts/subwindowmanager.js"></script>
        <script type="text/javascript" src="scripts/blockconnector.js"></script>
        <script type="text/javascript" src="scripts/blockeditor.js"></script>
        <script type="text/javascript" src="scripts/blockmanager.js"></script>
        <script type="text/javascript" src="scripts/communicator.js"></script>
        <script type="text/javascript" src="scripts/script2.js"></script>
        <script type="text/javascript" src="scripts/refreshmathjax.js"></script>

        <script type="text/x-mathjax-config">
              MathJax.Hub.Config({
            extensions: ["TeX/cancel.js"], 
            tex2jax: {
              inlineMath: [ ['$','$'] ],   
              displayMath: [ ['$$','$$'] ],
              processEscapes: true        
            },
            CommonHTML: {
                scale: 160
            }
        });
        </script>
        <!--<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML-full"> </script>-->
            <script type="text/javascript" src="MathJax-2.6-latest/MathJax.js?config=TeX-AMS_CHTML-full"> </script>
        <link rel="stylesheet" href="styles/style2.css" />
        <link rel="shortcut icon" href="images/favicon.ico" />
    </head>
    <body>

        <div id="overlay"></div>

        <div id="secondbody">
            <!--The visible part of the page-->
            <div id="appholder">

                <!--Header of the page-->
                <div id="header">
                    <div id="powered">
                        <?php
                        $langs = scandir('./languages', 1);
                        foreach ($langs as $lang) {
                            if (preg_match('/^\w\w\.php$/', $lang)) {
                                $langcode = substr($lang, 0, 2);
                                echo '<span' . (($_SESSION['language'] == $langcode) ? ' class="active_language"' : '') . ' onclick="changeLanguage(this);">' . strtoupper($langcode) . '</span> ';
                            }
                        }
                        ?>
                    </div>
                    <!--Panel for adding new blocks-->
                    <div id="addpanel">
                        <div id="add_multiply_block"></div>
                        <div id="add_sumator_block"></div>
                        <div id="add_io_block"></div>
                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                </div>

                <!--Middle of the page-->
                <div id="middle">
                    <!--Main menu-->
                    <div id="mainmenuholder">
                        <div class="mainmenu">
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('editblock', null);">
                                <img id="MM_1" class="mainmenu_image" src="images/edit.png" alt="<?php echo MM_1; ?>" title="<?php echo MM_1; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('copyblock', null);">
                                <img id="MM_2" class="mainmenu_image" src="images/copy.png" alt="<?php echo MM_2; ?>" title="<?php echo MM_2; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('pasteblock', null);">
                                <img id="MM_3" class="mainmenu_image" src="images/paste.png" alt="<?php echo MM_3; ?>" title="<?php echo MM_3; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('deleteblock', null);">
                                <img id="MM_4" class="mainmenu_image" src="images/delete.png" alt="<?php echo MM_4; ?>" title="<?php echo MM_4; ?>" />
                            </div>
                            <div class="mainmenu_separator"></div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('rotateblock', '+90');">
                                <img id="MM_5" class="mainmenu_image" src="images/cw.png" alt="<?php echo MM_5; ?>" title="<?php echo MM_5; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('rotateblock', '-90');">
                                <img id="MM_6" class="mainmenu_image" src="images/ccw.png" alt="<?php echo MM_6; ?>" title="<?php echo MM_6; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('rotateblock', 'flip_horizontal');">
                                <img id="MM_7" class="mainmenu_image" src="images/flip_horizontal.png" alt="<?php echo MM_7; ?>" title="<?php echo MM_7; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('rotateblock', 'flip_vertical');">
                                <img id="MM_8" class="mainmenu_image" src="images/flip_vertical.png" alt="<?php echo MM_8; ?>" title="<?php echo MM_8; ?>" />
                            </div>
                            <div class="mainmenu_separator"></div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('selectall', null);">
                                <img id="MM_16" class="mainmenu_image" src="images/selectall.png" alt="<?php echo MM_16; ?>" title="<?php echo MM_16; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('deleteallblocks', null);">
                                <img id="MM_10" class="mainmenu_image" src="images/delete_all.png" alt="<?php echo MM_10; ?>" title="<?php echo MM_10; ?>" />
                            </div>
                            <div class="mainmenu_separator"></div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('newdiagram', null);">
                                <img id="MM_9" class="mainmenu_image" src="images/new.png" alt="<?php echo MM_9; ?>" title="<?php echo MM_9; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('editcanvas', null);">
                                <img id="MM_11" class="mainmenu_image" src="images/canvas.png" alt="<?php echo MM_11; ?>" title="<?php echo MM_11; ?>" />
                            </div>
                            <div class="mainmenu_separator"></div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('export', null);">
                                <img id="MM_12" class="mainmenu_image" src="images/export.png" alt="<?php echo MM_12; ?>" title="<?php echo MM_12; ?>" />
                            </div>
                            <div class="mainmenu_item" id="fileuploader">
                                <img id="MM_13" class="mainmenu_image" src="images/import.png" alt="<?php echo MM_13; ?>" title="<?php echo MM_13; ?>" />
                            </div>
                            <div class="mainmenu_separator"></div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('solve', null);">
                                <img id="MM_14" class="mainmenu_image" src="images/execute.png" alt="<?php echo MM_14; ?>" title="<?php echo MM_14; ?>" />
                            </div>
                            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('help', null);">
                                <img id="MM_15" class="mainmenu_image" src="images/help.png" alt="<?php echo MM_15; ?>" title="<?php echo MM_15; ?>" />
                            </div>
                            <div class="clear"></div>                        
                        </div>
                    </div>

                    <!--The canvas-->
                    <div id="canvas">
                        <div id="canvas_background"></div>
                        <div id="diagrammover"></div>
                    </div>

                </div>

            </div>
        </div>

        <!--Sub-windows of the page-->
        <div id="subwindows">

            <!--Alert messages box-->
            <div id="alert_box" title="">
                <p>
                    <span class="ui-icon ui-icon-alert alertstyle"></span>
                    <span class="alert_message"></span>
                </p>
            </div>

            <!--Confirm messages box-->
            <div id="confirm_box" title="">
                <p>
                    <span class="ui-icon ui-icon-alert alertstyle"></span>
                    <span class="confirm_message"></span>
                </p>
            </div>

            <!--Block editor box-->
            <div id="editor_box" title="">

                <!--Multiply block editor-->
                <div id="multiply_block_editor" class="block_editor">
                    <span id="SW_3"><?php echo SW_3; ?></span>:<br />
                    <input type="text" name="new_numerator" class="normalinput" value="" /><br />
                    <span id="SW_4"><?php echo SW_4; ?></span>:<br />
                    <input type="text" name="new_denominator" class="normalinput" value="" />
                </div>

                <!--Sumator block editor-->
                <div id="sumator_block_editor" class="block_editor">
                    <span id="SW_5"><?php echo SW_5; ?></span>:
                    <span class="signum">+</span><input type="radio" name="new_signum_1" value="+" />
                    <span class="signum">-</span><input type="radio" name="new_signum_1" value="-" /><br />
                    <span id="SW_6"><?php echo SW_6; ?></span>:
                    <span class="signum">+</span><input type="radio" name="new_signum_2" value="+" />
                    <span class="signum">-</span><input type="radio" name="new_signum_2" value="-" />
                </div>

                <!--IO block editor-->
                <div id="io_block_editor" class="block_editor">
                    <span id="SW_7"><?php echo SW_7; ?></span>:
                    <span id="SW_8" class="type"><?php echo SW_8; ?></span><input type="radio" name="new_type" value="input" />
                    <span id="SW_9" class="type"><?php echo SW_9; ?></span><input type="radio" name="new_type" value="output" />
                </div>

                <!--Canvas editor-->
                <div id="canvas_editor" class="block_editor">
                    <span id="SW_10"><?php echo SW_10; ?></span>:<br />
                    <input type="text" name="new_canvas_name" class="normalinput" value="" /><br /><br />
                    <div class="nametext"><span id="SW_11"><?php echo SW_11; ?></span>: <span class="dimensions">&lt;600;2500&gt;</span></div>
                    <input type="text" name="new_canvas_width"  class="tinyinput" value="" /> px<br />
                    <div class="nametext"><span id="SW_12"><?php echo SW_12; ?></span>: <span class="dimensions">&lt;360;1500&gt;</span></div>
                    <input type="text" name="new_canvas_height" class="tinyinput" value="" /> px<br /><br />
                    <div class="nametext"><span id="SW_20"><?php echo SW_20; ?></span>:</div>
                    <input id="fit_canvas" type="checkbox" name="fit_canvas" value="yes" />
                </div>

            </div>

        </div>

        <!--Solution holder-->
        <div id="solution">
            <div class="mainmenu_item" onclick="menumanager.menuitemSelected('closeshowsolution', 'close');">
                <img id="SL_1" class="mainmenu_image" src="images/close.png" alt="<?php echo SL_1; ?>" title="<?php echo SL_1; ?>" />
            </div>
            <div class="clear"></div>
            <ul id="solutionwindowhandle">
                <li><a id="SL_2" href="#tabs-1"><?php echo SL_2; ?></a></li>
                <li><a id="SL_3" href="#tabs-2"><?php echo SL_3; ?></a></li>
                <li><a id="SL_4" href="#tabs-3"><?php echo SL_4; ?></a></li>
            </ul>
            <div id="tabs-1">
                <div id="sol-1" class="solutionholder"></div>
            </div>
            <div id="tabs-2">
                <div id="sol-2" class="solutionholder"></div>
            </div>
            <div id="tabs-3">
                <div id="sol-3" class="solutionholder"></div>
            </div>
        </div>

        <!--Context-menus for the page-->
        <div id="contextmenus">

            <!--Context menu for blocks-->
            <div id="contextmenu_block" class="contextmenu">
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('editblock', null);">
                    <span id="CM_1"><?php echo CM_1; ?></span> <img class="contextmenu_image" src="images/edit.png" alt="" />
                </div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('copyblock', null);">
                    <span id="CM_2"><?php echo CM_2; ?></span> <img class="contextmenu_image" src="images/copy.png" alt="" />
                </div>
                <div class="contextmenu_separator"></div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('rotateblock', '+90');">
                    <span id="CM_3"><?php echo CM_3; ?></span> <img class="contextmenu_image" src="images/cw.png" alt="" />
                </div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('rotateblock', '-90');">
                    <span id="CM_4"><?php echo CM_4; ?></span> <img class="contextmenu_image" src="images/ccw.png" alt="" />
                </div>
                <div class="contextmenu_separator"></div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('rotateblock', 'flip_horizontal');">
                    <span id="CM_5"><?php echo CM_5; ?></span> <img class="contextmenu_image" src="images/flip_horizontal.png" alt="" />
                </div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('rotateblock', 'flip_vertical');">
                    <span id="CM_6"><?php echo CM_6; ?></span> <img class="contextmenu_image" src="images/flip_vertical.png" alt="" />
                </div>
                <div class="contextmenu_separator"></div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('deleteblock', null);">
                    <span id="CM_7"><?php echo CM_7; ?></span> <img class="contextmenu_image" src="images/delete.png" alt="" />
                </div>
            </div>

            <!--Context menu for canvas-->
            <div id="contextmenu_canvas" class="contextmenu">
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('pasteblock', null);">
                    <span id="CM_8"><?php echo CM_8; ?></span> <img class="contextmenu_image" src="images/paste.png" alt="" />
                </div>
                <div class="contextmenu_separator"></div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('selectall', null);">
                    <span id="CM_14"><?php echo CM_14; ?></span> <img class="contextmenu_image" src="images/selectall.png" alt="" />
                </div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('deleteallblocks', null);">
                    <span id="CM_11"><?php echo CM_11; ?></span> <img class="contextmenu_image" src="images/delete_all.png" alt="" />
                </div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('newdiagram', null);">
                    <span id="CM_10"><?php echo CM_10; ?></span> <img class="contextmenu_image" src="images/new.png" alt="" />
                </div>
                <div class="contextmenu_separator"></div>
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('editcanvas', null);">
                    <span id="CM_9"><?php echo CM_9; ?></span> <img class="contextmenu_image" src="images/canvas.png" alt="" />
                </div>
            </div>

            <!--Context menu for line-->
            <div id="contextmenu_line" class="contextmenu">
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('deleteblock', null);">
                    <span id="CM_12"><?php echo CM_12; ?></span> <img class="contextmenu_image" src="images/delete.png" alt="" />
                </div>
            </div>

            <!--Context menu for junction-->
            <div id="contextmenu_junction" class="contextmenu">
                <div class="contextmenu_item" onclick="menumanager.menuitemSelected('deleteblock', null);">
                    <span id="CM_13"><?php echo CM_13; ?></span> <img class="contextmenu_image" src="images/delete.png" alt="" />
                </div>
            </div>

        </div>

        <!--Samples for the blocks of the application-->
        <div id="blocksamples">

            <!--Multiply block sample-->
            <div id="multiply_block_sample" class="block">
                <div class="left_pinholder">
                        <div class="input_pin"></div>
                </div>
                <div class="center_holder">
                    <div class="top_pinholder"></div>
                    <div class="content_holder">
                        <div class="numerator">F</div>
                        <div class="separator"></div>
                        <div class="denominator">1</div>
                    </div>
                    <div class="bottom_pinholder"></div>
                </div>
                <div class="right_pinholder">
                        <div class="output_pin"></div>
                </div>
                <div class="clear"></div>
                <div class="min_width"></div>
            </div>

            <!--Sumator block sample-->
            <div id="sumator_block_sample" class="block">
                <div class="left_pinholder"></div>
                <div class="center_holder">
                    <div class="top_pinholder">
                        <div class="input_pin"></div>
                    </div>
                    <div class="content_holder">
                        <div class="signum_holder">
                            <div class="left_signum"></div>
                            <div class="center_signum_holder">
                                <div class="top_signum">+</div>
                                <div class="bottom_signum">+</div>
                            </div>
                            <div class="right_signum"></div>
                            <div class="clear"></div>
                        </div>
                        </div>
                    <div class="bottom_pinholder">
                        <div class="input_pin"></div>
                    </div>
                </div>
                <div class="right_pinholder">
                        <div class="output_pin"></div>
                </div>
                <div class="clear"></div>
                <div class="min_width"></div>
            </div>

            <!--IO block sample-->
            <div id="io_block_sample" class="block">
                <div class="left_pinholder"></div>
                <div class="center_holder">
                    <div class="top_pinholder"></div>
                    <div class="content_holder">
                        <div class="name_holder">
                            U
                        </div>
                    </div>
                    <div class="bottom_pinholder"></div>
                </div>
                <div class="right_pinholder">
                        <div class="output_pin"></div>
                </div>
                <div class="clear"></div>
                <div class="min_width"></div>
            </div>

            <!--Junction sample-->
            <div id="junction_sample" class="junction">
                <div class="junction_h_element"></div>
                <div class="junction_v_element"></div>
            </div>

            <!--Line sample-->
            <div id="line_sample" class="line">
            </div>

        </div>

    </body>
</html>
