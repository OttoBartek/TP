var scheme = {};
var number = {};
var counter = 0;
var schemeType;
$.each(Object.keys(blockDrawData),function(i,nameBlock){
    number[nameBlock] = 0;
});

var posCanvas = 100; var posy = posCanvas;
canvas.selection=false;
data = blockParameters;
portPos = portPositions;
var connToBlock, connFromBlock, connPointIn;
var inPosition, movingInPosition;

window.addBlock = function (blockType, posx, posy) {

    posx -=posCanvas;
    counter++;
    number[blockType]++;

    var objBlock = blockDrawData[blockType];
    var parBlock = blockParameters[blockType];
    var type = blockType + number[blockType];
    var partBlock = [];
    var portPos = portPositions[blockType][0];

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
            partBlock[i] = new fabric.IText(type, subBlock.data);
    });

    //console.log(type);

    if(data[blockType][0].hasExtra){
        var extraData = data[blockType][0].defaultExtra;
    }else{
        var extraData = null;
    }

    if(data[blockType][0].hasAttr){
        var attributes = data[blockType][0].attributes;
    }else{
        var attributes = null;
    }

    var io = data[blockType][0].io;
    var ports = data[blockType][0].ports;

    var numberOfInputs = parBlock[0].NumberOfInputs;
    var block = new fabric.Group(partBlock, {baseBlock:1, type: type, left: posx, top: posy, io: io, ports: ports, numberOfInputs: numberOfInputs, ZOrder: counter, "BlockType" : blockType});
    block.hasBorders = block.hasControls = false;
    canvas.add(block);
    var addPort;

    if(io === 'out' || io === 'both') {

        var outPart = new fabric.Triangle({
            // left: posx + block.width + 5, top: posy + block.height/2-15,
            left: posx + portPos.out.left, top: posy + portPos.out.top,
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
                left: posx + portPos.in.left, top: posy + portPos.in.top,
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
                "connectedLine": "",
                "parentBlock":type,
                "portName":type+'I',
                "portNumber":1,
                "full":false
                }
            };
            scheme = $.extend(scheme, addPort);
        } else if (numberOfInputs > 1) {
            for (var i = 1; i <= numberOfInputs; i++) {
                var inPart = new fabric.Triangle({
                    left: posx + portPos.in[i-1].left, top: posy + portPos.in[i-1].top,
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
                    "connectedLine": "",
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
            left: posx + block.width/2-8, top: posy-10,
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
            left: posx + block.width/2-8, top: posy + block.height - 21,
            lockMovementX: true, lockMovementY: true,
            width: 10, height: 10, fill: 'black',
            hoverCursor: 'pointer',
            hasControls: false, hasBorders: false,
            type: type + 'B',
            BotPort: 1
        });
        canvas.add(botPart);
    }



    var posLXT = posx;
    var posLYT = posy;
    var posRXB = posx + block.width;
    var posRYB = posy + block.height;
    var addObj = {[type] : {
            "ZOrder" : counter,
            "NameOfBlock": type,
            "VisibleName": type,
            "BlockType" : blockType ,
            "Position_Array": [posLXT, posLYT, posRXB, posRYB],
            "Rotation":0,
            "NumberOfOutputs": data[blockType][0].NumberOfOutputs,
            "NumberOfInputs": data[blockType][0].NumberOfInputs,
            "MaxInputs": data[blockType][0].MaxInputs,
            "NumberOfFullOutputs": 0,
            "NumberOfFullInputs": 0,
            "NumOfTop": data[blockType][0].NumOfTop,
            "NumOfBot": data[blockType][0].NumOfBot,
            "outLine": "",
            "inLine": "",
            "connectedLines":[],
            "TopFull":false,
            "BotFull":false,
            "io": io,
            "ports":ports,
            "objectType":"block",
            "extra":extraData,
            "attributes":attributes,
            "connectedToBlocks":[],
            "connectedFromBlocks":[]
        }
    };

    scheme = $.extend(scheme, addObj);
    //console.log(scheme);
    //console.log(addObj)

    if(blockType === 'Multiply')
        scheme[type].tex_result = 'F';
};

var selectedElement = null;

//selection control
//on object selected
canvas.on('object:selected', function(options) {
    selectedElement = options.target;
    $.each(selectedElement._objects, function (name, property) {
        if(!property.text) {
            if(!property.hasOwnProperty('invisible')){
                property.set({'stroke': 'red'});
            }
        }
    });
    canvas.renderAll();
});

//on click off block
canvas.on('selection:cleared', function(options) {
    $.each(selectedElement._objects, function (name, property) {
        if(!property.text) {
            if(!property.hasOwnProperty('invisible')){
                property.set({'stroke': 'black'});
            }
        }
    });
    selectedElement = null;
});

//on target block change
canvas.on('selection:updated', function(options) {
    $.each(selectedElement._objects, function (name, property) {
        if(!property.text) {
            if(!property.hasOwnProperty('invisible')){
                property.set({'stroke': 'black'});
            }
        }
    });
    selectedElement = null;
    selectedElement = options.target;
    $.each(selectedElement._objects, function (name, property) {
        if(!property.text) {
            if(!property.hasOwnProperty('invisible')){
                property.set({'stroke': 'red'});
            }
        }
    });
});
//!selection control

var cornerLXT, cornerLYT, cornerRXB, cornerRYB;

//object movement
canvas.on('object:moving', function(e) {
    //top/bot ports

    var rot = scheme[selectedElement.type].Rotation;
    var portPos = portPositions[selectedElement.BlockType][rot];

    canvas.forEachObject(function(obj) {
        if(obj.type === selectedElement.type + 'IMG') {
            obj.left = cornerLXT + 1;
            obj.top = cornerLYT+5;
            obj.setCoords();
        }
    });

    if(selectedElement.ports){
        cornerLXT = selectedElement.left;
        cornerLYT = selectedElement.top;
        cornerRXB = cornerLXT + selectedElement.width;
        cornerRYB = cornerLYT + selectedElement.height;

        selectedElement.set({left: cornerLXT,top: cornerLYT});

        if(selectedElement.ports === 'top' || selectedElement.ports === 'both') {
            canvas.forEachObject(function(obj) {
                if(obj.type === selectedElement.type + 'T') {
                    obj.left = cornerLXT + selectedElement.width/2 - 8;
                    obj.top = cornerLYT - 15;
                    obj.setCoords();
                }
            });
        }
        if(selectedElement.ports === 'bot' || selectedElement.ports === 'both') {
            canvas.forEachObject(function(obj) {
                if(obj.type === selectedElement.type + 'B') {
                    obj.left = cornerLXT + selectedElement.width/2 - 8;
                    obj.top = cornerLYT + selectedElement.height - 15;
                    obj.setCoords();
                }
            });
        }
    }
    //in/out
    if (selectedElement.io) {
        cornerLXT = selectedElement.left;
        cornerLYT = selectedElement.top;
        cornerRXB = cornerLXT + selectedElement.width;
        cornerRYB = cornerLYT + selectedElement.height;

        selectedElement.set({left: cornerLXT,top: cornerLYT});

        if(selectedElement.io === 'out' || selectedElement.io === 'both') {
            canvas.forEachObject(function(obj) {
                if(obj.type === selectedElement.type + 'O') {
                    obj.left = cornerLXT + portPos.out.left;
                    obj.top = cornerLYT + portPos.out.top;
                    obj.setCoords();
                }
            });
        }
        if(selectedElement.io === 'in' || selectedElement.io === 'both') {

            if(selectedElement.numberOfInputs === 1 || selectedElement.BlockType === 'Point') {
                canvas.forEachObject(function (obj) {
                    if (obj.type === selectedElement.type + 'I') {
                        obj.left = cornerLXT + portPos.in.left;
                        obj.top = cornerLYT + portPos.in.top;
                        obj.setCoords();
                    }
                });
            }
            else if(selectedElement.numberOfInputs > 1){
                movingInPosition = selectedElement.height/selectedElement.numberOfInputs - (selectedElement.height/selectedElement.numberOfInputs/2) + 3;
                for(var i = 1; i <= selectedElement.numberOfInputs; i++) {
                    canvas.forEachObject(function (obj) {
                        if (obj.type === selectedElement.type + 'I' + i) {
                            obj.left = cornerLXT + portPos.in[i-1].left;
                            obj.top = cornerLYT + portPos.in[i-1].top;;
                            obj.setCoords();
                        }
                    });
                }
            }
        }
    }
    rotateObject(selectedElement,0);

    if(e.target.baseBlock){
        scheme[e.target.type].Position_Array[0] = e.target.left;
        scheme[e.target.type].Position_Array[1] = e.target.top;
    }
});

var isDown = false;
var order = 0;
var lineName;

//control logs
canvas.on('object:added', function (e) {
    if(scheme){
        //console.log("added: "+e.target.type)
        //console.log(scheme);
    }
});

