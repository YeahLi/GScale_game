//Button
//the basic button component, manages the background rectangle and the text
//makes buttons, because they're all very similar so it is 
//easier to have one button componenet that is a base for all of them
Crafty.c('Button2', {
	init: function(){
		this.requires('2D, Canvas, Scale2, Persist');
		this.setLayer('button');
		//callback for button clicks
		Crafty.addEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
	},
	onMouseDown: function(e){
		if(Env2.global.mobile){
			var mouse = this.getGameCoords(e.clientX,e.clientY);
		}else{
			var mouse = Crafty(Crafty('GameMouse2')[0]).getMousePos();
		}
		var pos = this.getPos();
		if(pos.x < mouse.x && mouse.x < (pos.x + this.w) && pos.y < mouse.y && mouse.y < (pos.y + this.h)){
			this.onClick();
		}
	},
	destroyMe: function(){
		Crafty.removeEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
		this.destroy();
	}
});
//StartGameButton
//button to start the game
Crafty.c('StartGameButton2', {
	init: function(){
		this.requires('Button2, spr_play');
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	onResize: function(){
		//recalculate position/size and update the button
		this.attr({w:64+0.08*Env2.x,h:64+0.08*Env2.x});
		this.setPos(Env2.x/2-this.w/2,Env2.y/2-this.h/4);	
	},
	onClick: function(){
		gameScreen.style.cursor = "none";
		//change scene to first level
		Crafty.scene('Level2');
		Crafty.trigger('SceneChange',{});
	}
});
Crafty.c('RestartGameButton2', {
	init: function(){
		gameScreen.style.cursor = "default";
		this.requires('Button2, spr_repeat');
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	onResize: function(){
		//recalculate position/size and update the button
		this.attr({w:48+0.08*Env2.x,h:48+0.08*Env2.x});
		this.setPos(Env2.x/2-this.w*1.5,Env2.y/2-this.h/2);	
	},
	onClick: function(){
		gameScreen.style.cursor = "none";
		//change scene to first level
		Crafty.scene('Level2');
		Crafty.trigger('SceneChange',{});
	}
});
Crafty.c('Quit2', {
	init: function(){
		this.requires('Button2, spr_quit');
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	onResize: function(){
		//recalculate position/size and update the button
		this.attr({w:48+0.08*Env2.x,h:48+0.08*Env2.x});
		this.setPos(Env2.x/2+this.w/2,Env2.y/2-this.h/2);	
	},
	onClick: function(){
		//go back to settings
		exitFullscreen();
		self.location="./index.html";
	}
});