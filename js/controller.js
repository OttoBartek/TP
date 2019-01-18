var scheme = {};
var number = {};
var counter = 0;
var schemeType;
var allow_delete=0;
var showNames = true;

$.each(Object.keys(blockDrawData),function(i,nameBlock){
    number[nameBlock] = 0;
});

var posCanvas = 100; var posy = posCanvas;
canvas.selection=false;
/*Data contains parameters for all usable components in schema*/
data = blockParameters;
portPos = portPositions;
var connToBlock, connFromBlock, connPointIn;


/*Pridane globalne premenne*/
var portPadding = 5;
var portWidth = 10;
var portHeight = 10;

/*TESTOVANIE ONLY*/
var portBorders = false;
var rectBorders = false;
var rectControls = false;


var inPosition, movingInPosition;

function showNamesFunction(){

    showNames=!showNames;

    if(!showNames){
        canvas.forEachObject(function(obj) {

            if(obj.baseBlock) {
                obj._objects.forEach(function(o){
                    if(o.text && o.changeable)
                        o.set({fill:"transparent"});
                });
            }
        });
    }else{
        canvas.forEachObject(function(obj) {

            if(obj.baseBlock) {
                obj._objects.forEach(function(o){
                    if(o.text && o.changeable){
                        o.set({fill:"black"});
                    }
                });
            }
        });
    }

    canvas.renderAll();
}