//mouse over object | tmpLine | connect objects
canvas.on('mouse:over', function(e) {
    if(e.target !== null) {
        if(e.target.baseBlock && e.target.BlockType === 'Multiply'){
            var x = document.getElementById("snackbar");
            var inputValue = scheme[e.target.type].tex_result;
            katex.render(inputValue, x);
            x.className = "show";
        }
        else if(e.target.In) {
            e.target.set({fill:'gray'});
            //console.log("scheme: "+scheme[e.target.type].parentBlock);
            canvas.renderAll();
        }
        else if(e.target.Out)
        {
            e.target.set({fill: 'gray'});
            canvas.renderAll();

            canvas.on('mouse:down', function(o) {
                isDown = true;
                selectedElement = connFromBlock = getMainObject(e.target.type);
                var x = connFromBlock.left; var y = connFromBlock.top;
                var width = connFromBlock.width; var height = connFromBlock.height;

                if(scheme[selectedElement.type].Rotation === 0) {
                    var ccaLeft = x + width;
                    var ccaTop = y + height / 2 - 10;
                }
                else if(scheme[selectedElement.type].Rotation === 90){
                    if(schemeType === 'rlc'){
                        var ccaLeft = x-5;
                        var ccaTop = y + width;
                    }
                    else if(schemeType === 'schema2'){
                        var ccaLeft = x+width/2-5;
                        var ccaTop = y+height-4;
                    }
                    else{
                        var ccaLeft = x+width/2-5;
                        var ccaTop = y+height-15;
                    }
                }
                else if(scheme[selectedElement.type].Rotation === 180){
                    var ccaLeft = x-5;
                    var ccaTop = y + height / 2 - 8;
                }
                else if(scheme[selectedElement.type].Rotation === 270){
                    if(schemeType === 'rlc'){
                        var ccaLeft = x+5;
                        var ccaTop = y - width - 3;
                    }
                    else{
                        var ccaLeft = x+width/2;
                        var ccaTop = y-10;
                    }
                }
                var points = [ccaLeft, ccaTop, ccaLeft, ccaTop];
                newLine = new fabric.Line(points, {
                    strokeWidth: 1,
                    stroke: 'cyan',
                    type: 'temporaryLine'
                });
                canvas.add(newLine);
            });

            canvas.on('mouse:move', function(o) {
                if(!isDown){return;}
                var pointer = canvas.getPointer(o.e);
                newLine.set({ x2: pointer.x, y2: pointer.y });
                canvas.renderAll();
            });

            canvas.on('mouse:up', function(o) {
                var pointer = canvas.getPointer(o.e);
                canvas.forEachObject(function (obj) {
                    if(obj.In){
                        if(obj.angle === 360){
                            if (Math.abs(pointer.x - obj.left - 5) < 3 && Math.abs(pointer.y - obj.top - 5) < 15) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }
                        else if(obj.angle === 90) {
                            if (Math.abs(pointer.x - obj.left - 5) < 15 && Math.abs(pointer.y - obj.top - 5) < 3) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }
                        else if(obj.angle === 180){
                            if (Math.abs(pointer.x - obj.left + 5) < 3 && Math.abs(pointer.y - obj.top - 5) < 15) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }
                        else if(obj.angle === 270) {
                            if (Math.abs(pointer.x - obj.left - 5) < 15 && Math.abs(pointer.y - obj.top + 5) < 3) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }

                    }
                });

                var options = connToBlock;
                deleteLastObject();

                if((selectedElement && options) && (selectedElement !== options)) {
                    //console.log("out: " + scheme[selectedElement.type].ZOrder+" in: "+scheme[options.type].ZOrder);
                    if(options.BlockType === 'Point') {
                        if(options.BlockType !== selectedElement.BlockType) {
                            if (scheme[selectedElement.type].NumberOfFullOutputs < scheme[selectedElement.type].NumberOfOutputs && scheme[options.type].NumberOfFullInputs < scheme[options.type].NumberOfInputs) {
                                var beginBlockOrder = scheme[selectedElement.type].ZOrder;
                                var endBlockOrder = scheme[options.type].ZOrder;
                                order++;

                                var lineA = createLine(selectedElement, options, beginBlockOrder, endBlockOrder, 'block', 'out', scheme[options.type].NumberOfInputs, scheme[connPointIn].portNumber);
                                canvas.add(lineA);
                                lineName = 'line' + order;

                                scheme[selectedElement.type].connectedToBlocks.push(options.type);
                                scheme[options.type].connectedFromBlocks.push(selectedElement.type);

                                //data prep
                                scheme[selectedElement.type].outLine = lineName;
                                scheme[options.type].inLine = lineName;
                                var NumOut = scheme[selectedElement.type].NumberOfFullOutputs;
                                scheme[selectedElement.type].NumberOfFullOutputs = NumOut + 1;
                                // scheme[connPointIn].full = true;
                                var NumIn = scheme[options.type].NumberOfFullInputs;
                                scheme[options.type].NumberOfFullInputs = NumIn + 1;

                                var lines = {
                                    [lineName]: {
                                        "ZOrder": order,
                                        "Src": selectedElement.ZOrder + "#out:" + scheme[selectedElement.type].NumberOfFullOutputs,
                                        "Dst": options.ZOrder + "#in:" + scheme[connPointIn].portNumber,
                                        "From": selectedElement.type,
                                        "To": options.type,
                                        "ToPort": scheme[connPointIn].portName,
                                        "Typ": "simple",
                                        "hasPoint": false,
                                        "objectType": "line",
                                        "typeConnection": "block",
                                        "fromPort": "out"
                                    }
                                };
                                scheme = $.extend(scheme, lines);
                                lineA.sendToBack();

                                scheme[selectedElement.type].connectedLines.push(lineName);
                                scheme[options.type].connectedLines.push(lineName);

                                var deletePointA = createDeletePoint(selectedElement, options, order, scheme[connPointIn].portNumber);
                                canvas.add(deletePointA);

                                canvas.on('object:moving', function (e) {
                                    redrawLine(e.target, 'out');
                                    canvas.renderAll();
                                });
                            } else {
                                window.alert("Port full!");
                            }
                        }
                    }

                    else {
                        if (scheme[selectedElement.type].NumberOfFullOutputs < scheme[selectedElement.type].NumberOfOutputs && !scheme[connPointIn].full) {
                            var beginBlockOrder = scheme[selectedElement.type].ZOrder;
                            var endBlockOrder = scheme[options.type].ZOrder;
                            order++;

                            var lineA = createLine(selectedElement, options, beginBlockOrder, endBlockOrder, 'block', 'out', scheme[options.type].NumberOfInputs, scheme[connPointIn].portNumber);
                            canvas.add(lineA);
                            lineName = 'line' + order;

                            scheme[selectedElement.type].connectedToBlocks.push(options.type);
                            scheme[options.type].connectedFromBlocks.push(selectedElement.type);

                            //data prep
                            scheme[selectedElement.type].outLine = lineName;
                            scheme[options.type].inLine = lineName;
                            var NumOut = scheme[selectedElement.type].NumberOfFullOutputs;
                            scheme[selectedElement.type].NumberOfFullOutputs = NumOut + 1;
                            scheme[connPointIn].full = true;
                            var NumIn = scheme[options.type].NumberOfFullInputs;
                            scheme[options.type].NumberOfFullInputs = NumIn + 1;
                            scheme[connPointIn].connectedLine = lineName;

                            var lines = {
                                [lineName]: {
                                    "ZOrder": order,
                                    "Src": selectedElement.ZOrder + "#out:" + scheme[selectedElement.type].NumberOfFullOutputs,
                                    "Dst": options.ZOrder + "#in:" + scheme[connPointIn].portNumber,
                                    "From": selectedElement.type,
                                    "To": options.type,
                                    "ToPort": scheme[connPointIn].portName,
                                    "Typ": "simple",
                                    "hasPoint": false,
                                    "objectType": "line",
                                    "typeConnection": "block",
                                    "fromPort": "out"
                                }
                            };
                            scheme = $.extend(scheme, lines);
                            lineA.sendToBack();

                            scheme[selectedElement.type].connectedLines.push(lineName);
                            scheme[options.type].connectedLines.push(lineName);

                            var deletePointA = createDeletePoint(selectedElement, options, order, scheme[connPointIn].portNumber);
                            canvas.add(deletePointA);

                            canvas.on('object:moving', function (e) {
                                redrawLine(e.target, 'out');
                                canvas.renderAll();
                            });
                        } else {
                            window.alert("Port full!");
                        }
                    }
                }
                isDown = false;
                options = connToBlock = null;
                canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
            });
        }
        else if(e.target.TopPort){
            e.target.set({fill: 'gray'});
            canvas.renderAll();

            canvas.on('mouse:down', function(o) {
                isDown = true;
                selectedElement = connFromBlock = getMainObject(e.target.type);
                var ccaLeft = connFromBlock.left + connFromBlock.width/2-2;
                var ccaTop = connFromBlock.top - 10;
                var points = [ccaLeft, ccaTop, ccaLeft, ccaTop];
                newLine = new fabric.Line(points, {
                    strokeWidth: 1,
                    stroke: 'cyan',
                    type: 'temporaryLine'
                });
                canvas.add(newLine);
            });

            canvas.on('mouse:move', function(o) {
                if(!isDown){return;}
                var pointer = canvas.getPointer(o.e);
                newLine.set({ x2: pointer.x, y2: pointer.y });
                canvas.renderAll();
            });

            canvas.on('mouse:up', function(o) {
                var pointer = canvas.getPointer(o.e);
                canvas.forEachObject(function (obj) {
                    if(obj.In){
                        if(Math.abs(pointer.x - obj.left-5) < 15 && Math.abs(pointer.y - obj.top-5) < 3) {
                            connToBlock = getObject(scheme[obj.type].parentBlock);
                            connPointIn = obj.type;
                            //console.log("main obj: "+connToBlock+" other obj: "+connPointIn+" number:"+scheme[connPointIn].portNumber);
                        }
                    }
                });

                var options = connToBlock;
                deleteLastObject();

                if((selectedElement && options) && (selectedElement !== options)) {
                    //console.log("out: " + scheme[selectedElement.type].ZOrder+" in: "+scheme[options.type].ZOrder);
                    if (!scheme[selectedElement.type].TopFull && !scheme[connPointIn].full) {
                        var beginBlockOrder = scheme[selectedElement.type].ZOrder;
                        var endBlockOrder = scheme[options.type].ZOrder;
                        order++;

                        var lineA = createLine(selectedElement, options, beginBlockOrder, endBlockOrder, 'block', 'top', scheme[options.type].NumberOfInputs, scheme[connPointIn].portNumber);
                        canvas.add(lineA);
                        lineName = 'line' + order ;

                        //data prep
                        scheme[selectedElement.type].topLine = lineName;
                        scheme[options.type].inLine = lineName;
                        scheme[selectedElement.type].TopFull = true;
                        scheme[connPointIn].full = true;
                        var NumIn = scheme[options.type].NumberOfFullInputs;
                        scheme[options.type].NumberOfFullInputs = NumIn + 1;
                        var lines = {
                            [lineName]: {
                                "ZOrder": order,
                                "Src": selectedElement.ZOrder + "#top:1",
                                "Dst": options.ZOrder + "#in:" + scheme[options.type].NumberOfFullInputs,
                                "From": selectedElement.type,
                                "To":  options.type,
                                "ToPort":  scheme[connPointIn].portName,
                                "Typ": "simple",
                                "hasPoint":false,
                                "objectType":"line",
                                "typeConnection":"block",
                                "fromPort":"top"
                            }
                        };
                        scheme = $.extend(scheme, lines);
                        lineA.sendToBack();

                        var deletePointA = createDeletePoint(selectedElement, options, order, scheme[connPointIn].portNumber);
                        canvas.add(deletePointA);

                        canvas.on('object:moving', function(e) {
                            redrawLine(e.target, 'top');
                            canvas.renderAll();
                        });
                    }else{
                        //console.log('invalid number of IN/OUT');
                    }
                }
                isDown = false;
                options = connToBlock = null;
                canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
            });
        }
        else if(e.target.BotPort){
            e.target.set({fill: 'gray'});
            canvas.renderAll();

            canvas.on('mouse:down', function(o) {
                isDown = true;
                selectedElement = connFromBlock = getMainObject(e.target.type);
                var ccaLeft = connFromBlock.left + connFromBlock.width/2-2;
                var ccaTop = connFromBlock.top + connFromBlock.height - 10;
                var points = [ccaLeft, ccaTop, ccaLeft, ccaTop];
                newLine = new fabric.Line(points, {
                    strokeWidth: 1,
                    stroke: 'cyan',
                    type: 'temporaryLine'
                });
                canvas.add(newLine);
            });

            canvas.on('mouse:move', function(o) {
                if(!isDown){return;}
                var pointer = canvas.getPointer(o.e);
                newLine.set({ x2: pointer.x, y2: pointer.y });
                canvas.renderAll();
            });

            canvas.on('mouse:up', function(o) {
                var pointer = canvas.getPointer(o.e);
                canvas.forEachObject(function (obj) {
                    if(obj.In){
                        if(Math.abs(pointer.x - obj.left-5) < 15 && Math.abs(pointer.y - obj.top-5) < 3) {
                            connToBlock = getObject(scheme[obj.type].parentBlock);
                            connPointIn = obj.type;
                            //console.log("main obj: "+connToBlock+" other obj: "+connPointIn+" number:"+scheme[connPointIn].portNumber);
                        }
                    }
                });

                var options = connToBlock
                deleteLastObject();

                if((selectedElement && options) && (selectedElement !== options)) {
                    //console.log("out: " + scheme[selectedElement.type].ZOrder+" in: "+scheme[options.type].ZOrder);
                    if (!scheme[selectedElement.type].BotFull && !scheme[connPointIn].full) {
                        var beginBlockOrder = scheme[selectedElement.type].ZOrder;
                        var endBlockOrder = scheme[options.type].ZOrder;
                        order++;

                        var lineA = createLine(selectedElement, options, beginBlockOrder, endBlockOrder, 'block', 'bot', scheme[options.type].NumberOfInputs, scheme[connPointIn].portNumber);
                        canvas.add(lineA);
                        lineName = 'line' + order ;

                        //data prep
                        scheme[selectedElement.type].botLine = lineName;
                        scheme[options.type].inLine = lineName;
                        scheme[selectedElement.type].BotFull = true;
                        scheme[connPointIn].full = true;
                        var NumIn = scheme[options.type].NumberOfFullInputs;
                        scheme[options.type].NumberOfFullInputs = NumIn + 1;
                        var lines = {
                            [lineName]: {
                                "ZOrder": order,
                                "Src": selectedElement.ZOrder + "#bot:1",
                                "Dst": options.ZOrder + "#in:" + scheme[connPointIn].portNumber,
                                "From": selectedElement.type,
                                "To":  options.type,
                                "ToPort":  scheme[connPointIn].portName,
                                "Typ": "simple",
                                "hasPoint":false,
                                "objectType":"line",
                                "typeConnection":"block",
                                "fromPort":"bot"
                            }
                        };
                        scheme = $.extend(scheme, lines);
                        lineA.sendToBack();

                        var deletePointA = createDeletePoint(selectedElement, options, order, scheme[connPointIn].portNumber);
                        canvas.add(deletePointA);

                        canvas.on('object:moving', function(e) {
                            redrawLine(e.target, 'bot');
                            canvas.renderAll();
                        });
                    }else{
                        //console.log('invalid number of IN/OUT');
                    }
                }
                isDown = false;
                options = connToBlock = null;
                canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
            });
        }
        else if(e.target.DPoint){
            e.target.set({stroke:'orange'});
            canvas.renderAll();
            canvas.on('mouse:down', function(o) {
                if(o.target.DPoint) {
                    // console.log(getObjectByType('line' + o.target.DPoint));
                    // console.log('DELETING: line' + o.target.DPoint);
                    if(scheme['line'+o.target.DPoint].hasPoint){
                        var point = 'point'+o.target.DPoint;
                        var pointLine = getObject(scheme[point].outLine);
                    }
                    deleteLine(getObjectByType('line' + o.target.DPoint));
                    if(pointLine) {
                        deleteLine(pointLine);
                    }
                    isDown = false;
                    selectedElement = null;
                    connFromBlock = null;
                    connToBlock = null;
                    canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
                }
            });
        }
        else if(e.target.POut){
            e.target.set({fill: 'gray'});
            canvas.renderAll();

            canvas.on('mouse:down', function(o) {
                isDown = true;
                selectedElement = connFromBlock = getObject(e.target.type);
                // console.log("target:"+e.target.type+" selected:"+selectedElement);
                var ccaLeft = connFromBlock.left + connFromBlock.width/2;
                var ccaTop = connFromBlock.top + connFromBlock.height/2;
                var points = [ccaLeft, ccaTop, ccaLeft, ccaTop];
                newLine = new fabric.Line(points, {
                    strokeWidth: 1,
                    stroke: 'cyan',
                    type: 'temporaryLine'
                });
                canvas.add(newLine);
            });

            canvas.on('mouse:move', function(o) {
                if(!isDown){return;}
                var pointer = canvas.getPointer(o.e);
                newLine.set({ x2: pointer.x, y2: pointer.y });
                canvas.renderAll();
            });

            canvas.on('mouse:up', function(o) {
                var pointer = canvas.getPointer(o.e);
                canvas.forEachObject(function (obj) {
                    if(obj.In){
                        if(obj.angle === 360){
                            if (Math.abs(pointer.x - obj.left - 5) < 3 && Math.abs(pointer.y - obj.top - 5) < 15) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }
                        else if(obj.angle === 90) {
                            if (Math.abs(pointer.x - obj.left - 5) < 15 && Math.abs(pointer.y - obj.top - 5) < 3) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }
                        else if(obj.angle === 180){
                            if (Math.abs(pointer.x - obj.left + 5) < 3 && Math.abs(pointer.y - obj.top - 5) < 15) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }
                        else if(obj.angle === 270) {
                            if (Math.abs(pointer.x - obj.left - 5) < 15 && Math.abs(pointer.y - obj.top + 5) < 3) {
                                connToBlock = getObject(scheme[obj.type].parentBlock);
                                connPointIn = obj.type;
                                // console.log("main obj: " + connToBlock.type + " port: " + connPointIn + " port num:" + scheme[connPointIn].portNumber);
                            }
                        }

                    }
                });

                var options = connToBlock;
                deleteLastObject();

                if((selectedElement && options) && (selectedElement !== options)) {
                    // console.log("out: " + scheme[selectedElement.type].ZOrder + " in: " + scheme[options.type].ZOrder);
                    if (scheme[selectedElement.type].NumberOfFullOutputs < scheme[selectedElement.type].NumberOfOutputs && !scheme[connPointIn].full) {
                        var beginBlockOrder = scheme[selectedElement.type].ZOrder;
                        var endBlockOrder = scheme[options.type].ZOrder;
                        order++;

                        var lineA = createLine(selectedElement, options, beginBlockOrder, endBlockOrder, 'point', 'point', scheme[options.type].NumberOfInputs, scheme[connPointIn].portNumber);
                        canvas.add(lineA);
                        lineName = 'line' + order;

                        scheme[selectedElement.type].connectedToBlocks.push(options.type);
                        scheme[options.type].connectedFromBlocks.push(selectedElement.type);

                        //data prep
                        scheme[selectedElement.type].outLine = lineName;
                        scheme[options.type].inLine = lineName;
                        var NumOut = scheme[selectedElement.type].NumberOfFullOutputs;
                        scheme[selectedElement.type].NumberOfFullOutputs = NumOut + 1;
                        scheme[connPointIn].full = true;

                        var NumIn = scheme[options.type].NumberOfFullInputs;
                        scheme[options.type].NumberOfFullInputs = NumIn + 1;
                        scheme[connPointIn].connectedLine = lineName;

                        var lines = {
                            [lineName]: {
                                "ZOrder": order,
                                "Src": selectedElement.ZOrder + "#point:" + scheme[selectedElement.type].NumberOfFullOutputs,
                                "Dst": options.ZOrder + "#in:" + scheme[connPointIn].portNumber,
                                "From": selectedElement.type,
                                "To":  options.type,
                                "ToPort":  scheme[connPointIn].portName,
                                "Typ": "point",
                                "hasPoint":false,
                                "objectType":"line",
                                "typeConnection":"point",
                                "fromPort":"point"
                            }
                        };
                        scheme = $.extend(scheme, lines);
                        lineA.sendToBack();

                        scheme[options.type].connectedLines.push(lineName);

                        var deletePointA = createDeletePoint(selectedElement, options, order, scheme[connPointIn].portNumber);
                        canvas.add(deletePointA);

                        canvas.on('object:moving', function(e) {
                            redrawLine(e.target, 'point');
                            canvas.renderAll();
                        });
                    }else{
                        window.alert('Port full!');
                    }
                    isDown = false;
                    options = connToBlock = null;
                    canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
                }
            });
        }
        else{
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
        }
    }
});

