/*
 * Object manages the block in the schema
 */
function blockManager(){
    this.blocks_counter = 0;
    this.blocks = {};
    this.blockeditor = new blockEditor();
    this.active_block = '';
    this.canvas = $(settings['canvas_name']);
    this.diagrammover = {
        'mover': $(settings['diagrammover']),
        'left': 0,
        'top': 0
    }
    this.clipboard = {
        'block_name': '',
        'block': null,
        'block_object': {},
        'copies_count': 1
    }
    this.importrotation = {
        'bottom': '+90',
        'left': 'flip_horizontal',
        'top':'-90'
    }
    this.importmap_sumator = {
        'top':'right',
        'right':'bottom',
        'bottom':'left',
        'left':'top'
    }
    this.importrotation_sumator = {
        'right':'+90',
        'bottom':'+180',
        'left':'-90'
    }

    /*
     * Init script
     */
    this.canvas.droppable({
        drop: function(event,ui){
            blockmanager.blockDropped(ui.draggable.attr('id'),true);            
        },
        accept: '.block',
        tolerance: 'fit'
    });

    this.diagrammover['mover'].draggable({
            containment: 'parent',
            drag: function(event,ui){
                blockmanager.moveDiagram();
            },
            stop: function(event,ui){
                blockmanager.moveDiagram();
            }
        });

    /*
     * Generates new blockname
     */
    this.generateBlockname = function(){
        var new_blockname = 'block'+this.blocks_counter;
        this.blocks_counter++;
        return new_blockname;
    }

    /*
     * Creates a new block
     */
    this.createBlock = function(block_type){
        var new_blockname = this.generateBlockname();
        switch(block_type){
            case 'multiply':
                this.blocks[new_blockname] = new blockMultiply(new_blockname);
                break;
            case 'sumator':
                this.blocks[new_blockname] = new blockSumator(new_blockname);
                break;
            case 'io':
                this.blocks[new_blockname] = new blockIo(new_blockname);
                break;
            case 'line':
                this.blocks[new_blockname] = new blockLine(new_blockname);
                break;
            case 'junction':
                this.blocks[new_blockname] = new blockJunction(new_blockname);
                break;
            default:
                alert('Debug: blockmanager error!');
        }
        return this.blocks[new_blockname];
    }

    /*
     * Returns the block object specified by blockname or active block on null
     */
    this.getBlock = function(block_name){
        if(block_name == 'active'){
            return this.blocks[this.active_block];
        }
        else{
            return this.blocks[block_name];
        }
    }

    /*
     * Calls the blockeditor to edit the block
     */
    this.editBlock = function(){
        if(this.active_block != ''){
            subwindowmanager.openSubwindow('edit','block');
        }
    }

    /*
     * Sets the block content after editing
     */
    this.setBlockContent = function(){
        this.blockeditor.setBlockContent(this.blocks[this.active_block],null);
    }

    /*
     * Sets the active block
     */
    this.setActiveBlock = function(block_name){
        if(this.active_block != ''){
            this.unsetActiveBlock();
        }
        this.active_block = block_name;
        if(this.blocks[this.active_block].block_type == 'line'){
            this.blocks[this.active_block].block.children('.line_element').css('background-color',settings['selected_color']);
        }else if(this.blocks[this.active_block].block_type == 'junction'){
            this.blocks[this.active_block].block.children().css('background-color',settings['selected_color']);
        }else{
            this.blocks[this.active_block].block_middle.css('border-color',settings['selected_color']);
        }
    }

    /*
     * Unsets the active block
     */
    this.unsetActiveBlock = function(){
        if(this.active_block != '' && this.blocks[this.active_block] != undefined){
            if(this.blocks[this.active_block].block_type == 'line'){
                this.blocks[this.active_block].block.children('.line_element').css('background-color', 'black');
            }else if(this.blocks[this.active_block].block_type == 'junction'){
                this.blocks[this.active_block].block.children().css('background-color', 'black');
            }else{
                this.blocks[this.active_block].block_middle.css('border-color','black');
            }
            this.active_block = '';
        }
    }

    /*
     * Manages event for JQueryUI when block is dropped if not in canvas it adds the block to canvas and creates new
     */
    this.blockDropped = function(block_name, create_new){
        if(!this.blocks[block_name].in_canvas){
            this.showHideDiagrammover('hide');
            this.blocks[block_name].in_canvas = true;
            this.blocks[block_name].block.css('position','absolute');
            this.blockeditor.bindEvents(this.blocks[block_name]);
            this.blocks[block_name].block.appendTo(this.canvas);
            this.blocks[block_name].block_middle.css('background-color','transparent');
            if(create_new){
                this.createBlock(this.blocks[block_name].block_type);
            }
            this.setActiveBlock(block_name);
        }else{
            blockconnector.refreshConnections(block_name);
        }
    }

    /*
     * Mark a select block for copying
     */
    this.copyBlock = function(){
        if(this.active_block != '' && this.blocks[this.active_block].block_type != 'line' && this.blocks[this.active_block].block_type != 'junction'){
            menumanager.position['X'] = 0;
            menumanager.position['Y'] = 0;
            if(this.clipboard['block_name'] != ''){
                this.clipboard['block'].remove();
                this.clipboard['block_object'] = {};
                this.clipboard['copies_count'] = 1;
            }
            this.clipboard['block_name'] = this.active_block;
            this.clipboard['block'] = this.blocks[this.clipboard['block_name']].block.clone();
            $.extend(true,this.clipboard['block_object'], this.blocks[this.clipboard['block_name']]);
        }
        return false;
    }

    /*
     * Create a copy of block in the canvas
     */
    this.pasteBlock = function(){
        var position;
        if(this.clipboard['block'] != null){
            var X;
            var Y;
            if(menumanager.position['X'] == 0 && menumanager.position['Y'] == 0){
                if(this.blocks[this.clipboard['block_name']] != undefined){
                    position = this.blocks[this.clipboard['block_name']].block.offset();
                    X = position.left+this.clipboard['copies_count']*12;
                    Y = position.top+this.clipboard['copies_count']*12;
                    this.clipboard['copies_count']++;
                }else{
                    position = this.canvas.offset();
                    X = position.left;
                    Y = position.top;
                    this.clipboard['copies_count'] = 1;
                }
            }else{
                X = menumanager.position['X']-29;
                Y = menumanager.position['Y']-29;
                menumanager.position['X'] = 0;
                menumanager.position['Y'] = 0;
                this.clipboard['copies_count'] = 0;
            }

            position = this.canvas.offset();
            var pos = position.left;
            if(X < pos) X = pos;
            pos += (this.canvas.width()-58);
            if(X > pos) X = pos;
            pos = position.top;
            if(Y < pos) Y = pos;
            pos += (this.canvas.height()-58);
            if(Y > pos) Y = pos;
            var new_blockname = this.generateBlockname();
            this.blocks[new_blockname] = {};
            $.extend(true,this.blocks[new_blockname], this.clipboard['block_object']);
            this.blockeditor.setDuplicatedBlock(this.clipboard['block'],this.blocks[new_blockname],new_blockname,X,Y);
            this.blocks[new_blockname].block.appendTo(this.canvas);
            this.setActiveBlock(new_blockname);
        }
        return false;
    }

    /*
     * Deletes the active block if set
     */
    this.deleteBlock = function(){
        if(this.active_block != ''){
            var block_to_remove = this.active_block;
            this.active_block = '';
            blockconnector.cancelConnection();
            this.removeBlock(block_to_remove,true);
        }else{
            if(this.diagrammover['mover'].css('display') == 'block'){
                this.deleteAllBlocks();
            }
        }
    }
    
    /*
     * Deletes/removes the block from the list and from the canvas
     */
    this.removeBlock = function(block_name,control_junctions){
        if(this.blocks[block_name].block_type == 'line'){
            blockconnector.prepareLineDeletion(block_name,control_junctions);
        }else{
            this.blocks[block_name].in_canvas = false;
            $.each(this.blocks[block_name].pins,function(key,pin){
                if(pin['connected_to_block'] != ''){
                    blockmanager.removeBlock(pin['connected_to_block'],true);
                }
            });
        }
        this.blocks[block_name].block.remove();
        delete this.blocks[block_name];
    }

    /*
     * Rotates the block
     */
    this.rotateBlock = function(degrees){
        if(this.active_block != '' && this.blocks[this.active_block].block_type != 'line' && this.blocks[this.active_block].block_type != 'junction'){
            this.blockeditor.rotateBlock(this.blocks[this.active_block], degrees);
        }
    }

    /*
     * Deletes all the blocks from the canvas and blockmanager
     */
    this.emptyCanvas = function(){
        this.showHideDiagrammover('hide');
        menumanager.menuitemSelected('closeshowsolution', 'close');
        this.unsetActiveBlock();
        $.each(this.blocks,function(key,value){
            if(value.in_canvas){
                value.block.remove();
                delete blockmanager.blocks[key];
            }
        });
    }
    
    /*
     * Moves the block with 1px up,left,right,down
     */
    this.moveBlock = function(direction){
        if(this.active_block != '' && this.blocks[this.active_block].block_type != 'line'){
            var block = this.blocks[this.active_block].block;
            switch(direction){
                case 'top':
                    if(block.offset().top-1 > this.canvas.offset().top+1){
                        block.css('top',(block.offset().top-1)+'px');
                    }
                    break;
                case 'bottom':
                    if(block.offset().top+block.height()+1 < this.canvas.offset().top+this.canvas.height()+3){
                        block.css('top',(block.offset().top+1)+'px');
                    }
                    break;
                case 'left':
                    if(block.offset().left-1 > this.canvas.offset().left+1){
                        block.css('left',(block.offset().left-1)+'px');
                    }
                    break;
                case 'right':
                    if(block.offset().left+block.width()+1 < this.canvas.offset().left+this.canvas.width()+3){
                        block.css('left',(block.offset().left+1)+'px');
                    }
                    break;
                default:
            }
            blockconnector.refreshConnections(this.blocks[this.active_block].block_name);
            blockconnector.refreshEvents(this.blocks[this.active_block].block_name);
        }
    }

    /*
     * Prepares the blocks data in JSON format for sending to the server
     */
    this.prepareBlocksDataForExport = function(){
        if(!this.isCanvasEmpty()){
            var canvas_offset = this.canvas.offset();
            var JSON_blocks = '{\n "block_diagram":{\n  "name":"'+$(settings['canvas_background']).html()+'"';

            JSON_blocks += ',\n  "counter":'+this.blocks_counter;
            JSON_blocks += ',\n  "canvas":{\n   "width":'+this.canvas.width()+',\n   "height":'+this.canvas.height()+'\n  }';
            JSON_blocks += ',\n  "blocks":{';

            $.each(this.blocks,function(name, block){
                if(block.in_canvas){
                    JSON_blocks += '\n   "'+block.block_name+'":{\n    "block_type":"'+block.block_type+'",\n    ';

                    if(block.block_type == 'line'){
                        JSON_blocks += '"position_x":0,\n    "position_y":0,';
                    }else{
                        JSON_blocks += '"position_x":'+(block.block.offset().left-canvas_offset.left)+',\n    "position_y":'+(block.block.offset().top-canvas_offset.top)+',';
                    }

                    switch(block.block_type){
                        case 'multiply':
                            JSON_blocks += '\n    "numerator":"'+block.numerator+'",\n    "denominator":"'+block.denominator+'",';
                            break;
                        case 'sumator':
                            JSON_blocks += '\n    "input_1_signum":"'+block.input_1_signum+'",\n    "input_2_signum":"'+block.input_2_signum+'",';
                            break;
                        case 'io':
                            JSON_blocks += '\n    "type":"'+block.type+'",';
                            break;
                        case 'line':
                            var i;
                            JSON_blocks += '\n    "x_coordinates":[';
                            for(i=0; i<block.x_coordinates.length; i++){
                                JSON_blocks += (block.x_coordinates[i]-canvas_offset.left)+',';
                            }
                            JSON_blocks = JSON_blocks.slice(0, -1);
                            JSON_blocks += '],\n    "y_coordinates":[';
                            for(i=0; i<block.y_coordinates.length; i++){
                                JSON_blocks += (block.y_coordinates[i]-canvas_offset.top)+',';
                            }
                            JSON_blocks = JSON_blocks.slice(0, -1);
                            JSON_blocks += '],';
                            break;
                        case 'junction':
                            break;
                        default:
                            alert('Debug: blockmanager blocks JSON export error!');
                    }

                    JSON_blocks += '\n    "empty_pin_count":'+block.empty_pin_count+',\n    "pins":{';
                    $.each(block.pins,function(name, pin){
                        JSON_blocks += '\n     "'+name+'":{\n      "type":"'+pin['type']+'",\n      "location":"'+pin['location']+'",\n      "connected_to_block":"'+pin['connected_to_block']+'",\n      "connected_to_pin":"'+pin['connected_to_pin']+'"\n     },';
                    });
                    JSON_blocks = JSON_blocks.slice(0, -1);

                    JSON_blocks += '\n    }\n   },';
                }
            });

            JSON_blocks = JSON_blocks.slice(0, -1);
            JSON_blocks += '\n  }\n }\n}';

            return JSON_blocks;
        }else{
            subwindowmanager.openSubwindow('alert',{
                'message':texts['ER_12'],
                'title':texts['SW_13']
            });
            return null;
        }
    }

    /*
     * The function gets the imported data in JSON and draws the chema from them
     */
    this.drawDiagramFromImport = function(diagram){

        var diagram_object = diagram['block_diagram'];
        if(diagram_object != undefined){
            setPageDimensions(diagram_object['canvas']);
            $(settings['canvas_background']).html(diagram_object['name']);

            this.emptyCanvas();
            $.each(this.blocks,function(key,value){
                value.block.remove();
                delete blockmanager.blocks[key];
            });
            
            this.blocks_counter = diagram_object['counter'];
            this.createBlock('multiply');
            this.createBlock('sumator');
            this.createBlock('io');
            var i;

            var canvas_offset = this.canvas.offset();
            $.each(diagram_object['blocks'],function(name,imported_block){
                switch(imported_block['block_type']){
                    case 'multiply':
                        blockmanager.blocks[name] = new blockMultiply(name);
                        blockmanager.blocks[name].block.css({
                            'left': (imported_block['position_x']+canvas_offset.left),
                            'top': (imported_block['position_y']+canvas_offset.top)
                        });
                        blockmanager.blockDropped(name,false);
                        blockmanager.blockeditor.setBlockContent(blockmanager.getBlock(name), {
                            'numerator': imported_block['numerator'],
                            'denominator': imported_block['denominator']
                        });
                        if(imported_block['pins']['pin1']['location'] != 'right'){
                            blockmanager.blockeditor.rotateBlock(blockmanager.blocks[name], blockmanager.importrotation[imported_block['pins']['pin1']['location']]);
                        }
                        for(i=1;i<3;i++){
                            if(imported_block['pins']['pin'+i]['connected_to_block'] != ''){
                                blockmanager.blocks[name].pins['pin'+i]['connected_to_block'] = imported_block['pins']['pin'+i]['connected_to_block'];
                                blockmanager.blocks[name].pins['pin'+i]['connected_to_pin'] = imported_block['pins']['pin'+i]['connected_to_pin'];
                                blockmanager.blocks[name].pins['pin'+i]['pin'].unbind('mouseenter mouseleave click');
                            }
                        }
                        blockmanager.blocks[name].empty_pin_count = imported_block['empty_pin_count'];
                        
                        break;
                    case 'sumator':
                        blockmanager.blocks[name] = new blockSumator(name);
                        blockmanager.blocks[name].block.css({
                            'left': (imported_block['position_x']+canvas_offset.left),
                            'top': (imported_block['position_y']+canvas_offset.top)
                        });
                        blockmanager.blockDropped(name,false);
                        blockmanager.blockeditor.setBlockContent(blockmanager.getBlock(name), {
                            'signum_1': imported_block['input_1_signum'],
                            'signum_2': imported_block['input_2_signum']
                        });
                        if(imported_block['pins']['pin1']['location'] != blockmanager.importmap_sumator[imported_block['pins']['pin2']['location']]){
                            blockmanager.blockeditor.rotateBlock(blockmanager.blocks[name], 'flip_horizontal');
                        }
                        switch(imported_block['pins']['pin2']['location']){
                            case 'right':
                                blockmanager.blockeditor.rotateBlock(blockmanager.blocks[name], '+90');
                                break;
                            case 'bottom':
                                blockmanager.blockeditor.rotateBlock(blockmanager.blocks[name], '+90');
                                blockmanager.blockeditor.rotateBlock(blockmanager.blocks[name], '+90');
                                break;
                            case 'left':
                                blockmanager.blockeditor.rotateBlock(blockmanager.blocks[name], '-90');
                                break;
                            default:
                        }
                        for(i=1;i<4;i++){
                            if(imported_block['pins']['pin'+i]['connected_to_block'] != ''){
                                blockmanager.blocks[name].pins['pin'+i]['connected_to_block'] = imported_block['pins']['pin'+i]['connected_to_block'];
                                blockmanager.blocks[name].pins['pin'+i]['connected_to_pin'] = imported_block['pins']['pin'+i]['connected_to_pin'];
                                blockmanager.blocks[name].pins['pin'+i]['pin'].unbind('mouseenter mouseleave click');
                            }
                        }
                        blockmanager.blocks[name].empty_pin_count = imported_block['empty_pin_count'];
                        
                        break;
                    case 'io':
                        blockmanager.blocks[name] = new blockIo(name);
                        blockmanager.blocks[name].block.css({
                            'left': (imported_block['position_x']+canvas_offset.left),
                            'top': (imported_block['position_y']+canvas_offset.top)
                        });
                        blockmanager.blockDropped(name,false);
                        blockmanager.blockeditor.setBlockContent(blockmanager.getBlock(name), {
                            'type': imported_block['type']
                        });
                        if(imported_block['pins']['pin1']['location'] != 'right'){
                            blockmanager.blockeditor.rotateBlock(blockmanager.blocks[name], blockmanager.importrotation[imported_block['pins']['pin1']['location']]);
                        }
                        if(imported_block['pins']['pin1']['connected_to_block'] != ''){
                            blockmanager.blocks[name].pins['pin1']['connected_to_block'] = imported_block['pins']['pin1']['connected_to_block'];
                            blockmanager.blocks[name].pins['pin1']['connected_to_pin'] = imported_block['pins']['pin1']['connected_to_pin'];
                            blockmanager.blocks[name].pins['pin1']['pin'].unbind('mouseenter mouseleave click');
                        }
                        blockmanager.blocks[name].empty_pin_count = imported_block['empty_pin_count'];
                        break;
                    case 'junction':
                        blockmanager.blocks[name] = new blockJunction(name);
                        blockmanager.blocks[name].block.css({
                            'left': (imported_block['position_x']+canvas_offset.left),
                            'top': (imported_block['position_y']+canvas_offset.top)
                        });
                            
                        for(i=1;i<5;i++){
                            blockmanager.blocks[name].pins['pin'+i]['connected_to_block'] = imported_block['pins']['pin'+i]['connected_to_block'];
                            blockmanager.blocks[name].pins['pin'+i]['connected_to_pin'] = imported_block['pins']['pin'+i]['connected_to_pin'];
                            blockmanager.blocks[name].pins['pin'+i]['location'] = imported_block['pins']['pin'+i]['location'];
                            blockmanager.blocks[name].pins['pin'+i]['type'] = imported_block['pins']['pin'+i]['type'];
                        }
                        blockmanager.blocks[name].empty_pin_count = imported_block['empty_pin_count'];
                        blockconnector.bindEventsJunction(blockmanager.blocks[name]);
                        break;
                    case 'line':
                        blockmanager.blocks[name] = new blockLine(name);
                        blockmanager.blocks[name].pins['input']['connected_to_block'] = imported_block['pins']['input']['connected_to_block'];
                        blockmanager.blocks[name].pins['input']['connected_to_pin'] = imported_block['pins']['input']['connected_to_pin'];
                        blockmanager.blocks[name].pins['output']['connected_to_block'] = imported_block['pins']['output']['connected_to_block'];
                        blockmanager.blocks[name].pins['output']['connected_to_pin'] = imported_block['pins']['output']['connected_to_pin'];
                        for(i=0; i<imported_block['x_coordinates'].length; i++){
                            imported_block['x_coordinates'][i] += canvas_offset.left;
                        }
                        for(i=0; i<imported_block['y_coordinates'].length; i++){
                            imported_block['y_coordinates'][i] += canvas_offset.top;
                        }
                        blockconnector.drawLine(blockmanager.blocks[name].block, imported_block['x_coordinates'], imported_block['y_coordinates']);
                        blockmanager.blocks[name].x_coordinates = imported_block['x_coordinates'];
                        blockmanager.blocks[name].y_coordinates = imported_block['y_coordinates'];
                        if(imported_block['x_coordinates'].length == 4){
                            var new_x = Math.min(imported_block['x_coordinates'][1],imported_block['x_coordinates'][2])+Math.floor(Math.abs(imported_block['x_coordinates'][1]-imported_block['x_coordinates'][2])/2);
                            var new_y = Math.min(imported_block['y_coordinates'][1],imported_block['y_coordinates'][2])+Math.floor(Math.abs(imported_block['y_coordinates'][1]-imported_block['y_coordinates'][2])/2);
                            if(imported_block['x_coordinates'][1] == imported_block['x_coordinates'][2]){
                                blockconnector.placeLinePositioner(blockmanager.blocks[name], new_x, new_y, 'horizontal');
                            }else{
                                blockconnector.placeLinePositioner(blockmanager.blocks[name], new_x, new_y, 'vertical');
                            }
                        }
                        blockmanager.blocks[name].empty_pin_count = imported_block['empty_pin_count'];
                        blockconnector.bindEventsLine(blockmanager.blocks[name]);
                        break;
                    default:
                        alert('Debug: blockmanager import block type error!');
                }
            });
        }else{
            subwindowmanager.openSubwindow('alert',{
                'message':texts['ER_13'],
                'title':texts['SW_1']
            });
        }
        this.unsetActiveBlock();
        blockconnector.connection['started'] = false;
        setPageDimensions(null);
    }

    /*
     * resets the application, counters, arrays
     */
    this.resetApplication = function(){
        this.emptyCanvas();
        $.each(this.blocks,function(key,value){
            value.block.remove();
            delete blockmanager.blocks[key];
        });
        this.blocks_counter = 0;
        this.createBlock('multiply');
        this.createBlock('sumator');
        this.createBlock('io');
        blockconnector.connection['started'] = false;
        $(settings['canvas_background']).html(settings['default_diagramname']);
    }

    /*
     * Checks if the canvas is empty or is there blocks
     */
    this.isCanvasEmpty = function(){
        var state = true;
        $.each(this.blocks,function(key,value){
            if(value.in_canvas){
                state = false;
            }
        });
        return state;
    }

    /*
     * Empty the canvas afer confirmation if it is not empty
     */
    this.deleteAllBlocks = function(){
        if(!this.isCanvasEmpty()){
            subwindowmanager.openSubwindow('confirm',{
                'text': texts['ER_14'],
                'button': texts['CM_11'],
                'function': function(){
                    blockmanager.emptyCanvas();
                }
            });
        }
    }

    /*
     * Returns the most right and bottom positioned block right and bottom coordinate
     */
    this.getDiagramSurroundingRectangle = function(){
        var position = {
            'X1': 99999999,
            'Y1': 99999999,
            'X2': -99999999,
            'Y2': -99999999
        };
        var new_position = 0;
        if(!this.isCanvasEmpty()){
            $.each(this.blocks,function(key,block){
                if(block.in_canvas){
                    if(block.block_type == 'line'){
                        block.block.children().each(function(){
                            var element = $(this);
                            new_position = element.offset().left;
                            if(new_position < position['X1']) position['X1'] = new_position;
                            new_position = new_position+element.width();
                            if(new_position > position['X2']) position['X2'] = new_position;
                            new_position = element.offset().top;
                            if(new_position < position['Y1']) position['Y1'] = new_position;
                            new_position = new_position+element.height();
                            if(new_position > position['Y2']) position['Y2'] = new_position;
                        });
                        position['X2'] += 2;
                        position['Y2'] += 2;
                    }else{
                        new_position = block.block.offset().left;
                        if(new_position < position['X1']) position['X1'] = new_position;
                        new_position = new_position+block.block.width();
                        if(new_position > position['X2']) position['X2'] = new_position;
                        new_position = block.block.offset().top;
                        if(new_position < position['Y1']) position['Y1'] = new_position;
                        new_position = new_position+block.block.height();
                        if(new_position > position['Y2']) position['Y2'] = new_position;
                    }
                }
            });
        }
            
        return position;
    }

    /*
     * Shows hides the diagram mover rectangle
    */
    this.showHideDiagrammover = function(action){
        if(action == 'show'){
            if(!this.isCanvasEmpty()){
                this.unsetActiveBlock();
                var coordinates = this.getDiagramSurroundingRectangle();
                this.diagrammover['mover'].css({
                    'left': coordinates['X1']+'px',
                    'top': coordinates['Y1']+'px',
                    'width': (coordinates['X2']-coordinates['X1'])+'px',
                    'height': (coordinates['Y2']-coordinates['Y1'])+'px',
                    'display':'block'
                });
                this.diagrammover['left'] = coordinates['X1'];
                this.diagrammover['top'] = coordinates['Y1'];
            }
        }else{
            this.diagrammover['mover'].css('display','none');
        }
    }

    /*
     * Sets the diagram elements new positions on diagram move event
     */
    this.moveDiagram = function(){
        var actual_position = this.diagrammover['mover'].offset();
        var diff_x = actual_position.left-this.diagrammover['left'];
        var diff_y = actual_position.top-this.diagrammover['top'];
        var block_position;
        $.each(this.blocks,function(key,block){
            if(block.in_canvas){                
                if(block.block_type == 'line'){
                    block.block.children().each(function(){
                        block_position = $(this).offset();
                        $(this).css({'left': block_position.left+diff_x+'px','top': block_position.top+diff_y+'px'})
                    });
                    $.each(block.x_coordinates, function(index, value) {block.x_coordinates[index] = value+diff_x;});
                    $.each(block.y_coordinates, function(index, value) {block.y_coordinates[index] = value+diff_y;});
                }else{
                    block_position = block.block.offset();
                    block.block.css({'left': block_position.left+diff_x+'px','top': block_position.top+diff_y+'px'});
                }
            }
        });
        this.diagrammover['left'] = actual_position.left;
        this.diagrammover['top'] = actual_position.top;
    }
}