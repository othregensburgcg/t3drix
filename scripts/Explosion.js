var Explosion = function(){
	this.mesh;
	this.duration;
	this.startTime;
	this.minScale = 0.005;
	this.maxScale = 0.07;
	this.animate = true;
	
	this.growing = true;
	
	this.create = function(x, y, duration){
		
		this.mesh = new THREE.Mesh( 
	        new THREE.IcosahedronGeometry(20, 4), 
	        materials.fireball
	    );
	    
	    this.mesh.scale.x = this.minScale;
	    this.mesh.scale.y = this.minScale;
	    this.mesh.scale.z = this.minScale;
	    
	    this.mesh.position.x = x;
	    this.mesh.position.y = y;
	    this.mesh.position.z = 5;
	    
	    this.duration = duration;
	     
	    return this;
	};
	
	this.run = function(){
		
		if(! this.startTime) this.startTime = Date.now();
		
		if(this.animate){
			var runningTime = Date.now() - this.startTime;
			var interpolationValue = Math.PI * (runningTime / this.duration);
			var interpolationScale = this.minScale + (this.maxScale - this.minScale) * ((Math.sin(interpolationValue-(Math.PI/2)) + 1) / 2);
			this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = interpolationScale;
			
			if(interpolationValue > 2*Math.PI) this.animate = false;
		}
		
	};
};