var changingElement = null;

canvas.on('mouse:dblclick', function(e) {
    //console.log(e.target);
    if(e.target !== undefined) {
        if (e.target.type.substr(0, 4) === 'line') {
            if(schemeType != 'rlc' && !scheme[e.target.type].hasPoint && (scheme[e.target.type].Typ) !== "point") {
                var lineOut = scheme[e.target.type].From;
                var lineOutObject = getObject(lineOut);
                var lineInObject = getObject(scheme[e.target.type].To);
                var lineOrder = scheme[e.target.type].ZOrder;
                var fromPort = scheme[e.target.type].fromPort;
                // console.log("line object: " + e.target);
                // console.log('dblclick line: ' + e.target.type);
                // console.log('main object: ' + lineOutObject);
                var linePointA = createConnectionPoint(lineOutObject, lineOrder, fromPort);
                canvas.add(linePointA);

                pointName = 'point' + lineOrder;
                var Points = {
                    [pointName]: {
                        "parentObject":lineOut,
                        "parentLine":e.target.type,
                        "NumberOfFullInputs": 0,
                        "NumberOfFullOutputs": 0,
                        "NumberOfInputs": 0,
                        "NumberOfOutputs": 1,
                        "ZOrder": lineOrder,
                        "objectType":"connection_point",
                        "connectedToBlocks":[],
                        "connectedFromBlocks":[]
                    }
                };

                scheme[e.target.type].hasPoint = true;

                scheme = $.extend(scheme, Points);
            }
        }
        else if(e.target.baseBlock){
            var formData;
            changingElement = e.target;
            //console.log(changingElement);
            var objPar = blockParameters[e.target.BlockType];
            var elementID, element, inputValue = null;


            $('.modal-title').text('Block settings: '+scheme[e.target.type].VisibleName);
            formData = '<div class="form-group"><label for="block-name" class="col-form-label">Block name:</label>';
            formData += '<input type="text" class="form-control" id="block-name" value="'+scheme[e.target.type].VisibleName+'"'+((schemeType == 'schema2') ? 'disabled':'')+'></div>';
            if(scheme[e.target.type].MaxInputs > 1){
                formData += '<div class="form-group"><label for="input-number" class="col-form-label">Number of inputs (max. '+scheme[e.target.type].MaxInputs+'):</label>';
                formData += '<input type="text" class="form-control" id="input-number" value="'+scheme[e.target.type].NumberOfInputs+'"></div>';
            }
            $.each(objPar, function(i,subPar) {
                if(subPar.type == 'input') {
                    var inputDataNum = subPar.data.number;
                    formData += '<div class="form-group"><label for=\"'+subPar.data.id+'\" class="col-form-label">'+subPar.data.title+'</label>';
                    formData += '<input type="text" class="form-control" id=\"'+subPar.data.id+'\" value="'+scheme[changingElement.type].extra[inputDataNum]+'"></div>';
                }
                if(subPar.type == 'text') {
                    formData += '<h1>'+subPar.data.title+'</h1><p id=\"'+subPar.data.id+'\"></p>';
                    elementID = subPar.data.id;
                    inputValue = scheme[changingElement.type].tex_result;
                }
                if(subPar.type == 'selectbox'){
                    formData += '<div class="form-group"><label for=\"'+subPar.data.id+'\" class="col-form-label">'+subPar.data.title+'</label>';
                    formData += '<select name=\"'+subPar.data.id+'\" id=\"'+subPar.data.id+'\">';
                    var number = subPar.data.number;
                    $.each(subPar.data.opt, function(name, options) {
                        formData += '<option value="' + options.value + '"'+((scheme[e.target.type].extra[number] == options.value) ? 'selected':'')+'>' + options.name + '</option>';
                    });
                    formData += '</select></div>';
                }
                if(subPar.type == 'checkbox'){
                    var number = subPar.data.number;
                    formData += '<div><input type="checkbox" style="display:inline-block" id="'+subPar.data.id+'" value="'+subPar.data.value+'" '+(scheme[e.target.type].extra[number]=='true' ? 'checked':'')+'>' +
                        '<label for="\'+subPar.data.id+\'" style="display:inline-block">'+subPar.data.title+'</label></div>';
                }
            });

            $('#exampleModal .modal-body').html(formData);
            if(element = document.getElementById(elementID)){
                katex.render(inputValue, element);
            }
            canvas.discardActiveObject();
            canvas.requestRenderAll();

            $('#exampleModal').modal();
        }
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');
    }
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
});


