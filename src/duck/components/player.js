/**
 * components for controlling the players actions and the player's 'gun'
 */
//Player
//large component that incorporates the players actions and the player's 'gun'

//Game Score
Crafty.c('Score', {
	init: function(){
		this.requires('CanvasText');
		this._score = 0;	
		this.onResize();
	},
	add: function(worth){
			this._score += worth;
			this.onResize();
	},
	onResize: function(){
		var scoreheight;
		if(Env.x<240){
			scoreheight = 40;
		}else{
			scoreheight = 10;
		}
		var textInfo = {
			x: 5 + 40*(Env.x-160)/2560,
			y: scoreheight,
			text: "Score: " + this._score,
			fontSize: Env.textSize,
			alignment: {x:'left',y:'top'} 
		}
		this.update(textInfo);
	}
});

//Ammo
//controls the 'gun' operation
Crafty.c('Ammo', {
	init: function(){
		if(!Env.unlimitedAmmo){
			//list of ammo entities
			this._ammo = [];
			//available ammo
			this._amount = 0;
			this.reload();
			this.bind('reloadClick',this.reload);
			this.bind('ResizedWindow',this.onResize);
		}
	},	
	decrease: function(){
		//check if gun can be fired
		if(Env.unlimitedAmmo){
			Crafty.audio.play("shoot");
			return true;
		}else{
			if(this._amount>0){
				//there is ammo left to fire
				//fire the gun!!!!
				Crafty.audio.play("shoot");
				--this._amount;
				this._ammo[this._amount].destroy();
				if(this._amount === 0){
					//if the gun is now out of ammo, create a reload button on screen (see button.js)
					Crafty.e('ReloadButton');
				}
				return true;
			}else{
				return false;
			}
		}
	},
	reload: function(){
		//refill the ammo
		for(var i=this._amount;i<Env.ammo;i++){
			this._ammo[i] = Crafty.e('2D', 'Canvas', 'Color', 'Scale');
			this._ammo[i].color('rgb(250,150,50)');
			this._ammo[i].attr({w:Env.ammoWidth, h:Env.ammoHeight});
			this._ammo[i].setPos(Env.x-Env.ammoWidthOffset - Env.ammoWidth -i*(Env.ammoWidth + Env.ammoSeparation),Env.ammoHeightOffset);
			this._ammo[i].setLayer('ammo');
		}
		this._amount = Env.ammo;
	},
	onResize: function(){
		//reposition ammo entities on screen
		for(var i=0; i<this._amount;i++){
			this._ammo[i].attr({w:Env.ammoWidth, h:Env.ammoHeight});
			this._ammo[i].setPos(Env.x-Env.ammoWidthOffset - Env.ammoWidth -i*(Env.ammoWidth + Env.ammoSeparation),Env.ammoHeightOffset);
		}
	},
	destroyMe: function(){
		//destroy ammo and reload button and this component
		this.unbind('reloadClick');
		this.unbind('ResizedWindow');
		var reloads = Crafty('ReloadButton');
		if(reloads.length==1){
			Crafty(reloads[0]).destroyMe();
		}
		for(var i=0;i<this._amount;i++){
			this._ammo[i].destroy();
		}
		this.destroy();
	}
});
//Player
//large component that incorporates the players actions and the player's 'gun'
Crafty.c('Player', {
	init: function(){
		this.requires('Scale');
		// entity to manage the players score
		this.score = Crafty.e('Score');
		// entity to manage the gun's ammo
		this.ammo = Crafty.e('Ammo');
		//callback to manage player clicks in the game window
		Crafty.addEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
	},
	onMouseDown: function(e){
		//check if a shot can occur
		if(this.ammo.decrease()){	
			//check if the game is using a mouse or a touchscreen	
			if(Env.global.mobile){
				//get game coordinates of the touch point
				var mouse = this.getGameCoords(e.x,e.y);
			}else{
				//get game coordinates of the crooshair on screen (NOT neccessarily where the mouse pointer is)
				var mouse = Crafty(Crafty('GameMouse')[0]).getMousePos();
			}
			//increas click Numbers
			clickNumbers++;
			//get list of ducks
			var ducks = Crafty('Duck');
			for(var i=0; i<ducks.length; i++){
				//check for overlap of mouse and duck
				var duck = Crafty(ducks[i]);
				var duckPos = duck.getPos();
				var width = duck._w;
				var height = duck._h;
				var name=duck.duckName;
				var leftX=duckPos.x;
				var rightX=duckPos.x + width;
				var eY=mouse.y-duckPos.y;//y in math
				switch(name){
					case 'Circle':
					    var r=width/2;
						var temp1=2*eY*r-Math.pow(eY,2);
						var temp2=Math.sqrt(temp1);
						leftX=duckPos.x+(r-temp2);
						rightX=duckPos.x+(r+temp2);
						break;
					case 'Square':
						//do nothing use default
						break;
					case 'Triangle':
						var temp1=0.5*eY;
						leftX=duckPos.x+(0.5*width-temp1);
						rightX=duckPos.x+(0.5*width+temp1);
						break;
					default:
						break;
				}
				//if clicked the mouse to hit that means have already move the mouse
				var myDate = new Date(); 
				duckGoneTime=myDate.getTime();
				var hitTime=duckGoneTime-duckAppearTime;
				arrHitTime.push(hitTime);

				if(duckPos.y < mouse.y && mouse.y < (duckPos.y + height) && duck.alive){
					if (leftX < mouse.x && mouse.x < rightX) {
						//duck has been hit. check for kill
						if(duck.kill()){
							hitNumbers++;
							//increase score
							this.score.add(duck.worth);
							//trigger event for the game logic (see game.js)
							Crafty.trigger('DuckGone',{});
						}
					}
				}
			}
		}
	},
	destroyMe: function(){
		//destroy duck entity
		this.ammo.destroyMe();
		this.score.destroyMe();
		Crafty.removeEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
		this.destroy();
	}
});