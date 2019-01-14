function getOutput(){
    if(schemeType === 'rlc'){
        var nodes = [];
        var branches = [];
        //matica elementov
        var elementVector = [];

        $.each(scheme, function (key, value) {
            if(key.substr(0,5) === 'Point' && value.objectType == 'block'){
                nodes.push(this);
            }
            else if(key.substr(0,3) === 'Uin' && value.objectType == 'block'){
                branches.push(this);
            }
        });

        $.each(scheme, function (key, value) {
            if(value.objectType == 'block' && key.substr(0,4) !== 'Uout' && key.substr(0,3) !== 'Uin' && key.substr(0,5) !== 'Point'){
                branches.push(this);
            }
        });

        $.each(scheme, function (key, value) {
            if(value.objectType == 'block' && key.substr(0,4) === 'Uout'){
                branches.push(this);
            }
        });

        //vystupna matica elementov
        $.each(branches, function (key, value) {
            elementVector.push(value.VisibleName);
        });

        //console.log(objectsOutput);
        //console.log(objects);

        if(nodes.length > 0 && branches.length > 0) {
            var matrix = createArray(nodes.length, branches.length);

            for(var x = 0; x < nodes.length; x++){
                matrix[x].fill(0);
            }

            $.each(nodes, function (key, value) {
                var row = parseInt(key);
                $.each(value.connectedToBlocks, function (key, value) {
                    var objectName = value;
                    $.each(branches, function(key,value){
                        if(objectName === value.NameOfBlock){
                            var col = parseInt(key);
                            matrix[row][col] = 1;
                        }
                    });
                });
                $.each(value.connectedFromBlocks, function (key, value) {
                    var objectName = value;
                    $.each(branches, function(key,value){
                        if(objectName === value.NameOfBlock){
                            var col = parseInt(key);
                            matrix[row][col] = 1;
                        }
                    });
                });
            });

            // console.log(matrix.length);
            // console.log(matrix[0].length);

            var modalData;

            modalData = '<h3>Incidence matrix</h3><p>';
            for(var r = 0; r < matrix.length; r++){
                for (var c = 0; c < matrix[0].length; c++){
                    modalData += matrix[r][c]+" ";
                }
                modalData += '<br>';
            }
            modalData += '</p>';

            modalData += '<h3>Elements</h3><p>[ ';
            for(var o = 0; o < elementVector.length; o++){
                modalData += elementVector[o]+" ";
            }
            modalData += ']</p>';

            $('#outputModal .modal-body').html(modalData);
            $('#outputModal .modal-header .modal-title').text('Solution');
            $("#outputModal").draggable({
                handle: ".modal-header"
            });
            $('#outputModal').modal();

            // console.log(nodes);
            // console.log(objects);
            // console.log(matrix);
            // console.log(objectsOutput);
            nodes = [];
            branches = [];
            elementVector = [];
        }
    }

    if(schemeType === 'algebra'){
        getDiagramResponse();
    }

    if(schemeType === 'blockSim'){
        exportScheme();
    }
}

