//object manages the block content and orientation
function blockEditor(){
    this.rotation = {
        '+90':{
            'top':'right',
            'right':'bottom',
            'bottom':'left',
            'left':'top'
        },
        '-90':{
            'top':'left',
            'left':'bottom',
            'bottom':'right',
            'right':'top'
        },
        'flip_horizontal':{
            'left':'right',
            'right':'left',
            'top':'top',
            'bottom':'bottom'
        },
        'flip_vertical':{
            'top':'bottom',
            'bottom':'top',
            'left':'left',
            'right':'right'
        }
    };
    this.io = {
        'input': 'output',
        'output': 'input'
    };
    this.io_name = {
        'input': 'U',
        'output': 'Y'
    }

    /*
     * Fills the block content with new values from block editor
     */
    this.setBlockContent = function(edited_block,data){
        var new_values;
        if(edited_block.block_type == 'multiply'){
            (data == null) ? new_values = subwindowmanager.getNewValues('multiply') : new_values = data;
            var new_numerator,new_denominator;
            if(new_values['denominator'] != '1'){
                if(new_values['denominator'].match(/^-?\d+( -?\d+)*$/)){
                    if(new_values['numerator'].match(/^-?\d+( -?\d+)*$/)){
                        new_values['numerator'] = new_values['numerator'].replace(/^(0 )*/g,'');
                        edited_block.numerator = new_values['numerator'];
                        new_values['denominator'] = new_values['denominator'].replace(/^(0 )*/g,'');
                        edited_block.denominator = new_values['denominator'];
                        new_numerator = this.createPolynome(new_values['numerator']);
                        edited_block.block_middle.find('.numerator').html(new_numerator);
                        edited_block.block_middle.find('.separator').show();
                        new_denominator = this.createPolynome(new_values['denominator'])
                        edited_block.block_middle.find('.denominator').html(new_denominator)
                                                                      .show();
                        edited_block.block.find('.min_width').css('width',this.getMultiplyMinWidth(new_numerator,new_denominator));
                        this.setMultiplyPinholders(edited_block);
                        subwindowmanager.hideEdit();
                    }else{
                        subwindowmanager.openSubwindow('alert',{'message':texts['ER_10'],'title':texts['SW_1']});
                    }
                }else{
                    subwindowmanager.openSubwindow('alert',{'message':texts['ER_11'],'title':texts['SW_1']});
                }
            }else{
                if(new_values['numerator'].match(/(^-?[a-zA-Z][0-9]*$)|(^-?[0-9]+$)/)){
                    edited_block.numerator = new_values['numerator'];
                    edited_block.denominator = new_values['denominator'];
                    new_numerator = this.createPolynome(new_values['numerator']);
                    new_denominator = new_values['denominator'];
                    if(new_values['numerator'].match(/^[0-9]+$/)){
                        edited_block.block_middle.find('.numerator').html(new_values['numerator']);
                    }else{
                        edited_block.block_middle.find('.numerator').html(this.createVariable(new_values['numerator']));
                    }
                    edited_block.block_middle.find('.separator').hide();
                    edited_block.block_middle.find('.denominator').hide();
                    edited_block.block.find('.min_width').css('width',this.getMultiplyMinWidth(new_numerator,new_denominator));
                    this.setMultiplyPinholders(edited_block);
                    subwindowmanager.hideEdit();
                }else{
                    subwindowmanager.openSubwindow('alert',{'message':texts['ER_10'],'title':texts['SW_1']});
                }
            }            
            blockconnector.refreshConnections(edited_block.block_name);
            blockconnector.refreshEvents(edited_block.block_name);
        }
        if(edited_block.block_type == 'sumator'){
            (data == null) ? new_values = subwindowmanager.getNewValues('sumator') : new_values = data;
            edited_block.input_1_signum = new_values['signum_1'];
            edited_block.input_2_signum = new_values['signum_2'];
            edited_block.signums[edited_block.pins['pin2']['location']].html(new_values['signum_1']);
            edited_block.signums[edited_block.pins['pin3']['location']].html(new_values['signum_2']);
            subwindowmanager.hideEdit();
        }
        if(edited_block.block_type == 'io'){
            var oldtype = edited_block.type;
            (data == null) ? new_values = subwindowmanager.getNewValues('io') : new_values = data;
            edited_block.type = new_values['type'];
            edited_block.pins['pin1']['pin'].removeClass(edited_block.type+'_pin');
            edited_block.pins['pin1']['pin'].addClass(this.io[edited_block.type]+'_pin');
            edited_block.pins['pin1']['type'] = this.io[edited_block.type];
            edited_block.block.find('.name_holder').html(this.io_name[edited_block.type]);
            if(edited_block.type != oldtype && edited_block.empty_pin_count == 0){
                blockmanager.removeBlock(edited_block.pins['pin1']['connected_to_block']);
            }
            subwindowmanager.hideEdit();
        }
    }

    /*
     * calculates the minimum width for mulriply block after content change
     */
    this.getMultiplyMinWidth = function(numerator,denominator){
        var numerator_length = 0;
        var denominator_length = 0;

        var patt = /<sup>\d+<\/sup>/gi;

        var temp = numerator.match(patt);
        if(temp != null){
            numerator_length += temp.length*6;
            numerator = numerator.replace(patt,'');            
        }
        numerator_length += numerator.length*8;
        numerator_length += 50;

        temp = denominator.match(patt);
        if(temp != null){
            denominator_length += temp.length*6;
            denominator = denominator.replace(patt, '');            
        }
        denominator_length += denominator.length*8;
        denominator_length += 48;
        
        return (numerator_length>denominator_length) ? numerator_length : denominator_length;
    }

    /*
     * sets the multiply blocks rigt and left pinholders
     */
    this.setMultiplyPinholders = function(edited_block){
        var new_margin = edited_block.block.height();
        new_margin = Math.ceil(new_margin/2)-6;
        edited_block.pinholders['left'].css('margin-top',new_margin);
        edited_block.pinholders['right'].css('margin-top',new_margin);
    }

    /*
     * Creates polynome from numerator and denominator in format 'd d d d'
     */
    this.createPolynome = function(input){
        if(input.match(/^-?\d+( -?\d+)*$/)){
            var space_count = 0;
            if(input.match(/ /g)){
                space_count = input.match(/ /g).length;
            }
            for(space_count;space_count>=0;space_count--){
                if(space_count!=1){
                    input = input.replace(/ /,'s<sup>'+space_count+'</sup>+',1);
                }else{
                    input = input.replace(/ /,'s+',1);
                }
            }
            input = input.replace(/\+-/g,'-');
            input = input.replace(/([+-]+0s(<sup>\d+<\/sup>)?)|([+-]+0$)/g,'');
            input = input.replace(/1s/g,'s');
        }
        return input;
    }

    /*
     * Creates the variable name with index
     */
    this.createVariable = function(input){
        var output = input;
        var number = input.match(/[0-9]*$/);
        if(number){
           output = input.match(/^-?[a-zA-Z]/)+'<sub>'+number+'</sub>';
        }
        return output;
    }

    /*
     * Rotates the blocks pins
     */
    this.rotateBlock = function(edited_block, degrees){
        edited_block.pins['pin1']['location'] = this.rotation[degrees][edited_block.pins['pin1']['location']];
        edited_block.pins['pin1']['pin'].appendTo(edited_block.pinholders[edited_block.pins['pin1']['location']]);
        if(edited_block.block_type == 'multiply' || edited_block.block_type == 'sumator'){
            var old_location = edited_block.pins['pin2']['location'];
            edited_block.pins['pin2']['location'] = this.rotation[degrees][edited_block.pins['pin2']['location']];
            edited_block.pins['pin2']['pin'].appendTo(edited_block.pinholders[edited_block.pins['pin2']['location']]);
            if(edited_block.block_type == 'sumator'){
                var old_location1 = edited_block.pins['pin3']['location'];
                edited_block.pins['pin3']['location'] = this.rotation[degrees][edited_block.pins['pin3']['location']];
                edited_block.pins['pin3']['pin'].appendTo(edited_block.pinholders[edited_block.pins['pin3']['location']]);
                var signum = edited_block.signums[old_location].html();
                edited_block.signums[old_location].html('');
                var signum1 = edited_block.signums[old_location1].html();
                edited_block.signums[old_location1].html('');
                edited_block.signums[edited_block.pins['pin2']['location']].html(signum);
                edited_block.signums[edited_block.pins['pin3']['location']].html(signum1);
            }
        }
        if(degrees == '+90' || degrees == '-90'){
            blockconnector.redrawConnections(edited_block.block_name);
        }else{
            blockconnector.refreshConnections(edited_block.block_name);
        }
    }

    /*
     * Sets the values for the duplicated block
     */
    this.setDuplicatedBlock = function(source_block,destination_block,new_blockname,X,Y){
        destination_block.block_name = new_blockname;
        destination_block.block = source_block.clone();
        destination_block.block.attr('id',new_blockname);
        destination_block.block_middle = destination_block.block.find('.content_holder');
        $.each(destination_block.pinholders,function(key, value){
            destination_block.pinholders[key] = destination_block.block.find('.'+key+'_pinholder');
        });
        $.each(destination_block.pins,function(key, value){
            destination_block.pins[key]['pin'] = destination_block.pinholders[destination_block.pins[key]['location']].children();
            destination_block.pins[key]['connected_to_block'] = '';
            destination_block.pins[key]['connected_to_pin'] = '';
        });
        if(destination_block.block_type == 'sumator'){
            $.each(destination_block.signums,function(key, value){
                destination_block.signums[key] = destination_block.block.find('.'+key+'_signum');
            });
        }
        destination_block.block.css({'position':'absolute','top': Y, 'left': X, 'z-index': 1001})
                               .draggable({stack: '.block'});
        this.bindEvents(destination_block);
    }

    /*
     * Assigns events to block elements
     */
    this.bindEvents = function(edited_block){
        edited_block.block.draggable({
            containment: 'parent',
            start: function(){
                menumanager.closeContextmenu();
            },
            drag: function(event,ui){
                blockconnector.refreshConnections(ui.helper.attr('id'));
            },
            stop: function(event,ui){
                blockconnector.refreshEvents(ui.helper.attr('id'));
            }
        });
        edited_block.block_middle.bind('mousedown',function(){
            blockmanager.setActiveBlock(edited_block.block_name);
        })
        .bind('click',function(){
            menumanager.closeContextmenu();
        })
        .bind("contextmenu",function(e){
            return menumanager.openContextmenu(e,'block');
        })
        .bind('dblclick',function(){
            subwindowmanager.openSubwindow('edit','block');
        });
        $.each(edited_block.pins, function(key, value){
            value['pin'].hover(function(){
                $(this).css('background-color',settings['selected_color']);
            },function(){
                $(this).css('background-color','');
            })
            .bind('click',function(){
                blockconnector.connectBlocks(edited_block.block_name,key);
            });
        });
    }
}
