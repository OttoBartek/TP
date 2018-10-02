/*
 * Object for in application menumanaging and shortcut managing
 */
function menuManager(){
    this.hovercolor = '#a6c9e2';
    this.position = {
        'X': 0,
        'Y': 0
    },
    this.actually_opened = '';
    this.contextmenus = {
        'block': $(settings['contextmenu_block']),
        'canvas': $(settings['contextmenu_canvas']),
        'line': $(settings['contextmenu_line']),
        'junction': $(settings['contextmenu_junction'])
    }

    communicator.createImporter();

    /*
     * Actions on initialisation
     */
    $(settings['contextmenu_item']).hover(function(){menumanager.lightOnContextMenuitem(this);},function(){menumanager.lightOffContextMenuitem(this);});
    $(settings['mainmenu_item']).hover(function(){menumanager.lightOnMenuitem(this);},function(){menumanager.lightOffMenuitem(this);});
    $(settings['rightmenu_item']).hover(function(){menumanager.lightOnMenuitem(this);},function(){menumanager.lightOffMenuitem(this);});

    /*hotkeys and combnations*/
    $(document).bind('keydown', 'a',function(){blockmanager.showHideDiagrammover('show');})
               .bind('keydown', 'r',function(){blockmanager.rotateBlock('+90');})
               .bind('keydown', 'f',function(){blockmanager.rotateBlock('flip_horizontal');})
               .bind('keydown','del',function(){blockmanager.deleteBlock();})
               .bind('keydown','Ctrl+c',function(){return blockmanager.copyBlock();})
               .bind('keydown','Ctrl+v',function(){return blockmanager.pasteBlock();})
               .bind('keydown','up',function(){return blockmanager.moveBlock('top');})
               .bind('keydown','down',function(){return blockmanager.moveBlock('bottom');})
               .bind('keydown','left',function(){return blockmanager.moveBlock('left');})
               .bind('keydown','right',function(){return blockmanager.moveBlock('right');});
               //.bind('contextmenu',function(e){e.preventDefault();});

    $(settings['canvas_background']).bind("click",function(e){
        blockmanager.unsetActiveBlock();
        menumanager.closeContextmenu();
        menumanager.storeLastXY(e);
        blockconnector.cancelConnection();
        blockmanager.showHideDiagrammover('hide');
    })
    .bind("contextmenu",function(e){
        menumanager.openContextmenu(e,'canvas')
        })
    .html(settings['default_diagramname']);

    /*
     * Opens the contextmenu on rightclick
     */
    this.openContextmenu = function(e,contextmenu){
        this.storeLastXY(e);
        var rightside = this.position['X']-3+this.contextmenus[contextmenu].width();
        var bottomside = this.position['Y']-3+this.contextmenus[contextmenu].height();
        var crightside = blockmanager.canvas.offset().left+blockmanager.canvas.width();
        var cbottomside = blockmanager.canvas.offset().top+blockmanager.canvas.height();
        var newpos_x = 0;
        var newpos_y = 0;

        if(rightside>crightside){
            newpos_x = this.position['X']-this.contextmenus[contextmenu].width()+3;
        }else{
            newpos_x = this.position['X']-3;
        }
        if(bottomside>cbottomside){
            newpos_y = this.position['Y']-this.contextmenus[contextmenu].height()+3;
        }else{
            newpos_y = this.position['Y']-3;
        }

        this.contextmenus[contextmenu].css('left',newpos_x)
                                      .css('top',newpos_y);
        if(this.actually_opened != contextmenu){
            if(this.actually_opened != ''){
                this.closeContextmenu();
            }
            this.actually_opened = contextmenu;
            this.contextmenus[contextmenu].fadeIn();
        }
        
        e.preventDefault();
    }

    /*
     * Closes the contextmenu
     */
    this.closeContextmenu = function(){
        if(this.actually_opened != ''){
            this.position['X'] = 0;
            this.position['Y'] = 0;
            var contextmenu_to_close = this.actually_opened;
            this.actually_opened = '';
            this.contextmenus[contextmenu_to_close].fadeOut();
        }
    }

    /*
     * Manages the clicked menuitem action
     */
    this.menuitemSelected = function(menuitem, option){
        switch(menuitem){
            case 'editblock':
                blockmanager.editBlock();
                break;
            case 'copyblock':
                blockmanager.copyBlock();
                break;
            case 'pasteblock':
                blockmanager.pasteBlock();
                break;
            case 'deleteblock':
                blockmanager.deleteBlock();
                break;
            case 'rotateblock':
                blockmanager.rotateBlock(option);
                break;
            case 'deleteallblocks':
                blockmanager.deleteAllBlocks();
                break;
            case 'editcanvas':
                subwindowmanager.openSubwindow('edit','canvas');
                break;
            case 'export':
                communicator.exportDiagramData();
                break;
            case 'newdiagram':
                newDiagram();
                break;
            case 'solve':
                communicator.simplifyDiagram();
		        newTypeset();
                break;
            case 'closeshowsolution':
                subwindowmanager.manageSolutionWindow('close',null);
                break;
            case 'selectall':
                blockmanager.showHideDiagrammover('show');
                break;
            case 'help':
                showHelp();
                break;
            default:
                alert('Debug: menumanager selected item error!');
        }
        this.closeContextmenu();
    }

    /*
     * Stores the lat point of click in canvas
     */
    this.storeLastXY = function(e){
        this.position['X'] = e.pageX;
        this.position['Y'] = e.pageY;
    }

    /*
     * Lights on the menu element
     */
    this.lightOnMenuitem = function(element){
        $(element).css({'background-image':'url(images/menuitembg.png)'});
    }

    /*
     * Lights off the menu element
     */
    this.lightOffMenuitem = function(element){
        $(element).css({'background-image':'none'});
    }

    /*
     * Lights on the contextmenumenu element
     */
    this.lightOnContextMenuitem = function(element){
        $(element).css({'background-color': this.hovercolor});
    }

    /*
     * Lights off the contextmenumenu element
     */
    this.lightOffContextMenuitem = function(element){
        $(element).css({'background-color': 'transparent'});
    }
	

}
