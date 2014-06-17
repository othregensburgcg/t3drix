var MeshCollider = function(){
	
	this.globalPosition;		
	this.cubes = new Array();
	
	var size = 1;

	this.addCube = function(x, y){
		this.cubes.push(new Array(x-size/2, y-size/2, x-size/2, y+size/2, x+size/2, y-size/2, x+size/2, y+size/2));
	};
	
	this.setGlobalPosition = function(x, y){
		this.globalPosition = new Array(x, y);
	};
	
	this.rotateRight = function(){
		
		for(var i=0; i<this.cubes.length; i++){
			for(var k=0; k<8; k+=2) rotatePointAroundPoint(this.cubes[i][k], this.cubes[i][k+1], this.globalPosition[0], this.globalPosition[1]);//x, y, center_x, center_y
		}
		
		function rotatePointAroundPoint(x, y, center_x, center_y) {

			var inPoint = new THREE.Vector3(x-center_x, y-center_y, 0);
				
		    rotMatrix = new THREE.Matrix4();
		    rotMatrix.makeRotationAxis(new THREE.Vector3(0, 0, 1).normalize(), -Math.PI/2);
			
			inPoint.applyMatrix4(rotMatrix);		    
		    
		    return new THREE.Vector3(Math.round((inPoint.x+center_x)*10)/10, Math.round((inPoint.y+center_y)*10)/10, 0);
		};
	};

};