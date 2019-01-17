var img2=null;
var img = null;

function changeBlock(){

    var type = changingElement.type;

    // console.log(scheme);

    //zmena mena bloku
    var newName = $('#block-name').val();
    if(newName !== scheme[changingElement.type].VisibleName){
        scheme[changingElement.type].VisibleName = newName;

        changingElement._objects.forEach(function(obj){
            if(obj.text && obj.changeable)
                obj.set({text:newName});
            canvas.renderAll();
        });
    }

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

    if(schemeType === 'algebra') {

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

            drawequation(changingElement,numerator.split(" "),denominator.split(" "));
        }
    }else if(schemeType === 'blockSim'){
        if ($('#transfer-numer').length && $('#transfer-denom').length) {

            var numerator = $('#transfer-numer').val().substring(1, $('#transfer-numer').val().length-1) ;
            var denominator = $('#transfer-denom').val().substring(1, $('#transfer-denom').val().length-1) ;

           // drawequation(changingElement,numerator.split(" "),denominator.split(" "));
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

    rotateObject(changingElement,0);

    $('#exampleModal').modal('hide');
    changingElement = null;
}

function drawequation(block){

    var numerator = scheme[block.type].extra[0].split(" ");
    var denominator = scheme[block.type].extra[1].split(" ");

    var numStr = "";
    var denStr = "";

    var splitted;
    var splitted2;

    var numExp = [0,0,0,0];
    var denExp = [0,0,0,0];

    var numExpLeft = [0,0,0,0];
    var denExpLeft = [0,0,0,0];

    var cnt = 0;

    var long = false;

    var maxLength = Math.max(denominator.length,numerator.length)

    if(maxLength < 101){

        var equation = scheme[block.type].equation;

        var symbolsNum = scheme[block.type].symbolsNum;
        var symbolsDen = scheme[block.type].symbolsDen;

        var num = equation[0];
        var den = equation[1];

        if(numerator.length == 1){
            numStr = num;
        }else{
            splitted = num.split("?");

            for(let i=0;i<splitted.length;i++){

                splitted2 = splitted[i].split("^");
                if(splitted2.length > 1){
                    numStr+=splitted2[0];

                    numExp[cnt] = splitted2[1].substr(1,splitted2[1].length-2);
                    numExpLeft[cnt] = numStr.length;
                    cnt++;

                    if(cnt > 4){
                        long = true;
                        break;
                    }
                }else{
                    numStr+=splitted2[0];
                }

                if(i!=splitted.length-1)
                    numStr+= " "+symbolsNum[i]+" ";

                if(numStr.length > 20){
                    long = true;
                    break;
                }
            }
        }

        if(!long){
            cnt=0;

            if(denominator.length == 1){
                denStr = den;
            }else{
                splitted = den.split("?");

                for(let i=0;i<splitted.length;i++){
                    splitted2 = splitted[i].split("^");
                    if(splitted2.length > 1){
                        denStr+=splitted2[0];
                        denExp[cnt] = splitted2[1].substr(1,splitted2[1].length-2);
                        denExpLeft[cnt] = denStr.length;
                        cnt++;

                        if(cnt > 4){
                            long = true;
                            break;
                        }

                    }else{
                        denStr+=splitted2[0];
                    }

                    if(i!=splitted.length-1)
                        denStr+= " "+symbolsDen[i]+" ";

                    if(denStr.length > 20){
                        long = true;
                        break;
                    }
                }
            }
        }
    }else{
        long = true;
    }

    var charWidth = 6.6;
    var paddingEquation = 15;
    var paddingLine = 5;

    var width = 0;
    var left = 0;
    var text = "";
    var textLeft = 0;

    var denLength = 0;
    var numLength = 0;

    scheme[block.type].equationWidth = 0;

    denLength = denStr.length;
    numLength = numStr.length;

    if(long || (denStr==="1" && numerator[0].length > 5)){

        width = 40;
        left = width/2 + 0.5;
        text = "f(s)";
        textLeft = (width/2 - (text.length*charWidth)/2) - width/2;

        block.set({width:width});
        block._objects[1].set({width:width,left:-left})
        block._objects[0].set({width:width,left:-left})

        block._objects.forEach(function(obj){

            if(obj.text === scheme[block.type].VisibleName){
                obj.set({left:-left});
            }

            if(obj.extra != undefined){
                if(obj.extra === "F"){
                    obj.set({text:text,fill:"black", left:textLeft});
                }
                else if(obj.extra === "numerator-1"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-2"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-3"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-4"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-equation"){
                    obj.set({text:"s",fill:false,left:0});
                }
                else if(obj.extra === "equation-line"){
                    obj.set({fill:false,left:0,width:0,height:0});
                }
                else if(obj.extra === "denominator-1"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-2"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-3"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-4"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-equation"){
                    obj.set({text:"s",fill:false,left:0});
                }
            }
        });
    }else if(denStr==="1"){

        width = 40;
        left = width/2 + 0.5;
        text = numStr;
        textLeft = (width/2 - (text.length*charWidth)/2) - width/2;

        block.set({width:width});
        block._objects[1].set({width:width,left:-left})
        block._objects[0].set({width:width,left:-left})

        block._objects.forEach(function(obj){

            if(obj.text === scheme[block.type].VisibleName){
                obj.set({left:-left});
            }

            if(obj.extra != undefined){
                if(obj.extra === "F"){
                    obj.set({text:text,fill:"black", left:textLeft});
                }
                else if(obj.extra === "numerator-1"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-2"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-3"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-4"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "numerator-equation"){
                    obj.set({text:"s",fill:false,left:0});
                }
                else if(obj.extra === "equation-line"){
                    obj.set({fill:false,left:0,width:0,height:0});
                }
                else if(obj.extra === "denominator-1"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-2"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-3"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-4"){
                    obj.set({fill:false,left:0});
                }
                else if(obj.extra === "denominator-equation"){
                    obj.set({text:"s",fill:false,left:0});
                }
            }
        });
    }else{

        var maxChar = Math.max(denLength,numLength);

        width = charWidth*maxChar+2*paddingEquation;

        left = width/2 + 0.5;

        scheme[block.type].equationWidth = width-40;

        var leftDen = 0;
        var leftNum = 0;

        if(denLength > numLength){
            leftDen = -left+paddingEquation;
            leftNum = -left+paddingEquation+(denLength*charWidth-numLength*charWidth)/2;
        }else{
            leftDen = -left+paddingEquation+(numLength*charWidth-denLength*charWidth)/2;
            leftNum = -left+paddingEquation;
        }

        var leftLine = -left+paddingLine;
        var widthLine = width-2*paddingLine;

        block.set({width:width});
        block._objects[1].set({width:width,left:-left})
        block._objects[0].set({width:width,left:-left})

        block._objects.forEach(function(obj){

            if(obj.text === scheme[block.type].VisibleName){
                obj.set({left:-left});
            }

            if(obj.extra != undefined){
                if(obj.extra === "F"){
                    obj.set({text:"F",fill:false, left:0});
                }
                else if(obj.extra === "numerator-1"){
                    if(numExp[0] == 0){
                        obj.set({fill:false,left:0,text:"1"});
                    }else{
                        obj.set({fill:"black",left:leftNum+(numExpLeft[0]*charWidth),text:numExp[0]});
                    }
                }
                else if(obj.extra === "numerator-2"){
                    if(numExp[1] == 0){
                        obj.set({fill:false,left:0,text:"2"});
                    }else{
                        obj.set({fill:"black",left:leftNum+(numExpLeft[1]*charWidth),text:numExp[1]});
                    }
                }
                else if(obj.extra === "numerator-3"){
                    if(numExp[2] == 0){
                        obj.set({fill:false,left:0,text:"3"});
                    }else{
                        obj.set({fill:"black",left:leftNum+(numExpLeft[2]*charWidth),text:numExp[2]});
                    }
                }
                else if(obj.extra === "numerator-4"){
                    if(numExp[3] == 0){
                        obj.set({fill:false,left:0,text:"4"});
                    }else{
                        obj.set({fill:"black",left:leftNum+(numExpLeft[3]*charWidth),text:numExp[3]});
                    }
                }
                else if(obj.extra === "numerator-equation"){
                    obj.set({text:numStr,fill:"black",left:leftNum});
                }
                else if(obj.extra === "equation-line"){
                    obj.set({fill:"black",left:leftLine,width:widthLine,height:0.1});
                    canvas.bringToFront();
                    canvas.setActiveObject(block)
                    canvas.discardActiveObject();
                }
                else if(obj.extra === "denominator-1"){
                    if(denExp[0] == 0){
                        obj.set({fill:false,left:0,text:"1"});
                    }else{
                        obj.set({fill:"black",left:leftDen+(denExpLeft[0]*charWidth),text:denExp[0]});
                    }
                }
                else if(obj.extra === "denominator-2"){
                    if(denExp[1] == 0){
                        obj.set({fill:false,left:0,text:"2"});
                    }else{
                        obj.set({fill:"black",left:leftDen+(denExpLeft[1]*charWidth),text:denExp[1]});
                    }
                }
                else if(obj.extra === "denominator-3"){
                    if(denExp[2] == 0){
                        obj.set({fill:false,left:0,text:"3"});
                    }else{
                        obj.set({fill:"black",left:leftDen+(denExpLeft[2]*charWidth),text:denExp[2]});
                    }
                }
                else if(obj.extra === "denominator-4"){
                    if(denExp[3] == 0){
                        obj.set({fill:false,left:0,text:"4"});
                    }else{
                        obj.set({fill:"black",left:leftDen+(denExpLeft[3]*charWidth),text:denExp[3]});
                    }
                }
                else if(obj.extra === "denominator-equation"){
                    obj.set({text:denStr,fill:"black",left:leftDen});
                }
            }
        });
    }

    canvas.renderAll();

    canvas.remove(block);

    canvas.add(block);

    redrawLine(block);
}

function rotateObject(target, rotateBy){
    // console.log(scheme,target)
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

    var equationWidth = scheme[target.type].equationWidth;

    if (rotation == 90) {
        if (ports == 'both' || ports == 'in') {
            if (inputCount == 1 || scheme[target.type].BlockType === 'Point') {
                var input = getObject(blockName + 'I');
                input.set({angle: rotation + 90, top: y + portPos.in.top, left: x + portPos.in.left});
                input.setCoords();
            }else{
                for (var i = 1; i <= inputCount; i++){
                    var input = getObject(blockName+'I'+i);
                    input.set({angle: rotation + 90, top: y + portPos.in[inputCount][i-1].top, left: x+ portPos.in[inputCount][i-1].left});
                    input.setCoords();
                }
            }
        }
        if (ports == 'both' || ports == 'out') {
            var input = getObject(blockName + 'O');
            input.set({angle: rotation + 90, top: y + portPos.out.top+equationWidth, left: x + portPos.out.left});
            input.setCoords();
        }
    }
    if (rotation == 180) {
        target.set({angle: 0});
        target.setCoords();
        if (ports == 'both' || ports == 'in') {
            if (inputCount == 1 || scheme[target.type].BlockType === 'Point') {
                var input = getObject(blockName + 'I');
                input.set({angle: rotation + 90, top: y + portPos.in.top, left: x + portPos.in.left+equationWidth});
                input.setCoords();
            }else{
                for (var i = 1; i <= inputCount; i++){
                    var input = getObject(blockName+'I'+i);
                    input.set({angle: rotation + 90, top: y + portPos.in[inputCount][i-1].top, left: x + portPos.in[inputCount][i-1].left});
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
                    obj.set({left: 0});

                }
                if(obj.name === "out"){
                    obj.set({left: -15});
                    // obj.setCoords();
                }
            });
        }
        if(scheme[target.type].BlockType =="Product") {
            target._objects.forEach(function (obj) {
                if(obj.name==1 || obj.name === 2 || obj.name === 3 || obj.name === 4){
                    obj.set({left: 25});

                }
                if(obj.name === "out"){
                    obj.set({left: -40});
                    // obj.setCoords();
                }
            });
        }

        if(scheme[target.type].BlockType =="Sum") {
            target._objects.forEach(function (obj) {
                if(obj.name==="symbol"){
                    // console.log(obj.left) //-12.5
                    obj.set({left: 5});

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
                    obj.set({left: -18});

                }
                if(obj.name === "out"){
                    obj.set({left: 2});
                }
            });
        }
        if(scheme[target.type].BlockType =="Product") {
            target._objects.forEach(function (obj) {

                if(obj.name==1 ||obj.name === 2 || obj.name === 3 || obj.name === 4){
                    obj.set({left: -40.5});

                }
                if(obj.name === "out"){
                    obj.set({left: 24.5});
                }
            });
        }
        if(scheme[target.type].BlockType =="Sum") {
            target._objects.forEach(function (obj) {
                if(obj.name==="symbol"){
                    // console.log(obj.left) //-12.5
                    obj.set({left: -12.5});

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
                    input.set({angle: rotation + 90, top: y + portPos.in[inputCount][i-1].top, left: x + portPos.in[inputCount][i-1].left});
                    input.setCoords();
                }
            }
        }
        if (ports == 'both' || ports == 'out') {
            var input = getObject(blockName + 'O');
            input.set({angle: rotation + 90, top: y + portPos.out.top-equationWidth, left: x + portPos.out.left});
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
                    input.set({angle: 90, top: y + portPos.in[inputCount][i-1].top, left: x + portPos.in[inputCount][i-1].left});
                    input.setCoords();
                }
            }
        }
        if (ports == 'both' || ports == 'out') {
            var input = getObject(blockName + 'O');
            input.set({angle: 90, top: y + portPos.out.top, left: x + portPos.out.left+equationWidth});
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
    // var type = blockType + blockOrder;
    var type = blockName;
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
        else if(part.type === 'name'){
            blockGroup[i] = new fabric.IText(type, part.data);
            if(!showNames){
                blockGroup[i].set({fill:"transparent"});
            }
        }
    });

    // console.log(blockGroup);

    var io = data[blockType][0].io;
    var ports = data[blockType][0].ports;
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
        if (numberOfInputs === 1 || blockType === 'Point') {
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
        "connectedLines":[],
        "equationWidth":0
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
                ///^-?\d+( -?\d+)*$/
                ///^\[(-?\d+(\.\d+)?( -?\d+(\.\d+)?)*)\]$/
                if (denominator.match(/^-?\d+( -?\d+)*$/)) {
                    if (numerator.match(/^-?\d+( -?\d+)*$/)) {
                        var numeratorArr;
                        var numOutput = "";
                        numeratorArr = numerator.split(" ");
                        var exponent = numeratorArr.length - 1;
                        var symbolsNum = [];
                        var eqNumOut = "";

                        for (var i = 0; i < numeratorArr.length; i++) {
                            if (numeratorArr[i] === "1") {
                                if (exponent > 1) {
                                    numOutput += "s^{" + exponent+"}";
                                    eqNumOut += "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    numOutput += "s";
                                    eqNumOut += "s";
                                    exponent--;
                                }
                                else {
                                    numOutput += numeratorArr[i];
                                    eqNumOut += numeratorArr[i];
                                }
                            }
                            else if (numeratorArr[i] === "-1") {
                                if (exponent > 1) {
                                    if(i == 0){
                                        numOutput+="-";
                                        eqNumOut+="-";
                                    }

                                    numOutput += "s^{" + exponent+"}";
                                    eqNumOut += "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    if(i == 0){
                                        numOutput+="-";
                                        eqNumOut+="-";
                                    }
                                    numOutput += "s";
                                    eqNumOut += "s";
                                    exponent--;
                                }
                                else {
                                    if(i == 0){
                                        numOutput+="-";
                                        eqNumOut+="-";
                                    }
                                    numOutput += numeratorArr[i].substr(1,numeratorArr[i].length -1);
                                    eqNumOut+= numeratorArr[i].substr(1,numeratorArr[i].length -1);
                                }
                            }
                            else if(numeratorArr[i] === "0"){
                                exponent--;
                            }
                            else if(numeratorArr[i].substr(0,1) === "-"){
                                if (exponent > 1) {
                                    if(i == 0){
                                        numOutput+="-";
                                        eqNumOut+="-";
                                    }
                                    numOutput += numeratorArr[i].substr(1,numeratorArr[i].length) + "s^{" + exponent+"}";
                                    eqNumOut += numeratorArr[i].substr(1,numeratorArr[i].length) + "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    if(i == 0){
                                        numOutput+="-";
                                        eqNumOut+="-";
                                    }
                                    numOutput += numeratorArr[i].substr(1,numeratorArr[i].length) + "s";
                                    eqNumOut+= numeratorArr[i].substr(1,numeratorArr[i].length) + "s";
                                    exponent--;
                                }
                                else {
                                    if(i == 0){
                                        numOutput+="-";
                                        eqNumOut+="-";
                                    }
                                    numOutput += numeratorArr[i].substr(1,numeratorArr[i].length);
                                    eqNumOut+= numeratorArr[i].substr(1,numeratorArr[i].length);
                                }
                            }else {
                                if (exponent > 1) {
                                    numOutput += numeratorArr[i] + "s^{" + exponent+"}";
                                    eqNumOut+= numeratorArr[i] + "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    numOutput += numeratorArr[i] + "s";
                                    eqNumOut+= numeratorArr[i] + "s";
                                    exponent--;
                                }
                                else {
                                    numOutput += numeratorArr[i];
                                    eqNumOut+= numeratorArr[i];
                                }
                            }

                            if (i < numeratorArr.length - 1) {

                                if(i<numeratorArr.length - 1){
                                    if(numeratorArr[i+1].substr(0,1) === "-"){
                                        numOutput += "-";
                                        symbolsNum.push("-");
                                    }else if(numeratorArr[i+1] === "0"){
                                        continue;
                                    }
                                    else{
                                        numOutput += "+";
                                        symbolsNum.push("+");
                                    }
                                }else{
                                    numOutput += "+";
                                    symbolsNum.push("+");
                                }

                                eqNumOut+= "?";
                            }
                            //console.log(numOutput);
                        }
                        if (numOutput.substr(numOutput.length - 1, numOutput.length) == '+') {
                            numOutput = numOutput.slice(0, -1);
                            symbolsNum.pop();
                        }

                        var denominatorArr;
                        var denOutput = "";
                        denominatorArr = denominator.split(" ");
                        exponent = denominatorArr.length - 1;
                        var symbolsDen = [];
                        var eqDenOut = "";

                        for (var i = 0; i < denominatorArr.length; i++) {
                            if (denominatorArr[i] === "1") {
                                if (exponent > 1) {
                                    denOutput += "s^{" + exponent+"}";
                                    eqDenOut += "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    denOutput += "s";
                                    eqDenOut += "s";
                                    exponent--;
                                }
                                else {
                                    denOutput += denominatorArr[i];
                                    eqDenOut += denominatorArr[i];
                                }
                            }
                            else if (denominatorArr[i] === "-1") {
                                if (exponent > 1) {
                                    if(i == 0){
                                        denOutput+="-";
                                        eqDenOut+="-";
                                    }

                                    denOutput += "s^{" + exponent+"}";
                                    eqDenOut += "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    if(i == 0){
                                        denOutput+="-";
                                        eqDenOut+="-";
                                    }
                                    denOutput += "s";
                                    eqDenOut += "s";
                                    exponent--;
                                }
                                else {
                                    if(i == 0){
                                        denOutput+="-";
                                        eqDenOut+="-";
                                    }
                                    denOutput += denominatorArr[i].substr(1,denominatorArr[i].length -1);
                                    eqDenOut+= denominatorArr[i].substr(1,denominatorArr[i].length -1);
                                }
                            }
                            else if(denominatorArr[i] === "0"){
                                exponent--;
                            }
                            else if(denominatorArr[i].substr(0,1) === "-"){
                                if (exponent > 1) {
                                    if(i == 0){
                                        denOutput+="-";
                                        eqDenOut+="-";
                                    }
                                    denOutput += denominatorArr[i].substr(1,denominatorArr[i].length) + "s^{" + exponent+"}";
                                    eqDenOut += denominatorArr[i].substr(1,denominatorArr[i].length) + "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    if(i == 0){
                                        denOutput+="-";
                                        eqDenOut+="-";
                                    }
                                    denOutput += denominatorArr[i].substr(1,denominatorArr[i].length) + "s";
                                    eqDenOut+= denominatorArr[i].substr(1,denominatorArr[i].length) + "s";
                                    exponent--;
                                }
                                else {
                                    if(i == 0){
                                        denOutput+="-";
                                        eqDenOut+="-";
                                    }
                                    denOutput += denominatorArr[i].substr(1,denominatorArr[i].length);
                                    eqDenOut+= denominatorArr[i].substr(1,denominatorArr[i].length);
                                }
                            }else {
                                if (exponent > 1) {
                                    denOutput += denominatorArr[i] + "s^{" + exponent+"}";
                                    eqDenOut+= denominatorArr[i] + "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    denOutput += denominatorArr[i] + "s";
                                    eqDenOut+= denominatorArr[i] + "s";
                                    exponent--;
                                }
                                else {
                                    denOutput += denominatorArr[i];
                                    eqDenOut+= denominatorArr[i];
                                }
                            }

                            if (i < denominatorArr.length - 1) {

                                if(i<denominatorArr.length - 1){
                                    if(denominatorArr[i+1].substr(0,1) === "-"){
                                        denOutput += "-";
                                        symbolsDen.push("-");
                                    }else if(denominatorArr[i+1] === "0"){
                                        continue;
                                    }
                                    else{
                                        denOutput += "+";
                                        symbolsDen.push("+");
                                    }
                                }else{
                                    denOutput += "+";
                                    symbolsDen.push("+");
                                }

                                eqDenOut+= "?";
                            }
                            //console.log(denOutput);
                        }
                        if (denOutput.substr(denOutput.length - 1, denOutput.length) == '+') {
                            denOutput = denOutput.slice(0, -1);
                            symbolsDen.pop();
                        }

                        var resultTex = '\\dfrac{' + numOutput + '}{' + denOutput + '}';

                        scheme[changingElement.type].extra = [numerator,denominator];

                        scheme[changingElement.type].equation = [eqNumOut,eqDenOut];

                        scheme[changingElement.type].symbolsNum = symbolsNum;
                        scheme[changingElement.type].symbolsDen = symbolsDen;

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
                    scheme[changingElement.type].extra = [numerator,denominator];
                    scheme[changingElement.type].equation = [numerator,denominator];
                    scheme[changingElement.type].tex_result = numerator;
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

}

