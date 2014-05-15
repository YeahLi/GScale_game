//Duck
//common duck component
//Please remember duck are not destroyed at all!!!!!!!!!! Although define the function!!!!!
Crafty.c('Duck', {
	init: function(){
		this.requires('2D, Canvas, Scale, Mouse, Tween'); 
		//set layer
		this.setLayer('ducks');
		//alive flag
		this.alive = true;
		//sprite rotation point
		this.origin('center');
		//duckName
		this.duckName="defaultDuck";
		this.bind('ResizedWindow',this.onResize);
	},
	activate: function(){
		//setup duck for animating
		//
		//pick a random starting direction
		var temp = Game.seededRandom(Game.duckStartSeed);
		Game.duckStartSeed = temp.seed;
		this.direction =((Math.floor(temp.rnd+0.5))*2)-1;
		//pick a random starting position
		temp = Game.seededRandom(Game.duckStartSeed);
		Game.duckStartSeed = temp.seed;
		if(this.direction === -1){
			this.setPos(temp.rnd*(Env.x-(Env.horizontalTravel)-this._w), Env.y);
		}else{
			this.setPos(Env.horizontalTravel+(temp.rnd*(Env.x-(Env.horizontalTravel)-this._w)), Env.y);
		}
		//start animating the duck (start movement)
		this.bind('TweenEnd',this.animateDuck);
		this.animateDuck();
		return this;
	},
	animateDuck: function(){
		//execute next step of duck mouvement
		var pos = this.getPos();
		//check if the duck is outside the game boundaries
		var continueMe = this.checkDestroy(pos);
		if(this.alive && continueMe){
			//assign sprite a new mouvement tween
			this.tweenMe(pos.x+Env.horizontalTravel*this.direction, pos.y-Env.verticalTravel, this.speed);
		}else if (continueMe){
			//duck is dead, continue duck falling motion
			//console.log("draw falling:"+pos.x+","+pos.y);
			this.tweenMe(pos.x, pos.y+this._h+1, 100/Env.deathSpeed);
		}
	},
	checkDestroy: function(pos){
		//check if the duck is outside the game borders
		if(	pos.x<(-1*this._w) || pos.x>(Env.x+this._w) || pos.y<(-1*this._h) || pos.y>(Env.y)+this._h){
			//duck is outside game, destroy it
			if(this.alive){
				Crafty.trigger('DuckGone',{});
			}
			this.destroyMe();
			return false;
		}
		return true;
	},
	kill: function(){
		//duck has been shot. Check for death
		this.health--;
		if(this.health ===0){
			//duck killed
			var pos = this.getPos();
			this.alive = false;
			//set sprite image
			
			//set sprite movement tween
			this.animateDuck();
			return true; 
		}else{
			//duck is still alive
			return false;
		}
	},
	tweenMe: function(desX,desY,speed,rotation){
		//sprite movement tween
		//moves the sprite in window coordinates based on the game coordinates given
		var newPosition = this.getAbsoluteCoords(desX,desY);
		if(rotation){
			this.tween({x:newPosition.x,y:newPosition.y,rotation:rotation},speed);
		}else{
			this.tween({x:newPosition.x,y:newPosition.y},speed);
		}
	},
	onResize: function(){
		var temp=Env.x/Env.y;
		this.setPos(this.x/temp, this.y);
	},
	destroyMe: function(type){
		//destroy entity
		this.unbind('TweenEnd');
		this.destroy();
	}
});
//---------- Actual Ducks --------------------------------------------------
//--------------------------------------------------------------------------

//YellowDuck
//slowest and easiest to kill
Crafty.c('Circle', {
	init: function(){
		this.requires('Duck');
		//rewrite the duckName
		this.duckName="Circle";

		this.speed = Math.floor(Math.sqrt(Math.pow(Env.horizontalTravel,2)+Math.pow(Env.verticalTravel,2))/Env.speed);
		this.worth = Env.worth;
		//hits to kill the duck
		this.health = 1
		this.attr({w:Env.duckWidth,h:Env.duckHeight});
		this.setPos(-2*this._w,-2*this._h);
		this.size = Env.duckWidth/2;
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

Crafty.c("Square", {
	init: function(){
		this.requires('Duck,Color');
		//rewrite the duckName
		this.duckName="Square";

		this.speed = Math.floor(Math.sqrt(Math.pow(Env.horizontalTravel,2)+Math.pow(Env.verticalTravel,2))/Env.speed);
		this.worth = Env.worth;
		//hits to kill the duck
		this.health = 1
		this.attr({w:Env.duckWidth,h:Env.duckHeight});
		this.setPos(-2*this._w,-2*this._h);
		this.size = Env.duckWidth;
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
Crafty.c("Triangle", {
	init: function(){
		this.requires('Duck');
		//rewrite the duckName
		this.duckName="Triangle";

		this.speed = Math.floor(Math.sqrt(Math.pow(Env.horizontalTravel,2)+Math.pow(Env.verticalTravel,2))/Env.speed);
		this.worth = Env.worth;
		//hits to kill the duck
		this.health = 1
		this.attr({w:Env.duckWidth,h:Env.duckHeight});
		//this.setPos(-2*this._w,-2*this._h);
		this.size = Env.duckWidth;
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