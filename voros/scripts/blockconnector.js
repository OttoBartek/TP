/*
 * Object manages the blocks connections
 */
function blockConnector(){
    this.connection = {
        'started': false,
        'block_name':'',
        'pin_name':'',
        'line_clicked_position':{'X':0,'Y':0},
        'line_clicked_element': null
    };
    this.reverse_location = {
        'top':'bottom',
        'bottom':'top',
        'left':'right',
        'right':'left'
    };
    this.reverse_pin_type = {
        'input':'output',
        'output':'input'
    };
    this.pin_size = 10;
    this.positioner_size = 8;
    this.line_width = 2;

    /*
     * Connects 2 marked blocks via pins
     */
    this.connectBlocks = function(block_name,pin_name){
        if(this.connection['started']){
            if(this.connection['block_name'] != block_name){
                if(blockmanager.getBlock(this.connection['block_name']).block_type == 'line' || blockmanager.getBlock(block_name).block_type == 'line'){
                    if(blockmanager.getBlock(block_name).block_type != 'line'){
                        var line_blockname = this.connection['block_name'];
                        this.connection['block_name'] = block_name;
                        this.connection['pin_name'] = pin_name;
                        this.placeJunction(line_blockname,this.connection['block_name'],this.connection['pin_name']);
                        blockmanager.getBlock(block_name).pins[pin_name]['pin'].css('background-color','transparent');
                    }else if(blockmanager.getBlock(this.connection['block_name']).block_type != 'line'){
                        this.placeJunction(block_name,this.connection['block_name'],this.connection['pin_name']);
                    }
                }else{
                    if(blockmanager.getBlock(this.connection['block_name']).pins[this.connection['pin_name']]['type'] != blockmanager.getBlock(block_name).pins[pin_name]['type']){
                        var line = blockmanager.createBlock('line');
                        var block1 = blockmanager.getBlock(this.connection['block_name']);
                        var block2 = blockmanager.getBlock(block_name);
                        var pin1_name = this.connection['pin_name'];
                        var pin2_name = pin_name;

                        block1.pins[pin1_name]['connected_to_block'] = line.block_name;
                        block1.pins[pin1_name]['connected_to_pin'] = this.reverse_pin_type[block1.pins[pin1_name]['type']];
                        block1.empty_pin_count--;
                        block2.pins[pin2_name]['connected_to_block'] = line.block_name;
                        block2.pins[pin2_name]['connected_to_pin'] = this.reverse_pin_type[block2.pins[pin2_name]['type']];
                        block2.empty_pin_count--;
                        line.pins[block1.pins[pin1_name]['connected_to_pin']]['connected_to_block'] = block1.block_name;
                        line.pins[block1.pins[pin1_name]['connected_to_pin']]['connected_to_pin'] = pin1_name;
                        line.pins[block2.pins[pin2_name]['connected_to_pin']]['connected_to_block'] = block2.block_name;
                        line.pins[block2.pins[pin2_name]['connected_to_pin']]['connected_to_pin'] = pin2_name;
                
                        if(block1.block_type != 'junction' || (block1.block_type == 'junction' && block1.empty_pin_count == 0)){
                            block1.pins[pin1_name]['pin'].unbind('mouseenter mouseleave click');
                        }
                        if(block2.block_type != 'junction' || (block2.block_type == 'junction' && block2.empty_pin_count == 0)){
                            block2.pins[pin2_name]['pin'].unbind('mouseenter mouseleave click');
                            block2.pins[pin2_name]['pin'].css('background-color','transparent');
                        }
                        this.createConnection(line,block1.pins[pin1_name],block2.pins[pin2_name]);
                        blockmanager.setActiveBlock(line.block_name);
                    }
                }
            }
            this.cancelConnection();            
        }else{            
            this.connection['block_name'] = block_name;
            this.connection['pin_name'] = pin_name;
            this.connection['started'] = true;
            if(blockmanager.getBlock(block_name).block_type != 'junction' && blockmanager.getBlock(block_name).block_type != 'line'){
                blockmanager.getBlock(block_name).pins[pin_name]['pin'].addClass('selected');
            }
        }       
    }

    /*
     * Sets the last clicked position on the line for connection algorythm
     */
    this.storeLineClickPosition = function(e,element){
        this.connection['line_clicked_position']['X'] = e.pageX;
        this.connection['line_clicked_position']['Y'] = e.pageY;
        this.connection['line_clicked_element'] = $(element);
    }

    /*
     * Redraws all the connecting lines if the block is rotated or flipped
     */
    this.redrawConnections = function(block_name){
        $.each(blockmanager.getBlock(block_name).pins, function(key, value){
            if(value['connected_to_block'] != ''){
                var line = blockmanager.getBlock(value['connected_to_block']);
                line.block.empty();
                blockconnector.createConnection(line,value,blockmanager.getBlock(line.pins[value['type']]['connected_to_block']).pins[line.pins[value['type']]['connected_to_pin']]);
            }
        });
    }

    /*
     * Creates the conection line between the pins
     */
    this.createConnection = function(line,pin1,pin2){
        var position1 = this.computeLinePoint(pin1);
        var position2 = this.computeLinePoint(pin2);

        line.x_coordinates = [];
        line.y_coordinates = [];
        line.x_coordinates[0] = position1['x'];
        line.y_coordinates[0] = position1['y'];

        var new_x = Math.min(position1['x'],position2['x'])+Math.floor(Math.abs(position1['x']-position2['x'])/2);
        var new_y = Math.min(position1['y'],position2['y'])+Math.floor(Math.abs(position1['y']-position2['y'])/2);

        if(pin1['location'] == 'top' || pin1['location'] == 'bottom'){
            if(pin2['location'] == 'top' || pin2['location'] == 'bottom'){
                line.x_coordinates[line.x_coordinates.length] = position1['x'];
                line.y_coordinates[line.y_coordinates.length] = new_y;
                line.x_coordinates[line.x_coordinates.length] = position2['x'];
                line.y_coordinates[line.y_coordinates.length] = new_y;
                this.placeLinePositioner(line, new_x, new_y, 'vertical');
            }else{
                line.x_coordinates[line.x_coordinates.length] = position1['x'];
                line.y_coordinates[line.y_coordinates.length] = position2['y'];
            }
        }else{
            if(pin2['location'] == 'top' || pin2['location'] == 'bottom'){
                line.x_coordinates[line.x_coordinates.length] = position2['x'];
                line.y_coordinates[line.y_coordinates.length] = position1['y'];
            }else{
                line.x_coordinates[line.x_coordinates.length] = new_x;
                line.y_coordinates[line.y_coordinates.length] = position1['y'];
                line.x_coordinates[line.x_coordinates.length] = new_x;
                line.y_coordinates[line.y_coordinates.length] = position2['y'];
                this.placeLinePositioner(line, new_x, new_y, 'horizontal');
            }
        }

        line.x_coordinates[line.x_coordinates.length] = position2['x'];
        line.y_coordinates[line.y_coordinates.length] = position2['y'];
                
        this.drawLine(line.block,line.x_coordinates,line.y_coordinates);

        this.bindEventsLine(line);
    }

    /*
     * Redraws all the connecting lines if the block is repositioned
     */
    this.refreshConnections = function(block_name){
        $.each(blockmanager.getBlock(block_name).pins, function(key, value){
            if(value['connected_to_block'] != ''){
                blockconnector.refreshLine(value);
            }
        });
    }

    /*
     * Redraws line when the block is repositioned
     */
    this.refreshLine = function(pin1){
        var line = blockmanager.getBlock(pin1['connected_to_block']);
        var pin2 = blockmanager.getBlock(line.pins[pin1['type']]['connected_to_block']).pins[line.pins[pin1['type']]['connected_to_pin']];
        var position1 = this.computeLinePoint(pin1);
        var position2 = this.computeLinePoint(pin2);

        line.x_coordinates[0] = position1['x'];
        line.y_coordinates[0] = position1['y'];

        if(pin1['location'] == 'top' || pin1['location'] == 'bottom'){
            if(pin2['location'] == 'top' || pin2['location'] == 'bottom'){
                line.x_coordinates[1] = position1['x'];
                line.x_coordinates[2] = position2['x'];
                line.positioner.css('left',(Math.min(position1['x'],position2['x'])+Math.floor(Math.abs(position1['x']-position2['x'])/2)-Math.floor(this.positioner_size/2))+'px');
                line.x_coordinates[3] = position2['x'];
                line.y_coordinates[3] = position2['y'];
            }else{
                line.x_coordinates[1] = position1['x'];
                line.y_coordinates[1] = position2['y'];
                line.x_coordinates[2] = position2['x'];
                line.y_coordinates[2] = position2['y'];
            }
        }else{
            if(pin2['location'] == 'top' || pin2['location'] == 'bottom'){
                line.x_coordinates[1] = position2['x'];
                line.y_coordinates[1] = position1['y'];
                line.x_coordinates[2] = position2['x'];
                line.y_coordinates[2] = position2['y'];
            }else{
                line.y_coordinates[1] = position1['y'];
                line.y_coordinates[2] = position2['y'];
                line.positioner.css('top',(Math.min(position1['y'],position2['y'])+Math.floor(Math.abs(position1['y']-position2['y'])/2)-Math.floor(this.positioner_size/2))+'px');
                line.x_coordinates[3] = position2['x'];
                line.y_coordinates[3] = position2['y'];
            }
        }

        line.block.children('.line_element').remove();
        this.drawLine(line.block,line.x_coordinates,line.y_coordinates);
    }

    /*
     * Refreshes events on all line of the repositioned block
     */
    this.refreshEvents = function(repositioned_block){
        $.each(blockmanager.getBlock(repositioned_block).pins, function(key, pin){
            if(pin['connected_to_block'] != ''){
                blockconnector.bindEventsLine(blockmanager.getBlock(pin['connected_to_block']));
            }
        });
    }

    /*
     * Draws the line from the coordinates and places it to line holder
     */
    this.drawLine = function(line_holder,x_coordinates,y_coordinates){
        var step_count = Math.min(x_coordinates.length,y_coordinates.length);
        var line_piece = '';
        for(var i = 1; i<step_count; i++){
            line_piece = '<div class="line_element" style="left:'+Math.min(x_coordinates[i-1],x_coordinates[i])+'px;top:'+Math.min(y_coordinates[i-1],y_coordinates[i])+'px;';
            if(x_coordinates[i-1] == x_coordinates[i]){
                line_piece += 'width:'+this.line_width+'px;height:'+(Math.abs(y_coordinates[i-1]-y_coordinates[i])+this.line_width)+'px;"></div>';
            }else{
                line_piece += 'width:'+(Math.abs(x_coordinates[i-1]-x_coordinates[i])+this.line_width)+'px;height:'+this.line_width+'px;"></div>';
            }
            line_holder.append(line_piece);
        }
    }

    /*
     * Repositions the middle of the block connecting line
     */
    this.repositionLineMiddle = function(line_name,positioner){
        var new_psition = positioner.offset();
        var line = blockmanager.getBlock(line_name);
        if(line.x_coordinates[1] == line.x_coordinates[2]){
            line.x_coordinates[1] = new_psition.left+Math.floor(this.positioner_size/2);
            line.x_coordinates[2] = new_psition.left+Math.floor(this.positioner_size/2);
        }else{
            line.y_coordinates[1] = new_psition.top+Math.floor(this.positioner_size/2);
            line.y_coordinates[2] = new_psition.top+Math.floor(this.positioner_size/2);
        }
        line.block.children('.line_element').remove();
        this.drawLine(line.block,line.x_coordinates,line.y_coordinates);
    }

    /*
     * Places the positioner to the center of the line and assigns the events to it
     */
    this.placeLinePositioner = function(line,x_middle,y_middle,type){
        if(type == 'horizontal'){
            line.block.append('<div class="horizontal_positioner" style="top:'+(y_middle-(this.positioner_size/2))+'px;left:'+(x_middle-(this.positioner_size/2))+'px;"></div>');
            line.positioner = line.block.find('.horizontal_positioner');
            line.positioner_type = 'horizontal';
            line.positioner.draggable({
                axis: 'x',
                cursor: 'e-resize'
            });
        }
        if(type == 'vertical'){
            line.block.append('<div class="vertical_positioner" style="top:'+(y_middle-(this.positioner_size/2))+'px;left:'+(x_middle-(this.positioner_size/2))+'px;"></div>');
            line.positioner = line.block.find('.vertical_positioner');
            line.positioner_type = 'vertical';
            line.positioner.draggable({
                axis: 'y',
                cursor: 'n-resize'
            });
        }
        
        line.positioner.draggable({
            containment: settings['canvas_name'],
            start: function(){
                blockmanager.setActiveBlock(line.block_name);
            },
            drag: function(event,ui){
                blockconnector.repositionLineMiddle(line.block_name, ui.helper);
            },
            stop: function(event,ui){
                blockconnector.repositionLineMiddle(line.block_name, ui.helper);
                blockconnector.bindEventsLine(line);
                blockmanager.setActiveBlock(line.block_name);
            }
        });
    }

    /*
     * Computes the pins border position for connecting line
     */
    this.computeLinePoint = function(pin){
        var position = pin['pin'].offset();
        var x = 0;
        var y = 0;
        if(pin['location'] == 'top'){
            x = position.left+Math.floor((this.pin_size-this.line_width)/2);
            y = position.top-this.line_width;
        }else if(pin['location'] == 'bottom'){
            x = position.left+Math.floor((this.pin_size-this.line_width)/2);
            y = position.top+this.pin_size;
        }else if(pin['location'] == 'left'){
            x = position.left-this.line_width;
            y = position.top+Math.floor((this.pin_size-this.line_width)/2);
        }else if(pin['location'] == 'right'){
            x = position.left+this.pin_size;
            y = position.top+Math.floor((this.pin_size-this.line_width)/2);
        }else{
            x = position.left+Math.floor(this.pin_size/2);
            y = position.top+Math.floor(this.pin_size/2);
        }
        return {
            'x':x,
            'y':y
        };
    }

    /*
     * Assigns the lines event listeners
     */
    this.bindEventsLine = function(line){
        line.block.children('.line_element').bind('mousedown',function(){
            blockmanager.setActiveBlock(line.block_name);
        })
        .bind('click',function(e){
            blockconnector.storeLineClickPosition(e,this);
            blockconnector.connectBlocks(line.block_name,'output');
        })
        .bind("contextmenu",function(e){
            return menumanager.openContextmenu(e,'line');
        });
    }

    /*
     * Places the junction on the line if connection is started
     */
    this.placeJunction = function(existing_line_name,connection_block_name,connection_pin_name){
        if((blockmanager.getBlock(connection_block_name).pins[connection_pin_name]['type'] == 'input') && (this.connection['line_clicked_element'].width() >= this.pin_size || this.connection['line_clicked_element'].height() >= this.pin_size)){
            var junction = blockmanager.createBlock('junction');
            junction.block.css({
                'top':(this.connection['line_clicked_position']['Y']-Math.floor(this.pin_size/2)),
                'left':(this.connection['line_clicked_position']['X']-Math.floor(this.pin_size/2))
                });

            var line = blockmanager.getBlock(existing_line_name);
            var src_block = line.pins['input']['connected_to_block'];
            var src_pin = line.pins['input']['connected_to_pin'];
            var dst_block = line.pins['output']['connected_to_block'];
            var dst_pin = line.pins['output']['connected_to_pin'];
            
            if(this.connection['line_clicked_element'].width() == this.line_width){
                if(blockmanager.getBlock(src_block).pins[src_pin]['pin'].offset().top < junction.block.offset().top){
                    junction.pins['pin4']['location'] = 'top';
                    junction.pins['pin3']['location'] = 'bottom';
                }else{
                    junction.pins['pin4']['location'] = 'bottom';
                    junction.pins['pin3']['location'] = 'top';
                }
                if(junction.block.offset().left < blockmanager.getBlock(connection_block_name).pins[connection_pin_name]['pin'].offset().left){
                    junction.pins['pin2']['location'] = 'right';
                    junction.pins['pin1']['location'] = 'left';
                }else{
                    junction.pins['pin2']['location'] = 'left';
                    junction.pins['pin1']['location'] = 'right';
                }
            }else{
                if(blockmanager.getBlock(src_block).pins[src_pin]['pin'].offset().left < junction.block.offset().left){
                    junction.pins['pin4']['location'] = 'left';
                    junction.pins['pin3']['location'] = 'right';
                }else{
                    junction.pins['pin4']['location'] = 'right';
                    junction.pins['pin3']['location'] = 'left';
                }
                if(junction.block.offset().top < blockmanager.getBlock(connection_block_name).pins[connection_pin_name]['pin'].offset().top){
                    junction.pins['pin2']['location'] = 'bottom';
                    junction.pins['pin1']['location'] = 'top';
                }else{
                    junction.pins['pin2']['location'] = 'top';
                    junction.pins['pin1']['location'] = 'bottom';
                }
            }

            this.cancelConnection();
            blockmanager.removeBlock(existing_line_name,false);
                        
            this.connectBlocks(src_block, src_pin);
            this.connectBlocks(junction.block_name, 'pin4');
            this.connectBlocks(dst_block, dst_pin);
            this.connectBlocks(junction.block_name, 'pin3');
            this.connectBlocks(connection_block_name, connection_pin_name);
            this.connectBlocks(junction.block_name, 'pin2');
            
            this.bindEventsJunction(junction);            
        }
    }

    /*
     * Assigns the junction event listeners
     */
    this.bindEventsJunction = function(junction){
        junction.block.bind('mousedown',function(){
            blockmanager.setActiveBlock(junction.block_name);
        })
        .bind('click',function(){
            blockconnector.connectBlocks(junction.block_name, 'pin1');
        })
        .bind("contextmenu",function(e){
            return menumanager.openContextmenu(e,'junction');
        });
    }

    /*
     * Sets the pin values of the block back to initial state without line connection
     */
    this.setPinsInitialState = function(temp_block,pinname){
        var temp_pin = temp_block.pins[pinname];

        temp_pin['connected_to_block'] = '';
        temp_pin['connected_to_pin'] = '';

        temp_block.empty_pin_count++;

        if(temp_block.block_type == 'junction'){
            if((temp_block.empty_pin_count == 1) && (temp_block.pins['pin4']['connected_to_block'] != '')){
                temp_pin['pin'].bind('click',function(){
                    blockconnector.connectBlocks(temp_block.block_name,pinname);
                });
            }
        }else{
            temp_pin['pin'].hover(function(){
                $(this).css('background-color',settings['selected_color']);
            },function(){
                $(this).css('background-color','transparent');
            });
            temp_pin['pin'].bind('click',function(){
                blockconnector.connectBlocks(temp_block.block_name,pinname);
            });
        }
    }

    /*
     * Sets the two blocks pins attributes and events to state before connection
     */
    this.prepareLineDeletion = function(line_name,control_junctions){
        var line = blockmanager.getBlock(line_name);
        var block1 = blockmanager.getBlock(line.pins['input']['connected_to_block']);
        var block2 = blockmanager.getBlock(line.pins['output']['connected_to_block']);
        if(line.in_canvas){
            this.setPinsInitialState(block1,line.pins['input']['connected_to_pin']);
            this.setPinsInitialState(block2,line.pins['output']['connected_to_pin']);
        }
        
        if(control_junctions){
            if(block1.block_type == 'junction' && block1.empty_pin_count == 2 && block1.in_canvas){
                var blocks_to_connect = [];
                var pins_to_connect = [];
                for(var i=1;i<5;i++){
                    if(block1.pins['pin'+i]['connected_to_block'] != ''){
                        blocks_to_connect[blocks_to_connect.length] = blockmanager.getBlock(block1.pins['pin'+i]['connected_to_block']).pins[this.reverse_pin_type[block1.pins['pin'+i]['connected_to_pin']]]['connected_to_block'];
                        blockmanager.getBlock(block1.pins['pin'+i]['connected_to_block']).in_canvas = false;
                        pins_to_connect[pins_to_connect.length] = blockmanager.getBlock(block1.pins['pin'+i]['connected_to_block']).pins[this.reverse_pin_type[block1.pins['pin'+i]['connected_to_pin']]]['connected_to_pin'];
                    }
                }

                this.cancelConnection();
                blockmanager.getBlock(blocks_to_connect[0]).empty_pin_count++;
                blockmanager.getBlock(blocks_to_connect[1]).empty_pin_count++;
                this.connectBlocks(blocks_to_connect[0], pins_to_connect[0]);
                this.connectBlocks(blocks_to_connect[1], pins_to_connect[1]);
                //opera.postError(blockmanager.blocks['block11'].empty_pin_count);
                blockmanager.removeBlock(block1.block_name,true);
            }
            
            if(block2.block_type == 'junction' && block2.pins[line.pins['output']['connected_to_pin']]['type'] == 'input' && block2.in_canvas){
                blockmanager.removeBlock(block2.block_name,false);
            }
        }
    }

    /*
     * Cancels the started block
     */
    this.cancelConnection = function(){
        if(this.connection['started']){
            if(blockmanager.getBlock(this.connection['block_name']).block_type != 'junction' && blockmanager.getBlock(this.connection['block_name']).block_type != 'line'){
                blockmanager.getBlock(this.connection['block_name']).pins[this.connection['pin_name']]['pin'].removeClass('selected');
            }
            this.connection['started'] = false;
        }
    }
}