function vypocetTransferFcn(){
    $("#transfer-numer").removeClass("is-invalid")
    $("#transfer-denom").removeClass("is-invalid")
    $("#block-error").html("");
    var objPar = blockParameters[changingElement.BlockType];
    if ($('#transfer-numer').length && $('#transfer-denom').length) {

        var numerator = $('#transfer-numer').val().substring(1, $('#transfer-numer').val().length-1) ;
        var denominator = $('#transfer-denom').val().substring(1, $('#transfer-denom').val().length-1) ;

        if (scheme[changingElement.type].extra[0] != numerator || scheme[changingElement.type].extra[1] != denominator) {
            // console.log(scheme[changingElement.type].extra)
            if (denominator != '1') {
                ///^-?\d+( -?\d+)*$/
                ///^\[(-?\d+(\.\d+)?( -?\d+(\.\d+)?)*)\]$/
                if (denominator.match(/^-?\d+(\.\d+)?( -?\d+(\.\d+)?)*$/)) {
                    if (numerator.match(/^-?\d+(\.\d+)?( -?\d+(\.\d+)?)*$/)) {
                        var numeratorArr;
                        var numOutput = "";
                        numeratorArr = numerator.split(" ");
                        var exponent = numeratorArr.length - 1;

                        for (var i = 0; i < numeratorArr.length; i++) {
                            if (numeratorArr[i] === "1") {
                                if (exponent > 1) {
                                    numOutput += "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    numOutput += "s";
                                    exponent--;
                                }
                                else {
                                    numOutput += numeratorArr[i];
                                }
                            }else if(numeratorArr[i] === "0"){
                                exponent--;
                            }
                            else {
                                if (exponent > 1) {
                                    numOutput += numeratorArr[i] + "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    numOutput += numeratorArr[i] + "s";
                                    exponent--;
                                }
                                else {
                                    numOutput += numeratorArr[i];
                                }
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
                            if (denArray[j] === "1") {
                                if (exponent > 1) {
                                    denOutput += "s^{" + exponent+"}";
                                    exponent--;
                                }
                                else if (exponent === 1) {
                                    denOutput += "s";
                                    exponent--;
                                }
                                else {
                                    denOutput += denArray[j];
                                }
                            }else if(denArray[j] === "0"){
                                exponent--;
                            }
                            else {
                                if (exponent > 1) {
                                    denOutput += denArray[j] + "s^{" + exponent+"}";
                                    exponent--;
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


                            if (j < denArray.length - 1 && denArray[j] !== '0') {
                                denOutput += "+";
                            }
                        }
                        if (denOutput.substr(denOutput.length - 1, denOutput.length) == '+') {
                            denOutput = denOutput.slice(0, -1);
                        }

                        var resultTex = '\\dfrac{' + numOutput + '}{' + denOutput + '}';


                        numerator="["+numerator+"]"
                        denominator="["+denominator+"]"
                        scheme[changingElement.type].extra = [numerator,denominator];

                        scheme[changingElement.type].equation = [numOutput,denOutput];

                        $.each(objPar, function (i, subPar) {
                            //console.log(objPar);
                            if (subPar.type == 'text') {
                                scheme[changingElement.type].tex_result = resultTex;
                            }
                        });
                    } else {
                        $("#transfer-numer").addClass("is-invalid")
                        $("#block-error").html("Invalid numerator!");
                        return;
                    }
                } else {
                    $("#transfer-denom").addClass("is-invalid")
                    $("#block-error").html("Invalid denominator!");
                    return;
                }
            } else {
                if (numerator.match(/(^-?[a-zA-Z][0-9]*$)|(^-?[0-9]+$)|(^-?\d+(\.\d+)?)/)) {
                    scheme[changingElement.type].extra = [numerator,denominator];
                    scheme[changingElement.type].equation = [numerator,denominator];
                    scheme[changingElement.type].tex_result = numerator;
                }
                else {
                    $("#transfer-numer").addClass("is-invalid")
                    $("#block-error").html("Invalid numerator!");
                    return;
                }
            }
        }
    }
    var nieco = document.getElementById('transfer-text')
    var val = scheme[changingElement.type].tex_result;
    console.log(val)
    katex.render(val, nieco);

}