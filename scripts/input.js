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
				//test();
				//----------------------------------------
				break;
			default: break;
		}
	}
};