//mouse leaves port/point
canvas.on('mouse:out', function(e) {
    if(e.target !== null) {
        if(e.target.baseBlock && e.target.BlockType === 'Multiply'){
            var x = document.getElementById("snackbar");
            x.className = x.className.replace("show", "");
        }
        else if (e.target.In) {
            e.target.set({fill: 'black'});
            canvas.renderAll();
            // canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
        }else if(e.target.Out){
            e.target.set({fill: 'black'});
            canvas.renderAll();
            //canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
        }else if(e.target.TopPort){
            e.target.set({fill: 'black'});
            canvas.renderAll();
            isDown = false;
        }else if(e.target.BotPort){
            e.target.set({fill: 'black'});
            canvas.renderAll();
            isDown = false;
        }
        else if(e.target.POut){
            e.target.set({fill: 'black'});
            canvas.renderAll();
            isDown = false;
        }
        else if(e.target.DPoint){
            e.target.set({stroke:'red'});
            canvas.renderAll();
            // canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
        }
    }
});

function loadBlocks(){
    var cnt = 1;
    var data = "";
    $.each(blockDrawData, function (key, value) {
        if(cnt == 1){
            data += '<div class="row">';
        }
        data += '<div class="block col-6"><canvas id=\"'+key+'\"><script>prepBlocks(\''+key+'\')</script></canvas></div>';
        cnt++;
        if(cnt>2){
            data += '</div>';
            cnt = 1;
        }
    });
    $('#block-container').html(data);

    $.each($(".block > div"), function (key, value) {
        dragElement(this);
    });

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        var blockType = "";

        elmnt.onmousedown = dragMouseDown;
        elmnt.ontouchstart = dragMouseDown;

        function dragMouseDown(e) {

            elmnt.id = "draggedEl";
            $(elmnt).css("position","absolute")
            $(elmnt).detach().appendTo($("#wrapper"))
            blockType = $(elmnt).children("canvas")[0].id;

            loadBlocks();

            var width = $(elmnt).width()
            var height = $(elmnt).height()

            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:

            if(e.type === "touchstart"){
                pos3 = e.touches[0].clientX;
                pos4 = e.touches[0].clientY;

                document.ontouchend = closeDragElement;
                // call a function whenever the cursor moves:
                document.ontouchmove = elementDrag;
            }else{
                pos3 = e.clientX;
                pos4 = e.clientY;

                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            // elmnt.style.top = (pos3) + "px";
            // elmnt.style.left = (pos4) + "px";
            elmnt.style.top = pos4-height/2+"px";
            elmnt.style.left = pos3-width/5+"px";
            elmnt.style.zIndex = "1500";

        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:

            if(e.type === "touchmove"){
                pos1 = pos3 - e.touches[0].clientX;
                pos2 = pos4 - e.touches[0].clientY;
                pos3 = e.touches[0].clientX;
                pos4 = e.touches[0].clientY;
            }else{
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
            }

            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement(e) {

            var width = $(elmnt).width()
            var height = $(elmnt).height()

            var props =  document.getElementById("page-content-wrapper").getBoundingClientRect();

            var left = props["left"];
            var top = props["top"];

            if(e.type === "touchend"){

                // stop moving when mouse button is released:
                document.ontouchend = null;

                document.ontouchmove = null;

                addBlock(blockType, pos3-left+80, pos4-top-16)
                $(elmnt).css("background","red");

                // if(e.touches[0].clientX-width/5 > left && e.touches[0].clientY-height/2 > top){
                //     $(elmnt).css("background","red");
                //     addBlock(blockType, e.touches[0].clientX-left+80, e.touches[0].clientY-top-16)
                // }
            }else{
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;

                if(e.clientX-width/5 > left && e.clientY-height/2 > top)
                    addBlock(blockType, e.clientX-left+80, e.clientY-top-16)
            }


            $(elmnt).remove();
        }
    }
}


//get parent object from port
function getMainObject(blockPort) {
    var tmp;
    var typeBlockName = blockPort.substr(0, blockPort.length - 1);
    canvas.forEachObject(function(obj) {
        if(obj.type == typeBlockName) {
            tmp = obj;
        }
    });
    return tmp;
}

//get object by object name
function getObject(block) {
    var tmp;
    var typeBlockName = block;
    canvas.forEachObject(function(obj) {
        if(obj.type == typeBlockName) {
            tmp = obj;
        }
    });
    return tmp;
}

//get object by object type
function getObjectByType(type) {
    canvas.forEachObject(function(obj) {
        if(obj.type == type) {
            tmp = obj;
        }
    });
    return tmp;
}

//remove last
function deleteLastObject(){
    var objects = canvas._objects;
    if(objects.length !== 0) {
        canvas.remove(objects[objects.length -1]);
        canvas.renderAll();
    }
}

var connOffSet = 20;

//path calculation
function createPath(x1, y1, x2, y2, originPort, beginBlock, endBlock) {
    //1 - out, 2 - in
    diffX = x2 - x1; diffY = y2 - y1;

    var path0 = ["M", x1, y1];
    if(beginBlock.type.substr(0,5) == 'point'){
        var path1 = ["L", x1 + connOffSet, y1];
        if (diffX < 40) {
            var path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
            var path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
        } else {
            var path2 = ["L", x1 + diffX / 2, y1];
            var path3 = ["L", x1 + diffX / 2, y2];
        }

        if (scheme[endBlock.type].Rotation === 0) {
            var path4 = ["L", x2 - connOffSet, y2];
            var path5 = ["L", x2, y2];
        }
        else if (scheme[endBlock.type].Rotation === 90) {
            if (diffX < 40) {
                var path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
                var path3 = ["L", x2, y1 + diffY / 2];
            } else {
                var path2 = ["L", x1 + diffX, y1];
                var path3 = ["L", x1 + diffX, y1];
            }
            var path4 = ["L", x2, y2 - connOffSet];
            var path5 = ["L", x2, y2];
        }
        else if (scheme[endBlock.type].Rotation === 180) {
            if (diffX < 40) {
                var path2 = ["L", x1 + connOffSet, y2];
                var path3 = ["L", x2 + connOffSet, y2];
            } else {
                var path2 = ["L", x1 + diffX + connOffSet, y1];
                var path3 = ["L", x1 + diffX + connOffSet, y1];
            }
            var path4 = ["L", x2 + connOffSet, y2];
            var path5 = ["L", x2, y2];
        }
        else if (scheme[endBlock.type].Rotation === 270) {
            if (diffX < 40) {
                var path2 = ["L", x1 + connOffSet, y2 + connOffSet];
                var path3 = ["L", x2, y2 + connOffSet];
            } else {
                var path2 = ["L", x1 + diffX, y1];
                var path3 = ["L", x1 + diffX, y1];
            }
            var path4 = ["L", x2, y2 + connOffSet];
            var path5 = ["L", x2, y2];
        }
    }else {
        if (scheme[beginBlock.type].Rotation == 0) {
            var path1 = ["L", x1 + connOffSet, y1];
            if (diffX < 40) {
                var path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
                var path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                var path2 = ["L", x1 + diffX / 2, y1];
                var path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                var path4 = ["L", x2 - connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    var path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
                    var path3 = ["L", x2, y1 + diffY / 2];
                } else {
                    var path2 = ["L", x1 + diffX, y1];
                    var path3 = ["L", x1 + diffX, y1];
                }
                var path4 = ["L", x2, y2 - connOffSet];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    var path2 = ["L", x1 + connOffSet, y2];
                    var path3 = ["L", x2 + connOffSet, y2];
                } else {
                    var path2 = ["L", x1 + diffX + connOffSet, y1];
                    var path3 = ["L", x1 + diffX + connOffSet, y1];
                }
                var path4 = ["L", x2 + connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    var path2 = ["L", x1 + connOffSet, y2 + connOffSet];
                    var path3 = ["L", x2, y2 + connOffSet];
                } else {
                    var path2 = ["L", x1 + diffX, y1];
                    var path3 = ["L", x1 + diffX, y1];
                }
                var path4 = ["L", x2, y2 + connOffSet];
                var path5 = ["L", x2, y2];
            }
        }
        else if (scheme[beginBlock.type].Rotation == 90) {
            var path1 = ["L", x1, y1 + connOffSet];
            if (diffX < 40) {
                var path2 = ["L", x1, y1 + diffY / 2];
                var path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                var path2 = ["L", x1, y2];
                var path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                var path4 = ["L", x2 - connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    var path2 = ["L", x1, y1 + diffY / 2];
                    var path3 = ["L", x2, y1 + diffY / 2];
                } else {
                    var path2 = ["L", x1 + diffX, y1 + connOffSet];
                    var path3 = ["L", x1 + diffX, y1 + connOffSet];
                }
                var path4 = ["L", x2, y2 - connOffSet];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    var path2 = ["L", x1, y2];
                    var path3 = ["L", x2 + connOffSet, y2];
                } else {
                    var path2 = ["L", x1 + diffX + connOffSet, y1 + connOffSet];
                    var path3 = ["L", x1 + diffX + connOffSet, y1 + connOffSet];
                }
                var path4 = ["L", x2 + connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    var path2 = ["L", x1, y2 + connOffSet];
                    var path3 = ["L", x2, y2 + connOffSet];
                } else {
                    var path2 = ["L", x1 + diffX, y1 + connOffSet];
                    var path3 = ["L", x1 + diffX, y1 + connOffSet];
                }
                var path4 = ["L", x2, y2 + connOffSet];
                var path5 = ["L", x2, y2];
            }
        }
        else if (scheme[beginBlock.type].Rotation == 180) {
            var path1 = ["L", x1 - connOffSet, y1];
            if (diffX < 40) {
                var path2 = ["L", x1 - connOffSet, y1 + diffY / 2];
                var path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                var path2 = ["L", x1 - connOffSet, y2];
                var path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                var path4 = ["L", x2 - connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    var path2 = ["L", x1 - connOffSet, y1 + diffY / 2];
                    var path3 = ["L", x2, y1 + diffY / 2];
                } else {
                    var path2 = ["L", x1 - connOffSet, y1 + diffY - connOffSet];
                    var path3 = ["L", x1 - connOffSet, y1 + diffY - connOffSet];
                }
                var path4 = ["L", x2, y2 - connOffSet];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    var path2 = ["L", x1 - connOffSet, y2];
                    var path3 = ["L", x2 + connOffSet, y2];
                } else {
                    var path2 = ["L", x1 + diffX + connOffSet, y1];
                    var path3 = ["L", x1 + diffX + connOffSet, y1];
                }
                var path4 = ["L", x2 + connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    var path2 = ["L", x2, y1];
                    var path3 = ["L", x2, y2 + connOffSet];
                } else {
                    var path2 = ["L", x1 + diffX, y1];
                    var path3 = ["L", x1 + diffX, y1];
                }
                var path4 = ["L", x2, y2 + connOffSet];
                var path5 = ["L", x2, y2];
            }
        }
        else if (scheme[beginBlock.type].Rotation == 270) {
            var path1 = ["L", x1, y1 - connOffSet];
            if (diffX < 40) {
                var path2 = ["L", x1, y1 + diffY / 2];
                var path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                var path2 = ["L", x1, y2];
                var path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                var path4 = ["L", x2 - connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    var path2 = ["L", x1, y1 - diffY - connOffSet];
                    var path3 = ["L", x2, y1 - diffY - connOffSet];
                } else {
                    var path2 = ["L", x1 + diffX, y1 - connOffSet];
                    var path3 = ["L", x1 + diffX, y1 - connOffSet];
                }
                var path4 = ["L", x2, y2 - connOffSet];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    var path2 = ["L", x1, y2];
                    var path3 = ["L", x2 + connOffSet, y2];
                } else {
                    var path2 = ["L", x1 + diffX + connOffSet, y1 - connOffSet];
                    var path3 = ["L", x1 + diffX + connOffSet, y1 - connOffSet];
                }
                var path4 = ["L", x2 + connOffSet, y2];
                var path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    var path2 = ["L", x1, y2 + connOffSet];
                    var path3 = ["L", x2, y2 + connOffSet];
                } else {
                    var path2 = ["L", x1 + diffX, y1 - connOffSet];
                    var path3 = ["L", x1 + diffX, y1 - connOffSet];
                }
                var path4 = ["L", x2, y2 + connOffSet];
                var path5 = ["L", x2, y2];
            }
        }
    }

    return [path0, path1, path2, path3, path4, path5];
}

