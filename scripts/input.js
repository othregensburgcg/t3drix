document.onkeydown = function(evt){
	evt = evt || window.event;
	evt.preventDefault();
	
	//console.log(evt.keyCode);
	
	if(evt.keyCode == 27 && pause){
		pause = ! pause;
	}
	else if(! pause){
		switch(evt.keyCode){
			case 37: /* links - taste behandeln */
				stone.moveLeft();
				break;
			case 38: /* oben - taste behandeln */
				stone.rotateRight();
				break;
			case 39: /* rechts - taste behandeln */
				stone.moveRight();
				break ;
			case 40: /* unten - taste behandeln */
				stone.moveDown(.25);
				break;
			case 110:
				placeStone();
				break;
			case 27:
				//console.log(stone.mesh.position);
				pause = ! pause;
				//TESTING---------------------------------
				test();
				//----------------------------------------
				break;
			default: break;
		}
	}
};

function test(){
	
	var myCube = new Array(2,5,4,5,2,3,4,3);
	var checkCube = new Array(7,6,9,6,7,8,9,8);
	
	console.log(checkCubesCollision(myCube, checkCube));
				
};

function checkCubesCollision(c1, c2){//check logic and then move complete function to MeshCollider.checkMoveCollision()
	if(
		(getMaxTop(c1)>getMinBottom(c2) && getMaxRight(c1)>getMinLeft(c2)) ||
		(getMaxTop(c1)>getMinBottom(c2) && getMinLeft(c1)<getMaxRight(c2)) ||
		(getMinBottom(c1)<getMaxTop(c2) && getMaxRight(c1)>getMinLeft(c2)) ||
		(getMinBottom(c1)<getMaxTop(c2) && getMinLeft(c1)<getMaxRight(c2))	
	) return true;
	else return false;
	
	function getMaxTop(cube){
		var max = -1000;
		for(var i=1; i<cube.length; i+=2) max = cube[i]>max?cube[i]:max;
		return max;
	};
	
	function getMinBottom(cube){
		var min = 1000;
		for(var i=1; i<cube.length; i+=2) min = cube[i]<min?cube[i]:min;
		return min;
	};
	
	function getMinLeft(cube){
		var min = 1000;
		for(var i=0; i<cube.length; i+=2) min = cube[i]<min?cube[i]:min;
		return min;
	};
	
	function getMaxRight(cube){
		var max = -1000;
		for(var i=0; i<cube.length; i+=2) max = cube[i]>max?cube[i]:max;
		return max;
	};
};
