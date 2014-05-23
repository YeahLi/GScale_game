Crafty.c('GameMouse2', {
	init: function(){
		this.requires('2D, Canvas, Scale2, spr_crosshair, Persist, Tween');
		Crafty.addEvent(this,Crafty.stage.elem, "mousemove", this.onMouseMove);
		Crafty.addEvent(this,Crafty.stage.elem, "mousedown", this.onMouseDown);
		Crafty.addEvent(this,Crafty.stage.elem, "mouseup", this.onMouseUp);
		this.bind('ResizedWindow',this.resizeMe);
		//remove the actual mouse cursor
		//document.body.style.cursor = "url(./assets/play.png)"; //cursor="crosshair"
		gameScreen.style.cursor = "url(./assets/crosshair.png) 32 32,auto";
		this.setLayer('crosshair');
		this.newGame = true;
		this.resizeMe();
		//sprite rotation point
		this.origin('bottom right');
		this.rotation=30;
	},
	onMouseDown: function(e){
		this.tween({rotation:0},5);
	},
	onMouseUp: function(e){
		this.tween({rotation:30},5);
	},
	onMouseMove: function(e){
		if(this.newGame){
			//set the crosshair cursor in the appropriate place given the mouse cursor position
			this.newGame = false;
			this.realMouseX =e.clientX;
			this.realMouseY = e.clientY;
			this.initPos(this.realMouseX, this.realMouseY);
		}else{
			//move the crosshair cursor appropriately given the movement in the mouse cursor
			this.moveMe(e.clientX-this.realMouseX,e.clientY-this.realMouseY);
			this.realMouseX = e.clientX;
			this.realMouseY = e.clientY;
		}
	},
	moveMe: function(dx,dy){
		//adjust the crosshair given the movement in the mouse position
		var pos = this.getPos();
		var pos = {x:pos.x +this.mouseWidth/4,y:pos.y+this.mouseHeight/1.5};
		var newPos = {x: pos.x+dx,y: pos.y+dy};
		if(newPos.x > Env2.x){
			//passes outside the game to the right
			newPos.x = Env2.x;
		}else if(newPos.x < 0){
			//passes outside the game to the left
			newPos.x = 0;
		}
		if(newPos.y > Env2.y){
			//passed outside the bottom of the game
			newPos.y = Env2.y;
		}else if(newPos.y < 0){
			//passed outside the top of the game
			newPos.y = 0;
		}
		this.setPos(newPos.x-this.mouseWidth/4,newPos.y-this.mouseHeight/1.5);
	},
	initPos: function(x,y){
		//figure out where the crosshair cursor should start given the mouse cursor position
		
		var minX = (window.innerWidth - Env2.x)/2;
		var maxX = Env2.x+minX;
		var minY = (window.innerHeight - Env2.y)/2;
		var maxY = Env2.y+minY;
		if(x>maxX){
			x = Env2.x;
		}else if(x<minX){
			x = 0;
		}else{
			x = x-minX;
		}
		if(y>maxY){
			y = Env2.y;
		}else if(y<minY){
			y = 0;
		}else{
			y = y-minY;
		}
		this.attr({x:x-this.mouseWidth/4,y:y-this.mouseHeight/1.5});//picture left top location
	},
	getMousePos: function(){
		//returns the mouse position in game coordinates
		var pos = this.getPos();
		return({x:pos.x+this.mouseWidth/4,y:pos.y+this.mouseHeight/1.5});//real pointer center location
	},
	resizeMe: function(){
		this.mouseWidth=Env2.x*3.27/15;
		this.mouseHeight=Env2.y*2.57/15;
		this.attr({w:this.mouseWidth,h:this.mouseHeight});
		this.realMouseX = Env2.x/2-this.mouseWidth/4;
		this.realMouseY = Env2.y/2-this.mouseHeight/1.5;
		this.x=Env2.x/2-this.mouseWidth/4;
		this.y=Env2.y/2-this.mouseHeight/1.5;
		//reset the crosshair position so it will continue working properly
		//the crosshair might not stay in the exact same place during a resize
		this.initPos(this.realMouseX,this.realMouseY);
	}
});