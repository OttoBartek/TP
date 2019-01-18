var schemeType = "rlc"
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
                "type": "rect",
                "data": {
                    "name": "bound",
                    "width": 50,
                    "height": 25,
                    "left": 0,
                    "fill": false,
                    "stroke": false,
                    "invisible": true
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
                    "top": 13,
                    "left": 0,
                    "fontSize": 9,
                    "fill": "black",
                    "changeable": true
                }

            }
        ], "Point":
        [
            {
                "type": "path",
                "path": "M 0 0 L 40 0",
                "data": {
                    "width": 40,
                    "height": 30,
                    "left": 0,
                    "top": 5,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": false
                }
            },
            {
                "type": "rect",
                "data": {
                    "name": "bound",
                    "width": 40,
                    "height": 10,
                    "fill": false,
                    "invisible": true
                }
            },
            {
                "type": "circle",
                "data": {
                    "width": 40,
                    "height": 20,
                    "radius": 5,
                    "left": 15,
                    "fill": "black"
                }
            },
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
                    "top": 13,
                    "left": 0,
                    "fontSize": 9,
                    "fill": "black",
                    "changeable": true
                }

            },
            {
                "type": "rect",
                "data": {
                    "name": "bound",
                    "width": 44,
                    "height": 25,
                    "fill": false,
                    // "stroke": "blue"
                    "invisible": true
                }
            },
        ], "Capacitor":
        [
            {
                "type": "path",
                "path": "M 0 0 L 20 0",
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
                    "left": 20,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": false
                }
            },
            {
                "type": "path",
                "path": "M 0 0 L 0 20",
                "data": {
                    "left": 25,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": false
                }
            },
            {
                "type": "path",
                "path": "M 0 0 L 20 0",
                "data": {
                    "top": 10,
                    "left": 25,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": false
                }
            },
            {
                "type": "rect",
                "data": {
                    "name": "bound",
                    "width": 45,
                    "height": 35,
                    "fill": false,
                    // "stroke": "blue"
                    "invisible": true
                }
            },
            {
                "type": "name",
                "Text": "Capacitor",
                "data": {
                    "fontFamily": "Arial",
                    "top": 22,
                    "left": 0,
                    "fontSize": 9,
                    "fill": "black",
                    "changeable": true
                }
            }
        ], "Uin":
        [
            {
                "type": "path",
                "path": "M 0 30 L 10 30",
                "data": {
                    "width": 10,
                    "height": 30,
                    "top": 10,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": false
                }
            },
            {
                "type": "circle",
                "data": {
                    "width": 40,
                    "height": 30,
                    "radius": 11,
                    "left":10,
                    "fill": "white",
                    "stroke": "black"
                }
            },
            {
                "type": "rect",
                "data": {
                    "name": "bound",
                    "width": 42,
                    "height": 35,
                    "fill": false,
                    // "stroke": "blue"
                    "invisible": true
                }
            },
            {
                "type": "name",
                "Text": "Uin",
                "data": {
                    "fontFamily": "Arial",
                    "top": 23,
                    "left": 0,
                    "fontSize": 9,
                    "fill": "black",
                    "changeable": true
                }
            },{
            "type": "path",
            "path": "M 32 30 L 42 30",
            "data": {
                "width": 10,
                "height": 30,
                "top": 10,
                "stroke": "black",
                "strokeWidth": 1,
                "fill": false
            }
        }
        ], "Uout":
        [
            {
                "type": "path",
                "path": "M 0 30 L 10 30",
                "data": {
                    "width": 10,
                    "height": 30,
                    "top": 10,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": false
                }
            },
            {
                "type": "circle",
                "data": {
                    "width": 40,
                    "height": 30,
                    "radius": 11,
                    "left":10,
                    "fill": "white",
                    "stroke": "black"
                }
            },
            {
                "type": "rect",
                "data": {
                    "name": "bound",
                    "width": 42,
                    "height": 35,
                    "fill": false,
                    // "stroke": "blue"
                    "invisible": true
                }
            },
            {
                "type": "name",
                "Text": "Uout",
                "data": {
                    "fontFamily": "Arial",
                    "top": 23,
                    "left": 0,
                    "fontSize": 9,
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
                    "left": 18,
                    "fontSize": 9,
                    "fill": "black",
                    "changeable": false
                }
            }
            ,{
            "type": "path",
            "path": "M 32 30 L 42 30",
            "data": {
                "width": 10,
                "height": 30,
                "top": 10,
                "stroke": "black",
                "strokeWidth": 1,
                "fill": false
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

    var portPositions = {
        "Resistor":
            {
                90:{
                    "in":{
                        "top":2,
                        "left":1,
                    },
                    "out":{
                        "top":60,
                        "left":1,
                    }
                },
                180:{
                    "in":{
                        "top":11,
                        "left":49,
                    },
                    "out":{
                        "top":11,
                        "left":-10,
                    }
                },
                270:{
                    "in":{
                        "top":-1,
                        "left":-0.5,
                    },
                    "out":{
                        "top":-61,
                        "left":-0.5,
                    }
                },
                0:{
                    "in":{
                        "top":-0.5,
                        "left":1,
                    },
                    "out":{
                        "top":-1,
                        "left":60,
                    }
                }
            }
        , "Inductor":
            {
                90:{
                    "in":{
                        "top":2,
                        "left":-2.5,
                    },
                    "out":{
                        "top":55,
                        "left":-2.5,
                    }
                },
                180:{
                    "in":{
                        "top":14.5,
                        "left":44,
                    },
                    "out":{
                        "top":14.5,
                        "left":-10.5,
                    }
                },
                270:{
                    "in":{
                        "top":-2,
                        "left":2.5,
                    },
                    "out":{
                        "top":-56,
                        "left":2.5,
                    }
                },
                0:{
                    "in":{
                        "top":2.5,
                        "left":0.5,
                    },
                    "out":{
                        "top":2.5,
                        "left":55.5,
                    }
                }
            }, "Capacitor":
            {
                90:{
                    "in":{
                        "top":2,
                        "left":-4.5,
                    },
                    "out":{
                        "top":56,
                        "left":-4.5,
                    }
                },
                180:{
                    "in":{
                        "top":16,
                        "left":43,
                    },
                    "out":{
                        "top":16,
                        "left":-10,
                    }
                },
                270:{
                    "in":{
                        "top":-2,
                        "left":5,
                    },
                    "out":{
                        "top":-56,
                        "left":5,
                    }
                },
                0:{
                    "in":{
                        "top":4.5,
                        "left":1,
                    },
                    "out":{
                        "top":4.5,
                        "left":55,
                    }
                }
            }, "Uin":
            {
                90:{
                    "in":{
                        "top":1,
                        "left":-4.5,
                    },
                    "out":{
                        "top":53,
                        "left":-4.5,
                    }
                },
                180:{
                    "in":{
                        "top":15.5,
                        "left":41,
                    },
                    "out":{
                        "top":15.5,
                        "left":-11,
                    }
                },
                270:{
                    "in":{
                        "top":-1,
                        "left":4.5,
                    },
                    "out":{
                        "top":-53,
                        "left":4.5,
                    }
                },
                0:{
                    "in":{
                        "top":4.5,
                        "left":1,
                    },
                    "out":{
                        "top":4.5,
                        "left":53.5,
                    }
                }
            }, "Uout":
            {
                90:{
                    "in":{
                        "top":1,
                        "left":-4.5,
                    },
                    "out":{
                        "top":53,
                        "left":-4.5,
                    }
                },
                180:{
                    "in":{
                        "top":15.5,
                        "left":41,
                    },
                    "out":{
                        "top":15.5,
                        "left":-11,
                    }
                },
                270:{
                    "in":{
                        "top":-1,
                        "left":4.5,
                    },
                    "out":{
                        "top":-53,
                        "left":4.5,
                    }
                },
                0:{
                    "in":{
                        "top":4.5,
                        "left":1,
                    },
                    "out":{
                        "top":4.5,
                        "left":53.5,
                    }
                }
            }, "Point":
            {
                90:{
                    "in":{
                        "top":2,
                        "left":0.5,
                    },
                    "out":{
                        "top":50,
                        "left":0.5,
                    }
                },
                180:{
                    "in":{
                        "top":10.5,
                        "left":39,
                    },
                    "out":{
                        "top":10.5,
                        "left":-10,
                    }
                },
                270:{
                    "in":{
                        "top":-0.5,
                        "left":-0.5,
                    },
                    "out":{
                        "top":-50,
                        "left":0,
                    }
                },
                0:{
                    "in":{
                        "top":0,
                        "left":6,
                    },
                    "out":{
                        "top":0,
                        "left":50,
                    }
                }
            }
    };
changeSchema = (type) => {
    cleanScheme();
    if(type == "rlc") {
        $("#solve").html('<i class="fa fa-check" aria-hidden="true"></i> solve');
        blockDrawData = {
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
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 50,
                            "height": 25,
                            "left": 0,
                            "fill": false,
                            "stroke": false,
                            "invisible": true
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
                            "top": 13,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }

                    }
                ], "Point":
                [
                    {
                        "type": "path",
                        "path": "M 0 0 L 40 0",
                        "data": {
                            "width": 40,
                            "height": 30,
                            "left": 0,
                            "top": 5,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": false
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 40,
                            "height": 10,
                            "fill": false,
                            "invisible": true
                        }
                    },
                    {
                        "type": "circle",
                        "data": {
                            "width": 40,
                            "height": 20,
                            "radius": 5,
                            "left": 15,
                            "fill": "black"
                        }
                    },
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
                            "top": 13,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }

                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 44,
                            "height": 25,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                ], "Capacitor":
                [
                    {
                        "type": "path",
                        "path": "M 0 0 L 20 0",
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
                            "left": 20,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": false
                        }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 0 20",
                        "data": {
                            "left": 25,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": false
                        }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 20 0",
                        "data": {
                            "top": 10,
                            "left": 25,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": false
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 45,
                            "height": 35,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Capacitor",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 22,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Uin":
                [
                    {
                        "type": "path",
                        "path": "M 0 30 L 10 30",
                        "data": {
                            "width": 10,
                            "height": 30,
                            "top": 10,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": false
                        }
                    },
                    {
                        "type": "circle",
                        "data": {
                            "width": 40,
                            "height": 30,
                            "radius": 11,
                            "left":10,
                            "fill": "white",
                            "stroke": "black"
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 42,
                            "height": 35,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Uin",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 23,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    },{
                    "type": "path",
                    "path": "M 32 30 L 42 30",
                    "data": {
                        "width": 10,
                        "height": 30,
                        "top": 10,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                }
                ], "Uout":
                [
                    {
                        "type": "path",
                        "path": "M 0 30 L 10 30",
                        "data": {
                            "width": 10,
                            "height": 30,
                            "top": 10,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": false
                        }
                    },
                    {
                        "type": "circle",
                        "data": {
                            "width": 40,
                            "height": 30,
                            "radius": 11,
                            "left":10,
                            "fill": "white",
                            "stroke": "black"
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 42,
                            "height": 35,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Uout",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 23,
                            "left": 0,
                            "fontSize": 9,
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
                            "left": 18,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": false
                        }
                    }
                    ,{
                    "type": "path",
                    "path": "M 32 30 L 42 30",
                    "data": {
                        "width": 10,
                        "height": 30,
                        "top": 10,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": false
                    }
                }
                ]
        };

         blockParameters = {
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

        portPositions = {
            "Resistor":
                {
                    90:{
                        "in":{
                            "top":2,
                            "left":1,
                        },
                        "out":{
                            "top":60,
                            "left":1,
                        }
                    },
                    180:{
                        "in":{
                            "top":11,
                            "left":49,
                        },
                        "out":{
                            "top":11,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":-1,
                            "left":-0.5,
                        },
                        "out":{
                            "top":-61,
                            "left":-0.5,
                        }
                    },
                    0:{
                        "in":{
                            "top":-0.5,
                            "left":1,
                        },
                        "out":{
                            "top":-1,
                            "left":60,
                        }
                    }
                }
            , "Inductor":
                {
                    90:{
                        "in":{
                            "top":2,
                            "left":-2.5,
                        },
                        "out":{
                            "top":55,
                            "left":-2.5,
                        }
                    },
                    180:{
                        "in":{
                            "top":14.5,
                            "left":44,
                        },
                        "out":{
                            "top":14.5,
                            "left":-10.5,
                        }
                    },
                    270:{
                        "in":{
                            "top":-2,
                            "left":2.5,
                        },
                        "out":{
                            "top":-56,
                            "left":2.5,
                        }
                    },
                    0:{
                        "in":{
                            "top":2.5,
                            "left":0.5,
                        },
                        "out":{
                            "top":2.5,
                            "left":55.5,
                        }
                    }
                }, "Capacitor":
                {
                    90:{
                        "in":{
                            "top":2,
                            "left":-4.5,
                        },
                        "out":{
                            "top":56,
                            "left":-4.5,
                        }
                    },
                    180:{
                        "in":{
                            "top":16,
                            "left":43,
                        },
                        "out":{
                            "top":16,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":-2,
                            "left":5,
                        },
                        "out":{
                            "top":-56,
                            "left":5,
                        }
                    },
                    0:{
                        "in":{
                            "top":4.5,
                            "left":1,
                        },
                        "out":{
                            "top":4.5,
                            "left":55,
                        }
                    }
                }, "Uin":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-4.5,
                        },
                        "out":{
                            "top":53,
                            "left":-4.5,
                        }
                    },
                    180:{
                        "in":{
                            "top":15.5,
                            "left":41,
                        },
                        "out":{
                            "top":15.5,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{
                            "top":-1,
                            "left":4.5,
                        },
                        "out":{
                            "top":-53,
                            "left":4.5,
                        }
                    },
                    0:{
                        "in":{
                            "top":4.5,
                            "left":1,
                        },
                        "out":{
                            "top":4.5,
                            "left":53.5,
                        }
                    }
                }, "Uout":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-4.5,
                        },
                        "out":{
                            "top":53,
                            "left":-4.5,
                        }
                    },
                    180:{
                        "in":{
                            "top":15.5,
                            "left":41,
                        },
                        "out":{
                            "top":15.5,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{
                            "top":-1,
                            "left":4.5,
                        },
                        "out":{
                            "top":-53,
                            "left":4.5,
                        }
                    },
                    0:{
                        "in":{
                            "top":4.5,
                            "left":1,
                        },
                        "out":{
                            "top":4.5,
                            "left":53.5,
                        }
                    }
                }, "Point":
                {
                    90:{
                        "in":{
                            "top":2,
                            "left":0.5,
                        },
                        "out":{
                            "top":50,
                            "left":0.5,
                        }
                    },
                    180:{
                        "in":{
                            "top":10.5,
                            "left":39,
                        },
                        "out":{
                            "top":10.5,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":-0.5,
                            "left":-0.5,
                        },
                        "out":{
                            "top":-50,
                            "left":0,
                        }
                    },
                    0:{
                        "in":{
                            "top":0,
                            "left":6,
                        },
                        "out":{
                            "top":0,
                            "left":50,
                        }
                    }
                }
        };
    }
    else if(type == "algebra") {
        $("#solve").html('<i class="fa fa-check" aria-hidden="true"></i> solve');
        blockDrawData = {
            "Multiply":[
                {
                    "type": "rect",
                    "data": {
                        "name": "bound",
                        "width": 40,
                        "height": 55,
                        "fill": false,
                        // "stroke": "blue"
                        "invisible": true
                    }
                },
                {
                    "type":"rect",
                    "data":{
                        "name": "element",
                        "width":40,
                        "height":40,
                        "fill":"white",
                        "stroke":"black"
                    }
                },
                {   "type":"text",
                    "Text":"F",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":13,
                        "left":16.75,
                        "fontSize": 12,
                        "fill": "black",
                        "changeable":false,
                        "extra":"F"
                    }
                },
                {   "type":"text",
                    "Text":"1",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":1,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"numerator-1"
                    }
                },
                {   "type":"text",
                    "Text":"2",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":1,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"numerator-2"
                    }
                },
                {   "type":"text",
                    "Text":"3",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":1,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"numerator-3"
                    }
                },
                {   "type":"text",
                    "Text":"1",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":3,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"numerator-4"
                    }
                },
                {   "type":"text",
                    "Text":"s",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":4,
                        "left":0,
                        "fontSize": 12,
                        "fill": false,
                        "extra":"numerator-equation"
                    }
                },
                {
                    "type":"rect",
                    "data":{
                        "width":0,
                        "height":0,
                        "fill":false,
                        "stroke":false,
                        "extra":"equation-line",
                        "top":20
                    }
                },
                {   "type":"text",
                    "Text":"1",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":21,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"denominator-1"
                    }
                },
                {   "type":"text",
                    "Text":"2",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":21,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"denominator-2"
                    }
                },
                {   "type":"text",
                    "Text":"3",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":21,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"denominator-3"
                    }
                },
                {   "type":"text",
                    "Text":"4",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":21,
                        "left":0,
                        "fontSize": 8,
                        "fill": false,
                        "extra":"denominator-4"
                    }
                },
                {   "type":"text",
                    "Text":"s",
                    "data":{
                        "fontFamily": "Consolas",
                        "top":24,
                        "left":0,
                        "fontSize": 12,
                        "fill": false,
                        "extra":"denominator-equation",
                        "width": 101
                    }
                },
                {
                    "type": "name",
                    "Text": "Multiply",
                    "data": {
                        "fontFamily": "Arial",
                        "top": 43,
                        "left": 0,
                        "fontSize": 9,
                        "fill": "black",
                        "changeable": true
                    }

                }
            ]
            ,"Sumator":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 40,
                            "height": 55,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
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
                            "top":3,
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
                            "top":24,
                            "left":5,
                            "fontSize": 12,
                            "fill": "black",
                            "extra":"sumator-second",
                            "changeable":false
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Sumator",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 43,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }

                    }
                ],"IOin":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 40,
                            "height": 55,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
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
                    },
                    {
                        "type": "name",
                        "Text": "IOin",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 43,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }

                    }
                ],"IOout":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 40,
                            "height": 55,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
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
                    },
                    {
                        "type": "name",
                        "Text": "IOout",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 43,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }

                    }
                ]
        };

        blockParameters = {
            "Multiply":
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

        portPositions = {
            "Multiply":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-12,
                        },
                        "out":{
                            "top":51,
                            "left":-12,
                        }
                    },
                    180:{
                        "in":{
                            "top":22,
                            "left":41,
                        },
                        "out":{
                            "top":22,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":-1,
                            "left":12,
                        },
                        "out":{
                            "top":-51,
                            "left":12,
                        }
                    },
                    0:{
                        "in":{
                            "top":12,
                            "left":0,
                        },
                        "out":{
                            "top":12,
                            "left":51,
                        }
                    },
                },
            "Sumator":
                {
                    90:{
                        "in":{2:[{
                                "top":-1,
                                "left":-2,
                            },
                                {
                                    "top":-1,
                                    "left":-22,
                                }
                            ]},
                        "out":{
                            "top":51,
                            "left":-12,
                        }
                    },
                    180:{
                        "in":{2:[{
                                "top":13,
                                "left":41,
                            },
                                {
                                    "top":31,
                                    "left":41,
                                }
                            ]},
                        "out":{
                            "top":22,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{2:[{
                                "top":0,
                                "left":2,
                            },
                                {
                                    "top":0,
                                    "left":22,
                                }
                            ]},
                        "out":{
                            "top":-52,
                            "left":12,
                        }
                    },
                    0:{
                        "in":{2:[{
                                "top":2,
                                "left":0,
                            },
                                {
                                    "top":22,
                                    "left":0,
                                }
                            ]},
                        "out":{
                            "top":12,
                            "left":51,
                        }
                    }
                },"IOin":
                {
                    90:{
                        "out":{
                            "top":51,
                            "left":-12,
                        }
                    },
                    180:{
                        "out":{
                            "top":25,
                            "left":-10,
                        }
                    },
                    270:{
                        "out":{
                            "top":-51,
                            "left":12,
                        }
                    },
                    0:{
                        "out":{
                            "top":12,
                            "left":51,
                        }
                    }
                },"IOout":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-12,
                        }
                    },
                    180:{
                        "in":{
                            "top":22,
                            "left":40,
                        }
                    },
                    270:{
                        "in":{
                            "top":-1,
                            "left":12,
                        }
                    },
                    0:{
                        "in":{
                            "top":12,
                            "left":0,
                        }
                    }
                }
        };
    }
    else if(type == "blockSim") {
        $("#solve").html('<i class="fa fa-check" aria-hidden="true"></i> export to .mdl');
        blockDrawData = {
            "AnalogInput":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 50,
                            "height": 30,
                            "fill": false,
                            // "stroke": "blue"
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
                            "name": "bound",
                            "width": 50,
                            "height": 30,
                            "fill": false,
                            // "stroke": "blue"
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
                                "width": 30,
                                "height": 30,
                                "radius": 15,
                                "left": 0,
                                "fill": "white",
                                "stroke": "black"
                            }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 30,
                            "height": 41,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 10 0",
                        "data":
                            {
                                "left": 15,
                                "top": 16,
                                "stroke": "black"
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 0 13",
                        "data":
                            {
                                "left": 15,
                                "top": 3,
                                "stroke": "black"
                            }
                    },
                    {
                        "type": "name",
                        "Text": "Clock",
                        "data":
                            {
                                "fontFamily": "Arial",
                                "top": 31,
                                "left": 0,
                                "fontSize": 9,
                                "fill": "black",
                                "changeable": true
                            }
                    }
                ], "Constant":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 42,
                            "height": 41,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 42,
                            "height": 30,
                            "left": 0,
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
                        "type": "name",
                        "Text": "Constant",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 33,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Demux":
                [

                    {
                        "type": "name",
                        "Text": "Demux",
                        "data": {
                            "width": 10,
                            "height": 45,
                            "fontFamily": "Arial",
                            "top": 45,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 35,
                            "height": 55,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "left": 0,
                                "top": 20,
                                "stroke": "black"
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "left": 20,
                                "top": 20,
                                "stroke": "black"
                            }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 5,
                            "height": 45,
                            "left": 15,
                            "fill": "white",
                            "stroke": "black"
                        }
                    }
                ], "Mux":
                [

                    {
                        "type": "name",
                        "Text": "Mux",
                        "data": {
                            "fontFamily": "Arial",
                            "height": 45,
                            "top": 45,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 35,
                            "height": 55,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 1,
                                "left": 0,
                                "top": 22.5,
                                "stroke": false,
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 2,
                                "left": 0,
                                "top": 11,
                                "stroke": "black",
                                // "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 2,
                                "left": 0,
                                "top": 34,
                                "stroke": "black",
                                // "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 3,
                                "left": 0,
                                "top": 7.5,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 3,
                                "left": 0,
                                "top": 22.5,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 3,
                                "left": 0,
                                "top": 37.5,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 0,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 15,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 30,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 45,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name":"out",
                                "left": 20,
                                "top": 22.5,
                                "stroke": "black"
                            }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 5,
                            "height": 45,
                            "left": 15,
                            "fill": "white",
                            "stroke": "black"
                        }
                    }
                ], "Derivative":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 50,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 50,
                            "height": 30,
                            "left": 0,
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
                        "type": "name",
                        "Text": "Derivative",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 33,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "DigitalClock":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 52,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 52,
                            "height": 30,
                            "left": 0,
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
                        "type": "name",
                        "Text": "Digital clock",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 35,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Display":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 50,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue"
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
                        "type": "name",
                        "Text": "Display",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 33,
                            "left": 8,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Fcn":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 50,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue"
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
                        "type": "name",
                        "Text": "Fcn",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 33,
                            "left": 15,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Gain":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 30,
                            "height": 42,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "triangle",
                        "data":
                            {
                                "left": 31,
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
                            "left": 5,
                            "fontSize": 11,
                            "fill": "black",
                            "changeable": false
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Gain",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 33,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Integrator":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 42,
                            "height": 42,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 42,
                            "height": 30,
                            "left": 0,
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
                        "type": "name",
                        "Text": "Integrator",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Product":
                [
                    {
                        "type": "name",
                        "Text": "Product",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 48,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "width": 80,
                            "height": 60,
                            "changeable": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 80,
                            "height": 60,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },

                    {
                        "type": "rect",
                        "data": {
                            "width": 50,
                            "height": 45,
                            "left": 15,
                            "fill": "white",
                            "stroke": "black"
                        }
                    },
                    {
                        "type": "text",
                        "Text": "x",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 15,
                            "left": 38,
                            "height": 40,
                            "fontSize": 11,
                            "fill": "black",
                            "changeable": false
                        }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 1,
                                "left": 0,
                                "top": 22.5,
                                "stroke": false,
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 2,
                                "left": 0,
                                "top": 11,
                                "stroke": "black",
                                // "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 2,
                                "left": 0,
                                "top": 34,
                                "stroke": "black",
                                // "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 3,
                                "left": 0,
                                "top": 7.5,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 3,
                                "left": 0,
                                "top": 22.5,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 3,
                                "left": 0,
                                "top": 37.5,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 0,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 15,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 30,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name": 4,
                                "left": 0,
                                "top": 45,
                                // "stroke": "green",
                                "invisible": true
                            }
                    },
                    {
                        "type": "path",
                        "path": "M 0 0 L 15 0",
                        "data":
                            {
                                "name":"out",
                                "left": 65,
                                "top": 22.5,
                                "stroke": "black"
                            }
                    },


                ], "Scope":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 30,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue"
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
                        "type": "name",
                        "Text": "Scope",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 35,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "StateSpace":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 55,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue"
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
                        "type": "name",
                        "Text": "State-Space",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Sum":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 30,
                            "height": 40,
                            "fill": false,
                            // "stroke": "blue"
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
                            "name": "symbol",
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
                            "name": "symbol",
                            "fontFamily": "Arial",
                            "top": 15,
                            "left": 3,
                            "fontSize": 12,
                            "fill": "black",
                            "changeable": false
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Sum",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 3,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "SimOut":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 50,
                            "height": 30,
                            "fill": false,
                            // "stroke": "blue"
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
                        "type": "name",
                        "Text": "Workspace",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "TransferFcn":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 63,
                            "height": 55,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 63,
                            "height": 40,
                            "fill": "white",
                            "stroke": "black"
                        }
                    },
                    {   "type":"text",
                        "Text":"1",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":1,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"numerator-1"
                        }
                    },
                    {   "type":"text",
                        "Text":"2",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":1,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"numerator-2"
                        }
                    },
                    {   "type":"text",
                        "Text":"3",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":1,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"numerator-3"
                        }
                    },
                    {   "type":"text",
                        "Text":"4",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":3,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"numerator-4"
                        }
                    },
                    {   "type":"text",
                        "Text":"1",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":4,
                            "left":28.2,
                            "fontSize": 12,
                            "fill": "black",
                            "extra":"numerator-equation"
                        }
                    },
                    {
                        "type":"rect",
                        "data":{
                            "width":53,
                            "height":0.1,
                            "left":5,
                            // "fill":"black",
                            "stroke":"black",
                            "extra":"equation-line",
                            "top":20
                        }
                    },
                    {   "type":"text",
                        "Text":"1",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":21,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"denominator-1"
                        }
                    },
                    {   "type":"text",
                        "Text":"2",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":21,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"denominator-2"
                        }
                    },
                    {   "type":"text",
                        "Text":"3",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":21,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"denominator-3"
                        }
                    },
                    {   "type":"text",
                        "Text":"4",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":21,
                            "left":0,
                            "fontSize": 8,
                            "fill": false,
                            "extra":"denominator-4"
                        }
                    },
                    {   "type":"text",
                        "Text":"s + 1",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":24,
                            "left":15,
                            "fontSize": 12,
                            "fill": "black",
                            "extra":"denominator-equation",
                            "width": 101
                        }
                    },
                    {   "type":"text",
                        "Text":"F",
                        "data":{
                            "fontFamily": "Consolas",
                            "top":13,
                            "left":16.75,
                            "fontSize": 12,
                            "fill": false,
                            "changeable":false,
                            "extra":"F"
                        }
                    },
                    {
                        "type": "name",
                        "Text": "TransferFcn",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 42,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "TransportDelay":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 40,
                            "height": 52,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 40,
                            "height": 30,
                            "left": 0,
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
                    // {
                    //     "type": "text",
                    //     "Text": "Transport",
                    //     "data": {
                    //         "fontFamily": "Arial",
                    //         "top": 30,
                    //         "left": 0,
                    //         "fontSize": 9,
                    //         "fill": "black",
                    //         "changeable": false
                    //     }
                    // },
                    {
                        "type": "name",
                        "Text": "Transport\nDelay",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "UnitDelay":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name":"bound",
                            "width": 30,
                            "height": 55,
                            "fill": false,
                            // "stroke": "blue",
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
                        "type": "text",
                        "Text": "1",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 3,
                            "left": 11,
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
                                "left": 11,
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
                            "left": 11,
                            "fontSize": 12,
                            "fill": "black",
                            "changeable": false
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Unit\nDelay",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 33,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Step":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name":"bound",
                            "width": 30,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue",
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
                        "path": "M 0 0 L 13 0 M 13 0 L 13 -20 L 25 -20 ",
                        "data":
                            {
                                "left": 2,
                                "top": 5,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": false,
                                "invisible": true
                            }
                    },
                    {
                        "type": "name",
                        "Text": "Step",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "Saturation":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name":"bound",
                            "width": 48,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue",
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 48,
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
                                "left": 12,
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
                                "left": 25,
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
                                "left": 12,
                                "top": 4,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": false,
                                "invisible": true
                            }
                    },
                    {
                        "type": "name",
                        "Text": "Saturation",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ], "DiscreteTime":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 53,
                            "height": 53,
                            "fill": false,
                            // "stroke": "blue"
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
                        "type": "name",
                        "Text": "Discrete-T\nIntegrator",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    },
                    // {
                    //     "type": "text",
                    //     "Text": "Integrator",
                    //     "data": {
                    //         "fontFamily": "Arial",
                    //         "top": 40,
                    //         "left": 0,
                    //         "fontSize": 9,
                    //         "fill": "black",
                    //         "changeable": true
                    //     }
                    // }
                ],
                "DiscreteTransfer":[
                    {
                        "type": "rect",
                        "data": {
                            "name": "bound",
                            "width": 63,
                            "height": 65,
                            "fill": false,
                            // "stroke": "blue"
                            "invisible": true
                        }
                    },
                    {
                        "type": "rect",
                        "data": {
                            "width": 63,
                            "height": 40,
                            "fill": "white",
                            "stroke": "black"
                        }
                    },
                    {
                        "type": "text",
                        "Text": "1",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 7,
                            "left": 30,
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
                                "left": 23,
                                "top": 20,
                                "stroke": "black",
                                "invisible": true
                            }
                    },
                    {
                        "type": "text",
                        "Text": "z+0.5",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 20,
                            "left": 20,
                            "fontSize": 12,
                            "fill": "black",
                            "changeable": false
                        }
                    },
                    {
                        "type": "name",
                        "Text": "Discrete\nTransfer",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 43,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    },
                ], "Relay":
                [
                    {
                        "type": "rect",
                        "data": {
                            "name":"bound",
                            "width": 30,
                            "height": 45,
                            "fill": false,
                            // "stroke": "blue",
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
                        "type": "name",
                        "Text": "Relay",
                        "data": {
                            "fontFamily": "Arial",
                            "top": 30,
                            "left": 0,
                            "fontSize": 9,
                            "fill": "black",
                            "changeable": true
                        }
                    }
                ]
        };

        blockParameters = {
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
                        "BlockType": "Scope",
                        "title": "Parametre scope"
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
                    },
                    {
                    "type":"text",
                    "data":
                        {
                            "id":"transfer-text",
                            "title":"Function",
                            "value":"F"
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

        portPositions = {
            "AnalogInput":
                {
                    90:{
                        "out":{
                            "top":62,
                            "left":-10,
                        }
                    },
                    180:{
                        "out":{
                            "top":20,
                            "left":-11,
                        }
                    },
                    270:{
                        "out":{
                            "top":-60,
                            "left":10,
                        }
                    },
                    0:{
                        "out":{
                            "top":10,
                            "left":62,
                        }
                    }
                }, "AnalogOutput":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":50,
                        }
                    },
                    270:{
                        "in":{
                            "top":1,
                            "left":10,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0,
                        }
                    }
                }, "Clock":
                {
                    90:{
                        "out":{
                            "top":42,
                            "left":-12,
                        }
                    },
                    180:{
                        "out":{
                            "top":21,
                            "left":-12,
                        }
                    },
                    270:{
                        "out":{
                            "top":-42,
                            "left":10,
                        }
                    },
                    0:{
                        "out":{
                            "top":11,
                            "left":42,
                        }
                    }
                }, "Constant":
                {
                    90:{
                        "out":{
                            "top":53,
                            "left":-8,
                        }
                    },
                    180:{
                        "out":{
                            "top":20,
                            "left":-10,
                        }
                    },
                    270:{
                        "out":{
                            "top":-53,
                            "left":10,
                        }
                    },
                    0:{
                        "out":{
                            "top":8,
                            "left":54,
                        }
                    }
                }, "Demux":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-14.5,
                        },
                        "out":{
                            "top":45,
                            "left":-14.5,
                        }
                    },
                    180:{
                        "in":{
                            "top":25.5,
                            "left":34,
                        },
                        "out":{
                            "top":25.5,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":-1,
                            "left":14.5,
                        },
                        "out":{
                            "top":-45,
                            "left":14.5,
                        }
                    },
                    0:{
                        "in":{
                            "top":14.5,
                            "left":2,
                        },
                        "out":{
                            "top":14.5,
                            "left":45,
                        }
                    }
                }, "Mux":
                {
                    90:{
                        "in":{"top":2,
                            "left":-17,
                            2:[{
                                "top":1,
                                "left":-5.5,
                            },
                                {
                                    "top":1,
                                    "left":-28.5,
                                }
                            ],
                            3:[{
                                "top":2.5,
                                "left":-2.5,
                            },
                                {
                                    "top":2.5,
                                    "left":-17.5,
                                },
                                {
                                    "top":2.5,
                                    "left":-32.5,
                                },
                            ],
                            4:[{
                                "top":3,
                                "left":6,
                            },
                                {
                                    "top":2,
                                    "left":-9.5,
                                },
                                {
                                    "top":2,
                                    "left":-24.5,
                                },
                                {
                                    "top":2,
                                    "left":-39.5,
                                },
                            ]},
                        "out":{
                            "top":45,
                            "left":-17,
                        }
                    },
                    180:{
                        "in":{"top":28,
                            "left":32,
                            2:[{
                                "top":16.5,
                                "left":32,
                            },
                                {
                                    "top":39,
                                    "left":32,
                                }
                            ],
                            3:[{
                                "top":43.5,
                                "left":32.5,
                            },
                                {
                                    "top":28.5,
                                    "left":32.5,
                                },
                                {
                                    "top":13.5,
                                    "left":32.5,
                                },
                            ],
                            4:[{
                                "top":50,
                                "left":32,
                            },
                                {
                                    "top":35,
                                    "left":32,
                                },
                                {
                                    "top":20,
                                    "left":32,
                                },
                                {
                                    "top":5,
                                    "left":32,
                                },
                            ]},
                        "out":{
                            "top":28,
                            "left":-8,
                        }
                    },
                    270:{
                        "in":{"top":-1,
                            "left":17,
                            2:[{
                                "top":-1,
                                "left":5.5,
                            },
                                {
                                    "top":-1,
                                    "left":28.5,
                                }
                            ],
                            3:[{
                                "top":-6,
                                "left":2.5,
                            },
                                {
                                    "top":-6,
                                    "left":18,
                                },
                                {
                                    "top":-6,
                                    "left":32.5,
                                },
                            ],
                            4:[{
                                "top":-1,
                                "left":-6,
                            },
                                {
                                    "top":-1,
                                    "left":9.5,
                                },
                                {
                                    "top":-1,
                                    "left":24.5,
                                },
                                {
                                    "top":-1,
                                    "left":38.5,
                                },
                            ]},
                        "out":{
                            "top":-46,
                            "left":17,
                        }
                    },
                    0:{
                        "in":{"top":17,
                            "left":2,
                            2:[{
                                "top":6,
                                "left":2,
                            },
                                {
                                    "top":28,
                                    "left":2,
                                }
                            ],
                            3:[{
                                "top":2.5,
                                "left":2,
                            },
                                {
                                    "top":17.5,
                                    "left":2,
                                },
                                {
                                    "top":32.5,
                                    "left":2,
                                },
                            ],
                            4:[{
                                "top":-6,
                                "left":2,
                            },
                                {
                                    "top":9,
                                    "left":2,
                                },
                                {
                                    "top":24,
                                    "left":2,
                                },
                                {
                                    "top":39,
                                    "left":2,
                                },
                            ]},
                        "out":{
                            "top":17.5,
                            "left":46,
                        }
                    }
                }, "Derivative":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-10,
                        },
                        "out":{
                            "top":61,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":51,
                        },
                        "out":{
                            "top":20,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":10,
                        },
                        "out":{
                            "top":-61,
                            "left":10,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0,
                        },
                        "out":{
                            "top":10,
                            "left":61,
                        }
                    }
                }, "DigitalClock":
                {
                    90:{
                        "out":{
                            "top":63,
                            "left":-10,
                        }
                    },
                    180:{
                        "out":{
                            "top":20,
                            "left":-11,
                        }
                    },
                    270:{
                        "out":{
                            "top":-63,
                            "left":10,
                        }
                    },
                    0:{
                        "out":{
                            "top":10,
                            "left":63,
                        }
                    }
                }, "Display":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-5,
                        }
                    },
                    180:{
                        "in":{
                            "top":15,
                            "left":51,
                        }
                    },
                    270:{
                        "in":{
                            "top":1,
                            "left":5,
                        }
                    },
                    0:{
                        "in":{
                            "top":5,
                            "left":0,
                        }
                    }
                }, "Fcn":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-10,
                        },
                        "out":{
                            "top":61,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":51,
                        },
                        "out":{
                            "top":20,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":10,
                        },
                        "out":{
                            "top":-61,
                            "left":10,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0,
                        },
                        "out":{
                            "top":10,
                            "left":61,
                        }
                    }
                }, "Gain":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-10,
                        },
                        "out":{
                            "top":41,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":31,
                        },
                        "out":{
                            "top":20,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":10,
                        },
                        "out":{
                            "top":-41,
                            "left":10,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0,
                        },
                        "out":{
                            "top":10,
                            "left":41,
                        }
                    }
                }, "Integrator":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-10,
                        },
                        "out":{
                            "top":52,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":42,
                        },
                        "out":{
                            "top":20,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":10,
                        },
                        "out":{
                            "top":-52,
                            "left":10,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0,
                        },
                        "out":{
                            "top":10,
                            "left":52,
                        }
                    }
                }, "Product":
                {
                    90:{
                        "in":{"top":2,
                            "left":-17,
                            2:[{
                                "top":1,
                                "left":-5.5,
                            },
                                {
                                    "top":1,
                                    "left":-28.5,
                                }
                            ],
                            3:[{
                                "top":2.5,
                                "left":-2.5,
                            },
                                {
                                    "top":2.5,
                                    "left":-17.5,
                                },
                                {
                                    "top":2.5,
                                    "left":-32.5,
                                },
                            ],
                            4:[{
                                "top":2,
                                "left":5.5,
                            },
                                {
                                    "top":2,
                                    "left":-9.5,
                                },
                                {
                                    "top":2,
                                    "left":-24.5,
                                },
                                {
                                    "top":2,
                                    "left":-39.5,
                                },
                            ]},
                        "out":{
                            "top":91,
                            "left":-17,
                        }
                    },
                    180:{
                        "in":{"top":28.5,
                            "left":80,
                            2:[{
                                "top":16.5,
                                "left":79,
                            },
                                {
                                    "top":39,
                                    "left":79,
                                }
                            ],
                            3:[{
                                "top":43.5,
                                "left":79,
                            },
                                {
                                    "top":28.5,
                                    "left":79,
                                },
                                {
                                    "top":13.5,
                                    "left":79,
                                },
                            ],
                            4:[
                            {
                                "top":5.5,
                                "left":79,
                            },
                            {
                                "top":20.5,
                                "left":79,
                            },
                            {
                                "top":35.5,
                                "left":79,
                            },
                            {
                                "top":50.5,
                                "left":79,
                            },
                            ]},
                        "out":{
                            "top":28,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{"top":-1,
                            "left":17,
                            2:[{
                                "top":0,
                                "left":5.5,
                            },
                                {
                                    "top":0,
                                    "left":28.5,
                                }
                            ],
                            3:[{
                                "top":-6,
                                "left":2.5,
                            },
                                {
                                    "top":-6,
                                    "left":18,
                                },
                                {
                                    "top":-6,
                                    "left":32.5,
                                },
                            ],
                            4:[{
                                "top":-2,
                                "left":-6,
                            },
                                {
                                    "top":-2,
                                    "left":9.5,
                                },
                                {
                                    "top":-2,
                                    "left":24.5,
                                },
                                {
                                    "top":-2,
                                    "left":38.5,
                                },
                            ]},
                        "out":{
                            "top":-91,
                            "left":17,
                        }
                    },
                    0:{
                        "in":{"top":17,
                            "left":2,
                            2:[{
                                "top":6,
                                "left":2,
                            },
                                {
                                    "top":28,
                                    "left":2,
                                }
                            ],
                            3:[{
                                "top":2.5,
                                "left":2,
                            },
                                {
                                    "top":17.5,
                                    "left":2,
                                },
                                {
                                    "top":32.5,
                                    "left":2,
                                },
                            ],
                            4:[{
                                "top":-6,
                                "left":2,
                            },
                                {
                                    "top":9,
                                    "left":2,
                                },
                                {
                                    "top":24,
                                    "left":2,
                                },
                                {
                                    "top":39,
                                    "left":2,
                                },
                            ]},
                        "out":{
                            "top":17.5,
                            "left":91,
                        }
                    }
                }, "Scope":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-5,
                        }
                    },
                    180:{
                        "in":{
                            "top":10,
                            "left":32,
                        }
                    },
                    270:{
                        "in":{
                            "top":2,
                            "left":2,
                        }
                    },
                    0:{
                        "in":{
                            "top":5,
                            "left":0,
                        }
                    }
                }, "StateSpace":
                {
                    90:{
                        "in":{
                            "top":-1,
                            "left":-10,
                        },
                        "out":{
                            "top":65,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":55,
                        },
                        "out":{
                            "top":20,
                            "left":-12,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":12,
                        },
                        "out":{
                            "top":-65,
                            "left":12,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0,
                        },
                        "out":{
                            "top":10,
                            "left":65,
                        }
                    }
                }, "Sum":
                {
                    90:{
                        "in":{2:[{
                                "top":-1,
                                "left":-4,
                            },
                                {
                                    "top":-1,
                                    "left":-17,
                                }
                            ]},
                        "out":{
                            "top":40,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{2:[{
                                "top":14,
                                "left":30,
                            },
                                {
                                    "top":25,
                                    "left":30,
                                }
                            ]},
                        "out":{
                            "top":18,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{2:[{
                                "top":2,
                                "left":2,
                            },
                                {
                                    "top":2,
                                    "left":16,
                                }
                            ]},
                        "out":{
                            "top":-40,
                            "left":9,
                        }
                    },
                    0:{
                        "in":{2:[{
                                "top":4,
                                "left":-1,
                            },
                                {
                                    "top":18,
                                    "left":-1,
                                }
                            ]},
                        "out":{
                            "top":12,
                            "left":41,
                        }
                    }
                }, "SimOut":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-5,
                        },
                    },
                    180:{
                        "in":{
                            "top":15,
                            "left":50,
                        },
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":4,
                        },
                    },
                    0:{
                        "in":{
                            "top":5,
                            "left":1,
                        },
                    }
                }, "TransferFcn":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-12.5,
                        },
                        "out":{
                            "top":74,
                            "left":-12.5,
                        }
                    },
                    180:{
                        "in":{
                            "top":25,
                            "left":64,
                        },
                        "out":{
                            "top":25,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":15,
                        },
                        "out":{
                            "top":-74,
                            "left":15,
                        }
                    },
                    0:{
                        "in":{
                            "top":15,
                            "left":1,
                        },
                        "out":{
                            "top":15,
                            "left":74,
                        }
                    }
                }, "TransportDelay":
                {
                    90:{
                        "in":{
                            "top":-1,
                            "left":-7,
                        },
                        "out":{
                            "top":51,
                            "left":-7,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":41,
                        },
                        "out":{
                            "top":20,
                            "left":-12,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":12,
                        },
                        "out":{
                            "top":-51,
                            "left":12,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0.5,
                        },
                        "out":{
                            "top":10,
                            "left":50,
                        }
                    }
                }, "UnitDelay":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-10,
                        },
                        "out":{
                            "top":41,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":31,
                        },
                        "out":{
                            "top":20,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":12,
                        },
                        "out":{
                            "top":-41,
                            "left":12,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":1,
                        },
                        "out":{
                            "top":10,
                            "left":41,
                        }
                    }
                }, "Step":
                {
                    90:{
                        "out":{
                            "top":40,
                            "left":-10,
                        },
                    },
                    180:{
                        "out":{
                            "top":20,
                            "left":30,
                        },
                    },
                    270:{
                        "out":{
                            "top":0,
                            "left":10,
                        },
                    },
                    0:{
                        "out":{
                            "top":10,
                            "left":40,
                        },
                    }
                }, "Saturation":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-10,
                        },
                        "out":{
                            "top":59,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":49,
                        },
                        "out":{
                            "top":20,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":12,
                        },
                        "out":{
                            "top":-59,
                            "left":12,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":1,
                        },
                        "out":{
                            "top":10,
                            "left":59,
                        }
                    }
                }, "DiscreteTime":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-10,
                        },
                        "out":{
                            "top":65,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":55,
                        },
                        "out":{
                            "top":20,
                            "left":-12.5,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":10,
                        },
                        "out":{
                            "top":-65,
                            "left":10,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":1,
                        },
                        "out":{
                            "top":10,
                            "left":65,
                        }
                    }
                }, "DiscreteTransfer":
                {
                    90:{
                        "in":{
                            "top":0,
                            "left":-14,
                        },
                        "out":{
                            "top":74,
                            "left":-14,
                        }
                    },
                    180:{
                        "in":{
                            "top":25,
                            "left":64,
                        },
                        "out":{
                            "top":25,
                            "left":-11,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":15,
                        },
                        "out":{
                            "top":-74,
                            "left":15,
                        }
                    },
                    0:{
                        "in":{
                            "top":15,
                            "left":1,
                        },
                        "out":{
                            "top":15,
                            "left":74,
                        }
                    }
                }, "Relay":
                {
                    90:{
                        "in":{
                            "top":1,
                            "left":-10,
                        },
                        "out":{
                            "top":40,
                            "left":-10,
                        }
                    },
                    180:{
                        "in":{
                            "top":20,
                            "left":30,
                        },
                        "out":{
                            "top":20,
                            "left":-10,
                        }
                    },
                    270:{
                        "in":{
                            "top":0,
                            "left":10,
                        },
                        "out":{
                            "top":-40,
                            "left":10,
                        }
                    },
                    0:{
                        "in":{
                            "top":10,
                            "left":0,
                        },
                        "out":{
                            "top":10,
                            "left":40,
                        }
                    }
                }
        };
    }
    schemeType = type;
    data = blockParameters;
    clearCanvas();
    resetGlobals();
    loadBlocks();

    setSchemeType(type);

    $.each(Object.keys(blockDrawData),function(i,nameBlock){
        number[nameBlock] = 0;
    });
}

window.prepBlocks = function (typeBlock) {
    var cx;
    blockData = blockDrawData[typeBlock];
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