function exportScheme(){
    var fileName = "NewScheme";
    var json = '';
    var scriptName = "export.php";
    var format = 'mdl';
    var runSimulation = false;
    var blockID = 0;
    var lineID = 0;

    json += '"modelName": "' + fileName + '",\n';
    json += '"systemName": "' + fileName + '",\n';
    json += '"version": "7.0",\n';
    json += '"creator": "schemeDP",\n';
    json += '"created": "Sun Apr 15 17:12:15 2018",\n';
    json += '"width": "' + canvas.width + '",\n';
    json += '"height": "' + canvas.height + '",\n';
    json += '"mdlFile": "",\n';
    json += '"blocks": [';

    $.each(scheme,function(name,block){
        if (block.objectType === 'block') {
            json += '\n{"id": "' + block.NameOfBlock + '",\n"name": "' + block.BlockType + '",\n"type": "' + block.BlockType + '",\n"x": "' + block.Position_Array[0] + '",\n"y": "' + block.Position_Array[1] + '",\n"version": "0",\n"axis": "",\n';
            json += '"attributes": {\n ';
            if(block.extra) {
                for (var i = 0; i < block.extra.length; i++) {
                    json += '"' + block.attributes[i] + '": "' + block.extra[i] + '",';
                }
            }
            json = json.slice(0,-1);
            json += '\n';
            json += '}},';
        }
        if(block.objectType === 'connection_point'){
            json += '\n{"id": "' + name + '",\n"name": "pseudo_diverging",\n"type": "pseudo_diverging",\n"x": "0",\n"y": "0",\n"version": "0",\n"axis": "",\n';
            json += '"attributes": {\n';
            json += '}},';
        }
    });
    json = json.slice(0, -1);
    json += '],\n';
    json += '"connections": [ ';
    $.each(scheme,function(name,block){
        if (block.objectType === 'line') {
            json += '\n{"id": "' + name + '",\n"startBlockId": "' + block.From + '",\n"startPoint": "E",\n"endBlockId": "' + block.To + '",\n"endPoint": "W"},';
        }
    });
    json = json.slice(0, -1);
    json += ']';

    json = '{\n' + json + '\n}';
    //console.log(json);

    // json += '{\n' +
    //     '"modelName": "NewScheme",\n' +
    //     '"systemName": "NewScheme",\n' +
    //     '"version": "7.0",\n' +
    //     '"creator": "schemeDP",\n' +
    //     '"created": "Sun Apr 15 17:12:15 2018",\n' +
    //     '"width": "531",\n' +
    //     '"height": "932",\n' +
    //     '"mdlFile": "",\n' +
    //     '"blocks": [\n' +
    //     '{"id": "AnalogInput1",\n' +
    //     '"name": "AnalogInput",\n' +
    //     '"type": "AnalogInput",\n' +
    //     '"x": "105",\n' +
    //     '"y": "105",\n' +
    //     '"version": "0",\n' +
    //     '"axis": "",\n' +
    //     '"attributes": {\n' +
    //     '}}],\n' +
    //     '"connections": []\n' +
    //     '}';
    //
    // console.log(json);

    $.ajax({
        type: "POST",
        url: "http://www.iolab.sk:8031/modifikaciaschem/actions/" + scriptName,
        data: "fileName=" + fileName + "&runSimulation=" + runSimulation + "&json=" + json,
        cache: false,
        success: function(data) {
            var form = '';
            form += '<p>'+data+'</p>';
            $('#outputModal .modal-body').html(data);
            $('#outputModal .modal-header .modal-title').text('Model export');
            $("#outputModal").draggable({
                handle: ".modal-header"
            });
            $('#outputModal').modal();
            //console.log('succesful');
        },
        error: function(data) { console.log("ERROR: Could not save the scheme."); }
    });
}

function getDiagramResponse(){
    var data = prepareDataForExport();

    //console.log(data);
    // console.log('action=simplify&language=sk&data='+encodeURIComponent(data));
    // console.log(encodeURIComponent(data));

    if(data != null){
        $.ajax({
            type: "POST",
            url: 'http://147.175.105.140:8031/riesenieblokovychschem/serverscripts/simplify.php',
            data: 'action=simplify&language=sk&data='+encodeURIComponent(data),
            async: false,
            success: function(msg){
                var response = jQuery.parseJSON(msg);
                if(response['status'] == 'success'){
                    //console.log('simplify success');
                    //console.log(response['solution']);
                    var modalData;

                    modalData = '<h3>Solution (TeX)</h3><p id="solution-tex"></p>';
                    elementID = "solution-tex";
                    inputValue = response['solution']['solutiontex'];
                    modalData += '<h3>Solution (Text)</h3><p>';
                    modalData += response['solution']['solutiontext']+'</p>';
                    $('#outputModal .modal-body').html(modalData);
                    if(element = document.getElementById(elementID)){
                        katex.render(inputValue, element);
                    }
                    $('#outputModal .modal-header .modal-title').text('Solution');
                    $("#outputModal").draggable({
                        handle: ".modal-header"
                    });
                    $('#outputModal').modal();
                }else{
                    //console.log(response);
                    //console.log("simplify failed");
                    window.alert("Riešenie zlyhalo, skontrolujte schému.");
                }
            }
        });
    }

}

