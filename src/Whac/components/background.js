Crafty.c('Background',{
	init:function(){
		this.requires('2D, Persist, Canvas, Scale2, spr_background');
		this.setLayer('background');
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	onResize:function(){
		this.attr({w:Env2.x,h:Env2.y});
	}
});