//draw path
function createLine(beginBlock, endBlock, beginOrder, endOrder, typeConnection, originPort, inCount, inPort) {
    var fX = beginBlock.left; var fY = beginBlock.top;
    var fWidth = beginBlock.width; var fHeight = beginBlock.height;

    if(originPort === 'out') {
        // out
        if(scheme[beginBlock.type].Rotation == 0) {
            var startX = fX + fWidth;
            var startY = fY + fHeight / 2 - 10;
        }
        else if(scheme[beginBlock.type].Rotation == 90){
            if(schemeType === 'rlc'){
                var startX = fX - 5;
                var startY = fY + fWidth;
            }
            else if(schemeType === 'schema2'){
                var startX = fX + fWidth/2-5;
                var startY = fY + fHeight - 4;
            }
            else{
                var startX = fX + fWidth/2-5;
                var startY = fY + fHeight-15;
            }
        }
        else if(scheme[beginBlock.type].Rotation == 180){
            var startX = fX - 5;
            var startY = fY + fHeight / 2 - 8;
        }
        else if(scheme[beginBlock.type].Rotation == 270){
            if(schemeType === 'rlc'){
                var startX = fX + 5;
                var startY = fY - fWidth - 3;
            }
            else{
                var startX = fX + fWidth/2;
                var startY = fY - 10;
            }
        }
    }
    else if(originPort === 'top'){
        var startX = beginBlock.left + beginBlock.width / 2;
        var startY = beginBlock.top - 10;
    }
    else if(originPort === 'bot'){
        var startX = beginBlock.left + beginBlock.width / 2;
        var startY = beginBlock.top + beginBlock.height - 10;
    }
    else if(originPort === 'point'){
        var startX = beginBlock.left + beginBlock.width /2;
        var startY = beginBlock.top + beginBlock.height /2;
    }

    var tX = endBlock.left; var tY = endBlock.top;
    var tWidth = endBlock.width; var tHeight = endBlock.height;

    if(inCount === 1 || endBlock.BlockType === 'Point'){
        // in
        if(scheme[endBlock.type].Rotation == 0) {
            var stopX = tX;
            var stopY = tY + tHeight / 2 - 10;
        }
        else if(scheme[endBlock.type].Rotation == 90){
            if(schemeType === 'rlc'){
                var stopX = tX+tHeight/2-18;
                var stopY = tY-8;
            }else{
                var stopX = tX+tWidth/2-5;
                var stopY = tY - 8;
            }
        }
        else if(scheme[endBlock.type].Rotation == 180){
            if(schemeType === 'rlc'){
                var stopX = tX+tWidth + 3;
                var stopY = tY + tHeight/2 - 8;
            }else{
                var stopX = tX+tWidth;
                var stopY = tY+tHeight/2-8;
            }
        }
        else if(scheme[endBlock.type].Rotation == 270){
            if(schemeType === 'rlc'){
                //var stopX = tX+tWidth/2 - 20;
                var stopX = tX+tHeight/2-10;
                var stopY = tY + tHeight/2 - 8;
            }else if(schemeType === 'schema2'){
                var stopX = tX+tWidth/2;
                var stopY = tY+tHeight;
            }
            else{
                var stopX = tX+tWidth/2;
                var stopY = tY+tHeight-13;
            }
        }
    }else if(inCount > 1){
        if(scheme[endBlock.type].Rotation == 0) {
            var ip = tHeight/inCount - (tHeight/inCount/2) + 3;
            var position = tY + (inPort * ip) - 9;
            var stopX = tX+1;
            var stopY = position;
        }
        else if(scheme[endBlock.type].Rotation == 90){
            var ip = tWidth/inCount - (tWidth/inCount/2) + 5;
            var position = tX + (inPort * ip) - 3;
            var stopX = position;
            var stopY = tY - 8;
        }
        else if(scheme[endBlock.type].Rotation == 180){
            var ip = tHeight/inCount - (tHeight/inCount/2) + 3;
            var position = tY + (inPort*ip);
            var stopX = tX+tWidth;
            var stopY = position-5;

        }
        else if(scheme[endBlock.type].Rotation == 270){
            var ip = tWidth/inCount - (tWidth/inCount/2) + 5;
            var topPos = tY+tHeight-13;
            if(schemeType === 'schema2'){
                topPos += 15;
            }
            position = tX + (inPort*ip);
            var stopX = position-12;
            var stopY = topPos;
        }
    }

    if(endBlock.numberOfInputs == 1 || endBlock.BlockType === 'Point'){
        return newPath = new fabric.Path(createPath(startX, startY, stopX, stopY, originPort, beginBlock, endBlock), {
            type: 'line' + order,
            fromPort: originPort,
            toPort:inPort,
            toPortName:endBlock.type+'I',
            startX: startX, startY: startY, stopX: stopX, stopY: stopY,
            stroke: 'black', strokeWidth: 1, objectCaching: false,
            fill: false, selectable: false,
            blockOut: beginOrder, blockIn: endOrder,
            objectOut: beginBlock, objectIn: endBlock,
            typeConnection: typeConnection,
            minX: 0, minY: 0
        });
    }

    return newPath = new fabric.Path(createPath(startX, startY, stopX, stopY, originPort, beginBlock, endBlock), {
        type: 'line' + order,
        fromPort: originPort,
        toPort:inPort,
        toPortName:endBlock.type+'I'+inPort,
        startX: startX, startY: startY, stopX: stopX, stopY: stopY,
        stroke: 'black', strokeWidth: 1, objectCaching: false,
        fill: false, selectable: false,
        blockOut: beginOrder, blockIn: endOrder,
        objectOut: beginBlock, objectIn: endBlock,
        typeConnection: typeConnection,
        minX: 0, minY: 0
    });
}

