function Hole() {
	this.x = 0; //px
	this.y = 0; //py
	this.available = true; //bool
}
var row=3;
var col;
var arrHole;
var holeWidth;
var holeHeight;
function holeMap(){
	var width=Env2.x*0.815;
	holeWidth=Env2.x*sizeValue*2.1/400;
	holeHeight=Env2.y*sizeValue*1.05/400;
	var internal=holeWidth*0.25;
	var internalHeight=Env2.y*0.246;
	col = Math.floor((width+internal)/(holeWidth+internal));
	var px=Env2.x*0.1;
	var py=Env2.y*0.2;
	arrHole = new Array();
	for (var i = 0; i < 3; i++) {
		arrHole[i]=new Array();
	 	for (var j = 0; j < col; j++) {
	 		var h = new Hole();
	 		h.x=px+j*(holeWidth+internal);
	 		h.y=py+i*internalHeight;
	 		h.available=true;
	 		arrHole[i].push(h);
	 	};
	}; 
}
Crafty.c('Hole_base',{
	init:function(){
		this.arr=new Array();
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	onResize:function(){
		//alert("resize");
		//this.destroyMe();
		holeWidth=Env2.x*sizeValue*2.1/400;
		holeHeight=Env2.y*sizeValue*1.05/400;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < col; j++) {
				var temp=Crafty.e('2D, Persist, Canvas, Scale2, spr_hole_base')
							.setLayer('hole_base')
							.attr({w:holeWidth,h:holeHeight})
							.setPos(arrHole[i][j].x,arrHole[i][j].y);
				this.arr.push(temp);
			};
		};
	},
	destroyMe:function(){
		if (this.arr.length>0) {
			for (var i = 0; i < arr.length; i++) {
				this.arr[i].destroy();
			};
		};
		this.destroy();
	}
});
Crafty.c('Hole',{
	init:function(){
		this.arr=new Array();
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	onResize:function(){
		//this.destroyMe();
		this.holeWidth=Env2.x*sizeValue*1.87/400;
		this.holeHeight=Env2.y*sizeValue*0.84/400;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < col; j++) {
				var temp=Crafty.e('2D, Persist, Canvas, Scale2, spr_hole')
							.setLayer('hole')
							.attr({w:this.holeWidth,h:this.holeHeight})
							.setPos(arrHole[i][j].x+holeWidth*0.065,arrHole[i][j].y-holeHeight*0.37);
				this.arr.push(temp);
			};
		};
	},
	destroyMe:function(){
		if (this.arr.length>0) {
			for (var i = 0; i < arr.length; i++) {
				this.arr[i].destroy();
			};
		};
		this.destroy();
	}
});