window.addBlock = function (blockType, posx, posy) {
    posx -=posCanvas;
    counter++;
    number[blockType]++;
    console.log(blockType)
    var objBlock = blockDrawData[blockType];
    var parBlock = blockParameters[blockType];
    var type = blockType + number[blockType];

    var partBlock = [];
    var portPos = portPositions[blockType][0];
    var biggestW = 0;
    var biggestH = 0;
    var visName;

    $.each(objBlock, function(i,subBlock) {
        if(subBlock.type === 'rect'){
            partBlock[i] = new fabric.Rect(subBlock.data);
            if(subBlock.data["name"]==="bound")
            {
                biggestW = subBlock.data.width;
                biggestH = subBlock.data.height;

            }

        }

        else if(subBlock.type === 'path'){

            if(blockType==="Mux") {
                if (parBlock[0]["NumberOfInputs"] == subBlock.data.name || subBlock.data.name==="out") {
                    subBlock.data.invisible = false;
                    subBlock.data.stroke = "black";
                } else {
                    subBlock.data.invisible = true;
                    subBlock.data.stroke = false;
                }
            }

            if(blockType==="Product") {
                if (parBlock[0]["NumberOfInputs"] == subBlock.data.name || subBlock.data.name==="out") {
                    subBlock.data.invisible = false;
                    subBlock.data.stroke = "black";
                } else {
                    subBlock.data.invisible = true;
                    subBlock.data.stroke = false;
                }
            }
            partBlock[i] = new fabric.Path(subBlock.path, subBlock.data);
        }
        else if(subBlock.type === 'triangle')
            partBlock[i] = new fabric.Triangle(subBlock.data);
        else if(subBlock.type === 'circle')
            partBlock[i] = new fabric.Circle(subBlock.data);
        else if(subBlock.type === 'text')
            partBlock[i] = new fabric.IText(subBlock.Text, subBlock.data);
        else if(subBlock.type === 'name'){
            visName = subBlock.Text + number[blockType]
            partBlock[i] = new fabric.IText(visName, subBlock.data);
            console.log(partBlock[i])
            if(!showNames){
                partBlock[i].set({fill:"transparent"});
            }
        }
    });

    var extraData = null;
    if(data[blockType][0].hasExtra){
        extraData = data[blockType][0].defaultExtra;
    }
    var attributes = null;
    if(data[blockType][0].hasAttr){
        attributes = data[blockType][0].attributes;
    }

    var io = data[blockType][0].io;
    var ports = data[blockType][0].ports;

    var numberOfInputs = parBlock[0].NumberOfInputs;

    var groupxDiff = 10;
    var groupyDiff = 10;
    var groupWidth = biggestW;
    var groupHeight = biggestH;
    var block = new fabric.Group(partBlock, {
        baseBlock:1,
        type: type,
        left: posx,
        top: posy,
        width: groupWidth,
        height: groupHeight,
        io: io,
        ports: ports,
        numberOfInputs: numberOfInputs,
        ZOrder: counter,
        "BlockType" : blockType,

    });


    /*TESTOVANIE Block borders*/
    block.hasBorders = block.hasControls = false;
    canvas.add(block);
    var addPort;

    if(io === 'out' || io === 'both') {

        var outPart = new fabric.Triangle({
            // left: posx + block.width + 5, top: posy + block.height/2-15,
            left: posx + portPos.out.left, top: posy + portPos.out.top,
            angle:90,
            lockMovementX: true, lockMovementY: true,
            width: portWidth, height: portHeight, fill: 'black',
            hoverCursor: 'pointer',
            hasControls: false, hasBorders: portBorders,
            type: type + 'O',
            padding: portPadding,
            Out: 1
        });
        canvas.add(outPart);
        /*Pridany out port do schemy na ciare*/
        addPort = {[type+'O'] : {
                "connectedLine": "",
                "parentBlock":type,
                "portName":type+'O',
                "portNumber":1,
                "full":false
            }
        };
        scheme = $.extend(scheme, addPort);

    }
    if (io === 'in' || io === 'both') {
        var inPart;
        if (numberOfInputs === 1 || blockType === 'Point') {
            var inPart = new fabric.Triangle({
                left: posx + portPos.in.left, top: posy + portPos.in.top,
                angle: 90,
                lockMovementX: true, lockMovementY: true,
                width: portWidth, height: portHeight, fill: 'black',
                hoverCursor: 'pointer',
                hasControls: false, hasBorders: portBorders,
                type: type + 'I',
                padding: portPadding,
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
                    left: posx + portPos.in[numberOfInputs][i-1].left, top: posy + portPos.in[numberOfInputs][i-1].top,
                    angle: 90,
                    lockMovementX: true, lockMovementY: true,
                    width: portWidth, height: portHeight, fill: 'black',
                    hoverCursor: 'pointer',
                    hasControls: false, hasBorders: portBorders,
                    type: type + 'I' + i,
                    padding: portPadding,
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
            hasControls: rectControls, hasBorders: rectBorders,
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
            hasControls: rectControls, hasBorders: rectBorders,
            type: type + 'B',
            BotPort: 1
        });
        canvas.add(botPart);
    }



    var posLXT = posx;
    var posLYT = posy;
    var posRXB = posx + block.width;
    var posRYB = posy + block.height;
    console.log(visName)
    var addObj = {[type] : {
            "ZOrder" : counter,
            "NameOfBlock": type,
            "VisibleName": visName,
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
            "connectedFromBlocks":[],
            "equationWidth":0
        }
    };
    console.log(addObj)

    scheme = $.extend(scheme, addObj);
    console.log(scheme)
    if(blockType === 'Multiply'){
        scheme[type].tex_result = 'F';
        scheme[type].equation = ["F","1"];
    }
    if(blockType === 'TransferFcn'){
        scheme[type].tex_result = '\\dfrac{1}{s+1}';
        scheme[type].equation = ["1","1 1"];
        // katex.render(document.getElementById("transfer-text"),scheme[type].tex_result)
    }
};

var selectedElement = null;

/*Premenne pre vytvaranie spojovacej ciary*/
var isDown = false;
var order = 0;
var lineName;
var connLine = null;
var connPortFrom;
var connPortTo;

//selection control
//on object selected
canvas.on('object:selected', function (e) {

    clearCanvas(); // draw previous object with black borders

    selectedElement = e.target;

    if (selectedElement !== null) {
        /*Vymazanie prepajcej ciary*/
        if (selectedElement.DPoint) {
            deleteLineHandler(selectedElement);
        } else { // Vybraty port
            var f = checkPorts(selectedElement); // zisti ci je target port a aky je to port

            if ((f === 2 && scheme[selectedElement.type].full === false) || f === 3 || isParentBlockPoint(selectedElement)) { // OUT alebo pout co je point na ciare
                //connPortFrom = selectedElement;
                connPortFrom = scheme[selectedElement.type];
                if(f === 2) {
                    connFromBlock = getObject(scheme[selectedElement.type].parentBlock);
                } else if(f === 3) {
                    connFromBlock = getObject(selectedElement.type);
                }

                // Vytvorenie tyrkysovej ciary
                createConnectingCyanLine(selectedElement);
            }

           $.each(selectedElement._objects, function (name, property) {
                if (!property.text) {
                    if (!property.hasOwnProperty('invisible') && property.extra != "equation-line") {
                        property.set({'stroke': 'red'});
                    }
                }
            });
            canvas.renderAll();
        }
    }

    // console.log(connFromBlock);

});

/* Vracia true ak je parent portu z canvasu Point inak vrati false*/
function isParentBlockPoint(element) {
    if(element.BlockType) {
        return false // ak je element blok a nie port vrati false
    }
    return getObject(scheme[element.type].parentBlock).BlockType === "Point";
}

/* Vracia true ak ma block z canvasu v scheme BlockType point inak false
*  Point je gulicka blok pouzivany iba v RLC scheme a platia pre neho ine pravidla ...*/
function isBlockTypePoint(block) {
    return scheme[block.type].BlockType === "Point";
}

/* Vracia 1 ak je port In, 2 ak Out, 3 ak POUT, 4 ako TOP, 5 ak Bot ak je to daco ine tak 0 */
function checkPorts(selectedElement) {

    var ret = 0;
    if (selectedElement.In) {
        ret = 1;
    } else if (selectedElement.Out) {
        ret = 2;
    } else if(selectedElement.POut){
        ret = 3;
    } else if(selectedElement.TopPort) {
        ret = 4;
    } else if(selectedElement.BotPort) {
        ret = 5;
    }
    canvas.renderAll();
    return ret;
}

/* Creating mouse following line */
function createConnectingCyanLine(selected) {
    // zaciatok tyrkysovej ciary

    var startX, startY;

    if(selected.type.substr(0,5) === "point"){
        startX = selected.left + selected.width/2;
        startY = selected.top + selected.height/2;
    }else{
        var selectedBlockName = selected.type.substr(0,selected.type.length-1);

        var selectedBlock = getObject(selectedBlockName);

        var rotation = scheme[selectedBlockName].Rotation;

        var portPos = portPositions[selectedBlock.BlockType][rotation];

        var x = selectedBlock.left;
        var y = selectedBlock.top;
        var width = selectedBlock.width;
        var height  = selectedBlock.height;

        var equationWidth = scheme[selectedBlockName].equationWidth;

        if(rotation === 0){
            startX = x + portPos.out.left+equationWidth-1;
            startY = y + portPos.out.top+5;
        }else if(rotation === 90){
            startX = x + portPos.out.left-5-1;
            startY =y + portPos.out.top+equationWidth-1;
        }else if(rotation === 180){
            startX = x + portPos.out.left+1;
            startY =y + portPos.out.top-5-1;
        }else if(rotation === 270){
            startX = x + portPos.out.left+5;
            startY =y + portPos.out.top-equationWidth;
        }
    }

    var points = [startX, startY, startX, startY];
    connLine = new fabric.Line(points, {
        strokeWidth: 1,
        stroke: 'cyan',
        type: 'temporaryLine'
    });
    canvas.add(connLine);

    isDown = true;
}

/* Clear cyan line following mouse */
function clearSelection() {
    if(connLine != null) {
        deleteLastObject();
        connLine = null;
        isDown = false;
    }
    canvas.renderAll();
}

/* blockFrom je blok kde sa zacina spojenie zisteny pomocou getObject(scheme[selectedElement.type].parentBlock);
* rovnako sa ziskava blockTo
* Function finds out if outputs of origin block are empty and if input ports of second block are empty
* */
function portsEmpty(blockFrom, blockTo, selectedPort) {

    var fromFlag = scheme[blockFrom.type].NumberOfFullOutputs < scheme[blockFrom.type].NumberOfOutputs;
    var toFlag = scheme[blockTo.type].NumberOfFullInputs < scheme[blockTo.type].NumberOfInputs;
    var inputFlag = selectedPort.full;

    return (fromFlag && toFlag && !inputFlag);
}

canvas.on('mouse:move', function(option) {
    if(isDown === true) {
        var pointer = canvas.getPointer(option.e);
        connLine.set({ x2: pointer.x, y2: pointer.y });
        canvas.renderAll();
    }
});

function clearCanvas() {

    if(isDown === true) {
        clearSelection();
    }
    // Zmena farby ohranicenia
    if(selectedElement != null) {
        $.each(selectedElement._objects, function (name, property) {
            if (!property.text) {
                if (!property.hasOwnProperty('invisible')) {
                    property.set({'stroke': 'black'});
                }
            }
        });
        selectedElement = null;
    }
}

function resetGlobals() {
    if(connToBlock != null)
        connToBlock = null;
    if(connFromBlock != null)
        connFromBlock = null;
    if(connPortFrom != null)
        connPortFrom = null;
    if(connPortTo != null)
        connPortTo = null;
}

//on click off block
canvas.on('selection:cleared', function(options) {
    clearSelection();
    clearCanvas();
    resetGlobals();
});


/* Handles deleting connecting line when DPoint object is selected or updated */
function deleteLineHandler(selected) {
    // ak ta ciara ma okruhly POut port na spajanie s ciarou
    // tak sa vymaze aj ta ciara
    // DPoint oznacuje id ciary DPoint samotny nieje v scheme iba na canvas
    var line = scheme['line' + selected.DPoint];
    if (line.hasPoint) {
        var point = 'point' + selected.DPoint;
        var pointLine = getObject(scheme[point].outLine);
    }
    scheme[line.fromPortOut].full = false;
    deleteLine(getObjectByType('line' + selected.DPoint));
    if (pointLine) {
        deleteLine(pointLine);
    }
    clearSelection();
}


//on target block change
canvas.on('selection:updated', function(options) {
    clearCanvas();

    selectedElement = options.target;

    $.each(selectedElement._objects, function (name, property) {

        if(!property.text) {
            if(!property.hasOwnProperty('invisible')&& property.extra != "equation-line"){
                property.set({'stroke': 'red'});
            }
        }
    });

    if (selectedElement !== null) {
        /* Vymazanie prepajacej ciary */
        if (selectedElement.DPoint) {
            deleteLineHandler(selectedElement);
        } else { // vybraty port

            connToBlock = getObject(scheme[selectedElement.type].parentBlock);

            // console.log(connFromBlock,connToBlock);

            var f = checkPorts(selectedElement);
            if ((f === 1) && connFromBlock != null) { //port je IN
                if (!((connFromBlock && connToBlock) && (connFromBlock !== connToBlock))) {
                    window.alert("Cant connect to the same block!");
                    clearSelection();
                } else if (portsEmpty(connFromBlock, connToBlock, scheme[selectedElement.type])) {
                    clearSelection();

                    connPortTo = scheme[selectedElement.type];

                    var beginBlockOrder = scheme[connFromBlock.type].ZOrder;
                    var endBlockOrder = scheme[connToBlock.type].ZOrder;
                    order++;

                    var portString = "out";
                    var connTypeString = "block";
                    var srcStringLastPart = scheme[connFromBlock.type].NumberOfFullOutputs;
                    var dstStringLastPart = connPortTo.portNumber;
                    var typString = "simple";

                    switch (checkPorts(getObjectByType(connPortFrom.portName))) {
                        case 3:
                            portString = "point";
                            connTypeString = "point";
                            typString = "point";
                            break;
                        case 4:
                            portString = "top";
                            connTypeString = "top";
                            srcStringLastPart = "1";
                            dstStringLastPart = scheme[connToBlock.type].NumberOfFullInputs;
                            break;
                        case 5:
                            portString = "bot";
                            connTypeString = "bot";
                            srcStringLastPart = "1";
                            dstStringLastPart = scheme[connToBlock.type].NumberOfFullInputs;
                            break;
                    }

                    // beginBlock, endBlock, beginOrder, endOrder, typeConnection, originPort, inCount, inPort
                    // typeConnection moze byt block alebo point
                    var lineA = createLine(connFromBlock, connToBlock, beginBlockOrder, endBlockOrder, connTypeString, portString, scheme[connToBlock.type].NumberOfInputs, connPortTo.portNumber,order);
                    canvas.add(lineA);
                    lineName = 'line' + order;

                    scheme[connFromBlock.type].connectedToBlocks.push(connToBlock.type);
                    scheme[connToBlock.type].connectedFromBlocks.push(connFromBlock.type);

                    //data prep
                    scheme[connToBlock.type].inLine = lineName;
                    scheme[connFromBlock.type].outLine = lineName;

                    scheme[connToBlock.type].NumberOfFullInputs += 1;
                    // ak nieje point nastavuje sa full pre port
                    // taktiez ak je point a ma 3 zaplnene vstupy
                    if(!isBlockTypePoint(connToBlock) || (isBlockTypePoint(connToBlock) && scheme[connToBlock.type].NumberOfFullInputs >= 3)) {
                        connPortTo.full = true;
                    }
                    connPortTo.connectedLine = lineName;

                    // podobne ako vyssie
                    scheme[connFromBlock.type].NumberOfFullOutputs += 1;
                    if(!isBlockTypePoint(connFromBlock) || (isBlockTypePoint(connToBlock) && scheme[connFromBlock.type].NumberOfFullOutputs >= 9)) {
                        connPortFrom.full = true;
                    }
                    connPortFrom.connectedLine = lineName;

                    var fromPortOutName = connPortFrom.portName;
                    if(connPortFrom.portName)


                    var lines = {
                        [lineName]: {
                            "ZOrder": order,
                            "Src": connFromBlock.ZOrder + "#"+portString+":" + srcStringLastPart,
                            "Dst": connToBlock.ZOrder + "#in:" + dstStringLastPart,
                            "From": connFromBlock.type,
                            "To": connToBlock.type,
                            "ToPort": connPortTo.portName,
                            "Typ": typString,
                            "hasPoint": false,
                            "objectType": "line",
                            "typeConnection": connTypeString,
                            "fromPort": portString,
                            "fromPortOut": connPortFrom.portName
                        }
                    };
                    scheme = $.extend(scheme, lines);
                    lineA.sendToBack();

                    scheme[connToBlock.type].connectedLines.push(lineName);

                    // rozdielne pre point na ciare a normalny port ak sa bude point na ciare aj primat ciary treba upravit
                    // aj z druhej strany teda pre connToBlock
                    if(scheme[connFromBlock.type].parentLine) {
                        scheme[scheme[connFromBlock.type].parentObject].connectedLines.push(lineName);
                    } else {
                        scheme[connFromBlock.type].connectedLines.push(lineName);
                    }

                    var deletePointA = createDeletePoint(connFromBlock, connToBlock, order, connPortTo.portNumber);
                    canvas.add(deletePointA);
                    canvas.on('object:moving', function (e) {
                        redrawLine(e.target, 'out');
                        canvas.renderAll();
                    });

                    clearCanvas();
                    resetGlobals();
                }
                else {
                    window.alert("Port full!");
                    clearSelection();
                }
            }
            else if ((f === 2 && scheme[selectedElement.type].full === false) || f === 3 || isParentBlockPoint(selectedElement)) { // Port je out alebo POut

                if(f === 3)
                    connFromBlock = getObject(selectedElement.type);
                else
                    connFromBlock = getObject(scheme[selectedElement.type].parentBlock);

                connPortFrom = scheme[selectedElement.type];
                if (connLine == null) {
                    // Vytvorenie tyrkysovej ciary
                    createConnectingCyanLine(selectedElement);
                } else {
                    clearSelection();
                }
            }
        }
    }
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
                            obj.left = cornerLXT + portPos.in[selectedElement.numberOfInputs][i-1].left;
                            obj.top = cornerLYT + portPos.in[selectedElement.numberOfInputs][i-1].top;;
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

/*
var isDown = false;
var order = 0;
var lineName;*/

//control logs
canvas.on('object:added', function (e) {
    if(scheme){
    }
});

//mouse over object | tmpLine | connect objects
canvas.on('mouse:over', function(e) {
    if(e.target !== null) {
        if(e.target.baseBlock && (e.target.BlockType === 'Multiply' || e.target.BlockType === 'TransferFcn')){
            var x = document.getElementById("snackbar");
            var inputValue = scheme[e.target.type].tex_result;
            katex.render(inputValue, x);
            x.className = "show";
        }
        else if(e.target.In) {
            e.target.set({fill:'gray'});
            canvas.renderAll();
        }
        else if(e.target.Out)
        {
            e.target.set({fill: 'gray'});
            canvas.renderAll();
        }
        else if(e.target.TopPort){
            e.target.set({fill: 'gray'});
            canvas.renderAll();
        }
        else if(e.target.BotPort){
            e.target.set({fill: 'gray'});
            canvas.renderAll();
        }
        else if(e.target.DPoint){
            e.target.set({stroke:'orange'});
            canvas.renderAll();
        }
        else if(e.target.POut)
        {
            e.target.set({fill: 'gray'});
            canvas.renderAll();
        }
        else{

            /*canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');*/
        }
    }
});

var changingElement = null;

canvas.on('mouse:dblclick', function(e) {
    if(e.target !== undefined) {
        if (e.target.type.substr(0, 4) === 'line') {
            if(schemeType !== 'rlc' && !scheme[e.target.type].hasPoint && (scheme[e.target.type].Typ) !== "point") {
                var selectedElement = getObject(e.target.type);
                var lineOut = scheme[e.target.type].From;
                var lineOutObject = getObject(lineOut);
                var lineInObject = getObject(scheme[e.target.type].To);
                var lineOrder = scheme[e.target.type].ZOrder;
                var fromPort = scheme[e.target.type].fromPort;
                var linePointA = createConnectionPoint(lineOutObject, lineOrder, fromPort);
                canvas.add(linePointA);

                var pointName = 'point' + lineOrder;
                var Points = {
                    [pointName]: {
                        "parentObject":lineOut,
                        "parentLine":e.target.type,
                        "NumberOfFullInputs": 0,
                        "NumberOfFullOutputs": 0,
                        "NumberOfInputs": 0,
                        "NumberOfOutputs": 1,
                        "ZOrder": lineOrder,
                        "portName": pointName,
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
            var objPar = blockParameters[e.target.BlockType];
            var elementID, element, inputValue = null;

            $('.modal-title').text('Block settings: '+scheme[e.target.type].VisibleName);
            formData = '<div class="form-group"><label for="block-name" class="col-form-label">Block name:</label>';
            formData += '<input type="text" class="form-control" id="block-name" value="'+scheme[e.target.type].VisibleName+'"'+((schemeType === 'blockSim') ? '':'')+'></div>';
            if(scheme[e.target.type].MaxInputs > 1){
                formData += '<div class="form-group"><label for="input-number" class="col-form-label">Number of inputs (max. '+scheme[e.target.type].MaxInputs+'):</label>';
                formData += '<script>    $("#input-number").on("keyup", function() {let value = $("#input-number").val();let splitValue = value.split(".")[0];if(splitValue.length == 0 || splitValue.length == undefined) {splitValue = splitValue.split(",")[0];}$("#input-number").val(splitValue); });</script>'
                formData += '<input type="number" min="1" max="4" step="1" class="form-control" id="input-number" value="'+scheme[e.target.type].NumberOfInputs+'"></div>';
            }
            $.each(objPar, function(i,subPar) {
                if(subPar.type === 'input') {
                    var inputDataNum = subPar.data.number;
                    formData += '<div class="form-group"><label for=\"'+subPar.data.id+'\" class="col-form-label">'+subPar.data.title+'</label>';
                    formData += '<input type="text" class="form-control" id=\"'+subPar.data.id+'\" value="'+scheme[changingElement.type].extra[inputDataNum]+'"></div>';
                }
                if(subPar.type === 'text') {
                    formData += '<h1>'+subPar.data.title+'</h1><p id=\"'+subPar.data.id+'\"></p>';
                    elementID = subPar.data.id;
                    inputValue = scheme[changingElement.type].tex_result;
                }
                if(subPar.type === 'selectbox'){
                    formData += '<div class="form-group"><label for=\"'+subPar.data.id+'\" class="col-form-label">'+subPar.data.title+'</label>';
                    formData += '<select name=\"'+subPar.data.id+'\" id=\"'+subPar.data.id+'\">';
                    var number = subPar.data.number;
                    $.each(subPar.data.opt, function(name, options) {
                        formData += '<option value="' + options.value + '"'+((scheme[e.target.type].extra[number] === options.value) ? 'selected':'')+'>' + options.name + '</option>';
                    });
                    formData += '</select></div>';
                }
                if(subPar.type === 'checkbox'){
                    var number = subPar.data.number;
                    formData += '<div><input type="checkbox" style="display:inline-block" id="'+subPar.data.id+'" value="'+subPar.data.value+'" '+(scheme[e.target.type].extra[number]==='true' ? 'checked':'')+'>' +
                        '<label for="\'+subPar.data.id+\'" style="display:inline-block">'+subPar.data.title+'</label></div>';
                }
            });

            var modal = $('#exampleModal');

            modal.find('.modal-body').html(formData);
            if(element = document.getElementById(elementID)){
                katex.render(inputValue, element);
            }
            canvas.discardActiveObject();
            canvas.requestRenderAll();

            modal.modal();
        }
       // canvas.off('mouse:down');
      //  canvas.off('mouse:move');
//        canvas.off('mouse:up');
    }
 //   canvas.off('mouse:down');
 //   canvas.off('mouse:move');
 //   canvas.off('mouse:up');
});


//mouse leaves port/point
canvas.on('mouse:out', function(e) {
    if(e.target !== null) {
        if(e.target.baseBlock && (e.target.BlockType === 'Multiply' || e.target.BlockType === 'TransferFcn')){
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
            //isDown = false;
        }else if(e.target.BotPort){
            e.target.set({fill: 'black'});
            canvas.renderAll();
            //isDown = false;
        }
        else if(e.target.POut){
            e.target.set({fill: 'black'});
            canvas.renderAll();
            //isDown = false;
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
        if(cnt === 1){
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
            $(elmnt).css("position","absolute");
            $(elmnt).detach().appendTo($("#wrapper"));
            blockType = $(elmnt).children("canvas")[0].id;

            loadBlocks();

            var width = $(elmnt).width();
            var height = $(elmnt).height();

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

            var width = $(elmnt).width();
            var height = $(elmnt).height();

            var props =  document.getElementById("page-content-wrapper").getBoundingClientRect();

            var left = props["left"];
            var top = props["top"];

            if(e.type === "touchend"){

                // stop moving when mouse button is released:
                document.ontouchend = null;

                document.ontouchmove = null;

                addBlock(blockType, pos3-left+80, pos4-top-16);
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
        if(obj.type === typeBlockName) {
            tmp = obj;
        }
    });
    return tmp;
}

//get object by object name called when moving objects
function getObject(block) {
    var tmp;
    var typeBlockName = block;
    canvas.forEachObject(function(obj) {
        if(obj.type === typeBlockName) {
            tmp = obj;
        }
    });
    return tmp;
}

//get object by object type
function getObjectByType(type) {
    canvas.forEachObject(function(obj) {
        if(obj.type === type) {
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
    var path1, path2, path3, path4, path5;

    if(beginBlock.type.substr(0,5) === 'point'){
        path1 = ["L", x1 + connOffSet, y1];
        if (diffX < 40) {
            path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
            path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
        } else {
            path2 = ["L", x1 + diffX / 2, y1];
            path3 = ["L", x1 + diffX / 2, y2];
        }

        if (scheme[endBlock.type].Rotation === 0) {
            path4 = ["L", x2 - connOffSet, y2];
            path5 = ["L", x2, y2];
        }
        else if (scheme[endBlock.type].Rotation === 90) {
            if (diffX < 40) {
                path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
                path3 = ["L", x2, y1 + diffY / 2];
            } else {
                path2 = ["L", x1 + diffX, y1];
                path3 = ["L", x1 + diffX, y1];
            }
            path4 = ["L", x2, y2 - connOffSet];
            path5 = ["L", x2, y2];
        }
        else if (scheme[endBlock.type].Rotation === 180) {
            if (diffX < 40) {
                path2 = ["L", x1 + connOffSet, y2];
                path3 = ["L", x2 + connOffSet, y2];
            } else {
                path2 = ["L", x1 + diffX + connOffSet, y1];
                path3 = ["L", x1 + diffX + connOffSet, y1];
            }
            path4 = ["L", x2 + connOffSet, y2];
            path5 = ["L", x2, y2];
        }
        else if (scheme[endBlock.type].Rotation === 270) {
            if (diffX < 40) {
                path2 = ["L", x1 + connOffSet, y2 + connOffSet];
                path3 = ["L", x2, y2 + connOffSet];
            } else {
                path2 = ["L", x1 + diffX, y1];
                path3 = ["L", x1 + diffX, y1];
            }
            path4 = ["L", x2, y2 + connOffSet];
            path5 = ["L", x2, y2];
        }
    }else {
        if (scheme[beginBlock.type].Rotation === 0) {
            path1 = ["L", x1 + connOffSet, y1];
            if (diffX < 40) {
                path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
                path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                path2 = ["L", x1 + diffX / 2, y1];
                path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                path4 = ["L", x2 - connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    path2 = ["L", x1 + connOffSet, y1 + diffY / 2];
                    path3 = ["L", x2, y1 + diffY / 2];
                } else {
                    path2 = ["L", x1 + diffX, y1];
                    path3 = ["L", x1 + diffX, y1];
                }
                path4 = ["L", x2, y2 - connOffSet];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    path2 = ["L", x1 + connOffSet, y2];
                    path3 = ["L", x2 + connOffSet, y2];
                } else {
                    path2 = ["L", x1 + diffX + connOffSet, y1];
                    path3 = ["L", x1 + diffX + connOffSet, y1];
                }
                path4 = ["L", x2 + connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    path2 = ["L", x1 + connOffSet, y2 + connOffSet];
                    path3 = ["L", x2, y2 + connOffSet];
                } else {
                    path2 = ["L", x1 + diffX, y1];
                    path3 = ["L", x1 + diffX, y1];
                }
                path4 = ["L", x2, y2 + connOffSet];
                path5 = ["L", x2, y2];
            }
        }
        else if (scheme[beginBlock.type].Rotation === 90) {
            path1 = ["L", x1, y1 + connOffSet];
            if (diffX < 40) {
                path2 = ["L", x1, y1 + diffY / 2];
                path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                path2 = ["L", x1, y2];
                path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                path4 = ["L", x2 - connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    path2 = ["L", x1, y1 + diffY / 2];
                    path3 = ["L", x2, y1 + diffY / 2];
                } else {
                    path2 = ["L", x1 + diffX, y1 + connOffSet];
                    path3 = ["L", x1 + diffX, y1 + connOffSet];
                }
                path4 = ["L", x2, y2 - connOffSet];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    path2 = ["L", x1, y2];
                    path3 = ["L", x2 + connOffSet, y2];
                } else {
                    path2 = ["L", x1 + diffX + connOffSet, y1 + connOffSet];
                    path3 = ["L", x1 + diffX + connOffSet, y1 + connOffSet];
                }
                path4 = ["L", x2 + connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    path2 = ["L", x1, y2 + connOffSet];
                    path3 = ["L", x2, y2 + connOffSet];
                } else {
                    path2 = ["L", x1 + diffX, y1 + connOffSet];
                    path3 = ["L", x1 + diffX, y1 + connOffSet];
                }
                path4 = ["L", x2, y2 + connOffSet];
                path5 = ["L", x2, y2];
            }
        }
        else if (scheme[beginBlock.type].Rotation === 180) {
            path1 = ["L", x1 - connOffSet, y1];
            if (diffX < 40) {
                path2 = ["L", x1 - connOffSet, y1 + diffY / 2];
                path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                path2 = ["L", x1 - connOffSet, y2];
                path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                path4 = ["L", x2 - connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    path2 = ["L", x1 - connOffSet, y1 + diffY / 2];
                    path3 = ["L", x2, y1 + diffY / 2];
                } else {
                    path2 = ["L", x1 - connOffSet, y1 + diffY - connOffSet];
                    path3 = ["L", x1 - connOffSet, y1 + diffY - connOffSet];
                }
                path4 = ["L", x2, y2 - connOffSet];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    path2 = ["L", x1 - connOffSet, y2];
                    path3 = ["L", x2 + connOffSet, y2];
                } else {
                    path2 = ["L", x1 + diffX + connOffSet, y1];
                    path3 = ["L", x1 + diffX + connOffSet, y1];
                }
                path4 = ["L", x2 + connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    path2 = ["L", x2, y1];
                    path3 = ["L", x2, y2 + connOffSet];
                } else {
                    path2 = ["L", x1 + diffX, y1];
                    path3 = ["L", x1 + diffX, y1];
                }
                path4 = ["L", x2, y2 + connOffSet];
                path5 = ["L", x2, y2];
            }
        }
        else if (scheme[beginBlock.type].Rotation === 270) {
            path1 = ["L", x1, y1 - connOffSet];
            if (diffX < 40) {
                path2 = ["L", x1, y1 + diffY / 2];
                path3 = ["L", x2 - connOffSet, y1 + diffY / 2];
            } else {
                path2 = ["L", x1, y2];
                path3 = ["L", x1 + diffX / 2, y2];
            }

            if (scheme[endBlock.type].Rotation === 0) {
                path4 = ["L", x2 - connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 90) {
                if (diffX < 40) {
                    path2 = ["L", x1, y1 - diffY - connOffSet];
                    path3 = ["L", x2, y1 - diffY - connOffSet];
                } else {
                    path2 = ["L", x1 + diffX, y1 - connOffSet];
                    path3 = ["L", x1 + diffX, y1 - connOffSet];
                }
                path4 = ["L", x2, y2 - connOffSet];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 180) {
                if (diffX < 40) {
                    path2 = ["L", x1, y2];
                    path3 = ["L", x2 + connOffSet, y2];
                } else {
                    path2 = ["L", x1 + diffX + connOffSet, y1 - connOffSet];
                    path3 = ["L", x1 + diffX + connOffSet, y1 - connOffSet];
                }
                path4 = ["L", x2 + connOffSet, y2];
                path5 = ["L", x2, y2];
            }
            else if (scheme[endBlock.type].Rotation === 270) {
                if (diffX < 40) {
                    path2 = ["L", x1, y2 + connOffSet];
                    path3 = ["L", x2, y2 + connOffSet];
                } else {
                    path2 = ["L", x1 + diffX, y1 - connOffSet];
                    path3 = ["L", x1 + diffX, y1 - connOffSet];
                }
                path4 = ["L", x2, y2 + connOffSet];
                path5 = ["L", x2, y2];
            }
        }
    }

    return [path0, path1, path2, path3, path4, path5];
}

//draw path
function createLine(beginBlock, endBlock, beginOrder, endOrder, typeConnection, originPort, inCount, inPort,order) {

    var fX = beginBlock.left; var fY = beginBlock.top;
    var fWidth = beginBlock.width; var fHeight = beginBlock.height;

    var rotation;

    var portPos;

    var equationWidth;

    if(originPort != 'point'){
        rotation = scheme[beginBlock.type].Rotation;
        portPos = portPositions[beginBlock.BlockType][rotation];
        equationWidth = scheme[beginBlock.type].equationWidth;
    }

    var startX, startY;
    if(originPort === 'out') {
        // out
        if(rotation === 0) {
            startX = fX + portPos.out.left+equationWidth-2;
            startY = fY + portPos.out.top+5;
        }
        else if(rotation === 90){
            startX = fX + portPos.out.left-5-1;
            startY =fY + portPos.out.top+equationWidth-2;
        }
        else if(rotation === 180){
            startX = fX + portPos.out.left+1;
            startY =fY + portPos.out.top-5-1;
        }
        else if(rotation === 270){
            startX = fX + portPos.out.left+5;
            startY =fY + portPos.out.top-equationWidth+1;
        }
    }
    else if(originPort === 'top'){
        startX = beginBlock.left + beginBlock.width / 2;
        startY = beginBlock.top - 10;
    }
    else if(originPort === 'bot'){
        startX = beginBlock.left + beginBlock.width / 2;
        startY = beginBlock.top + beginBlock.height - 10;
    }
    else if(originPort === 'point'){
        startX = beginBlock.left + beginBlock.width /2;
        startY = beginBlock.top + beginBlock.height /2;
    }

    var tX = endBlock.left; var tY = endBlock.top;
    var tWidth = endBlock.width; var tHeight = endBlock.height;

    rotation = scheme[endBlock.type].Rotation;
    portPos = portPositions[endBlock.BlockType][rotation];
    equationWidth = scheme[endBlock.type].equationWidth;

    var stopX, stopY;

    if(endBlock.BlockType === 'Point' || inCount === 1 ){
        // in
        if(rotation === 0) {
            stopX = tX + portPos.in.left-10;
            stopY = tY + portPos.in.top+5;
        }
        else if(rotation === 90){
            stopX = tX + portPos.in.left-6;
            stopY =tY + portPos.in.top-11;
        }
        else if(rotation === 180){
            stopX = tX + portPos.in.left+equationWidth+10;
            stopY =tY + portPos.in.top-6;
        }
        else if(rotation === 270){
            stopX = tX + portPos.in.left+5;
            stopY =tY + portPos.in.top+10;
        }
    }
    else if(inCount > 1){

        if(rotation === 0) {
            stopX = tX + portPos.in[inCount][inPort-1].left-10;
            stopY = tY + portPos.in[inCount][inPort-1].top+5;
        }
        else if(rotation === 90){
            stopX = tX + portPos.in[inCount][inPort-1].left-6;
            stopY = tY + portPos.in[inCount][inPort-1].top-10;
        }
        else if(rotation === 180){
            stopX = tX + portPos.in[inCount][inPort-1].left+10;
            stopY = tY + portPos.in[inCount][inPort-1].top-6;
        }
        else if(rotation === 270){
            stopX = tX + portPos.in[inCount][inPort-1].left+5;
            stopY = tY + portPos.in[inCount][inPort-1].top+10;
        }
    }
    //"Creating path : " + startX, startY, stopX, stopY, originPort, beginBlock, endBlock;

    return newPath = new fabric.Path(createPath(startX, startY, stopX, stopY, originPort, beginBlock, endBlock), {
        type: 'line' + order,
        fromPort: originPort,
        toPort:inPort,
        toPortName: (endBlock.numberOfInputs === 1 || endBlock.BlockType === 'Point') ? endBlock.type+'I' : endBlock.type+'I'+inPort ,
        startX: startX, startY: startY, stopX: stopX, stopY: stopY,
        stroke: 'black', strokeWidth: 1, objectCaching: false,
        fill: false, selectable: false,
        blockOut: beginOrder, blockIn: endOrder,
        objectOut: beginBlock, objectIn: endBlock,
        typeConnection: typeConnection,
        minX: 0, minY: 0,
    });
}

//delete point
function createDeletePoint(beginBlock, endBlock, order, inPort) {
    // in
    var x2, y2;
    var portPosition;

    var tX = endBlock.left; var tY = endBlock.top;
    var tWidth = endBlock.width; var tHeight = endBlock.height;

    var rotation = scheme[endBlock.type].Rotation;
    var portPos = portPositions[endBlock.BlockType][rotation];
    var equationWidth = scheme[endBlock.type].equationWidth;

    var inCount = scheme[endBlock.type].NumberOfInputs;

    if(rotation === 0) {
        x2 = tX + portPos.in.left-30;
        if (inCount === 1 || endBlock.BlockType === 'Point') {
            y2 = tY + portPos.in.top;
        } else if (inCount > 1) {
            x2 = tX + portPos.in[inCount][inPort-1].left-30;
            y2 = tY + portPos.in[inCount][inPort-1].top;
        }
    }
    else if(rotation === 90) {
        y2 = tY + portPos.in.top-30;
        if (inCount === 1 || endBlock.BlockType === 'Point') {
            x2 = tX + portPos.in.left-11;
        } else if (inCount > 1) {
            x2 = tX + portPos.in[inCount][inPort-1].left-11;
            y2 = tY + portPos.in[inCount][inPort-1].top-30;
        }
    }
    else if(rotation === 180) {
        x2 = tX + portPos.in.left+equationWidth+20;
        if (inCount === 1 || endBlock.BlockType === 'Point') {
            y2 = tY + portPos.in.top-11;
        } else if (inCount > 1) {
            x2 = tX + portPos.in[inCount][inPort-1].left+20;
            y2 = tY + portPos.in[inCount][inPort-1].top-11;
        }
    }
    else if(rotation === 270) {
        y2 = tY  + portPos.in.top+20;
        if (inCount === 1 || endBlock.BlockType === 'Point') {
            x2 = tX + portPos.in.left;
        } else if (inCount > 1) {
            x2 = tX + portPos.in[inCount][inPort-1].left;
            y2 = tY + portPos.in[inCount][inPort-1].top+20;
        }
    }

    var x3 = x2; var y3 = y2;

    var newPoint = new fabric.Path('M 0 0 L 10 10 M 10 0 L 0 10');
    newPoint.set({left: x3, top: y3,lockMovementX: true, lockMovementY: true,
        hoverCursor: 'pointer', stroke:'red', strokeWidth:2, hasControls: false, hasBorders: false,
        type: 'dpoint' + order, DPoint: order});
    return newPoint;
}

//connection point on line
function createConnectionPoint(beginBlock, lineOrder, fromPort) {
    // out
    var x1, y1;

    if(fromPort === 'out') {

        var portPosition;

        var fX = beginBlock.left; var fY = beginBlock.top;

        var rotation = scheme[beginBlock.type].Rotation;
        var portPos = portPositions[beginBlock.BlockType][rotation];
        var equationWidth = scheme[beginBlock.type].equationWidth;

        if(rotation === 0) {
            x1 = fX + portPos.out.left+equationWidth+10;
            y1 = fY + portPos.out.top;
        }
        else if(rotation === 90){
            x1 = fX + portPos.out.left-11;
            y1 =fY + portPos.out.top+equationWidth+8;
        }
        else if(rotation === 180){
            x1 = fX + portPos.out.left-19;
            y1 =fY + portPos.out.top-11;
        }
        else if(rotation === 270){
            x1 = fX + portPos.out.left;
            y1 =fY + portPos.out.top-equationWidth-19;
        }
    }

    return newPoint = new fabric.Circle({
        ZOrder: 'P' + lineOrder,
        left: x1,   top: y1,
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

    if(movedBlock.type.substr(0, 5) === "point") {
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
        var startX, startY, stopX, stopY;
        var beginBlock, endBlock;
        var ip, position;

        var rotation;
        var portPos;
        var equationWidth;

        if(movedLine.type.substr(0, 4) === 'line') {

            if (movedLine.objectOut.type === id || movedLine.objectIn.type === id ||movedLine.objectOut.type === idPoint) {

                var objOut = movedLine.objectOut;

                var objIn = movedLine.objectIn;

                var blockOut = movedLine.blockOut;
                var blockIn = movedLine.blockIn;
                var typeConn = movedLine.typeConnection;
                var fromPort = movedLine.fromPort;
                var numInputs = scheme[movedLine.objectIn.type].NumberOfInputs;
                var toPort = movedLine.toPort;
                var order = Number(movedLine.type.substr(4,movedLine.type.length))
                canvas.remove(movedLine);

                if (movedLine.objectOut.type === idPoint) {
                    objOut = movedBlock;
                }


                var lineA = createLine(objOut,objIn,blockOut,blockIn,typeConn,fromPort,numInputs,toPort,Number(order))
                canvas.add(lineA);
                lineA.sendToBack();

                canvas.remove(getObjectByType('dpoint' + scheme[movedLine.type].ZOrder));
                canvas.add(createDeletePoint(objOut, objIn, scheme[movedLine.type].ZOrder, toPort));

                if(scheme[movedLine.type].hasPoint){
                    canvas.remove(getObjectByType('point' + scheme[movedLine.type].ZOrder));
                    var point = createConnectionPoint(objOut,scheme[movedLine.type].ZOrder,fromPort);
                    canvas.add(point);
                    redrawLine(point);
                }
            }
        }
    });
}

/* Used for deleting*/
function removeFromArray(target, toRemove, array){
    var index;
    if(array === 'to') {
        index = scheme[target].connectedFromBlocks.indexOf(toRemove);
        if(index > -1){
            scheme[target].connectedFromBlocks.splice(index,1);
        }
    }

    else if(array === 'from') {
        index = scheme[target].connectedToBlocks.indexOf(toRemove);
        if(index > -1){
            scheme[target].connectedToBlocks.splice(index,1);
        }
    }

    else if(array === 'lines'){
        index = scheme[target].connectedLines.indexOf(toRemove);
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

    var delLineNumber = scheme[deleteLineObj.type].ZOrder;
    canvas.remove(deleteLineObj);
    remove(scheme[deleteLineObj.type]);
    delete scheme[deleteLineObj.type];

    remove(scheme['point' + delLineNumber]);
    delete scheme['point' + delLineNumber];

    canvas.remove(getObjectByType('point' + delLineNumber));
    canvas.remove(getObjectByType('dpoint' + delLineNumber));

    var NumIn, NumOut;

    /*TODO from port na ciare nieje objekt port ale iba string */
    if(scheme[blockNameTo] || scheme[blockNameFrom]) {
        if (originPort === 'out') {
            if (scheme[blockNameFrom]) {
                NumOut = scheme[blockNameFrom].NumberOfFullOutputs;
                scheme[blockNameFrom].NumberOfFullOutputs = NumOut - 1;
                scheme[blockNameFrom].outLine = "";
                // removeFromArray(blockNameFrom,deleteLineObj.type,'lines');
            }
            if (scheme[blockNameTo]) {
                NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
                scheme[dstPort].connectedLine = null;
                scheme[blockNameTo].inLine = "";
                // removeFromArray(blockNameTo,deleteLineObj.type,'lines');
            }
        }
        else if(originPort === 'top'){
            if (scheme[blockNameFrom]) {
                scheme[blockNameFrom].TopFull = false;
            }
            if (scheme[blockNameTo]) {
                NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
            }
        }
        else if(originPort === 'bot'){
            if (scheme[blockNameFrom]) {
                scheme[blockNameFrom].BotFull = false;
            }
            if (scheme[blockNameTo]) {
                NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
            }
        }
        else if(blockNameFrom.substr(0, 5) === 'point'){
            if (scheme[blockNameFrom]) {
                NumOut = scheme[blockNameFrom].NumberOfFullOutputs;
                scheme[blockNameFrom].NumberOfFullOutputs = NumOut - 1;
            }
            if (scheme[blockNameTo]) {
                NumIn = scheme[blockNameTo].NumberOfFullInputs;
                scheme[blockNameTo].NumberOfFullInputs = NumIn - 1;
                scheme[dstPort].full = false;
                removeFromArray(blockNameTo,deleteLineObj.type,'lines');
            }
        }
    }
}

function remove(o) {
    for(var key in o) {
        if(o.hasOwnProperty(key)) {
            delete o[key];
        }
    }
}
function status_normal_mod(){
    allow_delete = 0;
    var element = document.getElementById("trash");
    element.classList.remove("panel2color");
    element = document.getElementById("mouse");
    element.classList.add("panel2color");
    element = document.getElementById("minus");
    element.classList.remove("panel2color");
}
function status_connect(){
    allow_delete = 0;
    var element = document.getElementById("trash");
    element.classList.remove("panel2color");
    element = document.getElementById("minus");
    element.classList.add("panel2color");
    element = document.getElementById("mouse");
    element.classList.remove("panel2color");
}
function status_remove(){
    allow_delete = allow_delete ? 0 : 1;
    var element = document.getElementById("trash");
    if (allow_delete) element.classList.add("panel2color");
    else element.classList.remove("panel2color");
    element = document.getElementById("mouse");
    element.classList.remove("panel2color");
    element = document.getElementById("minus");
    element.classList.remove("panel2color");
}

document.addEventListener('mousedown', function(event) {
    lastDownTarget = event.target;
    if(allow_delete){
        if(selectedElement.baseBlock){
            deleteBlock(selectedElement,scheme[selectedElement.type].NumberOfInputs);
        }
    }
}, false);


document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const keyCode = event.keyCode;
    if(keyName === 'Delete'){
        if(selectedElement){
            if(selectedElement.baseBlock){
                deleteBlock(selectedElement,scheme[selectedElement.type].NumberOfInputs);
            }
        }
    }
    if(keyName === 'r'){
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
    if(keyCode === 37){
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
    if(keyCode === 39){
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
    if(keyCode === 38){
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
    if(keyCode === 40){
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
    if(e.ctrlKey && (e.which === 83)) {
        e.preventDefault();
        saveScheme();
        return false;
    }
    //create new instance of block
    if(e.ctrlKey && (e.which === 74)) {
        if(selectedElement) {
            if(selectedElement.baseBlock) {
                e.preventDefault();
                addBlock(selectedElement.BlockType,selectedElement.left+150,selectedElement.top+50);
            }
        }
        return false;
    }
});
