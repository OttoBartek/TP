function newScheme(){
    if (confirm('Are you sure you want to load a new scheme?')) {
        canvas.clear();
        scheme = {};
        counter = 0;
        order = 0;
        $.each(Object.keys(blockDrawData), function (i, nameBlock) {
            number[nameBlock] = 0;
        });
        return true;
    }
    else{
        return false;
    }
}

function cleanScheme(){
    canvas.clear();
    scheme = {};
    counter = 0;
    order = 0;
    $.each(Object.keys(blockDrawData), function (i, nameBlock) {
        number[nameBlock] = 0;
    });
}

function saveScheme(){
    //console.log("SAVING...");
    var jsonScheme = JSON.stringify(scheme, null, '\t');
    //console.log(jsonScheme);
    var textToSaveAsBlob = new Blob([jsonScheme], {type:"application/json"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileName = prompt("Input desired file name:", "model");

    if(fileName) {
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
    }
}

function destroyClickedElement(event){
    document.body.removeChild(event.target);
}

function loadModel(){
    if(newScheme()) {
        var valid = true;
        var fileToLoad = document.getElementById("fileToLoad").files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            if (scheme = JSON.parse(textFromFileLoaded)) {
                $.each(scheme, function (key, value) {
                    if (valid) {
                        if (key == 'schemeInfo') {

                            console.log(value.type,schemeType);

                            if (value.type != schemeType) {
                                window.alert("Wrong type of scheme.");
                                valid = false;
                                cleanScheme();
                                return;
                            }
                        }
                        if (this.hasOwnProperty("objectType") && this.objectType === "block") {
                            drawBlockFromScheme(this.NameOfBlock);
                            counter++;
                            number[this.BlockType]++;
                        }
                    }
                });
                if (valid) {
                    $.each(scheme, function (key, value) {
                        if (this.hasOwnProperty("objectType") && this.objectType === "line") {
                            var from = getObject(this.From);
                            var to = getObject(this.To);
                            var beginBlockOrder = scheme[this.From].ZOrder;
                            var endBlockOrder = scheme[this.To].ZOrder;
                            var dstPort = parseInt(this.Dst.substr(this.Dst.length - 1, this.Dst.length));
                            var typeConnection = this.typeConnection;
                            var fromPort = this.fromPort;
                            order = this.ZOrder;

                            var lineA = createLine(from, to, beginBlockOrder, endBlockOrder, typeConnection, fromPort, scheme[to.type].NumberOfInputs, dstPort);
                            canvas.add(lineA);

                            //console.log(scheme[this.ToPort]);
                            scheme[this.ToPort].full = true;
                            scheme[this.ToPort].connectedLine = lineA.type;

                            //lineA.sendToBack();


                            var deletePointA = createDeletePoint(from, to, order, dstPort);
                            canvas.add(deletePointA);

                            canvas.on('object:moving', function (e) {
                                redrawLine(e.target, fromPort);
                                canvas.renderAll();
                            });
                        }
                        else if (this.hasOwnProperty("objectType") && this.objectType === "connection_point") {
                            var linePointA = createConnectionPoint(getObject(this.parentObject), this.ZOrder, scheme[this.parentLine].fromPort);
                            canvas.add(linePointA);
                        }
                    });
                    $('#fileLoadModal').modal('hide');
                    window.alert('Model loaded!');
                }

                // $.each(scheme, function (key, value) {
                //     if(this.hasOwnProperty("objectType") && this.objectType === "connection_point"){
                //         var linePointA = createConnectionPoint(getObject(this.parentObject), this.ZOrder);
                //         canvas.add(linePointA);
                //     }
                // });
            }
        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }
}

function drawBlockFromScheme(targetBlock){
    //console.log("target block: "+targetBlock);
    var x = scheme[targetBlock].Position_Array[0];
    var y = scheme[targetBlock].Position_Array[1];
    var blockType = scheme[targetBlock].BlockType;
    var blockOrder = scheme[targetBlock].ZOrder;
    var blockName = targetBlock;
    var numberOfInputs = scheme[blockName].NumberOfInputs;
    var visibleName = scheme[blockName].VisibleName;
    var blockNumber = blockName.substr(blockName.length-1, blockName.length);
    var blockRotation = scheme[blockName].Rotation;

    scheme[blockName].Rotation = 0;

    var objBlock = blockDrawData[blockType];
    var parBlock = blockParameters[blockType];
    var type = blockType + blockNumber;
    var partBlock = [];

    $.each(objBlock, function(i,subBlock) {
        if(subBlock.type === 'rect')
            partBlock[i] = new fabric.Rect(subBlock.data);
        else if(subBlock.type === 'path')
            partBlock[i] = new fabric.Path(subBlock.path, subBlock.data);
        else if(subBlock.type === 'triangle')
            partBlock[i] = new fabric.Triangle(subBlock.data);
        else if(subBlock.type === 'circle')
            partBlock[i] = new fabric.Circle(subBlock.data);
        else if(subBlock.type === 'text')
            partBlock[i] = new fabric.IText(subBlock.Text, subBlock.data);
        else if(subBlock.type === 'name')
            partBlock[i] = new fabric.IText(visibleName, subBlock.data);
    });

    var io = data[blockType][0].io;
    var ports = data[blockType][0].ports;
    //console.log("ports: "+ports);
    var block = new fabric.Group(partBlock, {baseBlock:1, type: type, left: x, top: y, io: io, ports: ports, numberOfInputs: numberOfInputs, ZOrder: blockOrder, "BlockType" : blockType});
    block.hasBorders = block.hasControls = false;
    canvas.add(block);

    var addPort;

    if(io === 'out' || io === 'both') {
        var outPart = new fabric.Triangle({
            left: x + block.width + 5, top: y + block.height/2-15,
            angle:90,
            lockMovementX: true, lockMovementY: true,
            width: 10, height: 10, fill: 'black',
            hoverCursor: 'pointer',
            hasControls: false, hasBorders: false,
            type: type + 'O',
            Out: 1
        });
        canvas.add(outPart);
    }
    if (io === 'in' || io === 'both') {
        if (numberOfInputs === 1 || blockType === 'Point') {
            var inPart = new fabric.Triangle({
                left: x + 1, top: y + block.height / 2 - 15,
                angle: 90,
                lockMovementX: true, lockMovementY: true,
                width: 10, height: 10, fill: 'black',
                hoverCursor: 'pointer',
                hasControls: false, hasBorders: false,
                type: type + 'I',
                In: 1
            });
            canvas.add(inPart);
            addPort = {[type+'I'] : {
                "parentBlock":type,
                "portName":type+'I',
                "portNumber":1,
                "full":false
            }
            };
            scheme = $.extend(scheme, addPort);
        } else if (numberOfInputs > 1) {
            inPosition = block.height/numberOfInputs - (block.height/numberOfInputs/2) + 3;
            for (var i = 1; i <= numberOfInputs; i++) {
                var position = y + (i * inPosition) - 14;
                var inPart = new fabric.Triangle({
                    left: x + 1, top: position,
                    angle: 90,
                    lockMovementX: true, lockMovementY: true,
                    width: 10, height: 10, fill: 'black',
                    hoverCursor: 'pointer',
                    hasControls: false, hasBorders: false,
                    type: type + 'I' + i,
                    In: 1
                });

                canvas.add(inPart);

                addPort = {[type+'I'+i] : {
                    "parentBlock":type,
                    "portName":type+'I'+i,
                    "portNumber":i,
                    "full":false
                }
                };
                scheme = $.extend(scheme, addPort);
            }
        }
    }
    if(ports === 'top' || ports === 'both') {
        var topPart = new fabric.Rect({
            left: x + block.width/2-8, top: y-15,
            lockMovementX: true, lockMovementY: true,
            width: 10, height: 10, fill: 'black',
            hoverCursor: 'pointer',
            hasControls: false, hasBorders: false,
            type: type + 'T',
            TopPort: 1
        });
        canvas.add(topPart);
    }
    if(ports === 'bot' || ports === 'both') {
        var botPart = new fabric.Rect({
            left: x + block.width/2-8, top: y + block.height - 15,
            lockMovementX: true, lockMovementY: true,
            width: 10, height: 10, fill: 'black',
            hoverCursor: 'pointer',
            hasControls: false, hasBorders: false,
            type: type + 'B',
            BotPort: 1
        });
        canvas.add(botPart);
    }

    rotateObject(getObject(blockName),blockRotation);

    if(blockType == "Multiply"){
        drawequation(getObject(blockName),scheme[type].extra[0].split(" "),scheme[type].extra[1].split(" "))
    }
}

function setSchemeType(type){
    schemeType = type;
    if(!scheme.hasOwnProperty("schemeInfo")){
        var typeOfScheme = {["schemeInfo"] : {
            "type" : type
        }
        };
        scheme = $.extend(scheme, typeOfScheme);
    }
}