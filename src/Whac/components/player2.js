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
			fontSize: Env2.textSize,
			alignment: {x:'left',y:'top'} 
		}
		this.update(textInfo);
	}
});

//Ammo
//controls the 'gun' operation
Crafty.c('Ammo2', {
	init: function(){
		if(!Env2.unlimitedAmmo){
			//list of ammo entities
			this._ammo = [];
			//available ammo
			this._amount = 0;
			this.reload();
			this.bind('reloadClick2',this.reload);
			this.bind('ResizedWindow',this.onResize);
		}
	},	
	decrease: function(){
		//check if gun can be fired
		if(Env2.unlimitedAmmo){
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
					Crafty.e('ReloadButton2');
				}
				return true;
			}else{
				return false;
			}
		}
	},
	reload: function(){
		if (!Env2.unlimitedAmmo) {
			//refill the ammo
			for(var i=this._amount;i<Env2.ammo;i++){
				this._ammo[i] = Crafty.e('2D', 'Canvas', 'Color', 'Scale2');
				this._ammo[i].color('rgb(250,150,50)');
				this._ammo[i].attr({w:Env2.ammoWidth, h:Env2.ammoHeight});
				this._ammo[i].setPos(Env2.x-Env2.ammoWidthOffset - Env2.ammoWidth -i*(Env2.ammoWidth + Env2.ammoSeparation),Env2.ammoHeightOffset);
				this._ammo[i].setLayer('ammo');
			}
			this._amount = Env2.ammo;
		}
	},
	onResize: function(){
		if (!Env2.unlimitedAmmo) {
			//reposition ammo entities on screen
			for(var i=0; i<this._amount;i++){
				this._ammo[i].attr({w:Env2.ammoWidth, h:Env2.ammoHeight});
				this._ammo[i].setPos(Env2.x-Env2.ammoWidthOffset - Env2.ammoWidth -i*(Env2.ammoWidth + Env2.ammoSeparation),Env2.ammoHeightOffset);
			}
		}
	},
	destroyMe: function(){
		//destroy ammo and reload button and this component
		this.unbind('reloadClick2');
		this.unbind('ResizedWindow');
		var reloads = Crafty('ReloadButton2');
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
Crafty.c('Player2', {
	init: function(){
		this.requires('Scale2');
		// entity to manage the players score
		this.score = Crafty.e('Score2');
		// entity to manage the gun's ammo
		this.ammo = Crafty.e('Ammo2');
		//callback to manage player clicks in the game window
		Crafty.addEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
	},
	onMouseDown: function(e){
		//check if a shot can occur
		if(this.ammo.decrease()){	
			//check if the game is using a mouse or a touchscreen	
			if(Env2.global.mobile){
				//get game coordinates of the touch point
				var mouse = this.getGameCoords(e.x,e.y);
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
		}
	},
	destroyMe: function(){
		//destroy mice entity
		this.ammo.destroyMe();
		this.score.destroyMe();
		Crafty.removeEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
		this.destroy();
	}
});