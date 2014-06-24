var leftForbidden = false;
var rightForbidden = false;
var rotateForbidden = false;

/*
document.onkeyup = function(evt){
	evt = evt || window.event;
	evt.preventDefault();
	
	//console.log(evt.keyCode);
	
	if(!GAMEOVER){
		switch(evt.keyCode){
			case 37: // links - taste behandeln
				if(!leftForbidden){
					leftForbidden = true;
					stone.moveLeft();
				}
				//else setTimeout(function(){ leftForbidden = false; }, 400);
				break;
			case 38:
				if(!rotateForbidden){
					rotateForbidden = true;
					stone.rotateRight();
				}
				setTimeout(function(){ rotateForbidden = false; }, 400);
				break;
			case 39: // rechts - taste behandeln
				if(!rightForbidden){
					rightForbidden = true;
					stone.moveRight();
				}
				//else setTimeout(function(){ rightForbidden = false; }, 400);
				break ;
			default: break;
		}
	}
};
*/

document.onkeydown = function(evt){
	evt = evt || window.event;
	evt.preventDefault();
	
	//console.log(evt.keyCode);
	
	if(evt.keyCode == 27 && pause && !GAMEOVER){
		pause = ! pause;
	}
	else if(!pause && !GAMEOVER){
		switch(evt.keyCode){
			case 37: /* links - taste behandeln */
				if(!leftForbidden){
					leftForbidden = true;
					stone.moveLeft();
				}
				//else setTimeout(function(){ leftForbidden = false; }, 400);
				break;
			case 38:
				if(!rotateForbidden){
					rotateForbidden = true;
					stone.rotateRight();
				}
				setTimeout(function(){ rotateForbidden = false; }, 200);
				break;
			case 39: /* rechts - taste behandeln */
				if(!rightForbidden){
					rightForbidden = true;
					stone.moveRight();
				}
				//else setTimeout(function(){ rightForbidden = false; }, 400);
				break ;
			case 40:
				stone.moveDown(.25);
				break;
			case 110:
				placeStone();
				break;
			case 55:
				CHEAT = ! CHEAT;
				break;
			case 27:
				//console.log(stone.mesh.position);
				pause = ! pause;
				//TESTING---------------------------------
				//test();
				//console.log(stone.meshCollider.cubes + " -> " + stone.meshCollider.globalPosition);
				//console.log(stoppedStones[0].meshCollider.cubes + " -> " + stoppedStones[0].meshCollider.globalPosition);
				//----------------------------------------
				break;
			default: break;
		}
	}
};
