/* 
 * Object manages the communication with server
 */

function communicator(){
    this.serverscriptsfolder = 'serverscripts';
    this.uploader = null;
    var wait_const = 0;

    /*
     * Forces the exported diagram file download
     */
    this.exportDiagramData = function(){
        var data = blockmanager.prepareBlocksDataForExport();
        if(data != null){
            showHideWaiting('show');
            $.ajax({
                type: "POST",
                url: this.serverscriptsfolder+'/store_data.php',
                data: 'action=store&language='+$('#powered').find('.active_language').html().toLowerCase()+'&data='+encodeURIComponent(data),
                success: function(msg){
                    var response = jQuery.parseJSON(msg);
                    if(response['status'] == 'success'){
                        window.location = communicator.serverscriptsfolder+'/export.php?action=export';
			
                        showHideWaiting('hide');
                    }else{
                        subwindowmanager.openSubwindow('alert',{'message':response['text'],'title':texts['SW_13']});
                        showHideWaiting('hide');
                    }
                }
            });
        }
    }

    /*
     * Assign the ajax uploader to the specified element
     */
    this.createImporter = function(){
        this.uploader = new AjaxUpload(settings['fileuploader_btn'], {
            action: communicator.serverscriptsfolder+'/import.php',
            name: 'subor_diagram',
            data: {"language":$('#powered').find('.active_language').html().toLowerCase()},
            autoSubmit: false,
            onChange: function(){
                if(blockmanager.isCanvasEmpty()){
                    communicator.uploader.submit();
                }else{
                    subwindowmanager.openSubwindow('confirm',{
                        'text': texts['ER_15'],
                        'button': texts['SW_14'],
                        'function': function(){
                            communicator.uploader.submit();
                        }
                    });
                }
            },
            onSubmit: function() {
                showHideWaiting('show');
            },
            onComplete: function(file, data) {
                communicator.imported_data = data;
                var obj = jQuery.parseJSON(communicator.imported_data);
                if(obj['status'] == 'success'){
                    menumanager.menuitemSelected('closeshowsolution', 'close');
                    blockmanager.drawDiagramFromImport(obj['diagram']);
                }else{
                    subwindowmanager.openSubwindow('alert',{
                        'message':decodeURI(obj['text']).replace(/\+/g,' '),
                        'title':texts['SW_13']
                    });
                }
                showHideWaiting('hide');
            }
        });
    }

    /*
     * Sends the diagram data to server for solving
     */
    this.simplifyDiagram = function(){
        var data = blockmanager.prepareBlocksDataForExport();
		
		console.log(data);
		console.log('action=simplify&language='+$('#powered').find('.active_language').html().toLowerCase()+'&data='+encodeURIComponent(data));

        if(data != null){
            showHideWaiting('show');
            $.ajax({
                type: "POST",
                url: this.serverscriptsfolder+'/simplify.php',
                data: 'action=simplify&language='+$('#powered').find('.active_language').html().toLowerCase()+'&data='+encodeURIComponent(data),
		        async: false,
                success: function(msg){
                    var response = jQuery.parseJSON(msg);
                    if(response['status'] == 'success'){
                        subwindowmanager.openSubwindow('solution', response['solution']);
			showHideWaiting('hide');
			wait_const = 1;
                    }else{
                        subwindowmanager.openSubwindow('alert',{'message':response['text'],'title':texts['SW_13']});
                        showHideWaiting('hide');
                    }
                }
            });
	
        }
		
    }

    /*
     * Dynamically loads the language to UI from server
     */
    this.loadLanguage = function(new_language){
        showHideWaiting('show');
        $.ajax({
            type: "POST",
            url: this.serverscriptsfolder+'/loadlanguage.php',
            data: 'action=loadlanguage&language='+new_language,
            success: function(msg){
                var response = jQuery.parseJSON(msg);
                if(response['status'] == 'success'){
                    texts = response['new_language'];
                    setNewLanguage();
                    showHideWaiting('hide');
                }else{
                    subwindowmanager.openSubwindow('alert',{
                        'message':response['text'],
                        'title':texts['SW_13']
                        });
                    showHideWaiting('hide');
                }
            }
        });
    }
}

