var img2=null;
var img = null;

function changeBlock(){
    //console.log(changingElement.type);

    var type = changingElement.type;

    //zmena mena bloku
    var newName = $('#block-name').val();
    // if(newName !== scheme[changingElement.type].VisibleName){
    //     scheme[changingElement.type].VisibleName = newName;
    //     changingElement._objects.forEach(function(obj){
    //         if(obj.text && obj.changeable)
    //             obj.set({text:newName});
    //         canvas.renderAll();
    //     });
    // }
    //zmena poctu portov
    if($('#input-number').length) {
        var inputNum = $('#input-number').val();
        //ak je nieco pripojene na dany blok
        if(scheme[changingElement.type].NumberOfFullInputs > 0 || scheme[changingElement.type].BotFull || scheme[changingElement.type].TopFull || scheme[changingElement.type].NumberOfFullOutputs > 0) {
            window.alert("Disconnect all lines to change the number of inputs.");
        }
        else{
            //ak sa pocet portov ma zmenit
            if (scheme[changingElement.type].NumberOfInputs != inputNum) {
                //ak pocet pozadovanych portov nie je viac, ako je max. daneho bloku
                if (inputNum <= scheme[changingElement.type].MaxInputs) {
                    //console.log('changing num of IN from ' + scheme[changingElement.type].NumberOfInputs + ' to ' + inputNum);
                    originIn = scheme[changingElement.type].NumberOfInputs;
                    scheme[changingElement.type].NumberOfInputs = parseInt(inputNum);
                    redrawBlock(changingElement, originIn);
                }
                else {
                    window.alert("Invalid number of inputs.");
                }
            }
        }
    }

    var objPar = blockParameters[changingElement.BlockType];
    if(schemeType === 'schema1') {
        if ($('#sumator-first').length) {
            var val = $('#sumator-first').val();
            var tmp = scheme[changingElement.type].extra[1];
            if (val !== scheme[changingElement.type].extra[0]) {
                if (val == "-" || val == "+") {
                    scheme[changingElement.type].extra = [val, tmp];
                    changingElement._objects.forEach(function (obj) {
                        if (obj.text && obj.extra == 'sumator-first')
                            obj.set({text: val});
                        canvas.renderAll();
                    });
                } else {
                    window.alert("Invalid input.");
                }
            }
        }

        if ($('#sumator-second').length) {
            var val = $('#sumator-second').val();
            var tmp = scheme[changingElement.type].extra[0];
            if (scheme[changingElement.type].extra[1] != val) {
                if (val == "-" || val == "+") {
                    scheme[changingElement.type].extra = [tmp, val];
                    changingElement._objects.forEach(function (obj) {
                        if (obj.text && obj.extra == 'sumator-second')
                            obj.set({text: val});
                        canvas.renderAll();
                    });
                } else {
                    window.alert("Invalid input.");
                }
            }
        }

        if ($('#multiply-citatel').length && $('#multiply-menovatel').length) {
            var numerator = $('#multiply-citatel').val();
            var denominator = $('#multiply-menovatel').val();

            if (scheme[changingElement.type].extra[0] != numerator || scheme[changingElement.type].extra[1] != denominator) {
                if (denominator != '1') {
                    if (denominator.match(/^-?\d+( -?\d+)*$/)) {
                        if (numerator.match(/^-?\d+( -?\d+)*$/)) {

                            scheme[changingElement.type].extra = [numerator, denominator];

                            changingElement._objects.forEach(function (obj) {
                                if (obj.text)
                                    obj.set({text: 'f(s)'});
                                canvas.renderAll();
                            });

                            var numeratorArr;
                            var numOutput = "";
                            numeratorArr = numerator.split(" ");
                            var exponent = numeratorArr.length - 1;

                            for (var i = 0; i < numeratorArr.length; i++) {
                                if (parseInt(numeratorArr[i]) === 1) {
                                    if (exponent > 1) {
                                        numOutput += "s^" + exponent;
                                        exponent--;
                                    }
                                    else if (exponent === 1) {
                                        numOutput += "s";
                                        exponent--;
                                    }
                                    else {
                                        numOutput += numeratorArr[i];
                                    }
                                }
                                else if (parseInt(numeratorArr[i]) > 1) {
                                    if (exponent > 1) {
                                        numOutput += numeratorArr[i] + "s^" + exponent;
                                        exponent--;
                                    }
                                    else if (exponent === 1) {
                                        numOutput += numeratorArr[i] + "s";
                                        exponent--;
                                    }
                                    else {
                                        numOutput += numeratorArr[i];
                                    }
                                } else {
                                    exponent--;
                                }

                                if (i < numeratorArr.length - 1 && numeratorArr[i] !== '0') {
                                    numOutput += "+";
                                }
                                //console.log(numOutput);
                            }
                            if(numOutput.substr(numOutput.length-1, numOutput.length) == '+'){
                                numOutput = numOutput.slice(0, -1);
                            }

                            var denArray;
                            var denOutput = "";
                            denArray = denominator.split(" ");
                            exponent = denArray.length - 1;

                            for (var j = 0; j < denArray.length; j++) {
                                if (parseInt(denArray[j]) === 1) {
                                    if (exponent > 1) {
                                        denOutput += "s^" + exponent;
                                        exponent--;
                                    }
                                    else if (exponent === 1) {
                                        denOutput += "s";
                                        exponent--;
                                    }
                                    else {
                                        denOutput += denArray[j];
                                    }
                                }
                                else if (parseInt(denArray[j]) > 1) {
                                    if (exponent > 1) {
                                        denOutput += denArray[j] + "s^" + exponent;
                                        exponent--;
                                    }
                                    else if (exponent === 1) {
                                        denOutput += denArray[j] + "s";
                                        exponent--;
                                    }
                                    else {
                                        denOutput += denArray[j];
                                    }
                                }
                                else {
                                    exponent--;
                                }

                                if (j < denArray.length - 1 && denArray[j] !== '0') {
                                    denOutput += "+";
                                }
                            }
                            if(denOutput.substr(denOutput.length-1, denOutput.length) == '+'){
                                denOutput = denOutput.slice(0, -1);
                            }

                            var resultTex = '\\dfrac{' + numOutput + '}{' + denOutput + '}';

                            $.each(objPar, function (i, subPar) {
                                //console.log(objPar);
                                if (subPar.type == 'text') {
                                    scheme[changingElement.type].tex_result = resultTex;
                                }
                            });
                        } else {
                            window.alert("Invalid numerator!");
                            return;
                        }
                    } else {
                        window.alert("Invalid denominator!");
                        return;
                    }
                } else {
                    if (numerator.match(/(^-?[a-zA-Z][0-9]*$)|(^-?[0-9]+$)/)) {
                        scheme[changingElement.type].extra = [numerator,denominator];
                        scheme[changingElement.type].tex_result = numerator;
                        changingElement._objects.forEach(function (obj) {
                            if (obj.text)
                                obj.set({text: numerator});
                            canvas.renderAll();
                        });
                    }
                    else {
                        window.alert("Invalid numerator!");
                        return;
                    }
                }
            }
        }
    }
    else {
        var inputs = [];
        var resultArr = [];

        $.each(objPar, function (i, subPar) {
            if (subPar.type == 'input') {
                inputs[subPar.data.number] = "#" + subPar.data.id;
            }
            if(subPar.type == 'selectbox'){
                inputs[subPar.data.number] = "#" + subPar.data.id +" option:selected";
            }
            if(subPar.type == 'checkbox'){
                inputs[subPar.data.number] = "#" + subPar.data.id;
            }

        });
        for (var i = 0; i < inputs.length; i++) {
            if(objPar[i+1].type == 'input') {
                var val = $(inputs[i]).val();
            }
            if(objPar[i+1].type == 'selectbox'){
                var val = $(inputs[i]).val();
            }
            if(objPar[i+1].type == 'checkbox'){
                if($(inputs[i]).is(':checked')==true)
                    var val = 'true';
                else
                    var val = 'false';
            }
            resultArr[i] = val;
        }
        scheme[changingElement.type].extra = resultArr;
    }

    canvas.forEachObject(function(obj) {
        console.log(obj);
        if(obj != undefined){
            if(obj.type == changingElement.type + 'IMG') {
                canvas.remove(obj);
            }
        }
    });

    if(img!=null){

        var change = changingElement;

        changingElement._objects.forEach(function(obj){
            if(obj.text && obj.changeable)
                obj.set({text:""});
            canvas.renderAll();
        });

        if(img2==null){
            setTimeout(function(){


                fabric.Image.fromURL(img2.src, function(img) {

                    var oImg = img.set({ left: change.left+1, top: change.top+5,width:110,hasControls: false, hasBorders: false,lockMovementX: true, lockMovementY: true,type: type + 'IMG',}).scale(0.6);
                    canvas.add(oImg);
                    canvas.sendToBack(oImg);

                    change = null;
                });

            }, 500);

        }else{
            fabric.Image.fromURL(img2.src, function(img) {

                var oImg = img.set({ left: change.left+1, top: change.top+5,width:110,hasControls: false, hasBorders: false,lockMovementX: true, lockMovementY: true,type: type + 'IMG',}).scale(0.6);
                canvas.add(oImg);
                canvas.sendToBack(oImg);

                change = null;
            });
        }

        // changingElement.set({width:110})
        // change._objects[1].set({width:110})
        // change._objects[0].set({width:110})
    //
    //     var portPos = portPositions[change.BlockType]["img"];
    //
    //     var input = getObject(change.type + 'O');
    //     input.set({angle: 90, top: change.top + portPos.out.top, left: change.left + portPos.out.left});
    //     input.setCoords();
    }

    $('#exampleModal').modal('hide');
    changingElement = null;
}

