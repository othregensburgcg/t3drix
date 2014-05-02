var GamePositionMatrix = function(){
	var fields = new Array();
	
	this.initFields = function(){
		for(var i=0; i<10; i++) this.fields.push(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
		return this;
	};
};