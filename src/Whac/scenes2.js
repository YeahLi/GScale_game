Crafty.scene('Loading2',
	//this scene loads assets and performs setup
	function(){
		Crafty.background(bgColorValue);
		//
		//test area!!!
		//Crafty.e("Circle").activate();
		//Crafty.e("Square").activate();
		//
		Crafty.e('LoadingText2');
		Crafty.bind("MiceGone", Game2.levelManager);
		//pause the game
		Crafty.bind("KeyDown", function(e){
			switch(e.key){
				case 80://'p' pause
				if(Env2.pausableGame){
					Crafty.pause();
				}
				break;
			}
		});
		//Load assets
		Crafty.load(
			['assets/crosshair.png',
			 'assets/bg.png',
			 'assets/board.png',
			 'assets/GameOver.png',
			 'assets/hole_base.png',
			 'assets/hole.png',
			 'assets/mice.png',
			 'assets/reload.mp3',
			 'assets/shoot.mp3'
			], function onLoad(){
				//assets loaded
				//create sprite components from image files
				Crafty.sprite(64, 64, 'assets/crosshair.png', {
				  	spr_crosshair: [0,0]//define spr_crosshair entity used in mouse.js
			    });
			    Crafty.sprite('assets/bg.png', {spr_background:[0,0,978,736]});
			    Crafty.sprite('assets/board.png', {spr_board:[0,0,790,480]});
			    Crafty.sprite('assets/GameOver.png', {spr_gameover:[0,0,385,88]});
			    Crafty.sprite('assets/hole_base.png', {spr_hole_base:[0,0,210,69]});
			    Crafty.sprite('assets/hole.png', {spr_hole:[0,0,187,56]});
			    Crafty.sprite(202, 220, 'assets/mice.png', {
				  	spr_mice: [0,0]
			    });
				//setup audio from files
				Crafty.audio.add("shoot", "assets/shoot.mp3");
				Crafty.audio.add("reload", "assets/reload.mp3");
				//initialise sprite based entities
				if(!Env2.global.mobile){
					//crosshair cursor 
					Crafty.e('GameMouse2');
				}
				//background
				Crafty.e('Background');
				Crafty.e('Hole_base');
				Crafty.e('Hole');
				//go to the start menu scene
				Crafty.scene('StartMenu2');
				Crafty.trigger('SceneChange',{});
			}
		);
	},
	function(){
		Crafty(Crafty('LoadingText2')[0]).destroyMe();
	}
);
Crafty.scene('StartMenu2',
	function(){
		//create start menu
		Crafty.e('Whac-A-MoleText');
		Crafty.e('StartGameButton2');
	},
	function(){
		//destroy start menu
		Crafty(Crafty('StartGameButton2')[0]).destroyMe();
		Crafty(Crafty('Whac-A-MoleText')[0]).destroyMe();
	}
);
Crafty.scene('Level2',
	function(){
		//create a level
		//load the player (manages the players actions and the player's 'gun')
		Crafty.e('Player2');
		//trigger the game logic for the level
		Game2.levelManager();
	},
	function(){
		//destroy the level
		var player = Crafty(Crafty('Player2')[0]);
		Game2.playerScore[Game2.level-1] = player.score._score;
		player.destroyMe();
	}
);
Crafty.scene('LevelCompleted2',
	function(){ 
		//create level complete screen (displays level scores)
		Crafty.e('LevelCompleteText2');
		for(var i=0; i<(Game2.playerScore.length); i++){	
			Crafty.e('LevelScoreText2').setLevel(i).onResize();
		}
		setTimeout(function(){
			//after a pause, go to next level (or end game)
			Game2.nextLevel();
		}, 1500 );
	},
	function(){
		//destroy level complete screen
		Crafty(Crafty('LevelCompleteText2')[0]).destroyMe();
		var levels = Crafty('LevelScoreText2');
		for(var i=0;i<levels.length;i++){
			Crafty(levels[i]).destroyMe();
		}
	}
);
Crafty.scene('GameOver2',
	function(){
		//create game over screen
		Crafty.e('GameOverText2');
		if(Env2.multipleGames){	
			//reset to start menu
			Game2.playerScore = [];
			Game2.level = 1;
			setTimeout(
				function(){
					//show the choice
					Crafty.e('RestartGameButton2');
					Crafty.e('Quit2');
				}
				,1000
			);
		}
	},
	function(){
		//destroy game over screen
		Crafty(Crafty('GameOverText2')[0]).destroyMe();
		Crafty(Crafty('RestartGameButton2')[0]).destroyMe();
		Crafty(Crafty('Quit2')[0]).destroyMe();
	}
);