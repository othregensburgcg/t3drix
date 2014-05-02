document.onkeydown = function(evt){
	evt = evt || window.event;
	evt.preventDefault();
	switch(evt.keyCode){
		case 37: /* links - taste behandeln */
			stone.moveLeft();
			break;
		case 38: /* oben - taste behandeln */
			alert("up");
			break;
		case 39: /* rechts - taste behandeln */
			stone.moveRight();
			break ;
		case 40: /* unten - taste behandeln */
			stone.moveDown(.25);
			break;
		default: break;
	}
}