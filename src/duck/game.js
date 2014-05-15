/**
 * Game Logic
 */
var arrHitTime=[];
var duckAppearTime=0;
var duckGoneTime=0;
var clickNumbers=0;
var hitNumbers=0;
Game={
	start:function(){
		console.log("Welcome");
		//initialise parse
		Parse.initialize("QdGNmNDfpL5pfAvCLF8LdyTODZcJW39iYWMgbvaK", "62sqODox8fpBeKysReTbS1wnSObQbP2GOaWudLCu");
		//initialise globals for screen conditions
		if(window.orientation === undefined){
			Env.global.mobile = false;
		}

		Env.global.pixelRatio = window.devicePixelRatio;
		Env.calculateVariables();
		
		//start Crafty
		if(Env.global.mobile){
			window.onresize = function(e) {
				//console.log("window changed");
				Env.calculateVariables();
				if (window.innerHeight > window.innerWidth) {
					//protrait
					Env.x=resolWidth;
		    		Env.y=resolHeight;
		    		gameScreen.style.width=resolWidth;
		    		gameScreen.style.height=resolHeight;
				}else if (window.innerHeight <= window.innerWidth) {
					//landscape
					Env.x=resolHeight;
		     		Env.y=resolWidth-15;
		     		gameScreen.style.width=resolHeight;
		    		gameScreen.style.height=resolWidth;
				};
				// Env.x=window.screen.availWidth;
// 				Env.y=window.screen.availHeight;
				Crafty.trigger('ResizedWindow');				
			}
			Crafty.init(Env.x,Env.y,gameScreen);
		}else{
			Crafty.init(resolWidth,resolHeight,gameScreen);
			gameScreen.style.margin="auto";
			gameScreen.style.position="absolute";
			gameScreen.style.top=0;
			gameScreen.style.left=0;
			gameScreen.style.bottom=0;
			gameScreen.style.right=0;			
	    }
	    document.body.style.background = "black";
		document.body.style.margin=0;
		document.body.style.padding=0;
		Crafty.canvas.init();
		Crafty.scene('Loading');			
	},
	//Game Logic attributes
	level: 1,
	ducksAlive: 1,
	wave: 0,
	playerScore: [],
	levelSeed: Env.seed,
	duckStartSeed: Env.seed,

	nextLevel: function(){
		//first check if the game is over
		if (Game.level===Env.numLevels) {
			//game over and log game data
			var TestObject = Parse.Object.extend("GameData");
			var testObject = new TestObject();
			settings.size=sizeValue;
			if(Env.mobile){
				settings.resolution=Env.x+"x"+Env.y;
			}else{
				settings.resolution=resolWidth+"x"+resolHeight;
			}
			
			settings.speed=speedValue;
			settings.bgColor=bgColorValue;
			settings.objColor=objColorValue;
			for (var i = 0; i < arrShape.length; i++) {
				if (i==0) {
					settings.Shape=arrShape[0];
				}else{
					settings.Shape+=","+arrShape[i];
				}				
			};
			settings.mobile=Env.mobile;
			settings.pixelRatio=Env.global.pixelRatio;
			var totalHitTime=0;
			for (var i = 0; i < arrHitTime.length; i++) {
				totalHitTime+=arrHitTime[i];
			};
			Game.gameStats.averageHitTime=totalHitTime/arrHitTime.length;
			Game.gameStats.accuracy=(hitNumbers/clickNumbers)*100+"%";
			Game.gameStats.score=Game.playerScore;
			testObject.save(settings,{
				success:function(object){
					testObject.save(Game.gameStats,{
						success:function(object){
							//alert("upload succeed!");
						}
					})
				}
			});
			Crafty.scene('GameOver');
		}else{
			Game.level++;
			Crafty.scene('Level');
		}
		Crafty.trigger('SceneChange',{});
	},

	levelManager: function(){
		//called after each duck is killed
		//executes Game.createDuckWave with the level's parameters
		Game.ducksAlive--;
		if (Game.ducksAlive===0) {
			Game.createDuckWave({
				//Set numTypes and numDucks for each level
				numTypes:((Game.level-1)/(1+Env.maxNumDuckTypes-Env.minNumDuckTypes))+Env.minNumDuckTypes,
				numDucks:Env.numDucks+Math.floor((Game.level-1)/(1+Env.maxNumDuckTypes-Env.minNumDuckTypes))*Env.numDucksIncrement
			});
		}
	},
	createDuckWave: function(data){
		Game.ducksAlive=data.numDucks;
		var temp;
		if (Game.wave<Env.numWaves) {
			for(var d=0;d<data.numDucks;d++){
				temp=Game.seededRandom(Game.levelSeed);
				Game.levelSeed=temp.seed;
				//get random duck type
				//var type=Math.floor(temp.rnd*(data.numTypes-0.111));
				var type=Math.floor(Math.random()*shapeNums);
				var duckTypes=arrShape;
				//draw duck!!!!
				Crafty.e(duckTypes[type]).activate();
				var myDate = new Date();
				duckAppearTime = myDate.getTime();
			}
			Game.wave++;
		}else{
			Game.wave=0;
			Game.ducksAlive=1;
			setTimeout(
				function(){
					//show the choice
					Crafty.scene('LevelCompleted');
			        Crafty.trigger('SceneChange',{});
				}
				,1000
			);			
		}
	},
    //this function is not the exactly way of random!!!!!
	seededRandom: function(seed){
		seed=(seed*9301+49297) % 233280;
		var rnd=seed / 233280;
		return {seed:seed,rnd:rnd};
	},

	gameStats:{
		averageHitTime: 0, //ms
		score: [] ,
		accuracy: "0%" ,
	}
};