//delete point
function createDeletePoint(beginBlock, endBlock, order, inPort) {
    // in
    var y2;
    if(scheme[endBlock.type].Rotation === 0) {
        var x2 = endBlock.left - 20;
        if (scheme[endBlock.type].NumberOfInputs === 1 || endBlock.BlockType === 'Point') {
            y2 = endBlock.top + endBlock.height / 2 - 10;
        } else if (scheme[endBlock.type].NumberOfInputs > 1) {
            var portPosition = endBlock.height / scheme[endBlock.type].NumberOfInputs - (endBlock.height / scheme[endBlock.type].NumberOfInputs / 2) + 3;
            y2 = endBlock.top + (inPort * portPosition) - 9;
        }
    }
    else if(scheme[endBlock.type].Rotation === 90) {
        var y2 = endBlock.top - 25;
        if (scheme[endBlock.type].NumberOfInputs === 1 || endBlock.BlockType === 'Point') {
            if(schemeType === 'rlc'){
                x2 = endBlock.left + endBlock.height / 2 - 18;
            }else {
                x2 = endBlock.left + endBlock.width / 2 - 5;
            }
        } else if (scheme[endBlock.type].NumberOfInputs > 1) {
            var portPosition = endBlock.width / scheme[endBlock.type].NumberOfInputs - (endBlock.width / scheme[endBlock.type].NumberOfInputs / 2) + 5;
            x2 = endBlock.left + (inPort * portPosition) - 3;
        }
    }
    else if(scheme[endBlock.type].Rotation === 180) {
        var x2 = endBlock.left + endBlock.width + 20;
        if (scheme[endBlock.type].NumberOfInputs === 1 || endBlock.BlockType === 'Point') {
            y2 = endBlock.top + endBlock.height / 2 - 8;
        } else if (scheme[endBlock.type].NumberOfInputs > 1) {
            var portPosition = endBlock.height / scheme[endBlock.type].NumberOfInputs - (endBlock.height / scheme[endBlock.type].NumberOfInputs / 2) + 3;
            y2 = endBlock.top + (inPort * portPosition) - 6;
        }
    }
    else if(scheme[endBlock.type].Rotation === 270) {
        var y2 = endBlock.top  + endBlock.height + 10;
        if (scheme[endBlock.type].NumberOfInputs === 1 || endBlock.BlockType === 'Point') {
            if(schemeType === 'rlc'){
                y2 = endBlock.top  + endBlock.height;
                x2 = endBlock.left + endBlock.height / 2 - 10;
            }else{
                x2 = endBlock.left + endBlock.width / 2;
            }
        } else if (scheme[endBlock.type].NumberOfInputs > 1) {
            var portPosition = endBlock.width / scheme[endBlock.type].NumberOfInputs - (endBlock.width / scheme[endBlock.type].NumberOfInputs / 2) + 5;
            x2 = endBlock.left + (inPort * portPosition) - 3;
        }
    }

    var x3 = x2; var y3 = y2;

    var newPoint = new fabric.Path('M 0 0 L 10 10 M 10 0 L 0 10');
    newPoint.set({left: x3 - 5,	top: y3 - 5,lockMovementX: true, lockMovementY: true,
        hoverCursor: 'pointer', stroke:'red', strokeWidth:2, hasControls: false, hasBorders: false,
        type: 'dpoint' + order, DPoint: order});
    return newPoint;
}

