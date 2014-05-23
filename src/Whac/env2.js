/**
 * The Whac enviroment
 */
Env2 = {
/**
 * Define Your Enviroment Variables Here
 * if a variable has a value of 0 it probably depends on 
 * the screen size and therefore it is updated in the 
 * calculateVariables() function below
 */
  //global for the screen conditions
  global:{
  	//actual resolution of the screen
  	width:100, //px
  	height:100, //px
  	//mobile device flag
  	mobile: true,
  	//device pixel ratio to know if a retina or other high dpi device
  	pixelRatio:1
  },
  //use this to make everything dependent on screen size!!!!
  x: 100,			//px
  y: 100,			//px
  //mice
  speed: speedValue, //(time)  basic the time that mice show on the screen 
  appearSpeed: 3000,
  disappearSpeed: 4000,
  speedIncrement: 2, //(time)  the faster mice get this less stay time
  worth: 20, 		 //points  how many points you get for hitting a basic mice
  worthIncrement: 5, //points  how many more points you get for each increase in mice spped/health
  miceWidth: 40, //px scales the width of the mice image
  miceHeight: 40,//px scales the height of the mice image
  //ammo
  ammo: 99, //bullets   amount of ammo before reloading
  unlimitedAmmo: true,    //bool
  ammoHeight: 0,          //px scales the height of the ammo on screen
  ammoWidth: 0,           //px scales the width of the ammo on screen
  ammoHeightOffset: 0,    //px offset the ammo x pixels bellow the top of the game
  ammoWidthOffset: 0,     //px offsets the ammo x pixels away from the right hand side of the game
  ammoSeparation: 0,      //px number of pixels in between bullets
  //game logic
  //the game logic adds aditional mice types after each level
  //after all the mice types have have been added, it increases the number of mice in each wave
  //then it returns to the minimum number of mice types and adds additional mice types after each level
  //example it might look like this:
  //level 1: spawns 3 yellow mice per wave
  //level 2: spawns 4 yellow or green mice per wave
  //level 3: spawns 5 yelloe or green or red mice per wave
  //level 4: spawns 6 yellow mices per wave
  //level 5: spawns 7 yellow or green mices per wave
  //level 6: spawns 8 yellow or green or red mices per wave
  numWaves: 3,            //number of mice waves per level
  numLevels: 3,           //number of levels per game
  numMices: 3,            //initial number of mices per wave of mices
  numMicesIncrement: 2,   //number of additional mices per wave after each cycle of mice types
  minNumMiceTypes: 1,     //minimum number of mice types to choose from
  maxNumMiceTypes: 3,     //maximum number of mice types to choose from
  //makes game repeatably random
  //the game seed will always give the same game for the same screen conditions
  seed: 7,
  //text size used to control the size of all the textview
  //all the text elements should have a size relative to this size
  textSize: 0,
  //allow pausing of the game
  pausableGame: true,
  //allow multiple games
  multipleGames: true,
  //show the game dimensions above the game (useful for comparing different sizes)
  showGameDimensions: true,
  //layer management 
  //allows you to quickly change the layer of things
  layers: {
    background:0,
    hole:1,
    mices:2,
    hole_base:3,
    default_layer: 4,
    button:7,
    text:8,
    crosshair:10,//pointer
    externalText: 16,
  },
  //allows you to offset the layers 
  //(because layers must be 0 or greater. So this way if you want to make a layer -1 for example, then you can offset the layers by 1)
  layerOffset: 0,
  calculateVariables: function(){
  	//*** Define Your Update Function for the Enviroment Variables Here ***
    //this is where you make everything dependent on screen size!!!!!!!
    
    //global
    Env2.global.width = window.innerWidth/ratio;
    Env2.global.height = window.innerHeight/ratio;
    Env2.global.pixelRatio=window.devicePixelRatio;
    Env2.x=resolWidth;
    Env2.y=resolHeight;
    
    //mice
    Env2.speed=speedValue;
    Env2.appearSpeed=Math.floor(4500/Env2.speed);
    Env2.disappearSpeed=Env2.appearSpeed*1.15;
    Env2.miceWidth = sizeValue;
    Env2.miceHeight = sizeValue;
    //player
    Env2.ammoWidth=10 + 10*((Env2.x-480)/2080);
    Env2.ammoHeight = 30 + 30*((Env2.x-480)/2080);
    Env2.ammoHeightOffset =10;
    Env2.ammoWidthOffset = Env2.ammoWidth;
    Env2.ammoSeparation = Env2.ammoWidth;
    //game logic
    Env2.maxNumMiceTypes=shapeNums;
    //text size used to control the size of all the text
    Env2.textSize= Math.round(24 + 16*((Env2.x-320)/2080));
  }
}