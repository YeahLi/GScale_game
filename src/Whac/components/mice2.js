//Mice
//common mice component
//Please remember 'Mice' are not destroyed at all!!!!!!!!!! Although define the function!!!!!
Crafty.c('Mice', {
	i:0,
	j:0,
	miceWidth:0,
	miceHeight:0,
	miceX:0,
	miceY:0,
	init: function(){
		this.requires('SpriteScale, Mouse, Tween, SpriteAnimation'); 
		//setup animation frames
		this.animate('MiceLive', 0, 0, 0);
		this.animate('MiceDead', 0, 1, 0);
		//set layer
		this.setLayer('mices');
		//alive flag
		this.alive = true;
		//sprite rotation point
		this.origin('center');
		//MiceName
		this.miceName="defaultMice";
		//miceAppearTime
		this.appearTime=miceAppearTime;
	},
	activate: function(){
		//setup duck for animating
		this.miceWidth=holeWidth*Math.pow(sizeValue, 0.75)*2.04/56;
		this.miceHeight=holeHeight*Math.pow(sizeValue, 0.75)*2.2/28;
		this.attr({w:this.miceWidth,h:this.miceHeight});
		//pick a random starting position
		do{
			this.i=Math.floor(Math.random()*3);
			this.j=Math.floor(Math.random()*col);	
		}while(!arrHole[this.i][this.j].available)
		this.miceX=arrHole[this.i][this.j].x+holeWidth/2-this.miceWidth/2;
		this.miceY=arrHole[this.i][this.j].y-Math.pow(this.miceHeight,1.2)/3.6;
		this.setPos(this.miceX,this.miceY+this.miceHeight/2);
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
			this.animate('MiceLive', 1, 1);
			if (this.y>this.miceY) {
				this.tween({x: this.x, y:this.miceY},7);
			}else{
				//keep drawing the same
				this.tween({x: this.x, y: this.y},21);//draw the initial image
			}
		}else if (!this.alive && continueMe) {
			if (this.y>this.miceY+Math.pow(this.miceHeight,0.5)/3) {
				this.destroy();
			}else{
				//mice is dead turn small and disappear
				this.tween({x: this.x, y:this.miceY+this.miceHeight/2}, 14);
			}
		}
	},
	checkDestroy: function(){
		//check if the mice is timeout
		var myDate = new Date();		
		if((myDate.getTime()-this.appearTime)> this.speed){
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
			this.animate('MiceDead', 1, 1);
			//set sprite movement tween
			this.animateMice();
			return true; 
		}else{
			//mice is still alive
			return false;
		}
	},
	destroyMe: function(type){
		arrHole[this.i][this.j].available=true;
		//destroy entity
		this.unbind('TweenEnd');
		this.destroy();
	}
});
//---------- Actual Mices --------------------------------------------------
//--------------------------------------------------------------------------
//NormalMice
Crafty.c("NormalMice", {
	init: function(){
		this.requires('Mice');
		//rewrite the miceName
		this.miceName="NormalMice";
		this.speed = Env2.disappearSpeed;
		this.worth = Env2.worth;
		//hits to kill the mice
		this.health = 1;
		//set the sprite image map to be yellow duck file
		this.setSprite('spr_mice');
		this.bind('ResizedWindow',this.onResize);
	},
	onResize: function(){
		//correct duck variables based on new screen conditions
		this.destroyMe();
		Crafty.e('NormalMice').activate();
	}
});