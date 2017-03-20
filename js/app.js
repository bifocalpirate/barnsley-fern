/* configs */
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 600;
var FRAME_RATE = 60;
/* globals */
var x = Math.random(), y = Math.random();

var rules = [  
    {
        a:0.85,
        b:0.04,
        c:-0.04,
        d:0.85,
        x:0,
        y:1.60,
        p:0.85,
        color: '#5499C7'
    },
    {
        a:-0.15,
        b:0.28,
        c:0.26,
        d:0.24,
        x:0,
        y:0.44,
        p:0.07,
        color:'#34495E'
    },
    {
        a:0.2,
        b:-0.26,
        c:0.23,
        d:0.22,
        x:0,
        y:1.60,
        p:0.07,
        color:'#C70039'
    },    
    {
        a:0,
        b:0,
        c:0,
        d:0.16,
        x:0,
        y:0,
        p:0.01, //probability of selection
        color:'#51B422'
    }
];

/* configs */
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);    
    //frameRate(FRAME_RATE); 
    
    strokeWeight(0.5);
    stroke('#34495E');    
    //rect(0, 0, CANVAS_WIDTH-1, 0);
}

function keyPressed() {
    pause = !pause;
}

function draw() {    
    translate(CANVAS_WIDTH/2,CANVAS_HEIGHT); //call to translate is reset between draw()
    for(var j=0; j < 100; j++)
    {
            var rule = getRule();
            var x1 = x * rule.a + y * rule.b + rule.x;
            var y1 = x * rule.c + y * rule.d + rule.y;
            x = x1;
            y = y1;    
            drawPoint(x,y,rule.color);
    }    
 }
 function drawPoint(x,y,color)
 {         
    stroke(color);
    point(x*50,-y*50);
 }
 function getRule()
 {
    var rand = Math.random();
    for(var i=0; i < rules.length; i++)
     {
         var rule = rules[i];
         if (rand < rule.p) return rule;
         rand -= rule.p;
     }          
 }