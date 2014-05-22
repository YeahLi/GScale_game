/**
 * loadGame get the setting values
 */
var modeName;
var sizeValue;
var resolWidth;
var resolHeight;
var speedValue;
var bgColorValue;
var objColorValue;
var shapeNums=0;
var arrShape=[];
var gameScreen;
var gameSettings=document.getElementById("settings");
var settings = {
	size:0,//px
	resolution:"Null",
	speed:0,//int
	bgColor:"#87CEEB",
	objColor:"#FFFF00",
	Shape:"",
	mobile:true, //bool
	pixelRatio:0
}
var ratio=window.devicePixelRatio;
function jumptogame(){	
		var mode=document.getElementsByName("mode");
		for(var i=0; i<mode.length; i++){
			if(mode[i].checked){
				modeName=mode[i].value;
			}
		}
		//console.log(modeName);
		var sizeRange=document.getElementById("objSize");
		sizeValue=parseInt(sizeRange.value);
		//console.log(sizeValue);
		var resol=document.getElementById("resol");
		var resolValue=resol.value.split("x");
		resolWidth=parseInt(resolValue[0]);
		resolHeight=parseInt(resolValue[1]);
		//console.log(resolWidth+","+resolHeight);
		//console.log(resolWidth+resolHeight);
		var speed=document.getElementById("speed");
		speedValue=parseInt(speed.value);
		//console.log(speedValue)
		var bgColor=document.getElementById("bgColor");
		bgColorValue=bgColor.value;
		//console.log(bgColorValue);
		var objColor=document.getElementById("objColor");
		objColorValue=objColor.value;
		//console.log(objColorValue);
		var shape=document.getElementsByName("shape");
		for (var i = 0;i<shape.length; i++) {
			if (shape[i].checked) {
				shapeNums++;
				//add the object name to arrShape
				var shapeValue=shape[i].value;
				arrShape.push(shapeValue);
			}
		};
		//console.log(arrShape);
		if(shapeNums==0){
			alert("Must choose at least one shape!");
			return true;
		}
		
		//Create game screen
		gameSettings.style.display="none";
		gameScreen=document.getElementById("cr-stage");

		enterFullscreen();
    
   //choose the mode to load
	if(modeName=="DuckHunt"){
		Game.start();
	} else if(modeName=="Whac-A-Mole"){
		Game2.start();
	} else{
		alert("Error!");
		exitFullscreen();
	}
}
function enterFullscreen(){
	//enter into fullscreen
	var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
}
function exitFullscreen() {
	  if(document.exitFullscreen) {
	    document.exitFullscreen();
	    //console.log("exit1");
	  } else if(document.mozCancelFullScreen) {
	    document.mozCancelFullScreen();
	    //console.log("exit2");
	  } else if(document.webkitExitFullscreen) {
	    document.webkitExitFullscreen();
	    //console.log("exit3");
	  }
}

