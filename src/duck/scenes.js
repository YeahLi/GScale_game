/**
 * give structure to the various parts of the game 
 */
Crafty.scene('Loading',
	//this scene loads assets and performs setup
	function(){
		Crafty.background(bgColorValue);
		//
		//test area!!!
		//Crafty.e("Circle").activate();
		//Crafty.e("Square").activate();
		//
		Crafty.e('LoadingText');
		Crafty.bind("DuckGone", Game.levelManager);
		//pause the game
		Crafty.bind("KeyDown", function(e){
			switch(e.key){
				case 80://'p' pause
				if(Env.pausableGame){
					Crafty.pause();
				}
				break;
			}
		});
		//Load assets
		Crafty.load(
			['assets/crosshair.png'
			], function onLoad(){
				//assets loaded
				//create sprite components from image files
				Crafty.sprite(64, 64, 'assets/crosshair.png', {
				  	spr_crosshair: [0,0]//define spr_crosshair entity used in mouse.js
			    });
			    
				//setup audio from files
				Crafty.audio.add("shoot", "assets/shoot.mp3");
				Crafty.audio.add("reload", "assets/reload.mp3");
				//initialise sprite based entities
				if(!Env.global.mobile){
					//crosshair cursor 
					Crafty.e('GameMouse');
				}
				//go to the start menu scene
				Crafty.scene('StartMenu');
				Crafty.trigger('SceneChange',{});
			}
		);
	},
	function(){
		Crafty(Crafty('LoadingText')[0]).destroyMe();
	}
);
Crafty.scene('StartMenu',
	function(){
		//create start menu
		Crafty.e('DuckHuntText');
		Crafty.e('StartGameButton');
	},
	function(){
		//destroy start menu
		Crafty(Crafty('StartGameButton')[0]).destroyMe();
		Crafty(Crafty('DuckHuntText')[0]).destroyMe();
	}
);
Crafty.scene('Level',
	function(){
		//create a level
		//load the player (manages the players actions and the player's 'gun')
		Crafty.e('Player');
		//trigger the game logic for the level
		Game.levelManager();
	},
	function(){
		//destroy the level
		var player = Crafty(Crafty('Player')[0]);
		Game.playerScore[Game.level-1] = player.score._score;
		player.destroyMe();
	}
);
Crafty.scene('LevelCompleted',
	function(){ 
		//create level complete screen (displays level scores)
		Crafty.e('LevelCompleteText');
		for(var i=0; i<(Game.playerScore.length); i++){	
			Crafty.e('LevelScoreText').setLevel(i).onResize();
		}
		setTimeout(function(){
			//after a pause, go to next level (or end game)
			Game.nextLevel();
		}, 2000 );
	},
	function(){
		//destroy level complete screen
		Crafty(Crafty('LevelCompleteText')[0]).destroyMe();
		var levels = Crafty('LevelScoreText');
		for(var i=0;i<levels.length;i++){
			Crafty(levels[i]).destroyMe();
		}
	}
);
Crafty.scene('GameOver',
	function(){
		//create game over screen
		Crafty.e('GameOverText');
		if(Env.multipleGames){	
			//reset to start menu
			Game.playerScore = [];
			Game.level = 1;
			setTimeout(
				function(){
					//show the choice
					Crafty.e('RestartGameButton');
					Crafty.e('Quit');
				}
				,1500
			);
		}
	},
	function(){
		//destroy game over screen
		Crafty(Crafty('GameOverText')[0]).destroyMe();
		Crafty(Crafty('RestartGameButton')[0]).destroyMe();
		Crafty(Crafty('Quit')[0]).destroyMe();
	}
);