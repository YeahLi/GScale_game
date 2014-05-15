//Mice
//common mice component
//Please remember 'Mice' are not destroyed at all!!!!!!!!!! Although define the function!!!!!
Crafty.c('Mice', {
	i:0,
	j:0,
	init: function(){
		this.requires('2D, Canvas, Scale2, Mouse, Tween'); 
		//set layer
		this.setLayer('mices');
		//alive flag
		this.alive = true;
		//sprite rotation point
		this.origin('center');
		//MiceName
		this.miceName="defaultMice";
		this.bind('ResizedWindow',this.onResize);

	},
	activate: function(){
		//setup mice for animating
		//
		//pick a random starting position
		do{
			this.i=Math.floor(Math.random()*row);
			this.j=Math.floor(Math.random()*col);	
		}while(!arrHole[this.i][this.j].available)
		this.setPos(arrHole[this.i][this.j].x,arrHole[this.i][this.j].y);
		arrHole[this.i][this.j].available=false;
		//start animating the mice (start movement)
		this.bind('TweenEnd',this.animateMice);
		this.animateMice();
		return this;
	},
	animateMice: function(){
		//check if the mice is timeout
		var continueMe = this.checkDestroy();
		if(this.alive && continueMe){
			//keep drawing the same
			this.tween({x:this.x,y:this.y,},100);//draw the initial image
		}else if (!this.alive && continueMe) {
			//mice is dead turn small and disappear
			this.tween({alpha: 0.0,size:0}, 50);
		}else if (this.alive && !continueMe){
			//mice is escaped, disappear
			this.tween({alpha: 0.0}, 50);
		}
	},
	checkDestroy: function(){
		//check if the mice is timeout
		var myDate = new Date();		
		if((myDate.getTime()-miceAppearTime)> this.speed){
			//mice is escaped, destroy it time=Env2.appearSpeed*1.5
			if(this.alive){
				Crafty.trigger('MiceGone',{});
			}
			this.destroyMe();
			return false;
		}
		return true;
	},
	kill: function(){
		//mice has been shot. Check for death
		this.health--;
		if(this.health ===0){
			//mice killed
			this.alive = false;
			arrHole[this.i][this.j].available=true;
			//set sprite image
			
			//set sprite movement tween
			this.animateMice();
			return true; 
		}else{
			//mice is still alive
			return false;
		}
	},
	onResize: function(){
		arrHole[this.i][this.j].available=true;
		do{
			this.i=Math.floor(Math.random()*row);
			this.j=Math.floor(Math.random()*col);	
		}while(!arrHole[this.i][this.j].available)
		this.setPos(arrHole[this.i][this.j].x,arrHole[this.i][this.j].y);
		arrHole[this.i][this.j].available=false;
	},
	destroyMe: function(type){
		//destroy entity
		this.unbind('TweenEnd');
		this.destroy();
	}
});
//---------- Actual Mices --------------------------------------------------
//--------------------------------------------------------------------------

//YellowMice
//slowest and easiest to kill
Crafty.c('Circle2', {
	init: function(){
		this.requires('Mice');
		//rewrite the miceName
		this.miceName="Circle";

		this.speed = Env2.disappearSpeed;
		this.worth = Env2.worth;
		//hits to kill the mice
		this.health = 1;
		this.setPos(arrHole[this.i][this.j].x,arrHole[this.i][this.j].y);
		this.attr({w:Env2.miceWidth,h:Env2.miceHeight});
		this.size = Env2.miceWidth/2;
		this.color =  objColorValue || "yellow";
		this.bind("Draw", this._draw_me); //bind the draw function to "Draw"!!!!
        this.ready = true; //the entity will be drawed only the ready is true!!!
	},
	_draw_me: function() {
	    //canvas element's top left is (this.x,this.y)
		var ctx = Crafty.canvas.context;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.x + this.size,
			this.y + this.size,
			this.size,
			0,
			Math.PI * 2
		);
		ctx.closePath();
		ctx.fill();
		//console.log("draw Circle:"+this.size+",this.x:"+this.x+"this.y"+this.y);
	}
});

Crafty.c("Square2", {
	init: function(){
		this.requires('Mice,Color');
		//rewrite the miceName
		this.miceName="Square";

		this.speed = Env2.disappearSpeed;
		this.worth = Env2.worth;
		//hits to kill the mice
		this.health = 1
		this.attr({w:Env2.miceWidth,h:Env2.miceHeight});
		this.setPos(-2*this._w,-2*this._h);
		this.size = Env2.miceWidth;
		this.color(objColorValue);
		//this.bind("Draw", this._draw_me); //bind the draw function to "Draw"!!!!
       // this.ready = true; //the entity will be drawed only the ready is true!!!
	}, 
	_draw_me: function() {
		var ctx = Crafty.canvas.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x-this.size/2, this.y-this.size/2,this.x+this.size/2,this.y+this.size/2);
	}
});
Crafty.c("Triangle2", {
	init: function(){
		this.requires('Mice');
		//rewrite the miceName
		this.miceName="Triangle";

		this.speed = Env2.disappearSpeed;
		this.worth = Env2.worth;
		//hits to kill the mice
		this.health = 1
		this.attr({w:Env2.miceWidth,h:Env2.miceHeight});
		//this.setPos(-2*this._w,-2*this._h);
		this.size = Env2.miceWidth;
		this.color =  objColorValue || "yellow";
		this.bind("Draw", this._draw_me); //bind the draw function to "Draw"!!!!
        this.ready = true; //the entity will be drawed only the ready is true!!!
	},  
	_draw_me: function() {
	    //canvas element's top left is (this.x,this.y)
		var ctx = Crafty.canvas.context;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x+this.size/2,this.y);
		ctx.lineTo(this.x,this.y+this.size);
		ctx.lineTo(this.x+this.size,this.y+this.size);
		ctx.closePath();
		ctx.fill();
	}
});