//connection point on line
function createConnectionPoint(beginBlock, lineOrder, fromPort) {
    // out
    if(fromPort === 'out') {
        if(scheme[beginBlock.type].Rotation === 0) {
            var x1 = beginBlock.left + beginBlock.width + 15;
            var y1 = beginBlock.top + beginBlock.height / 2 - 14;
        }
        else if(scheme[beginBlock.type].Rotation === 90){
            var x1 = beginBlock.left + beginBlock.width/2 - 10;
            var y1 = beginBlock.top + beginBlock.height - 3;
            if(schemeType == 'schema2'){
                var y1 = beginBlock.top + beginBlock.height + 10;
            }
        }
        else if(scheme[beginBlock.type].Rotation === 180){
            var x1 = beginBlock.left - 30;
            var y1 = beginBlock.top + beginBlock.height / 2 - 13;
        }
        else if(scheme[beginBlock.type].Rotation === 270){
            var x1 = beginBlock.left + beginBlock.width/2-8 + 3;
            var y1 = beginBlock.top - 40;
        }
    }

    return newPoint = new fabric.Circle({
        ZOrder: 'P' + lineOrder,
        left: x1,	top: y1,
        lockMovementX: true, lockMovementY: true,
        hoverCursor: 'pointer',
        radius:5, fill: 'black',
        hasControls: false, hasBorders: false,
        type: 'point' + lineOrder,
        POut: lineOrder
    });
}

//redraw line and its components when moving
function redrawLine(movedBlock, originPort){
    var idPoint, id;
    if(movedBlock.type.substr(0, 5) == "point") {
        idPoint = movedBlock.type;
    } else {
        id = movedBlock.type;
    }

    var inputName;

    var fX = movedBlock.left; var fY = movedBlock.top;
    var fWidth = movedBlock.width; var fHeight = movedBlock.height;

    var tX = movedBlock.left; var tY = movedBlock.top;
    var tWidth = movedBlock.width; var tHeight = movedBlock.height;

    canvas.forEachObject(function(movedLine) {
        if(movedLine.type.substr(0, 4) == 'line') {
                var startX, startY, stopX, stopY;
                if (movedLine.objectOut.type == idPoint) {
                    startX = movedBlock.left + movedBlock.width;
                    startY = movedBlock.top + movedBlock.height / 2;
                    stopX = movedLine.stopX;
                    stopY = movedLine.stopY;
                }
                if (movedLine.objectOut.type == id) {
                    var beginBlock = movedBlock;
                    if(scheme[movedBlock.type].Rotation == 0) {
                        startX = fX + fWidth;
                        startY = fY + fHeight / 2 - 10;
                    }
                    else if(scheme[movedBlock.type].Rotation == 90){
                        if(schemeType === 'rlc'){
                            var startX = fX - 5;
                            var startY = fY + fWidth;
                        }
                        else if(schemeType === 'schema2'){
                            var startX = fX + fWidth/2-5;
                            var startY = fY + fHeight - 4;
                        }
                        else{
                            var startX = fX + fWidth/2-5;
                            var startY = fY + fHeight-15;
                        }
                    }
                    else if(scheme[movedBlock.type].Rotation == 180){
                        var startX = fX - 5;
                        var startY = fY + fHeight / 2 - 8;
                    }
                    else if(scheme[movedBlock.type].Rotation == 270){
                        if(schemeType === 'rlc'){
                            var startX = fX + 5;
                            var startY = fY - fWidth - 3;
                        }
                        else{
                            var startX = fX + fWidth/2;
                            var startY = fY - 10;
                        }
                    }
                    stopX = movedLine.stopX;
                    stopY = movedLine.stopY;
                }
                else if (movedLine.objectIn.type == id) {
                    var endBlock = movedBlock;
                    var inCount = scheme[movedBlock.type].NumberOfInputs;
                    startX = movedLine.startX;
                    startY = movedLine.startY;
                    if(inCount === 1 || movedBlock.BlockType === 'Point') {
                        if(scheme[movedBlock.type].Rotation == 0) {
                            var stopX = tX;
                            var stopY = tY + tHeight / 2 - 10;
                        }
                        else if(scheme[movedBlock.type].Rotation == 90){
                            if(schemeType === 'rlc'){
                                var stopX = tX+tHeight/2-18;
                                var stopY = tY-8;
                            }else{
                                var stopX = tX+tWidth/2-5;
                                var stopY = tY - 8;
                            }
                        }
                        else if(scheme[movedBlock.type].Rotation == 180){
                            if(schemeType === 'rlc'){
                                var stopX = tX+tWidth + 3;
                                var stopY = tY + tHeight/2 - 8;
                            }else{
                                var stopX = tX+tWidth;
                                var stopY = tY+tHeight/2-8;
                            }
                        }
                        else if(scheme[movedBlock.type].Rotation == 270){
                            if(schemeType === 'rlc'){
                                var stopX = tX+tHeight/2-10;
                                var stopY = tY + tHeight/2 - 8;
                            }else if(schemeType === 'schema2'){
                                var stopX = tX+tWidth/2;
                                var stopY = tY+tHeight;
                            }
                            else{
                                var stopX = tX+tWidth/2;
                                var stopY = tY+tHeight-13;
                            }
                        }
                    }else if(inCount > 1){
                        if(scheme[movedBlock.type].Rotation == 0) {
                            var ip = tHeight/inCount - (tHeight/inCount/2) + 3;
                            for (var i = 1; i <= inCount; i++) {
                                inputName = movedBlock.type + 'I' + i;
                                var position = tY + (i * ip) - 9;
                                if (scheme[inputName].full && movedLine.toPort === i) {
                                    var stopX = tX+1;
                                    var stopY = position;
                                }
                            }
                        }
                        else if(scheme[movedBlock.type].Rotation == 90) {
                            var ip = tWidth/inCount - (tWidth/inCount/2) + 5;
                            for (var i = 1; i <= inCount; i++) {
                                inputName = movedBlock.type + 'I' + i;
                                var position = tX + (i * ip) - 3;
                                if (scheme[inputName].full && movedLine.toPort === i) {
                                    var stopX = position;
                                    var stopY = tY - 8;
                                }
                            }
                        }
                        else if(scheme[movedBlock.type].Rotation == 180) {
                            var ip = tHeight/inCount - (tHeight/inCount/2) + 3;
                            for (var i = 1; i <= inCount; i++) {
                                inputName = movedBlock.type + 'I' + i;
                                var position = tY + (i * ip);
                                if (scheme[inputName].full && movedLine.toPort === i) {
                                    var stopX = tX+tWidth;
                                    var stopY = position-5;
                                }
                            }
                        }
                        else if(scheme[movedBlock.type].Rotation == 270) {
                            var ip = tWidth/inCount - (tWidth/inCount/2) + 5;
                            var topPos = tY+tHeight-13;
                            if(schemeType === 'schema2'){
                                topPos += 15;
                            }
                            for (var i = 1; i <= inCount; i++) {
                                inputName = movedBlock.type + 'I' + i;
                                var position = tX + (i * ip);
                                if (scheme[inputName].full && movedLine.toPort === i) {
                                    var stopX = position-12;
                                    var stopY = topPos;
                                }
                            }
                        }
                    }
                }
            }

            if(startX) {
                offSet = 20;
                var beginBlock = getObject(scheme[movedLine.type].From);
                var endBlock = getObject(scheme[movedLine.type].To);

                movedLine.set({
                    'path': createPath(startX,startY,stopX,stopY,null,beginBlock,endBlock),
                    'startX': startX,
                    'startY': startY,
                    'stopX': stopX,
                    'stopY': stopY,
                    'hasControls': false
                });

                if(scheme[movedLine.type].hasPoint) {
                    movedPoint = getObjectByType('point' + scheme[movedLine.type].ZOrder);

                    if(scheme[beginBlock.type].Rotation === 0) {
                        movedPoint.left = startX + 15;
                        movedPoint.top = startY - 4;
                    }
                    else if(scheme[beginBlock.type].Rotation === 90) {
                        movedPoint.left = startX - 4;
                        movedPoint.top = startY + 15;
                    }
                    else if(scheme[beginBlock.type].Rotation === 180) {
                        movedPoint.left = startX - 25;
                        movedPoint.top = startY - 4;
                    }
                    else if(scheme[beginBlock.type].Rotation === 270) {
                        movedPoint.left = startX - 5;
                        movedPoint.top = startY - 28;
                    }
                    movedPoint.setCoords();
                }

                movedPointDel = getObjectByType('dpoint' + scheme[movedLine.type].ZOrder);
                offset = 20;

                if(scheme[endBlock.type].Rotation === 0) {
                    movedPointDel.left = stopX - offSet - 5;
                    movedPointDel.top = stopY - 5;
                }
                else if(scheme[endBlock.type].Rotation === 90) {
                    movedPointDel.left = stopX - 5;
                    movedPointDel.top = stopY - offset - 3;
                }
                else if(scheme[endBlock.type].Rotation === 180) {
                    movedPointDel.left = stopX + offset - 5;
                    movedPointDel.top = stopY - 5;
                }
                else if(scheme[endBlock.type].Rotation === 270) {
                    movedPointDel.left = stopX - 5;
                    movedPointDel.top = stopY + offset - 3;
                }
                movedPointDel.setCoords();

                canvas.forEachObject(function(tempObj) {
                    if(tempObj.type.substr(0, 4) == 'line' && ('point' + scheme[movedLine.type].ZOrder) === tempObj.objectOut.type) {
                        redrawLine(movedPoint);
                    }
                });
            }
    });
}

