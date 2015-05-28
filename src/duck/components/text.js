/**
 * creates canvas text components
 * neatly reuses a basic 'CanvasText' component
 */
//---------- Text -----------------------------------------------------
//---------------------------------------------------------------------
//CanvasText
//Basic text component
Crafty.c('CanvasText',{
	init: function(){
		this.text = Crafty.e('2D, Canvas, Text, Scale');
		this.w = 0;
		this.h =0;
		this.layer = 'text';
		this.text.setLayer(this.layer);
		this.onResize();
		this.bind('ResizedWindow', this.onResize);
	},
	newLayer: function(name,value){
		this.layer = name;
		this.text.newLayer(name,value);
	},
	setLayer: function(name){
		this.layer = name;
		this.text.setLayer(name);
	},
	update:function(data){
		this.text.destroy();
		this.text = Crafty.e('2D, Canvas, Text, Scale');

		this.text.text(data.text);
		this.text.textColor('#FFFFFF',1);
		this.text.textFont({family: 'Arial', size: data.fontSize+'px'});
		this.text.setLayer(this.layer);

		var ctx = Crafty.canvas.context;
		ctx.save();
		ctx.font = data.fontSize + 'px Arial';
		this.w = ctx.measureText(data.text).width;
		this.h = ctx.measureText('M').width; //fix this!!!!!!!!!!!!!!!! (probably going to be complicated)
		ctx.restore();
		if(data.alignment.x === 'left'){
			//add padding??
		}else if(data.alignment.x === 'center'){
			data.x -= this.w/2;
		}else if(data.alignment.x === 'right'){
			data.x -= this.w;
		}
		if(data.alignment.y === 'top'){
			//add padding??
		}else if(data.alignment.y === 'center'){
			data.y -= this.h/2;
		}else if(data.alignment.y === 'bottom'){
			data.y -= this.h;
		}
		this.text.setPos(data.x,data.y);
		this.text.attr({w:this.w,h:this.h});//,h:this.h});
	},
	destroyMe: function(){
		this.text.destroy();
		this.destroy();
	}
});
//LoadingText:Text for loading screen
Crafty.c('LoadingText', {
	init: function(){
		this.requires('CanvasText');
	},
	onResize: function(){
		//position info
		var textInfo = {
			x: Env.x/2,
			y: Env.y/2,
			text: '..loading..@Ye Li',
			fontSize: 2*Env.textSize,
			alignment: {x:'center',y:'center'} 
		}
		this.update(textInfo);
	}
});
//DuckHuntText:Text to display duckhunt
Crafty.c('DuckHuntText', {
	init: function(){
		this.requires('CanvasText');
		//console.log("DuckHuntText.init");
	},
	onResize: function(){
		var textInfo = {
			x: Env.x/2,
			y: Env.y/2-25-(2.5*Env.textSize),
			text: 'Duck Hunt',
			fontSize: 2*Env.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
		//console.log("DuckHuntText.onResize");
	}
});
//
Crafty.c('LevelCompleteText', {
	init: function(){
		this.requires('CanvasText');
	},
	onResize: function(){
		var textInfo = {
			x: Env.x/2,
			y: (Env.textSize*10)-200,
			text: 'LevelComplete @Ye Li',
			fontSize: 1.5*Env.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
	}
});
//
Crafty.c('LevelScoreText', {
	init: function(){
		this.requires('CanvasText');
	},
	setLevel: function(level){
		this.level = level;
		return this;
	},
	onResize: function(){
		var score = Game.playerScore;
		var textInfo = {
			x: Env.x/2,
			y: (Env.textSize*10)-200 + (2*Env.textSize) + (this.level*1.25*Env.textSize),
			text: "Level " + (this.level+1) + ": " + score[this.level]+'Ye Li',
			fontSize: Env.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
	}
});
//
Crafty.c('GameOverText', {
	init: function(){
		this.requires('CanvasText');
	},
	onResize: function(){
		var textInfo = {
			x: Env.x/2,
			y: Env.y/2-128,
			text: 'Game Over! @Ye Li',
			fontSize: 1.5*Env.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
	}
});
