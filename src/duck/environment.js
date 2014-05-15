/**
 * The HuntObj environment
 */
Env = {
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

  //duck
  speed: speedValue, //(px/frame)  basic duck speed
  speedIncrement: 2,      //(px/frame)  faster ducks get this much extra speed
  deathSpeed: 20,         //(px/frame)  speed of duck death animations
  deathOffset: 0,         //px          how far away (horizontally) the duck crashes into the ground when it dies
  worth: 20,              //points      how many points you get for hitting a basic duck
  worthIncrement: 5,      //points      how many more points you get for each increase in duck spped/health
  horizontalTravel: 0,    //px          how many pixels to travel horizontally in one zigzag
  verticalTravel: 0,      //px          how many pixels to travel vertically in one zigzag
  duckWidth: 40,   //px          scales the width of the duck image
  duckHeight: 40,  //px          scales the height of the duck image
  //ammo
  ammo: 3,                //bullets   amount of ammo before reloading
  unlimitedAmmo: false,   //bool
  ammoHeight: 0,          //px        scales the height of the ammo on screen
  ammoWidth: 0,           //px        scales the width of the ammo on screen
  ammoHeightOffset: 0,    //px        offset the ammo x pixels bellow the top of the game
  ammoWidthOffset: 0,     //px        offsets the ammo x pixels away from the right hand side of the game
  ammoSeparation: 0,      //px        number of pixels in between bullets
  //game logic
  //the game logic adds aditional duck types after each level
  //after all the duck types have have been added, it increases the number of duck in each wave
  //then it returns to the minimum number of duck types and adds additional duck types after each level
  //example it might look like this:
  //level 1: spawns 1 yellow duck per wave
  //level 2: spawns 1 yellow or green duck per wave
  //level 3: spawns 1 yelloe or green or red duck per wave
  //level 4: spawns 2 yellow ducks per wave
  //level 5: spawns 2 yellow or green ducks per wave
  //level 6: spawns 2 yellow or green or red ducks per wave
  numWaves: 3,            //number of duck waves per level
  numLevels: 3,           //number of levels per game
  numDucks: 1,            //initial number of ducks per wave of ducks
  numDucksIncrement: 0,   //number of additional ducks per wave after each cycle of duck types
  minNumDuckTypes: 1,     //minimum number of duck types to choose from
  maxNumDuckTypes: 1,     //maximum number of duck types to choose from
  //makes game repeatably random
  //the same seed will always give the same game for the same screen conditions
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
    ducks:0,
    default_layer: 1,
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
    Env.global.width = window.innerWidth/ratio;
    Env.global.height = window.innerHeight/ratio;
    Env.global.pixelRatio=window.devicePixelRatio;
    Env.x=resolWidth;
    Env.y=resolHeight;
    
    //duck
	  Env.speed=speedValue;
    Env.horizontalTravel = 0; //Math.floor(Env.x/5);
    Env.verticalTravel = 50; //Math.floor(Env.y/6 + 65);
    Env.deathOffset = Env.horizontalTravel/4;
    Env.duckWidth = sizeValue;//Math.floor(Env.x/32 + 48);
    Env.duckHeight = sizeValue;
 
    //player
    Env.ammoWidth = 10 + 10*((Env.x-480)/2080);
    Env.ammoHeight = 30 + 30*((Env.x-480)/2080);
    Env.ammoHeightOffset =10;
    Env.ammoWidthOffset = Env.ammoWidth;
    Env.ammoSeparation = Env.ammoWidth;
    //game logic
    Env.maxNumDuckTypes=shapeNums;

    //text size used to control the size of all the text
    Env.textSize= Math.round(24 + 16*((Env.x-320)/2080));
  }
};