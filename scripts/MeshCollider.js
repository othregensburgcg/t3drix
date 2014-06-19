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
					console.log("COLLISION AT:");
					console.log(myCube);
					console.log(checkCube);
					
					//;
					
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
			( l(c2)>l(c1)&&l(c2)<r(c1)&&
			  t(c2)>b(c1)&&t(c2)<t(c1) ) ||
			( l(c2)>l(c1)&&l(c2)<r(c1)&&
			  b(c2)>b(c1)&&b(c2)<t(c1) ) ||
			( r(c2)>l(c1)&&r(c2)<r(c1)&&
			  b(c2)>b(c1)&&b(c2)<t(c1) ) ||
			( r(c2)>l(c1)&&r(c2)<r(c1)&&
			  t(c2)>b(c1)&&t(c2)<t(c1) ) ||
			( l(c2)==l(c1)&&r(c2)==r(c1)&&
			  t(c1)>b(c2)&&t(c1)<t(c2) ) ||
			( l(c2)==l(c1)&&r(c2)==r(c1)&&
			  t(c2)>b(c1)&&t(c2)<t(c1) )
		);
		
		/*
		return !(l(c2) >= r(c1) || 
           r(c2) <= l(c1) || 
           t(c2) <= b(c1) ||
           b(c2) >= t(c1));
		*/
		
		/*
		var c1_center = (c1[0] + c1[2] + c1[4] + c1[6]) / 4;
		var c2_center = (c2[0] + c2[2] + c2[4] + c2[6]) / 4;
		
		if(c1_center <= c2_center){
			if(
				(t(c1)>b(c2) && r(c1)>l(c2)) ||
				(b(c1)<t(c2) && r(c1)>l(c2))
			) return true;
			else return false;
		}
		else{
			if(
				(t(c1)>b(c2) && l(c1)<r(c2)) ||
				(b(c1)<t(c2) && l(c1)<r(c2))
			) return true;
			else return false;
		}
		*/
		
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
	
	this.checkRotateCollision = function(){
		
	};
};