function removeFromArray(target, toRemove, array){
    if(array === 'to') {
        var index = scheme[target].connectedFromBlocks.indexOf(toRemove);
        if(index > -1){
            scheme[target].connectedFromBlocks.splice(index,1);
        }
    }

    else if(array === 'from') {
        var index = scheme[target].connectedToBlocks.indexOf(toRemove);
        if(index > -1){
            scheme[target].connectedToBlocks.splice(index,1);
        }
    }

    else if(array === 'lines'){
        var index = scheme[target].connectedLines.indexOf(toRemove);
        if(index > -1){
            scheme[target].connectedLines.splice(index,1);
        }
    }
}

function deleteLine(deleteLineObj){
    //(deleteLineObj);
    blockNameTo = scheme[deleteLineObj.type].To;
    blockNameFrom = scheme[deleteLineObj.type].From;

    if(scheme[deleteLineObj.type].fromPort !== 'point') {
        removeFromArray(blockNameTo, blockNameFrom, 'to');
        removeFromArray(blockNameFrom, blockNameTo, 'from');
    }

    var originPort = deleteLineObj.fromPort;
    var dstPort = deleteLineObj.toPortName;
    //console.log("dstPort:"+dstPort);

    var delLineNumber = scheme[deleteLineObj.type].ZOrder;
    canvas.remove(deleteLineObj);
    remove(scheme[deleteLineObj.type]);
    delete scheme[deleteLineObj.type];

    remove(scheme['point' + delLineNumber]);
    delete scheme['point' + delLineNumber];

    canvas.remove(getObjectByType('point' + delLineNumber));
    canvas.remove(getObjectByType('dpoint' + delLineNumber));


    if(scheme[blockNameTo] || scheme[blockNameFrom]) {
        if (originPort == 'out') {
            if (scheme[blockNameFrom]) {
                var NumOut = scheme[blockNameFrom].NumberOfFullOutputs;
                scheme[blockNameFrom].NumberOfFullOutputs = NumOut - 1;
                scheme[blockNameFrom].outLine = "";
                // removeFromArray(blockNameFrom,deleteLineObj.type,'lines');
            }
            if (scheme[blockNameTo]) {
                var NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
                scheme[dstPort].connectedLine = null;
                scheme[blockNameTo].inLine = "";
                // removeFromArray(blockNameTo,deleteLineObj.type,'lines');
            }
        }
        else if(originPort == 'top'){
            if (scheme[blockNameFrom]) {
                scheme[blockNameFrom].TopFull = false;
            }
            if (scheme[blockNameTo]) {
                var NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
            }
        }
        else if(originPort == 'bot'){
            if (scheme[blockNameFrom]) {
                scheme[blockNameFrom].BotFull = false;
            }
            if (scheme[blockNameTo]) {
                var NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
            }
        }
        else if(blockNameFrom.substr(0, 5) === 'point'){
            if (scheme[blockNameFrom]) {
                var NumOut = scheme[blockNameFrom].NumberOfFullOutputs;
                scheme[blockNameFrom].NumberOfFullOutputs = NumOut - 1;
            }
            if (scheme[blockNameTo]) {
                var NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
                removeFromArray(blockNameTo,deleteLineObj.type,'lines');
            }
        }
    }
}

function remove(o) {
    for(var key in o) {
        delete o[key];
    }
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const keyCode = event.keyCode;
    if(keyName == 'Delete'){
        if(selectedElement){
            if(selectedElement.baseBlock){
                deleteBlock(selectedElement,scheme[selectedElement.type].NumberOfInputs);
            }
        }
    }
    if(keyName == 'r'){
        if(selectedElement) {
            if(selectedElement.baseBlock) {
                if(scheme[selectedElement.type].NumberOfFullInputs > 0 || scheme[selectedElement.type].BotFull || scheme[selectedElement.type].TopFull || scheme[selectedElement.type].NumberOfFullOutputs > 0) {
                    window.alert("Disconnect all lines to rotate the block.");
                }else {
                    rotateObject(selectedElement,90);
                }
            }
        }
    }
    //object movement with arrow keys
    //move left
    if(keyCode == '37'){
        if(selectedElement){
            if(selectedElement.baseBlock){
                selectedElement.set({left:selectedElement.left-1});
                canvas.trigger('object:moving', {target:selectedElement});
                selectedElement.setCoords();
                canvas.renderAll();
            }
        }
    }
    //move right
    if(keyCode == '39'){
        if(selectedElement){
            if(selectedElement.baseBlock){
                selectedElement.set({left:selectedElement.left+1});
                canvas.trigger('object:moving', {target:selectedElement});
                selectedElement.setCoords();
                canvas.renderAll();
            }
        }
    }
    //move up
    if(keyCode == '38'){
        if(selectedElement){
            if(selectedElement.baseBlock){
                selectedElement.set({top:selectedElement.top-1});
                canvas.trigger('object:moving', {target:selectedElement});
                selectedElement.setCoords();
                canvas.renderAll();
            }
        }
    }
    //move down
    if(keyCode == '40'){
        if(selectedElement){
            if(selectedElement.baseBlock){
                selectedElement.set({top:selectedElement.top+1});
                canvas.trigger('object:moving', {target:selectedElement});
                selectedElement.setCoords();
                canvas.renderAll();
            }
        }
    }
});

//keypress control with ctrl
$(document).bind('keydown', function(e) {
    //save scheme
    if(e.ctrlKey && (e.which == 83)) {
        e.preventDefault();
        saveScheme();
        return false;
    }
    //create new instance of block
    if(e.ctrlKey && (e.which == 74)) {
        if(selectedElement) {
            if(selectedElement.baseBlock) {
                e.preventDefault();
                console.log(selectedElement);
                addBlock(selectedElement.BlockType,selectedElement.left+150,selectedElement.top+50);
            }
        }
        return false;
    }
});
