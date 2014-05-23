/**
 * Game Logicd
 */
var arrHitTime=[];
var miceAppearTime=0;
var miceGoneTime=0;
var clickNumbers=0;
var hitNumbers=0;
Game2={
	start:function(){
		//initialise parse
		Parse.initialize("vARFNDhsiusklPZqz7BrOzDyqxzedohMHnuV5I8f", "3vCFgWsI0ElOIqZ0eOZ1e0fBgbYbBSdike23TjZN");
		//initialise globals for screen conditions
		if(window.orientation === undefined){
			Env2.global.mobile = false;
		}
		Env2.global.pixelRatio = window.devicePixelRatio;
		Env2.calculateVariables();
		//start Crafty
		if(Env2.global.mobile){
			if (window.innerHeight > window.innerWidth) {
				//protrait
				Env2.x=resolWidth;
	    		Env2.y=resolHeight;
			}else if (window.innerHeight <= window.innerWidth) {
				//landscape
				Env2.x=resolHeight+25;
	     		Env2.y=resolWidth;
			};
			window.onresize = function(e) {
				//console.log("window changed");
				Env2.calculateVariables();
				if (window.innerHeight > window.innerWidth) {
					//protrait
					Env2.x=resolWidth;
		    		Env2.y=resolHeight;
				}else if (window.innerHeight <= window.innerWidth) {
					//landscape
					Env2.x=resolHeight+25;
		     		Env2.y=resolWidth;
				};
				holeMap();
				Crafty.trigger('ResizedWindow');				
			}
			Crafty.init(Env2.x,Env2.y,gameScreen);
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
		Crafty.scene('Loading2');
	},
	//Game Logic attributes
	level: 1,
	micesAlive: 1,
	wave: 0,
	playerScore: [],
	levelSeed: Env2.seed,
	miceStartSeed: Env2.seed,
	nextLevel: function(){
		//first check if the game is over
		if (Game2.level===Env2.numLevels) {
			//game over and log game data
			var TestObject = Parse.Object.extend("GameData");
			var testObject = new TestObject();
			settings.size=sizeValue;
			if(Env2.mobile){
				settings.resolution=Env2.x+"x"+Env2.y;
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
			settings.mobile=Env2.mobile;
			settings.pixelRatio=Env2.global.pixelRatio;
			var totalHitTime=0;
			for (var i = 0; i < arrHitTime.length; i++) {
				totalHitTime+=arrHitTime[i];
			};
			Game2.gameStats.averageHitTime=totalHitTime/arrHitTime.length;
			Game2.gameStats.accuracy=(hitNumbers/clickNumbers)*100+"%";
			Game2.gameStats.score=Game2.playerScore;
			testObject.save(settings,{
				success:function(object){
					testObject.save(Game2.gameStats,{
						success:function(object){
							//alert("upload succeed!");
						}
					})
				}
			});
			Crafty.scene('GameOver2');
		}else{
			Game2.level++;
			Crafty.scene('Level2');
		}
		Crafty.trigger('SceneChange',{});
	},
	levelManager: function(){
		//called after each mice is killed
		//executes Game2.createMiceWave with the level's parameters
		Game2.micesAlive--;
		if (Game2.micesAlive===0) {
			Game2.createMiceWave({
				//Set numTypes and numMices for each level
				numTypes:((Game2.level-1)/(1+Env2.maxNumMiceTypes-Env2.minNumMiceTypes))+Env2.minNumMiceTypes,
				numMices:Env2.numMices+Math.floor((Game2.level-1)/(1+Env2.maxNumMiceTypes-Env2.minNumMiceTypes))*Env2.numMicesIncrement
			});
		}
	},
	createMiceWave: function(data){
		Game2.micesAlive=data.numMices;
		var temp;
		if (Game2.wave<Env2.numWaves) {
			var d=0;
			var redo=setInterval(function(){
				if(d<data.numMices){
					//get random mice type
					//var type=Math.floor(temp.rnd*(data.numTypes-0.111));
					var type=Math.floor(Math.random()*shapeNums);
					var miceTypes=[];
					for (var i = 0; i < arrShape.length; i++) {
						miceTypes.push(arrShape[i]+"2");
					};
					var myDate = new Date();
					miceAppearTime = myDate.getTime();
					//draw mice!!!!
					Crafty.e("NormalMice").activate();					
					d++;	
				}else{
					clearInterval(redo);
				}
			},Env2.appearSpeed-(Game2.level-1)*200-Game2.wave*70);//mice appear speed Math.floor(5000/Env2.speed);
			Game2.wave++;
		}else{
			Game2.wave=0;
			Game2.micesAlive=1;
			setTimeout(//do after fixed time
				function(){
					//show the choice
					Crafty.scene('LevelCompleted2');
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
}