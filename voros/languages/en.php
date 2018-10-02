<?php
/* 
 * Slovak language file
 */

/*Menus*/
define("MM_1", "Edit block");
define("MM_2", "Copy block");
define("MM_3", "Paste block");
define("MM_4", "Delete element");
define("MM_5", "Rotate 90° CW");
define("MM_6", "Rotate 90° CCW");
define("MM_7", "Flip horizontal");
define("MM_8", "Flip vertical");
define("MM_9", "New diagram");
define("MM_10", "Delete all");
define("MM_11", "Canvas settings");
define("MM_12", "Save diagram");
define("MM_13", "Load diagram");
define("MM_14", "Compute simplification");
define("MM_15", "Help");
define("MM_16", "Select all");

/*Contextmenus*/
define("CM_1", MM_1);
define("CM_2", MM_2);
define("CM_3", MM_5);
define("CM_4", MM_6);
define("CM_5", MM_7);
define("CM_6", MM_8);
define("CM_7", "Delete block");
define("CM_8", MM_3);
define("CM_9", MM_11);
define("CM_10", MM_9);
define("CM_11", MM_10);
define("CM_12", "Delete connection");
define("CM_13", "Delete junction");
define("CM_14", MM_16);

/*subwindows*/
define("SW_1", "Error!");
define("SW_2", "Confirm!");
define("SW_3", "Numerator");
define("SW_4", "Denominator");
define("SW_5", "1. input");
define("SW_6", "2. input");
define("SW_7", "Type");
define("SW_8", "Input");
define("SW_9", "Output");
define("SW_10", "Diagram name");
define("SW_11", "Width");
define("SW_12", "Height");
define("SW_13", "Alert!");
define("SW_14", "Replace diagram");
define("SW_15", MM_15);
define("SW_16", "Storno");
define("SW_17", "Set");
define("SW_18", "Block settings");
define("SW_19", MM_11);
define("SW_20", "Fit to screen");

/*solution*/
define("SL_1", "Close solution");
define("SL_2", "Solution");
define("SL_3", "LaTeX format");
define("SL_4", "Text format");

/*other*/
define("OT_1", "Author");

/*help*/
define("HL_1", "This tool is an online block diagram simplifycation software of a single input single output (SISO) linear dynamical systems.");
define("HL_2", "Keyboard shortcuts and hotkeys:");
define("HL_14", "a - select whole diagram for move");
define("HL_3", "r - rotation of the block +90° CW");
define("HL_4", "f - flip block horizontally");
define("HL_5", "arrow up - move block up");
define("HL_6", "arrow down - move block down");
define("HL_7", "arrow right - move block right");
define("HL_8", "arrow left - move block left");
define("HL_9", "Delete - delete block");
define("HL_10", "Ctrl+c - copy block");
define("HL_11", "Ctrl+v - paste block");
define("HL_12", "All actions are reachable from the main menu (left side and right side) or from contextmenu. Blocks are placed with the mouse. Connection of the block is realised by clicking on the pins of selected blocks.");
define("HL_13", "More about application is in the documentation.");

/*error messages*/
define("ER_1", "Error occured during file upload!");
define("ER_2", "The diagram in the file must be in proper format!");
define("ER_3", "The diagram must be provided in JSON format!");
define("ER_4", "The file must be a puretext file!");
define("ER_5", "Maximum allowed filesize is 512 kB!");
define("ER_6", "Unknown error occured during file upload!");
define("ER_7", "The block diagram contains errors!");
define("ER_8", "Wrong data format sent to the server!");
define("ER_9", "Wrong parameters sent to server!");
define("ER_10", "Wrong format of numerator!");
define("ER_11", "Wrong format of denominator!");
define("ER_12", "The canvas is empty!");
define("ER_13", "The loaded input data are not correct!");
define("ER_14", "Are you sure that you want to delete all blocks?");
define("ER_15", "Are you sure that you want replace existing work with the loaded one?");
define("ER_16", "Canvas width and height must be a number from the given interval!");
define("ER_17", "By creating new diagram you will lose your unsaved work. Continue?");

?>
