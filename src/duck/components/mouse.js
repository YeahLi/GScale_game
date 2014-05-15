//GameMouse
//Creates a crosshair cursor to replace the mouse cursor. Not needed on touchscreens
//This component allows the cursor to stop at the edges of the game area. Otherwise the mouse could travel into the black box around the game
//Note, it looks like this.moveMe and this.initPos do the same thing, but they are actually different and you need both.
Crafty.c('GameMouse', {
	init: function(){
		this.requires('2D, Canvas, Scale, spr_crosshair, Persist');
		Crafty.addEvent(this,Crafty.stage.elem, "mousemove", this.onMouseMove);
		this.bind('ResizedWindow',this.resizeMe);
		//remove the actual mouse cursor
		//document.body.style.cursor = "none"; //cursor="crosshair"
		gameScreen.style.cursor = "none";
		this.setLayer('crosshair');
		this.newGame = true;
		this.realMouseX = Env.x/2-32;
		this.realMouseY = Env.y/2-32;
		this.x=Env.x/2-32;
		this.y=Env.y/2-32;
	},
	onMouseMove: function(e){
		if(this.newGame){
			//set the crosshair cursor in the appropriate place given the mouse cursor position
			this.newGame = false;
			this.realMouseX = e.x;
			this.realMouseY = e.y;
			this.initPos(this.realMouseX, this.realMouseY);
		}else{
			//move the crosshair cursor appropriately given the movement in the mouse cursor
			this.moveMe(e.x-this.realMouseX,e.y-this.realMouseY);
			this.realMouseX = e.x;
			this.realMouseY = e.y;
		}
	},
	moveMe: function(dx,dy){
		//adjust the crosshair given the movement in the mouse position
		var pos = this.getPos();
		var pos = {x:pos.x +32,y:pos.y+32};
		var newPos = {x: pos.x+dx,y: pos.y+dy};
		if(newPos.x > Env.x){
			//passes outside the game to the right
			newPos.x = Env.x;
		}else if(newPos.x < 0){
			//passes outside the game to the left
			newPos.x = 0;
		}
		if(newPos.y > Env.y){
			//passed outside the bottom of the game
			newPos.y = Env.y;
		}else if(newPos.y < 0){
			//passed outside the top of the game
			newPos.y = 0;
		}
		this.setPos(newPos.x-32,newPos.y-32);
	},
	initPos: function(x,y){
		//figure out where the crosshair cursor should start given the mouse cursor position
		
		var minX = (window.innerWidth - Env.x)/2;
		var maxX = Env.x+minX;
		var minY = (window.innerHeight - Env.y)/2;
		var maxY = Env.y+minY;
		if(x>maxX){
			x = Env.x;
		}else if(x<minX){
			x = 0;
		}else{
			x = x-minX;
		}
		if(y>maxY){
			y = Env.y;
		}else if(y<minY){
			y = 0;
		}else{
			y = y-minY;
		}
		this.attr({x:x-32,y:y-32});
	},
	getMousePos: function(){
		//returns the mouse position in game coordinates
		var pos = this.getPos();
		return({x:pos.x+32,y:pos.y+32});
	},
	resizeMe: function(){
		//reset the crosshair position so it will continue working properly
		//the crosshair might not stay in the exact same place during a resize
		this.initPos(this.realMouseX,this.realMouseY);
	}
});