window.onload = function(){showHideWaiting('hide');}

/*
 * Variables for application
 */
var settings = {
    'clipboard': '#clipboard',
    'canvas_holder': '#canvas_holder',
    'canvas_name': '#canvas',
    'canvas_background': '#canvas_background',
    'canvas_editor': '#canvas_editor',
    'contextmenu_block': '#contextmenu_block',
    'contextmenu_canvas': '#contextmenu_canvas',
    'contextmenu_line': '#contextmenu_line',
    'contextmenu_junction': '#contextmenu_junction',
    'multiply_block_addpanel': '#add_multiply_block',
    'multiply_block_sample': '#multiply_block_sample',
    'multiply_block_editor': '#multiply_block_editor',
    'sumator_block_addpanel': '#add_sumator_block',
    'sumator_block_sample': '#sumator_block_sample',
    'sumator_block_editor': '#sumator_block_editor',
    'io_block_addpanel': '#add_io_block',
    'io_block_sample': '#io_block_sample',
    'io_block_editor': '#io_block_editor',
    'line_sample': '#line_sample',
    'junction_sample': '#junction_sample',
    'selected_color': 'red',
    'connection_started_color': 'lightblue',
    'alertbox': '#alert_box',
    'confirmbox': '#confirm_box',
    'editorbox': '#editor_box',
    'contextmenu_item': '.contextmenu_item',
    'mainmenu_item': '.mainmenu_item',
    'rightmenu_item': '.rightmenu_item',
    'mainmenu': '#mainmenu',
    'fileuploader_btn': 'fileuploader',
    'default_diagramname': 'new_diagram',
    'solutionholderprefix': '#sol',
    'solutionwindow': '#solution',
    'solutionwindowhandle': '#solutionwindowhandle',
    'overlay': '#overlay',
    'diagrammover': '#diagrammover'
}

var blockmanager;
var menumanager;
var blockconnector;
var subwindowmanager;
var communicator;

/*
 * Actions on document ready
 */
$(document).ready(function(){

    blockmanager = new blockManager();
    blockconnector = new blockConnector();
    subwindowmanager = new subwindowManager();
    communicator = new communicator();
    menumanager = new menuManager();
    
    blockmanager.createBlock('multiply');
    blockmanager.createBlock('sumator');
    blockmanager.createBlock('io');

    setPageDimensions(null);
});

/*
 * Sets the page lements size on pageload
 */
function setPageDimensions(dimensions){
    var mostsideelement = blockmanager.getDiagramSurroundingRectangle();
    var reserved_h_top = 112;
    var reserved_h_bottom = 2;
    var reserved_w_left = 2;
    var reserved_w_right = 2;
    var reserved_h = reserved_h_top+reserved_h_bottom;
    var reserved_w = reserved_w_left+reserved_w_right;
    var min_canvas_h = ((mostsideelement['Y2']-reserved_h_top) > 360) ? (mostsideelement['Y2']-reserved_h_top) : 360;
    var min_canvas_w = ((mostsideelement['X2']-reserved_w_left) > 600) ? (mostsideelement['X2']-reserved_w_left) : 600;
    var max_canvas_h = 1500;
    var max_canvas_w = 2500;
    var canvas_bordersize = 2;
    var height = 0;
    var width = 0;
    if(dimensions == null){
        height = $(window).height();
        width = $(window).width();
    }else{
        height = reserved_h+dimensions['height']*1;
        width = reserved_w+dimensions['width']*1;
    }

    if(height < (min_canvas_h+reserved_h)){
        height = min_canvas_h+reserved_h;
    }
    if(height > (max_canvas_h+reserved_h)){
        height = max_canvas_h+reserved_h;
    }
    if(width < (min_canvas_w+reserved_w)){
        width = min_canvas_w+reserved_w;
    }
    if(width > (max_canvas_w+reserved_w)){
        width = max_canvas_w+reserved_w;
    }

    $('#secondbody').width(width).height(height);
    $('#appholder').width(width).height(height);

    height -= reserved_h;
    width -= reserved_w;
    $('#mainmenuholder').width(width);
    $(settings['canvas_name']).width(width).height(height);
    $(settings['canvas_background']).width(width-canvas_bordersize).height(height-canvas_bordersize);
    $(settings['solutionwindow']).css({'top': (reserved_h_top+10+canvas_bordersize/2), 'left': (reserved_w_left+width-450-canvas_bordersize)});

    $.each(blockmanager.blocks,function(key,block){
        if(!block.in_canvas){
            block.block.css('left',block.block.parent().offset().left);
        }
    });
}

function setCanvasProperties(){
    var new_values = subwindowmanager.getNewValues('canvas');
    if(new_values['fit'] == false){
        if(new_values['width'].match(/^\d+$/) && new_values['height'].match(/^\d+$/)){
            setPageDimensions(new_values);
            $(settings['canvas_background']).html(new_values['name'].replace(/<\/?[^>]+>/gi, '').substr(0,25));
            subwindowmanager.hideEdit();
        }else{
            subwindowmanager.openSubwindow('alert',{
                'message':texts['ER_16'],
                'title':texts['SW_1']
                });
        }
    }else{
        setPageDimensions(null);
        subwindowmanager.hideEdit();
    }
}

/*
 * Shows and hide the invisible overlay
 */
function showHideWaiting(action){
    if(action == 'show'){
        $(settings['overlay']).css('display','block');
    }else{
        $(settings['overlay']).css('display','none');
    }
}

/*
 * Displays the help
 */
function showHelp(){
    var help_text = texts['HL_1']+'<br /><br />'+texts['HL_2']+'<br /><br />'+texts['HL_14']+'<br />'+texts['HL_3']+'<br />'+texts['HL_4']+'<br />'+texts['HL_5']+'<br />';
    help_text += texts['HL_6']+'<br />'+texts['HL_7']+'<br />'+texts['HL_8']+'<br />'+texts['HL_9']+'<br />'+texts['HL_10']+'<br />';
    help_text += texts['HL_11']+'<br /><br />'+texts['HL_12']+'<br /><br />'+texts['HL_13'];
    subwindowmanager.openSubwindow('alert',{'message':help_text,'title':texts['SW_15']});
}

/*
 * Clears every state of the application and prepares options for the new diagram
 */
function newDiagram(){
    menumanager.menuitemSelected('closeshowsolution', 'close');
    if(!blockmanager.isCanvasEmpty()){
        subwindowmanager.openSubwindow('confirm',{
            'text': texts['ER_17'],
            'button': texts['CM_10'],
            'function': function(){
                blockmanager.resetApplication();
                setPageDimensions(null);
                subwindowmanager.openSubwindow('edit','canvas');
            }
        });
    }else{
        blockmanager.resetApplication();
        setPageDimensions(null);
        subwindowmanager.openSubwindow('edit','canvas');
    }
}

/*
 * Changes the language indicator of the UI and calls the language loading function
 */
function changeLanguage(new_language){
    $('#powered').find('.active_language').removeClass('active_language');
    $(new_language).addClass('active_language');
    communicator.loadLanguage($(new_language).html().toLowerCase());
}

/*
 * Changes the UI texts after the new language is loaded
 */
function setNewLanguage(){
    $.each(texts, function(key, value) {
        var element = $('#'+key);
        if(element.length != 0){
            if(element.is('img')){
                element.attr('alt',value).attr('title',value);
            }else{
                element.html(value);
            }
        }
    });
}