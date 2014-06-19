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
	
	this.rotateRight = function(angle){
		
		//console.log(this.cubes[0] + " -> " + this.globalPosition);
		
		for(var i=0; i<this.cubes.length; i++){
			for(var k=0; k<8; k+=2){
				//var rotated = rotatePointAroundPoint(this.cubes[i][k], this.cubes[i][k+1], this.globalPosition[0], this.globalPosition[1]);//WRONG, center is 0,0
				var rotated = rotatePointAroundPoint(this.cubes[i][k], this.cubes[i][k+1], 0, 0, angle);//x, y, center_x, center_y
				this.cubes[i][k] = rotated.x;
				this.cubes[i][k+1] = rotated.y;
			}
		}
		
		//console.log(this.cubes[0] + " -> " + this.globalPosition);
		
		function rotatePointAroundPoint(x, y, center_x, center_y, angle) {

			var inPoint = new THREE.Vector3(x-center_x, y-center_y, 0);
				
		    rotMatrix = new THREE.Matrix4();
		    rotMatrix.makeRotationAxis(new THREE.Vector3(0, 0, 1).normalize(), -(angle*Math.PI/180));
			
			inPoint.applyMatrix4(rotMatrix);		    
		    
		    return new THREE.Vector3(Math.round((inPoint.x+center_x)*10)/10, Math.round((inPoint.y+center_y)*10)/10, 0);
		};
	};
	
	this.checkRotateCollision = function(){
		this.rotateRight(45);
		
		if(this.checkMoveCollision()){
			this.rotateRight(-45);
			return true;
		}
		else{
			this.rotateRight(45);
			
			if(this.checkMoveCollision()){
				this.rotateRight(-90);
				return true;
			}
			else return false;
		}		
	};
	
	this.checkMoveCollision = function(){
		
		for(var i=0; i<stoppedStones.length; i++){

			if(this.checkIfCollidesWith(stoppedStones[i])){
				return true;
			}
						
		}
		
		return false;
	};
	
	this.checkIfCollidesWith = function(stoneToCheck){
		var checkCubes = stoneToCheck.meshCollider.cubes;
		var globalPositionCheck = stoneToCheck.meshCollider.globalPosition;
		
		for(var i=0; i<this.cubes.length; i++){
			for(var k=0; k<checkCubes.length; k++){
				
				//slice arrays to get a copy
				var myCube = this.translateCube(this.cubes[i].slice(0), this.globalPosition[0], this.globalPosition[1]);
				var checkCube = this.translateCube(checkCubes[k].slice(0), globalPositionCheck[0], globalPositionCheck[1]);
				
				if(this.checkCubesCollision(myCube, checkCube)){
					console.log("COLLISION");
					//console.log(myCube);
					//console.log(checkCube);
					
					
					//---------------------------------------------------
					
					return true;
				}
			}
		}
		
		return false;
	};
	
	this.translateCube = function(cube, x, y){
		for(var i=0; i<8; i++){
			if(i%2==0) cube[i] = Math.round((cube[i] + x)*10)/10;
			else cube[i] = Math.round((cube[i] + y)*10)/10;
		}
		return cube;
	};
	
	this.checkCubesCollision = function(c1, c2){//check logic and then move complete function to MeshCollider.checkMoveCollision()
		
		return (
			( l(c1)==l(c2)&&r(c1)==r(c2)&&b(c1)<t(c2)&&b(c1)>b(c2) ) ||
			( r(c1)>l(c2)&&r(c1)<r(c2) &&
				(
					( t(c1)<t(c2)&&t(c1)<b(c2) ) ||
					( b(c1)<t(c2)&&b(c1)>b(c2) ) ||
					( t(c1)==t(c2)&&b(c1)==b(c2) )
				)
			) ||
			( l(c1)<r(c2)&&l(c1)>l(c2) &&
				(
					( t(c1)<t(c2)&&t(c1)>b(c2) ) ||
					( t(c1)==t(c2)&&b(c1)==b(c2) ) ||
					( b(c1)<t(c2)&&b(c1)>b(c2) )
				)				
			)
		);
		
		function t(cube){
			var max = -1000;
			for(var i=1; i<cube.length; i+=2) max = cube[i]>max?cube[i]:max;
			return max;
		};
		
		function b(cube){
			var min = 1000;
			for(var i=1; i<cube.length; i+=2) min = cube[i]<min?cube[i]:min;
			return min;
		};
		
		function l(cube){
			var min = 1000;
			for(var i=0; i<cube.length; i+=2) min = cube[i]<min?cube[i]:min;
			return min;
		};
		
		function r(cube){
			var max = -1000;
			for(var i=0; i<cube.length; i+=2) max = cube[i]>max?cube[i]:max;
			return max;
		};
	};
};