function rotateObject(target, rotateBy){
    var inputCount = scheme[target.type].NumberOfInputs;
    var rotation = scheme[target.type].Rotation;
    var ports = scheme[target.type].io;
    var blockName = target.type;
    var ip;
    rotation += rotateBy;
    if(rotation % 360 == 0){rotation=0};
    scheme[target.type].Rotation = rotation;

    target.set({angle: rotation});
    target.setCoords();

    var x = target.left;
    var y = target.top;
    var width = target.width;
    var height  = target.height;

    var portPos = portPositions[target.BlockType][rotation];

    if (rotation == 90) {
        if (ports == 'both' || ports == 'in') {
            if (inputCount == 1 || scheme[target.type].BlockType === 'Point') {
                var input = getObject(blockName + 'I');
                input.set({angle: rotation + 90, top: y + portPos.in.top, left: x + portPos.in.left});
                input.setCoords();
            }else{
                for (var i = 1; i <= inputCount; i++){
                    var input = getObject(blockName+'I'+i);
                    input.set({angle: rotation + 90, top: y + portPos.in[inputCount][i-1].top, left: x + + portPos.in[inputCount][i-1].left});
                    input.setCoords();
                }
            }
        }
        if (ports == 'both' || ports == 'out') {
            var input = getObject(blockName + 'O');
            input.set({angle: rotation + 90, top: y + portPos.out.top, left: x + portPos.out.left});
            input.setCoords();
        }
    }
    if (rotation == 180) {
        target.set({angle: 0});
        target.setCoords();
        if (ports == 'both' || ports == 'in') {
            if (inputCount == 1 || scheme[target.type].BlockType === 'Point') {
                var input = getObject(blockName + 'I');
                input.set({angle: rotation + 90, top: y + portPos.in.top, left: x + portPos.in.left});
                input.setCoords();
            }else{
                for (var i = 1; i <= inputCount; i++){
                    var input = getObject(blockName+'I'+i);
                    input.set({angle: rotation + 90, top: y + portPos.in[inputCount][i-1].top, left: x + + portPos.in[inputCount][i-1].left});
                    input.setCoords();
                }
            }
        }
        if (ports == 'both' || ports == 'out') {
            var input = getObject(blockName + 'O');
            input.set({angle: rotation + 90, top: y + portPos.out.top, left: x + portPos.out.left});
            input.setCoords();
        }

        if(scheme[target.type].BlockType ==="Sumator"){
            target._objects.forEach(function (obj) {
                if(obj.extra === "sumator-first"){
                    obj.set({left: 5,top:-25});
                    obj.setCoords();
                }
                if(obj.extra === "sumator-second"){
                    obj.set({left: 5,top:-7});
                    obj.setCoords();
                }
            });
        }
        if(scheme[target.type].BlockType =="Mux") {
            target._objects.forEach(function (obj) {
                if(obj.name==1 || obj.name === 2 || obj.name === 3 || obj.name === 4){
                    console.log(obj)
                    obj.set({left: 0});

                }
                if(obj.name === "out"){
                    console.log(obj)
                    obj.set({left: -15});
                    // obj.setCoords();
                }
            });
        }
        if(scheme[target.type].BlockType =="Product") {
            target._objects.forEach(function (obj) {
                if(obj.name==1 || obj.name === 2 || obj.name === 3 || obj.name === 4){
                    console.log(obj)
                    obj.set({left: 25});

                }
                if(obj.name === "out"){
                    console.log(obj)
                    obj.set({left: -40});
                    // obj.setCoords();
                }
            });
        }

        }else{
            if(scheme[target.type].BlockType ==="Sumator"){
                target._objects.forEach(function (obj) {


                if(obj.extra === "sumator-first"){

                    obj.set({left: -18,top:-27.5});
                    obj.setCoords();
                }
                if(obj.extra === "sumator-second"){

                    obj.set({left: -18,top:-6.5});
                    obj.setCoords();
                }
            });
        }

        if(scheme[target.type].BlockType =="Mux") {
            target._objects.forEach(function (obj) {
                if(obj.name==1 ||obj.name === 2 || obj.name === 3 || obj.name === 4){
                    console.log(obj)
                    obj.set({left: -18});

                }
                if(obj.name === "out"){
                    console.log(obj)
                    obj.set({left: 2});
                }
            });
        }
        if(scheme[target.type].BlockType =="Product") {
            target._objects.forEach(function (obj) {
                if(obj.name==1 ||obj.name === 2 || obj.name === 3 || obj.name === 4){
                    console.log(obj)
                    obj.set({left: -40.5});

                }
                if(obj.name === "out"){
                    console.log(obj)
                    obj.set({left: 24.5});
                }
            });
        }
    }
    if (rotation == 270) {
        if (ports == 'both' || ports == 'in') {

            if (inputCount == 1 || scheme[target.type].BlockType === 'Point') {
                var input = getObject(blockName + 'I');
                input.set({angle: rotation + 90, top: y + portPos.in.top, left: x + portPos.in.left});
                input.setCoords();
            }else{
                for (var i = 1; i <= inputCount; i++){
                    var input = getObject(blockName+'I'+i);
                    input.set({angle: rotation + 90, top: y + portPos.in[inputCount][i-1].top, left: x + + portPos.in[inputCount][i-1].left});
                    input.setCoords();
                }
            }
        }
        if (ports == 'both' || ports == 'out') {
            var input = getObject(blockName + 'O');
            input.set({angle: rotation + 90, top: y + portPos.out.top, left: x + portPos.out.left});
            input.setCoords();
        }
    }
    if (rotation == 0) {
        if (ports == 'both' || ports == 'in') {
            if (inputCount == 1 || scheme[target.type].BlockType === 'Point') {
                var input = getObject(blockName + 'I');
                input.set({angle: 90, top: y + portPos.in.top, left: x + portPos.in.left});
                input.setCoords();
            }else{
                for (var i = 1; i <= inputCount; i++){
                    var input = getObject(blockName+'I'+i);
                    input.set({angle: 90, top: y + portPos.in[inputCount][i-1].top, left: x + + portPos.in[inputCount][i-1].left});
                    input.setCoords();
                }
            }
        }
        if (ports == 'both' || ports == 'out') {
            var input = getObject(blockName + 'O');
            input.set({angle: 90, top: y + portPos.out.top, left: x + portPos.out.left});
            input.setCoords();
        }
    }

    canvas.renderAll();
}

