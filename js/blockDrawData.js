var url = window.location.href;
var schema = url.split('#')[1];
if(schema == "rlc" || schema == "") {
    var blockDrawData = {
        "Resistor":
            [
                {
                    "type": "path",
                    "path": "M 0 5 L 10 5",
                    "data": {
                        "width": 40,
                        "height": 20,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 10,
                        "left": 10,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 5 L 10 5",
                    "data": {
                        "top": 5,
                        "left": 40,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                },
                {
                    "type": "name",
                    "Text": "Resistor",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 14,
                        "left": 3,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": true
                    }
    
                }
            ], "Point":
            [
                {
                    "type": "circle",
                    "data": {
                        "width": 40,
                        "height": 20,
                        "radius": 5,
                        "fill": "black"
                    }
                },
                {
                    "type": "circle",
                    "data": {
                        "radius": 8,
                        "fill": false,
                        "top": 12,
                        "invisible": true
                    }
                }
            ], "Inductor":
            [
                {
                    "type": "path",
                    "path": "M 1,8.5 L 6.5,8.5 C 6.5,8.5 6.5,4.5 10.5,4.5 C 14.5,4.5 14.5,8.5 14.5,8.5 C 14.5,8.5 14.5,4.5 18.5,4.5 C 22.5,4.5 22.5,8.5 22.5,8.5 C 22.5,8.5 22.5,4.5 26.5,4.5 C 30.5,4.5 30.5,8.5 30.5,8.5 C 30.5,8.5 30.5,4.5 34.5,4.5 C 38.5,4.5 38.5,8.5 38.5,8.5 L 44,8.5",
                    "data": {
                        "width": 40,
                        "height": 20,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                },
                {
                    "type": "name",
                    "Text": "Inductor",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 15,
                        "left": 1,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": true
                    }
    
                }
            ], "Capacitor":
            [
                {
                    "type": "path",
                    "path": "M 0 0 L 15 0",
                    "data": {
                        "width": 40,
                        "height": 30,
                        "top": 10,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 0 20",
                    "data": {
                        "left": 15,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 0 20",
                    "data": {
                        "left": 20,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 15 0",
                    "data": {
                        "top": 10,
                        "left": 20,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                },
                {
                    "type": "name",
                    "Text": "Capacitor",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 9,
                        "fill": "black",
                        "changeable": true
                    }
                }
            ], "Uin":
            [
                {
                    "type": "circle",
                    "data": {
                        "width": 40,
                        "height": 30,
                        "radius": 11,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "circle",
                    "data": {
                        "radius": 14,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "name",
                    "Text": "Uin",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 22,
                        "left": 1,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": true
                    }
                }
            ], "Uout":
            [
                {
                    "type": "circle",
                    "data": {
                        "width": 40,
                        "height": 30,
                        "radius": 11,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "name",
                    "Text": "Uout",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 22,
                        "left": 1,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": true
                    }
                },
                {
                    "type": "text",
                    "Text": "V",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 7,
                        "left": 7,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ]
    };
    
    var blockParameters = {
        "Resistor":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "BlockType": "Resistor",
                    "title": "Parametre rezistor"
                }
            ], "Inductor":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "BlockType": "Inductor",
                    "title": "Parametre inductor"
                }
            ], "Capacitor":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "BlockType": "Capacitor",
                    "title": "Parametre capacitor"
                }
            ], "Uin":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 1,
                    "NumOfBot": 1,
                    "BlockType": "Uin",
                    "title": "Parametre napatie vstup"
                }
            ], "Uout":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 1,
                    "NumOfBot": 1,
                    "BlockType": "Uout",
                    "title": "Parametre napatie vystup"
                }
            ], "Point":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 3,
                    "NumberOfOutputs": 9,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "BlockType": "Point",
                    "title": "Parametre uzol",
                    "baseBlockPoint": true
                }
            ]
    };   
}
else if(schema == "algebra") {
    var blockDrawData = {
        "Multiply":[
            {
                "type":"rect",
                "data":{
                    "width":45,
                    "height":60,
                    "fill":false,
                    "stroke":false,
                    "invisible":true
                }
            },
            {
                "type":"rect",
                "data":{
                    "width":40,
                    "height":40,
                    "fill":"white",
                    "stroke":"black"
                }
            },
            {   "type":"text",
                "Text":"F",
                "data":{
                    "fontFamily": "Arial",
                    "top":16,
                    "left":16,
                    "fontSize": 12,
                    "fill": "black",
                    "changeable":true
                }
            }
        ]
        ,"Sumator":
        [
            {
                "type":"rect",
                "data":{
                    "width":45,
                    "height":60,
                    "fill":false,
                    "stroke":false,
                    "invisible":true
                }
            },
            {
                "type":"rect",
                "data":{
                    "width":40,
                    "height":40,
                    "fill":"white",
                    "stroke":"black"
                }
            },
            {   "type":"text",
                "Text":"+",
                "data":{
                    "fontFamily": "Arial",
                    "top":8,
                    "left":5,
                    "fontSize": 12,
                    "fill": "black",
                    "extra":"sumator-first",
                    "changeable":false
                }
            },
            {   "type":"text",
                "Text":"+",
                "data":{
                    "fontFamily": "Arial",
                    "top":20,
                    "left":5,
                    "fontSize": 12,
                    "fill": "black",
                    "extra":"sumator-second",
                    "changeable":false
                }
            }
        ],"IOin":
        [
            {
                "type":"rect",
                "data":{
                    "width":45,
                    "height":60,
                    "fill":false,
                    "stroke":false,
                    "invisible":true
                }
            },
            {
                "type":"rect",
                "data":{
                    "width":40,
                    "height":40,
                    "fill":"white",
                    "stroke":"black"
                }
            },
            {   "type":"text",
                "Text":"Uin",
                "data":{
                    "fontFamily": "Arial",
                    "top":16,
                    "left":12,
                    "fontSize": 12,
                    "fill": "black",
                    "changeable":false
                }
            }
        ],"IOout":
        [
            {
                "type":"rect",
                "data":{
                    "width":45,
                    "height":60,
                    "fill":false,
                    "stroke":false,
                    "invisible":true
                }
            },
            {
                "type":"rect",
                "data":{
                    "width":40,
                    "height":40,
                    "fill":"white",
                    "stroke":"black"
                }
            },
            {   "type":"text",
                "Text":"Uout",
                "data":{
                    "fontFamily": "Arial",
                    "top":16,
                    "left":8,
                    "fontSize": 12,
                    "fill": "black",
                    "changeable":false
                }
            }
        ]
    };
    
    var blockParameters = {"Multiply":
        [
            {   "io":"both",
                "NumberOfInputs":1,
                "NumberOfOutputs":1,
                "MaxInputs":1,
                "ports":null,
                "NumOfTop":0,
                "NumOfBot":0,
                "hasExtra":true,
                "defaultExtra":{0:"F",1:"1"},
                "BlockType":"Multiply",
                "specific":true,
                "title":"Parametre multiply"
            },
            {
                "type":"input",
                "data":
                    {
                        "title":"Numerator",
                        "id":"multiply-citatel",
                        "default_value":"F",
                        "number":0
                    }
            },
            {
                "type":"input",
                "data":
                    {
                        "title":"Denominator",
                        "id":"multiply-menovatel",
                        "default_value":"1",
                        "number":1
                    }
            },
            {
                "type":"text",
                "data":
                    {
                        "id":"multiply-text",
                        "title":"Function",
                        "value":"F"
                    }
            }
        ],"Sumator":
        [
            {   "io":"both",
                "NumberOfInputs":2,
                "NumberOfOutputs":1,
                "MaxInputs":1,
                "ports":null,
                "NumOfTop":0,
                "NumOfBot":0,
                "BlockType":"Sumator",
                "hasExtra":true,
                "defaultExtra":["+","+"],
                "specific":true,
                "title":"Parametre sumator"
            },
            {
                "type":"input",
                "data":
                    {
                        "title":"1. input",
                        "id":"sumator-first",
                        "default_value":"+",
                        "number":0
                    }
            },
            {
                "type":"input",
                "data":
                    {
                        "title":"2. input",
                        "id":"sumator-second",
                        "default_value":"+",
                        "number":1
                    }
            }
        ],"IOin":
        [
            {   "io":"out",
                "NumberOfInputs":0,
                "NumberOfOutputs":1,
                "MaxInputs":0,
                "ports":null,
                "NumOfTop":0,
                "NumOfBot":0,
                "BlockType":"IOin",
                "title":"Parametre IOin"
            }
        ],"IOout":
        [
            {   "io":"in",
                "NumberOfInputs":1,
                "NumberOfOutputs":0,
                "MaxInputs":1,
                "ports":null,
                "NumOfTop":0,
                "NumOfBot":0,
                "BlockType":"IOout",
                "title":"Parametre IOout"
            }
        ]};
}
else if(schema == "blockSim") {
    var blockDrawData = {
        "AnalogInput":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 50,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "Analog\n input",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 3,
                        "left": 8,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "AnalogOutput":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 50,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "Analog\n output",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 3,
                        "left": 8,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Clock":
            [
                {
                    "type": "circle",
                    "data":
                    {
                        "height": 40,
                        "width": 50,
                        "radius": 13,
                        "top": 10,
                        "left": 5,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "circle",
                    "data":
                    {
                        "radius": 10,
                        "left": 5,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 7 0",
                    "data":
                    {
                        "left": 15,
                        "top": 10,
                        "stroke": "black"
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 0 7",
                    "data":
                    {
                        "left": 15,
                        "top": 3,
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "Clock",
                    "data":
                    {
                        "fontFamily": "Arial",
                        "top": 20,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Constant":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 45,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 8,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 10,
                        "left": 18,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Constant",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Demux":
            [
    
                {
                    "type": "text",
                    "Text": "Demux",
                    "data": {
                        "width": 10,
                        "height": 40,
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 5,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 5,
                        "height": 30,
                        "left": 15,
                        "fill": "white",
                        "stroke": "black"
                    }
                }
            ], "Mux":
            [
    
                {
                    "type": "text",
                    "Text": "Mux",
                    "data": {
                        "width": 10,
                        "height": 40,
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 5,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 5,
                        "height": 30,
                        "left": 6,
                        "fill": "white",
                        "stroke": "black"
                    }
                }
            ], "Derivative":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 35,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 8,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "du/dt",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 10,
                        "left": 10,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Derivative",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "DigitalClock":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 50,
                        "height": 30,
                        "left": 4,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "12:00",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 10,
                        "left": 14,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Digital clock",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Display":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 50,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 40,
                        "height": 12,
                        "left": 5,
                        "top": 5,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "0",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 5,
                        "left": 36,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Display",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 8,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Fcn":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 50,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "f(u)",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 10,
                        "left": 15,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Fcn",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 15,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Gain":
            [
                {
                    "type": "triangle",
                    "data":
                    {
                        "left": 45,
                        "top": 20,
                        "strokeWidth": 1,
                        "width": 30,
                        "height": 30,
                        "stroke": false,
                        "fill": false,
                        "angle": 90,
                        "invisible": true
    
                    }
                },
                {
                    "type": "triangle",
                    "data":
                    {
                        "left": 40,
                        "top": 0,
                        "strokeWidth": 1,
                        "width": 30,
                        "height": 30,
                        "stroke": "black",
                        "fill": "white",
                        "angle": 90
    
                    }
                },
                {
                    "type": "text",
                    "Text": "1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 10,
                        "left": 15,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Gain",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 10,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Integrator":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 45,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 8,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 3,
                        "left": 18,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 7 0",
                    "data":
                    {
                        "left": 18,
                        "top": 16,
                        "stroke": "black",
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "s",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 15,
                        "left": 19,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Integrator",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Product":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 50,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "x",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 10,
                        "left": 20,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Product",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 5,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Scope":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 45,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 35,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 24,
                        "height": 15,
                        "top": 3,
                        "left": 3,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "Scope",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 35,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "StateSpace":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 30,
                        "left": 0,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "x'=Ax+Bu",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 4,
                        "left": 4,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "y=Cx+Du",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 14,
                        "left": 5,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "State-Space",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Sum":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 35,
                        "height": 50,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "+",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 3,
                        "left": 3,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "+",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 15,
                        "left": 3,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Sum",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 3,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "SimOut":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 50,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "simout",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 10,
                        "left": 10,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Workspace",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "TransferFcn":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 55,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 53,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 3,
                        "left": 20,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 10 0",
                    "data":
                    {
                        "left": 18,
                        "top": 16,
                        "stroke": "black",
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "s+1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 15,
                        "left": 15,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "TransferFcn",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "TransportDelay":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 35,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 5,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 13 L 5 0",
                    "data":
                    {
                        "left": 8,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 13 L 5 0",
                    "data":
                    {
                        "left": 13,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 5 0",
                    "data":
                    {
                        "left": 8,
                        "top": 19,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 3 0",
                    "data":
                    {
                        "left": 13,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 5 19",
                    "data":
                    {
                        "left": 16,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 3 0",
                    "data":
                    {
                        "left": 21,
                        "top": 25,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 18 L 5 0",
                    "data":
                    {
                        "left": 24,
                        "top": 6,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 13 L 5 0",
                    "data":
                    {
                        "left": 8,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 3 0",
                    "data":
                    {
                        "left": 18,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 5 19",
                    "data":
                    {
                        "left": 21,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 3 0",
                    "data":
                    {
                        "left": 26,
                        "top": 25,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "Transport",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Delay",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 40,
                        "left": 6,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "UnitDelay":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 45,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 8,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 3,
                        "left": 18,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 7 0",
                    "data":
                    {
                        "left": 18,
                        "top": 16,
                        "stroke": "black",
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "z",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 15,
                        "left": 19,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Unit Delay",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Step":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 45,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 8,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 13 0 M 13 0 L 13 -20 L 25 -20 ",
                    "data":
                    {
                        "left": 10,
                        "top": 5,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "Step",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 10,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Saturation":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 45,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 8,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 24 0",
                    "data":
                    {
                        "left": 11,
                        "top": 15,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 0 24",
                    "data":
                    {
                        "left": 23,
                        "top": 3,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 6 0 L 18 -22 L 24 -22",
                    "data":
                    {
                        "left": 11,
                        "top": 4,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "Saturation",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "DiscreteTime":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 58,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 53,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "T",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 3,
                        "left": 20,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 10 0",
                    "data":
                    {
                        "left": 18,
                        "top": 16,
                        "stroke": "black",
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "z-1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 15,
                        "left": 15,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Discrete-T",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Integrator",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 40,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "DiscreteTransfer":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 58,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 53,
                        "height": 30,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "text",
                    "Text": "1",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 2,
                        "left": 20,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 25 0",
                    "data":
                    {
                        "left": 13,
                        "top": 15,
                        "stroke": "black",
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "z+0.5",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 15,
                        "left": 10,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "Discrete",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 7,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                },
                {
                    "type": "text",
                    "Text": "TransferFcn",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 40,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ], "Relay":
            [
                {
                    "type": "rect",
                    "data": {
                        "width": 35,
                        "height": 40,
                        "fill": false,
                        "stroke": false,
                        "invisible": true
                    }
                },
                {
                    "type": "rect",
                    "data": {
                        "width": 30,
                        "height": 30,
                        "left": 0,
                        "fill": "white",
                        "stroke": "black"
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 24 0",
                    "data":
                    {
                        "left": 3,
                        "top": 15,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 0 24",
                    "data":
                    {
                        "left": 15,
                        "top": 3,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 15 0",
                    "data":
                    {
                        "left": 9,
                        "top": 7,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 15 0",
                    "data":
                    {
                        "left": 5,
                        "top": 22,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 0 15",
                    "data":
                    {
                        "left": 9,
                        "top": 7,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "path",
                    "path": "M 0 0 L 0 15",
                    "data":
                    {
                        "left": 20,
                        "top": 7,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false,
                        "invisible": true
                    }
                },
                {
                    "type": "text",
                    "Text": "Relay",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 30,
                        "left": 0,
                        "fontSize": 11,
                        "fill": "black",
                        "changeable": false
                    }
                }
            ]
    };
    
    var blockParameters = {
        "AnalogInput":
            [
                {
                    "io": "out",
                    "NumberOfInputs": 0,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['0.1', '1', '1'],
                    "hasAttr": true,
                    "attributes": ['SampleTime', 'Channels', 'RangeMode'],
                    "BlockType": "AnalogInput",
                    "title": "Parametre analog input"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Sample time",
                        "id": "analogin-sample",
                        "default_value": "0.1",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Input channels",
                        "id": "analogin-channels",
                        "default_value": "1",
                        "number": 1
                    }
                },
                {
                    "type": "selectbox",
                    "data":
                    {
                        "title": "Input range",
                        "id": "analogin-range",
                        "number": 2,
                        "opt":
                            [
                                {
                                    "value": "1",
                                    "name": "-10 to 10 V"
                                }
                            ]
                    }
                }
            ], "AnalogOutput":
            [
                {
                    "io": "in",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 0,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['0.1', '1', '1', ' ', ' '],
                    "hasAttr": true,
                    "attributes": ['SampleTime', 'Channels', 'RangeMode', 'InitialValue', 'FinalValue'],
                    "BlockType": "AnalogOutput",
                    "title": "Parametre analog output"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Sample time",
                        "id": "analogout-sample",
                        "default_value": "0.1",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Output channels",
                        "id": "analogout-channels",
                        "default_value": "1",
                        "number": 1
                    }
                },
                {
                    "type": "selectbox",
                    "data":
                    {
                        "title": "Output range",
                        "id": "analogout-range",
                        "number": 2,
                        "opt":
                            [
                                {
                                    "value": "1",
                                    "name": "-10 to 10 V"
                                }
                            ]
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial value",
                        "id": "analogout-initial",
                        "default_value": "",
                        "number": 3
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Final value",
                        "id": "analogout-final",
                        "default_value": "",
                        "number": 4
                    }
                }
            ], "Clock":
            [
                {
                    "io": "out",
                    "NumberOfInputs": 0,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['10'],
                    "hasAttr": true,
                    "attributes": ['Decimation'],
                    "BlockType": "Clock",
                    "title": "Parametre clock"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Decimation",
                        "id": "clock-decim",
                        "default_value": "10",
                        "number": 0
                    }
                }
            ], "Constant":
            [
                {
                    "io": "out",
                    "NumberOfInputs": 0,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1'],
                    "hasAttr": true,
                    "attributes": ['Value'],
                    "BlockType": "Constant",
                    "title": "Parametre constant"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Constant value",
                        "id": "constant-value",
                        "default_value": "1",
                        "number": 0
                    }
                }
            ], "Demux":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 4,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": false,
                    "defaultExtra": null,
                    "BlockType": "Demux",
                    "title": "Parametre demux"
                }
            ], "Mux":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 2,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 4,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": false,
                    "defaultExtra": null,
                    "BlockType": "Mux",
                    "title": "Parametre mux"
                }
            ], "Derivative":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['inf'],
                    "hasAttr": true,
                    "attributes": ['Coefficient'],
                    "BlockType": "Derivative",
                    "title": "Parametre derivative"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Coefficient",
                        "id": "deriv-coef",
                        "default_value": "inf",
                        "number": 0
                    }
                }
            ], "DigitalClock":
            [
                {
                    "io": "out",
                    "NumberOfInputs": 0,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1'],
                    "hasAttr": true,
                    "attributes": ['SampleTime'],
                    "BlockType": "DigitalClock",
                    "title": "Parametre digital clock"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Sample time",
                        "id": "dclock-sample",
                        "default_value": "1",
                        "number": 0
                    }
                }
            ], "Display":
            [
                {
                    "io": "in",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 0,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1'],
                    "hasAttr": true,
                    "attributes": ['Decimation'],
                    "BlockType": "DigitalClock",
                    "title": "Parametre digital clock"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Decimation",
                        "id": "display-decim",
                        "default_value": "1",
                        "number": 0
                    }
                }
            ], "Fcn":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['sin(u(1)*exp(2.3*(-u(2))))'],
                    "hasAttr": true,
                    "attributes": ['Expression'],
                    "BlockType": "Fcn",
                    "title": "Parametre fcn"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Expression",
                        "id": "fcn-expression",
                        "default_value": "sin(u(1)*exp(2.3*(-u(2))))",
                        "number": 0
                    }
                }
            ], "Gain":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1'],
                    "hasAttr": true,
                    "attributes": ['Gain'],
                    "BlockType": "Gain",
                    "title": "Parametre gain"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Gain",
                        "id": "gain-value",
                        "default_value": "1",
                        "number": 0
                    }
                }
            ], "Integrator":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['0', 'false', 'inf', '-inf'],
                    "hasAttr": true,
                    "attributes": ['InitialCondition', 'LimitOutput', 'UpperSaturationLimit', 'LowerSaturationLimit'],
                    "BlockType": "Integrator",
                    "title": "Parametre integrator"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial condition",
                        "id": "integrator-initial",
                        "default_value": "0",
                        "number": 0
                    }
                },
                {
                    "type": "checkbox",
                    "data":
                    {
                        "title": " Limit output",
                        "id": "integ-limit",
                        "value": "false",
                        "number": 1
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Upper saturation limit",
                        "id": "integrator-upper",
                        "default_value": "inf",
                        "number": 2
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Lower saturation limit",
                        "id": "integrator-lower",
                        "default_value": "-inf",
                        "number": 3
                    }
                }
            ], "Product":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 2,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 4,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": false,
                    "defaultExtra": null,
                    "BlockType": "Product",
                    "title": "Parametre product"
                }
            ], "Scope":
            [
                {
                    "io": "in",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 0,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": false,
                    "defaultExtra": null,
                    "BlockType": "Product",
                    "title": "Parametre product"
                }
            ], "StateSpace":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1', '1', '1', '1', '0'],
                    "hasAttr": true,
                    "attributes": ['A', 'B', 'C', 'D', 'X0'],
                    "BlockType": "StateSpace",
                    "title": "Parametre state-space"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "A",
                        "id": "state-a",
                        "default_value": "1",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "B",
                        "id": "state-b",
                        "default_value": "1",
                        "number": 1
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "C",
                        "id": "state-c",
                        "default_value": "1",
                        "number": 2
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "D",
                        "id": "state-d",
                        "default_value": "1",
                        "number": 3
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial conditions",
                        "id": "state-initial",
                        "default_value": "0",
                        "number": 4
                    }
                }
            ], "Sum":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 2,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['|++'],
                    "hasAttr": true,
                    "attributes": ['Signs'],
                    "BlockType": "StateSpace",
                    "title": "Parametre state-space"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "List of signs",
                        "id": "sum-signs",
                        "default_value": "|++",
                        "number": 0
                    }
                }
            ], "SimOut":
            [
                {
                    "io": "in",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 0,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['simout', 'inf', '1', 'strucwtime'],
                    "hasAttr": true,
                    "attributes": ['VariableName', 'MaxDataPoints', 'Decimation', 'SaveFormat'],
                    "BlockType": "SimOut",
                    "title": "Parametre simout"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Variable name",
                        "id": "works-name",
                        "default_value": "simout",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Limit data points to last",
                        "id": "works-limit",
                        "default_value": "inf",
                        "number": 1
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Decimation",
                        "id": "works-decim",
                        "default_value": "1",
                        "number": 2
                    }
                },
                {
                    "type": "selectbox",
                    "data":
                    {
                        "title": "Output range",
                        "id": "analogout-range",
                        "number": 3,
                        "opt":
                            [
                                {
                                    "value": "strucwtime",
                                    "name": "Structure with time"
                                },
                                {
                                    "value": "struc",
                                    "name": "Structure"
                                },
                                {
                                    "value": "arr",
                                    "name": "Array"
                                },
                                {
                                    "value": "timeseries",
                                    "name": "Timeseries"
                                }
                            ]
                    }
                }
            ], "TransferFcn":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['[1]', '[1 1]'],
                    "hasAttr": true,
                    "attributes": ['Numerator', 'Denominator'],
                    "BlockType": "TransferFcn",
                    "title": "Parametre transfer function"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Numerator",
                        "id": "transfer-numer",
                        "default_value": "[1]",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Denominator",
                        "id": "transfer-denom",
                        "default_value": "[1 1]",
                        "number": 1
                    }
                }
            ], "TransportDelay":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1', '0'],
                    "hasAttr": true,
                    "attributes": ['TimeDelay', 'InitialOutput'],
                    "BlockType": "TransportDelay",
                    "title": "Parametre transport delay"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Time delay",
                        "id": "transdelay-time",
                        "default_value": "1",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial output",
                        "id": "transdelay-output",
                        "default_value": "0",
                        "number": 1
                    }
                }
            ], "UnitDelay":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1', '0'],
                    "hasAttr": true,
                    "attributes": ['DelayLength', 'InitialCondition'],
                    "BlockType": "UnitDelay",
                    "title": "Parametre unit delay"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Delay length",
                        "id": "delay-length",
                        "default_value": "1",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial condition",
                        "id": "delay-initial",
                        "default_value": "0",
                        "number": 1
                    }
                }
            ], "Step":
            [
                {
                    "io": "out",
                    "NumberOfInputs": 0,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1', '0', '1'],
                    "hasAttr": true,
                    "attributes": ['StepTime', 'InitialValue', 'FinalValue'],
                    "BlockType": "Step",
                    "title": "Parametre step"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Step time",
                        "id": "step-time",
                        "default_value": "1",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial value",
                        "id": "step-initial",
                        "default_value": "0",
                        "number": 1
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Final value",
                        "id": "step-final",
                        "default_value": "1",
                        "number": 2
                    }
                }
            ], "Saturation":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['0.5', '-0.5'],
                    "hasAttr": true,
                    "attributes": ['UpperLimit', 'LowerLimit'],
                    "BlockType": "Saturation",
                    "title": "Parametre saturation"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Upper limit",
                        "id": "saturation-upper",
                        "default_value": "0.5",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Lower limit",
                        "id": "saturation-lower",
                        "default_value": "-0.5",
                        "number": 1
                    }
                }
            ], "DiscreteTime":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['1.0', '0', '1', 'false', 'inf', '-inf'],
                    "hasAttr": true,
                    "attributes": ['Gain', 'InitialCondition', 'SampleTime', 'MaxDataPoints', 'UpperSaturationLimit', 'LowerSaturationLimit'],
                    "BlockType": "DiscreteTime",
                    "title": "Parametre discrete time integrator"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Gain",
                        "id": "discretetime-gain",
                        "default_value": "1.0",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial condition",
                        "id": "discretetime-initial",
                        "default_value": "0",
                        "number": 1
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Sample Time",
                        "id": "discretetime-sample",
                        "default_value": "1",
                        "number": 2
                    }
                },
                {
                    "type": "checkbox",
                    "data":
                    {
                        "title": " Limit output",
                        "id": "integ-limit",
                        "value": "false",
                        "number": 3
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Upper saturation limit",
                        "id": "discretetime-upper",
                        "default_value": "inf",
                        "number": 4
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Lower saturation limit",
                        "id": "discretetime-lolwer",
                        "default_value": "-inf",
                        "number": 5
                    }
                }
            ], "DiscreteTransfer":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['[1]', '[1 0.5]', '0'],
                    "hasAttr": true,
                    "attributes": ['Numetator', 'Denominator', 'InitialStates'],
                    "BlockType": "DiscreteTransfer",
                    "title": "Parametre discrete transfer fcn"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Numerator",
                        "id": "distrans-num",
                        "default_value": "[1]",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Denominator",
                        "id": "distrans-denom",
                        "default_value": "[1 0.5]",
                        "number": 1
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Initial states",
                        "id": "distrans-initial",
                        "default_value": "0",
                        "number": 2
                    }
                }
            ], "Relay":
            [
                {
                    "io": "both",
                    "NumberOfInputs": 1,
                    "NumberOfOutputs": 1,
                    "MaxInputs": 1,
                    "ports": null,
                    "NumOfTop": 0,
                    "NumOfBot": 0,
                    "hasExtra": true,
                    "defaultExtra": ['eps', 'eps', '1', '0'],
                    "hasAttr": true,
                    "attributes": ['OnSwitchValue', 'OffSwitchValue', 'OnOutputValue', 'OffOutputValue'],
                    "BlockType": "Relay",
                    "title": "Parametre relay"
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Switch on point",
                        "id": "relay-switchon",
                        "default_value": "eps",
                        "number": 0
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Switch off point",
                        "id": "relay-switchoff",
                        "default_value": "eps",
                        "number": 1
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Output when on",
                        "id": "relay-on",
                        "default_value": "1",
                        "number": 2
                    }
                },
                {
                    "type": "input",
                    "data":
                    {
                        "title": "Output when off",
                        "id": "relay-off",
                        "default_value": "0",
                        "number": 3
                    }
                }
            ]
    };
}

window.prepBlocks = function (typeBlock) {
    var cx;
    var blockData = blockDrawData[typeBlock];
    cx = new fabric.Canvas(typeBlock, { width: blockData[0].data.width + 40, height: blockData[0].data.height + 12 });
    cx.selection = false;
    var blockGroup = [];

    $.each(blockData, function (i, part) {
        if (part.type === 'rect')
            blockGroup[i] = new fabric.Rect(part.data);
        else if (part.type === 'path')
            blockGroup[i] = new fabric.Path(part.path, part.data);
        else if (part.type === 'circle')
            blockGroup[i] = new fabric.Circle(part.data);
        else if (part.type === 'text' || part.type === 'name')
            blockGroup[i] = new fabric.IText(part.Text, part.data);
        else if (part.type === 'triangle')
            blockGroup[i] = new fabric.Triangle(part.data);
    });

    var block = new fabric.Group(blockGroup);
    cx.add(block); cx.bringForward(block);
    block.evented = block.selectable = false;
}; 