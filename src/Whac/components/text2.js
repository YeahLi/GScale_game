/**
 * creates canvas text components
 * neatly reuses a basic 'CanvasText' component
 */
//---------- Text -----------------------------------------------------
//---------------------------------------------------------------------
//CanvasText
//Basic text component
Crafty.c('CanvasText2',{
	init: function(){
		this.text = Crafty.e('2D, Canvas, Text, Scale2');
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
		this.text = Crafty.e('2D, Canvas, Text, Scale2');

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
Crafty.c('LoadingText2', {
	init: function(){
		this.requires('CanvasText2');
	},
	onResize: function(){
		//position info
		var textInfo = {
			x: Env2.x/2,
			y: Env2.y/2,
			text: '..loading..',
			fontSize: 2*Env2.textSize,
			alignment: {x:'center',y:'center'} 
		}
		this.update(textInfo);
	}
});
//Whac-A-MoleText:Text to display Whac-A-Mole
Crafty.c('Whac-A-MoleText', {
	init: function(){
		this.requires('CanvasText2');
		//console.log("Whac-A-MoleText.init");
	},
	onResize: function(){
		var textInfo = {
			x: Env2.x/2,
			y: Env2.y/2-25-(2.5*Env2.textSize),
			text: 'Whac-A-MoleText',
			fontSize: 1.5*Env2.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
		//console.log("Whac-A-MoleText.onResize");
	}
});
//
Crafty.c('LevelCompleteText2', {
	init: function(){
		this.requires('CanvasText2');
	},
	onResize: function(){
		var textInfo = {
			x: Env2.x/2,
			y: (Env2.textSize*10)-200,
			text: 'LevelComplete',
			fontSize: 1.5*Env2.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
	}
});
//
Crafty.c('LevelScoreText2', {
	init: function(){
		this.requires('CanvasText2');
	},
	setLevel: function(level){
		this.level = level;
		return this;
	},
	onResize: function(){
		var score = Game2.playerScore;
		var textInfo = {
			x: Env2.x/2,
			y: (Env2.textSize*10)-200 + (2*Env2.textSize) + (this.level*1.25*Env2.textSize),
			text: "Level " + (this.level+1) + ": " + score[this.level],
			fontSize: Env2.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
	}
});
//
Crafty.c('GameOverText2', {
	init: function(){
		this.requires('CanvasText2');
	},
	onResize: function(){
		var textInfo = {
			x: Env2.x/2,
			y: Env2.y/2-128,
			text: 'Game Over!',
			fontSize: 1.5*Env2.textSize,
			alignment: {x:'center',y:'top'} 
		}
		this.update(textInfo);
	}
});