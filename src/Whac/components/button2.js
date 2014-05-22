//ButonText
//text to use in the button, it's just CanvasText text without the resize event (see text.js)
Crafty.c('ButtonText2', {
	init: function(){
		this.requires('CanvasText2');
		this.unbind('ResizedWindow',this.onResize);
	},
	onResize: function(){
	}
});
//Button
//the basic button component, manages the background rectangle and the text
Crafty.c('Button2', {
	init: function(){
		this.requires('Scale2');
		//text entity
		this.text = Crafty.e('ButtonText2');
		//rectangle entity
		this.background = Crafty.e('2D', 'Canvas', 'Color', 'Scale2');
		this.background.setLayer('button');
		//callback for button clicks
		Crafty.addEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	update: function(data){
		//data: w,h,x,y,text,fontSize,color,alignment
		if(data.alignment.x === 'center'){
			data.x -= data.w/2;
		}else if(data.alignment.x === 'right'){
			data.x -= data.w;
		}
		if(data.alignment.y === 'center'){
			data.y -= data.h/2;
		}else if(data.alignment.y === 'bottom'){
			data.y -= data.h;
		}
		this.background.setPos(data.x,data.y);
		this.background.attr({w:data.w,h:data.h});
		this.background.color(data.color);
		var textInfo = {
			x: data.x + data.w/2,
			y: data.y + data.h/2,
			text: data.text,
			fontSize: data.fontSize,
			alignment: {x:'center',y:'center'} 
		}
		this.text.update(textInfo);
	},
	onMouseDown: function(e){
		if(Env2.global.mobile){
			var mouse = this.getGameCoords(e.clientX,e.clientY);
		}else{
			var mouse = Crafty(Crafty('GameMouse2')[0]).getMousePos();
		}
		var pos = this.background.getPos();
		if(pos.x < mouse.x && mouse.x < (pos.x + this.background.w) && pos.y < mouse.y && mouse.y < (pos.y + this.background.h)){
			this.onClick();
		}
	},
	destroyMe: function(){
		Crafty.removeEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
		this.background.destroy();
		this.text.destroyMe();
		this.destroy();
	}
});
//StartGameButton
//button to start the game
Crafty.c('StartGameButton2', {
	init: function(){
		this.requires('Button2');
	},
	onResize: function(){
		//recalculate position/size and update the button
		var buttonInfo = {
			x: Env2.x/2,
			y: Env2.y/2,
			w: Env2.textSize*6,
			h: Env2.textSize*1.2,
			text: 'Start Game',
			fontSize: Env2.textSize,
			color: 'rgb(200,200,200)',
			alignment: {
				x: 'center',
				y: 'center'
			}
		};
		this.update(buttonInfo);
	},
	onClick: function(){
		//change scene to first level
		Crafty.scene('Level2');
		Crafty.trigger('SceneChange',{});
	}
});
Crafty.c('RestartGameButton2', {
	init: function(){
		this.requires('Button2');
	},
	onResize: function(){
		//recalculate position/size and update the button
		var buttonInfo = {
			x: Env2.x/2,
			y: Env2.y/2,
			w: Env2.textSize*7,
			h: Env2.textSize*1.2,
			text: 'Restart Game',
			fontSize: Env2.textSize,
			color: 'rgb(200,200,200)',
			alignment: {
				x: 'center',
				y: 'center'
			}
		};
		this.update(buttonInfo);
	},
	onClick: function(){
		//change scene to first level
		Crafty.scene('Level2');
		Crafty.trigger('SceneChange',{});
	}
});
Crafty.c('Quit2', {
	init: function(){
		this.requires('Button2');
	},
	onResize: function(){
		//recalculate position/size and update the button
		var buttonInfo = {
			x: Env2.x/2,
			y: Env2.y/2+Env2.textSize*2,
			w: Env2.textSize*7,
			h: Env2.textSize*1.2,
			text: 'Quit',
			fontSize: Env2.textSize,
			color: 'rgb(200,200,200)',
			alignment: {
				x: 'center',
				y: 'center'
			}
		};
		this.update(buttonInfo);
	},
	onClick: function(){
		//go back to settings
		exitFullscreen();
		self.location="./index.html";
	}
});
//makes buttons, because they're all very similar so it is 
//easier to have one button componenet that is a base for all of them

//ReloadButotn
//button for reloading ammo
Crafty.c('ReloadButton2', {
	init: function(){
		this.requires('Button2');
	},
	onResize: function(){
		//recalculate position/size and update the button
		var buttonInfo = {
			x: Env2.x/2,
			y: Env2.y+1,
			w: 160+ 260*(Env2.x-160)/2560,
			h: 50+ 100*(Env2.y-160)/2560,
			text: 'RELOAD',
			fontSize: 1.5*Env2.textSize,
			color: 'rgb(200,100,100)',
			alignment: {
				x: 'center',
				y: 'bottom'
			}
		};
		this.update(buttonInfo);
	},
	onClick: function(){
		//trigger reload of ammor
		Crafty.audio.play("reload");
		Crafty.trigger('reloadClick2');
		this.destroyMe();
	}
});