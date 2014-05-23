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
Crafty.c('Board',{
	init:function(){
		this.requires('2D, Persist, Canvas, Scale2, spr_board');
		this.setLayer('button');
		this.onResize();
		this.bind('ResizedWindow',this.onResize);
	},
	onResize:function(){
		this.attr({w:0.75*Env2.x,h:0.5*Env2.y+30});
		this.setPos(Env2.x/2-this.w/2,Env2.y*0.2-15);
	},
	destroyMe: function(){
		this.destroy();
	}
});