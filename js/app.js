/* configs */
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 300;
var FRAME_RATE = 60;

/* rt settings */

var panels = [];
var controlPanel = null;
var panelCount = 0; //until the user clicks apply settings do we use the new config collection
/* globals */
var x = Math.random(), y = Math.random();
var rules = [];
var currentRuleSetName = "Barnsleyfern";
var ruleSets = {    
    "Barnsleyfern":[          
                {
                    a:0,
                    b:0,
                    c:0,
                    d:0.16,
                    x:0,
                    y:0,
                    p:0.01 //probability of selection        
                },
                {
                    a:0.85,
                    b:0.04,
                    c:-0.04,
                    d:0.85,
                    x:0,
                    y:1.60,
                    p:0.85
                },
                {
                    a:-0.15,
                    b:0.28,
                    c:0.26,
                    d:0.24,
                    x:0,
                    y:0.44,
                    p:0.07
                },
                {
                    a:0.2,
                    b:-0.26,
                    c:0.23,
                    d:0.22,
                    x:0,
                    y:1.60,
                    p:0.07
                }
            ],
            "Thelypteridaceae":[
                {    
                    a:0,
                    b:0,
                    c:0,
                    d:0.25,
                    x:0,
                    y:-0.4,
                    p:0.02 //probability of selection        
                },
                {
                    a:0.95,
                    b:0.005,
                    c:-0.005,
                    d:0.93,
                    x:-.002,
                    y:0.5,
                    p:0.84
                },    
                {
                    a:0.035,
                    b:-0.2,
                    c:0.16,
                    d:0.04,
                    x:-0.09,
                    y:0.02,
                    p:0.07
                },
                {
                    a:-0.04,
                    b:0.2,
                    c:0.16,
                    d:0.04,
                    x:0.083,
                    y:0.12,
                    p:0.07
                }                                
    ]    
}

function addPanel(config)
{            
            p = QuickSettings.create(CANVAS_WIDTH + panels.length*260,50,"Rules " + (panels.length+1))
            .setDraggable(true)
            .setCollapsible(true)                                                   
            Object.keys(config).forEach(function(k) {
                p.addRange(k,-1,1,config[k],0.01);                             
            });
            panels.push(p);
            console.log(p.getValuesAsJSON());
}
/* configs */
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);    
    frameRate(FRAME_RATE);     
    controlPanel = QuickSettings.create(50,CANVAS_HEIGHT+100,"Controls");
    controlPanel.addDropDown("Rule Sets", 
    Object.keys(ruleSets)
    );
    currentRuleSetName = controlPanel.getValue("Rule Sets");
    controlPanel.addButton("Add Rule", ()=>{addRule()});
    controlPanel.addButton("Refresh Settings", ()=>{resetRules()});
    controlPanel.addButton("Apply Settings", () => { applyRules()});
    strokeWeight(0.5);
    stroke('#34495E');        
    resetRules(); //clear panels, load default rules       
}
function resetRules()
{
    panels.forEach((a) => {
            a.destroy();
    })
    panels = [];
    addPanel(ruleSets.Barnsleyfern[0]); //make sure this is a deep copy   
    addPanel(ruleSets.Barnsleyfern[1]);    
    addPanel(ruleSets.Barnsleyfern[2]);    
    addPanel(ruleSets.Barnsleyfern[3]); 
    applyRules();  
}

function applyRules()
{        
    console.log('Applying rules');                
    fill('whit');    
    rect(-CANVAS_WIDTH/2,-CANVAS_HEIGHT,CANVAS_WIDTH,CANVAS_HEIGHT);        
    panelCount = panels.length;
}

function keyPressed() {
    clear();
}
function addRule()
{
    var d = {
        a:0,
        b:0,
        c:0,
        d:0.16,
        x:0,
        y:0,
        p:0.01 //probability of selection        
    }
    addPanel("Rule " + (panels.length+1),d);    
}


function draw() {      
    translate(CANVAS_WIDTH/2,CANVAS_HEIGHT); //call to translate is reset between draw()
    for(var j=0; j < 10; j++)
    {
            var rule = getRule();
            var x1 = x * rule.a + y * rule.b + rule.x;
            var y1 = x * rule.c + y * rule.d + rule.y;
            x = x1;
            y = y1;    
            drawPoint(x,y,'green');
    }    
 }
 function drawPoint(x,y,color)
 {         
     if (color)
        stroke(color);
    point(x*30,-y*30);
 }
 function getRule()
 {     
    var rand = Math.random();
    for(var i=0; i < panelCount; i++)
     {
         var rule = panels[i].getValuesAsJSON();
         if (rand < rule.p) return rule;
         rand -= rule.p;
     }          
 }