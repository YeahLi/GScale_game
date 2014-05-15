//SCALE
//components to allow the game to easily scale to different screen sizes

//Scale
//This component controls the relation between game coordinates and actual window coordinates
//It also provides layer management 
Crafty.c('Scale', {
  init: function(){
		this.zLayer = 'default_layer';
  },
	setPos: function(x,y){
		//sets entity position in game coordinates
		this.attr({x: x , y: y});
		return this;
	},
	getPos: function(){
		//returns game coordinates of the entity
		return({x: (this.x), y: (this.y)});
	},
	getAbsoluteCoords: function(x,y){
		//returns window coordinates for given game coordinates
		return({x: x, y: y});
	},
	getGameCoords: function(x,y){
		//returns game coordinates for given window coordinates
		return({x: x, y: y });
	},

	newLayer: function(name,relativeZ){
		//creates a new layer if one needs to be created in the game somewhere
		Env.layers[name] = relativeZ;
		this.setLayer(name);
		return this;
	},
	setLayer: function(name){
		//sets the entity's layer to a pre-defined layer
		this.zLayer = name;
		this.attr({z: Env.layers[name]+Env.layerOffset});
		return this;
	},
	getLayer: function(){
		//returns the entity's layer
		return Env.layers[this.zLayer];
	}
});