function deleteBlock(targetBlock, originInputNum){
    var blockName = targetBlock.type;
    if (scheme[targetBlock.type].NumberOfFullInputs > 0 || scheme[targetBlock.type].BotFull || scheme[targetBlock.type].TopFull || scheme[targetBlock.type].NumberOfFullOutputs > 0){

        $.each(scheme[targetBlock.type].connectedLines, function(i,part) {
            var line = getObjectByType(part);
            if(scheme[part].hasPoint){
                var point = 'point'+scheme[part].ZOrder;
                var pointLine = getObject(scheme[point].outLine);
            }
            if(scheme[part].From !== targetBlock.type && scheme[part].From.substr(0,5) !== 'point'){
                var from = scheme[part].From;
            }
            if(scheme[part].To !== targetBlock.type){
                var to = scheme[part].To;
            }
            deleteLine(line);
            if(pointLine){
                deleteLine(pointLine);
            }
            if(from){
                //console.log(from+" "+part);
                removeFromArray(from,part,'lines');
            }
            if(to){
                //console.log(from+" "+part);
                removeFromArray(to,part,'lines')
            }
        });
        deleteBlock(targetBlock,originInputNum);

    }else{
        if(originInputNum > 1 && targetBlock.BlockType !== 'Point') {
            for (var n = 1; n <= originInputNum; n++) {
                var inputName = blockName + 'I' + n;
                var obj = getObject(inputName);
                remove(scheme[inputName]);
                delete scheme[inputName];
                canvas.remove(obj);
            }
        }else{
            var inputName = blockName + 'I';
            var obj = getObject(inputName);
            remove(scheme[inputName]);
            delete scheme[inputName];
            canvas.remove(obj);
        }
        if(scheme[blockName].NumOfTop > 0){
            var inputName = blockName + 'T';
            var obj = getObject(inputName);
            remove(scheme[inputName]);
            delete scheme[inputName];
            canvas.remove(obj);
        }
        if(scheme[blockName].NumOfBot > 0){
            var inputName = blockName + 'B';
            var obj = getObject(inputName);
            remove(scheme[inputName]);
            delete scheme[inputName];
            canvas.remove(obj);
        }

        var inputName = blockName + 'O';
        var obj = getObject(inputName);
        remove(scheme[inputName]);
        delete scheme[inputName];
        canvas.remove(obj);

        obj = getObject(blockName);
        remove(scheme[blockName]);
        delete scheme[blockName];
        canvas.remove(obj);
        //console.log('Removing: '+blockName+' object: '+obj);
    }
}