function prepareDataForExport(){
    var blockName;
    var JSON_blocks = '{\n "block_diagram":{\n  "name":"diagram"';
    JSON_blocks += ',\n  "counter":'+counter;
    JSON_blocks += ',\n  "canvas":{\n   "width":'+canvas.width+',\n   "height":'+canvas.height+'\n  }';
    JSON_blocks += ',\n  "blocks":{';
    $.each(scheme,function(name,block){
        if(block.objectType === 'block') {
            if(block.BlockType === 'IOin' || block.BlockType === 'IOout'){
                blockName = 'io';
            }else{
                blockName = block.BlockType.toLowerCase()
            }
            JSON_blocks += '\n   "' + block.NameOfBlock + '":{\n    "block_type":"' + blockName + '",\n    ';
            JSON_blocks += '"position_x":'+block.Position_Array[0]+',\n    "position_y":'+block.Position_Array[1]+',';

            switch(block.BlockType){
                case 'Multiply':
                    JSON_blocks += '\n    "numerator":"'+block.extra[0]+'",\n    "denominator":"'+block.extra[1]+'",';
                    break;
                case 'Sumator':
                    JSON_blocks += '\n    "input_1_signum":"'+block.extra[0]+'",\n    "input_2_signum":"'+block.extra[1]+'",';
                    break;
                case 'IOin':
                    JSON_blocks += '\n    "type":"input",';
                    break;
                case 'IOout':
                    JSON_blocks += '\n    "type":"output",';
                    break;
                default:
                    alert('Debug: blockmanager blocks JSON export error!');
            }
            var emptyPinCount = 0;
            if(block.NumberOfOutputs > 0){
                emptyPinCount += block.NumberOfOutputs - block.NumberOfFullOutputs;
            }
            if(block.NumberOfInputs > 0){
                emptyPinCount += block.NumberOfInputs - block.NumberOfFullInputs;
            }
            JSON_blocks += '\n    "empty_pin_count":'+emptyPinCount+',\n    "pins":{';

            switch(block.BlockType){
                case 'Multiply':
                    var inName = block.NameOfBlock+'I';
                    var out = "";
                    var inp = "";
                    if(scheme[inName].connectedLine !== ""){
                        out = "output";
                    }
                    if(scheme[block.NameOfBlock].outLine !== ""){
                        inp = "input";
                    }
                    JSON_blocks += '\n     "pin1":{\n      "type":"output",\n      "location":"right",\n      "connected_to_block":"'+scheme[block.NameOfBlock].outLine+'",\n      "connected_to_pin":"'+inp+'"\n     },';
                    JSON_blocks += '\n     "pin2":{\n      "type":"input",\n      "location":"left",\n      "connected_to_block":"'+scheme[inName].connectedLine+'",\n      "connected_to_pin":"'+out+'"\n     },';
                    break;
                case 'Sumator':
                    var inName1 = block.NameOfBlock+'I1';
                    var inName2 = block.NameOfBlock+'I2';
                    var out = "";
                    var out2 = "";
                    var inp = "";
                    if(scheme[inName1].connectedLine !== ""){
                        out = "output";
                    }
                    if(scheme[inName2].connectedLine !== ""){
                        out2 = "output";
                    }
                    if(scheme[block.NameOfBlock].outLine !== ""){
                        inp = "input";
                    }
                    JSON_blocks += '\n     "pin1":{\n      "type":"output",\n      "location":"right",\n      "connected_to_block":"'+scheme[block.NameOfBlock].outLine+'",\n      "connected_to_pin":"'+inp+'"\n     },';
                    JSON_blocks += '\n     "pin2":{\n      "type":"input",\n      "location":"left",\n      "connected_to_block":"'+scheme[inName1].connectedLine+'",\n      "connected_to_pin":"'+out+'"\n     },';
                    JSON_blocks += '\n     "pin3":{\n      "type":"input",\n      "location":"left",\n      "connected_to_block":"'+scheme[inName2].connectedLine+'",\n      "connected_to_pin":"'+out2+'"\n     },';
                    break;
                case 'IOin':
                    var inp = "";
                    if(scheme[block.NameOfBlock].outLine !== ""){
                        inp = "input";
                    }
                    JSON_blocks += '\n     "pin1":{\n      "type":"output",\n      "location":"right",\n      "connected_to_block":"'+scheme[block.NameOfBlock].outLine+'",\n      "connected_to_pin":"'+inp+'"\n     },';
                    break;
                case 'IOout':
                    var inName = block.NameOfBlock+'I';
                    var out = "";
                    if(scheme[inName].connectedLine !== ""){
                        out = "output";
                    }
                    JSON_blocks += '\n     "pin1":{\n      "type":"input",\n      "location":"left",\n      "connected_to_block":"'+scheme[inName].connectedLine+'",\n      "connected_to_pin":"'+out+'"\n     },';
                    break;
                default:
                    alert('Debug: blockmanager blocks JSON export error!');
            }
            JSON_blocks = JSON_blocks.slice(0, -1);
            JSON_blocks += '\n    }\n   },';
        }
        if(block.objectType === 'line'){
            var connectedTo = "";
            if(block.To.substr(0,block.To.length-1) === 'IOout'){
                connectedTo = "pin1";
            }
            else if(scheme[block.To].NumberOfInputs === 1){
                connectedTo = "pin2";
            }
            else if(scheme[block.To].NumberOfInputs > 1){
                var portNum = block.Dst.substr(block.Dst.length-1,block.Dst.length);
                portNum++;
                connectedTo = "pin"+portNum;
            }

            JSON_blocks += '\n   "' + name + '":{\n    "block_type":"' + block.objectType + '",\n    ';
            JSON_blocks += '"position_x":0,\n    "position_y":0,';
            JSON_blocks += '\n    "empty_pin_count":0,\n    "pins":{';
            JSON_blocks += '\n     "input":{\n      "type":"undefined",\n      "location":"undefined",\n      "connected_to_block":"'+block.From+'",\n      "connected_to_pin":"pin1"\n     },';
            JSON_blocks += '\n     "output":{\n      "type":"undefined",\n      "location":"undefined",\n      "connected_to_block":"'+block.To+'",\n      "connected_to_pin":"'+connectedTo+'"\n     },';

            JSON_blocks = JSON_blocks.slice(0, -1);
            JSON_blocks += '\n    }\n   },';
        }
        if(block.objectType === 'connection_point'){
            JSON_blocks += '\n   "' + name + '":{\n    "block_type":"junction",\n    ';
            JSON_blocks += '"position_x":0,\n    "position_y":0,';
            var emptyPinCount = 1;
            if(block.NumberOfOutputs > 0){
                emptyPinCount += block.NumberOfOutputs - block.NumberOfFullOutputs;
            }
            JSON_blocks += '\n    "empty_pin_count":'+emptyPinCount+',\n    "pins":{';
            JSON_blocks += '\n     "pin1":{\n      "type":"output",\n      "location":"bottom",\n      "connected_to_block":"",\n      "connected_to_pin":""\n     },';
            JSON_blocks += '\n     "pin2":{\n      "type":"output",\n      "location":"top",\n      "connected_to_block":"'+scheme[name].outLine+'",\n      "connected_to_pin":"input"\n     },';
            JSON_blocks += '\n     "pin3":{\n      "type":"output",\n      "location":"right",\n      "connected_to_block":"'+scheme[name].parentLine+'",\n      "connected_to_pin":"input"\n     },';
            JSON_blocks += '\n     "pin4":{\n      "type":"input",\n      "location":"left",\n      "connected_to_block":"'+scheme[name].parentLine+'",\n      "connected_to_pin":"output"\n     },';

            JSON_blocks = JSON_blocks.slice(0, -1);
            JSON_blocks += '\n    }\n   },';
        }
    });
    JSON_blocks = JSON_blocks.slice(0, -1);
    JSON_blocks += '\n  }\n }\n}';

    //console.log(JSON_blocks);
    return JSON_blocks;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}