/**
 * components for controlling the players actions and the player's 'gun'
 */
//Player
//large component that incorporates the players actions and the player's 'gun'

//Game Score
Crafty.c('Score2', {
	init: function(){
		this.requires('CanvasText2');
		this._score = 0;	
		this.onResize();
	},
	add: function(worth){
			this._score += worth;
			this.onResize();
	},
	onResize: function(){
		var scoreheight;
		if(Env2.x<240){
			scoreheight = 40;
		}else{
			scoreheight = 10;
		}
		var textInfo = {
			x: 5 + 40*(Env2.x-160)/2560,
			y: scoreheight,
			text: "Score: " + this._score,
			color: '#0033CC',
			fontSize: Env2.textSize,
			alignment: {x:'left',y:'top'} 
		}
		this.update(textInfo);
	}
});
//Player
//large component that incorporates the players actions and the player's 'gun'
Crafty.c('Player2', {
	init: function(){
		this.requires('Scale2');
		// entity to manage the players score
		this.score = Crafty.e('Score2');
		//callback to manage player clicks in the game window
		Crafty.addEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
	},
	onMouseDown: function(e){
		Crafty.audio.play("shoot");
		//check if the game is using a mouse or a touchscreen	
		if(Env2.global.mobile){
			//get game coordinates of the touch point
			var mouse = this.getGameCoords(e.clientX,e.clientY);
		}else{
			//get game coordinates of the crooshair on screen (NOT neccessarily where the mouse pointer is)
			var mouse = Crafty(Crafty('GameMouse2')[0]).getMousePos();
		}
		//increas click Numbers
		clickNumbers++;
		//get list of mices
		var mices = Crafty('Mice');
		for(var i=0; i<mices.length; i++){
			//check for overlap of mouse and mice
			var mice = Crafty(mices[i]);
			var micePos = mice.getPos();
			var width = mice._w;
			var height = mice._h;
			var name=mice.miceName;
			var leftX=micePos.x;
			var rightX=micePos.x + width;
			var eY=mouse.y-micePos.y;//y in math
			switch(name){
				case 'Circle':
				    var r=width/2;
					var temp1=2*eY*r-Math.pow(eY,2);
					var temp2=Math.sqrt(temp1);
					leftX=micePos.x+(r-temp2);
					rightX=micePos.x+(r+temp2);
					break;
				case 'Square':
					//do nothing use default
					break;
				case 'Triangle':
					var temp1=0.5*eY;
					leftX=micePos.x+(0.5*width-temp1);
					rightX=micePos.x+(0.5*width+temp1);
					break;
				default:
					break;
			}
			//if clicked the mouse to hit that means have already move the mouse
			var myDate = new Date(); 
			miceGoneTime=myDate.getTime();
			var hitTime=miceGoneTime-miceAppearTime;
			arrHitTime.push(hitTime);

			if(micePos.y < mouse.y && mouse.y < (micePos.y + height) && mice.alive){
				if (leftX < mouse.x && mouse.x < rightX) {
					//mice has been hit. check for kill
					if(mice.kill()){
						hitNumbers++;
						//increase score
						this.score.add(mice.worth);
						//trigger event for the game logic (see game.js)
						Crafty.trigger('MiceGone',{});
					}
				}
			}
		}
	},
	destroyMe: function(){
		//destroy mice entity
		this.score.destroyMe();
		Crafty.removeEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
		this.destroy();
	}
});