function redrawBlock(targetBlock, originInputNum){

    var x = scheme[targetBlock.type].Position_Array[0];
    var y = scheme[targetBlock.type].Position_Array[1];
    var blockType = targetBlock.BlockType;
    var blockOrder = targetBlock.ZOrder;
    var blockName = targetBlock.type;
    var numberOfInputs = scheme[blockName].NumberOfInputs;
    var visibleName = scheme[blockName].VisibleName;
    var extraData = scheme[blockName].extra;
    var attr = scheme[blockName].attributes;
    var blockRotation = scheme[blockName].Rotation;

    var blockData = blockDrawData[blockType];
    var type = blockType + blockOrder;
    var blockGroup = [];

    deleteBlock(targetBlock, originInputNum);

    $.each(blockData, function(i,part) {
        if(part.type === 'rect')
            blockGroup[i] = new fabric.Rect(part.data);
        else if(part.type === 'path'){

            if(blockType==="Mux") {
                if (numberOfInputs == part.data.name || part.data.name==="out") {
                    part.data.invisible = false;
                    part.data.stroke = "black";
                } else {
                    part.data.invisible = true;
                    part.data.stroke = false;
                }
            }
            if(blockType==="Product") {
                if (numberOfInputs == part.data.name || part.data.name==="out") {
                    part.data.invisible = false;
                    part.data.stroke = "black";
                } else {
                    part.data.invisible = true;
                    part.data.stroke = false;
                }
            }
            blockGroup[i] = new fabric.Path(part.path, part.data);
        }
        else if(part.type === 'triangle')
            blockGroup[i] = new fabric.Triangle(part.data);
        else if(part.type === 'circle')
            blockGroup[i] = new fabric.Circle(part.data);
        else if(part.type === 'text')
            blockGroup[i] = new fabric.IText(part.Text, part.data);
        else if(part.type === 'name')
            blockGroup[i] = new fabric.IText(visibleName, part.data);
    });

    //console.log(type);

    var io = data[blockType][0].io;
    var ports = data[blockType][0].ports;
    console.log(blockGroup)
    var block = new fabric.Group(blockGroup, {baseBlock:1, type: type, left: x, top: y, io: io, ports: ports, numberOfInputs: numberOfInputs, ZOrder: blockOrder, "BlockType" : blockType});
    block.hasBorders = block.hasControls = false;
    canvas.add(block);

    var addPort;
    var portPos = portPositions[blockType][0];
    if(io === 'out' || io === 'both') {

        var outPart = new fabric.Triangle({
            left: x + portPos.out.left, top: y + portPos.out.top,
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
        console.log(numberOfInputs)
        if (numberOfInputs === 1 || blockType === 'Point') {
            console.log(portPos.in)
            var inPart = new fabric.Triangle({
                left: x + portPos.in.left, top: y + portPos.in.top,
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
                console.log(portPos)
                var inPart = new fabric.Triangle({
                    left: x + portPos.in[numberOfInputs][i-1].left, top: y + portPos.in[numberOfInputs][i-1].top,
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


    var posLXT = x;
    var posLYT = y;
    var posRXB = x + block.width;
    var posRYB = y + block.height;
    var addObj = {[type] : {
        "ZOrder" : blockOrder,
        "NameOfBlock": type,
        "VisibleName": visibleName,
        "BlockType" : blockType ,
        "Position_Array": [posLXT, posLYT, posRXB, posRYB],
        "NumberOfOutputs": data[blockType][0].NumberOfOutputs,
        "NumberOfInputs": numberOfInputs,
        "MaxInputs": data[blockType][0].MaxInputs,
        "NumberOfFullOutputs": 0,
        "NumberOfFullInputs": 0,
        "NumOfTop": data[blockType][0].NumOfTop,
        "NumOfBot": data[blockType][0].NumOfBot,
        "TopFull":false,
        "BotFull":false,
        "Rotation":0,
        "io": io,
        "ports":ports,
        "objectType":"block",
        "extra":extraData,
        "attributes":attr,
        "connectedToBlocks":[],
        "connectedFromBlocks":[],
        "connectedLines":[]
    }
    };
    scheme = $.extend(scheme, addObj);
    rotateObject(getObject(blockName),blockRotation);
}

function vypocetMultiply(){
    $("#multiply-citatel").removeClass("is-invalid")
    $("#multiply-menovatel").removeClass("is-invalid")
    $("#block-error").html("");
    var objPar = blockParameters[changingElement.BlockType];
    if ($('#multiply-citatel').length && $('#multiply-menovatel').length) {

        var numerator = $('#multiply-citatel').val();
        var denominator = $('#multiply-menovatel').val();

        if (scheme[changingElement.type].extra[0] != numerator || scheme[changingElement.type].extra[1] != denominator) {
            // console.log(scheme[changingElement.type].extra)
            if (denominator != '1') {
                if (denominator.match(/^-?\d+( -?\d+)*$/)) {
                    if (numerator.match(/^-?\d+( -?\d+)*$/)) {

                        scheme[changingElement.type].extra = [numerator, denominator];

                        var numeratorArr;
                        var numOutput = "";
                        numeratorArr = numerator.split(" ");
                        var exponent = numeratorArr.length - 1;

                        for (var i = 0; i < numeratorArr.length; i++) {
                            if (parseInt(numeratorArr[i]) === 1) {
                                if (exponent > 1) {
                                    numOutput += "s^" + exponent;
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    numOutput += "s";
                                    exponent--;
                                }
                                else {
                                    numOutput += numeratorArr[i];
                                }
                            }
                            else if (parseInt(numeratorArr[i]) > 1) {
                                if (exponent > 1) {
                                    numOutput += numeratorArr[i] + "s^" + exponent;
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    numOutput += numeratorArr[i] + "s";
                                    exponent--;
                                }
                                else {
                                    numOutput += numeratorArr[i];
                                }
                            } else {
                                exponent--;
                            }

                            if (i < numeratorArr.length - 1 && numeratorArr[i] !== '0') {
                                numOutput += "+";
                            }
                            //console.log(numOutput);
                        }
                        if (numOutput.substr(numOutput.length - 1, numOutput.length) == '+') {
                            numOutput = numOutput.slice(0, -1);
                        }

                        var denArray;
                        var denOutput = "";
                        denArray = denominator.split(" ");
                        exponent = denArray.length - 1;

                        for (var j = 0; j < denArray.length; j++) {
                            if (parseInt(denArray[j]) === 1) {
                                if (exponent > 1) {
                                    denOutput += "s^" + exponent;
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    denOutput += "s";
                                    exponent--;
                                }
                                else {
                                    denOutput += denArray[j];
                                }
                            }
                            else if (parseInt(denArray[j]) > 1) {
                                if (exponent > 1) {
                                    denOutput += denArray[j] + "s^" + exponent;
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    denOutput += denArray[j] + "s";
                                    exponent--;
                                }
                                else {
                                    denOutput += denArray[j];
                                }
                            }
                            else {
                                exponent--;
                            }

                            if (j < denArray.length - 1 && denArray[j] !== '0') {
                                denOutput += "+";
                            }
                        }
                        if (denOutput.substr(denOutput.length - 1, denOutput.length) == '+') {
                            denOutput = denOutput.slice(0, -1);
                        }

                        var resultTex = '\\dfrac{' + numOutput + '}{' + denOutput + '}';

                        $.each(objPar, function (i, subPar) {
                            //console.log(objPar);
                            if (subPar.type == 'text') {
                                scheme[changingElement.type].tex_result = resultTex;
                            }
                        });
                    } else {
                        $("#multiply-citatel").addClass("is-invalid")
                        $("#block-error").html("Invalid numerator!");
                        return;
                    }
                } else {
                    $("#multiply-menovatel").addClass("is-invalid")
                    $("#block-error").html("Invalid denominator!");
                    return;
                }
            } else {
                if (numerator.match(/(^-?[a-zA-Z][0-9]*$)|(^-?[0-9]+$)/)) {
                    scheme[changingElement.type].extra = [numerator, denominator];
                    scheme[changingElement.type].tex_result = numerator;
                    changingElement._objects.forEach(function (obj) {
                        // if (obj.text)
                        //     obj.set({text: numerator});
                        canvas.renderAll();
                    });
                }
                else {
                    $("#multiply-citatel").addClass("is-invalid")
                    $("#block-error").html("Invalid numerator!");
                    return;
                }
            }
        }
    }


    var nieco = document.getElementById('multiply-text')
    var val = scheme[changingElement.type].tex_result;

    katex.render(val, nieco);

    img2=null;
    img=null;

    html2canvas(nieco).then(function(canvas) {
        img2 = new Image();
        img = canvas.toDataURL("image/png");
        img2.src =img;
        img2.style.width="500px";
        img = 0;
    });
}