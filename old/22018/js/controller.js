var scheme = number = {};
var counter = 0;
$.each(Object.keys(jsonBlock),function(i,nameBlock){
    number[nameBlock] = 0;
})
var posx = 100; var posy = posx;
canvas.selection=false;
data = jsonParam;
var connToBlock, connFromBlock;

window.addBlock = function (typeBlock) {
    counter++; number[typeBlock]++;
    posx+=5; posy+=5;
    var objBlock = jsonBlock[typeBlock];
    var parBlock = jsonParam[typeBlock];
    var type = typeBlock + number[typeBlock];
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
            partBlock[i] = new fabric.IText(type, subBlock.data);
    });


    var io = data[typeBlock][0].io;
    var block = new fabric.Group(partBlock, {type: type, left: posx, top: posy, io: io, ZOrder: counter, "BlockType" : typeBlock});
    block.hasBorders = block.hasControls = false;
    canvas.add(block);

    var numberOfInputs = parBlock[0].NumberOfInputs;
    var numberOfOutputs = parBlock[0].NumberOfOutputs;

    if(io === 'out' || io === 'both') {
        var outPart = new fabric.Triangle({
            left: posx + block.width + 5, top: posy + block.height/2-15,
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
    if(io === 'in' || io === 'both') {
        var inPart = new fabric.Triangle({
            left: posx + 1, top: posy + block.height/2-15,
            angle:90,
            lockMovementX: true, lockMovementY: true,
            width: 10, height: 10, fill: 'black',
            hoverCursor: 'pointer',
            hasControls: false, hasBorders: false,
            type: type + 'I',
            In: 1
        });
        canvas.add(inPart);
    }

    var posLXT = posx;
    var posLYT = posy;
    var posRXB = posx + block.width;
    var posRYB = posy + block.height;
    var addObj = {[type] : {
            "ZOrder" : counter,
            "SampleTime":  "0",
            "Position": '[' + posLXT + ',' + posLYT + ',' + posRXB + ',' + posRYB + ']',
            "NameOfBlock": type,
            "BlockType" : typeBlock ,
            "Position_Array": [posLXT, posLYT, posRXB, posRYB],
            "NumberOfOutputs": data[typeBlock][0].NumberOfOutputs,
            "NumberOfInputs": data[typeBlock][0].NumberOfInputs,
            "NumberOfFullOutputs": 0,
            "NumberOfFullInputs": 0,
            "NameAddBlock":  jsonBlock[typeBlock][0].Name,
            "io": io
        }
    }
    scheme = $.extend(scheme, addObj);
    //console.log(scheme);
    //console.log(addObj)
};

var selectedElement = null;

//selection control
canvas.on('object:selected', function(options) {
    selectedElement = options.target;
});

canvas.on('selection:updated', function(options) {
    selectedElement = null;
    selectedElement = options.target;
});
//!selection control

var cornerLXT, cornerLYT, cornerRXB, cornerRYB;

//object movement
canvas.on('object:moving', function(e) {
    if (typeof(selectedElement.io) !== "undefined") {
        cornerLXT = selectedElement.left;
        cornerLYT = selectedElement.top;
        cornerRXB = cornerLXT + selectedElement.width;
        cornerRYB = cornerLYT + selectedElement.height;

        selectedElement.set({left: cornerLXT,top: cornerLYT});

        if(selectedElement.io === 'out' || selectedElement.io === 'both') {
            canvas.forEachObject(function(obj) {
                if(obj.type === selectedElement.type + 'O') {
                    obj.left = cornerLXT + selectedElement.width + 5;
                    obj.top = cornerLYT + selectedElement.height/2 - 15;
                    obj.setCoords();
                }
            });
        }
        if(selectedElement.io === 'in' || selectedElement.io === 'both') {
            canvas.forEachObject(function(obj) {
                if(obj.type === selectedElement.type + 'I') {
                    obj.left = cornerLXT + 1;
                    obj.top = cornerLYT + selectedElement.height/2 - 15;
                    obj.setCoords();
                }
            });
        }
    }
});

var isDown = false;
var order = 0;
var connOffSet = 20;
var lineName;

//control logs
canvas.on('object:added', function (e) {
    if(scheme){
        console.log("added: "+e.target.type)
        console.log(scheme);
    }
});

//mouse over object | tmpLine | connect objects
canvas.on('mouse:over', function(e) {
    if(e.target !== null) {
        if(e.target.In) {
            e.target.set({fill:'gray'});
            canvas.renderAll();
        }else if(e.target.Out){
            e.target.set({fill: 'gray'});
            canvas.renderAll();

            canvas.on('mouse:down', function(o) {
                isDown = true;
                selectedElement = connFromBlock = getMainObject(e.target.type);
                var ccaLeft = connFromBlock.left + connFromBlock.width;
                var ccaTop = connFromBlock.top + connFromBlock.height/2-10;
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
                //newLine.set({ lockMovementX: true, lockMovementY: true });
                canvas.renderAll();
            });

            canvas.on('mouse:up', function(o) {
                var pointer = canvas.getPointer(o.e);
                canvas.forEachObject(function (obj) {
                    if(obj.In){
                        if(Math.abs(pointer.x - obj.left) < 15 && Math.abs(pointer.y - obj.top) < 15)
                            connToBlock = getMainObject(obj.type);
                    }
                });

                var options = connToBlock
                deleteLastObject();

                if((selectedElement && options) && (selectedElement !== options)) {
                    console.log("out: " + scheme[selectedElement.type].ZOrder+" in: "+scheme[options.type].ZOrder);
                    if (scheme[selectedElement.type].NumberOfFullOutputs < scheme[selectedElement.type].NumberOfOutputs && scheme[options.type].NumberOfFullInputs < scheme[options.type].NumberOfInputs) {
                        var beginBlockOrder = scheme[selectedElement.type].ZOrder;
                        var endBlockOrder = scheme[options.type].ZOrder;
                        order++;

                        var lineA = createConnection(selectedElement, options, beginBlockOrder, endBlockOrder, 'block');
                        canvas.add(lineA);
                        lineName = 'line' + order ;

                        //data prep
                        scheme[selectedElement.type].line = lineName;
                        scheme[options.type].line = lineName;
                        var NumIn = scheme[options.type].NumberOfFullInputs;
                        var NumOut = scheme[selectedElement.type].NumberOfFullOutputs;
                        scheme[selectedElement.type].NumberOfFullOutputs = NumOut + 1;
                        scheme[options.type].NumberOfFullInputs = NumIn + 1;
                        if(scheme[options.type].io == 'in') {
                            scheme[options.type].Ports = '[' + scheme[options.type].NumberOfFullInputs + ']';
                        }
                        if(scheme[options.type].io == 'both') {
                            scheme[options.type].Ports = '[' + scheme[options.type].NumberOfInputs + ',' + scheme[options.type].NumberOfOutputs + ']';
                        }
                        var lines = {
                            [lineName]: {
                                "ZOrder": order,
                                "Src": selectedElement.ZOrder + "#out:" + scheme[selectedElement.type].NumberOfFullOutputs,
                                "Dst": options.ZOrder + "#in:" + scheme[options.type].NumberOfFullInputs,
                                "From": selectedElement.type,
                                "To":  options.type,
                                "Typ": "simple",
                                "Points": createPathDiff(selectedElement, options)
                            }
                        };
                        scheme = $.extend(scheme, lines);
                        lineA.sendToBack();

                        var deletePointA = createDeletePoint(selectedElement, options, order);
                        canvas.add(deletePointA);
                        var linePointA = createConnectionPoint(selectedElement, options, order);
                        canvas.add(linePointA);

                        pointName = 'point' + order ;
                        var Points = {
                            [pointName]: {
                                "NumberOfFullInputs": 0,
                                "NumberOfFullOutputs": 0,
                                "NumberOfInputs": 0,
                                "NumberOfOutputs": 1,
                                "ZOrder": order
                            }
                        };
                        scheme = $.extend(scheme, Points);

                        canvas.on('object:moving', function(e) {
                            moveLine(e.target);
                            canvas.renderAll();
                        });
                    }else{
                        console.log('invalid number of IN/OUT');
                    }
                }
                isDown = false;
                canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
            });
        }else if(e.target.DPoint){
            e.target.set({stroke:'orange'});
            canvas.renderAll();
            canvas.on('mouse:down', function(o) {
                if(o.target.DPoint) {
                    console.log(getObjectByType('line' + o.target.DPoint));
                    console.log('DELETING: line' + o.target.DPoint);
                    deleteLine(getObjectByType('line' + o.target.DPoint));
                    canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
                }
            });
            canvas.on('mouse:up', function(o) {
                isDown = false;
                canvas.off('mouse:down'); canvas.off('mouse:move'); canvas.off('mouse:up');
            });
        }else if(e.target.POut){
            console.log("connection point "+e.target.type);
        }
        // else{
        //     canvas.off('mouse:down');
        //     canvas.off('mouse:move');
        //     canvas.off('mouse:up');
        // }
    }
});

//mouse leave object
canvas.on('mouse:out', function(e) {
    if(e.target !== null) {
        if (e.target.In) {
            e.target.set({fill: 'black'});
            canvas.renderAll();
        }else if(e.target.Out){
            e.target.set({fill: 'black'});
            canvas.renderAll();
        }else if(e.target.DPoint){
            e.target.set({stroke:'red'});
            canvas.renderAll();
        }
    }
});

//get object from port
function getMainObject(typeBlockInOut) {
    var ccaBlock;
    var typeBlockName = typeBlockInOut.substr(0, typeBlockInOut.length - 1);
    canvas.forEachObject(function(obj) {
        if(obj.type == typeBlockName) {
            ccaBlock = obj;
        }
    });
    return ccaBlock;
}

//remove last !changed
function deleteLastObject(){
    var canvasObjects = canvas._objects;
    if(canvasObjects.length !== 0) {
        canvas.remove(canvasObjects[canvasObjects.length -1]);
        canvas.renderAll();
    }
}

//path calculation
function createPath(x1, y1, x2, y2) {
    //1 - out, 2 - in
    diffX = x2 - x1; diffY = y2 - y1;

    var path0 = ["M", x1, y1];
    var path1 = ["L", x1 + connOffSet , y1];
    if(diffX < 40){
        var path2 = ["L", x1 + connOffSet, y1 + diffY/2];
        var path3 = ["L", x2 - connOffSet, y1 + diffY/2];
    }else{
        var path2 = ["L", x1 + diffX/2, y1];
        var path3 = ["L", x1 + diffX/2, y2];
    }
    var path4 = ["L", x2 - connOffSet, y2];
    var path5 = ["L", x2, y2];

    return [path0, path1, path2, path3, path4, path5];
}

//path diff
function createPathDiff(beginBlock, endBlock) {
    var x1 = beginBlock.left + beginBlock.width; var y1 = beginBlock.top + beginBlock.height/2 - 10;

    var x2 = endBlock.left; var y2 = endBlock.top + endBlock.height/2 - 10;

    var diffX = x2 - x1;
    var diffY = y2 - y1;

    if(diffX < 40){
        var p1x = connOffSet; var p1y = 0;
        var p2x = 0; var p2y = diffY/2;
        var p3x = diffX; var p3y = 0;
        var p4x = 0; var p4y = diffY/2;
        return '[' + p1x + ',' + p1y + ';' + p2x + ',' + p2y + ';' + p3x + ',' + p3y + ';' + p4x + ',' + p4y + ']';
    } else{
        var p1x = diffX/2; var p1y = 0;
        var p2x = 0; var p2y = diffY;
        return '[' + p1x + ',' + p1y + ';' + p2x + ',' + p2y + ']';
    }
}

//draw path
function createConnection(beginBlock, endBlock, beginOrder, endOrder, typeConnection) {
    // out
    var startX = beginBlock.left + beginBlock.width; var startY = beginBlock.top + beginBlock.height/2 - 10;
    // in
    var stopX = endBlock.left; var stopY = endBlock.top + endBlock.height/2 - 10;

    return newPath = new fabric.Path(createPath(startX, startY, stopX, stopY), {
        type: 'line' + order,
        startX: startX, startY: startY, stopX: stopX, stopY: stopY,
        stroke: 'black', strokeWidth: 1, objectCaching: false,
        fill: false, selectable: false,
        blockOut: beginOrder, blockIn: endOrder,
        typeConnection: typeConnection,
        minX: 0, minY: 0
    });
}

//delete point
function createDeletePoint(beginBlock, endBlock, order) {
    // out
    var x1 = beginBlock.left + beginBlock.width; var y1 = beginBlock.top + beginBlock.height/2 - 10;
    // in
    var x2 = endBlock.left; var y2 = endBlock.top + endBlock.height/2 - 10;

    var x3 = x2 - 20;
    var y3 = y2;

    var newPoint = new fabric.Path('M 0 0 L 10 10 M 10 0 L 0 10');
    newPoint.set({left: x3 - 5,	top: y3 - 5,lockMovementX: true, lockMovementY: true,
        hoverCursor: 'pointer', stroke:'red', strokeWidth:2, hasControls: false, hasBorders: false,
        type: 'dpoint' + order, DPoint: order});
    return newPoint;
}

//get object by object type
function getObjectByType(type) {
    canvas.forEachObject(function(obj) {
        if(obj.type == type) {
            ccaObject = obj;
        }
    })
    return ccaObject;
}

//connection point on line
function createConnectionPoint(beginBlock, endBlock, order) {
    // out
    var x1 = beginBlock.left + beginBlock.width; var y1 = beginBlock.top + beginBlock.height/2 - 10;
    // in
    var x2 = endBlock.left; var y2 = endBlock.top + endBlock.height/2 - 10;
    //diff
    var diffX = x2 - x1; var diffY = y2 - y1;

    return newPoint = new fabric.Circle({
        ZOrder: 'P' + order,
        left: x1 + diffX/2 - 5,	top: y1 + diffY/2 - 10,
        lockMovementX: true, lockMovementY: true,
        hoverCursor: 'pointer',
        radius:5, fill: 'black',
        hasControls: false, hasBorders: false,
        type: 'point' + order,
        POut: order
    });
}

//redraw line and its components when moving
function moveLine(movedBlock){
    var idPoint, id;
    if(movedBlock.type.substr(0, 5) == "point") {
        idPoint = movedBlock.type;
    } else {
        id = movedBlock.ZOrder;
    }

    //TODO: FINISH
    // Prechadza vsetky ciary
    canvas.forEachObject(function(movedLine) {
        if(movedLine.type.substr(0, 4) == 'line') {
            var startX, startY, stopX, stopY;
            if(movedLine.blockOut == idPoint) {
                // Z pohybujuceho sa bloku ciara vychadza
                startX = movedBlock.left + movedBlock.width;
                startY = movedBlock.top + movedBlock.height/2 - 10;
                stopX = movedLine.stopX;
                stopY = movedLine.stopY;
            }
            else if(movedLine.blockOut == id) {
                // Z pohybujuceho sa bloku ciara vychadza
                startX = movedBlock.left + movedBlock.width;
                startY = movedBlock.top + movedBlock.height/2 - 10;
                stopX = movedLine.stopX;
                stopY = movedLine.stopY;
            }
            else if(movedLine.blockIn == id) {
                // Do pohybujuceho sa bloku ciara vchadza
                startX = movedLine.startX;
                startY = movedLine.startY;
                stopX = movedBlock.left;
                stopY = movedBlock.top + movedBlock.height/2 - 10;
            }
            if(startX) {
                // Ak ciara z/do bloku vychadza/vchadza - zmen jej tvar
                diffX = stopX - startX;
                diffY = stopY - startY;
                offSet = 20;

                var path0 = ["M", startX, startY];
                var path1 = ["L", startX + offSet, startY];
                if(diffX < 40)
                {
                    var path2 = ["L", startX + offSet, startY + diffY/2 - 5];
                    var path3 = ["L", stopX - offSet, startY + diffY/2 - 5];
                }
                else
                {
                    var path2 = ["L", startX + diffX/2, startY];
                    var path3 = ["L", startX + diffX/2, stopY];
                }
                var path4 = ["L", stopX - offSet, stopY];
                var path5 = ["L", stopX, stopY];

                // Nove suradnice ciary
                movedLine.set({
                    'path': [path0, path1, path2, path3, path4, path5],
                    'startX': startX,
                    'startY': startY,
                    'stopX': stopX,
                    'stopY': stopY,
                    'hasControls': false
                });

                // Nova pozicia bodu napojenia
                movedPoint = getObjectByType('point' + scheme[movedLine.type].ZOrder)

                movedPoint.left = startX + diffX/2 - 5;
                movedPoint.top = startY + diffY/2 - 10;
                movedPoint.setCoords();

                // Nova pozicia bodu vymazania ciary
                movedPointDel = getObjectByType('dpoint' + scheme[movedLine.type].ZOrder)

                movedPointDel.left = stopX - offSet - 5;
                movedPointDel.top = stopY - 5;
                movedPointDel.setCoords();

                var tempObj;
                canvas.forEachObject(function(tempObj) {
                    if(tempObj.type.substr(0, 4) == 'line' && ('point' + scheme[movedLine.type].ZOrder) === tempObj.blockOut) {
                        moveLine(movedPoint)
                    }
                });
            }
        }
    });
}

function deleteLine(deleteLineObj){
    blockNameTo = scheme[deleteLineObj.type].To;
    blockNameFrom = scheme[deleteLineObj.type].From;

    var delLineNumber = scheme[deleteLineObj.type].ZOrder;
    canvas.remove(deleteLineObj);
    remove(scheme[deleteLineObj.type]);
    delete scheme[deleteLineObj.type];

    remove(scheme['point' + delLineNumber]);
    delete scheme['point' + delLineNumber];

    canvas.remove(getObjectByType('point' + delLineNumber));
    canvas.remove(getObjectByType('dpoint' + delLineNumber));


    if(scheme[blockNameTo] || scheme[blockNameFrom]) {
        if(scheme[blockNameFrom]) {
            var NumOut = scheme[blockNameFrom].NumberOfFullOutputs;
            scheme[blockNameFrom].NumberOfFullOutputs = NumOut-1;
        }
        if(scheme[blockNameTo]) {
            var NumIn = scheme[blockNameTo].NumberOfFullInputs;
            scheme[blockNameTo].NumberOfFullInputs = NumIn-1;
        }
    }


    // Vymaze aj ciary, ktore boli napojene na tuto ciaru
    var deleteLineObjNext;
    canvas.forEachObject(function(tempObj) {
        if(tempObj.type.substr(0, 4) == 'line' && ('point' + delLineNumber) === tempObj.blockOut) {
            deleteLineObjNext = tempObj
        }
    });

    if(deleteLineObjNext)
        deleteLine(deleteLineObjNext);
}

function remove(o) {
    for(var key in o) {
        delete o[key];
    }
};