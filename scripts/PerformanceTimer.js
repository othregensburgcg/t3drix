var PerformanceTimer = function(){
	this.start;
	
	this.set = function(){
		this.start = Date.now();
	};
	
	this.get = function(){
		var ms = Date.now() - this.start;
		return ms;
	};
	
	this.alert = function(txt){
		alert((txt?txt + ": ":"") + this.get());
	};
	
	this.log = function(){
		console.log((txt?txt + ": ":"") + this.get());
	};
};
