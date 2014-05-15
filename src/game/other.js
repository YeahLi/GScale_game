var button=document.getElementById("begin");
button.addEventListener("click", jumptogame, false);
var pcList=["800x600","1024x768","1280x800","1440x900"];
var moList=[];
var trs=document.getElementsByTagName('tr');
for(var i=0;i<trs.length;i++){
	var tr=trs[i];
	if(window.orientation === undefined){
		tr.style.height="50px";
	}else{
		tr.style.height="100px";
	}
}

if(window.orientation === undefined){
	var resol=document.getElementById("resol");
	for (var i = 0; i < pcList.length; i++) {
		var op=document.createElement("option");
		op.value=pcList[i];
		if (i==0) {
			op.selected=true;
		}
		var textnode=document.createTextNode(pcList[i]);
		op.appendChild(textnode);
		resol.appendChild(op);
	}	
}else{
	var resol=document.getElementById("resol");
	//auto change with orientation status
	//Assume mWidth is equal to the shortest side of mobile device
	if(window.screen.availWidth<window.screen.availHeight){
		var mWidth=window.screen.availWidth;
		var mHeight=window.screen.availHeight;
	}else{
		var mWidth=window.screen.availHeight;
		var mHeight=window.screen.availWidth;
	}
	var s=mWidth+"x"+mHeight;
	moList.push(s);
	for (var i = 0; i < moList.length; i++) {
		var op=document.createElement("option");
		op.value=moList[i];
		if (i==0) {
			op.selected=true;
		}
		var textnode=document.createTextNode(moList[i]);
		op.appendChild(textnode);
		resol.appendChild(op);
	}
}
//window.screen.availWidth
//window.innerWidth
//window.screen.width