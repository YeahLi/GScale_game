function Hole() {
	this.x = 0; //px
	this.y = 0; //py
	this.available = true; //bool
}
var row;
var col;
var arrHole;
function holeMap(mWidth,mHeight){
	var width=mWidth-10;
	var height=mHeight-40;
	var objSize=sizeValue+10;
	row = Math.floor(height/objSize);
	col = Math.floor(width/objSize);	
	var px=(mWidth-sizeValue*col)/(col+1);
	var py=((mHeight-sizeValue*row)/(row+1));
	arrHole = new Array();
	for (var i = 0; i < row; i++) {
		arrHole[i]=new Array();
	 	for (var j = 0; j < col; j++) {
	 		var h = new Hole();
	 		h.x=px+j*(px+sizeValue);
	 		h.y=py+i*(py+sizeValue);
	 		h.available=true;
	 		arrHole[i].push(h);
	 	};
	 }; 
	 //console.log(arrHole);
}