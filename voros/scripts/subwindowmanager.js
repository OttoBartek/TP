/* 
 * Object manages all the subwindows in the application
 */
function subwindowManager(){
    this.alertwindow = {
        'window': $(settings['alertbox']),
        'message': $(settings['alertbox']).find('.alert_message')
    }
    this.confirmwindow = {
        'window': $(settings['confirmbox']),
        'message': $(settings['confirmbox']).find(".confirm_message")
    }
    this.editorwindow = {
        'window': $(settings['editorbox']),
        'opened_input': '',
        'editors': {
            'multiply_block_editor': {
                'editor': $(settings['multiply_block_editor']),
                'numerator': $(settings['multiply_block_editor']).find('input[name=new_numerator]'),
                'denominator': $(settings['multiply_block_editor']).find('input[name=new_denominator]')
            },
            'sumator_block_editor': {
                'editor': $(settings['sumator_block_editor']),
                'signum_1': $(settings['sumator_block_editor']).find('input[name=new_signum_1]'),
                'signum_2': $(settings['sumator_block_editor']).find('input[name=new_signum_2]')
            },
            'io_block_editor': {
                'editor': $(settings['io_block_editor']),
                'type': $(settings['io_block_editor']).find('input[name=new_type]')
            },
            'canvas_editor': {
                'editor': $(settings['canvas_editor']),
                'width': $(settings['canvas_editor']).find('input[name=new_canvas_width]'),
                'height': $(settings['canvas_editor']).find('input[name=new_canvas_height]'),
                'name': $(settings['canvas_editor']).find('input[name=new_canvas_name]'),
                'fit': $(settings['canvas_editor']).find('input[name=fit_canvas]')
            }
        }
    }

    this.solutionwindow = {
        'window': $(settings['solutionwindow']),
        'solutionimg': $(settings['solutionholderprefix']+'-1'),
        'solutiontex': $(settings['solutionholderprefix']+'-2'),
        'solutiontext': $(settings['solutionholderprefix']+'-3')
    }

    /*
     * Setting up the dialog windows
     */
     this.alertwindow['window'].dialog({
        resizable: false,
        modal: true,
        autoOpen: false,
        minHeight: 50,
        width: 300,
        buttons: {
            "OK": function() {
                $( this ).dialog( "close" );
            }
        }
    });
    this.confirmwindow['window'].dialog({
        resizable: false,
        modal: true,
        autoOpen: false,
        minHeight: 50,
        width: 300
    });
    this.editorwindow['window'].dialog({
        resizable: false,
        modal: true,
        autoOpen: false,
        minHeight: 50,
        width: 205
    });
    this.solutionwindow['window'].tabs().draggable({
        handle: settings['solutionwindowhandle'],
        cursor: 'move'
    }).resizable({
        minHeight: 80,
        minWidth: 440,
        alsoResize: '.solutionholder'
    });

    /*
     * Function opens the required subwindow
     */
    this.openSubwindow = function(window, options){
        switch(window){
            case 'alert':
                this.showAlert(options);
                break;
            case 'confirm':
                this.showConfirm(options);
                break;
            case 'edit':
                this.showEdit(options);
                break;
            case 'solution':
                this.manageSolutionWindow('open',options);
                break;
            default:
                alert('Debug: subwindowmanager open window error!');
        }
    }

    /*
     * Shows the alert message box with alert
     */
    this.showAlert = function(options){
        this.alertwindow['message'].html(options['message']);
        this.alertwindow['window'].dialog({title: options['title']});
        this.alertwindow['window'].dialog('open');
    }

    /*
     * Shows the confirm message box with the message
     */
    this.showConfirm = function(options){
        this.confirmwindow['message'].html(options['text']);
        this.confirmwindow['window'].dialog({
            title: texts['SW_2'],
            buttons: [{
                text: options['button'],
                click: function(){
                    options['function']();
                    $( this ).dialog( "close" );
                } 
            },
            {
                text: texts['SW_16'],
                click: function(){
                    $( this ).dialog( "close" );
                }
            }]
        }).dialog('open');
    }

    /*
     * Shows the editor box for specified element
     */
    this.showEdit = function(type){
        switch(type){
            case 'block':
                var edited_block = blockmanager.getBlock('active');
                if(edited_block.block_type == 'multiply'){
                    this.editorwindow['editors']['multiply_block_editor']['numerator'].val(edited_block.numerator);
                    this.editorwindow['editors']['multiply_block_editor']['denominator'].val(edited_block.denominator);
                }
                if(edited_block.block_type == 'sumator'){
                    this.editorwindow['editors']['sumator_block_editor']['signum_1'].filter('input[value="'+edited_block.input_1_signum+'"]').attr('checked',true);
                    this.editorwindow['editors']['sumator_block_editor']['signum_2'].filter('input[value="'+edited_block.input_2_signum+'"]').attr('checked',true);
                }
                if(edited_block.block_type == 'io'){
                    this.editorwindow['editors']['io_block_editor']['type'].filter('input[value="'+edited_block.type+'"]').attr('checked',true);
                }
                this.showEditInputs(edited_block.block_type+'_block_editor');

                this.editorwindow['window'].dialog({
                    title: texts['SW_18'],
                    buttons: [{
                        text: texts['SW_17'],
                        click: function(){
                            blockmanager.setBlockContent();
                        }
                    },
                    {
                        text: texts['SW_16'],
                        click: function(){
                            $( this ).dialog( "close" );
                        }
                    }]                   
                }).dialog('open');
                break;
            case 'canvas':
                this.showEditInputs('canvas_editor');
                this.editorwindow['editors']['canvas_editor']['width'].val($(settings['canvas_name']).width());
                this.editorwindow['editors']['canvas_editor']['height'].val($(settings['canvas_name']).height());
                this.editorwindow['editors']['canvas_editor']['name'].val($(settings['canvas_background']).html());
                this.editorwindow['editors']['canvas_editor']['fit'].attr('checked',false);
                this.editorwindow['window'].dialog({
                    title: texts['SW_19'],
                    buttons: [{
                        text: texts['SW_17'],
                        click: function(){
                            setCanvasProperties();
                        }
                    },
                    {
                        text: texts['SW_16'],
                        click: function(){
                            $( this ).dialog( "close" );
                        }
                    }]
                }).dialog('open');
                break;
            default:
                alert('Debug: subwindowmanager edit window error!');
        }        
    }

    /*
     * Shows the specified input fields i editorbox
     */
    this.showEditInputs = function(required_inputs){
        if(this.editorwindow['opened_input'] != ''){
            this.editorwindow['editors'][this.editorwindow['opened_input']]['editor'].hide();
        }
        this.editorwindow['opened_input'] = required_inputs;
        this.editorwindow['editors'][required_inputs]['editor'].show();
    }

    /*
     * Closes the edit subwindow after successfully provided values
     */
    this.hideEdit = function(){
        this.editorwindow['window'].dialog('close');
    }

    /*
     * Returns the new user entered values
     */
    this.getNewValues = function(type){
        var values;
        switch(type){
            case 'multiply':
                values = {
                    'numerator': this.editorwindow['editors']['multiply_block_editor']['numerator'].val(),
                    'denominator': this.editorwindow['editors']['multiply_block_editor']['denominator'].val()
                }
            break;
            case 'sumator':
                values = {
                    'signum_1': this.editorwindow['editors']['sumator_block_editor']['signum_1'].filter(':checked').val(),
                    'signum_2': this.editorwindow['editors']['sumator_block_editor']['signum_2'].filter(':checked').val()
                }
            break;
            case 'io':
                values = {
                    'type': this.editorwindow['editors']['io_block_editor']['type'].filter(':checked').val()
                }
            break;
            case 'canvas':
                values = {
                    'width': this.editorwindow['editors']['canvas_editor']['width'].val(),
                    'height': this.editorwindow['editors']['canvas_editor']['height'].val(),
                    'name': this.editorwindow['editors']['canvas_editor']['name'].val(),
                    'fit': this.editorwindow['editors']['canvas_editor']['fit'].is(':checked')
                }
            break;
            default:
                alert('Debug: subwindowmanager get new values error!');
        }
        return values;
    }

    /*
     * Opens or closes the solution subwindow
     */
    this.manageSolutionWindow = function(action,content){
        if(action == 'open'){
            this.solutionwindow['solutionimg'].html(content['solutionimg']);
            this.solutionwindow['solutiontex'].html(content['solutiontex']);
            this.solutionwindow['solutiontext'].html(content['solutiontext']);
            this.solutionwindow['window'].fadeIn();
        }else{
            this.solutionwindow['solutionimg'].html('');
            this.solutionwindow['solutiontex'].html('');
            this.solutionwindow['solutiontext'].html('');
            this.solutionwindow['window'].fadeOut();
        }
    }
}


