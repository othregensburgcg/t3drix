var MeshCollider = function(){
	
	this.globalPosition;		
	this.cubes = new Array();
	
	this.lineColliderStoppedIndices = new Array();
	
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
			if(this.checkIfCollidesWith(stoppedStones[i]) && stoppedStones[i].stopped){
				//console.log("COLLIDED STONE: stoppedStones["+i+"]");
				//console.log(stoppedStones);
				return true;
			}		
		}
		
		return false;
	};
	
	this.getStonesWhichCollideWithLine = function(){
		
		var stonesWhichCollideWithLine = new Array();
		
		for(var i=0; i<this.cubes.length; i++){			
			var st = this.getStoneWhichCollidesWithCube(this.cubes[i]);
			if(st != null) stonesWhichCollideWithLine.push(st);
		}
		
		return stonesWhichCollideWithLine;
	};
	
	this.getStoneWhichCollidesWithCube = function(cubeToCheck){
		
		for(var i=1; i<stoppedStones.length; i++){
			var stoneToCheck = stoppedStones[i].meshCollider;
			
			for(var k=0; k<stoneToCheck.cubes.length; k++){
				
				var myCube = this.translateCube(cubeToCheck.slice(0), this.globalPosition[0], this.globalPosition[1]);
				var checkCube = this.translateCube(stoneToCheck.cubes[k].slice(0), stoneToCheck.globalPosition[0], stoneToCheck.globalPosition[1]);
				
				if(this.checkLineCubesCollision(myCube, checkCube)){
					return stoppedStones[i];
				}				
			}			
		}
		
		return null;
	};
	
	this.checkLineFull = function(){
		
		
		for(var i=0; i<this.cubes.length; i++){

			if(! this.checkIfCubeCollided(this.cubes[i])){
				this.lineColliderStoppedIndices = new Array();
				return false;
			}						
		}
		
		//from here: line full -> swap normal stones with custom stones
		
		var indicesToPopFromStopped = new Array();
		
		for(var i=0; i<this.lineColliderStoppedIndices.length; i++){
			
			
			//find out which cubes should stay -> cubesToStay
			var cubesToStay = this.lineColliderStoppedIndices[i][1];			
			
			//remove old mesh from scene
			scene.remove(stoppedStones[this.lineColliderStoppedIndices[i][0]].mesh);
			
			//swap
			if(cubesToStay.length > 0){
				
				//for(var cc=0; cc<cubesToStay.length; cc++) console.log("stay: " + cubesToStay[cc]);
				
				var x = stoppedStones[this.lineColliderStoppedIndices[i][0]].meshCollider.globalPosition[0];
				var y = stoppedStones[this.lineColliderStoppedIndices[i][0]].meshCollider.globalPosition[1];
				
				var dividedCubes = this.divideCubes(cubesToStay);
				
				for(var k=0; k<dividedCubes.length; k++){
					if(k==0){
						stoppedStones[this.lineColliderStoppedIndices[i][0]] = new StoneCustom().create(dividedCubes[k], x, y);
						stoppedStones[this.lineColliderStoppedIndices[i][0]].stopped = true;//not needed, because default in StoneCustom
					
						//add new mesh to scene
						scene.add(stoppedStones[this.lineColliderStoppedIndices[i][0]].mesh);
					}
					else{
						stoppedStones.push(new StoneCustom().create(dividedCubes[k], x, y));
						scene.add(stoppedStones[stoppedStones.length-1].mesh);
					}
				}
			}
			else indicesToPopFromStopped.push(this.lineColliderStoppedIndices[i][0]);
		}
		//REMOVING FROM RIGHT TO LEFT -> NO DISPLACEMENT
		indicesToPopFromStopped.sort(function(a, b){ return a - b; });
		for(var i=indicesToPopFromStopped.length-1; i>=0; i--){
			//stoppedStones.pop(stoppedStones[indicesToPopFromStopped[i]]);//POP IS BAD, IT REMOVES THE TOP ELEMENT, NOT THE RIGHT ONE!!!
		
			if(indicesToPopFromStopped[i]!=0){//bounds should stay!!!
				stoppedStones.splice(indicesToPopFromStopped[i], 1);
			}
		}
		
		//console.log(stoppedStones);
		
		this.lineColliderStoppedIndices = new Array();
		
		//-------------------------------------------------------------
		
		return true;
	};
	
	this.divideCubes = function(cubes){
		
		cubes.sort(function(a, b){ return t(a)-t(b); });
		
		var divided = new Array(new Array(), new Array());
		var returnDivided = false;
		
		divided[0].push(cubes[0]);
		
		for(var i=1; i<cubes.length; i++){
			if(t(cubes[i])-t(cubes[i-1])>1 || returnDivided){

				divided[1].push(cubes[i]);
				returnDivided = true;
			}
			else divided[0].push(cubes[i]);
		}
		
		if(returnDivided) return divided;
		else return new Array(cubes);
	};
	
	this.checkIfCubeCollided = function(cubeToCheck){
		
		for(var i=0; i<stoppedStones.length; i++){
			var stoneToCheck = stoppedStones[i].meshCollider;
			
			for(var k=0; k<stoneToCheck.cubes.length; k++){
				
				var myCube = this.translateCube(cubeToCheck.slice(0), this.globalPosition[0], this.globalPosition[1]);
				var checkCube = this.translateCube(stoneToCheck.cubes[k].slice(0), stoneToCheck.globalPosition[0], stoneToCheck.globalPosition[1]);
				
				if(this.checkLineCubesCollision(myCube, checkCube)){
					
					//check if this.lineColliderStoppedIndices contains index i
					var alreadyContains = false;
					var alreadyContainsIndex;
					for(var m=0; m<this.lineColliderStoppedIndices.length; m++){
						if(this.lineColliderStoppedIndices[m][0] == i){
							alreadyContains = true;
							alreadyContainsIndex = m;
							break;
						}
					}					
					
					if(! alreadyContains){
						var cubesToStay = stoneToCheck.cubes.slice(0);//copy all cubes
						
						//cubesToStay.pop(stoneToCheck.cubes[k]); //POP IS BAD, IT REMOVES THE TOP ELEMENT, NOT THE RIGHT ONE!!!
						var searchIndex = cubesToStay.indexOf(stoneToCheck.cubes[k]);
						if(searchIndex != -1) cubesToStay.splice(searchIndex, 1);
						
						//console.log("removed: " + stoneToCheck.cubes[k]);
						
						//remove stoneToCheck.cubes[k] because it collides with the line						
						this.lineColliderStoppedIndices.push(new Array(i, cubesToStay));
					}
					else{					
						//this.lineColliderStoppedIndices[alreadyContainsIndex][1].pop(stoneToCheck.cubes[k]);//POP IS BAD, IT REMOVES THE TOP ELEMENT, NOT THE RIGHT ONE!!!
						var searchIndex = this.lineColliderStoppedIndices[alreadyContainsIndex][1].indexOf(stoneToCheck.cubes[k]);
						if(searchIndex != -1) this.lineColliderStoppedIndices[alreadyContainsIndex][1].splice(searchIndex, 1);
						
						//console.log("removed: " + stoneToCheck.cubes[k]);
					}
					//console.log(this.lineColliderStoppedIndices);
					
					return true;
				}
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
					//console.log("COLLISION AT:");
					//console.log(myCube);
					//console.log(checkCube);
					
					if(this.globalPosition[1]>18.5 && this.globalPosition[0]<8.5 && this.globalPosition[0]>0.5){
						GAMEOVER = true;
						//pause = true;
					}					
					//---------------------------------------------------
					
					leftForbidden = false;
					rightForbidden = false;
					
					return true;
				}
			}
		}
		
		leftForbidden = false;
		rightForbidden = false;
		
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
			|| ( t(c1)==t(c2)&&b(c1)==b(c2)&&l(c1)==l(c2)&&r(c1)==r(c2) )
		);
		
	};
	
	this.checkLineCubesCollision = function(c1, c2){//check logic and then move complete function to MeshCollider.checkMoveCollision()
		
		return (t(c1)==t(c2)&&b(c1)==b(c2)&&l(c1)==l(c2)&&r(c1)==r(c2));
		
	};
	
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