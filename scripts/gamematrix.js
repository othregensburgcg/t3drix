
var GamePositionMatrix = function(){
	this.fields = new Array();
	
	this.initFields = function(){
		for(var i=0; i<20; i++) this.fields.push(new Array(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1));
		this.fields.push(new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1));
		return this;
	};
	
	this.occupy(obj){
		if(obj instanceof StoneLeftS){
			
		} else if (obj instanceof StoneRightS){
			
		} else if (obj instanceof StoneT){
			
		} else if (obj instanceof StoneCube){
			
		} else if (obj instanceof StoneLine){
			
		} else if (obj instanceof StoneLeftL){
			
		} else if (obj instanceof StoneRightL){
			
		}
	};
};