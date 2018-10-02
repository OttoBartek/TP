/*
 * IO blocks class
 */
function blockIo(new_blockname){
    this.block_type = 'io';
    this.block_name = new_blockname;
    this.block = $(settings['io_block_sample']).clone();
    this.block_middle = this.block.find('.content_holder');
    this.in_canvas = false;
    this.type = 'input';
    this.pinholders = {
        'left':this.block.find('.left_pinholder'),
        'top':this.block.find('.top_pinholder'),
        'bottom':this.block.find('.bottom_pinholder'),
        'right':this.block.find('.right_pinholder')
    };
    this.pins = {
        'pin1': {
            'pin': this.block.find('.output_pin'),
            'type': 'output',
            'location': 'right',
            'connected_to_block': '',
            'connected_to_pin': ''
        }
    };
    this.empty_pin_count = 1;

    this.block.attr('id',this.block_name)
              .appendTo(settings['io_block_addpanel'])
              .draggable({revert: 'invalid',stack: '.block',containment: '#secondbody',stop: function(event,ui){ui.helper.css('top',"auto")}})
              .fadeIn();
}

/*
 * Multiply blocks class
 */
function blockMultiply(new_blockname){
    this.block_type = 'multiply';
    this.block_name = new_blockname;
    this.block = $(settings['multiply_block_sample']).clone();
    this.block_middle = this.block.find('.content_holder');
    this.in_canvas = false;
    this.numerator = 'F';
    this.denominator = '1';
    this.pinholders = {
        'left':this.block.find('.left_pinholder'),
        'top':this.block.find('.top_pinholder'),
        'bottom':this.block.find('.bottom_pinholder'),
        'right':this.block.find('.right_pinholder')
    };
    this.pins = {
        'pin1': {
            'pin': this.block.find('.output_pin'),
            'type': 'output',
            'location': 'right',
            'connected_to_block': '',
            'connected_to_pin': ''
        },
        'pin2': {
            'pin': this.block.find('.input_pin'),
            'type': 'input',
            'location': 'left',
            'connected_to_block': '',
            'connected_to_pin': ''
        }
    };
    this.empty_pin_count = 2;
    
    this.block.attr('id',this.block_name)
              .appendTo(settings['multiply_block_addpanel'])
              .draggable({revert: 'invalid', stack: '.block',containment: '#secondbody'})
              .fadeIn();
}

/*
 * Sumator block class
 */
function blockSumator(new_blockname){
    this.block_type = 'sumator';
    this.block_name = new_blockname;
    this.block = $(settings['sumator_block_sample']).clone();
    this.block_middle = this.block.find('.content_holder');
    this.in_canvas = false;
    this.input_1_signum = '+';
    this.input_2_signum = '+';
    this.pinholders = {
        'left':this.block.find('.left_pinholder'),
        'top':this.block.find('.top_pinholder'),
        'bottom':this.block.find('.bottom_pinholder'),
        'right':this.block.find('.right_pinholder')
    };
    this.signums = {
        'left':this.block.find('.left_signum'),
        'top':this.block.find('.top_signum'),
        'bottom':this.block.find('.bottom_signum'),
        'right':this.block.find('.right_signum')
    },
    this.pins = {
        'pin1': {
            'pin': this.block.find('.output_pin'),
            'type': 'output',
            'location': 'right',
            'connected_to_block': '',
            'connected_to_pin': ''
        },
        'pin2': {
            'pin': this.block.find('.top_pinholder').children('.input_pin'),
            'type': 'input',
            'location': 'top',
            'connected_to_block': '',
            'connected_to_pin': ''
        },
        'pin3': {
            'pin': this.block.find('.bottom_pinholder').children('.input_pin'),
            'type': 'input',
            'location': 'bottom',
            'connected_to_block': '',
            'connected_to_pin': ''
        }
    };
    this.empty_pin_count = 3;
    
    this.block.attr('id',this.block_name)
              .appendTo(settings['sumator_block_addpanel'])
              .draggable({revert: 'invalid', stack: '.block',containment: '#secondbody'})
              .fadeIn();
}

/*
 * Line block class
 */
function blockLine(new_blockname){
    this.block_type = 'line';
    this.block_name = new_blockname;
    this.in_canvas = true;
    this.positioner = null;
    this.positioner_type = '';
    this.x_coordinates = [];
    this.y_coordinates = [];
    this.block = $(settings['line_sample']).clone();
    this.pins = {
        'input': {
            'connected_to_block': '',
            'connected_to_pin': ''
        },
        'output': {
            'connected_to_block': '',
            'connected_to_pin': ''
        }
    };
    this.empty_pin_count = 0;

    this.block.attr('id',this.block_name)
              .appendTo(settings['canvas_name'])
              .show();
}

/*
 * Junction block class
 */
function blockJunction(new_blockname){
    this.block_type = 'junction';
    this.block_name = new_blockname;
    this.in_canvas = true;
    this.block = $(settings['junction_sample']).clone();
    this.pins = {
        'pin1': {
            'pin': this.block,
            'type': 'output',
            'location': '',
            'connected_to_block': '',
            'connected_to_pin': ''
        },
        'pin2': {
            'pin': this.block,
            'type': 'output',
            'location': '',
            'connected_to_block': '',
            'connected_to_pin': ''
        },
        'pin3': {
            'pin': this.block,
            'type': 'output',
            'location': '',
            'connected_to_block': '',
            'connected_to_pin': ''
        },
        'pin4': {
            'pin': this.block,
            'type': 'input',
            'location': '',
            'connected_to_block': '',
            'connected_to_pin': ''
        }
    };
    this.empty_pin_count = 4;

    this.block.attr('id',this.block_name)
    .appendTo(settings['canvas_name'])
    .draggable({
        stack: '.block',
        containment:'parent',
        start: function(){
            menumanager.closeContextmenu();
        },
        drag: function(event,ui){
            blockconnector.refreshConnections(ui.helper.attr('id'));
        },
        stop: function(event,ui){
            blockconnector.refreshConnections(ui.helper.attr('id'));
            blockconnector.refreshEvents(ui.helper.attr('id'));
        }
    })
    .show();
}